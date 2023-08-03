import React from 'react';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, useContext } from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Grid, Card, CardContent, TableContainer, Box, Typography, Stack, Button } from '@mui/material';
import { NEXTUP_HOME_MENU } from '@lib/constants';
import NextUpDesktopData from './NextUpDesktopData';
import BoxDivider from '@Components/Shared/BoxDivider';
import { getAllRaces, getAllSports } from '../../lib/fetcher';
import { UserContext } from '@Context/User/UserProvider';

const NextUpDesktop = ({ settrendingHotBet }) => {
    const [switchFilter, setswitchFilter] = useState(false);
    const [data, setData] = useState({});
    const { user } = useContext(UserContext);

    const router = useRouter();
    const onLink = (href) => {
        router.push({
            pathname: href
        });
    };

    const getHBData = async () => {
        let res = {}
        res = (await getAllRaces(user.promo, 'A')) || {};
        (settrendingHotBet(res.hotbet))
    }

    const getData = async (name, type, isSports = false) => {
        let res = {}
        if (isSports) {
            res = (await getAllSports('all', true)) || {};
        } else {
            res = (await getAllRaces(user.promo, type)) || {};
        }
        setData((data) => {
            return {
                ...data,
                [name]: isSports ? res.hotevents : res.all,
            };
        })
    }

    const reloadData = useCallback(async () => {
        NEXTUP_HOME_MENU.map((item => {
            if (item.name == "Horses") {
                getData(item.name, "R")
            } else if (item.name == "Sports") {
                getData(item.name, "", true)
            } else if (item.name == "Greys") {
                getData(item.name, "G")
            } else if (item.name == "Harness") {
                getData(item.name, "H")
            }
        }
        ))
        getHBData()
    }, []);

    useEffect(() => {
        reloadData();
    }, [])

    const renderComp = (item) => {
        return <Grid item xs={4}>
            <Card sx={{
                minHeight: 300,
                maxHeight: 300
            }}>
                <CardContent sx={{ p: 0.3 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between"
                        sx={{
                            bgcolor: "primary.main",
                            borderTopLeftRadius: 1,
                            borderTopRightRadius: 1
                        }}>
                        <Typography
                            variant="h2"
                            component="p"
                            fontWeight="fontWeightBold"
                            sx={{ fontSize: 14, px: 2 }}
                        >
                            Next to go {item?.name}
                        </Typography>
                        {
                            item.filter != "" &&
                            <Button
                                variant="contained"
                                onClick={() => setswitchFilter(item.id == 3 ? true : false)}
                                color="black"
                                sx={{
                                    borderRadius: 10,
                                    py: 0.4
                                }}>
                                <Typography fontSize={11} color="white.main">{item.filter} </Typography>
                            </Button>
                        }
                        <Button
                            variant="text"
                            onClick={() => onLink(item?.link)}
                            color="black"
                            sx={{
                                fontSize: 12
                            }}>
                            more < KeyboardArrowRightOutlinedIcon fontSize="24" />
                        </Button>
                    </Stack>
                    <TableContainer component={Box} px={1}>
                        <NextUpDesktopData type={item.name} switchFilter={switchFilter} data={data[item.name]} reloadData={reloadData} />
                    </TableContainer>
                </CardContent>
            </Card>
        </Grid>
    }
    return (
        <React.Fragment>
            <Grid container spacing={1} pb={1}>
                {
                    NEXTUP_HOME_MENU.map((item =>
                        <React.Fragment key={item.id}>
                            {!switchFilter && item.id < 4 &&
                                renderComp(item)
                            }
                            {switchFilter && item.id != 3 &&
                                renderComp(item)
                            }
                        </React.Fragment>
                    ))
                }
            </Grid>
            <BoxDivider />
        </React.Fragment>
    );
};

export default NextUpDesktop;