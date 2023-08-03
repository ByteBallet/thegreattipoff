import React, { useContext, useEffect, useState } from 'react';

import Header from './Stats/Header';
import DateSelector from './Stats/DateSelector';
import FieldSelector from './Stats/FieldSelector';
import StatsImage from './Stats/StatsImage';
import Share from '@Components/Share';
import TipsterTips from './TipsterTips';

import lbStore from '@stores/lbStore';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import moment from 'moment';
import CircularLoader from '@Components/common/CircularLoader';
import { Button, Box, Alert, Stack, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { getMinTips } from '@Components/utils/RacingUtil';
import { groupByKey, scrollToTop } from '@Components/utils/util';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import { getAllRaceTracks, getPeriodMenuOptions } from '@services/tipster/tipsterService';

const ShareButton = (props) => { };

const Stats = ({ tipster, selectedType, selectedCategory, isUser }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const router = useRouter()
    const bettype = lbStore((state) => state.bettype, shallow);
    const staking = lbStore((state) => state.staking, shallow);
    const period = lbStore((state) => state.period, shallow);
    const track = lbStore((state) => state.alternateRaceTrack, shallow);
    const numTips = lbStore((state) => state.numTips, shallow);
    const alternateRaceTrackValue = lbStore((state) => state.alternateRaceTrackValue, shallow);

    const [shareLink, setShareLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [shareLoad, setShareLoad] = useState(false);
    const [tipsLoaded, settipsLoaded] = useState(!isUser ? false : true)
    const initialise = lbStore((state) => state.initializeStore);
    const updateData = lbStore((state) => state.updateData);
    const reset = lbStore((state) => state.reset);
    const [reloadData, setreloadData] = useState(false)

    const [HbTipMarket, setHBTipMarket] = useState(null);

    const user = useContext(UserContext);

    const getShareURL = async () => {
        setShareLoad(true);

        const body = {
            userid: tipster.USERID,
            period: period,
            track: alternateRaceTrackValue,
            bettype: bettype,
            staking: staking == 'evenstake' ? 'EVEN' : 'ACTUAL',
            ntips: numTips,
            type: 'tipster',
        };
        try {
            const url = `${process.env.server}/api/createStatShortLink`;
            const resp = await authAPI(url, body, 'POST', false);

            if (!resp.error && resp.data.ERROBJ.ERRORCODE == 0) {
                setShareLink(resp?.data?.mylink);
                setShowShare(true);
            }
        } catch (e) {
            console.log(e);
        }
        setShareLoad(false);
    };

    const getTipster = async () => {
        const url = `${process.env.server}/hbet/gethotbetdata`;
        setLoading(true);

        const body = {
            userid: user?.userID,
            alias: tipster?.ALIAS,
            tipsterid: tipster?.USERID,
            racetype: selectedType,
            bettype: bettype,
            stake: staking,
            locid: [alternateRaceTrackValue],
            period: period,
            page: 'leaderboard',
            stattype: 'select',
            totaltips: numTips,
            media: 0,
        };

        if (body) {
            try {
                const response = await authAPI(url, body, 'POST', false);
                setHBTipMarket(response?.data);
            } catch (error) {
                console.log('error---getHBTipMarket', error);
            }
        }

        setLoading(false);
    };
    const setFilterValues = () => {
        if (router?.query?.bettype) {
            let val = router?.query?.bettype
            if (val == "placeeven") {
                val = "placeEven"
            } else if (val == "wineven") {
                val = "winEven"
            }
            updateData({ key: 'bettype', value: val });
        }
        if (router?.query?.tipsterid && router?.query?.tipsterid != 0) {
            updateData({ key: 'tipster', value: router?.query?.tipsterid });
        }
        if (router?.query?.ntips) {
            updateData({ key: 'numTips', value: router?.query?.ntips });
        }
    };

    const getPeriodMenu = async () => {
        let body = { userid: user?.userID, isMarket: false };
        const response = await getPeriodMenuOptions(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            initialise({ key: 'periodOptions', value: response?.data?.period });
            let pList = response?.data?.period
            if (router?.query?.timeperiod && pList?.length > 0) {
                let idx = pList?.findIndex((item) => item?.VAL?.toLowerCase() == router?.query?.timeperiod?.toLowerCase());
                idx != -1 && updateData({ key: 'period', value: router?.query?.timeperiod });
            }
        }
    };


    const getTracks = async () => {
        let body = {
            racetype: selectedType,
            group: false,
            timeperiod: period,
            page: "home"
        };
        try {
            const response = await getAllRaceTracks(body);
            let tList = response?.data?.tracks
            initialise({
                key: 'tracksList',
                value: response?.data?.tracks,
            });
            initialise({
                key: 'trackOptions',
                value: groupByKey(response?.data?.tracks, 'LABEL'),
            });

            if (router?.query?.track && tList?.length > 0) {
                let selected = tList?.filter(
                    (item) => item?.LOCID == +router?.query?.track
                );
                if (selected?.length > 0) {
                    updateData({ key: 'alternateRaceTrackValue', value: selected?.[0]?.LOCID });
                    updateData({ key: 'alternateRaceTrack', value: selected?.[0]?.RACEMEET });
                }
            }
        } catch (error) {
            console.log('error', error);
        } finally {
        }
    };

    useEffect(() => {
        setFilterValues()
        getPeriodMenu().then(() => {
            getTracks()
        }).then(() => {
            setTimeout(() => {
                setreloadData(true)
            }, 300);
        })
        return () => {
            reset()
        }
    }, [])


    useEffect(() => {
        // getShareURL();
        getTipster();
        if (showShare) setShowShare(false);
    }, [reloadData, selectedType]);

    const tipsterName = tipster.ALIAS;

    const heading = `Check out ${isUser ? 'my' : `${tipsterName}'s`} verified stats at theGreatTipOff 👉 `;
    const headingAlt = `Check out ${isUser ? 'my' : `${tipsterName}'s`} verified stats at theGreatTipOff`;
    const shareHeading = `Share ${isUser ? 'your' : `${tipsterName}'s`} verified tipping statistics`;

    useEffect(() => {
        if (tipsLoaded && Object?.keys?.(router?.query)?.length > 1) {
            scrollToTop('filterStat')
        }
    }, [tipsLoaded])


    return (
        <div>
            <div id="filterStat" />
            {!isUser && <TipsterTips tipster={tipster} selectedType={selectedType} selectedCat={selectedCategory} settipsLoaded={settipsLoaded} />}
            {/* {!isDesktop && <div id="filterStat" />} */}
            <FieldSelector racetype={selectedType} tipsterName={tipsterName} reloadData={reloadData}
                setreloadData={setreloadData}
            />
            {loading ? (
                <>
                    <CircularLoader />
                </>
            ) : (
                <>
                    {' '}
                    {!HbTipMarket?.hotbet[0]?.HOTBETADDETAIL ? (
                        <Stack alignItems={'center'} justifyContent={'center'}>
                            <Alert severity="info">No stats available for this criteria</Alert>
                        </Stack>
                    ) : (
                        <>

                            <StatsImage racetype={selectedType} tipster={tipster} HbMarket={HbTipMarket?.hotbet[0].HOTBETADDETAIL ?? null} />
                            {showShare ? (
                                <Share shareHeading={shareHeading} shareUrl={shareLink} heading={heading} headingAlt={headingAlt} />
                            ) : (
                                <Box mx={2}>
                                    <LoadingButton
                                        loading={shareLoad}
                                        loadingIndicator={
                                            <Typography color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CircularProgress color="inherit" size={16} sx={{ mr: 1 }} /> Please wait...
                                            </Typography>
                                        }
                                        color="success"
                                        variant="contained"
                                        fullWidth
                                        size="small"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            py: 0,
                                            height: 42,
                                            boxShadow: '0px 2px 0px 0px #386c01',
                                        }}
                                        type="button"
                                        onClick={getShareURL}
                                    >
                                        Share
                                    </LoadingButton>
                                    {/* <Button
                                        fullWidth
                                        variant="contained"
                                        size="small"
                                        color="success"
                                        sx={{
                                            borderRadius: '8px',
                                            fontWeight: '700',
                                            marginTop: '16px',
                                            marginBottom: '8px',
                                            height: '45px',
                                            fontSize: 16,
                                        }}
                                        onClick={getShareURL}
                                    >
                                        {shareLoad ? (
                                            <>
                                                <CircularLoader color="white.main" />{' '}
                                            </>
                                        ) : (
                                            <>Share</>
                                        )}
                                    </Button> */}
                                </Box>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Stats;
