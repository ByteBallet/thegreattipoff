import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
    Box,
    Container,
    Modal,
    IconButton,
    Button,
    Typography,
    Paper,
    Drawer,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BenReedemBody from './BenReedemBody';
import { fetchBenefitsRewards } from '../../../lib/fetcher';
import { UserContext } from '../../../Context/User/UserProvider';
import { useRouter } from "next/router";

const CAccordion = (props) => {
    const [opened, setOpened] = React.useState(false);
    const { primary, secondary, children } = props;

    return (
        <Accordion
            expanded={opened}
            onChange={() => setOpened(!opened)}
            style={{
                margin: 0,
            }}
            sx={{
                my: 0,
                py: 0,
                boxShadow: 'none',
                '&:not(:first-child)::after': {
                    display: 'block',
                    content: '" "',
                    height: '1px',
                    position: 'absolute',
                    top: '-1px',
                    left: '12px',
                    right: '12px',
                    background: '#d3d3d3',
                },
                '&::before': {
                    display: 'unset',
                    content: '" "',
                    height: '1px',
                    position: 'absolute',
                    top: '-1px',
                    left: '12px',
                    right: '12px',
                    background: '#d3d3d3',
                },
            }}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon
                        color='black'
                        sx={{
                            px: 0,
                            mx: 0,
                        }}
                    />
                }
                sx={{
                    minHeight: '45px',
                    px: 1.6,
                    '& .MuiAccordionSummary-content': {
                        margin: '8px 0',
                    }
                }}
                aria-controls="panel-content"
                className="accordion_summary-test"
            >
                <Typography
                    sx={{
                        width: '50%',
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        flexShrink: 0,
                        textAlign: 'left',
                        // color: 'text.secondary'
                    }}
                >
                    {primary}
                </Typography>
                <Typography
                    sx={{
                        width: '45%',
                        color: 'text.primary',
                        textAlign: 'left',
                        fontSize: 14,
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                    }}
                >
                    {secondary}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    borderRadius: 2,
                    backgroundColor: '#eeeff1',
                    border: '1px solid #d3d3d3',
                    my: 0,
                    mx: 2,
                    mb: 2,
                    p: 1,
                    display: 'flex',
                }}
            >
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

const BDetailLine = ({ value, children }) => {
    return (
        <Container
            className="bidual"
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '0',
                paddingRight: '0',
            }}
        >
            <Typography fontSize={13} color={'#555'}>
                {children}
            </Typography>
            {
                <Typography fontSize={15} fontWeight={'bold'}>
                    {value}
                </Typography>
            }
        </Container>
    );
};

const BDetailTemplate2 = ({ subtitle, children, onLink }) => {
    return (
        <Box
            sx={{
                textAlign: 'initial',
                p: 0,
                width: 1,
                m: 0.5,
                // marginTop: '8px',
            }}
        >
            {subtitle ? (
                <Typography
                    sx={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        p: 1,
                        pl: 0,
                        mt: 0,
                        mb: 0,
                    }}
                >
                    {subtitle}
                </Typography>
            ) : (
                void 0
            )}
            <Container
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0',
                    fontSize: 12,
                }}
            >
                {children}
            </Container>
            {/* <Button
                variant="text"
                onClick={() => onLink("/")}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',

                    py: 0,
                    // width: 7 / 20,
                    // px: 2,
                }}
            >
                <Typography
                    style={{
                        textAlign: 'right',
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: 'black',
                    }}
                >
                    Learn more &nbsp;&#10095;
                </Typography>
            </Button> */}
        </Box>
    );
};

const BDetailTemplate = ({ subtitle, children, onLink }) => {
    return (
        <Box
            sx={{
                textAlign: 'initial',
                p: 0,
                width: 1,
                m: 0.5,
            }}
        >
            {subtitle ? (
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        p: 1,
                        pl: 0,
                        mt: 0,
                        mb: 0,
                    }}
                >
                    {subtitle}
                </Typography>
            ) : (
                void 0
            )}
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 0,
                    mt: subtitle ? 1 : 0,
                }}
            >
                <div style={{ minWidth: '55%', width: '100%' }}>{children} </div>
                {/* <Button
                    variant="text"
                    onClick={() => onLink("/")}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        minWidth: '30%',
                        p: 0,
                        alignSelf: 'end',
                    }}
                >
                    <span
                        style={{
                            textAlign: 'right',
                            fontSize: 12,
                            color: 'black',
                        }}
                    >
                        Learn more &nbsp;&#10095;
                    </span>
                </Button> */}
            </Container>
        </Box>
    );
};

const BenefitsRewardsForm = (props) => {
    const router = useRouter();
    const [data, setData] = useState({
        balance: 0.0,
        count1: 0,
        count2: 0,
        count3: 0,
        totalCount: 0,
        reward: 0,
    });
    const { user } = useContext(UserContext);
    const { clientID, creditLimit } = user;

    const updateData = useCallback(async () => {
        if (user.clientID) {
            const data1 = await fetchBenefitsRewards({
                clientid: user.clientID,
            });
            setData(data1);
        }
    }, [user]);

    useEffect(() => {
        updateData();
    }, [user]);

    const { balance, count1, count2, count3, totalCount, reward } = data;
    const balanceString = (user.bonusbetbalance ? user.bonusbetbalance : '0')?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const onLink = (href) => {
        router.push({
            pathname: href,
        });
        props.onClose()
    };

    return (
        <Container
            sx={{
                px: 2,
                py: 2,
                borderRadius: 4
            }}
        >
            <Box sx={{
                m: 0, p: 0,
                // border:'1px solid grey'
                borderRadius: 1,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'grey.joinBorder',
            }}>
                <CAccordion
                    key="br_1"
                    primary="Bonus Bet Balance"
                    secondary={balanceString}
                >
                    <BDetailTemplate onLink={onLink}>
                        <BDetailLine>Bonus Bets can be used on all Racing & Sports markets!</BDetailLine>
                    </BDetailTemplate>
                </CAccordion>
                <CAccordion
                    key="br_2"
                    primary="Elite Boosts"
                    secondary={`${totalCount || 0} available`}
                >
                    <BDetailTemplate subtitle={'Get your odds raised daily!'} onLink={onLink}>
                        <BDetailLine value={count1 || 0}>
                            Elite Boost Racing
                        </BDetailLine>
                        <BDetailLine value={count2 || 0}>
                            Elite Boost Sport
                        </BDetailLine>
                        <BDetailLine value={count3 || 0}>
                            Elite Boost Multi
                        </BDetailLine>
                    </BDetailTemplate>
                </CAccordion>
                <CAccordion
                    key="br_3"
                    primary="Elite Rewards"
                    secondary={`${(user.pointsbalance)?.toLocaleString()} points`}

                >
                    <BDetailTemplate2 subtitle={'Earn with every bet!'}>
                        <BenReedemBody
                            clientid={clientID}
                            points={user.pointsbalance}
                            balance={balance}
                            reward={reward}
                            updateData={updateData}
                        />
                    </BDetailTemplate2>
                </CAccordion>
            </Box>
        </Container>
    );
};

export default BenefitsRewardsForm;
