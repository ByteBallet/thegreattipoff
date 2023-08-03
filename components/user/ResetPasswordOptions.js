import { Box, Card, CardContent, Typography, Grid, Stack } from '@mui/material';
import { Radio, FormControlLabel, RadioGroup, FormControl, Button, Divider } from '@mui/material';
import CustomDialog from "../Shared/CustomDialog";
import PasswordValidationCode from "./PasswordValidationCode";
import * as React from 'react';
import axios from "axios";
import Link from 'next/Link';
import authAPI from '@Components/utils/authAPI';

const ResetPasswordOptions = ({ user, onParentClose, isVerify = false, frmMyAcc = false }) => {
    const [openValidationModal, setOpenValidationModal] = React.useState(false);
    const handleValidationModalOpen = (e) => {
        setOpenValidationModal(true);
    };
    const handleValidationModalClose = (e) => {
        setOpenValidationModal(false);
        onParentClose();
    };
    const [mode, setMode] = React.useState(user?.smslimit >= 2 ? "email" : user?.searchtype);

    const handleChange = (event) => {
        setMode(event.target.value);
    };
    let email = user?.maskemail;
    let mobile = user?.mobile.replace(/\d(?=\d{3})/g, "*");

    const getResetCode = async (e) => {
        e.preventDefault();
        let body = {
            userid: user.UID,
            mode: mode,
            sitesource: process.env.sitesource,
            isVerify: isVerify

        }
        let url = `${process.env.server}/resetpassword/getResetPasswordValidationCode`
        const response = await authAPI(url, body, "POST", false);
        handleValidationModalOpen();
    };
    return (
        <Box>
            {
                !openValidationModal &&
                <Card sx={{ bgcolor: "background.dialogcontent" }}>
                    <CardContent>
                        <Grid container spacing={1.5} alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="p" mb={1} color="black.main">
                                    {
                                        isVerify ?
                                            "How would you like to receive the code to verify your account?"
                                            :
                                            "How would you like to receive your username and the code to reset your password?"
                                    }
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    component="fieldset">
                                    <RadioGroup
                                        aria-label="mode"
                                        value={mode}
                                        onChange={handleChange}
                                        name="radio-buttons-group-mode"
                                    >
                                        <FormControlLabel value="email" control={<Radio color="success" />} label={`Send code via email to ${email}`} sx={{ mb: 2 }}
                                            componentsProps={{
                                                typography: {
                                                    color: "black.main"
                                                }
                                            }} />
                                        {
                                            user?.smslimit >= 2 ?
                                                <FormControlLabel value="mobile" disabled control={<Radio />} label={`Send code via SMS to ${mobile}`} sx={{ mb: 1 }}
                                                />
                                                :
                                                <FormControlLabel value="mobile" control={<Radio color="success" />} label={`Send code via SMS to ${mobile}`} sx={{ mb: 1 }}
                                                    componentsProps={{
                                                        typography: {
                                                            color: "black.main"
                                                        }
                                                    }} />

                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex" }} justifyContent="center">
                                <Button
                                    color="success"
                                    variant="contained"
                                    fullWidth
                                    size="small"
                                    sx={{
                                        mb: 2,
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        py: 0.2,
                                        height: 42,
                                        boxShadow: "0px 2px 0px 0px #386c01",
                                    }}
                                    onClick={getResetCode}
                                >Send Code now</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={{ mb: 2, mx: 2 }} />
                            </Grid>
                            <Grid item xs={12} className='textAlignCoulmnCenter'>
                                <Typography color="grey.dark" component="p" fontSize={12} align="center">No longer have access to this email or mobile?</Typography>
                                <Link href="/help/contactus">
                                    <Typography
                                        color="inherit"
                                        sx={{ textDecoration: "underline", cursor: "pointer", mb: 2 }}
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
                ((isVerify || frmMyAcc) && openValidationModal) &&
                <PasswordValidationCode
                    userData={user}
                    mode={mode}
                    onParentClose={handleValidationModalClose}
                    searchtype={user?.searchtype}
                    smslimit={user?.smslimit}
                    isVerify={isVerify}
                    frmMyAcc={frmMyAcc}
                />
            }
            {
                !isVerify && !frmMyAcc &&
                <CustomDialog
                    id={"validationcode"}
                    open={openValidationModal}
                    title={"Enter Securiy Code"}
                    content={
                        <PasswordValidationCode
                            userData={user}
                            mode={mode}
                            onParentClose={handleValidationModalClose}
                            searchtype={user?.searchtype}
                            smslimit={user?.smslimit}
                            isVerify={isVerify}
                            frmMyAcc={frmMyAcc}
                        />
                    }
                    fullScreen
                    showX
                    onClose={handleValidationModalClose}
                />
            }
        </Box>
    );
};

export default ResetPasswordOptions;