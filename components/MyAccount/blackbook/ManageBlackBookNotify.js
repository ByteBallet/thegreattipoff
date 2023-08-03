import React, { useContext } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import { FormControl, FormGroup, FormLabel, Stack, Typography } from '@mui/material';
import CustomSwitch from '@Components/common/CustomSwitch';

const ManageBlackBookNotify = ({ handleChange }) => {
    const { user } = useContext(UserContext);
    return (
        <React.Fragment>
            <Typography fontSize={14} sx={{ mt: 1 }} component="p">
                Receive reminders for Blackbook Runners and Tipster Follows via
            </Typography>
            <Stack direction="column" alignItems={"center"} justifyContent="flex-end" sx={{ width: 1 }}>
                <FormGroup
                    row
                    sx={{
                        py: 1,
                        // px: 1,
                        justifyContent: 'flex-end',
                        width: 1
                    }}
                >
                    <FormLabel
                        component="legend"
                        sx={{
                            // ml: 1,
                            mr: 2,
                            fontSize: '14px',
                            alignSelf: 'center',
                        }}
                    >
                        Email
                    </FormLabel>
                    <FormControl>
                        <CustomSwitch
                            name="alertemail"
                            checked={user ? user.alertemail === 1 : false}
                            onChange={() => handleChange('alertemail')}
                        />
                    </FormControl>
                </FormGroup>
                {
                    process.env.APP_BRAND != "gto" &&
                    <FormGroup
                        row
                        sx={{
                            py: 1,
                            // px: 1,
                            justifyContent: 'flex-end',
                            width: 1
                        }}
                    >
                        <FormLabel
                            disabled={true}
                            component="legend"
                            sx={{
                                // ml: 1,
                                mr: 2,
                                fontSize: '14px',
                                alignSelf: 'center',
                            }}
                        >
                            App Push Notifications
                        </FormLabel>
                        <FormControl>
                            <CustomSwitch
                                disabled={true}
                                name="alertapp"
                                checked={user ? user.alertapp === 1 : false}
                                onChange={() => handleChange('alertapp')}
                            />
                        </FormControl>
                    </FormGroup>
                }

            </Stack>
        </React.Fragment >
    );
};

export default ManageBlackBookNotify;