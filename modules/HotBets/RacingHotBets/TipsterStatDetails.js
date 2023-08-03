import React, { useState, useContext } from 'react';
import { Stack, Typography, Box, CardContent, Card } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { HB_STATS_TABS } from '@lib/constants';
import { TipContext } from '@Context/Tip/TipProvider';
import { UserContext } from '@Context/User/UserProvider';
import Tabs from '../Tabs/StatsTab/Tabs';
import DetailedStats from '../Tabs/StatsTab/DetailedStats';
import RecentWinners from '../Tabs/StatsTab/RecentWinners';
import Profile from '../Tabs/StatsTab/Profile';
import CommonModal from '@Components/Payments/Common/CommonModal';

const TipsterStatDetails = ({ card, isCarousel }) => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState(
        HB_STATS_TABS.RECENT_WINNERS
    );
    const [isExpanded, setIsExpanded] = useState(false);
    const { tips, addBetsToBetslip } = useContext(TipContext);
    const { user } = useContext(UserContext);
    const [loadingBetSlip, setLoadingBetSlip] = useState(false);
    const [err, seterr] = useState('');

    const handleOnClickSeeBetDetails = () => {
        setIsExpanded(!isExpanded);
    };
    const handleTabClick = (value) => {
        setSelectedTab(value);
    };
    let totalbets = 0;
    Object.keys(tips).map((key, idx) => {
        key != 'multi' &&
            (totalbets = totalbets + (tips[key] ? tips[key].length : 0));
    });

    const renderContent = () => {
        switch (selectedTab) {
            case HB_STATS_TABS.DETAILD_STATS:
                return (
                    <DetailedStats
                        selectedType={card?.RACETYPE}
                        selectedCategory={card?.CAT}
                        uid={card?.USERID}
                        statType={card?.STATTYPE}
                        adid={card?.ADVERTID}
                        timeperiod={card?.TIMEPERIOD}
                        locid={card?.LOCID}
                    />
                );
            case HB_STATS_TABS.RECENT_WINNERS:
                return (
                    <RecentWinners
                        selectedType={card?.RACETYPE}
                        selectedCategory={card?.CAT}
                        uid={card?.USERID}
                        adid={card?.ADVERTID ?? 0}
                        locid={card?.LOCID}
                        isCarousel={isCarousel}
                        timeperiod={card?.TIMEPERIOD}
                        frmTipster={true}
                        tipster={card?.ALIAS}
                    />
                );
            case HB_STATS_TABS.PROFILE:
                return (
                    <Profile
                        selectedType={card?.RACETYPE}
                        uid={card?.USERID}
                        name={card?.ALIAS}
                    />
                );
            default:
                return '';
        }
    };
    return (
        <React.Fragment>
            <Box sx={{ width: 1 }}>
                {true && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="end"
                    >
                        <Typography
                            sx={{
                                cursor: 'pointer',
                                color: 'info.comment',
                                fontSize: 12,
                            }}
                            // className={classes.detailsText}
                            onClick={() => {
                                handleOnClickSeeBetDetails();
                            }}
                        >
                            {isExpanded ? 'Hide stats' : 'More stats'}
                        </Typography>
                        {isExpanded ? (
                            <ExpandLess
                                sx={{ color: '#3069d8', fontSize: 14 }}
                            />
                        ) : (
                            <ExpandMore
                                sx={{ color: '#3069d8', fontSize: 14 }}
                            />
                        )}
                    </Stack>
                )}
                {(isExpanded || card?.NTIPS == 0) && (
                    <CommonModal open={isExpanded} onClose={() => setIsExpanded(false)} title={`${card?.ALIAS}'s Stats`}>
                        <Card component="Box" sx={{ backgroundColor: 'white', m: 0, p: 0 }}>
                            <CardContent sx={{ minHeight: 500, maxHeight: 500, overflowY: "auto" }}>
                                <Tabs
                                    selectedTab={selectedTab}
                                    handleTabOnClick={handleTabClick}
                                />
                                <Box sx={{ height: 1, overflowY: "auto" }}>
                                    {renderContent()}
                                </Box>
                            </CardContent>
                        </Card>
                    </CommonModal>
                )}
            </Box>
        </React.Fragment >
    );
};

const useStyles = makeStyles((theme) => ({
    rowsWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.background.default,
    },
    rowContainerExpanded: {
        background: theme.palette.primary.main,
        paddingLeft: '15px',
        paddingRight: '12px',
        margin: '5px',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30px',
    },
    rowContainer: {
        background: theme.palette.background.whiteBackground,
        paddingLeft: '15px',
        paddingRight: '12px',
        margin: '5px',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30px',
    },
    nameText: {
        fontSize: theme.typography.hotbet.subTitle,
    },
    detailsText: {
        fontSize: theme.typography.hotbet.subTitle,
        textAlign: 'center',
        color: theme.palette.text.blueText,
    },
    border: {
        borderTop: '1px solid rgba(224, 224, 224, 1)',
        margin: '0 22px 10px 22px',
    },
}));

export default TipsterStatDetails;
