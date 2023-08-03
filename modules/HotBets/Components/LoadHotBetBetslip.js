import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import { TipContext } from '@Context/Tip/TipProvider';
import { getHBBetSlip } from '@services/hotbets/hotbetsService';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

const LoadHotBetBetslip = () => {
    const router = useRouter()
    let hbId = router?.query?.id?.[0]
    const { tips, addBetsToBetslip, clearAll } = useContext(TipContext);
    const [openBetSlip, setopenBetSlip] = useState(false)
    const [mounted, setmounted] = useState(false)

    useEffect(() => {
        hbId && setmounted(true)
    }, [])

    useEffect(() => {
        hbId && mounted && handleClear()
        if (!hbId) {
            setopenBetSlip(true)
        }
    }, [mounted])

    const clearBets = () => {
        //clear existing tips
        Object.keys(tips).map((key, idx) => {
            clearAll(key);
        })
        localStorage.removeItem("betsAdded");
        localStorage.removeItem("singles")
        localStorage.removeItem("multi")
        localStorage.removeItem("bets_stake")
        localStorage.removeItem("placedbets")
        localStorage.removeItem("total_bets")
        localStorage.removeItem("bets_nostake")
        localStorage.removeItem("beterrors")
    }

    const handleClear = () => {
        clearBets()
        //Get Hotbet
        gethbBetSlip()
    }

    useEffect(() => {
        addBetsToLocal();
    }, [tips]);

    function addBetsToLocal() {
        localStorage.removeItem('betsAdded');
        localStorage.setItem('betsAdded', JSON.stringify(tips));
    }

    const gethbBetSlip = async () => {
        let body = {
            betid: hbId
        }
        const resp = await getHBBetSlip(body)
        let bets = resp?.data?.BETS;
        bets?.map((data, idx) => {
            addBetsToBetslip({ key: 'hotbet', bets: data });
        });
        setTimeout(() => {
            setopenBetSlip(true)
        }, 300);
    }

    return (
        <React.Fragment>
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </React.Fragment>
    )
};

export default LoadHotBetBetslip;