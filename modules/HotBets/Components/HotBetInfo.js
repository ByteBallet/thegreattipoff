import { getTopOffset } from '@Components/utils/util';
import React from 'react';
import {
    Box,
    Container,
    Modal,
    IconButton,
    Button,
    Typography,
    Paper,
    Drawer,
    CardContent,
    Card,
    SvgIcon,
    Stack,
    useMediaQuery,
} from '@mui/material';
import hotbet from '@public/images/svg/hotbet.svg';
import HotBetCarousel from './HotBetCarousel';
import CloseIcon from '@mui/icons-material/Close';

const HotBetInfo = ({ onClose, open }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    return (
        <Modal
            anchor="top"
            open={open}
            onClose={onClose}
            sx={{
                overflowY: 'auto',
            }}
            BackdropProps={{
                style: {
                    transform: 'translateY(60px)',
                },
            }}
        >
            <Card sx={style} className="HeaderModal bg-HbModal">
                <CardContent
                    sx={{
                        p: 0,
                    }}
                >
                    <Container
                        disableGutters
                        id="header"
                        align="center"
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            color="white"
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                bgcolor: 'black.main',
                                p: 0.5,
                                mr: 0.5,
                                boxShadow: '0px 0px 1px 4px #fdf0b2',
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Container>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="start"
                            sx={{ mt: 1 }}
                        >
                            <SvgIcon
                                color="grey.light"
                                component={hotbet}
                                viewBox={'0 0 44.593 55.624'}
                                fontSize="large"
                                sx={{
                                    mr: 0.4,
                                }}
                            />
                            <Typography
                                color="primary.contrastText"
                                align="center"
                                noWrap
                                py={0.3}
                                fontSize={24}
                                fontWeight="bold"
                            >
                                HOT Bet
                            </Typography>
                        </Stack>
                        <Typography
                            color="primary.contrastText"
                            align="center"
                            noWrap
                            py={0.3}
                            fontSize={17}
                            fontWeight="bold"
                            sx={{ wdith: 1, mb: 1.5 }}
                        >
                            Back the Bets of Winning Punters!
                        </Typography>
                        <HotBetCarousel info={info} />
                        <Button
                            color="success"
                            variant="contained"
                            size="large"
                            onClick={onClose}
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        >
                            HOT Bet Now
                        </Button>
                    </Box>
                    <Box>
                        <img
                            src="/images/tools/hb-Mobiles.png"
                            style={{
                                height: isDesktop ? '450px' : '300px',
                                width: '100%',
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Modal>
    );
};

export default HotBetInfo;

const style = (theme) => ({
    [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        overflowY: 'hidden',
        maxHeight: 700,
    },
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
});

const info = [
    {
        title: 'What is HOT Bet?',
        content1:
            'HOT Bets are tips from punters and media experts with validated performance statistics from every selection.',
        content2:
            "Tips and performance statistics are recorded and provided by theGreatTipOff.com, Australia's independent tipster validation service. Only the top performing tips are displayed in our Tip Market and on the race pages for you to back.",
    },
    {
        title: 'Why you can trust profit statistics displayed',
        content1:
            "Each tipster's selections and statistics have been independently recorded, calculated and validated by theGreatTipOff.com since 2009 using starting prices.",
        content2:
            "TheGreatTipOff.com is recognised as a trusted resource for tipping statistics in the Australian racing industry and is referenced by Australia's racing media broadcasters and commentators.",
    },
    {
        title: 'Which HOT Bets appear in the Tip Market & race pages',
        content1:
            'There are tips for over 1,000 pro punters and media experts including all the big names on radio and TV. The tips and bets from the best performing tipsters will appear as HOT Bets.',
        content2:
            'Tipsters include casual punters, professional punters and recognised expert form analysts in the media.',
    },
    {
        title: 'Which odds type is used to calculate statistics?',
        content1:
            'The best tote price is used to calculate statistics for each tipster.',
        content2:
            'Although this price is not available on all races, an independent study has proven that this price is significantly lower than the average fixed odds fluctuation and has been supported by industry professionals as a conservative price measure.',
    },
    {
        title: 'What is the difference between Pro and Punter status?',
        content1:
            'A tipster on theGreatTipOff.com is promoted from Punter status to Pro status when he/she achieves the following: submitted at least 45 tips and one of the following:',
        content2:
            '* double figure profit on turnover over 365 days, 180 days or 90 days<br/>* life-time tipping profit on turnover over 12 months from at least 80 tips.',
    },
    {
        title: 'What does the <br/>tipster get?',
        content1:
            'Each time you back a winning HOT Bet, the tipster earns money!<br/>The more you win from each HOT Bet, the more money the tipster makes! *',
        content2:
            '* A tipster is someone who enters their selections at theGreatTipOff.com',
    },
];
