import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const StreakDetails = ({ data }) => {
    return (
        <React.Fragment>
            {
                data?.STREAK ?
                    <Stack direction="row" justifyContent={"center"} alignItems="center">
                        {[...Array(data?.STREAK)].map((item, idx) =>
                            idx % 2 == 0 ? <CheckCircleIcon
                                key={item?.RACEDATE}
                                color="success"
                                sx={{
                                    fontSize: 20
                                }}
                            /> :
                                <CancelIcon
                                    key={item?.RACEDATE}
                                    sx={{
                                        fontSize: 20,
                                        color: "grey.dark"
                                    }}
                                />
                        )}
                    </Stack>
                    :
                    "--"
            }

        </React.Fragment>
    );
};

export default StreakDetails;