import React from 'react';
import {
    Grid,
    Box,
    Stack,
    Divider,
    Card,
    CardContent,
    Typography,
    Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/Link';
import CustomALert from '@Components/Shared/CustomALert';
import authAPI from '@Components/utils/authAPI';
import { useState } from 'react';
import CustomDialog from '@Components/Shared/CustomDialog';
import Login from '../Login';

const SendEmail = ({ details, onParentClose }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [errdesc, setErrDesc] = useState("");
    const [success, setSuccess] = useState(0);

    const handleLoginOpen = () => setOpen(true);

    const handleLoginClose = (e) => {
        setOpen(false)
        onParentClose();
    };
    const handleEmailTrigger = async (event) => {
        setLoading(true);
        const url = `${process.env.server}/user/forgotpassword`;
        const body = { ...details, confirm: 1 }
        const response = await authAPI(url, body, "POST", false);
        if (response) {
            setLoading(false);
            if (response.error) {
                setErrDesc(response.desc)
            } else {
                if (response.data.ERROBJ.ERROR > 0) {
                    setErrDesc(response.data.ERROBJ.ERRORDESC)
                } else {
                    setErrDesc("")
                    setSuccess(1)
                }
            }
        }
    }
    let succmsg = <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography color="inherit" fontSize={13}>Your login details have been sent to the email below.</Typography>
        <Typography color="inherit" fontSize={13}>{details.maskemail ? details.maskemail : ""}</Typography>
    </Stack>
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
                        Your username or password will be sent to the email below. Please ensure you check your junk/spam folder.
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
                    <Typography
                        variant="subtitle1"
                        component="p"
                        fontSize={14}
                        color="text.dialog"
                        sx={{ my: 3 }}
                    >
                        <b>Email Address:&nbsp;</b>{details.maskemail ? details.maskemail : ""}
                    </Typography>
                    {
                        success == 0 ?
                            <LoadingButton
                                loading={loading}
                                onClick={handleEmailTrigger}
                                loadingIndicator={<Typography color="inherit" sx={{ display: "flex", alignItems: "center" }}><CircularProgress color="inherit" size={14} sx={{ mr: 1 }} /> Please wait...</Typography>}
                                color="success"
                                variant="contained"
                                fullWidth
                                size="small"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    py: 0,
                                    height: 42,
                                    boxShadow: "0px 2px 0px 0px #386c01",
                                }}
                            >
                                Send Email
                            </LoadingButton> :
                            <>

                                <CustomALert content={succmsg} severity="success" warning={false} isHtml={false} />
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
                            </>
                    }
                    <Grid container>
                        {
                            errdesc != "" &&
                            <Grid item xs={12}>
                                <CustomALert content={errdesc} severity="error" warning={true} isHtml={true} />
                            </Grid>
                        }
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
                                No longer have access to this email address?
                            </Typography>
                            <Link href="/help/contactus"  >
                                <Typography
                                    color="inherit"
                                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                                    fontSize={14}
                                    onClick={() => onParentClose()}>
                                    Contact customer support here
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
                showX
                onClose={handleLoginClose}
                disablePortal={false}
            />
        </Box >
    );
};

export default SendEmail;