import React from 'react';
import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Stack, Typography } from '@mui/material';
import lbStore from '@stores/lbStore';
import { getAllRaceTracks, getResults } from '@services/tipster/tipsterService';
import { groupByKey } from '@Components/utils/util';
import FilterContainer from './FilterContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMinTips } from '@Components/utils/RacingUtil';
import { toTitleCase } from '@utils/hotBetUtils';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

const LeaderboardFilterContainer = ({ selectedType, isMarket, showAlternateTracks = false, tipsterName = "", reloadData, setreloadData, isTrack }) => {
    const router = useRouter()
    const media = lbStore((state) => state.media, shallow);
    const trackOptions = lbStore((state) => state.trackOptions, shallow);
    const tracks = lbStore((state) => state.tracks, shallow);
    const alternateRaceTrack = lbStore((store) => store.alternateRaceTrack, shallow);
    const period = lbStore((state) => state.period, shallow);
    const periodOptions = lbStore((state) => state.periodOptions, shallow);
    const bettype = lbStore((state) => state.bettype, shallow);
    const staking = lbStore((state) => state.staking, shallow);
    const tipster = lbStore((state) => state.tipster, shallow);
    const initialise = lbStore((state) => state.initializeStore);
    const updateData = lbStore((state) => state.updateData);
    const tracksList = lbStore((state) => state.tracksList, shallow);
    const numTips = lbStore((state) => state.numTips, shallow);
    const updateStats = lbStore((state) => state.updateStats, shallow);
    const racetrack = lbStore((state) => state.racetrack, shallow);

    const [expanded, setExpanded] = useState(false);

    const handleExpanded = (event, isExpanded) => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        expanded && setExpanded(false)
    }, [router?.asPath])

    const getTracks = async () => {
        let body = {
            racetype: selectedType,
            group: false,
            timeperiod: period,
            page: isTrack ? "track" : isMarket ? "tipmarket" : "home"
        };
        try {
            const response = await getAllRaceTracks(body);

            initialise({
                key: 'tracksList',
                value: response?.data?.tracks,
            });
            initialise({
                key: 'trackOptions',
                value: groupByKey(response?.data?.tracks, 'LABEL'),
            });
        } catch (error) {
            console.log('error', error);
        } finally {
        }
    };

    useEffect(() => {
        getTracks();
    }, [period]);

    const handleChange = (prop) => (event) => {
        const {
            target: { value },
        } = event;
        let val = value;
        if (prop == 'tracks') {
            if (racetrack > 0) {
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

    let filter = {
        tracks: tracks,
        period: period,
        bettype: bettype,
        staking: staking,
        numTips: numTips,
        tipster: tipster,
    };

    const renderTracksFilter = (selected = []) => {
        if (selected.length > 1) {
            return selected.length + ' Tracks';
        } else if (selected.length == 1) {
            if (selected[0] == 0) {
                return 'All Tracks';
            } else {
                let trackList = [];
                trackOptions &&
                    Object.keys(trackOptions).map((group, idx) => {
                        let list = trackOptions?.[group]
                            .filter((item) => selected.includes(item.LOCID))
                            .map((ele) => toTitleCase(ele.RACEMEET));
                        trackList.push(list);
                    });
                return trackList;
            }
        } else {
            return 'All Tracks';
        }
    };

    const renderAlternateTracks = (value) => {
        return <Typography color={'black.main'} fontSize={12} fontWeight={"bold"}>
            <div
                dangerouslySetInnerHTML={{
                    __html: toTitleCase(value),
                }}
            />
        </Typography>
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
            label: 'AT',
            filter: showAlternateTracks ? renderAlternateTracks(alternateRaceTrack) : renderTracksFilter(tracks),
        },
    ];

    const handleUpdate = () => {
        setExpanded(false);
        setreloadData(!reloadData)
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
                        handleSlider={handleSlider}
                        handleChange={handleChange}
                        period={periodOptions}
                        trackOptionsList={trackOptions}
                        filter={filter}
                        bettype={bettype}
                        stake={staking}
                        isLB={true}
                        handleUpdate={handleUpdate}
                        handleExpanded={handleExpanded}
                        racetrack={racetrack}
                        showAlternateTracks={showAlternateTracks}
                    />
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default LeaderboardFilterContainer;
