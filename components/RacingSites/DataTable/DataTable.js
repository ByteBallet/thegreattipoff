import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import NumberFormat from 'react-number-format';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';

import FollowButton from '@Components/Tipster/FollowButton';
import TipsterAvatar from '@Components/BetSlip/Hotbet/TipsterAvatar';

import StreakDetails from './StreakDetails';
import GetTipsButton from '@Components/Leaderboard/GetTipsButton';
import LoadGetTips from '@Components/Tipster/GetTips/LoadGetTips';
import { toTitleCase } from '@utils/hotBetUtils';

const useStyles = makeStyles({
    sticky: {
        position: "sticky",
        left: 0,
    },
    table: {
        fontSize: 12,
        '& .MuiTableCell-root': {
            fontSize: 12,
        },
    },
    tipsTitle: {
        width: "23%",
        padding: 0
    },
    potTitle: {
        width: "15%",
        padding: 0
    },
    noTipsTitle: {
        lineHeight: '16px',
        padding: 0
    },
    avgOddsTitle: {
        lineHeight: '16px',
        padding: 0,
        paddingBottom: '5px'
    },
    rankNo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        padding: 0,
        paddingTop: '10px',
        paddingBottom: '10px',
        position: "sticky",
        left: 0,
    },
    gradient: {
        background: 'rgb(248,219,219)',
        background: 'linear-gradient(90deg, rgba(248,219,219,1) 0%, rgba(221,231,240,1) 100%)',
    }
});

const DataTable = ({
    statsTabs,
    activeTab,
    data,
    staking,
    isStatsTab,
    bettype, }) => {

    const classes = useStyles();
    const [openGetTipsModal, setOpenGetTipsModal] = useState(false);
    const [selectedTipster, setselectedTipster] = useState();
    const isDesktop = useMediaQuery('(min-width:900px)');

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

    const PotDetails = ({ data }) => {
        let label = statsTabs[activeTab]
        switch (label) {
            case 'POT':
                let valpot = ""
                if (bettype == 'winEven') {
                    valpot = data?.WINPROFIT
                } else if (bettype == 'placeEven') {
                    valpot = data?.PLACEPROFIT
                } else {
                    valpot = data?.ACTUALPOT
                }
                return <NumberFormat
                    thousandSeparator={true}
                    value={valpot}
                    displayType="text"
                    suffix="%"
                    decimalScale={0}
                    fixedDecimalScale={false}
                />;
            case 'Cash Profit':
                let val = '';
                if (bettype == 'winEven') {
                    val = data?.WINBET
                } else if (bettype == 'placeEven') {
                    val = data?.PLACEBET
                } else {
                    val = data?.ACTUALPROFIT
                }
                return <NumberFormat
                    thousandSeparator={true}
                    value={val}
                    decimalSeparator="."
                    decimalScale={2}
                    fixedDecimalScale={true}
                    displayType="text"
                    prefix="$"
                />
            case 'Strike Rate':
                return <NumberFormat
                    thousandSeparator={true}
                    value={(bettype == 'placeEven' ? data?.PLACESTRIKERATE : (bettype == 'winEven' ? data?.WINSTRIKERATE : data?.TOTALSTRIKERATE)) || '0'}
                    displayType="text"
                />;
            case 'Streaks':
                return <StreakDetails data={data} />;
            default:
                return "";
        }
    }

    const TableHeader = () => {
        return (<TableHead>
            <TableRow>
                <TableCell className={classes.sticky} align="center" padding="none" >
                    Tipster
                </TableCell>
                {!isStatsTab && <TableCell align="center" className={classes.tipsTitle}>Tips</TableCell>}
                {
                    (activeTab != 3 || isDesktop) ?
                        <React.Fragment>
                            <TableCell align="center" className={classes.potTitle} sx={{ width: isStatsTab ? "19%" : "15%" }}>
                                {col}
                            </TableCell>
                            <TableCell align="center" className={classes.noTipsTitle} sx={{ width: isStatsTab ? "19%" : "13%" }}>No.{!isStatsTab && <br />}Tips</TableCell>
                            <TableCell align="right" className={classes.avgOddsTitle} sx={{ width: isStatsTab ? "19%" : "14%" }}>Avg. Odds</TableCell>
                        </React.Fragment> :
                        <TableCell align="right" padding="none" >Streaks</TableCell>
                }
            </TableRow>
        </TableHead>)
    }

    const handleOnClickGetTips = (uid) => {
        setOpenGetTipsModal(true);
        setselectedTipster(data?.filter((item) => item?.USERID == uid));
    };


    return (
        <React.Fragment>
            <TableContainer sx={{
                width: 1,
                bgcolor: isStatsTab ? '#f9f9f9' : "white.main",
                zIndex: 1
            }}>
                <Table
                    size={"small"}
                    aria-label="simple table"
                    style={{ tableLayout: "fixed" }}
                    className={classes.table}
                >
                    <TableHeader />
                    <TableBody>
                        {data?.length > 0 && data.map((row, idx) => (
                            <TableRow key={idx} className={row?.isSelected ? classes.gradient : ''}>
                                <TableCell
                                    align="center"
                                    className={classes.rankNo} >
                                    <b>{row?.RANK}</b>&nbsp;<TipsterAvatar avatar={row?.AVATARPATH} alias={row?.ALIAS} />
                                    <Box sx={{ textAlign: "left", ml: 0.5 }}>
                                        <Typography
                                            className='textCapitalize lineClamp'
                                            sx={{
                                                color: "inherit",
                                                fontSize: 14,
                                                wordBreak: "break-word",
                                                fontWeight: 700,
                                                lineHeight: 1
                                            }}>
                                            {row?.ALIAS?.toLowerCase()}
                                        </Typography>
                                        <Typography
                                            className='textCapitalize lineClamp'
                                            component="p"
                                            sx={{
                                                fontSize: 12,
                                                wordBreak: "break-word"
                                            }}
                                            color="grey.main">
                                            {row?.MEDIAGROUP?.toLowerCase()}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                {!isStatsTab && <TableCell padding="none" align="center">
                                    {(row?.NTIPS > 0 && row?.TIPSNOTSHOW != 1) ?
                                        <GetTipsButton tipsterID={row?.USERID} onClick={() => handleOnClickGetTips(row?.USERID)} /> :
                                        <FollowButton
                                            format="btn"
                                            fullwidth={1}
                                            follow={row?.FOLLOWING || 0}
                                            tipster={row?.ALIAS}
                                            tipsterid={row?.USERID}
                                            showIcon={true}
                                        />
                                    }
                                </TableCell>}
                                {
                                    (activeTab != 3 || isDesktop) ?
                                        <>
                                            <TableCell align="center" padding="none" >
                                                <PotDetails data={row} />
                                            </TableCell>
                                            <TableCell align="center" padding="none">
                                                <NumberFormat
                                                    thousandSeparator={true}
                                                    value={(bettype == 'placeEven' ? row?.TOTALPLACETIPS : (bettype == 'winEven' ? row?.TOTALWINTIPS : row?.TOTALTIPS)) || '0'}
                                                    decimalSeparator="."
                                                    decimalScale={0}
                                                    fixedDecimalScale={false}
                                                    displayType="text"
                                                />
                                            </TableCell>
                                            <TableCell align="right" padding="none">
                                                t<NumberFormat
                                                    thousandSeparator={true}
                                                    value={(bettype == 'placeEven' ? row?.AVGPLACE : (bettype == 'winEven' ? row?.AVGWIN : row?.AVGACTUAL)) || '0'}
                                                    decimalSeparator="."
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    displayType="text"
                                                    prefix="$"
                                                />
                                            </TableCell>
                                        </> :
                                        <TableCell align="right" padding="none">
                                            <StreakDetails data={row} />
                                        </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
            />
        </React.Fragment>
    );
};

export default DataTable;