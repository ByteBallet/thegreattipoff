import React, { useEffect, useContext, useState } from 'react';
import { Box, Button, Stack, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import CustomIndicatorTabs from '@Components/Shared/CustomIndicatorTabs';

import racingSiteStore from '@stores/racingSiteStore';
import { getAllRaceTracks, getPeriodMenuOptions } from '@services/tipster/tipsterService';
import { UserContext } from '@Context/User/UserProvider';
import BoxDivider from '@Components/Shared/BoxDivider';
import FilterContainer from '@Components/Leaderboard/FilterContainer';

import DataTable from '../DataTable/DataTable';
import { groupByKey, scrollToTop } from '@Components/utils/util';
import { STATS_TABS } from '@lib/constants';
import { getOrgTips, getOrgTipster } from '@services/RacingSites/racingSitesService';
import styled from 'styled-components';
import RacingSiteLeaderboardTable from '../RacingSiteLeaderboardTable';
import RacingSiteFilterContainer from '../RacingSiteFilterContainer';
import CircularLoader from '@Components/common/CircularLoader';
import Share from '@Components/Share';

import LoadingButton from '@mui/lab/LoadingButton';

import authAPI from '@Components/utils/authAPI';
import moment from 'moment';
import { useRouter } from 'next/router';

const ImageWrapper = styled.div`
    margin: 0px 15px;
    padding: 10px 0px;
`;

const Container = styled.div`
    background: white;
    width: 100%;
`;

const BodyContainer = styled(Container)`
    border: solid 0.5px;
    border-color: grey;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 5px 5px;
    padding-left: 5px;
    padding-right: 5px;
    padding: 5px;
`;

const Header = styled.div`
    background: purple;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px 5px 0px 0px;
`;

const Stats = ({ selectedType, siteName, handleBetSlip, setopenBetSlip }) => {
    const router = useRouter()
    const { user } = useContext(UserContext);
    const isDesktop = useMediaQuery('(min-width:900px)');
    const tipsterList = racingSiteStore((state) => state.tipsterList);
    const tipster = racingSiteStore((state) => state.tipster);
    const tracks = racingSiteStore((state) => state.tracks); //
    const period = racingSiteStore((state) => state.period);
    const periodOptions = racingSiteStore((state) => state.periodOptions);
    const bettype = racingSiteStore((state) => state.bettype);
    const staking = racingSiteStore((state) => state.staking);
    const activeTab = racingSiteStore((state) => state.activeTab);
    const updateStats = racingSiteStore((state) => state.updateStats);
    const numTips = racingSiteStore((state) => state.numTips);
    const racingSiteData = racingSiteStore((state) => state.racingSiteData);

    const initialise = racingSiteStore((state) => state.initializeStore);
    const updateData = racingSiteStore((state) => state.updateData);

    const [showSocialMedial, setShowSocialMedia] = useState(false);
    const [shareLink, setShareLink] = useState('');

    const filter = {
        period: period,
        bettype: bettype,
        staking: staking,
        tipster: tipster,
    };

    const handleTabChange = (event, newValue) => {
        updateData({ key: 'activeTab', value: newValue });
    };

    const getPeriodMenu = async () => {
        let body = { userid: user?.userID };
        const response = await getPeriodMenuOptions(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            let pOptions = response?.data?.period
            initialise({ key: 'periodOptions', value: response?.data?.period });
            if (router?.query?.timeperiod && pOptions?.length > 0) {
                let idx = pOptions?.findIndex((item) => item?.VAL?.toLowerCase() == router?.query?.timeperiod?.toLowerCase());
                idx != -1 && updateData({ key: 'period', value: router?.query?.timeperiod });
            }
        }
    };

    const [loading, setLoading] = useState(true);

    const getLbData = async (pagestart = 0) => {
        setLoading(true);
        const response = await getOrgTips(
            numTips,
            pagestart > 0 ? racingSiteData?.length : 0,
            tipster,
            selectedType,
            tracks,
            bettype,
            staking,
            activeTab,
            period,
            siteName,
            'stats'
        );

        updateData({ key: 'racingSiteData', value: response?.hotbet });
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

    useEffect(() => {
        getPeriodMenu();
        setFilterValues()
    }, []);

    useEffect(() => {
        getLbData();
        if (showSocialMedial) {
            setShowSocialMedia(false);
        }
    }, [selectedType, updateStats, activeTab, tipster, numTips]);

    useEffect(() => {
        getTipster();
    }, [period]);

    const [loadLink, setLoadLink] = useState(false);

    const getShareURL = async () => {
        const body = {
            userid: '',
            period: period,
            track: [0],
            bettype: bettype,
            staking: staking == 'evenstake' ? 'EVEN' : 'ACTUAL',
            ntips: numTips,
            tipsterid: tipster,
            type: 'org',
            siteName,
        };
        setLoadLink(true);
        try {
            const url = `${process.env.server}/api/createStatShortLink`;
            const resp = await authAPI(url, body, 'POST', false);

            if (!resp.error && resp.data.ERROBJ.ERRORCODE == 0) {
                setShareLink(resp?.data?.mylink);
                setShowSocialMedia(true);
            }
        } catch (e) {
            console.log(e);
        }

        setLoadLink(false);
    };

    const getTipster = async () => {
        const tipster = await getOrgTipster(selectedType, siteName);
        initialise({
            key: 'tipsterList',
            value: tipster,
        });
    };

    const handleFilterChange = (prop) => (event) => {
        const {
            target: { value },
        } = event;
        let val = value;
        if (prop == 'tracks') {
            const index = value.indexOf(0); //All option check
            if (index > -1) {
                // only splice array when item is found
                value.splice(index, 1); // 2nd parameter means remove one item only
            }
            let clear = value.indexOf(-1) > 0; // clear all clicked
            val = clear ? [] : typeof value === 'string' ? value.split(',') : value;
        }
        updateData({ key: prop, value: val });
    };

    function getPeriodLabel(period) {
        const p = parseInt(period);
        if (!isNaN(p)) {
            let today = moment(); // .subtract(p, 'days');
            if (p == 1) return 'Today';
            else if (p == -1) return 'Yesterday';
            else if (p > 1) return `${period} days at ${today.format('DD MMMM, YYYY')}`;
            else if (period == 0) return 'All Time';
            else return `${period}`;
        }

        return '';
    }

    const heading = `Check out ${siteName}'s verified stats at theGreatTipoff 👉`;
    const headingAlt = `Check out ${siteName}'s verified stats at theGreatTipoff`;
    const shareHeading = `Share ${siteName}'s verified tipping statistics`;

    const renderBetTypeFilter = (value) => {
        let label = '<b>Win Tips</b> with <b>Even Stake</b>';
        if (value == 'placeEven') {
            label = '<b>Place Tips</b> with Even Stake</b>';
        } else if (value == 'actual') {
            label = '<b>Actual Stake</b> on all tips';
        }
        return (
            <Typography color={'black.main'} fontSize={12}>
                <div
                    dangerouslySetInnerHTML={{
                        __html: label,
                    }}
                />
            </Typography>
        );
    };
    useEffect(() => {
        if (!loading && Object?.keys?.(router?.query)?.length > 1) {
            scrollToTop('filterStat')
        }
    }, [loading])
    return (
        <React.Fragment>
            <Box sx={{ mt: 2 }}>
                {<div id="filterStat" />}
                <Box sx={{ bgcolor: '#fff' }}>
                    <CustomIndicatorTabs tabs={STATS_TABS} handler={handleTabChange} active={activeTab} label="LB Menu" clsName="LbSubMenu" />
                </Box>
                <Box px={2} py={1}>
                    <RacingSiteFilterContainer selectedType={selectedType} isMarket={false} />
                </Box>
                {loading ? (
                    <>
                        <CircularLoader />
                    </>
                ) : (
                    <>
                        <Container>
                            <ImageWrapper>
                                <Header>
                                    <img
                                        src={`${process.env.cdn}/images/logo/logo.svg`}
                                        height="15"
                                        className="logo"
                                        style={{ cursor: 'pointer' }}
                                        alg="logo"
                                    />
                                </Header>
                                <BodyContainer>
                                    <Stack direction={'column'}>
                                        <RacingSiteLeaderboardTable
                                            selectedType={selectedType}
                                            statsTabs={STATS_TABS}
                                            isMarket={false}
                                            handleBetSlip={handleBetSlip}
                                            setopenBetSlip={setopenBetSlip}
                                            getLbData={getLbData}
                                            isStatsTab
                                            statsPage={true}
                                        />
                                        <BoxDivider />
                                        <Stack mb={2} px={2} direction={isDesktop ? 'row' : 'column'} justifyContent={'space-between'}>
                                            <Typography textAlign={'center'} fontSize={12}>
                                                Tracks: <b>{tracks.length > 0 ? tracks.length + ' ' + 'Tracks' : 'All'}</b>
                                            </Typography>
                                            <Typography textAlign={'center'} fontSize={12}>
                                                Period: <b>{getPeriodLabel(period)}</b>
                                            </Typography>

                                            <Typography
                                                textAlign={'center'}
                                                className="textCapitalize"
                                                fontSize={12}
                                                noWrap
                                                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
                                            >
                                                Using:&nbsp;{renderBetTypeFilter(bettype)}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </BodyContainer>
                                {showSocialMedial ? (
                                    <>
                                        <Share shareUrl={shareLink} heading={heading} shareHeading={shareHeading} headingAlt={headingAlt} />
                                    </>
                                ) : (
                                    <LoadingButton
                                        loading={loadLink}
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
                                    // <Button
                                    //     fullWidth
                                    //     variant="contained"
                                    //     size="small"
                                    //     color="success"
                                    //     sx={{
                                    //         borderRadius: '8px',
                                    //         fontWeight: '700',
                                    //         marginTop: '16px',
                                    //         marginBottom: '8px',
                                    //         height: '45px',
                                    //         fontSize: 16,
                                    //     }}
                                    //     onClick={async () => {

                                    //         getShareURL();
                                    //     }}
                                    // >
                                    //     {loadLink ? (
                                    //         <>
                                    //             <CircularLoader />
                                    //         </>
                                    //     ) : (
                                    //         <>Share</>
                                    //     )}
                                    // </Button>
                                )}
                            </ImageWrapper>
                        </Container>
                    </>
                )}
                <Box my={2} mx={2}>
                    <BoxDivider />
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default Stats;
