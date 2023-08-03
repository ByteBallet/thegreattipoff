import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Box } from '@mui/material';
import { UserContext } from '@Context/User/UserProvider';
import authAPI from '@Components/utils/authAPI';
import JockeyAccordion from './JockeyAccordion';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';

const JockeyChallenge = (props) => {
    const [expanded, setExpanded] = useState(props.track);
    const { user } = useContext(UserContext);
    const [data, setData] = useState([])

    useEffect(() => {
        async function getJockeyChallenge() {
            let body = {
                clientid: user.clientID ? user.clientID : ""
            };
            const url = `${process.env.server}/races/getjockeychallenge`;
            const response = await authAPI(url, body, 'POST', false);
            if (!response.error) {
                if (response.data.ERROBJ.ERRORCODE == 0) {
                    setData(response.data.jockeyset)
                }
            }
        }
        getJockeyChallenge();
    }, [props]);

    const [openBetSlip, setopenBetSlip] = useState(false);
    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    return (
        <Box>
            {
                data &&
                data.map((item, idx) =>
                    <Box my={1.5} key={idx}>
                        <JockeyAccordion
                            setExpanded={setExpanded}
                            expanded={expanded}
                            race={item}
                            handleBetSlip={handleBetSlip}
                            track={props.track}
                        />
                    </Box>
                )
            }
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </Box>
    );
};

export default JockeyChallenge;