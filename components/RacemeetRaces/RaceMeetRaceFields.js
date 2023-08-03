import React from 'react';
import { Box, Typography, Stack, SvgIcon, Tooltip } from '@mui/material';
import { Table, TableContainer, TableBody } from '@mui/material';
import RaceMeetRaces from './RaceMeetRaces';
import authAPI from '../utils/authAPI';
import { getTopOffset, groupByKey } from '../utils/util';
import PartlyCloudy from '../../public/images/svg/partly-cloudy.svg';
import PossibleShowers from '../../public/images/svg/possible-showers.svg';
import Rain from '../../public/images/svg/rain.svg';
import Sunny from '../../public/images/svg/sunny.svg';
import Cloudy from '../../public/images/svg/cloudy.svg';
import Thunderstorms from '../../public/images/svg/thunderstorms.svg';
import moment from 'moment';
import Link from 'next/Link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import RaceMeetGroups from './RaceMeetGroups';
import SpecialsAccordion from '@Components/Shared/SpecialsAccordion';

const RaceMeetRaceFields = ({ races, setRender, racemeet, render }) => {
    let data = races.qRace;
    let results = races ? races.Results : [];

    let races_resulted = results.filter(
        (race) => race.racestatus.toLowerCase() == 'final'
    );
    let races_open = results.filter(
        (race) => race.racestatus.toLowerCase() != 'final'
    );

    let Jchallenge = races
        ? races.JCHALLENGE.length > 0
            ? true
            : false
        : false;
    let chkQuaddie = races && races.availexotics.quadrella;
    let index = chkQuaddie
        ? races.qRace.findIndex(
            (rItem) => rItem.RACENUM === races.availexotics.quaddie
        )
        : null;
    let quaddieRaceJump =
        index && index != -1
            ? races.qRace[index]
                ? moment
                    .utc(races.qRace[index].RACETIMEUTC)
                    .local()
                    .format('HH:mm')
                : null
            : null;
    let quaddieRaceID =
        index && index != -1
            ? races.qRace[index]
                ? races.qRace[index].RACEID
                : null
            : null;
    const pagelink = `racing/${racemeet.toLowerCase()}`;
    let weather = '';
    let weather_icon = '';
    let track_condition = '';
    let view_box = '0 0 380 380';

    if (data != '') {
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                weather = value.WEATHER;
                track_condition = value.TRACKCONDITION;
            }
        });
    }
    const WeatherIcon = React.forwardRef(function WeatherIcon(props, ref) {
        if (weather == 'Overcast') {
            weather_icon = PartlyCloudy;
            view_box = '0 0 459.75 420';
        } else if (weather == 'Cloudy') {
            weather_icon = Cloudy;
            view_box = '0 0 380 229.65';
        } else if (weather == 'Fine') {
            weather_icon = Sunny;
        } else if (weather == 'Hot') {
            weather_icon = Sunny;
        } else if (weather == 'Showery') {
            weather_icon = Rain;
            view_box = '0 0 380 336.4';
        } else if (weather == 'Raining') {
            weather_icon = Thunderstorms;
            view_box = '0 0 380 336.4';
        } else if (weather == 'Drizzling') {
            weather_icon = PossibleShowers;
            view_box = '0 0 414.75 471.92';
        }
        return (
            <div {...props} ref={ref}>
                <SvgIcon
                    color="grey.light"
                    component={weather_icon}
                    viewBox={view_box}
                    fontSize="small"
                    mt={1}
                ></SvgIcon>
            </div>
        );
    });

    const isGTO = process.env.APP_BRAND == 'gto';

    return (
        <>
            <Box>
                {data != '' && (
                    <Box
                        position="sticky"
                        top={getTopOffset() + 40}
                        backgroundColor="grey.primary"
                        sx={{
                            zIndex: 5,
                        }}
                    >
                        <Stack
                            py={0.5}
                            px={2}
                            sx={{ backgroundColor: 'grey.primary' }}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" alignItems="center">
                                <Typography
                                    align="left"
                                    fontSize={15}
                                    component="div"
                                    fontWeight="fontWeightBold"
                                    className="textCapitalize"
                                    py={1}
                                >
                                    {racemeet.toLowerCase()}
                                </Typography>
                            </Stack>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'nowrap',
                                    alignItems: 'center',
                                }}
                            >
                                {weather != '' && (
                                    <Tooltip
                                        enterTouchDelay={0}
                                        title={weather}
                                        arrow
                                        placement="left-start"
                                    >
                                        <WeatherIcon
                                            style={{ marginTop: 3 }}
                                            fontSize="small"
                                        />
                                    </Tooltip>
                                )}
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    ml={1}
                                >
                                    {track_condition}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                )}
                {races.specials &&
                    races.specials.map((special, idx) => (
                        <SpecialsAccordion
                            key={idx}
                            title={special.SPECIALTITLE}
                            content={special.SPECIALDESC}
                        />
                    ))}
                <RaceMeetGroups
                    racesResulted={races_resulted}
                    racesOpen={races_open}
                    races={data}
                    render={render}
                    setRender={setRender}
                />
                {(chkQuaddie || Jchallenge) && !isGTO && (
                    <Box sx={{ backgroundColor: 'text.active' }}>
                        <Typography
                            fontSize={14}
                            component="p"
                            fontWeight="fontWeightBold"
                            py={1}
                            px={2}
                            sx={{ backgroundColor: 'background.default' }}
                        >
                            Extras
                        </Typography>
                        <TableContainer component={Box} px={2}>
                            <Table
                                aria-label="caption table"
                                size="small"
                                className="racingTable"
                            >
                                <TableBody>
                                    {chkQuaddie && (
                                        <Link
                                            href={`/${pagelink}/${quaddieRaceID}?Quaddie=1`}
                                        >
                                            <TableRow sx={{ cursor: "pointer" }}>
                                                <TableCell
                                                    size="small"
                                                    sx={{ px: 0 }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={0.5}
                                                    >
                                                        <Typography
                                                            fontSize={14}
                                                        >
                                                            Quaddie
                                                        </Typography>
                                                        <Typography
                                                            color="grey.dark"
                                                            fontSize={12}
                                                        >
                                                            Races{' '}
                                                            {
                                                                races
                                                                    .availexotics
                                                                    .quaddie
                                                            }
                                                            ,&nbsp;
                                                            {races.availexotics
                                                                .quaddie + 1}
                                                            ,&nbsp;
                                                            {races.availexotics
                                                                .quaddie + 2}
                                                            ,&nbsp;
                                                            {races.availexotics
                                                                .quaddie + 3}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                    size="small"
                                                >
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="flex-end"
                                                    >
                                                        <Typography
                                                            fontSize={13}
                                                        >
                                                            {quaddieRaceJump}
                                                        </Typography>
                                                        <KeyboardArrowRightOutlinedIcon
                                                            fontSize="medium"
                                                            sx={{ ml: 0.3 }}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        </Link>
                                    )}
                                    {Jchallenge && (
                                        <Link
                                            href={`/racing?jockey=${races.JCHALLENGE[0].Key}`}
                                        >
                                            <TableRow sx={{ cursor: "pointer" }}>
                                                <TableCell
                                                    size="small"
                                                    sx={{ px: 0 }}
                                                >
                                                    <Typography
                                                        style={{ fontSize: 14 }}
                                                    >
                                                        Jockey Challenge
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    padding="none"
                                                    size="small"
                                                >
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="flex-end"
                                                    >
                                                        <KeyboardArrowRightOutlinedIcon
                                                            fontSize="medium"
                                                            sx={{ ml: 0.3 }}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        </Link>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default RaceMeetRaceFields;
