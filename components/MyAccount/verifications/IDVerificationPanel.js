import { CheckOutlined, Info, ErrorOutlined, PriorityHigh } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Box, FormHelperText, Typography, FormLabel, Button } from '@mui/material';
import MessageHelperText from '../../common/MessageHelperText';
import { makeStyles } from '@mui/styles';
import Link from 'next/Link';

const useStylesID = makeStyles({
    container8: {
        width: '100%',
        padding: 0,
        margin: 0,
    },
    errorPanel: {
        backgroundColor: 'rgba(192,64,64,0.2)',
        textAlign: 'center',
        width: '100%',
        padding: '8px 0',
        margin: '0',
        fontSize: '0.75rem',
        whiteSpace: 'break-spaces',
    },
    successPanel: {
        backgroundColor: 'rgba(0,255,0,0.2)',
        textAlign: 'center',
        width: '100%',
        padding: '8px 16px',
        margin: '0',
        fontSize: '0.75rem',
        color: 'rgb(0,64,0)',
        whiteSpace: 'break-spaces',
    },
    iconTag: {
        transform: ' translateY(5px)',
        marginRight: '6px',
    },
    // buttonVerify: {

    //   margin: '12px 0',
    //   borderRadius: '0.3rem',
    //   width: '100%',
    //   textAlign: 'center',
    //   fontWeight: 'bold',
    //   padding: '8px',
    // },
    labelVerify: {
        marginTop: '32px',
        width: '100%',
        fontSize: '0.85rem',
        textAlign: 'center',
        color: '#111',
    },
    link: {
        width: '100%',
        color: '#111',
        textAlign: 'center',
        fontSize: '0.8rem',
        textDecoration: 'underline',
        marginBottom: '30px',
    },
    container: {
        textAlign: 'center',
    },
});

const messages = {
    success: 'Your identification has been verified.',
    error: 'Your account is not verified. \r\n You must complete verification in order to bet. ',
};

const IDVerificationPanel = (props) => {
    const isGTO = process.env.APP_BRAND == 'gto';

    const { isVerified, nomsg, handleVerifyAccount = () => { }, hideVerify = false } = props;

    const classes = useStylesID();
    return (
        <React.Fragment>
            {isVerified && (
                <React.Fragment>
                    <Box className={classes.container8}>
                        {isVerified.verifiedStatus ? (
                            <MessageHelperText error={false}>
                                {/* {getButtonIcons("svg", "CHECK2", 18, 'rgb(0,128,0)')} */}
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
                                <Typography fontSize={13} sx={{ color: 'success.main' }}>
                                    {messages.success}
                                </Typography>
                            </MessageHelperText>
                        ) : isVerified.verifyStatuscode == 'MANUAL_CHECK' ? (
                            <MessageHelperText error={true}>
                                <ErrorOutlined fontSize="small" color="error" className={classes.iconTag} />
                                <Typography fontSize={13} sx={{ color: 'error.main' }}>
                                    {isVerified.verifyStatusdesc}
                                </Typography>
                            </MessageHelperText>
                        ) : (
                            <MessageHelperText error={true}>
                                <ErrorOutlined fontSize="small" color="error" className={classes.iconTag} />
                                <Typography fontSize={13} sx={{ color: 'error.main' }}>
                                    {messages.error}
                                </Typography>
                            </MessageHelperText>
                        )}
                    </Box>
                    {!isVerified.verifiedStatus && (
                        <Box className={classes.container} direction="column">
                            {isVerified.verifyStatuscode != 'MANUAL_CHECK' && !hideVerify && (
                                <Button
                                    variant="contained"
                                    color="error"
                                    // className={classes.buttonVerify}
                                    size="large"
                                    fullWidth
                                    onClick={handleVerifyAccount}
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        py: 1.2,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Verify Account
                                </Button>
                            )}
                            {!nomsg && (
                                <Box
                                    alignSelf="center"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        my: 3,
                                    }}
                                >
                                    <Typography fontSize={14}>Neelp help verifying account? </Typography>
                                    <Typography fontSize={13}>
                                        <Link
                                            href="/help/contactus"
                                            sx={{
                                                width: '100%',
                                                color: '#111',
                                                textDecoration: 'underline',
                                                cursor: "pointer"
                                            }}
                                        >
                                            Contact us here for assistance.
                                        </Link>
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default IDVerificationPanel;
