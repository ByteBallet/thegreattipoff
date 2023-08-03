import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/Link';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazy-load';
import NumberFormat from 'react-number-format';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { UserContext } from '@Context/User/UserProvider';
import { getActiveComp } from '@services/competitions/competitionsService';
import { FOOTER_LINKS_SOCIL_MEDIA } from '@lib/constants';
import { getMonth, getYear } from '@Components/utils/util';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'

const CustomCard = dynamic(() => import('./CustomCard'));
const VideosDesktop = dynamic(() => import('@Components/Home/VideosDesktop'));
const NextItemListDesktopSideMenu = dynamic(() => import('@Components/BetHome/NextItemListDesktopSideMenu'));
const LeaderboardTableRightSideMenu = dynamic(() => import('@Components/Competitions/LeaderboardTableRightSideMenu'));
const LastMonthRightSideMenu = dynamic(() => import('@Components/Competitions/LastMonthRightSideMenu'));

const DesktopHomeRightMenu = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState();
    const getData = async () => {
        try {
            setIsLoading(true);
            const res = await getActiveComp(user);
            if (res) {
                setData(res);
            }
        } catch (error) {
            console.log("error", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
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
        <Stack style={{ marginLeft: '2px', marginTop: '20px' }}>
            <Grid container rowSpacing={1.5} columnSpacing={0}>
                {
                    <Grid item xs={12}>
                        <LazyLoad>
                            <CustomCard
                                bgcolor="secondary.button"
                                title="Watch"
                                content={
                                    <VideosDesktop />
                                }
                            />
                        </LazyLoad>
                    </Grid>
                }
                {/* <Grid item xs={12}>
                    <LazyLoad>
                        <CustomCard
                            bgcolor="secondary.button"
                            title={`Recent News`}
                            content={
                                <></>
                            }
                        />
                    </LazyLoad>
                </Grid> */}
                {
                    data?.leaderboard &&
                    <Grid item xs={12}>
                        <LazyLoad>
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
                        </LazyLoad>
                    </Grid>
                }
                <Grid item xs={12}>
                    <LazyLoad>
                        <CustomCard
                            bgcolor="secondary.button"
                            title="Next to Jump"
                            isTable={false}
                            content={
                                <NextItemListDesktopSideMenu />
                            }
                        />
                    </LazyLoad>
                </Grid>
                <Grid item xs={12}>
                    <LazyLoad>
                        <CustomCard
                            bgcolor="secondary.button"
                            title="Follow theGreatTipOff"
                            isTable={false}
                            content={
                                <Stack direction="row" spacing={1} sx={{ bgcolor: "white.main", justifyContent: 'center', paddingY: 1 }}>
                                    {FOOTER_LINKS_SOCIL_MEDIA.map((item, idx) =>
                                        <Link href={item.link} key={idx}>
                                            <img src={item.src} height="40" alt={item.label} style={{ cursor: "pointer" }} />
                                        </Link>
                                    )}
                                </Stack>
                            }
                        />
                    </LazyLoad>
                </Grid>
            </Grid>

        </Stack>
    );
};

export default DesktopHomeRightMenu;