import { FormControl, Grid, Select, FormHelperText, Typography, MenuItem } from '@mui/material';
import React from 'react';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import lbStore from '@stores/lbStore';
import { useState } from 'react';

import { renderHelperText } from '@Components/Leaderboard/FilterContainer';

function LocSelector() {
    const trackOptions = lbStore((store) => store.trackOptions);
    const alternateRaceTrack = lbStore((store) => store.alternateRaceTrack);
    const updateData = lbStore((store) => store.updateData);

    if (!trackOptions) return <></>;

    let t = Object.values(trackOptions)[0];

    // const tracks = t.map((item) => ({
    //     value: item.LOCID,
    //     label: item.DESCRIPTION,
    // }));

    if (!t) return <></>;

    const tracks = t.map((item) => item.RACEMEET);
    return (
        <>
            <Grid item container xs={12} sx={{ borderBottom: 1, borderColor: 'grey.light' }}>
                <FormControl
                    variant="standard"
                    fullWidth
                    sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', mb: 1 }}
                >
                    {renderHelperText('AT')}
                    <Select
                        className="pendingCommentBox textCapitalize"
                        fullWidth
                        IconComponent={() => <UnfoldMoreIcon sx={{ color: 'primary.main', fontSize: 24 }} />}
                        id="alternateRaceTrack"
                        value={alternateRaceTrack}
                        onChange={(e) => {
                            updateData({ key: 'alternateRaceTrack', value: e.target.value });
                            let value = t.find((item) => item.RACEMEET === e.target.value);
                            // console.log(value);
                            if (value) {
                                updateData({ key: 'alternateRaceTrackValue', value: value?.LOCID });
                            } else if (e.target.value == 'All') {
                                updateData({ key: 'alternateRaceTrackValue', value: 0 });
                            }
                        }}
                        inputProps={{
                            style: {
                                pr: 1,
                                border: 0,
                            },
                        }}
                        MenuProps={{
                            transitionDuration: 0,
                            PaperProps: {
                                style: {
                                    maxHeight: '60vh',
                                },
                            },
                        }}
                        sx={{
                            fontWeight: 'bold',
                            '&:before': {
                                border: 0,
                            },
                            '&:after': {
                                border: 0,
                            },
                        }}
                    >
                        <MenuItem value={'All'} sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Typography
                                sx={{ textTransform: 'uppercase', fontWeight: alternateRaceTrack == 'All' ? 'bold' : 'normal' }}
                                color={'black.main'}
                            >
                                ALL
                            </Typography>
                        </MenuItem>
                        {tracks.map((track, index) => (
                            <MenuItem key={index} value={track} sx={{ display: 'flex', justifyContent: 'end' }}>
                                <Typography
                                    sx={{ textTransform: 'uppercase', fontWeight: alternateRaceTrack == track ? 'bold' : 'normal' }}
                                    color={'black.main'}
                                >
                                    {track}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
}

export default LocSelector;
