import React, { useState, useEffect, useContext } from 'react';
import TeamsContainer from './TeamsContainer';
import { useRouter } from "next/router";
import { Box, Modal, Typography, Grid, useMediaQuery, Popover } from '@mui/material';
import { groupByKey } from '@Components/utils/util';
import moment from 'moment';

const EventsListDialog = (props) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { open, onClose, matches, top, eventid, sport, comp, anchorEl } = props;
    let filterEvents = matches.length > 0 ? groupByKey(matches, 'suspenddate') : [];
    const router = useRouter();
    const onLink = (href, code) => {
        router.push({
            pathname: href
        });
    };
    const renderTile = (eventdate, idx) => {
        return <Grid container spacing={0} sx={{ flexGrow: 1, backgroundColor: 'black.main' }} key={idx}>
            <Grid item xs={12}>
                <Typography
                    component="p"
                    color="secondary.contrastText"
                    py={1}
                    px={2}
                    sx={{ backgroundColor: 'black.main', width: "100%" }}
                    fontSize={13}
                >
                    {
                        moment(moment().format('YYYY-MM-DD')).diff(moment(eventdate), "days") == 0 ? "Today" :
                            moment(moment().format('YYYY-MM-DD')).diff(moment(eventdate), "days") == -1 ? "Tomorrow" :
                                moment(eventdate).format("dddd")}
                </Typography>
            </Grid>
            {
                filterEvents[eventdate].map((match, i) =>
                    match.eventid != eventid &&
                    <React.Fragment key={i}>
                        <Grid
                            item
                            xs={12}
                            onClick={() => onLink("/sports/" + sport + "/" + comp + "/" + match.eventid + "/" + match.sportcode)}
                            sx={{ backgroundColor: 'secondary.button', width: "100%", cursor: "pointer" }} >
                            <TeamsContainer match={match} skipTimer={true} status="open" />
                        </Grid>
                        {i != filterEvents[eventdate].length - 1 && <Grid item xs={12} py={1}></Grid>}
                    </React.Fragment>

                )
            }
        </Grid>
    }

    const renderContent = () => {
        return <Box sx={{
            bgcolor: "secondary.button",
            color: "white.main",
            maxHeight: "100%",
            overflowY: "auto",
            width: "100%"
        }}>
            {
                Object.keys(filterEvents).map((eventdate, idx) =>
                    filterEvents[eventdate].length == 1 ?
                        filterEvents[eventdate][0].eventid != eventid ?
                            renderTile(eventdate, idx)
                            :
                            null :
                        renderTile(eventdate, idx)
                )
            }
        </Box>
    }
    const id = open ? 'simple-popover' : undefined;
    return (
        <React.Fragment>
            {
                isDesktop ?
                    <Popover
                        id={id}
                        open={open}
                        onClose={onClose}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            sx: {
                                maxHeight: 450,
                                width: 600
                            }
                        }}
                    >
                        {renderContent()}
                    </Popover>
                    :

                    <Modal
                        open={open}
                        onClose={onClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        disablePortal
                        BackdropProps={{
                            style: {
                                transform: 'translateY(' + top + "px)",
                            },
                        }}
                        sx={{
                            scrollBehavior: 'smooth',
                            overflow: 'scroll',
                            background: 'black.main',
                            mt: top + "px"
                        }}
                    >
                        {renderContent()}
                    </Modal>
            }
        </React.Fragment>
    );
};

export default EventsListDialog;
