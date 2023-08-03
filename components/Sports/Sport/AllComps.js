import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import AllSportRow from '@modules/Sports/AllSportRow';
import { Table, TableContainer, TableBody, CircularProgress, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const AllComps = ({ sport, activeTab, isFutures, sc }) => {
    const router = useRouter();
    const { user } = useContext(UserContext)
    const [sportGroups, setsportGroups] = useState([]);
    const [sportcode, setsportcode] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getSportGroups() {
            let body = {
                sportcode: sc,
                sportname: sport,
                futures: isFutures,
                clientid: user.clientID ? user.clientID : "",
                allcomps: isFutures ? false : true,
                menulist: false
            };
            const url = `${process.env.server}/sports/getSportGroups`;

            const response = await authAPI(url, body, 'POST', false);
            if (!response.error) {
                if (response.data.ERROBJ.ERRORCODE == 0) {
                    setsportGroups(response.data.sportGroupSet.sportgroup)
                    setsportcode(response.data.sportGroupSet.sportcode)
                }
            }
            setIsLoading(false);
        }
        setIsLoading(true);
        getSportGroups();
    }, [activeTab, router]);

    return (
        <Box sx={{ backgroundColor: 'text.active' }}>
            <Typography
                component="p"
                fontWeight="fontWeightBold"
                py={1}
                px={2}
                sx={{ backgroundColor: 'background.default' }}
                fontSize={14}
            >
                {!isFutures ? "All Competitions" : "Futures Markets"}
            </Typography>
            {isLoading && <p style={{ textAlign: 'center' }}><CircularProgress color="primary" /></p>}
            {
                sportGroups && !isLoading && sportGroups.length > 0 &&
                (
                    <TableContainer component={Box} px={2}>
                        <Table
                            aria-label="caption table"
                            size="small"
                            className="racingTable"
                        >
                            <TableBody>
                                {
                                    sportGroups.map((item, idx) =>
                                        <AllSportRow sport={item} isComp={true} type={sport} sportcode={sportcode} key={idx} isFutures={isFutures} />
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
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
    )
};

export default AllComps;