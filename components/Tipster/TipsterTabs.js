import React, { useContext, useState, useEffect } from 'react';
import TipsterTips from './TipsterTips';
import Stats from '../Tipster/Stats';
import Results from '../Tipster/Results';
import Odds from '../Tipster/Odds';
import News from '../Tipster/News';
import Strategy from '../Tipster/Strategy';
import { Button, Tab, Box, Stack, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import UserTips from '../user/UserTips';
import Feed from './Feed';
import CustomTabs from '@Components/Shared/CustomTabs';
import CustomTabPanel from '@Components/Shared/CustomTabPanel';
import { UserContext } from '@Context/User/UserProvider';
import { getSummaryTabTitles, toTitleCase } from '@utils/hotBetUtils';
import StatsDetails from '@modules/HotBets/Components/StatsDetails';
import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import BoxDivider from '@Components/Shared/BoxDivider';
import authAPI from '@Components/utils/authAPI';
import CarouselItem from '@Components/Home/CarouselItem';
import TrendingHotBets from '@modules/HotBets/Components/TrendingHotBets';
import TipsterProfile from './TipsterProfile';
import { getAllRaces } from '@lib/fetcher';
import { getUserBio } from '@services/tipster/tipsterService';
import ProTipsterBanner from './ProTipsterBanner';
import SchemaFAQ from '@Components/Shared/SchemaFAQ';
import TipsterBackground from './TipsterBackground';
import { TIPSTER_ROUTE_VALUE } from '@lib/constants';
import { useRouter } from 'next/router';
import TipEarnBody from '@Components/TipEarn/Body';
import StatHeadingDetail from './Stats/StatHeadingDetail';
import StatsDetailsLG from './Stats/StatDetailsLG';
import FeedPending from './Pending/FeedPending';
import ShowGetTipsContent from './GetTips/ShowGetTipsContent';
import Link from 'next/Link';
import { scrollToTop } from '@Components/utils/util';

const TipsterTabs = ({ tipster, selectedCategory, HBMarket, selectedType, page, isProTipster, isShare, sethideIcon }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const router = useRouter();
    const [trendTipsters, settrendTipsters] = useState({});
    const { user } = useContext(UserContext);
    let isUser = user?.userID == tipster?.USERID;
    let tabsList = isUser ? ['Tips', 'Feed', 'Profile', 'Earn', 'Stats', 'Results'] : ['Tips', 'Feed', 'Profile', 'Stats', 'Results'];

    if (tipster?.SHOWNEWS) {
        tabsList.push('News');
    }
    const [tabs, settabs] = useState(tabsList);
    let selected = tipster?.NTIPS > 0 ? 0 : 1;
    if (page) {
        selected =
            tabs?.findIndex((item) => item?.toLowerCase() == page?.toLowerCase()) == -1
                ? selected
                : tabs?.findIndex((item) => item?.toLowerCase() == page);
    }
    const [activeTab, setactiveTab] = useState(selected);
    let colorCode = 0;

    const title = getSummaryTabTitles(tipster);

    async function getTrendingTipsters() {
        const data2 = (await getAllRaces(user.promo, selectedType, 0)) || {};
        settrendTipsters(data2.hotbet);
    }

    const getUserStrategy = async () => {
        let body = { userid: tipster?.USERID, page: "strategy" };
        const resp = await getUserBio(body);
        if (resp?.data?.details?.length > 0) {
            !tabs?.includes('Strategy') && settabs([...tabs, 'Strategy']);
        }
    };

    useEffect(() => {
        getTrendingTipsters();
        !tabs?.includes('Strategy') && getUserStrategy();
        return () => {
            settrendTipsters({});
        };
    }, [selectedType]);

    useEffect(() => {
        let newTab = TIPSTER_ROUTE_VALUE?.filter((item) => item?.label?.toLowerCase() == tabs[activeTab]?.toLowerCase())?.[0];
        newTab?.label == 'Feed' ? sethideIcon(true) : sethideIcon(false)
    }, [activeTab])


    useEffect(() => {
        let getTab = tabs?.map((item) => item?.toLowerCase())?.indexOf(router?.query?.sid?.[1] || 'Feed');
        setactiveTab(getTab == -1 ? 1 : getTab);
    }, [router.query]);

    const handleChange = (event, newValue) => {
        let newTab = TIPSTER_ROUTE_VALUE?.filter((item) => item?.label?.toLowerCase() == tabs[newValue]?.toLowerCase())?.[0];
        router.push({
            pathname: '/tipster/[[...sid]]',
            query: { sid: [router?.query?.sid?.[0], newTab?.route] },
        });
        //setactiveTab(newValue);
    };

    const renderTrendingTipsters = () => {
        return (
            <React.Fragment>
                {trendTipsters && trendTipsters?.length > 0 && (
                    <React.Fragment>
                        <Box sx={{ mb: 3, px: 2 }}>
                            <BoxDivider />
                        </Box>
                        <Box px={2}>
                            <CustomGridTitle title="Trending Tipsters" />
                            <Box mt={1}>
                                <TrendingHotBets
                                    isCarousel={true}
                                    isDesktop={false}
                                    trendingHotBets={trendTipsters}
                                    getTipsterCarousel={getTrendingTipsters}
                                />
                            </Box>
                        </Box>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    };

    const renderSchemaFaq = () => {
        return <SchemaFAQ raceType={selectedType} />;
    };

    const renderTipsterBackground = () => {
        return <TipsterBackground tipster={tipster} />;
    };
    const renderContent = (item) => {
        switch (item) {
            case 'Tips':
                return (
                    <React.Fragment>
                        {isUser ? (
                            <>
                                {user?.pendingTips > 0 && <FeedPending tipster={tipster} />}
                                <UserTips tipster={tipster} selectedType={selectedType} />
                            </>
                        ) : (
                            <>
                                <TipsterTips tipster={tipster} selectedType={selectedType} selectedCat={selectedCategory} />
                            </>
                        )}
                        {renderTrendingTipsters()}
                    </React.Fragment>
                );
            case 'Feed':
                return (
                    <Box mt={0}>
                        {!isUser && tipster?.NTIPS > 0 && (
                            <Box mb={1}>
                                <TipsterTips tipster={tipster} selectedType={selectedType} selectedCat={selectedCategory} />
                            </Box>
                        )}
                        {isUser && (
                            <Typography my={2} color="grey.main" px={2} fontSize={12} component={'p'} align="left">
                                Showing activity for you and{' '}
                                <Link href="/myaccount/managealerts">
                                    <u style={{ cursor: 'pointer' }}>tipsters who you are following</u>
                                </Link>
                            </Typography>
                        )}
                        <Feed tipster={tipster} isUser={isUser} />
                        {renderTipsterBackground()}
                        {renderSchemaFaq()}
                    </Box>
                );
            case 'Earn':
                return (
                    <Box>
                        <TipEarnBody />
                    </Box>
                );
            case 'Stats':
                return (
                    <React.Fragment>
                        <Stats isUser={isUser} tipster={tipster} selectedType={selectedType} selectedCat={selectedCategory} />
                        {renderTrendingTipsters()}
                    </React.Fragment>
                );
            case 'Profile':
                return <TipsterProfile selectedType={selectedType} tipster={tipster} />;
            case 'Results':
                return <Results tipster={tipster} selectedType={selectedType} selectedCategory={selectedCategory} />;
            case 'News':
                return <News tipster={tipster} selectedType={selectedType} />;
            case 'Strategy':
                return <Strategy tipster={tipster} selectedType={selectedType} isUser={isUser} />;
            default:
                return <TipsterTips />;
        }
    };

    useEffect(() => {
        if (isShare) {
            setTimeout(() => {
                scrollToTop('shareTips')
            }, 1000);
        }
    }, [isShare])

    return (
        <>
            {!isShare && (
                <Box sx={{ width: '100%', backgroundColor: 'text.active', position: isProTipster && 'relative', top: -12 }} py={1} px={2}>
                    <CustomTabs tabs={tabs} handler={handleChange} active={activeTab} showscrollbuttons={false} label="Tipster" />
                </Box>
            )}
            {isShare && isDesktop &&
                <React.Fragment>
                    <div id="shareTips" />
                </React.Fragment>
            }
            {!isUser && (
                <>
                    <Box
                        sx={{
                            py: isProTipster ? 0 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 1,
                            //              backgroundColor: isProTipster ? 'inherit' : 'pink',
                            // backgroundColor: 'rgb(230, 245, 230)',
                            background:
                                'radial-gradient(circle, rgba(230,245,230,1) 0%, rgba(246,250,246,1) 100%, rgba(251,251,251,1) 100%)',
                        }}
                    >
                        {isProTipster ? (
                            <ProTipsterBanner
                                data={tipster}
                                colorId={colorCode}
                                selectedCategory={selectedCategory}
                                adDetail={HBMarket?.hotbetaddetail?.[tipster?.USERID] || []}
                                title={title}
                                isTipsterStat={true}
                                hotbetMarket={HBMarket}
                            />
                        ) : (
                            <Box sx={{ paddingX: '50px', paddingY: '10px' }}>
                                <StatsDetailsLG
                                    data={tipster}
                                    colorId={colorCode}
                                    selectedCategory={selectedCategory}
                                    adDetail={HBMarket?.hotbetaddetail?.[tipster?.USERID] || []}
                                    title={title}
                                    isTipsterStat={true}
                                    hotbetMarket={HBMarket}
                                    HBMarket={HBMarket}
                                    size="large"
                                />
                            </Box>
                        )}
                    </Box>
                </>
            )}
            {!isShare && (
                <Box>
                    {tabs.map((item, idx) => (
                        <CustomTabPanel value={activeTab} index={idx} key={idx} content={renderContent(item)} />
                    ))}
                </Box>
            )}
            {isShare &&
                <React.Fragment>
                    <ShowGetTipsContent tipster={tipster} selectedType={selectedType} isShare={isShare} />
                    {!isDesktop && <div id="shareTips" />}
                </React.Fragment>
            }
        </>
    );
};

export default TipsterTabs;
