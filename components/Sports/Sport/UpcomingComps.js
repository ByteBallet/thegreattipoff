import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { Box, Typography, CircularProgress, Grid, Stack } from '@mui/material';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import CompetitionTile from '../Competitions/CompetitionTile';
import { useRouter } from 'next/router';

const UpcomingComps = ({ sport, activeTab, isTrending, sc }) => {
    const router = useRouter();
    const { user } = useContext(UserContext)
    const [sportGroups, setsportGroups] = useState([]);
    const [render, setRender] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getUpcomingSport() {
            let body = {
                sportname: sport,
                sportcode: sc,
                reclimit: 20,
                clientid: user.clientID ? user.clientID : "",
                menulist: true,
                comp: true,
                isTrending: isTrending
            };
            const url = `${process.env.server}/sports/getUpcomingSport`;

            const response = await authAPI(url, body, 'POST', false);
            if (!response.error) {
                if (response.data.ERROBJ.ERRORCODE == 0) {
                    setsportGroups(response.data.upcoming)
                }
            }
            setIsLoading(false);
        }
        setIsLoading(true);
        getUpcomingSport();
    }, [activeTab, render, router]);

    const renderHeader = (sportcode, eventdesc) => {
        return <ListSubheader
            sx={{
                top: 40,
                bgcolor: "background.default",
                py: 0.5
            }}
        >
            <Typography fontSize={13} fontWeight="bold" component="p" color="grey.dark1">
                {eventdesc}
            </Typography>
        </ListSubheader>
    }
    return (
        <Box sx={{ backgroundColor: 'text.active' }}>
            {isLoading && <p style={{ textAlign: 'center' }}><CircularProgress color="primary" /></p>}
            {
                !isLoading && sportGroups.length > 0 &&
                <List
                    sx={{
                        width: '100%',
                        '& ul': { padding: 0 },
                        backgroundColor: 'background.default'
                    }}
                    subheader={<li />}
                >
                    {
                        sportGroups.map((item, idx) =>
                            <li key={`section-${idx}`}>
                                <ul>
                                    {
                                        idx == 0 ?
                                            renderHeader(item.sportcode, item.eventdesc)
                                            :
                                            item.eventdesc != sportGroups[idx - 1].eventdesc ?
                                                renderHeader(item.sportcode, item.eventdesc)
                                                :
                                                null
                                    }
                                    <ListItem key={`item-${item.eventid}`} disablePadding sx={{ mt: idx == 0 ? 0 : item.eventdesc != sportGroups[idx - 1].eventdesc ? 0 : 2 }}>
                                        <Grid container item xs={12}>
                                            <CompetitionTile
                                                sport={item}
                                                setRender={setRender}
                                                link={`/sports/${sport}/${item.eventdesc.split(' ').join('_')}/${item.eventid}`}
                                                isSGM={item.sgm}
                                            />
                                        </Grid>
                                    </ListItem>
                                </ul>
                            </li>
                        )}
                </List>
            }
            {sportGroups && sportGroups.length == 0 && !isLoading &&
                <Typography
                    component="p"
                    py={1}
                    px={2}
                    fontSize={14}
                    align="center"
                >
                    No Data Available
                </Typography>
            }
        </Box>
    );
};

export default UpcomingComps;