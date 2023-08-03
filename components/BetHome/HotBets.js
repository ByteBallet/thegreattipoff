import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import BoxDivider from '..//Shared/BoxDivider';
import { Box, Typography, Container, Avatar, Stack } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Home from '../../styles/Home.module.css';
const HotBetCard = ({ card, index }) => {
    return (
        <Card key={index} sx={{ maxWidth: 215, minWidth: 215 }}>
            <CardContent
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    paddingBottom: 0,
                }}
            >
                <Box sx={{ padding: '2px 10px 2px 2px' }} key="box-1">
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                        }}
                        src={card?.icon}
                        aria-label="recipe"
                    >
                        R
                    </Avatar>
                </Box>
                <Box key="box-2" sx={{ width: 200 }}>
                    <Typography
                        component="div"
                        sx={{
                            color: 'black',
                            fontSize: 18,
                            paddingTop: '3px',
                            paddingLeft: 0,
                        }}
                    >
                        <b>{card?.name}</b>
                    </Typography>
                    <CardHeader
                        key={'40'}
                        sx={{ padding: '0px' }}
                        avatar={
                            <Avatar
                                sx={{
                                    bgcolor: '#bdbdbd',
                                    borderRadius: '20%',
                                    width: 35,
                                    height: 35,
                                }}
                                aria-label="sub-header-icon"
                                src={card?.sbIcon}
                            >
                                R
                            </Avatar>
                        }
                        title={card?.profit}
                        subheader="on turnover"
                    />
                </Box>
            </CardContent>
            <CardActions
                className={Home.hotBets}
                sx={{ width: 190, pl: 0, pr: 0 }}
            >
                <Typography
                    key={'44'}
                    variant="overline"
                    color="red"
                    paddingY="1.5px"
                    display="block"
                    gutterBottom
                    className="textCapitalize"
                    sx={{ fontSize: 14 }}
                >
                    {card.time}
                </Typography>
                <Button
                    key={'45'}
                    variant="contained"
                    sx={{
                        color: '#000000',
                        borderRadius: '30px',
                        paddingY: '1.5px',
                        fontWeight: 'bold',
                        fontSize: 12,
                        boxShadow: 'none',
                    }}
                    size="medium"
                >
                    HOT Bet Now
                </Button>
            </CardActions>
        </Card>
    );
};
const HotBets = ({ isDesktop }) => {
    return (
        <Box sx={{ mx: isDesktop ? 0 : 2 }}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: isDesktop ? 0 : 1 }}
            >
                <Typography
                    variant="h2"
                    component="p"
                    fontWeight="fontWeightBold"
                    sx={{ fontSize: 16 }}
                >
                    HOT Bets
                </Typography>
                {isDesktop && (
                    <Button
                        variant="text"
                        href="/hotbets"
                        color="black"
                        sx={{
                            fontSize: 12,
                        }}
                    >
                        more <KeyboardArrowRightOutlinedIcon fontSize="small" />
                    </Button>
                )}
            </Stack>
            <div className="hide-scrollbar" style={{ overflowX: 'auto' }}>
                <Container
                    disableGutters
                    className="hide-scrollbar"
                    sx={{ display: 'flex', pl: 0 }}
                >
                    <Stack
                        direction="row"
                        spacing={1.2}
                        className="carouselIcons"
                    >
                        {betCards.map((card, index) => (
                            <HotBetCard card={card} index={index} key={index} />
                        ))}
                    </Stack>
                </Container>
            </div>
            {!isDesktop && (
                <Button
                    variant="text"
                    href="/hotbets"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        color: '#000',
                        fontSize: 13,
                        mt: 1,
                    }}
                >
                    View More{' '}
                    <KeyboardArrowRightOutlinedIcon fontSize="small" />
                </Button>
            )}
            <BoxDivider />
        </Box>
    );
};

export default HotBets;

const betCards = [
    {
        name: 'Luke Marlow',
        icon: '/images/icon/profile1.PNG',
        sbIcon: '/images/icon/sb-icon01.PNG',
        profit: '108% PROFIT',
        time: '1m 25s',
    },
    {
        name: 'The Sultan',
        icon: '/images/icon/profile2.PNG',
        sbIcon: '/images/icon/sb-icon02.PNG',
        profit: '80% PROFIT',
        time: '1m 25s',
    },
    {
        name: 'Luke Marlow',
        icon: '/images/icon/profile1.PNG',
        sbIcon: '/images/icon/sb-icon01.PNG',
        profit: '108% PROFIT',
        time: '1m 25s',
    },
    {
        name: 'The Sultan',
        icon: '/images/icon/profile2.PNG',
        sbIcon: '/images/icon/sb-icon02.PNG',
        profit: '80% PROFIT',
        time: '1m 25s',
    },
];
