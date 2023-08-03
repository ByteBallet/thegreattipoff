import { FormControl, Grid, Select, FormHelperText, Typography, MenuItem, ListSubheader, Checkbox, Divider } from '@mui/material';
import React from 'react';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import BoxDivider from '@Components/Shared/BoxDivider';
import { Box } from '@mui/system';
import OddsFilter from '@modules/HotBets/Components/OddsFilter';
import CustomSuccessButton from '@Components/Shared/CustomSuccessButton';
import LocSelector from '@Components/Tipster/Stats/LocSelector';
import { toTitleCase } from '@utils/hotBetUtils';

export const renderHelperText = (label) => {
    return (
        <FormHelperText sx={{ mt: 0, width: '30%' }}>
            <Typography className="textCapitalize" fontSize={14} noWrap color={'grey.main'} mr={2} align="center">
                {label}
            </Typography>
        </FormHelperText>
    );
};

const FilterContainer = ({
    handleChange,
    period,
    trackOptionsList,
    bettype,
    stake,
    filter,
    tipsters,
    showAlternateTracks = false,
    isLB = false,
    racetrack,
    handleSlider,
    handleUpdate,
    tipsterList,
}) => {
    let trackobj = {};
    if (racetrack?.toString()?.length > 0) {
        Object.keys(trackOptionsList).map((group, idx) => {
            let list = trackOptionsList?.[group].filter((item) => racetrack == item.LOCID);
            if (list?.length > 0) {
                trackobj[group] = list;
            }
        });
    }

    let trackOptions = racetrack > 0 ? trackobj : trackOptionsList;

    let atTrackOptions = [];
    if (showAlternateTracks) {
        let tol = Object.values(trackOptionsList)[0];
        atTrackOptions = tol;
        Object.keys(trackOptionsList).map((group, idx) => {
            let list = trackOptionsList?.[group].filter((item) => racetrack == item.LOCID);
            if (list?.length > 0) {
                trackobj[group] = list;
            }
        });
    }

    const renderTracks = (label) => {
        return [
            <ListSubheader key={label}>{label}</ListSubheader>,
            trackOptions?.[label]?.map((item, i) => (
                <MenuItem key={`${item}-${i}`} value={item?.LOCID}>
                    <Checkbox checked={filter.tracks.indexOf(item?.LOCID) > -1} />
                    <Typography color={'black.main'} className="textCapitalize" fontSize={14}>
                        {item?.RACEMEET}
                    </Typography>
                </MenuItem>
            )),
        ];
    };
    return (
        <Grid container columnSpacing={1} rowSpacing={1} sx={{ alignItems: 'center', fontSize: 13 }}>
            {period && (
                <Grid item container xs={12} justifyContent="flex-end" sx={{ borderBottom: 1, borderColor: 'grey.light' }}>
                    <FormControl
                        variant="standard"
                        fullWidth
                        sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', mb: 1, fontSize: 'inherit' }}
                    >
                        {renderHelperText('OVER')}
                        <Select
                            className="pendingCommentBox"
                            fullWidth
                            IconComponent={UnfoldMoreIcon}
                            autoWidth
                            id="Period"
                            value={filter.period}
                            onChange={handleChange('period')}
                            renderValue={(value) => (
                                <Typography color={'black.main'} className="textCapitalize" fontSize={16} fontWeight={'bold'}>
                                    {period?.filter((item) => item?.VAL == value)?.[0]?.LABEL?.toLowerCase()}
                                </Typography>
                            )}
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
                                '& .MuiSelect-icon': {
                                    color: "primary.main"
                                }
                            }}
                        >
                            {period &&
                                period.map((item, i) => (
                                    <MenuItem key={`${item}-${i}`} value={item?.VAL}>
                                        <Typography color={'black.main'} className="textCapitalize" fontSize={14}>
                                            {item?.LABEL?.toLowerCase()}
                                        </Typography>
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>
            )}

            {bettype && (
                <Grid item container xs={12} sx={{ borderBottom: 1, borderColor: 'grey.light' }}>
                    <FormControl
                        variant="standard"
                        fullWidth
                        sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', mb: 1 }}
                    >
                        {renderHelperText('USING')}
                        <Select
                            className="pendingCommentBox"
                            fullWidth
                            IconComponent={UnfoldMoreIcon}
                            id="bettype"
                            value={filter.bettype}
                            onChange={handleChange('bettype')}
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
                                '&:before': {
                                    border: 0,
                                },
                                '&:after': {
                                    border: 0,
                                },
                                '& .MuiSelect-icon': {
                                    color: "primary.main"
                                }
                            }}
                            renderValue={(value) => {
                                let label = "<b>Win Tips</b> with <b>Even Stake</b>"
                                if (value == "placeEven") {
                                    label = "<b>Place Tips</b> with <b>Even Stake</b>"
                                } else if (value == "actual") {
                                    label = "<b>Actual Stake</b> on all tips"
                                }
                                return <Typography color={'black.main'} fontSize={16}>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: label,
                                        }}
                                    />
                                </Typography>
                            }}
                        >
                            <MenuItem value={`winEven`}>
                                <Typography color={'black.main'} fontSize={14}>
                                    Win Tips with Even Stake
                                </Typography>
                            </MenuItem>
                            <MenuItem value={`placeEven`}>
                                <Typography color={'black.main'} fontSize={14}>
                                    Place Tips with Even Stake
                                </Typography>
                            </MenuItem>
                            <MenuItem value={`actual`}>
                                <Typography color={'black.main'} fontSize={14}>
                                    Actual Stake on all tips
                                </Typography>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            )}
            {trackOptions && !showAlternateTracks && (
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
                            IconComponent={UnfoldMoreIcon}
                            id="tracks"
                            multiple={showAlternateTracks ? false : true}
                            value={filter.tracks?.length == 0 ? [0] : filter.tracks}
                            onChange={handleChange('tracks')}
                            renderValue={(selected) => {
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
                                '& .MuiSelect-icon': {
                                    color: "primary.main"
                                }
                            }}
                        >
                            {filter?.tracks?.length > 0 && (
                                <MenuItem value={-1} sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Typography sx={{ textTransform: 'uppercase' }} color={'grey.main'}>
                                        <u>Clear All</u>
                                    </Typography>
                                </MenuItem>
                            )}
                            <MenuItem value={0} disabled={racetrack > 0 ? false : true}>
                                <Typography color={'black.main'} className="textCapitalize" fontSize={14}>
                                    All Tracks
                                </Typography>
                            </MenuItem>
                            {trackOptions && Object.keys(trackOptions).map((group, idx) => renderTracks(group))}
                        </Select>
                    </FormControl>
                </Grid>
            )}

            {/** Alternate track will go here */}
            {showAlternateTracks && (
                <>
                    <LocSelector />
                </>
            )}

            {tipsterList?.length > 0 && (
                <Grid item container xs={12} justifyContent="flex-end">
                    <FormControl variant="standard"
                        fullWidth
                        sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', mb: 1 }}>
                        {renderHelperText('TIPSTER')}
                        <Select
                            className="pendingCommentBox"
                            fullWidth
                            IconComponent={UnfoldMoreIcon}
                            id="Tipster"
                            value={filter.tipster}
                            onChange={handleChange('tipster')}
                            renderValue={(value) => (
                                <Typography color={'black.main'} className="textCapitalize" fontSize={16} fontWeight={'bold'}>
                                    {tipsterList?.filter((item) => item.USERID == value)?.[0]?.ALIAS || 'All'}
                                </Typography>
                            )}
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
                                '& .MuiSelect-icon': {
                                    color: "primary.main"
                                }
                            }}
                        >
                            <MenuItem value={'all'}>
                                <Typography color={'black.main'} className="textCapitalize" fontSize={14}>
                                    All
                                </Typography>
                            </MenuItem>
                            {tipsterList &&
                                tipsterList.map((item, i) => (
                                    <MenuItem key={`${item}-${i}`} value={item?.USERID}>
                                        <Typography color={'black.main'} className="textCapitalize" fontSize={14}>
                                            {item?.ALIAS?.toLowerCase()}
                                        </Typography>
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>
            )}
            <Grid item xs={12}>
                <Typography component="p" align="center" fontSize={14} sx={{ width: 1, my: 1.5 }}>
                    At least <b style={{ fontSize: 16 }}> {filter?.numTips}</b> Tip{filter?.numTips > 1 && 's'}
                </Typography>
                <OddsFilter handleChange={handleSlider} value={filter?.numTips} min={1} max={100} />
            </Grid>
            <Grid item xs={12} container justifyContent={'center'}>
                <CustomSuccessButton title={'Update Stats'} handleClick={handleUpdate} rounded={false} />
            </Grid>
        </Grid>
    );
};

export default FilterContainer;
