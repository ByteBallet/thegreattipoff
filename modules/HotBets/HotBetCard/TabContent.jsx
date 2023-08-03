import React, { useEffect, useState } from 'react';

import { getSummaryTabTitles } from '@utils/hotBetUtils';

import BetDetailsTab from '../Tabs/BetDetailsTab/BetDetailsTab';
import StatsTab from '../Tabs/StatsTab/StatsTab';
import { Fade } from '@mui/material';
import { TipContext } from '@Context/Tip/TipProvider';

const TabContent = ({
    selectedTab,
    data,
    colorId,
    summaryList,
    selectedCategory,
    hotBetAdDetail,
    selectedType,
    index,
    mainHotBet,
    handleTabOnClick,
    openBetSlip,
    setopenBetSlip,
    handleAlertClose,
    alertTip,
    handleAlert,
    handleBetSlip,
    settotalBetsRef,
    settriggerDetails,
    triggerDetails,
    showBets,
    totalBetsRef,
    HBMarket = {},
}) => {
    const title = getSummaryTabTitles(data);
    const [adDetail, setAdDetail] = useState();
    const [addBetSlipCount, setAddBetSlipCount] = useState(0);
    const [odds, setOdds] = useState([]);
    const [allStake, setAllStake] = useState();
    const [betSlipCount, setBetSlipCount] = useState(0);

    useEffect(() => {
        let count = 0;
        summaryList?.length > 0 &&
            summaryList.map((item) => {
                count = count + Number(item?.NTIPS);
            });
        setAddBetSlipCount(count);
    }, []);

    useEffect(() => {
        try {
            setAdDetail(hotBetAdDetail[data?.USERID]);
        } catch (error) {
            console.log('error', error);
        }
    }, [hotBetAdDetail]);
    if (selectedTab === 1) {
        return (
            <BetDetailsTab
                selectedCategory={selectedCategory}
                data={data}
                colorId={colorId}
                summaryList={summaryList}
                adDetail={adDetail}
                title={title}
                packid={summaryList?.length > 0 && summaryList[0].PACKID}
                uid={data?.USERID}
                racetype={selectedType}
                index={index}
                openBetSlip={openBetSlip}
                setopenBetSlip={setopenBetSlip}
                handleAlertClose={handleAlertClose}
                alertTip={alertTip}
                handleAlert={handleAlert}
                handleBetSlip={handleBetSlip}
                settotalBetsRef={settotalBetsRef}
                odds={odds}
                setOdds={setOdds}
                allStake={allStake}
                setAllStake={setAllStake}
                betSlipCount={betSlipCount}
                setBetSlipCount={setBetSlipCount}
                triggerDetails={triggerDetails}
                settriggerDetails={settriggerDetails}
                showBets={showBets}
                totalBetsRef={totalBetsRef}
                HBMarket={HBMarket}
            />
        );
    }

    if (selectedTab === 3) {
        return (
            <StatsTab
                selectedType={selectedType}
                uid={data?.USERID}
                data={data}
                colorId={colorId}
                selectedCategory={selectedCategory}
                adDetail={adDetail}
                title={title}
                betSlipCount={betSlipCount}
                mainHotBet={mainHotBet}
                openBetSlip={openBetSlip}
                setopenBetSlip={setopenBetSlip}
                handleAlertClose={handleAlertClose}
                alertTip={alertTip}
                handleAlert={handleAlert}
                handleBetSlip={handleBetSlip}
                handleTabOnClick={handleTabOnClick}
                settriggerDetails={settriggerDetails}
                HBMarket={HBMarket}
            />
        );
    }
};

export default TabContent;
