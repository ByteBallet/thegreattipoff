import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BoxDivider from '../Shared/BoxDivider';
import { Avatar, Box, Container, Stack, Typography, SvgIcon } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Home from '../../styles/Home.module.css';
import { MAIN_CATEGORIES } from '../../lib/constants';
import moment from 'moment';
import { UserContext } from '@Context/User/UserProvider';
import authAPI from '@Components/utils/authAPI';
import horses from "../../public/images/svg/horse-racing1.svg";
import { useRouter } from "next/router";

const Futures = ({ metrics, active, isDesktop = false }) => {
    const [data, setData] = useState()
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        async function getFutures() {
            let today = moment();
            let racedate = today.format('YYYY-MM-DD');
            let racetype = {
                R: true,
                G: false,
                H: false,
                count: 3,
            }
            let racemeet = {
                AU: true,
                INT: true,
                count: 2,
            }
            let body = {
                racetype: JSON.stringify(racetype),
                startdate: racedate,
                enddate: "3000-01-01",
                country: JSON.stringify(racemeet),
                jsonresp: '1',
                clientid: user.clientID ? user.clientID : ""
            };
            const url = `${process.env.server}/races/getFutures`;

            const response = await authAPI(url, body, 'POST', false);
            if (!response.error) {
                if (response.data.ERROBJ.ERRORCODE == 0) {
                    setData(JSON.parse(response.data.R))
                }
            }
        }
        // if (active === MAIN_CATEGORIES.racings) {
        //     getFutures();
        // }
        getFutures();
    }, [active])

    const onLink = (href) => {
        router.push({
            pathname: href,
        });
    };

    return (
        <Box sx={{ mx: isDesktop ? 0 : 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: isDesktop ? 0 : 1 }}>
                <Typography
                    variant="h2"
                    component="p"
                    fontWeight="fontWeightBold"
                    sx={{ fontSize: 16 }}
                >
                    {active === MAIN_CATEGORIES.racings
                        ? 'Futures'
                        : 'Popular Sports'}
                </Typography>
                {
                    isDesktop &&
                    <Button
                        variant="text"
                        onClick={() => onLink("/futures")}
                        color="black"
                        sx={{
                            fontSize: 12
                        }}>
                        more < KeyboardArrowRightOutlinedIcon fontSize="small" />
                    </Button>
                }
            </Stack>
            <div
                className="hide-scrollbar"
                style={{
                    overflowX: 'auto',
                }}
            >
                <Container
                    disableGutters
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        pl: 0,
                    }}
                >
                    {
                        data &&
                        <Stack direction="row" spacing={1.2}>
                            {data.map((card, index) => {
                                return (
                                    <Card key={index}
                                        sx={{ maxWidth: 160, minWidth: 160, cursor: "pointer" }}
                                        onClick={() => onLink(`/futures/${card.eventname.replace(/ /g, '_')}/${card.raceid}`)}
                                    >
                                        <CardContent
                                            className={Home.futures}
                                            sx={{ minWidth: 160 }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                                key="01"
                                            >
                                                <Typography
                                                    component="p"
                                                    sx={{
                                                        color: 'black',
                                                        fontSize: 14,
                                                        fontWeight: 800,
                                                    }}
                                                    noWrap
                                                >
                                                    <b>{card.eventname}</b>
                                                </Typography>
                                                <SvgIcon component={horses} viewBox="0 0 466.36 510.95" sx={{ width: 20, height: 20, color: "icon.betslip", ml: 0.5 }} />
                                            </Box>
                                            <Box>
                                                <Typography
                                                    key="0"
                                                    component="p"
                                                    sx={{
                                                        color: 'black',
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {card.area}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'end',
                                                }}
                                                key="03"
                                            >
                                                <Typography
                                                    key="2"
                                                    component="p"
                                                    sx={{
                                                        color: 'grey',
                                                        fontSize: 12,
                                                        fontWeight: 400,
                                                        my: 0.5
                                                    }}
                                                >
                                                    {moment(moment.utc(card.eventdate)).diff(moment().format('YYYY-MM-DD'), "days")} days
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Stack>
                    }
                </Container>
            </div>
            {
                !isDesktop &&
                <Button
                    variant="text"
                    onClick={() => onLink("/futures")}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        color: '#000',
                        fontSize: 13,
                        mt: 1,
                        width: 1
                    }}
                >
                    View More <KeyboardArrowRightOutlinedIcon fontSize="small" />
                </Button>
            }
            <BoxDivider />
        </Box>
    );
};

export default Futures;

const featureDetails = [
    {
        name: 'Cox Plate',
        para: 'Flemington',
        img: '/images/icon/Future-icon.PNG',
        days: '23 days',
    },
    {
        name: 'The Golden Eagle',
        para: 'Randwick',
        img: '/images/icon/Future-icon.PNG',
        days: '153 days',
    },
    {
        name: 'Cox Plate',
        para: 'Flemington',
        img: '/images/icon/Future-icon.PNG',
        days: '169 days',
    },
    {
        name: 'Cox Plate',
        para: 'Flemington',
        img: '/images/icon/Future-icon.PNG',
        days: '19 days',
    },
    {
        name: 'Cox Plate',
        para: 'Flemington',
        img: '/images/icon/Future-icon.PNG',
        days: '109 days',
    },
];

const sportsDetails = [
    {
        name: 'EPL',
        para: 'Chelesea vs Arsenal',
        img: '/images/icon/sports.PNG',
        days: '3 days',
    },
    {
        name: 'NBA',
        para: 'Chelesa vs Arsenal',
        img: '/images/icon/sports.PNG',
        days: '3 days',
    },
    {
        name: 'EPL',
        para: 'Chelesea vs Arsenal',
        img: '/images/icon/sports.PNG',
        days: '3 days',
    },
    {
        name: 'NBA',
        para: 'Chelesea vs Arsenal',
        img: '/images/icon/sports.PNG',
        days: '3 days',
    },
    {
        name: 'EPL',
        para: 'Chelesea vs Arsenal',
        img: '/images/icon/sports.PNG',
        days: '3 days',
    },
];
