import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListSubheader, useMediaQuery } from '@mui/material';
import RacingDataRow from './RacingDataRow';
import { Table, TableContainer, TableBody } from '@mui/material';
import authAPI from '../utils/authAPI';
import { getTopOffset, groupByKey } from '../utils/util';
import moment from 'moment';
import RacingDataLayout from './Desktop/RacingDataLayout';
import BoxDivider from '@Components/Shared/BoxDivider';
import { UserContext } from '@Context/User/UserProvider';
import HotbetRacingRow from './HotbetRacingRow';

const RacingData = (props) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext);
    const [values, setValues] = useState({
        R: '',
        G: '',
        H: '',
        HB: "",
    });

    const [results, setResults] = useState([]);

    async function getRaceEventsdata(racetype, racemeet, racedate, hotbet, isResult = false) {
        let body = {
            racetype: JSON.stringify(racetype),
            startdate: racedate,
            enddate: racedate,
            country: JSON.stringify(racemeet),
            jsonresp: '1',
            nexttojump: 0,
            detailview: isDesktop ? "1" : "0",
            clientid: user.clientID ? user.clientID : "",
            hotbet: hotbet,
            promo: user.promo,
        };

        const url = isResult ? `${process.env.server}/races/getresultCard` : `${process.env.server}/races/getRaceMeetings`;

        const response = await authAPI(url, body, 'POST', false);
        if (!response.error) {
            if (response.data.ERROBJ.ERRORCODE == 0) {
                if (isResult) {
                    setResults(response.data.resultcard)
                } else {
                    setValues({
                        R: JSON.parse(response.data.R),
                        H: JSON.parse(response.data.H),
                        G: JSON.parse(response.data.G),
                        HB: (response.data.HB)
                    });
                }

            }
        }
    }
    useEffect(() => {
        getRaceEventsdata(props.racetype, props.racemeet, props.racedate, props.hotbet);
        isDesktop && getRaceEventsdata(props.racetype, props.racemeet, props.racedate, props.hotbet, true)
    }, [props]);


    let R_Meetings = values.R ? groupByKey(values.R, 'CATEGORY') : '';
    let H_Meetings = values.H ? groupByKey(values.H, 'CATEGORY') : '';
    let G_Meetings = values.G ? groupByKey(values.G, 'CATEGORY') : '';
    let data = {
        R: {
            title1: `Horse Racing - Australia ${isDesktop ? "and New Zealand" : "& NZ"}`,
            title2: 'Horse Racing - International',
            AU: R_Meetings.AU ? R_Meetings.AU : '',
            INT: R_Meetings.INT ? R_Meetings.INT : '',
        },
        G: {
            title1: `Greyhound Racing - Australia ${isDesktop ? "and New Zealand" : "& NZ"}`,
            title2: 'Greyhound Racing - International',
            AU: G_Meetings.AU ? G_Meetings.AU : '',
            INT: G_Meetings.INT ? G_Meetings.INT : '',
        },
        H: {
            title1: `Harness Racing - Australia ${isDesktop ? "and New Zealand" : "& NZ"}`,
            title2: 'Harness Racing - International',
            AU: H_Meetings.AU ? H_Meetings.AU : '',
            INT: H_Meetings.INT ? H_Meetings.INT : '',
        },
    };
    let loadDetails = isDesktop ? (results.length > 0 && Object.keys(data).length > 0) : Object.keys(data).length > 0
    return (
        <Box >
            {
                loadDetails &&
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'text.active',
                        '& ul': { padding: 0 },
                        position: 'relative',
                        paddingBottom: 0
                    }}
                    subheader={<li />}
                >
                    {Object.keys(data).map((key, idx) => (
                        <li key={`section-${key}-${idx}`}>
                            {data[key]['AU'] &&
                                <ul>
                                    <ListSubheader
                                        disableSticky={isDesktop ? true : false}
                                        disableGutters
                                        sx={{
                                            top: 120 + getTopOffset()
                                        }}>
                                        <Typography
                                            component="p"
                                            fontWeight="fontWeightBold"
                                            py={1}
                                            px={2}
                                            sx={{ backgroundColor: 'background.default' }}
                                            fontSize={14}
                                        >
                                            {data[key].title1}
                                        </Typography>
                                    </ListSubheader>
                                    {
                                        process.env.client.restrictedModules.indexOf("hotbet") == -1 && props.hotbet &&
                                        (values.HB)[key]["AU"] > 0 &&
                                        <ListItem
                                            key={`AU-Hotbet-${key}`}
                                            disablePadding
                                            sx={{
                                                height: 50,
                                            }}>
                                            <HotbetRacingRow racetype={key} data={(values.HB)[key]["AU"]} racedate={props.racedate} />
                                        </ListItem>
                                    }
                                    {
                                        isDesktop ?
                                            (results && <RacingDataLayout data={data[key]['AU']} results={results} />)
                                            : data[key]['AU'].map((race, index) => (
                                                <ListItem
                                                    key={`AU-${race.RACEID}-${index}`}
                                                    disablePadding
                                                    sx={{
                                                        height: 50,
                                                    }}>
                                                    <RacingDataRow
                                                        racedate={props.racedate}
                                                        nextjump={race}
                                                        key={`AU-${race.RACEID}-${index}`}
                                                        showborder={index != (data[key]['AU'].length - 1)}
                                                    />
                                                </ListItem>
                                            ))

                                    }
                                </ul>
                            }
                            {data[key]['INT'] &&
                                <ul>
                                    <ListSubheader
                                        disableSticky={isDesktop ? true : false}
                                        disableGutters
                                        sx={{
                                            top: 120 + getTopOffset()
                                        }}>
                                        <Typography
                                            component="p"
                                            fontWeight="fontWeightBold"
                                            py={1}
                                            px={2}
                                            sx={{ backgroundColor: 'background.default' }}
                                            fontSize={14}
                                        >
                                            {data[key].title2}
                                        </Typography>
                                    </ListSubheader>
                                    {
                                        process.env.client.restrictedModules.indexOf("hotbet") == -1 && props.hotbet &&
                                        (values.HB)[key]["INT"] > 0 &&
                                        <ListItem
                                            key={`INT-Hotbet-${key}`}
                                            disablePadding
                                            sx={{
                                                height: 50,
                                            }}>
                                            <HotbetRacingRow racetype={key} data={(values.HB)[key]["INT"]} racedate={props.racedate} />
                                        </ListItem>
                                    }
                                    {
                                        isDesktop ?
                                            (results && <RacingDataLayout data={data[key]['INT']} results={results} />) :
                                            data[key]['INT'].map((race, index) => (
                                                <ListItem
                                                    key={`INT-${race.RACEID}-${index}`}
                                                    disablePadding
                                                    sx={{
                                                        height: 50,
                                                    }}>
                                                    <RacingDataRow
                                                        racedate={props.racedate}
                                                        nextjump={race}
                                                        key={`INT-${race.RACEID}-${index}`}
                                                        showborder={index != (data[key]['INT'].length - 1)}
                                                    />
                                                </ListItem>
                                            ))
                                    }
                                </ul>
                            }
                        </li>
                    ))}
                </List>
            }
        </Box>
    );
};

export default RacingData;
