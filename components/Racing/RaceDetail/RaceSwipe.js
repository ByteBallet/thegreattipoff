import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/router';
import RaceDetail from './RaceDetail';
import FinalResults from '../RaceResults/FinalResults';
import { Box, Stack, Button } from '@mui/material';

const RaceSwipe = (props) => {
    const router = useRouter();
    // swipe handlers
    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => swipeLeft(eventData),
        onSwipedRight: (eventData) => swipeRight(eventData),
        delta: 20,
    });

    const resultHandlers = useSwipeable({
        onSwipedLeft: (eventData) => swipeLeft(eventData),
        onSwipedRight: (eventData) => swipeRight(eventData),
        delta: 20,
    });

    function swipeLeft(e) {
        let nextRace = props.raceNumbers.findIndex((obj) => {
            return obj.raceid == props.raceid;
        });

        if (nextRace < props.raceNumbers.length - 1) {
            let raceToGo = props.raceNumbers[nextRace + 1];
            const raceType = raceToGo.racetype === 'R' ? 'racing' : raceToGo.racetype === 'G' ? 'greyhound' : 'harness';
            const raceLoc = raceToGo.racemeet;

            const url = `/${raceType}/${raceLoc}/${raceToGo.raceid}`;

            router.push(
                {
                    pathname: url,
                },
                undefined,
                { shallow: true }
            );
            //router.push(url);
        } else {
            console.log('LOG: No More races in current meeting');
        }
    }

    function swipeRight(e) {
        let nextRace = props.raceNumbers.findIndex((obj) => {
            return obj.raceid == props.raceid;
        });

        if (nextRace > 0) {
            let raceToGo = props.raceNumbers[nextRace - 1];
            const raceType = raceToGo.racetype === 'R' ? 'racing' : raceToGo.racetype === 'G' ? 'greyhound' : 'harness';
            const raceLoc = raceToGo.racemeet;

            const url = `/${raceType}/${raceLoc}/${raceToGo.raceid}`;

            router.push(
                {
                    pathname: url,
                },
                undefined,
                { shallow: true }
            );
            //router.push(url);
        } else {
            console.log('LOG: No More races in current meeting');
        }
    }
    return (
        <React.Fragment>
            {(props.raceResulted || props.raceStatus == 'final' || props.raceStatus == 'interim') && (
                <Box>
                    <div>
                        <FinalResults raceid={props.raceid} raceStatus={props.raceStatus} resultHandlers={resultHandlers} />
                    </div>

                    <Stack
                        direction="row"
                        spacing={1}
                        px={2}
                        justifyContent={props?.column_labels?.indexOf('Fixed') == -1 ? 'flex-end' : 'space-between'}
                        alignItems="center"
                        pt={1}
                    >
                        {props?.column_labels?.indexOf('Fixed') > -1 && (
                            <Stack direction="row" spacing={0.7}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={props.flucs ? props.tabStyles.activebutton : props.tabStyles.button}
                                    onClick={props.handleChange('flucs')}
                                >
                                    Flucs
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </Box>
            )}

            <div {...handlers}>
                {props.raceFields && props.raceFields.length > 0 && props.raceNumbers && props.raceNumbers.length > 0 ? (
                    <RaceDetail {...props} />
                ) : null}
            </div>
        </React.Fragment>
    );
};

export default RaceSwipe;
