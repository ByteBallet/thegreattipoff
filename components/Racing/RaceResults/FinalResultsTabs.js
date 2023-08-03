import React, { useContext } from 'react';
import RaceResults from './RaceResults';
import RaceDividends from './RaceDividends'
import RaceExotics from './RaceExotics'
import RaceDeductions from './RaceDeductions'
import { useEffect, useState } from 'react';
import authAPI from '../../utils/authAPI';
import { Box, CircularProgress } from '@mui/material';
import { UserContext } from '@Context/User/UserProvider';

const FinalResultsTabs = (props) => {
    const { user } = useContext(UserContext);
    const [data, setState] = useState("");
    const { raceid, activeTab } = props
    useEffect(() => {
        async function getRaceResultssdata({ ...props }) {
            const method = props.tab == "Results" ? "getRaceResults" : props.tab == "Exotics" ? "getRaceExotics" : "getRaceResults";
            const url = `${process.env.server}/races/${method}`
            const response = await authAPI(
                url,
                { raceid: raceid, jsonresp: "1", userid: user?.userID },
                "POST",
                false
            );
            const results = !response.error ? response.data.ERROBJ.ERRORCODE == 0 ? response.data : "" : ""
            if (results != "") {
                setState(props.tab == "Results" ? response.data : props.tab == "Exotics" ? response.data.EXOTICS : response.data)
            }
        }
        getRaceResultssdata({ ...props });
    }, [activeTab]);
    return (
        <Box sx={{ backgroundColor: "text.active" }} p={1}>
            {
                data == "" &&
                <Box sx={{ display: 'flex', justifyContent: 'center', height: "300px", alignItems: "center" }}><CircularProgress color="primary" /></Box>
            }
            {data != "" &&
                <Box px={1}>
                    {props.tab == "Results" && <RaceResults data={data} />}
                    {props.tab == "Exotics" && <RaceExotics data={data} raceStatus={props.raceStatus} />}
                    {/* {props.tab == "Dividends" && <RaceDividends data={data} />}
                    {props.tab == "Dedcutions" && <RaceDeductions data={data} />} */}
                </Box>
            }
        </Box>
    );
};

export default FinalResultsTabs;