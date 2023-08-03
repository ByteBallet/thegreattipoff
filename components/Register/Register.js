import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/Link';
import * as countryList from 'country-list';

//import CustomDialog from '../Shared/CustomDialog';
import Login from '../user/Login';
import RecoverAccount from '@Components/user/ForgotDetails/RecoverAccount';

import CustomDialog from '@Components/Shared/CustomDialog';

// Formik imports
import { useFormik } from 'formik';

import { UserContext } from '../../Context/User/UserProvider';

import { getTextColor, isHotBetWidget, useMobileDetect } from '@Components/utils/util';

// Icon imports
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// import Link from "@mui/material/Link";

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOffIcon from '@mui/icons-material/EditOff';

import { signIn } from 'next-auth/client';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

// Mui component import
import {
    Grid,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    Divider,
    Switch,
    Button,
} from '@mui/material';
import CustomSwitch from './Switch';
import LoadingButton from '@mui/lab/LoadingButton';
// Util imports
import moment from 'moment';
import {
    STREET_TYPE,
    STREET_TYPE2,
    STATE,
    VALIDATE,
    SUBMIT_FORM,
    TITLE_USER,
} from '../utils/register.util';

//import AddressFields from './AddressFields';
import AddressFields from '@Components/Register/AddressFields';

import QASAddress from './QASAddress';
import GWDpLimit from './GWDpLimit';
import authAPI from '../utils/authAPI';
import ContactMenu from './ContactMenu';
import sendAlert from '@services/Shared/sendAlert';

// labels font size
const fontLabel = 13;
const upperLower = /[a-z].*[A-Z]|[A-Z].*[a-z]/;
const isValidWord = /^[a-zA-Z\s]*$/;
const GW_P_Num_Regex = /[0-9]/;

// returns the current year
const CURRENT_YEAR = moment().year() - 18;

// generate an array of years, starting from current year - 18 to last 100 years
export const YEARS = [...Array(100).keys()];
for (let i = 0; i < YEARS.length; i++) {
    YEARS[i] = CURRENT_YEAR - i;
}

// Register component
const Register = () => {
    const theme = useTheme();
    const client = process.env.NEXT_PUBLIC_CLIENT || 'gto';

    const router = useRouter();
    // flags used in calling the API validation (loginID, email and Mobile),
    // and stop API being called on every blur event
    const [validID, setValidID] = React.useState('');
    const [validEmail, setValidEmail] = React.useState('');
    const [validMobile, setValidMobile] = React.useState('');

    const [loginBlur, setLoginBlur] = useState(false);
    // populate the user context
    const { user, addUser } = useContext(UserContext);

    // login dialog
    const [openLogin, setOpenLogin] = useState(false);
    //reset password
    const [openResetModal, setOpenResetModal] = React.useState(false);

    const [loadingRegister, setLoadingRegister] = React.useState(false);

    const [valueQAS, setValueQAS] = React.useState(null);

    let hbWidget = isHotBetWidget()

    // for eb enter values manually
    const [enterAddMan, setEnterAddMan] = useState(hbWidget);

    // List of countries
    // let COUNTRIES = countryList.getNames();
    const [COUNTRIES, setCountries] = useState(countryList.getNames());

    // flag to show and hide the address details
    const [buyTips, setBuyTips] = React.useState(
        client === 'gto' ? false : true
    );

    // returns the list of months in short form eg Jan
    const MONTHS = moment.monthsShort();

    // checks if the deposit limit should be set or not
    const [showDeposit, setShowDeposit] = useState(null);

    const [p, setP] = useState(false);

    const [apiJoinError, setApiJoinError] = useState('');

    const [affiliateErr, setaffiliateErr] = useState('');

    let uid = router?.query?.aid;

    // state for show password
    const [showPassword, setShowPassword] = React.useState(uid ? true : false);

    let device = useMobileDetect() === 'desktop' ? 'desktop' : 'mobile';

    let initData = {
        gender: 0,
        loginID: '',
        password: '',
        firstname: '',
        surname: '',
        dateDOB: 0,
        monthDOB: 0,
        yearDOB: 0,
        email: '',
        mobile: '',
        aptNo: '',
        stNo: '',
        stName: '',
        stType: 0,
        state: 0,
        postcode: '',
        country: 'Australia',
        locality: '',
        qasAddress: '',
        depositLimit: null,
        depositAmount: '',
        depositPeriod: 0,
        promoCode: '',
    };
    const [initValues, setinitValues] = useState(initData);

    useEffect(() => {
        (async function () {
            if (client !== 'gto') {
                const resp = await authAPI(
                    `${process.env.server}/user/getBookieParams`,
                    {},
                    'GET',
                    false
                );
                if (resp && !resp.error && resp.data) {
                    const listCountries = resp.data.NEWPARAMS.cty.map(
                        (item) => item.Value
                    );
                    setCountries(listCountries);
                }
            }
        })();
        if (router?.query?.aid) {
            let uid = router?.query?.aid;
            getJoinDetails(uid);
        }
    }, []);

    const getJoinDetails = async (uid) => {
        const resp = await authAPI(
            `${process.env.server}/user/getJoinDetails`,
            { uid },
            'POST',
            false
        );
        if (
            resp &&
            !resp.error &&
            resp.data &&
            resp.data.ERROBJ &&
            resp.data.ERROBJ.ERRORCODE == 0
        ) {
            let yr = resp.data.user.yearDOB
                ? YEARS.findIndex((item) => item == resp.data.user.yearDOB) + 1
                : 0;
            let countryCode = countryList.getName(resp.data.user.country);

            let stCode = 0;
            if (resp.data?.user?.stType) {
                let indexOfStType = STREET_TYPE.findIndex(
                    (item) => item == resp.data.user.stType
                );

                if (indexOfStType == -1) {
                    let v = STREET_TYPE2.find(
                        (item) =>
                            item.value.toLowerCase() ==
                            resp.data?.user?.stType.toLowerCase()
                    );
                    if (v) {
                        const stType_Lw = STREET_TYPE.map((item) =>
                            item.toLowerCase()
                        );
                        indexOfStType = stType_Lw.indexOf(
                            // getStType(pVal.stType)
                            v.label.toLowerCase()
                        );
                    }
                }

                stCode = indexOfStType + 1;
            }
            // let stCode = resp.data.user.stType
            // ? STREET_TYPE.findIndex(
            //       (item) => item == resp.data.user.stType
            //   ) + 1
            // : 0;

            let state = resp.data.user.state
                ? STATE.findIndex((item) => item == resp.data.user.state) + 1
                : 0;
            let gender = resp.data.user.gender
                ? TITLE_USER.findIndex((item) => item == resp.data.user.gender)
                : 0;
            const qasMyAddressString = `${resp.data.user.aptNo} ${resp.data.user.stNo} ${resp.data.user.stName} ${resp.data.user.stType}, ${resp.data.user.locality} ${resp.data.user.state} ${resp.data.user.postcode}`;
            setValueQAS({
                label: qasMyAddressString,
            });
            setinitValues({
                ...resp.data.user,
                yearDOB: yr,
                country: countryCode,
                state: state,
                stType: stCode,
                gender: gender,
            });
        } else if (
            resp &&
            resp.data &&
            resp.data.ERROBJ &&
            resp.data.ERROBJ.ERRORCODE > 0
        ) {
            setaffiliateErr(resp.data.ERROBJ.ERRORDESC);
        } else if (resp && resp.error) {
            setaffiliateErr(resp.desc);
        }
    };

    // Custom formik hook for validation
    // to add validation only on blur, add validateOnBlur=true and validateOnChange=false
    const formik = useFormik({
        initialValues: initValues,
        enableReinitialize: true,
        validate: (values) =>
            VALIDATE(
                values,
                validID,
                setValidID,
                validEmail,
                setValidEmail,
                validMobile,
                setValidMobile,
                buyTips,
                loginBlur,
                setLoginBlur
            ),
        onSubmit: async (values) => {
            const url = `${process.env.server}/user/join`;
            setLoadingRegister(true);
            let affiliate = '';
            if (router?.query?.Referrer) {
                affiliate = router.query.Referrer;
            }
            const countryCode = countryList.getCode(values.country);
            const stateCode = STATE[values.state - 1];

            let _gender = 'm';
            if (values.gender > 0 && values.gender < 4) {
                _gender = 'f';
            }

            const loginData = {
                loginID: values.loginID,
                password: values.password,
                firstname: values.firstname,
                surname: values.surname,
                dateDOB: values.dateDOB,
                monthDOB: values.monthDOB,
                yearDOB: YEARS[formik.values.yearDOB - 1],
                email: values.email,
                mobile: values.mobile,
                state: stateCode, // fix THIS
                postCode: values.postcode,
                country: countryCode, // fix this
                locality: values.locality,
                buyTips: buyTips,
                gender: TITLE_USER[values.gender],
                depositAmount: values.depositAmount,
                depositPeriod: values.depositPeriod,
                qasVal: valueQAS,
                promoCode: values.promoCode,
                affiliate: affiliate,
                aid: uid ? uid : 0,
                device: device,
            };

            if (buyTips) {
                const stCode = STREET_TYPE2[values.stType - 1].value;
                loginData.aptNo = values.aptNo;
                loginData.stNo = values.stNo;
                loginData.stName = values.stName;
                loginData.stType = stCode;
            }
            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    XAPIGTO: process.env.APP_BRAND.toUpperCase(),
                },
                body: JSON.stringify(loginData),
            };
            try {
                let submitForm = await fetch(url, options);
                let submitFormData = await submitForm.json();

                if (
                    submitFormData.ERROBJ &&
                    submitFormData.ERROBJ.ERROR &&
                    submitFormData.ERROBJ.ERROR !== ''
                ) {
                    setApiJoinError(submitFormData.ERROBJ.ERRORDESC);
                    sendAlert(
                        '',
                        0,
                        '',
                        JSON.stringify(loginData),
                        'JOIN FAIL',
                        1
                    );
                } else {
                    if (submitForm.status === 200) {
                        const result = await signIn('credentials', {
                            redirect: false,
                            username: values.loginID,
                            password: values.password,
                        });

                        const userSession = await getSession();
                        if (result && !result.error) {
                            // if the client is GTO take to users home page,
                            addUser({ ...userSession.user, newUser: true });
                            localStorage.setItem('newUser', 1);
                            if (process.env.client.name == 'gto') {
                                const homeUrl =
                                    userSession.user.gtoPage.replace(
                                        'thegreattipoff.com',
                                        ''
                                    );
                                router.push(homeUrl);
                            } else {
                                // else take to home page
                                router.push('/');
                            }
                        }
                    }
                }

                // call the signin function here
            } catch (e) {
                console.log(e);
            }

            setLoadingRegister(false);
        },
    });
    const [formSubmit, setFormSubmit] = useState(false);

    const submitForm = async () => {
        const validation = await formik.validateForm();
        if (!enterAddMan) {
            if (
                validation.postcode !== '' ||
                validation.state !== '' ||
                validation.stType !== '' ||
                validation.locality !== '' ||
                validation.stName !== '' ||
                validation.stNo !== ''
            ) {
                setEnterAddMan(true);
            }
        }

        if (formik.errors.length > 0) {
        } else {
            formik.submitForm();
            setFormSubmit(true);
        }
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: hbWidget ? "secondary.main" : 'primary.main',
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 0.25,
                }}
            >
                <Typography
                    sx={{
                        fontSize: fontLabel + 4,
                        fontWeight: 'bold',
                        color: getTextColor(theme.palette.primary.main),
                    }}
                >
                    Join {process.env.client.clientname} in under a minute!
                </Typography>
            </Box>
            <Box sx={{ my: 1, mx: 2 }}>
                <form
                    onSubmit={(e) => {
                        setFormSubmit(true);
                        formik.handleSubmit(e);
                    }}
                >
                    <Box sx={styles.mainContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{ mb: 0, mt: 1, fontWeight: 'bold' }}
                                    variant="p"
                                >
                                    Your Information
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography
                                    sx={{
                                        mb: 0.5,
                                        mt: 1,
                                        fontSize: fontLabel,
                                    }}
                                    component="p"
                                >
                                    Title
                                    <span style={{ color: 'red' }}> *</span>
                                </Typography>

                                <Select
                                    readOnly={uid ? true : false}
                                    sx={styles.textFieldStyle}
                                    size="small"
                                    id="gender"
                                    name="gender"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.gender}
                                    fullWidth
                                    MenuProps={{
                                        transitionDuration: 0,
                                        PaperProps: {
                                            style: {
                                                maxHeight: '40vh',
                                            },
                                        },
                                    }}
                                >
                                    {TITLE_USER.map((item, idx) => (
                                        <MenuItem
                                            key={`${item}-${idx}`}
                                            value={idx}
                                        >
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography
                                    sx={{
                                        mb: 0.5,
                                        mt: 1,
                                        fontSize: fontLabel,
                                    }}
                                    component="p"
                                >
                                    First Name{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    value={formik.values.firstname}
                                    sx={styles.textFieldStyle}
                                    size="small"
                                    id="firstname"
                                    name="firstname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.firstname &&
                                        Boolean(formik.errors.firstname)
                                    }
                                    fullWidth
                                    placeholder="As it appears on your ID"
                                    InputProps={{
                                        endAdornment:
                                            formik.touched.firstname &&
                                                Boolean(formik.errors.firstname) ? (
                                                <InputAdornment position="end">
                                                    <ErrorIcon color="error" />
                                                </InputAdornment>
                                            ) : null,
                                    }}
                                />
                                {formik.touched.firstname &&
                                    Boolean(formik.errors.firstname) ? (
                                    <Box
                                        sx={{
                                            backgroundColor: 'error.light',
                                            mt: 1,
                                            py: 1,
                                            px: 3,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 14,
                                            }}
                                        >
                                            {formik.errors.firstname}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        mb: 0.5,
                                        mt: 2,
                                        fontSize: fontLabel,
                                    }}
                                    component="p"
                                >
                                    Last Name{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    value={formik.values.surname}
                                    sx={styles.textFieldStyle}
                                    size="small"
                                    id="surname"
                                    name="surname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.surname &&
                                        Boolean(formik.errors.surname)
                                    }
                                    fullWidth
                                    placeholder="As it appears on your ID"
                                    InputProps={{
                                        endAdornment:
                                            formik.touched.surname &&
                                                Boolean(formik.errors.surname) ? (
                                                <InputAdornment position="end">
                                                    <ErrorIcon color="error" />
                                                </InputAdornment>
                                            ) : null,
                                    }}
                                />
                                {formik.touched.surname &&
                                    Boolean(formik.errors.surname) ? (
                                    <Box
                                        sx={{
                                            backgroundColor: 'error.light',
                                            mt: 1,
                                            py: 1,
                                            px: 3,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 14,
                                            }}
                                        >
                                            {formik.errors.surname}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                        </Grid>

                        <Typography
                            sx={{ mb: 0.5, mt: 2, fontSize: fontLabel }}
                            component="p"
                        >
                            Date of Birth{' '}
                            <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Select
                                    value={formik.values.dateDOB}
                                    size="small"
                                    id="dateDOB"
                                    name="dateDOB"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.dateDOB &&
                                        Boolean(formik.errors.dateDOB)
                                    }
                                    onFocus={
                                        () => { }
                                        // window.scrollTo({
                                        //     top: 250,
                                        //     behavior: 'smooth',
                                        // })
                                    }
                                    sx={styles.textFieldStyle}
                                    MenuProps={{
                                        transitionDuration: 0,
                                        PaperProps: {
                                            style: {
                                                maxHeight: '40vh',
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
                                    error={
                                        formik.touched.monthDOB &&
                                        Boolean(formik.errors.monthDOB)
                                    }
                                    onFocus={() => {
                                        // window.scrollTo({
                                        //     top: 250,
                                        //     behavior: 'smooth',
                                        // });
                                    }}
                                    sx={styles.textFieldStyle}
                                    MenuProps={{
                                        transitionDuration: 0,
                                        PaperProps: {
                                            style: {
                                                maxHeight: '40vh',
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
                                    onFocus={() => {
                                        // window.scrollTo({
                                        //     top: 250,
                                        //     behavior: 'smooth',
                                        // });
                                    }}
                                    error={
                                        formik.touched.yearDOB &&
                                        Boolean(formik.errors.yearDOB)
                                    }
                                    sx={styles.textFieldStyle}
                                    MenuProps={{
                                        transitionDuration: 0,
                                        PaperProps: {
                                            style: {
                                                maxHeight: '40vh',
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
                                {(formik.touched.dateDOB &&
                                    Boolean(formik.errors.dateDOB)) ||
                                    (formik.touched.monthDOB &&
                                        Boolean(formik.errors.monthDOB)) ||
                                    (formik.touched.yearDOB &&
                                        Boolean(formik.errors.yearDOB)) ? (
                                    <Box
                                        sx={{
                                            backgroundColor: 'error.light',
                                            mt: 0,
                                            py: 1,
                                            px: 3,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 14,
                                            }}
                                        >
                                            {Boolean(formik.errors.dateDOB) &&
                                                formik.errors.dateDOB}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 14,
                                            }}
                                            component="p"
                                        >
                                            {Boolean(formik.errors.monthDOB) &&
                                                formik.errors.monthDOB}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 14,
                                            }}
                                            component="p"
                                        >
                                            {Boolean(formik.errors.yearDOB) &&
                                                formik.errors.yearDOB}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        mb: 0.5,
                                        mt: 1,

                                        fontSize: fontLabel,
                                    }}
                                    component="p"
                                >
                                    Email{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    sx={styles.textFieldStyle}
                                    size="small"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={(e) => {
                                        if (client !== 'gto') {
                                            // set the login id here
                                            formik.setFieldValue(
                                                'loginID',
                                                formik.values.email
                                            );
                                            formik.validateField('loginID');
                                        }

                                        // if (formik.values.loginID === '') {

                                        // }
                                        formik.handleBlur(e);
                                    }}
                                    error={
                                        formik.touched.email &&
                                        Boolean(formik.errors.email)
                                    }
                                    fullWidth
                                    placeholder="Enter your email address"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="black" />
                                            </InputAdornment>
                                        ),
                                        endAdornment:
                                            formik.touched.email &&
                                                Boolean(formik.errors.email) ? (
                                                <InputAdornment position="end">
                                                    <ErrorIcon color="error" />
                                                </InputAdornment>
                                            ) : null,
                                    }}
                                />
                                {formik.touched.email &&
                                    Boolean(formik.errors.email) ? (
                                    <Box
                                        sx={{
                                            backgroundColor: 'error.light',
                                            mt: 1,
                                            py: 1,
                                            px: 3,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 14,
                                            }}
                                        >
                                            {formik.errors.email}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        mb: 0.5,
                                        mt: 2,
                                        fontSize: fontLabel,
                                    }}
                                    component="p"
                                >
                                    Mobile{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    sx={styles.textFieldStyle}
                                    size="small"
                                    value={formik.values.mobile}
                                    id="mobile"
                                    name="mobile"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.mobile &&
                                        Boolean(formik.errors.mobile)
                                    }
                                    fullWidth
                                    type="tel"
                                    placeholder="Enter your mobile number"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon color="black" />
                                            </InputAdornment>
                                        ),
                                        endAdornment:
                                            formik.touched.mobile &&
                                                Boolean(formik.errors.mobile) ? (
                                                <InputAdornment position="end">
                                                    <ErrorIcon color="error" />
                                                </InputAdornment>
                                            ) : null,
                                    }}
                                />
                                {formik.touched.mobile &&
                                    Boolean(formik.errors.mobile) ? (
                                    <Box
                                        sx={{
                                            backgroundColor: 'error.light',
                                            mt: 1,
                                            py: 1,
                                            px: 3,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 14,
                                            }}
                                        >
                                            {formik.errors.mobile}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                        </Grid>

                        {client == 'gto' ? (
                            <AddressFields
                                formik={formik}
                                buyTips={buyTips}
                                setBuyTips={setBuyTips}
                                STREET_TYPE={STREET_TYPE}
                                STATE={STATE}
                                COUNTRIES={COUNTRIES}
                                fontLabel={fontLabel}
                                client={client}
                            />
                        ) : (
                            <>
                                {enterAddMan ? (
                                    <>
                                        <AddressFields
                                            formik={formik}
                                            buyTips={buyTips}
                                            setBuyTips={setBuyTips}
                                            STREET_TYPE={STREET_TYPE}
                                            STATE={STATE}
                                            COUNTRIES={COUNTRIES}
                                            fontLabel={fontLabel}
                                            client={client}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        mb: 0.5,
                                                        mt: 2,
                                                        fontSize: fontLabel,
                                                    }}
                                                    component="p"
                                                >
                                                    Country{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                        }}
                                                    >
                                                        *
                                                    </span>
                                                </Typography>
                                                <Select
                                                    value={
                                                        formik.values.country
                                                    }
                                                    size="small"
                                                    id="country"
                                                    name="country"
                                                    onChange={(e) => {
                                                        formik.handleChange(e);
                                                        if (
                                                            e.target.value !==
                                                            'Australia'
                                                        ) {
                                                            // formik.setFieldValue(
                                                            //     'state',
                                                            //     STATE.length
                                                            // );
                                                            setEnterAddMan(
                                                                true
                                                            );
                                                        }
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    error={
                                                        formik.touched
                                                            .country &&
                                                        Boolean(
                                                            formik.errors
                                                                .country
                                                        )
                                                    }
                                                    sx={styles.textFieldStyle}
                                                    fullWidth
                                                    MenuProps={{
                                                        transitionDuration: 0,
                                                        PaperProps: {
                                                            style: {
                                                                maxHeight:
                                                                    '40vh',
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {/* <MenuItem value={0}>
                                                        <Typography
                                                            fontSize={14}
                                                        >
                                                            Select
                                                        </Typography>
                                                    </MenuItem> */}
                                                    {COUNTRIES.map(
                                                        (item, idx) => (
                                                            <MenuItem
                                                                key={`C-${idx}`}
                                                                value={item}
                                                            >
                                                                <Typography
                                                                    fontSize={
                                                                        14
                                                                    }
                                                                >
                                                                    {item}
                                                                </Typography>
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                                {formik.touched.country &&
                                                    Boolean(
                                                        formik.errors.country
                                                    ) ? (
                                                    <Box
                                                        sx={{
                                                            backgroundColor:
                                                                'error.light',
                                                            mt: 1,
                                                            py: 1,
                                                            px: 3,
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: 'error.main',
                                                                fontSize: 14,
                                                            }}
                                                        >
                                                            {
                                                                formik.errors
                                                                    .country
                                                            }
                                                        </Typography>
                                                    </Box>
                                                ) : null}
                                            </Grid>
                                        </Grid>
                                        <QASAddress
                                            formik={formik}
                                            fontLabel={fontLabel}
                                            streetType={STREET_TYPE}
                                            state={STATE}
                                            value={valueQAS}
                                            setValue={setValueQAS}
                                            setEnterAddMan={setEnterAddMan}
                                            uid={uid ? uid : 0}
                                        />
                                    </>
                                )}
                                {
                                    !hbWidget &&
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box
                                                    sx={{
                                                        mt: 0,
                                                        display: 'flex',
                                                        justifyContent: 'flex-end',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: 12,
                                                            color: 'grey.dark',
                                                            my: 'auto',
                                                        }}
                                                    >
                                                        Enter Address Manually
                                                    </Typography>
                                                    <CustomSwitch
                                                        checked={enterAddMan}
                                                        onChange={() =>
                                                            setEnterAddMan(
                                                                !enterAddMan
                                                            )
                                                        }
                                                    />
                                                    {/* <Switch checked={enterAddMan} onChange={() => setEnterAddMan(!enterAddMan)} /> */}
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </>
                                }
                                <GWDpLimit
                                    formik={formik}
                                    fontLabel={fontLabel}
                                    showDeposit={showDeposit}
                                    setShowDeposit={setShowDeposit}
                                    uid={uid ? uid : 0}
                                />
                            </>
                        )}
                    </Box>

                    <Box sx={styles.mainContainer}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{ mb: 0, mt: 1, fontWeight: 'bold' }}
                                    variant="p"
                                >
                                    Create your login details
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        mt: 2,
                                        fontSize: fontLabel,
                                    }}
                                    component="p"
                                >
                                    Username{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    fullWidth
                                    sx={styles.textFieldStyle}
                                    size="small"
                                    placeholder={
                                        client == 'gto'
                                            ? 'Min 6 characters. Alphanumeric only'
                                            : 'Min 6 characters.'
                                    }
                                    id="loginID"
                                    name="loginID"
                                    value={formik.values.loginID}
                                    onChange={formik.handleChange}
                                    onBlur={(e) => {
                                        formik.handleBlur(e);
                                    }}
                                    error={
                                        formik.touched.loginID &&
                                        Boolean(formik.errors.loginID)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="black" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {formik.touched.loginID &&
                                                    Boolean(
                                                        formik.errors.loginID
                                                    ) ? (
                                                    <ErrorIcon color="error" />
                                                ) : formik.values.loginID !==
                                                    '' &&
                                                    !formik.errors.loginID ? (
                                                    <CheckCircleIcon color="success" />
                                                ) : null}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {formik.touched.loginID &&
                                    Boolean(formik.errors.loginID) ? (
                                    <Box
                                        sx={{
                                            backgroundColor: 'error.light',
                                            mt: 1,
                                            py: 1,
                                            px: 3,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 14,
                                            }}
                                        >
                                            {formik.errors.loginID}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        mt: 2,
                                        fontSize: fontLabel,
                                    }}
                                    component="p"
                                >
                                    Password{' '}
                                    <span style={{ color: 'red' }}>*</span>
                                </Typography>

                                <TextField
                                    sx={styles.textFieldStyle}
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
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    fullWidth
                                    placeholder="Minimum 6 characters."
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="black" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment
                                                sx={{ cursor: 'pointer' }}
                                                position="end"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffIcon color="secondary.light" />
                                                ) : (
                                                    <VisibilityIcon color="secondary.light" />
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {formik.touched.password &&
                                    Boolean(formik.errors.password) ? (
                                    <Box
                                        sx={{
                                            backgroundColor: 'error.light',
                                            mt: 1,
                                            py: 1,
                                            px: 3,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'error.main',
                                                fontSize: 14,
                                            }}
                                        >
                                            {formik.errors.password}
                                        </Typography>
                                    </Box>
                                ) : null}

                                {(p || formik.values.password.length > 0) && (
                                    <Box sx={{ my: 1, mx: 2 }}>
                                        {client == 'eb' && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                    fontSize: 13,
                                                    color: 'grey',
                                                }}
                                            >
                                                <CheckCircleIcon
                                                    color={
                                                        upperLower.test(
                                                            formik.values
                                                                .password
                                                        )
                                                            ? 'success'
                                                            : 'grey'
                                                    }
                                                    fontSize="small"
                                                />
                                                <span
                                                    style={{
                                                        paddingLeft: 5,
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                                    Includes lower and upper
                                                    case letters
                                                </span>
                                            </div>
                                        )}

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                fontSize: 13,
                                                color: 'grey',
                                            }}
                                        >
                                            <CheckCircleIcon
                                                color={
                                                    formik.values.password
                                                        .length > 0 &&
                                                        (client == 'gto'
                                                            ? !isValidWord.test(
                                                                formik.values
                                                                    .password
                                                            )
                                                            : GW_P_Num_Regex.test(
                                                                formik.values
                                                                    .password
                                                            ))
                                                        ? 'success'
                                                        : 'grey'
                                                }
                                                fontSize="small"
                                            />
                                            <span
                                                style={{
                                                    paddingLeft: 5,
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                Includes at least one number
                                            </span>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                fontSize: 13,
                                                color: 'grey',
                                            }}
                                        >
                                            <CheckCircleIcon
                                                color={
                                                    formik.values.password
                                                        .length >= 6
                                                        ? 'success'
                                                        : 'grey'
                                                }
                                                fontSize="small"
                                            />
                                            <span
                                                style={{
                                                    paddingLeft: 5,
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                Must be{' '}
                                                {client == 'gto' ? '8' : '6'} or
                                                more characters
                                            </span>
                                        </div>
                                        {/* <Typography component="p" sx={{ fontStyle: "italic", fontSize: 14 }}>
                                    <CheckCircleIcon color="success" /> Includes lower and upper case
                                </Typography>
                                <Typography component="p" sx={{ fontStyle: "italic", fontSize: 14 }}>
                                    <CheckCircleIcon color="success" /> Includes at least one number
                                </Typography>
                                <Typography component="p" sx={{ fontStyle: "italic", fontSize: 14 }}>
                                    <CheckCircleIcon color="success" size="small" /> Must be 8 or more characters
                                </Typography> */}
                                    </Box>
                                )}
                            </Grid>
                        </Grid>

                        <LoadingButton
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
                                mb:
                                    Object.keys(formik.errors).length > 0 &&
                                        formSubmit
                                        ? 0
                                        : 3,
                                fontSize: 18,
                                fontWeight: 'bold',
                                height: 42,
                                backgroundColor: 'success.main',
                                color: 'white.main',
                                boxShadow: '0px 2px 0px 0px #386c01',
                                pt: 1,
                            }}
                            onClick={submitForm}
                            onSubmit={() => { }}
                        >
                            {hbWidget ? `Join ${process.env.client.clientname}` : "Join"}
                        </LoadingButton>
                        {affiliateErr != '' && (
                            <Box
                                sx={{
                                    backgroundColor: 'error.light',
                                    mt: 1,
                                    mb: 5,
                                    py: 1,
                                    px: 3,
                                }}
                            >
                                <Typography
                                    sx={{ color: 'error.main', fontSize: 14 }}
                                >
                                    {affiliateErr}
                                </Typography>
                            </Box>
                        )}

                        {apiJoinError !== '' ? (
                            <Box
                                sx={{
                                    backgroundColor: 'error.light',
                                    mt: 1,
                                    mb: 5,
                                    py: 1,
                                    px: 3,
                                }}
                            >
                                <Typography
                                    sx={{ color: 'error.main', fontSize: 12 }}
                                >
                                    Our records indicate that you&apos;re an
                                    existing account holder.{' '}
                                    <Typography
                                        onClick={() => setOpenLogin(true)}
                                        sx={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            textDecoration: 'underline',
                                            color: 'error.main',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Log In
                                    </Typography>{' '}
                                    or{' '}
                                    <Typography
                                        onClick={() => setOpenResetModal(true)}
                                        sx={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            textDecoration: 'underline',
                                            color: 'error.main',
                                        }}
                                    >
                                        Reset your Password.
                                    </Typography>
                                </Typography>
                            </Box>
                        ) : null}
                        {Object.keys(formik.errors).length > 0 && formSubmit ? (
                            <Box
                                sx={{
                                    backgroundColor: 'error.light',
                                    mt: 1,
                                    mb: 5,
                                    py: 1,
                                    px: 3,
                                }}
                            >
                                <Typography
                                    sx={{ color: 'error.main', fontSize: 14 }}
                                >
                                    Please fill all mandatory fields.
                                    {/* {Object.keys(formik.errors).map((key) => (
                                <div>{key},</div>
                            ))} */}
                                </Typography>
                            </Box>
                        ) : null}

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                border: 1,
                                borderRadius: 2,
                                py: 2,
                                backgroundColor: 'white.main',
                                borderColor: 'grey.joinBorder',
                            }}
                        >
                            <Typography
                                align="center"
                                sx={{ fontSize: 11, mx: 1 }}
                            >
                                By clicking “Join”, I acknowledge that I am over
                                18 and have read and agree to the{' '}
                                {process.env.client.clientname}{' '}
                                <Link href={hbWidget ? `https://${process.env.client.siteweb}/betting-rules` : "/help/terms"}>
                                    <Typography
                                        sx={{
                                            color: 'black.main',
                                            fontSize: 11,
                                            textDecoration: 'underline',
                                            cursor: "pointer"
                                        }}
                                    >
                                        Terms & Conditions
                                    </Typography>
                                </Link>{' '}
                                and{' '}
                                <Link href={hbWidget ? `https://${process.env.client.siteweb}/privacy` : "/help/privacy"}>
                                    <Typography
                                        sx={{
                                            color: 'black.main',
                                            fontSize: 11,
                                            textDecoration: 'underline',
                                            cursor: "pointer"
                                        }}
                                    >
                                        Privacy Policy.
                                    </Typography>
                                </Link>{' '}
                                I also agree to receive information and
                                promotional material from{' '}
                                {process.env.client.clientname}, which I can opt
                                out of at any time.
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 4,
                            }}
                        >
                            <Typography
                                align="center"
                                sx={{ fontSize: 14, mx: 2 }}
                            >
                                Already have an account?
                                <br />
                                <Typography
                                    onClick={() => setOpenLogin(true)}
                                    sx={{
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Log In
                                </Typography>
                            </Typography>
                        </Box>
                    </Box >

                    {/* <Button
                    fullWidth
                    sx={{ my: 5, fontSize: 20, fontWeight: "bold" }}
                    variant="contained"
                    type="submit"
                >
                    Join
                </Button> */}
                </form >

                <CustomDialog
                    id={'login'}
                    open={openLogin}
                    title={'Login to your account'}
                    content={
                        <Login
                            onParentClose={() => setOpenLogin(false)}
                            page="/"
                        />
                    }
                    fullScreen
                    showX={true}
                    onClose={() => setOpenLogin(false)}
                />
                <CustomDialog
                    id={'forgotpassword'}
                    open={openResetModal}
                    title={'Recover your login details'}
                    content={
                        <RecoverAccount
                            onParentClose={() => setOpenResetModal(false)}
                        />
                    }
                    fullScreen
                    showX={true}
                    onClose={() => setOpenResetModal(false)}
                />
                {
                    !hbWidget &&
                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
                        <Divider />
                        <Typography
                            sx={{ mt: 2, textAlign: 'center', fontSize: fontLabel }}
                        >
                            Customer Support
                        </Typography>
                        <ContactMenu />
                    </Box>
                }
            </Box >
        </>
    );
};

const styles = {
    textFieldStyle: {
        backgroundColor: 'grey.joinField',
        borderRadius: 2,

        '& input::placeholder': {
            fontSize: '13px',
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

export default Register;
