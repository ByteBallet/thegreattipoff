import CustomALert from '@Components/Shared/CustomALert';
import { Box, Card, CardContent, Grid, TextField, Typography, Select, MenuItem, CircularProgress, Divider } from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/Link';
import authAPI from '@Components/utils/authAPI';
import ForgotDetailsSuccess from './ForgotDetailsSuccess';
import CustomDialog from '@Components/Shared/CustomDialog';

// returns the current year
const CURRENT_YEAR = moment().year() - 18;

// generate an array of years, starting from current year - 18 to last 100 years
export const YEARS = [...Array(100).keys()];
for (let i = 0; i < YEARS.length; i++) {
    YEARS[i] = CURRENT_YEAR - i;
}

const fontLabel = 14;
const styles = {
    textFieldStyle: {
        backgroundColor: 'grey.joinField',
        borderRadius: 2,

        '& input::placeholder': {
            fontSize: '14px',
        },
        [`& fieldset`]: {
            borderColor: 'grey.joinBorder',

            borderRadius: 2,
            '&.focused': {
                borderColor: 'red',
            },
        },

        fontSize: 14,
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                backgroundColor: 'white.main',
            },
            // '&.Mui-focused fieldset': {
            //     borderColor: 'green',
            // },
        },
    },

    mainContainer: {
        backgroundColor: 'white.main',
        p: 2,
        borderRadius: 2,
        mt: 2,
    },
};

const RecoverBBAccount = ({ onParentClose }) => {
    const MONTHS = moment.monthsShort();
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [errdesc, setErrDesc] = useState("");
    const [err, setError] = useState(1);
    const [details, setDetails] = useState({});


    const [openSuccessModal, setSuccessModal] = useState(false);
    const handleSuccessModalOpen = (e) => {
        setSuccessModal(true);
    };

    const handleSuccessModalClose = (e) => {
        setSuccessModal(false);
        onParentClose();
    };

    const formik = useFormik({
        initialValues: {
            dateDOB: 0,
            monthDOB: 0,
            yearDOB: 0,
            mobile: '',
            lastname: '',
            username: '',
            firstname: '',

        },
        validate: (values) => {
            const errors = {};
            if (!values.mobile) {
                errors.mobile = 'Required';
            }
            if (!values.lastname) {
                errors.lastname = 'Required';
            }
            if (!values.username) {
                errors.username = 'Required';
            }
            if (!values.firstname) {
                errors.firstname = 'Required';
            }
            // validation for date in DOB
            if (!values.dateDOB || values.dateDOB === 0) {
                errors.dateDOB = 'Required';
            }

            // validation for month in DOB
            if (!values.monthDOB || values.monthDOB === 0) {
                errors.monthDOB = 'Required';
            }

            // validation for year in DOB
            if (!values.yearDOB || values.yearDOB === 0) {
                errors.yearDOB = 'Required';
            }
            Object.keys(errors).length > 0 ? setError(1) : setError(0)
            return errors
        },
        onSubmit: async (values) => {
            setLoadingRegister(true);
            const url = `${process.env.server}/user/forgotpassword`;
            let dob = YEARS[formik.values.yearDOB - 1] + "-" + values.monthDOB + "-" + values.dateDOB
            const body = {
                surname: values.lastname,
                username: values.username,
                firstname: values.firstname,
                mobile: values.mobile?.replace("+61", "0"),
                dob: dob,
                email: '',
                confirm: 1
            };
            const response = await authAPI(url, body, "POST", false);
            if (response) {
                setLoadingRegister(false);
                if (response.error) {
                    setErrDesc(response.desc)
                } else {
                    if (response.data.ERROBJ.ERROR > 0) {
                        setErrDesc(response.data.ERROBJ.ERRORDESC)
                    } else {
                        setDetails(response.data.forgot)
                        handleSuccessModalOpen()
                    }
                }
            }
        },
    });

    return (
        <Box>
            <Card sx={{ bgcolor: "background.dialogcontent" }}>
                <CardContent sx={{ py: 2, mb: 2 }}>
                    <form>
                        <Box>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            mb: 0.5,
                                            mt: 2,

                                            fontSize: fontLabel,
                                        }}
                                        component="p"
                                    >
                                        Username
                                    </Typography>

                                    <TextField
                                        sx={styles.textFieldStyle}
                                        size="small"
                                        id="username"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={(e) => {
                                            formik.handleBlur(e);
                                        }}
                                        fullWidth
                                        placeholder="Enter your username..."

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            mb: 0.5,
                                            mt: 2,

                                            fontSize: fontLabel,
                                        }}
                                        component="p"
                                    >
                                        First name
                                    </Typography>

                                    <TextField
                                        sx={styles.textFieldStyle}
                                        size="small"
                                        id="firstname"
                                        name="firstname"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange}
                                        onBlur={(e) => {
                                            formik.handleBlur(e);
                                        }}
                                        fullWidth
                                        placeholder="Enter your first name..."

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            mb: 0.5,
                                            mt: 2,

                                            fontSize: fontLabel,
                                        }}
                                        component="p"
                                    >
                                        Last name
                                    </Typography>

                                    <TextField
                                        sx={styles.textFieldStyle}
                                        size="small"
                                        id="lastname"
                                        name="lastname"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange}
                                        onBlur={(e) => {
                                            formik.handleBlur(e);
                                        }}
                                        fullWidth
                                        placeholder="Enter your last name..."

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{ mb: 0.5, mt: 2, fontSize: fontLabel }}
                                        component="p"
                                    >
                                        Date of Birth
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Select
                                        value={formik.values.dateDOB}
                                        size="small"
                                        id="dateDOB"
                                        name="dateDOB"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        sx={styles.textFieldStyle}
                                        MenuProps={{
                                            transitionDuration: 0,
                                            PaperProps: {
                                                style: {
                                                    maxHeight: '70vh',
                                                },
                                            },
                                        }}
                                        fullWidth
                                    >
                                        <MenuItem value={0}>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    color: 'grey.secondary',
                                                }}
                                            >
                                                DD
                                            </Typography>
                                        </MenuItem>
                                        {[...Array(31).keys()].map((itm, idx) => (
                                            <MenuItem
                                                key={`DD-${idx}`}
                                                value={itm + 1}
                                            >
                                                {itm + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid item xs={4}>
                                    <Select
                                        value={formik.values.monthDOB}
                                        size="small"
                                        id="monthDOB"
                                        name="monthDOB"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        sx={styles.textFieldStyle}
                                        MenuProps={{
                                            transitionDuration: 0,
                                            PaperProps: {
                                                style: {
                                                    maxHeight: '70vh',
                                                },
                                            },
                                        }}
                                        fullWidth
                                    >
                                        <MenuItem value={0}>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    color: 'grey.secondary',
                                                }}
                                            >
                                                MM
                                            </Typography>
                                        </MenuItem>
                                        {MONTHS.map((item, idx) => (
                                            <MenuItem
                                                key={`${item}-${idx}`}
                                                value={idx + 1}
                                            >
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid item xs={4}>
                                    <Select
                                        value={formik.values.yearDOB}
                                        size="small"
                                        id="yearDOB"
                                        name="yearDOB"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        sx={styles.textFieldStyle}
                                        MenuProps={{
                                            transitionDuration: 0,
                                            PaperProps: {
                                                style: {
                                                    maxHeight: '70vh',
                                                },
                                            },
                                        }}
                                        fullWidth
                                    >
                                        <MenuItem value={0}>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    color: 'grey.secondary',
                                                }}
                                            >
                                                YYYY
                                            </Typography>
                                        </MenuItem>
                                        {YEARS.map((item, idx) => {
                                            return (
                                                <MenuItem
                                                    key={`${item}-${idx}`}
                                                    value={idx + 1}
                                                >
                                                    {item}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            mb: 0.5,
                                            mt: 2,

                                            fontSize: fontLabel,
                                        }}
                                        component="p"
                                    >
                                        Mobile Number
                                    </Typography>

                                    <TextField
                                        sx={styles.textFieldStyle}
                                        size="small"
                                        id="mobile"
                                        name="mobile"
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                        onBlur={(e) => {
                                            formik.handleBlur(e);
                                        }}
                                        fullWidth
                                        placeholder="Enter your mobile number..."

                                    />
                                </Grid>
                            </Grid>
                            <LoadingButton
                                onClick={formik.handleSubmit}
                                disabled={err == 1 ? true : false}
                                fullWidth
                                disableElevation
                                loading={loadingRegister}
                                variant="contained"
                                loadingIndicator={
                                    <Typography
                                        color="inherit"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CircularProgress
                                            color="inherit"
                                            size={16}
                                            sx={{ mr: 1 }}
                                        />{' '}
                                        Please wait...
                                    </Typography>
                                }
                                sx={{
                                    mt: 3,
                                    mb: 3,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    height: 42,
                                    backgroundColor: 'success.main',
                                    color: 'white.main',
                                    boxShadow: '0px 2px 0px 0px #386c01',
                                    pt: 1,
                                }}
                            >
                                Recover my login details
                            </LoadingButton>
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
                                        Need more help?
                                    </Typography>
                                    <Link href={`https://${process.env.client.siteweb}/contact`}>
                                        <Typography
                                            color="inherit"
                                            sx={{ textDecoration: "underline", cursor: "pointer" }}
                                            fontSize={fontLabel}>
                                            Contact {process?.env?.client?.clientname} here
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </CardContent>
            </Card>
            <CustomDialog
                id={""}
                open={openSuccessModal}
                title={"Login to your account"}
                content={<ForgotDetailsSuccess onParentClose={handleSuccessModalClose} />
                }
                fullScreen
                showX={false}
                disablePortal={false}
                onClose={handleSuccessModalClose}
            />
        </Box>
    );
};

export default RecoverBBAccount;