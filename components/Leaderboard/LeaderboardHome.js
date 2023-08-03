import React, { useEffect, useState, useContext, useRef } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, FormControl, MenuItem, Select, Stack, Typography, useMediaQuery } from '@mui/material';
import IconGroup from '@modules/HotBets/Components/IconGroup';
import { useRouter } from 'next/router';
import { getTopOffset, groupByKey } from '@Components/utils/util';
import CustomIndicatorTabs from '@Components/Shared/CustomIndicatorTabs';
import { getMediaGroups, getSeodata } from '@services/leaderboard/lbService';
import CustomTabs from '@Components/Shared/CustomTabs';
import LeaderboardFilterContainer from './LeaderboardFilterContainer';
import lbStore from '@stores/lbStore';
import { getAllRaceTracks, getPeriodMenuOptions } from '@services/tipster/tipsterService';
import { UserContext } from '@Context/User/UserProvider';
import LeaderboardTable from './LeaderboardTable';
import Disclaimer from '@Components/Shared/Disclaimer';
import LeaderboardNews from '@Components/News/LeaderboardNews';
import BoxDivider from '@Components/Shared/BoxDivider';
import TipMarketStaticContent from '@Components/Shared/TipMarketStaticContent';
import { getLink, getMinTips, getTitle, getTrackname } from '@Components/utils/RacingUtil';
import moment from 'moment';
import SchemaFAQ from '@Components/Shared/SchemaFAQ';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import LoadLBSearch from './LoadLBSearch';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { toTitleCase } from '@utils/hotBetUtils';
import shallow from 'zustand/shallow'

const LeaderboardHome = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext);
    const router = useRouter();

    let raceType = router.asPath?.indexOf("harness") > -1 ? "H" : router.asPath?.indexOf("greyhound") > -1 ? "G" : "R"
    let isMarket = router.asPath.includes("tipmarket") || router.asPath.includes("-racing-tips")
    let isTrack = router.asPath.includes("tracks")


    const initialise = lbStore((state) => state.initializeStore);
    const updateData = lbStore((state) => state.updateData);
    const reset = lbStore((state) => state.reset);

    const [openBetSlip, setopenBetSlip] = useState(false)
    const [selectedType, setselectedType] = useState();
    const [pageIntro, setpageIntro] = useState('');
    const activeTab = lbStore((state) => state.activeTab, shallow);
    const mediaGroups = lbStore((state) => state.mediaGroups, shallow);
    const media = lbStore((state) => state.media, shallow);
    const tracks = lbStore((state) => state.tracks, shallow);
    const tipster = lbStore((state) => state.tipster, shallow);
    const racetrack = lbStore((state) => state.racetrack, shallow);
    const raceday = lbStore((state) => state.raceday, shallow);
    const raceTracksList = lbStore((state) => state.raceTracksList, shallow);
    const raceDayList = lbStore((state) => state.raceDayList, shallow);
    const period = lbStore((state) => state.period, shallow);
    const initData = lbStore((state) => state.initData, shallow);
    const [lastUpdated, setlastUpdated] = useState()
    const [reloadData, setreloadData] = useState()
    let statsTabs = ['Cash Profit', 'POT', 'Strike Rate', 'Streaks'];
    let pageTitle = getTitle(selectedType, isMarket, isTrack, router?.asPath)
    let pageLink = getLink(selectedType, isMarket, isTrack, router?.asPath)
    const initRaceTypeRef = useRef()

    const updateFilter = () => {
        if (selectedType) {
            setFilterValues();
            getPageIntro();
            getMedia(selectedType).then(() => {
                getPeriodMenu()
            }).then(() => {
                getTracks()
            }).then(() => {
                setTimeout(() => {
                    updateData({ key: 'initData', value: true });
                }, 400);
            })
        }
    }

    useEffect(() => {
        updateFilter()
    }, [selectedType]);

    useEffect(() => {
        raceType = router.asPath?.indexOf("harness") > -1 ? "H" : router.asPath?.indexOf("greyhound") > -1 ? "G" : "R"
        isTrack = router.asPath.includes("tracks")
        isMarket = (router.asPath.includes("tipmarket") || router.asPath.includes("-racing-tips"))
        setselectedType(raceType)
        updateData({ key: 'numTips', value: getMinTips("90", false, isMarket, router?.query?.search) });
        return () => {
            reset()
            setreloadData()
        }
    }, [])

    useEffect(() => {
        getPeriodMenu();
    }, [raceday])

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    const handleOnClickType = (key) => (event) => {
        setselectedType(key);
        setTimeout(() => {
            setreloadData(!reloadData)
        }, 500);
    };
    const getPageIntro = async () => {
        const resp = await getSeodata(router.asPath);
        if (!resp.error && resp?.data?.ERROBJ?.ERRORCODE == 0) {
            setpageIntro(resp?.data.qGetSeo?.[0]?.PAGEINTRO);
        }
    };
    const getTracks = async () => {
        let body = {
            racetype: selectedType,
            group: false,
            timeperiod: period,
            page: isTrack ? "track" : isMarket ? "tipmarket" : "home"
        };
        try {
            const response = await getAllRaceTracks(body);
            initialise({
                key: 'tracksList',
                value: response?.data?.tracks,
            });
            initialise({
                key: 'trackOptions',
                value: groupByKey(response?.data?.tracks, 'LABEL'),
            });
            setTracks(response?.data?.tracks)
        } catch (error) {
            console.log('error', error);
        } finally {
        }
    };


    const setTracks = (tList) => {
        if (initData && tList?.length > 0) {
            let selected = tList?.filter(
                (item) => tracks?.includes(item?.LOCID)
            );
            if (selected?.length == 0) {
                updateData({ key: 'tracks', value: [0] });
            }
        } else {
            if (router?.query?.track && tList?.length > 0) {
                let selected = tList?.filter(
                    (item) => item?.RACEMEET?.toLowerCase()?.replace(/ /g, '-') == router?.query?.track?.toLowerCase()?.replace(/ /g, '-')
                );
                if (selected?.length > 0) {
                    updateData({ key: 'tracks', value: [selected?.[0]?.LOCID] });
                }
            }
            else if (router?.query?.locid && tList?.length > 0) {
                let selected = tList?.filter((item) => item?.LOCID == router?.query?.locid);
                if (selected?.length > 0) {
                    updateData({ key: 'tracks', value: [selected?.[0]?.LOCID] });
                }
            }
            else if (isTrack && tList?.length > 0) {
                let racemeet = getTrackname(pageTitle)
                let selected = tList?.filter(
                    (item) => item?.RACEMEET?.toLowerCase()?.replace(/ /g, '-') == racemeet
                );
                if (selected?.length > 0) {
                    updateData({ key: 'tracks', value: [selected?.[0]?.LOCID] });
                }
            }
        }
    }

    const setFilterValues = () => {
        if (router?.query?.staking) {
            updateData({ key: 'staking', value: router?.query?.staking });
        }
        if (router?.query?.bettype) {
            updateData({ key: 'bettype', value: router?.query?.bettype });
        }
        if (router?.query?.stat) {
            let idx = statsTabs?.findIndex(
                (item) => item?.toLowerCase()?.replace(/ /g, '') == router?.query?.stat?.toLowerCase()?.replace(/ /g, '')
            );
            idx != -1 && updateData({ key: 'activeTab', value: idx });
        }
        if (router?.query?.search) {
            updateData({ key: 'tipster', value: router?.query?.search });
        }
    };

    const handleTabChange = (event, newValue) => {
        updateData({ key: 'activeTab', value: newValue });
        setTimeout(() => {
            setreloadData(!reloadData)
        }, 300);
    };

    const handleMediaChange = (event, newValue) => {
        updateData({ key: 'media', value: newValue });
        if (router?.query?.search) {
            handleClearTipster(mediaGroups[newValue]?.GROUPVALUE?.toLowerCase())
        } else {
            setTimeout(() => {
                setreloadData(!reloadData)
            }, 300);
        }
    };

    const getMedia = async (raceType) => {
        let body = { racetype: raceType, isMarket: isMarket };
        const resp = await getMediaGroups(body);
        if (!resp.error && resp?.data?.ERROBJ?.ERRORCODE == 0) {
            let arr = [
                {
                    GROUPVALUE: 'All',
                    MEDIASITE: 'All',
                },
                {
                    GROUPVALUE: 'Media',
                    MEDIASITE: 'Media',
                },
            ];
            setMediaGroups([...arr, ...resp?.data?.groups], mediaGroups)
            initialise({
                key: 'mediaGroups',
                value: [...arr, ...resp?.data?.groups],
            });
        }
    };

    const setMediaGroups = (mlist, prevmediaGroups) => {
        if (initData && mlist?.length > 0 && prevmediaGroups?.length > 0) {
            let idx = mlist?.findIndex((item) => item?.GROUPVALUE?.toLowerCase() == prevmediaGroups?.[media]?.GROUPVALUE?.toLowerCase());
            idx == -1 && updateData({ key: 'media', value: 0 });
        } else {
            if (router?.query?.media && mlist?.length > 0) {
                if (router?.query?.media == 0) {
                    let idx = mlist?.findIndex((item) => item?.GROUPVALUE?.toLowerCase() == 'all');
                    idx != -1 && updateData({ key: 'media', value: idx });
                } else if (router?.query?.media == 1) {
                    let idx = mlist?.findIndex((item) => item?.GROUPVALUE?.toLowerCase() == 'media');
                    idx != -1 && updateData({ key: 'media', value: idx });
                } else {
                    let idx = mlist?.findIndex((item) => item?.GROUPVALUE?.toLowerCase() == router?.query?.media?.toLowerCase());
                    idx != -1 && updateData({ key: 'media', value: idx });
                }
            }
        }
    }

    const getPeriodMenu = async () => {
        let body = { userid: user?.userID, isMarket: isMarket, racetype: raceType };
        const response = await getPeriodMenuOptions(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            let pOptions = response?.data?.period
            initialise({ key: 'periodOptions', value: pOptions });
            initialise({ key: 'raceDayList', value: response?.data?.raceday });
            initialise({ key: 'raceTracksList', value: response?.data?.racetracks });
            if (router?.query?.timeperiod && pOptions?.length > 0 && !initData) {
                let idx = pOptions?.findIndex((item) => item?.VAL?.toLowerCase() == router?.query?.timeperiod?.toLowerCase());
                idx != -1 && updateData({ key: 'period', value: router?.query?.timeperiod });
            }
        }
    };

    const handleClearTipster = (m = "") => {
        const { search, ...rest } = router.query;
        //updateData({ key: 'tipster', value: 'All' });
        router.replace(getLink(selectedType, isMarket, isTrack, router?.asPath))
        if (m?.length > 0) {
            router.push({
                pathname: getLink(selectedType, isMarket, isTrack, router?.asPath),
                query: { media: m }
            })
        } else {
            router.push(getLink(selectedType, isMarket, isTrack, router?.asPath))
        }
    }

    const handleMarketChange = (prop) => (event) => {
        const {
            target: { value },
        } = event;
        let val = value;
        updateData({ key: prop, value: val });
        prop == "racetrack" && updateData({ key: 'tracks', value: [val] })
        setTimeout(() => {
            setreloadData(!reloadData)
        }, 300);
    };
    const imgName = isDesktop ? `D-${raceType}-market-banner.jpg` : `${raceType}-market-banner.png`
    return (
        <React.Fragment>
            {
                selectedType &&
                <Box>
                    <Box
                        sx={{
                            backgroundImage: `url(/images/banner/${imgName})`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                            px: 2,
                            py: 3,
                            height: "auto",
                            minHeight: isDesktop ? 120 : 160,
                            height: isDesktop ? 150 : "auto"
                        }}>
                        <Typography component={'h1'} fontSize={20} fontWeight="bold" className='textCapitalize' sx={{ color: "white.main" }}>
                            {pageTitle}
                        </Typography>
                        {pageIntro && (
                            <Typography component={'p'} fontSize={13} sx={{ color: "white.main", width: isDesktop ? "40%" : "70%", mt: 1 }}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: pageIntro,
                                    }} />
                            </Typography>
                        )}
                    </Box>
                    {/* {isMarket && <LeaderboardNews raceType={selectedType} isMarket={isMarket} isTrack={isTrack} isTop={true} pageTitle={pageTitle} />} */}
                    <Box px={isMarket ? 1 : 2} pb={2}>
                        <Disclaimer />
                        {
                            !isMarket &&
                            <LoadLBSearch pageLink={pageLink} />
                        }
                        {
                            isMarket && !isTrack &&
                            <Box
                                sx={{
                                    position: 'sticky',
                                    top: getTopOffset() + 40,
                                    bgcolor: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    zIndex: 999,
                                    borderRadius: 2,
                                    px: 1
                                }}
                            >
                                <Stack direction="row" spacing={0.6} alignItems="center" justifyContent={"space-between"} sx={{ my: 0.5, width: 2 / 3 }}>
                                    <Typography fontSize={12} fontWeight="bold" color="white.main" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        Show<br />Tips
                                    </Typography>
                                    <Divider orientation="vertical" flexItem />
                                    <FormControl variant="outlined" sx={{ my: 1, ml: 0 }} fullWidth size="small">
                                        <Select
                                            displayEmpty
                                            IconComponent={KeyboardArrowDownIcon}
                                            labelId="raceday-label"
                                            id="raceday-types"
                                            value={raceday}
                                            onChange={handleMarketChange("raceday")}
                                            MenuProps={{
                                                transitionDuration: 0
                                            }}
                                            sx={{
                                                bgcolor: "primary.time",
                                                color: "white.main",
                                                borderRadius: 20,
                                                fontSize: 13,
                                                '& .MuiSelect-select': {
                                                    padding: "1px 0px 1px 8px !important"
                                                },
                                                '& .MuiSelect-icon': {
                                                    color: "white.main"
                                                }
                                            }}
                                            renderValue={(value) => (
                                                <Typography color={'white.main'} className='textCapitalize' fontSize={13}>
                                                    {raceDayList?.filter((item) => item?.RACEDAYDATE == value)?.[0]?.RACEDAYLABEL?.toLowerCase()}
                                                </Typography>
                                            )}
                                        >
                                            {
                                                raceDayList?.map((item, idx) =>
                                                    <MenuItem key={idx} value={item?.RACEDAYDATE}>
                                                        <Typography color={'black.main'} className='textCapitalize' fontSize={14}>
                                                            {item?.RACEDAYLABEL?.toLowerCase()}
                                                        </Typography>
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" sx={{ my: 1 }} fullWidth size="small">
                                        <Select
                                            displayEmpty
                                            IconComponent={KeyboardArrowDownIcon}
                                            labelId="racetrack-label"
                                            id="racetrack-types"
                                            value={racetrack}
                                            onChange={handleMarketChange("racetrack")}
                                            sx={{
                                                bgcolor: "primary.time",
                                                color: "white.main",
                                                borderRadius: 20,
                                                fontSize: 12,
                                                '& .MuiSelect-select': {
                                                    padding: "1px 0px 1px 8px !important"
                                                },
                                                '& .MuiSelect-icon': {
                                                    color: "white.main"
                                                }
                                            }}
                                            MenuProps={{
                                                transitionDuration: 0,
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: '40vh',
                                                    },
                                                },
                                            }}
                                            renderValue={(value) => (
                                                <Typography color={'white.main'} className='textCapitalize' fontSize={13}>
                                                    {raceTracksList?.filter((item) => item?.LOCID == value)?.[0]?.DESCRIPTION?.toLowerCase() || "All Tracks"}
                                                </Typography>
                                            )}
                                        >
                                            <MenuItem value={0}>
                                                <Typography color={'black.main'} className='textCapitalize' fontSize={14}>
                                                    All Tracks
                                                </Typography>
                                            </MenuItem>
                                            {
                                                raceTracksList?.map((item, idx) =>
                                                    <MenuItem key={idx} value={item?.LOCID}>
                                                        <Typography color={'black.main'} className='textCapitalize' fontSize={14}>
                                                            {item?.DESCRIPTION?.toLowerCase()}
                                                        </Typography>
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Stack>
                                {!isTrack && <IconGroup selectedType={selectedType} handleChange={handleOnClickType} hidelabel={true} size={30} padding={"2px"} />}
                            </Box>
                        }
                    </Box>
                    <Box sx={{
                        bgcolor: "white.main",
                        py: 1,
                        px: 2
                    }}>
                        <CustomTabs tabs={mediaGroups.map((item) => item.MEDIASITE)} handler={handleMediaChange} active={media} label="Media" />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <CustomIndicatorTabs tabs={statsTabs} handler={handleTabChange} active={activeTab} label="LB Menu" clsName="LbSubMenu" />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "#fcedfe",
                            py: 1
                        }}>
                        <Box sx={{ px: 2 }}>
                            <Stack direction="column">
                                {
                                    router?.query?.search &&
                                    <React.Fragment>
                                        <Button variant="text" endIcon={<ClearIcon sx={{ color: "grey.main" }} />} color="black" onClick={handleClearTipster}
                                            sx={{
                                                justifyContent: "start",
                                                px: 1,
                                                py: 0.2,
                                                border: 1,
                                                borderRadius: 4,
                                                borderColor: "grey.light",
                                                width: "fit-content"
                                            }}>
                                            {toTitleCase(decodeURI(tipster?.replace(/_/g, " ")))}
                                        </Button>
                                        <BoxDivider />
                                    </React.Fragment>
                                }
                                <Stack direction="row" alignItems={"center"}>
                                    <Typography fontWeight={"bold"} fontSize={14}>
                                        Tipster Results Filter
                                    </Typography>
                                    {
                                        lastUpdated &&
                                        <Typography fontSize={12} ml={5}>
                                            <i>updated&nbsp;{moment(lastUpdated).fromNow()}</i>
                                        </Typography>
                                    }
                                </Stack>
                                <Divider sx={{ borderColor: "#d0d1d2", boxShadow: "0 1px #fff", my: 1 }} />
                            </Stack>
                        </Box>
                        <LeaderboardFilterContainer selectedType={selectedType} isMarket={isMarket} reloadData={reloadData} isTrack={isTrack}
                            setreloadData={setreloadData} />
                    </Box>

                    <Box sx={{ bgcolor: 'white.main' }} py={1.5}>
                        <LeaderboardTable
                            selectedType={selectedType}
                            statsTabs={statsTabs}
                            isMarket={isMarket}
                            setlastUpdated={setlastUpdated}
                            lastUpdated={lastUpdated}
                            handleBetSlip={handleBetSlip}
                            setopenBetSlip={setopenBetSlip}
                            isTrack={isTrack}
                            reloadData={reloadData}
                            setreloadData={setreloadData}
                            initRaceType={initRaceTypeRef?.current}
                        />
                    </Box>
                    <Box my={2} mx={2}>
                        <BoxDivider />
                    </Box>
                    {(isMarket || isTrack) && <LeaderboardNews raceType={selectedType} isMarket={isMarket} isTrack={isTrack} pageTitle={pageTitle} />}
                    <TipMarketStaticContent raceType={selectedType} isTrack={isTrack} />
                    {!isTrack && <SchemaFAQ raceType={selectedType} isTrack={isTrack} />}
                    <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
                </Box >
            }
        </React.Fragment>

    );
};

export default LeaderboardHome;
