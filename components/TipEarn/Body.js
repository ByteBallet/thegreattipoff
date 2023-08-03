import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, Grid, Stack, useMediaQuery } from '@mui/material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

import Image from 'next/image';

import CircleIcon from '@mui/icons-material/Circle';
import React, { useState } from 'react';

const contentList = [
    { name: 'Sell Tips', value: 0 },
    { name: 'HOT Bets', value: 1 },
    { name: 'Tipping Competition: Monthly Cash Prizes', value: 2 },
];

function Hotbet() {
    return (
        <Box lineHeight={1}>
            <Box mb={2}>
                <Typography fontSize={14}>You also earn when someone bets on your tips at a particular Betting or racing site.</Typography>
            </Box>
            <Box mb={2}>
                <Typography fontSize={14}>
                    When you tip at thegreattipoff.com we advertise your tip on bookmaker race pages and in their Tip Market.
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography fontSize={14}>When someone bets on your HOT Bet (tip) and it wins you earn.</Typography>
            </Box>
            <Box mb={1}>
                <Typography fontWeight="bold" fontSize={14}>
                    The bigger the stake and the more punters that bet on your HOT Bets, the more you earn.
                </Typography>
            </Box>
        </Box>
    );
}

function Comp() {
    return (
        <Box lineHeight={1}>
            <Box mb={2}>
                <Typography fontSize={14}>
                    When you tip at thegreattipoff.com you go in the running for a cash prize in out monthly tipping competition.
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography fontSize={14}>If you finish Top 5 you earn:</Typography>
                <br />
                <Typography component={'p'} fontSize={14}>
                    1st <span style={{ fontWeight: 'bold' }}>$500</span>
                </Typography>
                <Typography component={'p'} fontSize={14}>
                    2nd <span style={{ fontWeight: 'bold' }}>$150</span>
                </Typography>
                <Typography fontSize={14} component={'p'}>
                    3rd <span style={{ fontWeight: 'bold' }}>250</span>
                </Typography>
                <Typography component={'p'} fontSize={14}>
                    4th <span style={{ fontWeight: 'bold' }}>$400</span>
                </Typography>
                <Typography component={'p'} fontSize={14}>
                    5th <span style={{ fontWeight: 'bold' }}>$50</span>
                </Typography>
            </Box>
            <Box mb={1}>
                <Typography fontSize={14}>
                    Check the{' '}
                    <span style={{ fontWeight: 'bold' }} onClick={() => console.log('HELLO')}>
                        current leaderboard and other details here.
                    </span>
                </Typography>
            </Box>
        </Box>
    );
}

function SellTipsMobile() {
    return (
        <Box>
            <Box mb={2}>
                <Typography fontSize={16} fontWeight="bold">
                    Over $9.9M tips sold: get in on the action
                </Typography>
            </Box>

            <Stack mb={2} direction="row">
                <Box width="50%" mr={1}>
                    <Box mb={2}>
                        <Typography fontSize={14}>It&apos;s easy to earn from your tips.</Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography fontSize={14}>
                            <span style={{ fontWeight: 'bold' }}>1. Enter your tips</span> - the earlier the better
                        </Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography fontSize={14}>
                            <span style={{ fontWeight: 'bold' }}>2. Share your link </span> in social media and with mates
                        </Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography fontSize={14}>
                            <span style={{ fontWeight: 'bold' }}>3. Get notified </span> when someone buys your tips
                        </Typography>
                    </Box>
                </Box>
                <Box width="50%">
                    <Box mt={1}>
                        <Image src="/images/gto/trophy.png" alt="Trophy" width={'620px'} height={'410px'} />
                    </Box>
                </Box>
            </Stack>

            <Box mb={2}>
                <Typography fontSize={14}>
                    Your tips also appear in out Tip Market with your best stats showing to get punters to buy your tips.
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography fontSize={14}>
                    You gain further exposure from our digital marketing team who promote good tipping performances via our:
                </Typography>
            </Box>

            <Stack direction="row" alignItems={'center'} mb={2}>
                <Box mr={2}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                </Box>
                <Typography fontSize={14}>Social Media</Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} mb={2}>
                <Box mr={2}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                </Box>
                <Typography fontSize={14}>Video Channel</Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} mb={2}>
                <Box mr={2}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                </Box>
                <Typography fontSize={14}>Weekly newsletter</Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} mb={2}>
                <Box mr={2}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                </Box>
                <Typography fontSize={14}>Advertising we pay for to promote tipsters</Typography>
            </Stack>
        </Box>
    );
}

function SellTips() {
    const isDesktop = useMediaQuery('(min-width:900px)');

    // if (!isDesktop) return <SellTipsMobile />;
    return (
        <Box>
            <Box mb={2}>
                <Typography fontSize={16} fontWeight="bold">
                    Over $9.9M tips sold: get in on the action
                </Typography>
            </Box>

            <Box lineHeight={2}>
                {
                    isDesktop ?
                        <React.Fragment>

                            <Typography component={'p'} fontSize={14} lineHeight={2.5}>
                                <img
                                    align="right"
                                    src="/images/gto/trophy-tipearn.jpg"
                                    alt="Trophy"
                                    width={'320px'}
                                    style={{ paddingLeft: isDesktop ? '10px' : '0px' }}
                                />
                                It&apos;s easy to earn from your tips.
                                <br />
                                <span style={{ fontWeight: 'bold' }}>1. Enter your tips</span> - the earlier the better
                                <br />
                                <span style={{ fontWeight: 'bold' }}>2. Share your link </span> in social media and with mates
                                <br />
                                <span style={{ fontWeight: 'bold' }}>3. Get notified </span> when someone buys your tips
                                <br />
                            </Typography>
                        </React.Fragment> :
                        <React.Fragment>
                            <Stack direction="column" alignItems={"start"} justifyContent={"center"}>
                                <img
                                    align="right"
                                    src="/images/gto/trophy-tipearn.jpg"
                                    alt="Trophy"
                                    width={'320px'}
                                    style={{ paddingLeft: isDesktop ? '10px' : '0px' }}
                                />
                                <Typography component={'p'} fontSize={14} my={1} align="left">It&apos;s easy to earn from your tips.</Typography>
                            </Stack>
                            <Typography component={'p'} fontSize={14} lineHeight={2.5}>
                                <span style={{ fontWeight: 'bold' }}>1. Enter your tips</span> - the earlier the better
                                <br />
                                <span style={{ fontWeight: 'bold' }}>2. Share your link </span> in social media and with mates
                                <br />
                                <span style={{ fontWeight: 'bold' }}>3. Get notified </span> when someone buys your tips
                                <br />
                            </Typography>
                        </React.Fragment>
                }
            </Box>

            <Box mb={2} mt={2}>
                <Typography fontSize={14}>
                    Your tips also appear in out Tip Market with your best stats showing to get punters to buy your tips.
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography fontSize={14}>
                    You gain further exposure from our digital marketing team who promote good tipping performances via our:
                </Typography>
            </Box>

            <Stack direction="row" alignItems={'center'} mb={2}>
                <Box mr={2}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                </Box>
                <Typography fontSize={14}>Social Media</Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} mb={2}>
                <Box mr={2}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                </Box>
                <Typography fontSize={14}>Video Channel</Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} mb={2}>
                <Box mr={2}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                </Box>
                <Typography fontSize={14}>Weekly newsletter</Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} mb={2}>
                <Box mr={2}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                </Box>
                <Typography fontSize={14}>Advertising we pay for to promote tipsters</Typography>
            </Stack>
        </Box>
    );
}

const tabs = {
    0: {
        content: <SellTips />,
    },
    1: {
        content: <Hotbet />,
    },
    2: {
        content: <Comp />,
    },
};

function TipEarnBody({ type }) {
    const [expanded, setExpanded] = useState({
        0: type ? (+type === 0 ? true : false) : true,
        1: type ? (+type === 1 ? true : false) : true,
        2: type ? (+type === 2 ? true : false) : true,
    });

    function handleChange(val) {
        setExpanded({
            ...expanded,
            [val]: !expanded[val],
        });
    }
    return (
        <Box sx={{ mx: { xs: 2, sm: 0 } }}>
            {contentList.map((item, index) => (
                <Box key={index} mb={0.5}>
                    <Accordion
                        elevation={0}
                        sx={{ backgroundColor: '#f0f1f2' }}
                        expanded={expanded[item.value]}
                        onChange={() => handleChange(item.value)}
                    >
                        <AccordionSummary
                            sx={{ backgroundColor: '#f0f1f2' }}
                            expandIcon={
                                <Box>
                                    <Box
                                        bgcolor={expanded[item.value] ? 'grey.main' : 'primary.main'}
                                        sx={{ height: '25px', borderRadius: 2 }}
                                    >
                                        <ExpandMoreIcon color="white" />
                                    </Box>
                                </Box>
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Stack direction="row" alignItems={'center'} ml={-1}>
                                <GridViewRoundedIcon color="primary" />
                                <Typography ml={1} sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                    {item.name}
                                </Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0, m: 0, backgroundColor: '#f0f1f2' }}>
                            <Card mt={1}>
                                <Box p={2}>{tabs[item.value].content}</Box>
                            </Card>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </Box>
    );
}

export default TipEarnBody;
