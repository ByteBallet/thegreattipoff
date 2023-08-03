import React from 'react';
import { Container, Box, Grid, Typography, IconButton } from '@mui/material';
import { CopyAllOutlined } from '@mui/icons-material';
import copy from 'copy-to-clipboard';
import { CustomSvgIcon } from '@Components/utils/icons';

export default function BankInfoPanel(props) {
    const {
        bankname,
        accountname,
        bsb,
        accountnumber,
        alias,
        setSnackMessage,
    } = props;
    return (
        <Container direction="row" sx={styles.descriptions}>
            <Box item>
                <ReadableListItem
                    key={1}
                    label="Bank Name"
                    value={bankname}
                    showSnackBar={() =>
                        setSnackMessage({
                            open: true,
                            vertical: 'bottom',
                            horizontal: 'center',
                            message: 'Bank Name copied!',
                        })
                    }
                />
                <ReadableListItem
                    key={2}
                    label="Account Name"
                    value={accountname}
                    showSnackBar={() =>
                        setSnackMessage({
                            open: true,
                            vertical: 'bottom',
                            horizontal: 'center',
                            message: 'Account Name copied!',
                        })
                    }
                />
                <ReadableListItem
                    key={3}
                    label="BSB "
                    value={bsb}
                    showSnackBar={() =>
                        setSnackMessage({
                            open: true,
                            vertical: 'bottom',
                            horizontal: 'center',
                            message: 'BSB copied!',
                        })
                    }
                />
                <ReadableListItem
                    key={4}
                    label="Account Number"
                    value={accountnumber}
                    showSnackBar={() =>
                        setSnackMessage({
                            open: true,
                            vertical: 'bottom',
                            horizontal: 'center',
                            message: 'Account Number copied!',
                        })
                    }
                />
                <ReadableListItem
                    key={5}
                    label="Reference Code"
                    value={alias}
                    showSnackBar={() =>
                        setSnackMessage({
                            open: true,
                            vertical: 'bottom',
                            horizontal: 'center',
                            message: 'Reference Code copied!',
                        })
                    }
                />
            </Box>
        </Container>
    );
}

const ReadableListItem = (props) => {
    const {
        label = 'Bank Name',
        value = 'National Australia Bank',
        showSnackBar = () => {},
    } = props;
    return (
        <Grid
            container
            sx={{
                py: 1,
            }}
        >
            <Container
                display=""
                sx={{
                    px: 0,

                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <Typography
                    sx={{
                        ...styles.text2,
                        width: 'max-content',
                        color: 'grey.main',
                    }}
                >
                    {label}
                </Typography>
                <IconButton
                    sx={{ p: 0 }}
                    onClick={() => {
                        copy(value);
                        showSnackBar();
                    }}
                >
                    {/* <CopyAllOutlined /> */}
                    <CustomSvgIcon name="COPY" size="28"/>
                </IconButton>
            </Container>
            <Container
                display=""
                sx={{
                    px: 0,

                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <Typography
                    sx={{
                        ...styles.text2,
                        fontWeight: 'bold',
                        minWidth: 'max-content',
                    }}
                >
                    {value}
                </Typography>
                <Box
                    item
                    sx={{
                        width: 1,
                        mx: 1,
                        mb: 1,
                        borderTopWidth: 2,
                        borderColor: 'grey.light',
                        
                        borderTopStyle: 'dotted',
                    }}
                />
                <Typography sx={styles.text2}>Copy</Typography>
            </Container>
        </Grid>
    );
};
const styles = {
    linear: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottom: 1,
        borderColor: 'grey.light',
        pt: 3,
        pb: 1,
        px: 0,
        cursor: 'pointer',
    },

    title: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 12,
    },
    text: {
        fontSize: 14,
        lineHeight: 0,
    },
    descriptions: {
        // borderBottom: 1,
        // borderColor: 'grey.light',
        px: 0,
        pb: 3,
        pt: 3,
    },
    message: {
        bottom: {
            xs: 90,
            sm: 50,
        },
    },
};
