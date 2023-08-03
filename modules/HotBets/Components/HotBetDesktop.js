import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@Context/User/UserProvider';
import authAPI from '@Components/utils/authAPI';
import RacingHotBets from '../RacingHotBets';
import { Box, Typography } from '@mui/material';
import HotBetLearnMore from './HotBetLearnMore';

const HotBetDesktop = ({ isHotbet, setHotbet }) => {
    const router = useRouter();
    const { detail, raceid, Quaddie } = router.query;
    const { user } = useContext(UserContext);
    const [eventDetails, seteventDetails] = useState([]);

    useEffect(() => {
        const getRaceEventDetails = async () => {
            const url = `${process.env.server}/races/GetRaceEventDetail`;
            const resp = await authAPI(
                url,
                {
                    raceid: raceid,
                    isJSON: 'true',
                    clientid: user.clientID ? user.clientID : '',
                },
                'POST',
                false
            );
            if (!resp.error) {
                seteventDetails(resp.data.SELECTEDRACE)
                setHotbet(resp.data.hotbet)
            }
        }
        getRaceEventDetails()
    }, [raceid])

    return (
        <React.Fragment>
            {
                eventDetails.length > 0 && isHotbet &&
                <Box sx={{ minHeight: 1, overflowY: "auto", maxHeight: "150vh" }}>
                    <Box sx={{
                        bgcolor: "primary.main",
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5
                    }}>
                        <Typography
                            variant="h2"
                            component="p"
                            fontWeight="fontWeightBold"
                            sx={{ fontSize: 14 }}
                            px={2}
                            py={1}
                            className="textCapitalize"
                        >
                            Race {eventDetails[0].RACENUM} {eventDetails[0].RACEMEET.toLowerCase()} HOT Bets
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end", pt: 0.5 }}>
                        <HotBetLearnMore />
                    </Box>

                    <RacingHotBets
                        racingPageTopButton
                        eventId={eventDetails[0].RACEID}
                        raceDate={eventDetails[0].RACEDATE}
                        raceid={eventDetails[0].RACEID}
                        racetype={eventDetails[0].RACETYPE}
                    />
                </Box>
            }


        </React.Fragment >
    );
};

export default HotBetDesktop;