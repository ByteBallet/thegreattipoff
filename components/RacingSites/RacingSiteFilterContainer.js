import React from 'react';
import { useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Stack, Typography } from '@mui/material';
import racingSiteStore from '@stores/racingSiteStore';
import { getAllRaceTracks, getResults } from '@services/tipster/tipsterService';
import { groupByKey } from '@Components/utils/util';
import FilterContainer from '@Components/Leaderboard/FilterContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMinTips } from '@Components/utils/RacingUtil';

const RacingSiteFilterContainer = ({ selectedType, isMarket }) => {
    const media = racingSiteStore((state) => state.media);
    const tracks = racingSiteStore((state) => state.tracks);
    const period = racingSiteStore((state) => state.period);
    const periodOptions = racingSiteStore((state) => state.periodOptions);
    const bettype = racingSiteStore((state) => state.bettype);
    const staking = racingSiteStore((state) => state.staking);
    const tipster = racingSiteStore((state) => state.tipster);
    const initialise = racingSiteStore((state) => state.initializeStore);
    const updateData = racingSiteStore((state) => state.updateData);
    const tracksList = racingSiteStore((state) => state.tracksList);
    const numTips = racingSiteStore((state) => state.numTips);
    const updateStats = racingSiteStore((state) => state.updateStats);
    const tipsterList = racingSiteStore((state) => state.tipsterList);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpanded = (event, isExpanded) => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        updateData({ key: 'numTips', value: getMinTips(period, tracks?.length > 0) });
    }, [period]);

    const handleChange = (prop) => (event) => {
        const {
            target: { value },
        } = event;
        let val = value;
        if (prop == 'tracks') {
            if (racetrack?.toString()?.length > 0) {
                updateData({ key: 'racetrack', value: 0 });
            }
            const index = value.indexOf(0); //All option check
            if (index > -1) {
                // only splice array when item is found
                value.splice(index, 1); // 2nd parameter means remove one item only
            }
            let clear = value.indexOf(-1) > 0; // clear all clicked
            val = clear ? [] : typeof value === 'string' ? value.split(',') : value;
        }
        updateData({ key: prop, value: val });
    };

    const handleSlider = (event, newValue) => {
        updateData({ key: 'numTips', value: newValue });
    };

    const renderBetTypeFilter = (value) => {
        let label = "<b>Win Tips</b> with <b>Even Stake</b>"
        if (value == "placeEven") {
            label = "<b>Place Tips</b> with Even Stake</b>"
        } else if (value == "actual") {
            label = "<b>Actual Stake</b> on all tips"
        }
        return <Typography color={'black.main'} fontSize={12}>
            <div
                dangerouslySetInnerHTML={{
                    __html: label,
                }}
            />
        </Typography>
    }

    let filter = {
        period: period,
        bettype: bettype,
        staking: staking,
        numTips: numTips,
        tipster: tipster,
    };

    let filterLables = [
        {
            label: 'OVER',
            filter: periodOptions?.filter((item) => item.VAL == period)?.[0]?.LABEL,
        },
        {
            label: 'USING',
            filter: renderBetTypeFilter(bettype),
        },
        {
            label: 'BY',
            filter: tipsterList?.filter((item) => item.USERID == tipster)?.[0]?.ALIAS || 'All',
        },
    ];

    const handleUpdate = () => {
        setExpanded(false);
        updateData({ key: 'updateStats', value: !updateStats });
    };

    return (
        <Accordion expanded={expanded} onChange={handleExpanded} component="Box" square sx={{ border: 0 }}>
            <AccordionSummary
                sx={{
                    pt: 0,
                    px: 2,
                    minHeight: 'auto',
                    bgcolor: '#fcedfe',
                    my: 0,
                    '& .MuiAccordionSummary-content': {
                        my: 0,
                    },
                }}
                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Stack direction="row" spacing={0.5} alignItems="center" justifyContent={'space-between'}>
                    {filterLables?.map((item, idx) => (
                        <Stack direction={'row'} key={idx} alignItems="center" justifyContent={'start'}>
                            <Typography fontSize={12} color="grey.dark">
                                {item?.label}
                            </Typography>
                            <Typography fontSize={12} fontWeight="bold" ml={0.5} noWrap>
                                {item?.filter}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: 'white.main' }}>
                <Box pb={2}>
                    <FilterContainer
                        tipsterList={tipsterList}
                        handleSlider={handleSlider}
                        handleChange={handleChange}
                        period={periodOptions}
                        filter={filter}
                        bettype={bettype}
                        stake={staking}
                        isLB={true}
                        handleUpdate={handleUpdate}
                        handleExpanded={handleExpanded}
                        racetrack={''}
                    />
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default RacingSiteFilterContainer;
