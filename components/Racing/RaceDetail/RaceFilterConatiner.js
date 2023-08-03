import React from 'react';
import { Box } from '@mui/material';
import MeetSelect from './MeetSelect';
import RaceNumberSlider from './RDNumSlider';
import EventDetail from './EventDetail';
import CustomTabs from '@Components/Shared/CustomTabs';
import { getTopOffset } from '@Components/utils/util';

const RaceFilterConatiner = ({
    isDesktop,
    raceLocations,
    weather,
    raceName,
    eventDetails,
    reset,
    raceStatus,
    setRaceStatus,
    racenumbers,
    setRaceFields,
    quaddienum,
    quaddieRaces,
    raceid,
    showTick,
    quaddieBets,
    racesClosed,
    setRaceResulted,
    raceResulted,
    raceTime,
    tabs,
    handler,
    active,
    Quaddie_idx,
    link,
    loadRace,
    handleOnClickHotBet,
}) => {

    return (
        <React.Fragment>
            <MeetSelect
                raceLocations={raceLocations}
                weather={eventDetails ? eventDetails.weather : ''}
                raceName={raceName}
                trackcondition={eventDetails ? eventDetails.trackcondition : ''}
                reset={reset}
                raceStatus={raceStatus}
                setRaceStatus={setRaceStatus}
            />
            <RaceNumberSlider
                reset={reset}
                racenumbers={racenumbers}
                setRaceFields={setRaceFields}
                quaddienum={quaddienum}
                isQuaddieActive={active == Quaddie_idx}
                quaddieRaces={quaddieRaces}
                raceid={raceid}
                raceStatus={raceStatus}
                showTick={showTick}
                quaddieBets={quaddieBets}
                racesClosed={racesClosed}
                isDesktop={isDesktop}
            />
            <Box
                position="sticky"
                top={(getTopOffset() + 40)}
                pt={1.2}
                backgroundColor={isDesktop ? 'white.main' : 'grey.tipBtn'}
                sx={{
                    zIndex: 5,
                }}
            >
                <EventDetail
                    setRaceResulted={setRaceResulted}
                    raceid={raceid}
                    raceResulted={raceResulted}
                    eventDetails={eventDetails}
                    raceStatus={raceStatus}
                    setRaceStatus={setRaceStatus}
                    raceTime={raceTime}
                />
            </Box>
            {process.env.client.enableBetting == 'true' &&
                raceStatus == 'open' && (
                    <Box
                        pb={1}
                        pl={2}
                        backgroundColor={
                            isDesktop ? 'white.main' : 'grey.tipBtn'
                        }
                    >
                        {!loadRace && (
                            <CustomTabs
                                tabs={tabs}
                                handler={handler}
                                active={active}
                                label="Betting Tabs"
                                showscrollbuttons={false}
                                quaddieRaces={quaddieRaces}
                                raceid={raceid}
                                Quaddie_idx={Quaddie_idx}
                                link={link}
                                handleOnClickHotBet={handleOnClickHotBet}
                            />
                        )}
                    </Box>
                )}
        </React.Fragment>
    );
};

export default RaceFilterConatiner;
