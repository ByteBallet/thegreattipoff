import { Tab, Stack, SvgIcon, Typography, Avatar, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/Link';
import Tabs from '@Components/Tabs/Tabs';
import hotbet from '@public/images/svg/hotbet.svg';
import followcountStore from '@stores/followcountStore';

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const CustomTabs = (props) => {
    const classes = useStyles();
    return (
        <Tabs
            value={props.active}
            onChange={props.handler}
            variant="scrollable"
            scrollButtons={props.showscrollbuttons}
            allowScrollButtonsMobile={props.showscrollbuttons}
            aria-label={props.label}
            TabIndicatorProps={{
                style: {
                    display: 'none',
                },
            }}
            className="RacingTabs"
        >
            {props.tabs.map((item, idx) => {
                if (!item) {
                    return <></>
                }
                else if (item == 'HOT Bets') {
                    return (
                        <Stack
                            key={idx}
                            direction="row"
                            sx={{
                                cursor: "pointer"
                            }}
                            mr={1.2}
                            onClick={() => props.handleOnClickHotBet(idx)}
                            className={
                                props.active === 3
                                    ? classes.hotBetTabSelected
                                    : classes.hotBetTab
                            }
                        >
                            {/* <SvgIcon
                                sx={{ mr: 0.8, pl: 0.3, width: 15 }}
                                color="grey.light"
                                component={hotbet}
                                viewBox={'0 0 44.593 55.624'}
                            /> */}
                            <img
                                src={`/images/tools/hot-bet-icon-orange.png`}
                                width={15}
                            />
                            <Typography fontSize={14} ml={0.5}>HOT Bet</Typography>
                            <Stack className={classes.badges}>
                                <Typography color="#fff" fontSize={8}>
                                    NEW
                                </Typography>
                            </Stack>
                        </Stack>
                    );
                } else if (props.label == 'Betting Tabs') {
                    return idx == props.Quaddie_idx ? (
                        props.quaddieRaces.indexOf(props.raceid) > -1 ? (
                            <Tab label={item} {...a11yProps(idx)} key={idx} sx={{ height: 33, marginTop: 0.5 }} />
                        ) : (
                            <Link href={props.link} key={idx}>
                                <Tab
                                    label={item}
                                    {...a11yProps(idx)}
                                    key={idx}
                                    sx={{
                                        opacity: 1,
                                        height: 33,
                                        marginTop: 0.5,
                                        cursor: "pointer"
                                    }}
                                />
                            </Link>
                        )
                    ) : (
                        <Tab label={item} {...a11yProps(idx)} key={idx} sx={{ height: 33, marginTop: 0.5 }} />
                    );
                } else if (props.label == 'Blackbook') {
                    let count = item != "Settings" ? followcountStore((state) => state?.[item]) || 0 : 0
                    return <Tab
                        icon={
                            count > 0 ?
                                <Avatar sx={{ minWidth: 18, width: "auto", height: 18, fontSize: 10, bgcolor: "grey.dark", p: 0.6, color: "white.main" }}>{count}</Avatar> :
                                null
                        }
                        iconPosition="start"
                        label={item}
                        {...a11yProps(idx)}
                        key={idx}
                        sx={{ height: 33, marginTop: 0.5 }}
                    />;
                }
                else if (props.isNewFeed && item === 'Feed') {
                    return (<Stack
                        key={idx}
                        direction="row"
                        sx={{
                            cursor: "pointer"
                        }}
                        mr={1.2}
                        onClick={() =>
                            props.handler(undefined, idx)
                        }
                        className={
                            props.active === 1
                                ? classes.feedTabSelected
                                : classes.feedTab
                        }
                    >
                        <Typography fontSize={14} ml={0.5} sx={{ color: props.active === 1 ? '#fff' : '' }}>{item}</Typography>
                        <Stack className={classes.badges}>
                            <Typography color="#fff" fontSize={8}>
                                NEW
                            </Typography>
                        </Stack>
                    </Stack>)
                }
                else {
                    return <Tab label={item} {...a11yProps(idx)} key={idx} sx={{ height: 33, marginTop: 0.5 }} className={item == "Free Tips" && "freeTipBtn"} />;

                }
            })}
        </Tabs >
    );
};

export default CustomTabs;

const useStyles = makeStyles((theme) => ({
    hotBetTabSelected: {
        background: theme.palette.primary.main,
        paddingLeft: '10px',
        paddingRight: '12px',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '33px',
        marginTop: 4,
        marginBottom: 4,
        marginRight: 9,
    },
    hotBetTab: {
        background: '#E2E2E2',
        paddingLeft: '10px',
        paddingRight: '12px',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '33px',
        overflow: 'visible',
        marginTop: 4,
        marginBottom: 4,
        marginRight: 9,
    },
    badges: {
        marginTop: -27,
        marginLeft: -20,
        background: '#3069d8',
        paddingRight: 6,
        paddingLeft: 6,
        borderRadius: 5,
        height: 13,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    feedTabSelected: {
        background: theme.palette.primary.main,
        paddingLeft: '10px',
        paddingRight: '12px',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '33px',
        marginTop: 4,
        marginBottom: 4,
        marginRight: 9,
        color: '#fff'
    },
    feedTab: {
        background: '#E2E2E2',
        paddingLeft: '10px',
        paddingRight: '12px',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '33px',
        overflow: 'visible',
        marginTop: 4,
        marginBottom: 4,
        marginRight: 9,
    },
}));
