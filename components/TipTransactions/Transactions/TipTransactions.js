import { groupDataByParam } from '@Components/utils/util';
import { UserContext } from '@Context/User/UserProvider';
import DateTitle from '@modules/Transactions/Components/DateTitle';
import { Box, Button, CircularProgress } from '@mui/material';
import { getTipTransactions } from '@services/tipTransactions/tipTransactionsService';
import moment from 'moment';
import React, { useContext, useState, useEffect } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import NoPendingBets from '@modules/Transactions/Components/NoPendingBets';
import { TIPTRANSACTIONS_ROUTE_VALUE } from '@lib/constants';
import TransactionsTipsContent from './TransactionsTipsContent';

const TipTransactions = ({ transDate, transType, activeTab }) => {
    const { user } = useContext(UserContext);
    const [summary, setsummary] = useState([]);
    const [showMore, setshowMore] = useState(true);
    const [data, setData] = useState([]);
    const [spinnerLoading, setspinnerLoading] = useState(false);
    const [pageLoading, setpageLoading] = useState(false);

    const handleDataFormat = (dataSet) => {
        setData(groupDataByParam(dataSet, 'TRANSDATETIME'));
    };

    const getTransactions = async (loadmore = true) => {
        !loadmore && setspinnerLoading(true);
        const date = new Date();
        const dateValue = date.setDate(date.getDate() - transDate);
        const time = moment(dateValue).format('YYYY-MM-DD');
        let body = {
            userid: user?.userID,
            fromdate: time,
            trantype: transType == 'A' ? '' : transType,
            startrec: !loadmore ? 0 : summary?.length,
            nrecs: 20,
            page: 'trans',
        };
        const resp = await getTipTransactions(body);
        if (!resp?.error && resp?.data?.ERROBJ?.ERRORCODE == 0) {
            if (resp?.data?.summary?.length == 0) {
                setshowMore(false);
                !loadmore && setsummary(resp?.data?.summary);
                !loadmore && setData(resp?.data?.summary);
            } else {
                if (loadmore) {
                    setsummary([...summary, ...resp?.data?.summary]);
                    handleDataFormat([...summary, ...resp?.data?.summary]);
                } else {
                    setsummary(resp?.data?.summary);
                    handleDataFormat(resp?.data?.summary);
                }
            }
        }
        setpageLoading(false);
        !loadmore && setspinnerLoading(false);
    };

    useEffect(() => {
        getTransactions(false);
    }, [transDate, transType]);

    return (
        <Box>
            {spinnerLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <React.Fragment>
                    {summary?.length > 0 && (
                        <Box
                            sx={{
                                mx: 2,
                                mt: 2,
                            }}
                        >
                            {data?.length > 0 &&
                                data.map((section, idx) => (
                                    <React.Fragment key={idx}>
                                        <DateTitle date={section[0].date} showTime={false}/>
                                        {section?.length > 0 &&
                                            section.map((item, i) => (
                                                <Box key={i}>
                                                    <TransactionsTipsContent card={item} open={idx == 0} />
                                                </Box>
                                            ))}
                                    </React.Fragment>
                                ))}
                        </Box>
                    )}
                    {summary.length >= 20 && showMore && (
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            {!pageLoading && (
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        setpageLoading(true);
                                        getTransactions();
                                    }}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        color: '#000',
                                        pb: 2,
                                    }}
                                >
                                    View more
                                    <KeyboardArrowDownOutlinedIcon fontSize="small" />
                                </Button>
                            )}
                            {pageLoading && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CircularProgress color="primary" />
                                </Box>
                            )}
                        </Box>
                    )}
                    {summary?.length == 0 && <NoPendingBets type={'banking'} deposit={true} />}
                </React.Fragment>
            )}
        </Box>
    );
};

export default TipTransactions;
