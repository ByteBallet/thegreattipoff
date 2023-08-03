import React from 'react';
import { useContext, useState, useEffect, useRef, useReducer } from 'react';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import CustomTitle from '@Components/Shared/CustomTitle';
import { Box, Stack, Tabs, CircularProgress, Grid, Typography, useMediaQuery, ButtonGroup, Fade, Snackbar } from '@mui/material';
import CustomALert from '@Components/Shared/CustomALert';
import InfoAlert from '@Components/Shared/InfoAlert';
import EventDetails from './EventDetails';
import EventsListDialog from './EventsListDialog';

const initialState = {
    events: {},
    expand: false,
    active: "all",
    activeTab: 0,
    matches: [],
    parentSGM: true,
    expanded: "popular",
    status: "open",
    multiError: {
        error: false,
        desc: "",
        type: "info"
    },
    oddsObj: {
        odds: 0,
        loading: false,
    },
    errdesc: ""
};

const reducer = (state, action) => {
    const newState = {
        ...state,
        ...action.payload,
    };
    switch (action.type) {
        case 'update':
            return newState;
        case 'reset':
            return initialState;
        default:
            throw new Error();
    }
}

const EventHome = ({ sport, comp, eventid, sc }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext)
    const containerRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [y, setY] = useState();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { events, matches, expand, active, activeTab, parentSGM, expanded, status, multiError, oddsObj, errdesc } = state;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const reset = () => {
        handleOnClose();
        dispatch({
            type: 'reset'
        })
    }

    const handleOnClose = () => {
        isDesktop ? setAnchorEl(null) : dispatch({
            type: 'update',
            payload: {
                expand: false
            }
        })
    };

    useEffect(() => {
        async function getEventMatch() {
            let body = {
                eventid: eventid,
                submarketgroup: true,
                sgm: false,
                clientid: user.clientID ? user.clientID : "",
            };
            const url = `${process.env.server}/sports/GetEventMatch`;

            const response = await authAPI(url, body, 'POST', false);
            if (!response.error) {
                if (response.data.ERROBJ.ERRORCODE == 0) {
                    dispatch({
                        type: 'update',
                        payload: {
                            events: response.data.sportevent,
                            parentSGM: response.data.sportevent.sgm,
                            errdesc: ""
                        }
                    })
                } else {
                    dispatch({
                        type: 'update',
                        payload: {
                            errdesc: response.data.ERROBJ.ERRORDESC
                        }
                    })
                }
            }
            setIsLoading(false)
        }
        setIsLoading(true);
        getEventMatch();
        getRoundMatches();
        return () => {
            reset()
        }
    }, [eventid]);

    async function getRoundMatches() {
        let body = {
            sportcode: sport,
            sportgroup: comp,
            clientid: user.clientID ? user.clientID : "",
        };
        const url = `${process.env.server}/sports/GetRoundMatches`;

        const response = await authAPI(url, body, 'POST', false);
        if (!response.error) {
            if (response.data.ERROBJ.ERRORCODE == 0) {
                dispatch({
                    type: 'update',
                    payload: {
                        matches: response.data.roundMatch
                    }
                })
            }
        }
    }

    const showMoreEvents = (event) => {
        getPosition()
        if (expand) {
            isDesktop ?
                setAnchorEl(null) : dispatch({
                    type: 'update',
                    payload: {
                        expand: false
                    }
                })
        } else {
            isDesktop ?
                setAnchorEl(event.currentTarget.parentElement.parentElement) : dispatch({
                    type: 'update',
                    payload: {
                        expand: true
                    }
                })
        }
    }


    const getPosition = () => {
        if (containerRef && containerRef.current) {
            const yPos = containerRef.current.getBoundingClientRect().bottom - 40;
            y != yPos && setY(yPos)
        }
    };

    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });

    const handleAlertClick = () => {
        setalertTip({
            ...alertTip,
            open: true,
        });
    };

    const handleAlertClose = () => {
        setalertTip({
            ...alertTip,
            open: false,
        });
    };


    const handleStateUpdates = (prop, value) => {
        dispatch({
            type: 'update',
            payload: {
                [prop]: value
            }
        })
        if (prop == "multiError") {
            handleAlertClick()
        }
    };
    return (
        <React.Fragment>
            <Box sx={{ bgcolor: "text.active", mb: 10 }}>
                <CustomTitle
                    title={comp.replace(/_/g, ' ')}
                    logo={
                        <img
                            style={{
                                width: 25,
                                height: 25
                            }}
                            src={`/images/svg/icon-${sc}.svg`}
                        />}
                />
                {isLoading && <p style={{ textAlign: 'center' }}><CircularProgress color="primary" /></p>}
                {events && Object.keys(events).length == 0 && !isLoading &&
                    <Typography
                        component="p"
                        py={1}
                        px={2}
                        fontSize={14}
                        align="center"
                    >
                        {errdesc.length > 0 ? errdesc : "There are no matches currently available for betting in this tournament/event."}
                    </Typography>
                }
                {
                    !isLoading && Object.keys(events).length > 0 &&
                    <EventDetails
                        parentSGM={parentSGM}
                        expand={isDesktop ? open : expand}
                        handleStateUpdates={handleStateUpdates}
                        events={events}
                        showMoreEvents={showMoreEvents}
                        active={active}
                        dispatch={dispatch}
                        activeTab={activeTab}
                        matches={matches}
                        y={y}
                        sport={sport}
                        comp={comp}
                        expanded={expanded}
                        eventid={eventid}
                        oddsObj={oddsObj}
                        multiError={multiError}
                        status={status}
                        handleOnClose={handleOnClose}
                        containerRef={containerRef}
                    />
                }
                {
                    !isLoading && Object.keys(events).length > 0 && matches &&
                    <EventsListDialog
                        open={isDesktop ? open : expand}
                        onClose={handleOnClose}
                        matches={matches}
                        top={y + 40}
                        eventid={events.eventid}
                        sport={sport}
                        comp={comp}
                        anchorEl={anchorEl}
                    />
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={alertTip.open && multiError.error}
                    autoHideDuration={5000}
                    onClose={handleAlertClose}
                    sx={{ bottom: { xs: 60, sm: 0 } }}
                    TransitionComponent={alertTip.Transition}
                    onClick={handleAlertClose}
                    message={
                        multiError.type == "info" ?
                            <InfoAlert
                                content={multiError.desc}
                                skipMargin={true}
                            /> :
                            <CustomALert
                                severity={multiError.type == "error" ? "error" : "success"}
                                content={multiError.desc}
                                warning={true}
                                isHtml={false}
                            />
                    }
                />
            </Box>
        </React.Fragment>
    );
};

export default EventHome;