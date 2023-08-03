import { groupByKey, groupDataByParam } from '@Components/utils/util';
import { UserContext } from '@Context/User/UserProvider';
import { Alert, Box, Button, CircularProgress, IconButton } from '@mui/material';
import { getUserSubscriptions, getUserSubscriptionsCards } from '@services/tipTransactions/tipTransactionsService';
import React, { useContext, useEffect, useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import NoPendingBets from '@modules/Transactions/Components/NoPendingBets';
import DateTitle from '@modules/Transactions/Components/DateTitle';
import SubscriptionsCard from './SubscriptionsCard';
import moment from 'moment';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/Link';

const Subscriptions = ({ subStatus }) => {
    const { user } = useContext(UserContext)
    const [summary, setsummary] = useState([])
    const [expiredCards, setexpiredCards] = useState([])
    const [showMore, setshowMore] = useState(true)
    const [data, setData] = useState([]);
    const [spinnerLoading, setspinnerLoading] = useState(false)
    const [pageLoading, setpageLoading] = useState(false)

    const getActiveCards = async () => {
        let body = {
            userid: user?.userID,
        }
        const resp = await getUserSubscriptionsCards(body)
        let c = resp?.data?.cards?.filter((item) => item?.expirymonth?.length > 0 && item?.expiryyear?.length > 0 && item?.expirymonth < moment().format("DD") && item?.expiryyear < moment().format("YY"))
        setexpiredCards(c)
    }

    const getSubscriptions = async (loadmore = true) => {
        !loadmore && setspinnerLoading(true)
        let body = {
            userid: user?.userID,
            active: subStatus,
            startrec: !loadmore ? 0 : summary?.length,
            nrecs: 20
        }
        const resp = await getUserSubscriptions(body)
        if (!resp?.error && resp?.data?.ERROBJ?.ERRORCODE == 0) {
            if (resp?.data?.summary?.length == 0) {
                setshowMore(false)
                !loadmore && setsummary(resp?.data?.summary)
                !loadmore && setData(resp?.data?.summary)
            }
            else {
                if (loadmore) {
                    setsummary([...summary, ...resp?.data?.summary])
                    handleDataFormat([...summary, ...resp?.data?.summary]);
                } else {
                    setsummary(resp?.data?.summary)
                    handleDataFormat(resp?.data?.summary);
                }
            }
        }
        setpageLoading(false)
        !loadmore && setspinnerLoading(false)
    }

    const handleDataFormat = (dataSet) => {
        setData(groupByKey(dataSet, "ACTIVE"))
    };

    useEffect(() => {
        getActiveCards()
        getSubscriptions(false)
    }, [subStatus])

    const renderAddBank = () => {
        return <Link href="/deposit/creditcard">
            <Alert
                severity="info"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                        }}
                    >
                        <KeyboardArrowRightIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{
                    pb: 2,
                    mb: 2,
                    cursor: "pointer",
                    bgcolor: "error.alert",
                    color: "error.alerttext",
                    borderColor: "error.alerttext",
                    border: 1,
                    fontWeight: "bold",
                    '& .MuiAlert-icon': {
                        color: "error.alerttext",
                    }
                }}
            >
                Credit Card used for subscription is expired. Update now
            </Alert>
        </Link>
    }

    return (
        <React.Fragment>
            {
                expiredCards?.length > 0 && renderAddBank()
            }
            <Box p={2}>
                {
                    spinnerLoading ?
                        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                            <CircularProgress />
                        </Box>
                        :
                        <React.Fragment>
                            {
                                Object?.keys?.(data)?.reverse()?.map((active, idx) =>
                                    <React.Fragment key={idx}>
                                        <DateTitle date={active == 1 ? "Active Subscriptions" : "Closed Subscriptions"} isText={true} showTime={false}/>
                                        {data?.[active]?.length > 0 &&
                                            data?.[active]?.map((item, i) =>
                                                <Box key={i}>
                                                    <SubscriptionsCard card={item} />
                                                </Box>
                                            )}
                                    </React.Fragment>
                                )
                            }
                            {summary.length >= 20 && showMore && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {
                                        !pageLoading &&
                                        <Button
                                            variant="text"
                                            onClick={() => {
                                                setpageLoading(true)
                                                getSubscriptions()
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
                                    }
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
                            {
                                summary?.length == 0 &&
                                <NoPendingBets type={"subscriptions"} />
                            }
                        </React.Fragment>

                }
            </Box >
        </React.Fragment>
    );
};

export default Subscriptions;