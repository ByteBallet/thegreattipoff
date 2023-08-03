import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import { Container, Typography, Box } from '@mui/material';
import { CheckOutlined } from '@mui/icons-material';
import MessageHelperText from '@Components/common/MessageHelperText';
import authAPI from '@Components/utils/authAPI';
import ResetPasswordOptions from '@Components/user/ResetPasswordOptions';

const VerifyUser = () => {
    const { user } = useContext(UserContext)
    const [details, setDetails] = useState();

    const getDetails = async () => {
        const url = `${process.env.server}/user/forgotpassword`;
        const body = {
            userid: user?.userID
        };
        const response = await authAPI(url, body, "POST", false);
        if (response) {
            if (response.error) {
            } else {
                if (response?.data?.ERROBJ?.ERROR == 0) {
                    setDetails(response.data.forgot)
                }
            }
        }
    }
    useEffect(() => {
        if (user?.userID && !user?.verified) {
            getDetails()
        }
    }, [])
    return (
        <React.Fragment>
            {
                user?.verified ?
                    <Container
                        sx={{ p: 0 }}>
                        <Box sx={{ width: '100%', px: 2, pb: 2 }}>
                            <MessageHelperText
                                error={false}
                            >
                                <CheckOutlined
                                    color="success"
                                    size="large"
                                    sx={{
                                        stroke: '#59ab01',
                                        strokeWidth: 2,
                                        fontSize: '100%',
                                        mr: 0.4,
                                        mt: 0.5,
                                    }}
                                />
                                <Typography fontSize={13} sx={{ color: 'success.main' }}>Your account has been verified</Typography>
                            </MessageHelperText>
                        </Box>
                    </Container>
                    :
                    <Box sx={{ p: 2 }}>
                        <Typography fontSize={16} align="center" sx={{ width: 1 }} component="p">
                            To see Tipster results, verify your account.
                        </Typography>
                        {details &&
                            <ResetPasswordOptions
                                user={details}
                                onParentClose={() => { }}
                                isVerify={true}
                                frmMyAcc={true}
                            />
                        }
                    </Box>
            }
        </React.Fragment>
    );
};

export default VerifyUser;