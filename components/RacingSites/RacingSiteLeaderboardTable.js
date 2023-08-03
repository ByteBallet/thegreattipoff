import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, ClickAwayListener } from '@mui/material';
import { getMarket, getLeaderboardData } from '@services/leaderboard/lbService';
import racingSiteStore from '@stores/racingSiteStore';
import FollowButton from '@Components/Tipster/FollowButton';
import NumberFormat from 'react-number-format';
import TipsterAvatar from '@Components/BetSlip/Hotbet/TipsterAvatar';
import GetTipsButton from '@Components/Leaderboard/GetTipsButton';
import { useRouter } from 'next/router';
import StreakDetails from '@Components/Leaderboard/StreakDetails';
import LoadGetTips from '@Components/Tipster/GetTips/LoadGetTips';
import { toTitleCase } from '@utils/hotBetUtils';
import LoadMore from '@Components/Leaderboard/LoadMore';
import { UserContext } from '@Context/User/UserProvider';
import BoxDivider from '@Components/Shared/BoxDivider';
import CustomALert from '@Components/Shared/CustomALert';
import TipLoading from '@Components/LoadingSkeleton/TipLoading';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { tooltip_data } from '@Components/Leaderboard/tooltip.util';
import { styled } from '@mui/material/styles';
import { getTipsterAlias } from '@Components/utils/util';

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

const RacingSiteLeaderboardTable = ({
    selectedType,
    statsTabs,
    isMarket,
    lastUpdated,
    setlastUpdated,
    handleBetSlip,
    getLbData,
    isStatsTab = false,
    statsPage = false,
    recordCount,
    loading,
    hideLoadmore = false,
    moreLoading = false,
}) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const router = useRouter();
    const classes = useStyles();
    const racingSiteData = racingSiteStore((state) => state.racingSiteData);
    const activeTab = racingSiteStore((state) => state.activeTab);
    const staking = racingSiteStore((state) => state.staking);
    const bettype = racingSiteStore((state) => state.bettype);
    const media = racingSiteStore((state) => state.media);
    const tipster = racingSiteStore((state) => state.tipster);
    const tracks = racingSiteStore((state) => state.tracks);
    const period = racingSiteStore((state) => state.period);
    const mediaGroups = racingSiteStore((state) => state.mediaGroups);
    const numTips = racingSiteStore((state) => state.numTips);
    const updateStats = racingSiteStore((state) => state.updateStats);
    const raceday = racingSiteStore((state) => state.raceday);
    const racetrack = racingSiteStore((state) => state.racetrack);

    const updateData = racingSiteStore((state) => state.updateData);

    const [openGetTipsModal, setOpenGetTipsModal] = useState(false);
    const [selectedTipster, setselectedTipster] = useState();

    // check if the user is logged in or not
    const { user } = useContext(UserContext);

    const handleOnClickGetTips = (uid) => {
        setOpenGetTipsModal(true);
        setselectedTipster(racingSiteData?.filter((item) => item?.USERID == uid));
    };

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
                    </Typography>
                </TableCell>
            </HtmlTooltip>
        );
    }

    const showLoadMore = recordCount?.totalRecs === -1 ? true : recordCount?.totalRecs > racingSiteData?.length ? true : false;
    return (
        <React.Fragment>
            <TableContainer sx={{ width: 1, bgcolor: 'white.main', zIndex: 1 }}>
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
                                    {isDesktop ? (
                                        <DesktopToolTip title={tooltip_data.Tips?.html ?? <></>} col={'# Tips'} />
                                    ) : (
                                        <MobileToolTip title={tooltip_data.Tips?.html ?? <></>} col={'# Tips'} />
                                    )}
                                    {isDesktop ? (
                                        <DesktopToolTip title={tooltip_data.Odds?.html ?? <></>} col={'Avg. Odds'} />
                                    ) : (
                                        <MobileToolTip title={tooltip_data.Odds?.html ?? <></>} col={'Avg. Odds'} />
                                    )}
                                </React.Fragment>
                            ) : (
                                <MobileToolTip title={tooltip_data[col]?.html ?? <></>} col={col} streaksHeader={true} />
                            )}
                            {!isStatsTab && <TableCell align="center" padding="none" sx={{ width: '25%' }}></TableCell>}
                        </TableRow>
                        {/* <TableRow>
                            <TableCell className={classes.sticky} align="center" padding="none" sx={{ width: 'auto' }}></TableCell>
                            {activeTab != 3 || isDesktop ? (
                                <React.Fragment>
                                    <TableCell align="center" padding="none" sx={{ width: '13%', color: 'grey.main', fontWeight: 'bold' }}>
                                        {col}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        padding="none"
                                        sx={{ width: '13%', lineHeight: 1.5, color: 'grey.main', fontSize: 12 }}
                                    >
                                        # Tips
                                    </TableCell>
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
                                </React.Fragment>
                            ) : (
                                <TableCell align="center" padding="none" sx={{ color: 'grey.main' }}>
                                    Streaks
                                </TableCell>
                            )}
                            {!isStatsTab && <TableCell align="center" padding="none" sx={{ width: '25%' }}></TableCell>}
                        </TableRow> */}
                    </TableHead>
                    <TableBody>
                        {racingSiteData &&
                            !loading &&
                            racingSiteData.map((row, idx) => (
                                <TableRow key={idx} sx={{ backgroundColor: tipster === row.USERID && 'pink' }}>
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
                                            cursor: 'pointer',
                                            height: 1,
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
                                                        /> : (row?.NAMELABEL?.trim() || row?.ALIAS?.toLowerCase())
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
                                    {!isStatsTab && (
                                        <TableCell padding="none" align="center" sx={{ px: 0.5, height: 1 }}>
                                            <Box sx={{ width: '95%' }}>
                                                {row?.NTIPS > 0 && row?.TIPSNOTSHOW == 0 ? (
                                                    <GetTipsButton
                                                        tipsterID={row?.USERID}
                                                        onClick={() => handleOnClickGetTips(row?.USERID)}
                                                    />
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
                                    )}
                                </TableRow>
                            ))}
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={activeTab != 3 || isDesktop ? 5 : 3} align="center">
                                    <TipLoading skipHeader={true} displayColumns={racingSiteData?.length > 0 ? racingSiteData?.length : 15} />
                                </TableCell>
                            </TableRow>
                        )}
                        {(!racingSiteData || racingSiteData?.length == 0) && !loading && (
                            <TableRow>
                                <TableCell colSpan={activeTab != 3 || isDesktop ? 5 : isStatsTab ? 2 : 3} align="center">
                                    <CustomALert
                                        severity="success"
                                        content={`No results for selected criteria`}
                                        warning={false}
                                        isHtml={false}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {showLoadMore && !statsPage && !hideLoadmore && (
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
            // stakeErr={stakeErr}
            // totalBets={totalBetsRef}
            />
        </React.Fragment>
    );
};

export default RacingSiteLeaderboardTable;
