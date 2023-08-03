import React, { useState } from "react";
import Link from "next/Link";
import { useFormik } from "formik";
import { Grid, Box, Typography, TextField, InputAdornment, Select, MenuItem, Button, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeStyles } from "@mui/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import { STATE } from "../utils/register.util";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import authAPI from "../utils/authAPI";
import { Card, CardContent } from "@mui/material";

const isInteger = /^\d+$/;
const mobileRegOT = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
const mobileReg = /^(04|05)[0-9]{8}$/;
const validWord = /^[a-zA-Z\s]*$/;
const checkPunctuation = /^[a-zA-Z0-9\s]*$/;
const checkSpaces = /\s/g;
const fontLabel = 16;

const FollowTipster = (props) => {
    const useStyles = makeStyles({
        customTextField: {
            "& input::placeholder": {
                fontSize: "14px",
            },
        },
    });

    const classes = useStyles();
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [formSubmit, setFormSubmit] = useState(false);
    const [errobj, seterrobj] = React.useState({
        err: "",
        errdesc: "Please check your details."
    });
    const validate = async (values) => {
        const errors = {};
        // validation checks for password field
        if (!values.firstname) {
            errors.firstname = "Please enter your First name";
        } else if (values.firstname.length < 3) {
            errors.firstname = "Please enter your First name. At least 3 characters";
        } else if (!validWord.test(values.firstname)) {
            errors.firstname = "First name invalid. No punctuation or numeric characters.";
        } else if (!checkPunctuation.test(values.firstname)) {
            errors.firstname = "First name invalid. No punctuation characters.";
        } else if (checkSpaces.test(values.firstname)) {
            errors.firstname = "First name cannot contain spaces";
        }
        if (!values.mobile) {
            errors.mobile = "Mobile number is required";
        } else if (values.country === "Australia" && (values.mobile.length < 10 || values.mobile.length > 20)) {
            errors.mobile = "Please enter a valid mobile";
        } else if (!isInteger.test(values.mobile)) {
            errors.mobile = "Please enter a valid mobile";
        } else if (values.state === 9 && !mobileRegOT.test(values.mobile)) {
            errors.mobile = "Please enter a valid mobile";
        } else if (values.state !== 9 && !mobileReg.test(values.mobile)) {
            errors.mobile = "Please enter a valid mobile";
        }
        if (!values.acceptTerms) {
            errors.acceptTerms = "Please acknowledge terms and conditions.";
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            firstname: "",
            mobile: "",
            state: 0,
            acceptTerms: false
        },

        validate,

        onSubmit: async (values) => {
            const url = `${process.env.server}/info/activateFollow`;
            setLoadingRegister(true);
            const stateCode = STATE[values.state - 1];

            const data = {
                myname: values.firstname,
                mobilenum: values.mobile,
                stateset: stateCode,
                reportterms: values.acceptTerms,
                followid: props.tipsterid
            };
            const response = await authAPI(url, data, "POST", false);
            const error = !response.error ? response.data.ERROBJ.ERRORCODE == 0 ? response.data.SUCCESSCHECK == 1 ? "0" : "1" : "1" : "1"
            seterrobj({
                err: error,
                errdesc: error == "0" ? response.data.LINKTRIG : response.data.ERRORMESSAGE
            });
            setLoadingRegister(false);
        },
    });
    return (
        <Box>
            <Card sx={{ bgcolor: "background.default" }} component="form" onSubmit={(e) => {
                setFormSubmit(true);
                formik.handleSubmit(e);
            }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    mb: 1,
                                    mt: 2,
                                    fontWeight: "bold",
                                    fontSize: fontLabel,
                                }}
                                component="p"
                            >
                                First Name <span style={{ color: "purple" }}>*</span>
                            </Typography>

                            <TextField
                                classes={{ root: classes.customTextField }}
                                size="small"
                                id="firstname"
                                name="firstname"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                fullWidth
                                sx={{ backgroundColor: "text.active" }}
                                placeholder="Enter your First name"
                            />
                            {formik.touched.firstname && Boolean(formik.errors.firstname) ? (
                                <Box
                                    sx={{
                                        backgroundColor: "error.light",
                                        mt: 1,
                                        py: 1,
                                        px: 3,
                                    }}
                                >
                                    <Typography sx={{ color: "error.main", fontSize: 14 }}>{formik.errors.firstname}</Typography>
                                </Box>
                            ) : null}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    mb: 1,
                                    mt: 3,
                                    fontWeight: "bold",
                                    fontSize: fontLabel,
                                }}
                                component="p"
                            >
                                Mobile <span style={{ color: "purple" }}>*</span>
                            </Typography>

                            <TextField
                                classes={{ root: classes.customTextField }}
                                size="small"
                                value={formik.values.mobile}
                                id="mobile"
                                name="mobile"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                fullWidth
                                sx={{ backgroundColor: "text.active" }}
                                placeholder="Enter your mobile number"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon color="black" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {formik.touched.mobile && Boolean(formik.errors.mobile) ? (
                                <Box
                                    sx={{
                                        backgroundColor: "error.light",
                                        mt: 1,
                                        py: 1,
                                        px: 3,
                                    }}
                                >
                                    <Typography sx={{ color: "error.main", fontSize: 14 }}>{formik.errors.mobile}</Typography>
                                </Box>
                            ) : null}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    mb: 1,
                                    mt: 3,
                                    fontWeight: "bold",
                                    fontSize: fontLabel,
                                }}
                                component="p"
                            >
                                State <span style={{ color: "purple" }}>*</span>
                            </Typography>

                            <Select
                                value={formik.values.state}
                                size="small"
                                id="state"
                                name="state"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                sx={{ backgroundColor: "text.active" }}
                                fullWidth
                                MenuProps={{
                                    transitionDuration: 0
                                }}
                            >
                                <MenuItem value={0}>Select</MenuItem>
                                {STATE.map((item, idx) => (
                                    <MenuItem key={`${item}-${idx}`} value={idx + 1}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.state && Boolean(formik.errors.state) ? (
                                <Box
                                    sx={{
                                        backgroundColor: "error.light",
                                        mt: 1,
                                        py: 1,
                                        px: 3,
                                    }}
                                >
                                    <Typography sx={{ color: "error.main", fontSize: 14 }}>{formik.errors.state}</Typography>
                                </Box>
                            ) : null}
                        </Grid>

                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    mb: 1,
                                    mt: 3,
                                    fontWeight: "bold",
                                    fontSize: fontLabel,
                                }}
                                component="p"
                            >
                                Terms and conditions <span style={{ color: "purple" }}>*</span>
                            </Typography>

                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formik.values.acceptTerms}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                formik.setFieldValue("acceptTerms", event.target.checked);
                                            }}
                                            onBlur={formik.handleBlur}
                                            checkedIcon={<CheckBoxOutlinedIcon fontSize="large" />}
                                            icon={<CheckBoxOutlineBlankRoundedIcon fontSize="large" color="primary" />}
                                            color="primary"
                                            name="acceptTerms"
                                        />
                                    }
                                    label="Tick to acknowledge site terms including 18+"
                                    labelPlacement="end"
                                />
                            </FormControl>
                            {formik.touched.acceptTerms && Boolean(formik.errors.acceptTerms) ? (
                                <Box
                                    sx={{
                                        backgroundColor: "error.light",
                                        mt: 1,
                                        py: 1,
                                        px: 3,
                                    }}
                                >
                                    <Typography sx={{ color: "error.main", fontSize: 14 }}>{formik.errors.acceptTerms}</Typography>
                                </Box>
                            ) : null}
                        </Grid>

                    </Grid>
                    {errobj.err != "" && <Box sx={{ backgroundColor: errobj.err == "1" ? "error.light" : "success.main", mt: 1, py: 1, px: 3 }}>
                        <Typography sx={{ color: errobj.err == 1 ? "error.main" : "success.contrastText" }}>
                            <div dangerouslySetInnerHTML={{ __html: `<p>${errobj.errdesc}</p>` }} />
                        </Typography>
                    </Box>}
                    {Object.keys(formik.errors).length > 0 && formSubmit ? (
                        <Box
                            sx={{
                                backgroundColor: "error.light",
                                mt: 1,
                                mb: 3,
                                py: 1,
                                px: 3,
                            }}
                        >
                            <Typography sx={{ color: "error.main", fontSize: 14 }}>
                                Please fill all mandatory fields.
                            </Typography>
                        </Box>
                    ) : null}
                    {errobj.err != "0" &&
                        <>
                            <LoadingButton
                                fullWidth
                                disableElevation
                                loading={loadingRegister}
                                variant="contained"
                                sx={{
                                    mt: Object.keys(formik.errors).length > 0 && formSubmit ? 0 : 5,
                                    mb: 3,
                                    fontSize: 20,
                                    fontWeight: "bold",
                                }}
                                type="submit"
                            >
                                Submit
                            </LoadingButton>
                            <Button
                                variant="text"
                                size="large"
                                fullWidth
                                sx={{ mb: 2 }}
                                onClick={props.onParentClose}
                            >
                                <u>No Thanks</u>
                            </Button>
                        </>
                    }
                </CardContent>
            </Card>
        </Box>
    );
};

export default FollowTipster;