import React, { useEffect, useContext, useCallback, useState } from 'react';
import { Grid, Box, Container, Typography, Button, Link } from '@mui/material';
import Image from 'next/image';
import { CheckOutlined } from '@mui/icons-material';
import { getButtonIcons } from '../utils/icons';
import { UserContext } from '@Context/User/UserProvider';
import { getSession } from 'next-auth/client';
import updateUserSession from '@Components/utils/updateUserSession';

export default function WithdrawSuccessForm(props) {
    const { type = 1, ...rest } = props;

    return (
        <Container sx={{ px: 0, pb: 3 }}>
            <CardTypePanel type={type} />
            <Container row sx={{ px: 0 }}>
                <SuccessPanel />
                <SuccessInfoPanel {...rest} />
                <GotoPanel />
            </Container>
        </Container>
    );
}
const CardTypePanel = ({ type = 1 }) => {
    return (
        <Container sx={styles.center}>
            {type == 1 && (
                <Image
                    src="/images/tools/VISA.png"
                    width={100}
                    height={20}
                    alt="VISA"
                />
            )}
            {type == 2 && (
                <Image
                    src="/images/tools/POLi.png"
                    width={50}
                    height={20}
                    alt="POLi"
                />
            )}
            {type == 3 && (
                <Image
                    src="/images/tools/Bank.png"
                    width={20}
                    height={20}
                    alt="Bank"
                />
            )}
        </Container>
    );
};
const GotoPanel = (props) => {
    return (
        <Container direction="row" align="center" sx={{ my: 2 }}>
            <Box item>
                {/* <Button  variant="outlined" color="rgb(0,0,0)">
                    Go to Racing
                </Button> */}
                <Link href="/racing" sx={styles.gotoButton}>
                    {getButtonIcons('svg', 'HORSES', 20)}

                    <Typography sx={styles.linkText}> Go to Racing</Typography>
                </Link>
            </Box>
            <Box item>
                {/* <Button  variant="outlined" color="rgb(0,0,0)">
                    Go to Sport
                </Button> */}
                <Link href="/sports" sx={styles.gotoButton}>
                    {getButtonIcons('svg', 'SOCC', 26)}

                    <Typography sx={{ ...styles.linkText, ml: 0.5 }}>
                        {' '}
                        Go to Sports
                    </Typography>
                </Link>
            </Box>
        </Container>
    );
};
const SuccessPanel = (props) => {
    return (
        <Container
            direction="row"
            align="center"
            sx={{
                backgroundColor: 'success.light',
                color: 'success',
                width: 1,
                py: 3,
                px: 0,
            }}
        >
            <Box item>
                <CheckOutlined
                    color="success"
                    size="large"
                    sx={{
                        stroke: '#59ab01',
                        strokeWidth: 5,
                        fontSize: '200%',
                    }}
                />
            </Box>
            <Box item>
                <Typography
                    sx={{
                        color: 'success.main',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                >
                    Withdraw Successful
                </Typography>
            </Box>
        </Container>
    );
};
const SuccessInfoPanel = (props) => {
    const { transid = 0, withdrawamt = 0 } = props;
    const { user, addUser } = useContext(UserContext);

    const updateData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user)
    };

    updateUserSession(false).then(() => {
        updateData();
    })
    return (
        <Container direction="row" align="center" sx={{ pt: 2 }}>
            {withdrawamt && (
                <Box item sx={{ my: 0, py: 0, lineHeight: 0 }}>
                    <Typography
                        sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {getCurrencyString(parseFloat(withdrawamt))}
                    </Typography>
                </Box>
            )}
            <Box item sx={{ my: 0, py: 0, lineHeight: 0.3 }}>
                <Typography sx={{ fontSize: 12, color: '#707070' }}>
                    has been withdrawn from your account
                </Typography>
            </Box>
            {transid && (
                <Box item sx={{ my: 2 }}>
                    <Typography sx={{ fontSize: 16, }}>
                        Transaction number: {transid}
                    </Typography>
                </Box>
            )}
        </Container>
    );
};
const getCurrencyString = (balance) => {
    return (balance ? balance : '0').toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};
const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        pt: 2,
        pb: 2,
        px: 0,
    },
    gotoButton: {
        // width:1/2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgb(0,0,0)',
        border: 1,
        borderColor: 'black',
        borderRadius: 1,
        my: 2,
        height: 40,
        mx: 6,
        // py: 1,
        backgroundColor: 'grey.tipBtn',
        textDecoration: 'none',
        cursor: "pointer"
    },
    linkText: {
        ml: 1,
        fontSize: 14,
        fontWeight: 'bold',
    },
};
