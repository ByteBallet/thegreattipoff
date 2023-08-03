import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

import { getDetailedStat } from '@services/hotbets/hotbetsService';
import { HOTBET_CATEGORY, STAT_TYPE } from '@lib/constants';
import CircularLoader from '@Components/common/CircularLoader';
import NoDataLabal from '@Components/common/NoDataLabal';

import StatTypeStak from '../../Components/StatTypeStak';
import StatTypeStrk from '../../Components/StatTypeStrk';
import StatTypeFreqWin from '@modules/HotBets/Components/StatTypeFreqWin';

const useStyles = makeStyles((theme) => ({
    //
}));

const DetailedStats = ({
    selectedType,
    selectedCategory,
    uid,
    statType,
    adid,
    timeperiod,
    locid = 0,
}) => {
    const classes = useStyles();
    const [statDetail, setStatDetail] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await getDetailedStat(
                selectedType,
                uid,
                selectedCategory === HOTBET_CATEGORY.FRE_WIN
                    ? HOTBET_CATEGORY.FRE_WIN
                    : statType,
                selectedCategory === HOTBET_CATEGORY.FRE_WIN ? locid : adid,
                timeperiod,
                locid
            );
            if (response) {
                setStatDetail(response);
            }
        } catch (error) {
            console.log('getData-error', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const RenderContent = () => {
        switch (statDetail?.stattype) {
            case STAT_TYPE.STAT:
                return <StatTypeStak data={statDetail?.statdetail} />;
            case STAT_TYPE.STRK:
                return <StatTypeStrk data={statDetail?.statdetail?.detail} />;
            case STAT_TYPE.FREQ_WIN:
                return <StatTypeFreqWin data={statDetail?.freqrun} />;
            default:
                return (
                    <Box
                        sx={{
                            padding: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography style={{ color: 'inherit' }} fontSize={14}>
                            No detailed stats available
                        </Typography>
                    </Box>
                );
        }
    };

    return (
        <>
            {isLoading && <CircularLoader />}
            {!isLoading && !statDetail && <NoDataLabal color="black" py={2} />}
            {!isLoading && statDetail && RenderContent()}
        </>
    );
};
export default DetailedStats;
