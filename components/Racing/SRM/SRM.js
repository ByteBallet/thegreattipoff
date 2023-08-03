import React from 'react';
import { useContext, useRef, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Snackbar,
    Alert,
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Fade,
    Grid,
    useMediaQuery,
    Stack,
} from '@mui/material';
import StatComponent from '../RaceDetail/StatComponent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import RaceFieldScracthed from '../RaceDetail/RaceFieldScratched';
import OddsRowSelect from './OddsRowSelect';

function SRM(props) {
    const {
        raceField,
        raceid,
        event,
        raceResulted,
        showStat,
        stats,
        columns,
        flucs,
        hotbet,
        runners,
        speedMap,
        activeTabName,
        fieldsCount,
        isBoxed,
        toggleField,
        betsLocal,
        setBetsLocal,
        raceBetProducts,
        productGroupType,
        eventDetails,
        setsCombinations,
        raceStatus,
        handleBetSlip,
        quaddieRaces,
        racenumbers,
        quaddienum,
        setquaddieBets,
        totalRunners,
        raceSpeedMaps,
        quaddieBets,
        desktopColumns,
        sortUpdate,
    } = props;

    const isDesktop = useMediaQuery('(min-width:900px)');
    const [hideImage, setHideImage] = useState(false);

    let url = `${process.env.cdn}/images/silks/jockey-silk-${raceid}-${raceField.actualcode}.png`;
    if (event && event.racetype && event.racetype === 'G') {
        url = `${process.env.cdn}/images/greyhound/Grey-${raceField.fieldnum}.png`;
    }
    let fallbackSrc = `${process.env.cdn}/images/silkdefault.png`;

    function statsClicked() {
        showStat(raceField.actualcode);
    }

    if (raceField.scratching) {
        return (
            <RaceFieldScracthed
                raceField={raceField}
                columns={columns}
                activeTabName={activeTabName}
                isBoxed={isBoxed}
            />
        );
    }

    return (
        <Box mb={0.5}>
            <Box mx={2} sx={{ borderBottom: 1, borderColor: 'grey.border1' }}>
                <Grid container columnSpacing={1}>
                    <Grid item xs={isDesktop ? 1 : 1.5}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}
                            onClick={statsClicked}
                        >
                            <img
                                src={hideImage ? fallbackSrc : url}
                                width="23px"
                                height="26px"
                                alt="J-image"
                                onError={(e) => {
                                    setHideImage(true);
                                }}
                            />
                            <br />

                            {event &&
                                event.racetype === 'R' &&
                                eventDetails &&
                                (eventDetails.country == 'AU' ||
                                    eventDetails.country == 'NZ' ||
                                    eventDetails.country == 'HK') && (
                                    // (moment(race_date).isSameOrBefore(cutoffdate)) &&
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                    >
                                        {stats === raceField.actualcode ? (
                                            <KeyboardArrowUpIcon />
                                        ) : (
                                            <KeyboardArrowDownIcon />
                                        )}
                                    </IconButton>
                                )}
                        </Box>
                    </Grid>

                    <Grid item zeroMinWidth xs>
                        <Box
                            justifyContent="space-between"
                            alignSelf="center"
                            lineHeight={1}
                            sx={{ width: '90%' }}
                            onClick={statsClicked}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    sx={{ color: 'grey.dark' }}
                                    noWrap
                                    component="p"
                                >
                                    <span
                                        style={{
                                            fontWeight: '600',
                                            fontSize: 13,
                                        }}
                                        className="fieldText"
                                    >
                                        {raceField.fieldnum}.{' '}
                                        {raceField.fieldname}{' '}
                                        {event && event.racetype === 'R'
                                            ? `(${raceField.barrier})`
                                            : null}
                                    </span>
                                </Typography>
                                <Typography>
                                    {raceField.fav === 1 && (
                                        <Box
                                            px={1}
                                            sx={{
                                                bgcolor: 'primary.main',
                                                borderRadius: 1,
                                                border: '1px solid grey',
                                                display: 'flex',
                                            }}
                                        >
                                            <Typography
                                                fontWeight="bold"
                                                fontSize={10}
                                            >
                                                FAV
                                            </Typography>
                                        </Box>
                                    )}
                                </Typography>
                            </Box>
                            {event && (
                                <>
                                    <Box
                                        display="flex"
                                        className="HideTextOverflow"
                                        color="grey.dark"
                                    >
                                        {raceField.weight != 0 && (
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        color: 'grey.dark',
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {raceField.weight}kg
                                                </Typography>
                                            </Box>
                                        )}

                                        {raceField.lastten && (
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        color: 'grey.dark',
                                                        fontSize: 12,
                                                        mr: 0.5,
                                                        ml: 0.5,
                                                    }}
                                                >
                                                    {raceField.lastten}
                                                </Typography>
                                            </Box>
                                        )}
                                        {raceField.jockey && (
                                            <Box
                                                ml={0.5}
                                                className="HideTextOverflow"
                                            >
                                                <Typography
                                                    noWrap={true}
                                                    sx={{
                                                        color: 'grey.dark',
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {event.racetype === 'H'
                                                        ? 'D'
                                                        : event.racetype === 'G'
                                                        ? 'T'
                                                        : 'J'}
                                                    : {raceField.jockey}
                                                </Typography>
                                            </Box>
                                        )}

                                        {raceField.trainer && (
                                            <Box
                                                ml={0.5}
                                                className="HideTextOverflow"
                                            >
                                                <Typography
                                                    noWrap={true}
                                                    sx={{
                                                        color: 'grey.dark',
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    T: {raceField.trainer}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                {raceField?.sprices?.srm ? (
                    <OddsRowSelect
                        odds={raceField.sprices.srm}
                        raceid={raceid}
                        event={event}
                        fieldnum={raceField.fieldnum}
                        fieldname={raceField.fieldname}
                    />
                ) : (
                    <></>
                )}
            </Box>

            <Collapse
                in={
                    stats.filter((item) => item === raceField.actualcode)
                        ?.length > 0 &&
                    event &&
                    event.racetype === 'R'
                }
                timeout="auto"
                unmountOnExit
            >
                <StatComponent
                    raceid={raceid}
                    fieldnum={raceField.fieldnum}
                    actualcode={raceField.actualcode}
                    racetype={event?.racetype}
                />
            </Collapse>
        </Box>
    );
}

export default SRM;
