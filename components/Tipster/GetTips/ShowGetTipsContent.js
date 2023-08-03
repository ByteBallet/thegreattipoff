import React, { useState } from 'react';
import LoadGetTips from './LoadGetTips';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import { toTitleCase } from '@utils/hotBetUtils';
import { Box } from '@mui/material';

const ShowGetTipsContent = ({ tipster, selectedType, isShare }) => {
    const [openBetSlip, setopenBetSlip] = useState(false);

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };
    return (
        <Box sx={{ bgcolor: "white.main" }}>
            <LoadGetTips
                open={true}
                setOpenGetTipsModal={() => { }}
                alias={toTitleCase(tipster?.ALIAS)}
                tipster={tipster}
                selectedCategory={null}
                selectedType={''}
                selectedDate={0}
                handleBetSlip={handleBetSlip}
                isShare={isShare}
            />
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </Box>
    );
};

export default ShowGetTipsContent;