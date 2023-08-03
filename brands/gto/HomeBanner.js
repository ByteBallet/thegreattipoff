import React, { useContext, useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import dynamic from 'next/dynamic'
import NumberFormat from 'react-number-format';
import { nFormatter } from '@Components/utils/util';
import { UserContext } from '@Context/User/UserProvider';
import { gethomestats } from '@services/Home/homeService';
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

const Disclaimer = dynamic(() => import('@Components/Shared/Disclaimer'));

const HomeBanner = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext)
    const [data, setdata] = useState()
    const getHomeLiveData = async () => {
        try {
            const resp = await gethomestats({ userid: user?.userID || 0 })
            resp?.data?.homestats && setdata(resp?.data?.homestats)
        } catch (error) {
            console.log("error--", error)
        }
    }
    useEffect(() => {
        getHomeLiveData()
        const interval = setInterval(() => {
            getHomeLiveData();
        }, 120000);
        return () => clearInterval(interval);
    }, [])

    const imgName = isDesktop ? 'D-homebanner.jpg' : 'homebanner.png'

    return (
        <React.Fragment>
            {data &&
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <LazyLoad>
                            <Box
                                sx={{
                                    backgroundImage: `url(/images/banner/${imgName})`,
                                    backgroundSize: "100% 100%",
                                    backgroundRepeat: "no-repeat",
                                    px: 2,
                                    py: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: "#240e37",
                                    alignItems: "start",
                                    justifyContent: 'space-around',
                                    height: 120,
                                    position: "relative"
                                }}>
                                <Typography fontSize={30} fontWeight="bold" className='textCapitalize' sx={{ color: "white.main", lineHeight: 1 }}>
                                    <NumberFormat
                                        thousandSeparator={true}
                                        value={data?.availtips}
                                        decimalScale={0}
                                        displayType="text"
                                    />
                                    <span class="live-indicator">
                                        <div class="live-indicator__circle"></div>
                                        <div class="live-indicator__circle live-indicator__circle--delayed">
                                        </div>
                                    </span>
                                </Typography>
                                <Typography sx={{ color: "white.main" }}>
                                    {data?.label}
                                </Typography>
                                {
                                    data?.isfree > 0 &&
                                    <Typography sx={{ color: "#e564fc" }} fontWeight="bold" fontSize={18} >
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={data?.freetips}
                                            decimalScale={0}
                                            displayType="text"
                                        />
                                        &nbsp;FREE TIPS
                                    </Typography>
                                }
                            </Box>
                        </LazyLoad>
                    </Grid>
                    <Grid item xs={12}>
                        <LazyLoad>
                            <Typography
                                component="h1"
                                sx={{
                                    bgcolor: "#240e37",
                                    color: "white.main",
                                    px: 2,
                                    py: 1,
                                    fontSize: 16
                                }}>
                                Australia&apos;s biggest racing tips site
                            </Typography>
                        </LazyLoad>
                    </Grid>
                    {
                        isDesktop ?
                            <Grid item xs={12}
                                sx={{
                                    bgcolor: "primary.main",
                                    backgroundImage: `linear-gradient(0deg, rgb(116,32,131) 15%, rgb(144,47,161) 85%)`,
                                }}>
                                <Stack
                                    direction="row"
                                    justifyContent={"space-around"}
                                    sx={{
                                        px: 2,
                                        py: 1.2,
                                    }}>
                                    <Typography color="white.main"
                                        sx={{
                                            display: "flex", flexDirection: "column", alignItems: "center", fontSize: 14, lineHeight: 1,
                                            width: 1 / 3
                                        }}>
                                        <b style={{ fontSize: 22 }}>{data?.mediacount}</b>
                                        Media Experts
                                    </Typography>
                                    <Typography color="white.main"
                                        sx={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 14, lineHeight: 1, width: 1 / 3 }}>
                                        <b style={{ fontSize: 22 }}>{data?.tipsprofit}</b>
                                        Profitable Tipsters
                                    </Typography>
                                    <Typography color="white.main"
                                        sx={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 14, lineHeight: 1, width: 1 / 3 }}>
                                        <b style={{ fontSize: 22 }}>
                                            ${nFormatter(data?.tipssold)}
                                        </b>
                                        Tips Sold
                                    </Typography>
                                </Stack>
                            </Grid>
                            :

                            <Grid item xs={12}
                                sx={{
                                    bgcolor: "primary.main",
                                    backgroundImage: `linear-gradient(0deg, rgb(116,32,131) 15%, rgb(144,47,161) 85%)`,
                                }}>
                                <Stack
                                    direction="row"
                                    justifyContent={"space-between"}
                                    sx={{
                                        px: 2,
                                        py: 1.2,
                                    }}>
                                    <Typography color="white.main" sx={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 14, lineHeight: 1 }}>
                                        <b style={{ fontSize: 22 }}>{data?.mediacount}</b>
                                        Media Experts
                                    </Typography>
                                    <Typography color="white.main" sx={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 14, lineHeight: 1 }}>
                                        <b style={{ fontSize: 22 }}>{data?.tipsprofit}</b>
                                        Profitable Tipsters
                                    </Typography>
                                    <Typography color="white.main" sx={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 14, lineHeight: 1 }}>
                                        <b style={{ fontSize: 22 }}>
                                            ${nFormatter(data?.tipssold)}
                                        </b>
                                        Tips Sold
                                    </Typography>
                                </Stack>
                            </Grid>
                    }
                </Grid >
            }
            <Box px={2}>
                <Disclaimer />
            </Box>
        </React.Fragment >
    );
};

export default HomeBanner;