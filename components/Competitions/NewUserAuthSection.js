import React from 'react';
import { makeStyles } from '@mui/styles';
import { Stack, Button, Typography } from '@mui/material';
import Link from 'next/Link';

const useStyles = makeStyles((theme) => ({
    authSection: {
        background: 'radial-gradient(circle, rgba(147,149,158,1) 0%, rgba(0,0,0,1) 100%)',
        width: '100%',
        height: '70px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.white.main,
    },
}));

export function CButton({ onClick, text, width }) {
    return (
        <Button
            color="success"
            variant="contained"
            size="large"
            sx={{
                width: width ? width : '50%',
                height: '35px',
                boxShadow: '0px 2px 0px 0px #386c01',
                marginLeft:'7px',
                marginRight:'7px',
                borderRadius: 1.5,
                '&:disabled': {
                    boxShadow: '0px 2px 0px 0px #386c01',
                    backgroundColor: 'success.main',
                },
            }}
            onClick={onClick}
        >
            <Typography color="white.main" fontWeight="bold">
                {text}
            </Typography>
        </Button>
    );
}

const NewUserAuthSection = ({ isUserLogin, handleLoginModalToggle }) => {
    const classes = useStyles();

    return (
        <>
            <Stack className={classes.authSection}>
                {isUserLogin ? (
                    <Link href="/racing">
                        <CButton onClick={() => {}} text="Enter Tips" />
                    </Link>
                ) : (
                    <>
                        <Link href="/register">
                            <CButton onClick={() => {}} text="Join Now" width="35%"  />
                        </Link>
                        <CButton onClick={handleLoginModalToggle} text="Login" width="25%" />
                    </>
                )}
            </Stack>
        </>
    );
};

export default NewUserAuthSection;
