import BetDetailsTab from '@modules/HotBets/Tabs/BetDetailsTab/BetDetailsTab';
import { getSummaryTabTitles } from '@utils/hotBetUtils';
import React, { useState, useEffect } from 'react';

const TipsterBetDetailsContent = ({
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
    showGetTips,
    totalBetsRef,
    selectedDate
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
    }, [summaryList]);

    useEffect(() => {
        try {
            setAdDetail(hotBetAdDetail[data?.USERID]);
        } catch (error) {
            console.log('error', error);
        }
    }, [hotBetAdDetail]);

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
            showGetTips={showGetTips}
            hidestats={true}
            totalBetsRef={totalBetsRef}
            selectedDate={selectedDate}
            key={selectedType}
        />
    );
};

export default TipsterBetDetailsContent;
