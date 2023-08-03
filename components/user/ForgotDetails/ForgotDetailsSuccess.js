import CustomALert from '@Components/Shared/CustomALert';
import CustomDialog from '@Components/Shared/CustomDialog';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import Link from 'next/Link';
import React, { useState } from 'react';
import Login from '../Login';

const ForgotDetailsSuccess = ({ onParentClose }) => {
    const [open, setOpen] = useState(false);
    const handleLoginOpen = () => setOpen(true);

    const handleLoginClose = (e) => {
        setOpen(false)
        onParentClose();
    };
    return (
        <Box>
            <Card sx={{ bgcolor: "background.dialogcontent" }}>
                <CardContent sx={{ py: 2, mb: 2 }}>
                    <Typography
                        variant="subtitle1"
                        component="p"
                        fontSize={14}
                        color="text.dialog"
                    >
                        Your login details have been sent to your email address.
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="p"
                        fontSize={14}
                        color="text.dialog"
                        sx={{ mt: 2 }}
                    >
                        Once you receive the email, enter your login details into the following screen.
                    </Typography>
                    <Button
                        color="success"
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{
                            mt: 3,
                            mb: 2,
                            fontSize: 18,
                            fontWeight: "bold",
                            py: 0.2,
                            height: 42,
                            boxShadow: "0px 2px 0px 0px #386c01",
                        }}
                        onClick={handleLoginOpen}
                    >
                        Enter Login Details
                    </Button>
                    <Grid container>
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                        </Grid>
                        <Grid item xs={12} className='textAlignCoulmnCenter'>
                            <Typography
                                color="inherit"
                                component="p"
                                fontSize={12}
                                align="center"
                                sx={{ mb: 1 }}>
                                Need more help?
                            </Typography>
                            <Link href={`https://${process.env.client.siteweb}/contact`}>
                                <Typography
                                    color="inherit"
                                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                                    fontSize={14}>
                                    Contact {process?.env?.client?.clientname} here
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <CustomDialog
                id={"login"}
                open={open}
                title={"Login to your account"}
                content={<Login onParentClose={handleLoginClose} />}
                fullScreen
                showX={false}
                onClose={handleLoginClose}
                disablePortal={false}
            />
        </Box >
    );
};

export default ForgotDetailsSuccess;