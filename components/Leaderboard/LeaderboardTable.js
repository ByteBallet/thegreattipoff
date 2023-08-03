import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
    Avatar,
    Box,
    ClickAwayListener,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { getMarket, getLeaderboardData } from '@services/leaderboard/lbService';
import lbStore from '@stores/lbStore';
import FollowButton from '@Components/Tipster/FollowButton';
import NumberFormat from 'react-number-format';
import TipsterAvatar from '@Components/BetSlip/Hotbet/TipsterAvatar';
import GetTipsButton from './GetTipsButton';
import { useRouter } from 'next/router';
import StreakDetails from './StreakDetails';
import LoadGetTips from '@Components/Tipster/GetTips/LoadGetTips';
import { toTitleCase } from '@utils/hotBetUtils';
import LoadMore from './LoadMore';
import { UserContext } from '@Context/User/UserProvider';
import BoxDivider from '@Components/Shared/BoxDivider';
import CustomALert from '@Components/Shared/CustomALert';
import { LB_ACTIVE_TAB_VALUES } from '@lib/constants';
import CircularLoader from '@Components/common/CircularLoader';
import TipLoading from '@Components/LoadingSkeleton/TipLoading';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { styled } from '@mui/material/styles';

import { tooltip_data } from './tooltip.util';
import { KeyboardArrowDown } from '@mui/icons-material';
import { getTipsterAlias, scrollToTop } from '@Components/utils/util';
import shallow from 'zustand/shallow';

const useStyles = makeStyles({
    sticky: {
        position: 'sticky',
        left: 0,
    },
});

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(1, 1, 1, 0.80)',
        maxWidth: 220,
        cursor: 'none',
    },
}));

function MobileToolTip({ title, col, isBold = false, streaksHeader = false }) {
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <TableCell
            onClick={handleTooltipOpen}
            align="center"
            padding="none"
            sx={{
                width: streaksHeader ? '25%' : '13%',
                color: 'grey.main',
                fontWeight: isBold ? 'bold' : 'normal',
                fontSize: isBold ? 14 : 12,
            }}
        >
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <Box>
                    <HtmlTooltip
                        title={title ?? <></>}
                        arrow
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                    >
                        <Typography
                            sx={{
                                borderBottom: 1,
                                color: 'grey.main',
                                borderColor: 'grey',
                                fontWeight: isBold ? 'bold' : 'normal',
                                fontSize: isBold ? 14 : 12,
                                cursor: 'pointer',
                                borderBottomStyle: 'dashed',
                            }}
                        >
                            {col}
                            <br />
                        </Typography>
                    </HtmlTooltip>
                </Box>
            </ClickAwayListener>
        </TableCell>
    );
}

function DesktopToolTip({ title, col, setSortOrder = () => { }, showSort = false, isBold = false }) {
    return (
        <HtmlTooltip title={title} arrow>
            <TableCell
                align="center"
                padding="none"
                sx={{
                    width: '13%',
                    color: 'grey.main',
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontSize: isBold ? 14 : 12,
                    cursor: 'pointer',
                }}
            >
                <Typography
                    sx={{
                        borderBottom: 1,
                        color: 'grey.main',
                        borderColor: 'grey',
                        fontWeight: isBold ? 'bold' : 'normal',
                        fontSize: isBold ? 14 : 12,
                        cursor: 'pointer',
                        borderBottomStyle: 'dashed',
                    }}
                >
                    {col}
                    {/* {showSort && (
                        <Box onClick={() => setSortOrder((sortOrder) => (sortOrder !== 1 ? 1 : 0))} height={'20px'} mt={-1}>
                            <KeyboardArrowDown fontSize="14" />
                        </Box>
                    )} */}
                </Typography>
            </TableCell>
        </HtmlTooltip>
    );
}

const LeaderboardTable = ({
    isTrack = false,
    selectedType,
    statsTabs,
    isMarket,
    lastUpdated,
    setlastUpdated,
    handleBetSlip,
    reloadData,
    setreloadData,
    initRaceType = 'R',
}) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const router = useRouter();
    const classes = useStyles();
    const lbData = lbStore((state) => state.lbData, shallow);
    const activeTab = lbStore((state) => state.activeTab, shallow);
    const staking = lbStore((state) => state.staking, shallow);
    const bettype = lbStore((state) => state.bettype, shallow);
    const media = lbStore((state) => state.media, shallow);
    const tipster = lbStore((state) => state.tipster, shallow);
    const tracks = lbStore((state) => state.tracks, shallow);
    const period = lbStore((state) => state.period, shallow);
    const mediaGroups = lbStore((state) => state.mediaGroups, shallow);
    const numTips = lbStore((state) => state.numTips, shallow);
    const updateStats = lbStore((state) => state.updateStats, shallow);
    const raceday = lbStore((state) => state.raceday, shallow);
    const racetrack = lbStore((state) => state.racetrack, shallow);
    const initData = lbStore((state) => state.initData, shallow);

    const updateData = lbStore((state) => state.updateData);
    const [loading, setloding] = useState(false);
    const [hideLoadMore, sethideLoadMore] = useState(false);
    const [openGetTipsModal, setOpenGetTipsModal] = useState(false);
    const [selectedTipster, setselectedTipster] = useState();

    const bottomRef = useRef(null);

    const [sortOrder, setSortOrder] = useState(-1);

    const [recordCount, setRecordCount] = useState({
        pageStart: 0,
        totalRecs: -1,
    });

    const [moreLoading, setMoreLoading] = useState(false);

    // check if the user is logged in or not
    const { user } = useContext(UserContext);

    const handleOnClickGetTips = (uid) => {
        setOpenGetTipsModal(true);
        setselectedTipster(lbData?.filter((item) => item?.USERID == uid));
    };

    const getLbData = async (pageStart = 0) => {
        setloding(true);
        // if (recordCount?.pageStart > 0) { scrollToTop('tableHeader') }
        let FrmSelectPunters = media;
        if (media != 0 && media != 1) {
            let selected = mediaGroups[media];
            FrmSelectPunters = selected?.GROUPVALUE;
        }
        let nBody = {
            userid: user?.userID || '',
            media: FrmSelectPunters,
            racetype: selectedType,
            page: isTrack ? 'leaderboard' : isMarket ? 'tipmarket' : 'leaderboard',
            period: period,
            locid: racetrack > 0 ? [racetrack] : tracks.length === 0 ? [0] : tracks,
            lbtype: 'HB',
            BetType: bettype,
            StatType: 'BEST',
            stake: staking,
            rank: LB_ACTIVE_TAB_VALUES[activeTab] ?? 'WINPROFIT',
            mediagroup: mediaGroups[media]?.GROUPVALUE ?? 'All',
            pagestart: pageStart > 0 ? lbData?.length : 0,
            totaltips: numTips,
            tipsterid: router?.query?.search ? (router?.query?.search) : 'All',
            filterDate: isMarket && raceday ? raceday : '2000-01-01',
            nrecs: pageStart > 0 ? 30 : 10,
        };

        if (recordCount.pageStart > 0) {
            setMoreLoading(true);
        }

        const { error, data } = await getLeaderboardData(nBody);

        if (!error && data?.hotbet) {
            setlastUpdated && setlastUpdated(data?.lastupdate);
            if (pageStart) {
                // Its not the first page, append data
                updateData({ key: 'lbData', value: [...lbData, ...data?.hotbet] });
            } else {
                updateData({ key: 'lbData', value: user?.userID ? data?.hotbet : data?.hotbet.slice(0, 5) });
            }
            data?.hotbet?.length == 0 ? sethideLoadMore(true) : sethideLoadMore(false);
            if (data?.totalrecs) {
                setRecordCount({
                    pageStart: pageStart,
                    totalRecs: data?.totalrecs ?? -1,
                });
            }
        }

        setMoreLoading(false);
        setloding(false);
    };

    useEffect(() => {
        typeof reloadData != 'undefined' && getLbData(0);
    }, [reloadData]);

    useEffect(() => {
        initData && getLbData(0);
    }, [initData]);

    let col = 'Profit';
    let param = 'WINBET';
    if (activeTab == 1) {
        col = 'POT';
        param = 'WINPROFIT';
    } else if (activeTab == 2) {
        col = 'Strike%';
        param = 'WINSTRIKERATE';
    } else if (activeTab == 3) {
        col = 'Streak';
        param = 'STREAK';
    }
    const renderData = (data) => {
        let label = statsTabs[activeTab];
        switch (label) {
            case 'POT':
                let valpot = '';
                if (bettype == 'winEven') {
                    valpot = data?.WINPROFIT;
                } else if (bettype == 'placeEven') {
                    valpot = data?.PLACEPROFIT;
                } else {
                    valpot = data?.ACTUALPOT;
                }
                return (
                    <NumberFormat
                        thousandSeparator={true}
                        value={valpot}
                        displayType="text"
                        suffix="%"
                        decimalScale={0}
                        fixedDecimalScale={false}
                    />
                );
            case 'Cash Profit':
                let val = '';
                if (bettype == 'winEven') {
                    val = data?.WINBET;
                } else if (bettype == 'placeEven') {
                    val = data?.PLACEBET;
                } else {
                    val = data?.ACTUALPROFIT;
                }
                return (
                    <NumberFormat
                        thousandSeparator={true}
                        value={val}
                        decimalSeparator="."
                        decimalScale={0}
                        fixedDecimalScale={true}
                        displayType="text"
                        prefix="$"
                    />
                );
            case 'Strike Rate':
                return (
                    <NumberFormat
                        thousandSeparator={true}
                        decimalScale={0}
                        value={(bettype == 'placeEven' ? data?.PLACESTRIKERATE : (bettype == 'winEven' ? data?.WINSTRIKERATE : data?.TOTALSTRIKERATE)) || '0'}
                        displayType="text"
                    />
                );
            case 'Streaks':
                return <StreakDetails data={data} />;
            default:
                return '';
        }
    };

    function sortLbData() {
        let sortedArray = lbData.slice();

        if (sortOrder == 1) {
            // sort ascending
            sortedArray.sort(function (a, b) {
                if (a.AVGWIN > b.AVGWIN) return -1;
                else if (a.AVGWIN < b.AVGWIN) return 1;
                return 0;
            });
        } else {
            // sort descending
            sortedArray.sort(function (a, b) {
                if (a.AVGWIN > b.AVGWIN) return 1;
                else if (a.AVGWIN < b.AVGWIN) return -1;
                return 0;
            });
        }
        return sortedArray ?? [];
    }


    const showLoadMore = recordCount.totalRecs === -1 ? true : recordCount.totalRecs > lbData.length ? true : false;
    return (
        <React.Fragment>
            <TableContainer sx={{ width: 1, bgcolor: 'white.main', zIndex: 1, overflow: loading ? "hidden" : "auto" }} id="tableHeader">
                <Table size={'small'} aria-label="simple table" style={{ tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.sticky} align="center" padding="none" sx={{ width: 'auto' }}></TableCell>
                            {activeTab != 3 || isDesktop ? (
                                <React.Fragment>
                                    {isDesktop ? (
                                        <DesktopToolTip title={tooltip_data[col]?.html ?? <></>} col={col} isBold={true} />
                                    ) : (
                                        <MobileToolTip title={tooltip_data[col]?.html ?? <></>} col={col} isBold={true} />
                                    )}
                                    {/* <ClickAwayListener onClickAway={handleToolTipClose}>
                                        <HtmlTooltip title={tooltip_data[col]?.html ?? <></>} arrow>
                                            <TableCell
                                                align="center"
                                                padding="none"
                                                sx={{ width: '13%', color: 'grey.main', fontWeight: 'bold' }}
                                            >
                                                <Stack sx={{}}>
                                                    {col}
                                                    <br />
                                                    {col.toLowerCase() == 'streak' && (
                                                        <Box onClick={() => setSortOrder(sortOrder !== 1 ? 1 : 0)} height={'20px'} mt={-1}>
                                                            <KeyboardArrowDown fontSize="14" />
                                                        </Box>
                                                    )}
                                                </Stack>
                                            </TableCell>
                                        </HtmlTooltip>
                                    </ClickAwayListener> */}

                                    {isDesktop ? (
                                        <DesktopToolTip title={tooltip_data.Tips?.html ?? <></>} col={'# Tips'} />
                                    ) : (
                                        <MobileToolTip title={tooltip_data.Tips?.html ?? <></>} col={'# Tips'} />
                                    )}
                                    {/* <HtmlTooltip title={tooltip_data.Tips?.html} arrow>
                                        <TableCell
                                            align="center"
                                            padding="none"
                                            sx={{ width: '13%', lineHeight: 1.5, color: 'grey.main', fontSize: 12 }}
                                        >
                                            # Tips
                                        </TableCell>
                                    </HtmlTooltip> */}

                                    {isDesktop ? (
                                        <DesktopToolTip title={tooltip_data.Odds?.html ?? <></>} col={'Avg. Odds'} />
                                    ) : (
                                        <MobileToolTip title={tooltip_data.Odds?.html ?? <></>} col={'Avg. Odds'} />
                                    )}
                                    {/* <HtmlTooltip title={tooltip_data.Odds?.html} arrow>
                                        <TableCell
                                            align="center"
                                            padding="none"
                                            sx={{
                                                width: '14%',
                                                lineHeight: 1.5,
                                                color: 'grey.main',
                                                width: '15%',
                                                fontSize: 12,
                                            }}
                                        >
                                            Avg. Odds
                                        </TableCell>
                                    </HtmlTooltip> */}
                                </React.Fragment>
                            ) : (
                                <MobileToolTip title={tooltip_data[col]?.html ?? <></>} col={col} streaksHeader={true} />
                            )}
                            <TableCell align="center" padding="none" sx={{ width: '25%' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lbData && !loading &&
                            lbData.map((row, idx) => (
                                <TableRow key={idx} id={(idx == lbData?.length - 5) ? "lbLoadMore" : null}>
                                    <TableCell
                                        align="center"
                                        padding="none"
                                        className={classes.sticky}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'start',
                                            justifyContent: 'start',
                                            py: 1,
                                            px: 0.5,
                                            height: 1,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => router.push(`/tipster/${getTipsterAlias(row?.ALIAS)}?rtype=${selectedType}`)}
                                    >
                                        <Grid container spacing={0.5} sx={{ width: 1 }}>
                                            <Grid container item xs="auto">
                                                <b style={{ fontSize: 12 }}>{idx + 1}</b>
                                                &nbsp;
                                                <Avatar
                                                    sx={{
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                    src={`${process.env.gtoImgPath}/avatar/${row?.AVATARPATH}`}
                                                    aria-label={row?.ALIAS}
                                                ></Avatar>
                                            </Grid>
                                            <Grid container item xs zeroMinWidth alignItems={"center"} justifyContent={"left"}
                                                sx={{ lineHeight: 1.2 }}>
                                                <Typography
                                                    align='left'
                                                    component={'p'}
                                                    className="textCapitalize"
                                                    color="inherit"
                                                    noWrap
                                                    sx={{
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        lineHeight: 1.2,
                                                        width: 1
                                                    }}
                                                >
                                                    {(row?.NAMELABEL?.trim()?.includes(' ') && !isDesktop) ?
                                                        <div
                                                            className={"lineClamp"}
                                                            dangerouslySetInnerHTML={{
                                                                __html: row?.NAMELABEL?.trim()?.replace(/ /g, "</br>")

                                                            }}
                                                        /> : (row?.NAMELABEL?.trim() || row?.ALIAS?.replace(/ /g, "")?.toLowerCase())
                                                    }
                                                </Typography>
                                                <Typography
                                                    align="left"
                                                    className="lineClamp"
                                                    component="p"
                                                    sx={{
                                                        fontSize: 12,
                                                        wordBreak: 'break-word',
                                                        mt: 0,
                                                    }}
                                                    color="grey.main"
                                                >
                                                    {row?.MEDIAGROUP}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    {activeTab != 3 || isDesktop ? (
                                        <React.Fragment>
                                            <TableCell align="center" padding="none" sx={{ height: 1, fontWeight: 'bold', fontSize: 14 }}>
                                                {renderData(row)}
                                            </TableCell>
                                            <TableCell align="center" padding="none" sx={{ height: 1, fontSize: 12 }}>
                                                <NumberFormat
                                                    thousandSeparator={true}
                                                    value={(bettype == 'placeEven' ? row?.TOTALPLACETIPS : (bettype == 'winEven' ? row?.TOTALWINTIPS : row?.TOTALTIPS)) || '0'}
                                                    decimalSeparator="."
                                                    decimalScale={0}
                                                    fixedDecimalScale={false}
                                                    displayType="text"
                                                />
                                            </TableCell>
                                            <TableCell align="center" padding="none" sx={{ height: 1, fontSize: 12 }}>
                                                <NumberFormat
                                                    thousandSeparator={true}
                                                    value={(bettype == 'placeEven' ? row?.AVGPLACE : (bettype == 'winEven' ? row?.AVGWIN : row?.AVGACTUAL)) || '0'}
                                                    decimalSeparator="."
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    displayType="text"
                                                    prefix="$"
                                                />
                                            </TableCell>
                                        </React.Fragment>
                                    ) : (
                                        <TableCell align="center" padding="none" sx={{ height: 1 }}>
                                            <StreakDetails data={row} />
                                        </TableCell>
                                    )}
                                    <TableCell padding="none" align="center" sx={{ px: 0.5, height: 1 }}>
                                        <Box sx={{ width: '95%' }}>
                                            {row?.NTIPS > 0 && row?.TIPSNOTSHOW == 0 ? (
                                                <GetTipsButton tipsterID={row?.USERID} onClick={() => handleOnClickGetTips(row?.USERID)} />
                                            ) : (
                                                <FollowButton
                                                    format="btn"
                                                    fullwidth={1}
                                                    follow={row?.FOLLOWING || 0}
                                                    tipster={row?.ALIAS}
                                                    tipsterid={row?.USERID}
                                                    showIcon={true}
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={activeTab != 3 || isDesktop ? 5 : 3} align="center">
                                    <TipLoading skipHeader={true} displayColumns={lbData?.length > 0 ? lbData?.length : 15} />
                                </TableCell>
                            </TableRow>
                        )}
                        {lbData?.length == 0 && !loading && initData && (
                            <React.Fragment>
                                <TableRow>
                                    <TableCell colSpan={activeTab != 3 || isDesktop ? 5 : 3} align="center"
                                    >
                                        <CustomALert
                                            severity="success"
                                            content={`No results for selected criteria`}
                                            warning={false}
                                            isHtml={false}
                                        />
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        )}
                    </TableBody>
                </Table>

                {showLoadMore && !hideLoadMore && (
                    <>
                        <LoadMore
                            callback={() => {
                                const nextPage = recordCount.pageStart + 1;
                                // setRecordCount({
                                //     ...recordCount,
                                //     pageStart: nextPage,
                                //     // totalRecs: data?.totalRecs ?? -1,
                                // });
                                getLbData(nextPage);
                            }}
                            loading={moreLoading}
                        />
                    </>
                )}
            </TableContainer>
            <LoadGetTips
                isCarousel={true}
                open={openGetTipsModal}
                setOpenGetTipsModal={setOpenGetTipsModal}
                alias={selectedTipster ? toTitleCase(selectedTipster?.[0]?.ALIAS) : ''}
                tipster={selectedTipster?.[0]}
                selectedCategory={null}
                selectedType={selectedTipster ? selectedTipster?.[0]?.RACETYPE : ''}
                selectedDate={0}
                handleBetSlip={handleBetSlip}
                defaultDay={isMarket && raceday ? raceday : null}
                defaultRType={selectedType}
            // stakeErr={stakeErr}
            // totalBets={totalBetsRef}
            />
        </React.Fragment >
    );
};

export default LeaderboardTable;
