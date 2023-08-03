import { Box, Typography, Button } from '@mui/material';
import ModalEmailUnsubscribe from './Components/ModalEmailUnsubscribe';
import ModalUnsubscribeSuccess from './Components/ModalUnsubscribeSuccess';

import authAPI from '@Components/utils/authAPI';
import { useState } from 'react';

import Login from '@Components/user/Login';
import CustomDialog from '@Components/Shared/CustomDialog';

function Unsubscribe({ alertObj }) {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    const [alertObjFinal, setAlertObjFinal] = useState(null);

    async function UnsubscribeFunc(blackBook, all) {
        let body = {
            userid: alertObj.userid,
        };
        const url = `${process.env.server}/notifications/unsubscribe`;
        if (all) {
            // make the api call with all
            body.unsubscribe = 'all';
        } else {
            body.unsubscribe = alertObj.alertid;
        }

        setLoading(true);

        if (body) {
            try {
                const response = await authAPI(url, body, 'POST', false);
                if (!response.error) {
                    if (response.data.alertobj.status === 'success') {
                        setSuccess(true);
                        setAlertObjFinal(response?.data?.alertobj);
                    }
                } else {
                    setSuccess(false);
                }
            } catch (error) {
                console.log('error---getFollows', error);
            }
        }
        setLoading(false);
    }

    if (loading) <div></div>;
    return (
        <Box
            sx={{
                backgroundColor: 'black.main',
                width: '100%',
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {success ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ModalUnsubscribeSuccess alertObj={alertObjFinal} />
                    <Box sx={{ mt: 3 }}>
                        <Typography
                            component="p"
                            sx={{ textAlign: 'center', fontWeight: 'bold' }}
                            fontSize={16}
                            color="white.main"
                        >
                            Unsubscribed by accident?
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%', mt: 3 }}
                            onClick={() => setOpenLogin(true)}
                        >
                            Manage your Settings
                        </Button>
                    </Box>
                </Box>
            ) : (
                <ModalEmailUnsubscribe
                    alertObj={alertObj}
                    UnsubscribeFunc={UnsubscribeFunc}
                />
            )}

            <CustomDialog
                id={'login'}
                open={openLogin}
                title={'Login to your account'}
                content={
                    <Login
                        onParentClose={() => setOpenLogin(false)}
                        page="/myaccount/managealerts"
                    />
                }
                fullScreen
                showX
                onClose={() => setOpenLogin(false)}
            />
        </Box>
    );
}

export default Unsubscribe;
