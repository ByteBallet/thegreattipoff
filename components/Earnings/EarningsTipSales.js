import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import { getEarningSummary } from '@services/earnings/earningsService';
import { Box, Button, Stack, Typography, CircularProgress } from '@mui/material';
import NumberFormat from 'react-number-format';
import SalesGrid from './SalesGrid';
import { getGroupDataSet } from '@utils/transactions.util';
import moment from 'moment';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { groupDataByParam } from '@Components/utils/util';

import NoPendingBets from '@modules/Transactions/Components/NoPendingBets';

const EarningsTipSales = ({ month, status }) => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [sales, setsales] = useState([]);
    const [summary, setsummary] = useState([]);
    const [pageLoading, setpageLoading] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [spinnerLoading, setspinnerLoading] = useState(false);

    const getSummary = async (loadmore = true) => {
        !loadmore && setspinnerLoading(true);
        let body = {
            userid: user?.userID,
            filter: month,
            sales: true,
            pagestart: !loadmore ? 0 : sales?.length,
            status,
        };
        const resp = await getEarningSummary(body);
        if (!resp?.error && resp?.data?.ERROBJ?.ERRORCODE == 0) {
            if (resp?.data?.sales?.length == 0) {
                setisLoading(false);
                !loadmore && setsales(resp?.data?.sales);
                !loadmore && setData(resp?.data?.sales);
            } else {
                if (loadmore) {
                    setsales([...sales, ...resp?.data?.sales]);
                    handleDataFormat([...sales, ...resp?.data?.sales]);
                } else {
                    setsales(resp?.data?.sales);
                    handleDataFormat(resp?.data?.sales);
                }
            }
            setsummary(resp?.data?.summary);
        }
        setpageLoading(false);
        !loadmore && setspinnerLoading(false);
    };

    const handleDataFormat = (dataSet) => {
        setData(groupDataByParam(dataSet, 'PROCESSDATE'));
    };

    useEffect(() => {
        getSummary(false);
    }, [month, user?.userID, status]);

    return (
        <Box>
            {spinnerLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <React.Fragment>
                    <Stack direction="row" spacing={1} justifyContent="space-evenly" sx={{ bgcolor: 'white.main', px: 1, py: 2 }}>
                        {summary?.map((item, idx) => (
                            <Stack direction="column" justifyContent={'center'} alignItems="center" key={idx}>
                                <Typography color="grey.main" fontSize={12} sx={{ textTransform: 'uppercase' }}>
                                    {item?.label}
                                </Typography>
                                <Typography fontSize={14} fontWeight="bold">
                                    {item?.fmt == 'dollar' ? (
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={item?.value || '0'}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType="text"
                                            prefix="$"
                                        />
                                    ) : (
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={item?.value || '0'}
                                            decimalScale={0}
                                            displayType="text"
                                        />
                                    )}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                    {sales?.length > 0 && <SalesGrid data={data} />}
                    {sales.length >= 20 && isLoading && (
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
                                        getSummary();
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
                    {sales?.length == 0 && <NoPendingBets type={'earningsales'} />}
                </React.Fragment>
            )}
        </Box>
    );
};

export default EarningsTipSales;
