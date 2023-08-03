
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/Link';
import { Box, Grid, Stack, Typography } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

import VideosDesktop from '@Components/Home/VideosDesktop';
import { UserContext } from '@Context/User/UserProvider';
import { getMonth, getYear } from '@Components/utils/util';
import { getActiveComp } from '@services/competitions/competitionsService';
import LastMonthRightSideMenu from '@Components/Competitions/LastMonthRightSideMenu';
import LeaderboardTableRightSideMenu from '@Components/Competitions/LeaderboardTableRightSideMenu';

import CustomCard from './CustomCard';
import NumberFormat from 'react-number-format';
import TrendingHotBets from '@modules/HotBets/Components/TrendingHotBets';
import { getTodayTips } from '@lib/fetcher';
import NextItemListDesktopSideMenu from '@Components/BetHome/NextItemListDesktopSideMenu';
import RecentNews from '@Components/News/components/RecentNews';
import PopularTipsters from './PopularTipsters';

const DesktopOtherRightMenu = () => {
    const router = useRouter();
    let path = router.pathname;
    const [trendTipsters, settrendTipsters] = useState({});
    const { user } = useContext(UserContext);
    const [data, setData] = useState();
    const getData = async () => {
        try {
            let res = await getActiveComp(user);
            if (res) {
                setData(res);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    async function getTrendingTipsters() {
        const data2 = (await getTodayTips()) || {};
        settrendTipsters(data2?.data?.content?.punter?.hotbet);
    }

    useEffect(() => {
        getTrendingTipsters()
        getData()
    }, [])

    const BottomBanner = () => {
        return (
            <Link href={`/competitions`}>
                <Stack direction="column" sx={{ cursor: "pointer" }}>
                    <Typography
                        sx={{
                            px: 1, py: 0.5, bgcolor: "primary.main1", fontSize: 13, color: "white.main", fontWeight: "bold",
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4
                        }}
                        align="center">
                        <NumberFormat
                            thousandSeparator={true}
                            value={data?.totalprize}
                            decimalScale={0}
                            fixedDecimalScale={false}
                            displayType="text"
                            prefix="$"
                        /> {` cash prizes monthly`}
                    </Typography>
                    <Box sx={{
                        bgcolor: "primary.main", px: 1, py: 0.3, display: "flex", alignItems: "center", justifyContent: "center",
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4
                    }}>
                        <Typography sx={{ fontSize: 11, color: "white.main", fontWeight: "bold" }} align="center"> FREE TO PLAY</Typography>
                        <KeyboardArrowRightOutlinedIcon fontSize="small" sx={{ color: "white.main" }} />
                    </Box>
                </Stack>
            </Link >
        )
    }
    return (
        <aside className='' style={{ marginLeft: 10, paddingTop: 20, marginBottom: 20, width: path == "/" ? 250 : "auto" }}>
            <Grid container rowSpacing={1} columnSpacing={0}>
                {
                    path != "/" && trendTipsters?.length > 0 &&
                    <Grid item xs={12}>
                        <CustomCard
                            bgcolor="secondary.button"
                            title={"Today's Tips"}
                            contentColor={"background.default"}
                            isTable={false}
                            content={
                                <Box>
                                    <TrendingHotBets
                                        isCarousel={true}
                                        isDesktop={false}
                                        trendingHotBets={trendTipsters}
                                        getTipsterCarousel={getTrendingTipsters}
                                        desktopMenu={true}
                                    />
                                </Box>
                            }
                        />
                    </Grid>
                }
                {
                    path?.indexOf("news") == -1 &&
                    <Grid item xs={12}>
                        <CustomCard
                            bgcolor="secondary.button"
                            title={`Recent News`}
                            content={
                                <RecentNews isHome={path == "/"} />
                            }
                        />
                    </Grid>
                }
                {
                    data?.leaderboard &&
                    <Grid item xs={12}>
                        <CustomCard
                            bgcolor="secondary.button"
                            title={`Tipping Competition`}
                            content={
                                <React.Fragment>
                                    <LeaderboardTableRightSideMenu
                                        dataRows={data?.leaderboard}
                                        data={data}
                                    />
                                    <Box sx={{ py: 1.5 }}>
                                        <BottomBanner />
                                    </Box>
                                    {
                                        data?.lastmonth &&
                                        <React.Fragment>
                                            <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
                                                <Typography fontWeight={"bold"} fontSize={13}>
                                                    {getMonth(data?.lastmonth?.startdate)} {getYear(data?.lastmonth?.startdate)} Winner
                                                </Typography>
                                                <Typography color="primary.main" fontWeight={"bold"} fontSize={12}>
                                                    Final
                                                </Typography>
                                            </Stack>
                                            <LastMonthRightSideMenu details={data?.lastmonth} cashPrizes={data?.totalprize} />
                                        </React.Fragment>
                                    }
                                </React.Fragment>
                            }
                        />
                    </Grid>
                }
                {
                    <Grid item xs={12}>
                        <CustomCard
                            bgcolor="secondary.button"
                            title="Watch"
                            content={
                                <VideosDesktop />
                            }
                        />
                    </Grid>
                }
                <Grid item xs={12}>
                    <CustomCard
                        bgcolor="secondary.button"
                        title="Popular Tipsters"
                        isTable={false}
                        content={
                            <PopularTipsters />
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomCard
                        bgcolor="secondary.button"
                        title="Next to Jump"
                        isTable={false}
                        content={
                            <NextItemListDesktopSideMenu />
                        }
                    />
                </Grid>
            </Grid>
        </aside>
    );
};

export default DesktopOtherRightMenu;