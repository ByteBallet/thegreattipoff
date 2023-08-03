import React, { useState, useContext, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    Typography,
    AccordionDetails,
    Grid,
    Avatar,
    Stack,
    Divider,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ebGradient } from '@lib/constants';
import { UserContext } from '@Context/User/UserProvider';
import { getPackageTips } from '@services/tipTransactions/tipTransactionsService';
import PurchasedTipsDetails from './PurchasedTipsDetails';
import BottomBar from '@modules/Transactions/Components/BottomBar';
import ExpandedPurchasedTipsView from './ExpandedPurchasedTipsView';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import Link from 'next/Link';
import PlayAudio from '@Components/Shared/PlayAudio';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

import CancelIcon from '@mui/icons-material/Cancel';
import InfoAlert from '@Components/Shared/InfoAlert';
import moment from 'moment';

const PurchasedTipsContent = ({ card, open, comments, isFree, handleDelete }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [expanded, setExpanded] = useState(open ? card?.REFID : false);
    const { user } = useContext(UserContext);
    const [details, setdetails] = useState();

    const [expandDetails, setexpandDetails] = useState([]);
    const handleExpandClick = (value) => {
        let chk = expandDetails.filter((item) => item === value);
        if (chk.length > 0) {
            setexpandDetails(expandDetails.filter((item) => item !== value));
        } else {
            setexpandDetails([...expandDetails, value]);
        }
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getPackageDetails = async () => {
        let body = {
            userid: user?.userID,
            idbal: card?.IDBAL,
            packid: card?.REFID,
        };
        const resp = await getPackageTips(body);
        if (!resp?.error && resp?.data?.ERROBJ?.ERRORCODE == 0) {
            setdetails(resp?.data?.trans);
        }
    };

    const [accordin, setAccordin] = useState(open);

    useEffect(() => {
        open && getPackageDetails();
    }, [])


    const handleAcc = (refid) => {
        setAccordin(!accordin)
        if (!accordin) {
            getPackageDetails();
        }
    }
    return (
        <Card
            sx={{
                color: 'background.legs',
                bgcolor: 'white.main',
                mb: 2,
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <Box
                    sx={{
                        width: '100%',
                        // height: '40px',
                        p: 1,
                        backgroundImage: isDesktop ? `url(/images/gto/D-tipster-header-bg.png)` : `url(/images/gto/tipster-header-bg.png)`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <Grid container spacing={0} sx={{}}>
                        {/* {isFree && (
                            <Grid item xs={1.6}>
                                <IconButton aria-label="delete" sx={{ color: 'white.main' }} onClick={() => handleDelete(card?.REFID)}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </Grid>
                        )} */}

                        {/*  {isFree && (
                            <Grid item xs={1}>
                                <Box onClick={() => handleDelete(card?.REFID)}>
                                    <CancelIcon fontSize="13" color="primary" />
                                </Box>
                            </Grid>
                        )} */}
                        <Grid item xs={1.5}>
                            <Avatar
                                sx={{
                                    width: 35,
                                    height: 35,
                                    border: 2,
                                    borderColor: 'white.main',
                                }}
                                src={`${process.env.cdn}/images/avatar/${card?.AVATARPATH}`}
                                aria-label="recipe"
                                alt={card?.ALIAS}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={isFree ? 8 : 9}
                            container
                            alignItems={'start'}
                            flexDirection="column"
                            justifyContent={'start'}
                            sx={{ maxWidth: '90%' }}
                        >
                            <Typography className="lineClamp" color="white.main" sx={{ fontSize: 14, width: '100%', fontWeight: 'bold' }}>
                                {card?.ALIAS}&apos;s&nbsp;{isFree ? 'Free Tips' : 'Tipping Package'}
                            </Typography>
                            <Stack direction="row" justifyContent={'space-between'} alignItems="center" sx={{ width: '100%' }}>
                                <Typography color="white.main" className="lineClamp" sx={{ fontSize: 11 }}>
                                    {card?.TIPSTERORG}
                                </Typography>
                                {card?.PAYMENT_TYPE == 'Subscription' && (
                                    <Typography color="success.main" fontWeight={'bold'} fontSize={13} noWrap mr={2}>
                                        Sub: {card?.RECEIVEDQTY}&nbsp;of&nbsp;{card?.PURCHASEQTY}
                                    </Typography>
                                )}
                                {
                                    card?.DEFAULTPACK == "99" && (
                                        <Typography color="success.main" fontWeight={'bold'} fontSize={13} noWrap mr={2}>
                                            Pre-Purchase
                                        </Typography>
                                    )
                                }
                            </Stack>
                        </Grid>
                        <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box onClick={() => handleAcc(card?.REFID)}>
                                <Stack direction={'row'} py="auto" alignItems="center">
                                    <Typography fontSize={12} color="white.main">
                                        {accordin ? 'Close' : 'Open'}
                                    </Typography>{' '}
                                    {accordin ? <ExpandLess color="white" /> : <ExpandMore color="white" />}
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {accordin && (
                    <>
                        <AccordionDetails sx={{ px: 0 }}>
                            <React.Fragment>
                                {
                                    card?.DEFAULTPACK == "99" ?
                                        <Box px={2}>
                                            <InfoAlert
                                                content={`You have pre-purchased this Tip Package. Check back on ${moment(card?.PACKDATE).format("ddd, DD/MM")} when the Tip Package is available.`}
                                            />
                                        </Box>
                                        :
                                        <React.Fragment>
                                            <Stack direction="row" justifyContent="space-between" px={2} pt={1}>
                                                {details?.premiumtiplink?.length > 0 && !isFree && (
                                                    <a href={details?.premiumtiplink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                                        <Typography
                                                            fontSize={14}
                                                            color="primary.main"
                                                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
                                                        >
                                                            <RequestPageIcon sx={{ color: 'black.main' }} />
                                                            &nbsp;<u>Show Premium Report</u>
                                                        </Typography></a>
                                                )}
                                                {details?.audiofile?.length > 0 && <PlayAudio url={details?.audiofile} text="Play" />}
                                            </Stack>
                                            {details?.premiumtiplink?.length > 0 && <Divider sx={{ mx: 2, my: 1 }} />}
                                            <PurchasedTipsDetails card={card} details={details} comments={comments} />
                                        </React.Fragment>
                                }
                                {!isFree && (
                                    <React.Fragment>
                                        <ExpandedPurchasedTipsView
                                            item={card}
                                            title={details?.title}
                                            expanded={expandDetails.filter((ele) => ele === card?.REFID)?.length > 0}
                                        />
                                        <Box sx={{ py: 0.5 }}></Box>
                                        <BottomBar
                                            handleExpandClick={() => {
                                                handleExpandClick(card?.REFID);
                                            }}
                                            expanded={expandDetails.filter((ele) => ele === card?.REFID)?.length > 0}
                                        />
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        </AccordionDetails>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default PurchasedTipsContent;
