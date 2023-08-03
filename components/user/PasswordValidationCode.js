import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, Divider } from '@mui/material';
import { FormControl, Button } from '@mui/material';
import UpdatePassword from './UpdatePassword';
import CustomDialog from "../Shared/CustomDialog";
import ResetPasswordOptions from './ResetPasswordOptions';
import { Link } from '@mui/material';
import { makeStyles } from "@mui/styles";
import authAPI from '@Components/utils/authAPI';
import updateUserSession from '@Components/utils/updateUserSession';
import { getSession } from 'next-auth/client';
import { UserContext } from '@Context/User/UserProvider';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: "14px",
        },
    },
});

const PasswordValidationCode = ({ userData, mode, onParentClose, searchtype, smslimit, isVerify = false, frmMyAcc = false }) => {
    const { user, addUser } = useContext(UserContext)
    const router = useRouter()
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [errdesc, seterrdesc] = useState("");
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openOptionsModal, setOpenOptionsModal] = useState(false);
    const handleOptionsModalOpen = (e) => {
        setOpenOptionsModal(true);
    };
    const handleOptionsModalClose = (e) => {
        setOpenOptionsModal(false);
        onParentClose();
    };
    const handleUpdateModalOpen = (e) => {
        setOpenUpdateModal(true);
    };
    const handleUpdateModalClose = (e) => {
        setOpenUpdateModal(false);
        onParentClose();
    };
    const handleChange = (e) => { setValue(e.target.value); seterrdesc(""); };
    const validateResetCode = async (e) => {
        e.preventDefault();
        if (value.length > 0) {
            e.preventDefault();
            let body = {
                userid: userData.UID,
                code: value,
                sitesource: process.env.sitesource
            }

            let url = `${process.env.server}/resetpassword/validateResetPasswordCode`
            const response = await authAPI(url, body, "POST", false);
            const { data } = response
            if (data?.ERROBJ?.ERROR > 0) {
                seterrdesc(data?.ERROBJ?.ERRORDESC);
            } else {
                if (!isVerify) {
                    let qparams = {
                        id: data?.link,
                        activatetype: 'forgot'
                    }
                    let url = `${process.env.server}/resetpassword/activate`
                    const resp = await authAPI(url, qparams, "POST", false);
                    if (resp?.data?.ERROBJ?.ERROR > 0) {
                        seterrdesc(resp?.data?.ERROBJ?.ERRORDESC);
                    } else {
                        handleUpdateModalOpen();
                    }
                } else {
                    updateUserSession(false).then(() => {
                        updateData();
                    });
                }
            }
        } else {
            seterrdesc("Please enter code");
        }
    };

    const updateData = async () => {
        const userSession = await getSession();
        if (userSession && userSession.user) {
            addUser(userSession.user);
        }
    };

    return (
        <Box>
            {
                !openOptionsModal && !openUpdateModal &&
                <Card sx={{ bgcolor: "background.dialogcontent" }} >
                    <CardContent>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="p" mb={1} color="black.main">
                                    Please check your {mode == "mobile" ? "SMS" : "email (including your junk spam folder)"} for your 6 digit security code
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" sx={{ mt: 2 }} fullWidth>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        sx={{ backgroundColor: "text.active" }}
                                        classes={{ root: classes.customTextField }}
                                        size="small"
                                        id="input-code-textfield"
                                        hiddenLabel
                                        placeholder="Enter 6 digit security code"
                                        value={value}
                                        onChange={handleChange}
                                        variant="outlined"
                                        inputProps={{
                                            maxLength: 6,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                {errdesc != "" && <Box sx={{ backgroundColor: "error.light", mt: 1, py: 1, px: 3 }}>
                                    <Typography sx={{ color: "error.main" }}>
                                        <div dangerouslySetInnerHTML={{ __html: errdesc }} />
                                    </Typography>
                                </Box>}
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    disabled={value.length > 0 ? false : true}
                                    color="success"
                                    variant="contained"
                                    fullWidth
                                    size="small"
                                    sx={{
                                        mt: 2,
                                        mb: 2,
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        py: 0.2,
                                        height: 42,
                                        boxShadow: "0px 2px 0px 0px #386c01",
                                    }}
                                    onClick={validateResetCode}>
                                    Submit Code
                                </Button>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                                <Typography color="text.greytext" component="p" fontSize={12} align="center">
                                    Didn&apos;t get a code?
                                </Typography>
                                <Button variant="text" size="small"
                                    onClick={handleOptionsModalOpen}>
                                    <Typography color="text.greytext" component="p" fontSize={12} align="center"
                                        sx={{ textDecoration: "underline" }}
                                    >
                                        Click here to try alternate recovery option
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={{ my: 2, mx: 2 }} />
                            </Grid>
                            <Grid item xs={12} className='textAlignCoulmnCenter'>
                                <Typography color="grey.dark" component="p" fontSize={12} align="center">No more help?</Typography>
                                <Link href="/help/contactus">
                                    <Typography
                                        color="grey.dark"
                                        sx={{ textDecoration: "underline", cursor: "pointer", my: 2 }}
                                        fontSize={14}
                                        onClick={() => onParentClose()}>
                                        Contact customer support here
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            }
            {
                frmMyAcc && openUpdateModal &&
                <UpdatePassword userid={userData?.UID} onParentClose={() => { }} frmMyAcc={frmMyAcc} />
            }
            {
                !frmMyAcc &&
                <CustomDialog
                    id={"updatepassword"}
                    open={openUpdateModal}
                    title={"Reset your Password"}
                    content={<UpdatePassword userid={userData?.UID} onParentClose={handleUpdateModalClose} frmMyAcc={frmMyAcc} />}
                    fullScreen
                    showX
                    onClose={handleUpdateModalClose}
                />
            }
            {
                frmMyAcc && openOptionsModal &&
                <ResetPasswordOptions
                    user={userData}
                    onParentClose={() => { }}
                    frmMyAcc={frmMyAcc}
                />
            }
            {
                !frmMyAcc &&
                <CustomDialog
                    id={"forgotpassword"}
                    open={openOptionsModal}
                    title={"Forgot your login?"}
                    content={
                        <ResetPasswordOptions
                            user={userData}
                            onParentClose={handleOptionsModalClose}
                            frmMyAcc={frmMyAcc}
                        />
                    }
                    fullScreen
                    showX
                    onClose={handleOptionsModalClose}
                />
            }
        </Box >
    );
};

export default PasswordValidationCode;