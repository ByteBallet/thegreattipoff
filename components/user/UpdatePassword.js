import { Card, CardContent, Box, Typography, TextField, IconButton, InputAdornment, Grid, Button } from '@mui/material';
import React from 'react';
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import ResetPasswordSuccess from './ResetPasswordSuccess';
import CustomDialog from '../Shared/CustomDialog';
import { makeStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from 'react';
import authAPI from '@Components/utils/authAPI';
import Login from './Login';

// Regex to validate fields
const checkSpaces = /\s/g;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const upperLower = /[a-z].*[A-Z]|[A-Z].*[a-z]/;
const isValidWord = /^[a-zA-Z\s]*$/;

const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: "14px",
        },
    },
});


const UpdatePassword = ({ onParentClose, userid }) => {
    const classes = useStyles();
    const [p, setP] = useState(false);
    const [params, setValues] = useState({
        showPassword: false,
        showCnfrmPassword: false
    });
    const [errobj, seterrobj] = useState({
        err: "",
        errdesc: ""
    });
    const [success, setSuccess] = useState(false);
    const handleSuccessOpen = () => setSuccess(true);
    const handleSuccessClose = (e) => {
        setSuccess(false)
        onParentClose();
    };
    const validate = async (values) => {
        const errors = {};
        // validation checks for password field
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password =
                "Password too short. Password must contain at least 6 characters.";
        } else if (checkSpaces.test(values.password)) {
            errors.password = "Password cannot contain spaces";
        } else if (!passwordRegex.test(values.password)) {
            errors.password =
                "Password requires at least one numeric, one capital and one lowercase.";
        }
        // validation checks for password field
        if (!values.cnfrmpassword) {
            errors.cnfrmpassword = "Password is required";
        } else if (values.cnfrmpassword.length < 6) {
            errors.cnfrmpassword =
                "Password too short. Password must contain at least 6 characters.";
        } else if (checkSpaces.test(values.cnfrmpassword)) {
            errors.cnfrmpassword = "Password cannot contain spaces";
        } else if (!passwordRegex.test(values.cnfrmpassword)) {
            errors.cnfrmpassword =
                "Password requires at least one numeric, one capital and one lowercase.";
        }

        if (values.password != values.cnfrmpassword) {
            errors.cnfrmpassword =
                "Passwords do not match.";
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            cnfrmpassword: "",
            userid: userid,
        },
        validate,
        onSubmit: async (values) => {
            let url = `${process.env.server}/resetpassword/updatePassword`
            let body = {
                userid,
                ...values
            }
            const response = await authAPI(url, body, "POST", false);
            if (response?.data?.update == 1) {
                seterrobj({
                    err: "0",
                    errdesc: "Password update successfull."
                });
                handleSuccessOpen();
            } else {
                seterrobj({
                    err: "1",
                    errdesc: "Password update failed."
                });
            }
        },
    });
    const handleClickShowPassword = () => {
        setValues({
            ...params,
            showPassword: !params.showPassword,
        });
    };
    const handleClickShowCnfrmPassword = () => {
        setValues({
            ...params,
            showCnfrmPassword: !params.showCnfrmPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Box>
            <Card
                sx={{ bgcolor: "background.dialogcontent" }}>
                <CardContent>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        mt: 2,
                                        fontSize: 14,
                                        color: "black.main"
                                    }}
                                    component="p" >
                                    New Password <span style={{ color: "purple" }}>*</span>
                                </Typography>

                                <TextField
                                    classes={{ root: classes.customTextField }}
                                    size="small"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={(e) => {
                                        setP(false);
                                        formik.handleBlur(e);
                                    }}
                                    onFocus={(e) => {
                                        setP(true);
                                    }}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    fullWidth
                                    sx={{ backgroundColor: "text.active" }}
                                    placeholder="Minimum 6 characters."
                                    type={params.showPassword ? "text" : "password"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="black" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {params.showPassword ? <VisibilityOff color="secondary.light" /> : <Visibility color="secondary.light" />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {formik.touched.password && Boolean(formik.errors.password) ? (
                                    <Box
                                        sx={{
                                            backgroundColor: "error.light",
                                            mt: 1,
                                            py: 1,
                                            px: 3,
                                        }}>
                                        <Typography sx={{ color: "error.main", fontSize: 14 }}>{formik.errors.password}</Typography>
                                    </Box>
                                ) : null}

                                {(p || formik.values.password.length > 0) && (
                                    <Box sx={{ my: 1, mx: 2 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                fontSize: 13,
                                                color: "grey",
                                            }}>
                                            <CheckCircleIcon
                                                sx={{ color: upperLower.test(formik.values.password) ? "icon.checkcircle" : "grey" }}
                                                fontSize="small" />
                                            <span style={{ paddingLeft: 5, fontStyle: "italic" }}>Includes lower and upper case letters</span>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                fontSize: 13,
                                                color: "grey",
                                            }}>
                                            <CheckCircleIcon
                                                sx={{ color: formik.values.password.length > 0 && !isValidWord.test(formik.values.password) ? "icon.checkcircle" : "grey" }}
                                                fontSize="small"
                                            />
                                            <span style={{ paddingLeft: 5, fontStyle: "italic" }}>Includes at least one number</span>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                fontSize: 13,
                                                color: "grey",
                                            }}>
                                            <CheckCircleIcon
                                                sx={{ color: formik.values.password.length > 6 ? "icon.checkcircle" : "grey" }} fontSize="small" />
                                            <span style={{ paddingLeft: 5, fontStyle: "italic" }}>Must be 6 or more characters</span>
                                        </div>
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{ mb: 1, mt: 1, fontSize: 14, color: "black.main" }}
                                    component="p"
                                >
                                    Confirm Password *
                                </Typography>

                                <TextField
                                    classes={{ root: classes.customTextField }}
                                    size="small"
                                    id="cnfrmpassword"
                                    name="cnfrmpassword"
                                    value={formik.values.cnfrmpassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.cnfrmpassword && Boolean(formik.errors.cnfrmpassword)}
                                    fullWidth
                                    sx={{ backgroundColor: "text.active" }}
                                    placeholder="Minimum 6 characters."
                                    type={params.showCnfrmPassword ? "text" : "password"}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="black" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowCnfrmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {params.showCnfrmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {formik.touched.cnfrmpassword && Boolean(formik.errors.cnfrmpassword) ? (
                                    <Box sx={{ backgroundColor: "error.light", mt: 1, py: 1, px: 3 }}>
                                        <Typography sx={{ color: "error.main", fontSize: 14 }} >
                                            {formik.errors.cnfrmpassword}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                            <Grid item xs={12}>
                                {errobj.err != "0" &&
                                    <Button
                                        disabled={(formik.values.password?.length > 0 && formik.values.cnfrmpassword.length > 0) ? false : true}
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
                                        onClick={formik.handleSubmit}
                                    >
                                        Change Password
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </form>
                    <Box>
                        {errobj.err != "" && <Box sx={{ backgroundColor: errobj.err == "1" ? "error.light" : "success.main", mt: 1, py: 1, px: 3 }}>
                            <Typography sx={{ color: errobj.err == 1 ? "error.main" : "success.contrastText" }}>
                                {errobj.errdesc}
                            </Typography>
                            {
                                errobj.err == "0" &&
                                <CustomDialog
                                    id={"login"}
                                    open={success}
                                    title={"Login to your account"}
                                    content={<Login onParentClose={handleSuccessClose} />}
                                    fullScreen
                                    showX
                                    onClose={handleSuccessClose}
                                />
                            }
                        </Box>}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UpdatePassword;