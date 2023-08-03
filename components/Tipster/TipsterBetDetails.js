import { Fade } from '@mui/material';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import TipsterBetDetailsContent from './TipsterBetDetailsContent';

const TipsterBetDetails = ({
    card,
    index,
    summary,
    selectedCategory,
    hotBetAdDetail,
    selectedType,
    racingPageTopButton,
    raceid = '',
    oddsRange = [],
    showGetTips = false,
    showBets = false,
    selectedDate = 0
}) => {
    const [summaryList, setSummaryList] = useState([]);
    const [adDetail, setAdDetail] = useState();
    const [totalBetsRef, settotalBetsRef] = useState();
    const [triggerDetails, settriggerDetails] = useState(false);
    let colorCode = index % 3;

    useEffect(() => {
        const filteredSummary = summary?.length > 0 && summary.filter((data) => data?.USERID === card?.USERID);
        setSummaryList(filteredSummary);
    }, [summary]);

    useEffect(() => {
        settotalBetsRef(card?.NTIPS)
    }, [card])


    useEffect(() => {
        try {
            setAdDetail(hotBetAdDetail[card?.USERID]);
        } catch (error) {
            console.log('error', error);
        }
    }, [hotBetAdDetail]);

    const [openBetSlip, setopenBetSlip] = useState(false);

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });

    const handleAlert = () => {
        setTimeout(() => {
            setalertTip({
                ...alertTip,
                open: true,
            });
        }, 20);
    };

    const handleAlertClose = () => {
        setalertTip({
            ...alertTip,
            open: false,
        });
    };
    let today = moment().utc();
    let chkTipTime = moment.utc(card?.TIPENDTIME).diff(today) < 0;
    return (
        <React.Fragment>
            {!chkTipTime && (
                <TipsterBetDetailsContent
                    selectedTab={1}
                    data={card}
                    colorId={colorCode}
                    summaryList={summaryList}
                    selectedCategory={selectedCategory}
                    hotBetAdDetail={hotBetAdDetail}
                    selectedType={selectedType}
                    index={index}
                    mainHotBet
                    openBetSlip={openBetSlip}
                    setopenBetSlip={setopenBetSlip}
                    handleAlertClose={handleAlertClose}
                    alertTip={alertTip}
                    handleAlert={handleAlert}
                    handleBetSlip={handleBetSlip}
                    settotalBetsRef={settotalBetsRef}
                    settriggerDetails={settriggerDetails}
                    triggerDetails={triggerDetails}
                    showBets={showBets}
                    showGetTips={showGetTips}
                    totalBetsRef={totalBetsRef}
                    selectedDate={selectedDate}
                />
            )}
        </React.Fragment>
    );
};

export default TipsterBetDetails;
