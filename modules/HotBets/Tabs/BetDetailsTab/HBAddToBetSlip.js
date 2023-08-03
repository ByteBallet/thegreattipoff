import LoadGetTips from '@Components/Tipster/GetTips/LoadGetTips';
import AddToBetSlipButton from '@modules/HotBets/Components/AddToBetSlipButton';
import { Box } from '@mui/material';
import { toTitleCase } from '@utils/hotBetUtils';
import React, { useEffect, useState } from 'react';

const HBAddToBetSlip = ({ data, showGetTips, currentFocus, betSlipCount, getModalData, checkDeselected,
    getBetDetailsData, setIsExpanded, isExpanded, isAddtoBetLoading,
    setLoadingBetSlip = () => { }, loadingBetSlip, handleBetSlip, selectedCategory, totalBetsRef,
    summaryList = [], deselectArray = [], index = 0, error = false, fromGetTips, stakeErr = false, setstakeErr = () => { } }) => {
    const [openGetTipsModal, setOpenGetTipsModal] = useState(false);

    let uid = data?.USERID

    const handleOnClickGetTips = () => {
        setOpenGetTipsModal(true)
    }

    useEffect(() => {
        !openGetTipsModal && setIsExpanded(false)
    }, [openGetTipsModal])

    const handleOnClickAddToSlipButton = () => {
        currentFocus.current = null;
        if (betSlipCount > 0) {
            const locationIds = [];
            summaryList?.length > 0 &&
                summaryList.map((item) => {
                    if (!checkDeselected(Number(`${uid}${index}${item?.LOCID}`))) {
                        locationIds.push(item?.LOCID);
                    }
                });
            if (locationIds?.length > 0 && !error) {
                setLoadingBetSlip(true);
                if (fromGetTips) {
                    getModalData(uid, data?.RACETYPE, summaryList?.[0]?.PACKID, locationIds, true);
                } else {
                    getModalData(locationIds, true);
                }
            }
        } else if (betSlipCount == 0) {
            setstakeErr(true)
        }
        else {
            if (!isExpanded) {
                let newLocList = summaryList.filter((item) => deselectArray.indexOf(Number(`${uid}${index}${item.LOCID}`)) == -1);
                let oddsFilter = localStorage.getItem('oddsfilter')
                    ? JSON.parse(localStorage.getItem('oddsfilter'))
                    : [hbFilterInit, hbFilterEnd];
                getBetDetailsData(true, oddsFilter[0], oddsFilter[1], newLocList);
                setIsExpanded(true)
            }
        }
    };
    return (
        <Box mt={1}>
            {showGetTips ? (
                <>
                    <AddToBetSlipButton
                        betSlipCount={betSlipCount}
                        isLoading={isAddtoBetLoading}
                        onClick={handleOnClickGetTips}
                        isAddtoBetLoading={isAddtoBetLoading}
                        loading={openGetTipsModal}
                        variant={'get-tip'}
                        skipSessionChk={true}
                        uid={uid}
                        fromGetTips={fromGetTips}
                    />
                </>
            ) : (
                <AddToBetSlipButton
                    betSlipCount={betSlipCount}
                    isLoading={isAddtoBetLoading}
                    onClick={handleOnClickAddToSlipButton}
                    isAddtoBetLoading={isAddtoBetLoading}
                    loading={loadingBetSlip}
                    skipSessionChk={fromGetTips ? true : false}
                    uid={uid}
                    fromGetTips={fromGetTips}
                />
            )}

            <LoadGetTips
                open={openGetTipsModal}
                setOpenGetTipsModal={setOpenGetTipsModal}
                alias={data?.ALIAS}
                tipster={data}
                selectedCategory={selectedCategory}
                selectedType={data?.RACETYPE}
                selectedDate={0}
                handleBetSlip={handleBetSlip}
                totalBets={data?.NTIPS}

            />
        </Box>
    );
};

export default HBAddToBetSlip;