import React from 'react';
import { useState, useEffect, useContext } from 'react';
import authAPI from '@Components/utils/authAPI';
import moment from 'moment';
import { Box, Typography, List, ListItem, ListSubheader } from '@mui/material';
import FuturesDataRow from "./FuturesDataRow"
import { UserContext } from '@Context/User/UserProvider';

const Futures = (props) => {
    const { user } = useContext(UserContext);
    const [values, setValues] = useState({
        R: '',
        G: '',
        H: '',
    });
    useEffect(() => {
        async function getFutures(racetype, racemeet) {
            let today = moment();
            let racedate = today.format('YYYY-MM-DD');
            let body = {
                racetype: JSON.stringify(racetype),
                startdate: racedate,
                enddate: "3000-01-01",
                country: JSON.stringify(racemeet),
                jsonresp: '1',
                clientid: user.clientID ? user.clientID : ""
            };
            const url = `${process.env.server}/races/getFutures`;

            const response = await authAPI(url, body, 'POST', false);
            if (!response.error) {
                if (response.data.ERROBJ.ERRORCODE == 0) {
                    setValues({
                        R: JSON.parse(response.data.R),
                        H: JSON.parse(response.data.H),
                        G: JSON.parse(response.data.G),
                    });
                }
            }
        }
        getFutures(props.racetype, props.racemeet);
    }, [props]);

    let data = {
        R: {
            title1: 'Horse Racing',
            meetings: values.R,
        },
        G: {
            title1: 'Greyhound Racing',
            meetings: values.G,
        },
        H: {
            title1: 'Harness Racing',
            meetings: values.H,
        },
    };
    return (
        <Box>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'text.active',
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
            >
            {Object.keys(data).map((key, idx) => (
                <li key={`section-${key}-${idx}`}>
                    {data[key]['meetings'].length > 0 &&
                        <ul>
                            <ListSubheader disableGutters disableSticky>
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
                            {data[key]['meetings'].map((race, index) => (
                                <ListItem
                                    key={`AU-${race.RACEID}-${index}`}
                                    disablePadding
                                    sx={{
                                        height: 50,
                                    }}>
                                    <FuturesDataRow
                                        racedate={props.racedate}
                                        nextjump={race}
                                        key={`AU-${race.RACEID}-${index}`}
                                        showborder={index != (data[key]['meetings'].length - 1)}
                                    />
                                </ListItem>
                            ))}
                        </ul>
                    }
                </li>
            ))}
            </List>
        </Box>
    );
};

export default Futures;