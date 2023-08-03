import React, { useState, useContext, useEffect, memo } from 'react';
import { UserContext } from '../../../Context/User/UserProvider';
import moment from 'moment';
import MyLoadingButton from '../../common/MyLoadingButton';
import { STREET_TYPE, STREET_TYPE2, STATE, VALIDATE4, COUNTRIES2, COUNTRIES_CODES } from '../../utils/register.util';
import { Box, Grid, Container, InputAdornment, TextField, Typography, Select, MenuItem, FormControlLabel } from '@mui/material';
import { fetchUserDetails, proceedUserUpdateDetails } from '../../../lib/fetcher';
import { CustomSvgIcon } from '@Components/utils/icons';
import CustomSwitch from '../../Register/Switch';
import AddressFields from './AddressFields';
import { CancelRounded, CheckCircle, Info, Lock } from '@mui/icons-material';
import { MyFormHelperText3 } from '@Components/Payments/Common/MyFormHelperText';

import QASAddress from '@Components/Register/QASAddress';
import AddBankAccountContent from '@Components/Withdraw/bank/AddBankAccountContent';
import { fetchBankAccounts, proceedBankAccountAdd } from '@lib/deposit';
import { checkAccountData } from '@Components/utils/bankingUtil';
import updateUserSession from '@Components/utils/updateUserSession';
import { getSession } from 'next-auth/client';
import updateUserBankSession from '@Components/utils/updateUserBankSession';

const MONTHS = moment.monthsShort();

// returns the current year
const CURRENT_YEAR = moment().year() - 18;

// generate an array of years, starting from current year - 18 to last 100 years
export const YEARS = [...Array(100).keys()];
for (let i = 0; i < YEARS.length; i++) {
    YEARS[i] = CURRENT_YEAR - i;
}

const formatValue = (data) => {
    let newData = {};
    Object.entries(data).forEach(([key, value]) => {
        if (value.length > 0 && (value.startsWith('  ') || value.startsWith('\n'))) {
            newData[key] = '';
        } else {
            newData[key] = value;
        }
    });
    return newData;
};

const WrapperComponent = (props) => {
    const isGTO = process.env.APP_BRAND == 'gto';
    const { user, addUser } = useContext(UserContext);
    const [validEmail, setValidEmail] = React.useState('');
    const [validMobile, setValidMobile] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();
    const [errors, setErrors] = useState({});
    const [enterAddMan, setEnterAddMan] = useState(isGTO ? true : false);
    const [isModified, setModified] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [values, setValues] = useState({
        firstname: '',
        surname: '',
        email: '',
        mobile: '',
        aptNo: '',
        stNo: '',
        stName: '',
        state: 0,
        stType: 0,
        state: 0,
        postcode: 0,
        postCode: '',
        qasAddress: '',
        country: 'Australia',
        locality: '',
    });
    const [touched, setTouched] = useState({});
    const [valueQAS, setValueQAS] = React.useState(null);
    const [onEditItem, setOnEditItem] = useState();
    const [formSubmit, setFormSubmit] = useState(false);
    const [formInput, setFormInput] = useState({
        clientid: user?.clientID,
        accountname: '',
        accountnumber: '',
        bsb: '',
        bankname: '',
        swiftcode: '',
    });
    const [safeValues, setSafeValues] = useState({
        firstname: '',
        surname: '',
        email: '',
        mobile: '',
        aptNo: '',
        stNo: '',
        stName: '',
        state: 0,
        stType: 0,
        state: 0,
        postcode: 0,
        postCode: '',
        qasAddress: '',
        country: 'Australia',
        locality: '',
    });

    const loadInitData = async (userid, clientid) => {
        const _res = await fetchUserDetails({ userid, clientid });

        if (_res.error) {
            console.log('fetchUserDetails error=', _res);
        } else {
            const address = _res.data.mydetail;
            const qasMyAddressString = `${address.aptNo} ${address.stNo} ${address.stName} ${address.stType}, ${address.locality} ${address.state} ${address.postcode}`;
            setValueQAS({
                label: qasMyAddressString,
            });
            let _result = _res.data;

            setValues({
                ...formatValue(_result.mydetail),
            });

            setSafeValues({
                ...formatValue(_result.mydetail),
            });

            setValidMobile(_result.mydetail.mobile);
            setValidEmail(_result.mydetail.email);
            setModified(false);
        }
    };

    const _fetchBankAccounts = async () => {
        let body = {
            userid: user?.userID,
            clientid: user?.clientID,
        };
        let _res0 = await fetchBankAccounts(body);

        if (_res0.error) {
            setAccounts([]);
        } else {
            let _result = _res0.data;
            if (_result.ERROBJ.ERROR != 0) {
                setAccounts([]);
            } else {
                if (_result.accts.length > 0) {
                    setAccounts(_result.accts);
                    _result.accts?.length > 0 &&
                        setFormInput({
                            ...formInput,
                            accountname: _result?.accts?.[0]?.ACCOUNTNAME,
                            accountnumber: _result?.accts?.[0]?.ACCOUNTNO,
                            bsb: _result?.accts?.[0]?.BSB,
                            bankname: _result?.accts?.[0]?.BANKNAME,
                            swiftcode: _result?.accts?.[0]?.SWIFTCODE ?? '',
                        });
                } else {
                    setAccounts([]);
                }
            }
        }
    };

    useEffect(() => {
        if (user?.clientID || user?.userID) {
            user?.clientID && loadInitData(user?.userID, user?.clientID);
            isGTO && _fetchBankAccounts();
        }
    }, []);

    // useEffect(() => {
    //     loadInitData(user?.userID, user.clientID);
    // }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormSubmit(true)
        let _errors0 = await VALIDATE4(values, validEmail, setValidEmail, validMobile, setValidMobile);
        // No need to check account data
        let _errors1 = isGTO ? checkAccountData(formInput, values.country) : {};

        let updateBankDetails = true;
        if (_errors1?.empty) {
            updateBankDetails = false;
        }
        let _errors = {};
        if (!enterAddMan) {
            _errors = {
                mobile: _errors0.mobile,
                email: _errors0.email,
            };
        } else {
            _errors = { ..._errors0, ..._errors1, qasAddress: undefined };
        }
        let count = 0;

        Object.keys(_errors).map((key, idx) => {
            if (_errors[key] && _errors[key].length > 0) {
                count++;
            }
        });

        if (count > 0) {
            setErrors(_errors);

            setLoading(false);
        } else {
            let body = {
                userid: user?.userID,
                clientid: user.clientID,
                STREET: values.stType,
                ...values,
            };

            const _res = await proceedUserUpdateDetails(body);

            let errors = false;

            if (_res.error) {
                // console.log('_res.error');
                errors = true;

                setResult({
                    status: 404,
                    msg: _res.desc,
                });
            } else {
                let err = false;

                if (isGTO) {
                    let bsb0 = formInput.bsb !== '' ? formInput.bsb.replace(/\D/g, '') : '';
                    const _res0 = await proceedBankAccountAdd({
                        ...formInput,
                        bsb: bsb0,
                        userid: user?.userID,
                    });
                    err = !_res0.error;
                    let _result = _res.data;
                    const errorCode = _result.ERROBJ.ERRORCODE;

                    if (errorCode == 0) {
                    } else {
                        setResult({
                            status: 404,
                            msg: _result.ERROBJ.ERRORDESC,
                        });

                        errors = true;
                    }
                    updateUserBankSession().then(() => {
                        updateData();
                    });
                }
            }

            if (!errors) {
                setResult({
                    status: 200,
                    msg: 'Your details have been updated.',
                    title: 'Success!',
                });

                setModified(false);
                setValidEmail(body.email);
                setValidMobile(body.mobile);

                setErrors({});
            }

            setLoading(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (result && result.status) {
                setResult();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [result]);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleValueChange = (name, value) => {
        setModified(true);

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleValueBlur = async (name) => {
        const _errors = await VALIDATE4(values, validEmail, setValidEmail, validMobile, setValidMobile);

        setErrors({
            ...errors,
            [name]: _errors[name],
        });

        setModified(true);
    };

    const handleBlur = async (e) => {
        const _errors = await VALIDATE4(values, validEmail, setValidEmail, validMobile, setValidMobile);

        setErrors({
            ...errors,
            [e.target.name]: _errors[e.target.name],
        });

        setModified(true);
        // checkDisabled();
    };

    const updateData = async () => {
        const userSession = await getSession();
        if (userSession && userSession.user) {
            addUser(userSession.user);
        }
    };
    console.log(errors)
    return (
        <Container
            component="form"
            onSubmit={handleSubmit}
            sx={{
                pb: 2,
            }}
        >
            <FormControlLabel
                fullWidth
                sx={{
                    m: 0,
                    alignItems: 'flex-start',
                    width: 1,
                    mt: 2,
                    fontSize: 14,
                }}
                control={
                    <TextField
                        size="small"
                        fullWidth
                        sx={{
                            backgroundColor: 'grey.joinField',
                        }}
                        value={values.firstname}
                        disabled
                        InputProps={{
                            sx: {
                                fontSize: 14,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CustomSvgIcon name="LOCK2" size="20" />
                                </InputAdornment>
                            ),
                        }}
                    />
                }
                label={<Typography fontSize={14}>First Name:</Typography>}
                labelPlacement="top"
            />
            <FormControlLabel
                fullWidth
                sx={{
                    m: 0,
                    alignItems: 'flex-start',
                    width: 1,
                    mt: 2,
                    fontSize: 14,
                }}
                control={
                    <TextField
                        size="small"
                        fullWidth
                        sx={{
                            backgroundColor: 'grey.joinField',
                        }}
                        value={values.surname}
                        disabled
                        InputProps={{
                            sx: {
                                fontSize: 14,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CustomSvgIcon name="LOCK2" size="20" />
                                </InputAdornment>
                            ),
                        }}
                    />
                }
                label={<Typography fontSize={14}>Last Name:</Typography>}
                labelPlacement="top"
            />

            <FormControlLabel
                sx={{
                    m: 0,
                    alignItems: 'flex-start',
                    width: 1,
                    mt: 2,
                    fontSize: 14,
                }}
                control={
                    <TextField
                        id="email"
                        name="email"
                        fullWidth
                        size="small"
                        placeholder="Email"
                        error={touched.email && Boolean(errors.email)}
                        value={values.email}
                        onFocus={(e) => {
                            handleValueChange('email', '');
                            setTouched({
                                ...touched,
                                email: true,
                            });
                            setOnEditItem('email');
                        }}
                        onBlur={(e) => {
                            if (values.email.length == 0) {
                                handleValueChange('email', safeValues.email);
                            } else {
                                setSafeValues({
                                    ...safeValues,
                                    email: values.email,
                                });
                                handleValueBlur('email');
                            }
                            setOnEditItem('');
                        }}
                        onChange={(e) => {
                            handleValueChange('email', e.target.value);
                        }}
                        InputProps={{
                            style: {
                                fontSize: 14,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    {!touched.email ? (
                                        <CancelRounded fontSize="small" />
                                    ) : onEditItem == 'email' ? (
                                        <></>
                                    ) : errors.email ? (
                                        <Info color="error" fontSize="small" />
                                    ) : (
                                        <CheckCircle color="success" fontSize="small" />
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                }
                label={<Typography fontSize={14}>Email {isGTO && <span style={{ color: 'red' }}>*</span>}</Typography>}
                labelPlacement="top"
            />
            {Boolean(errors.email) && (
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
                        {errors.email}
                    </Typography>
                </Box>
            )}

            {enterAddMan ? (
                <AddressFields
                    values={values}
                    safeValues={safeValues}
                    setSafeValues={setSafeValues}
                    errors={errors}
                    setErrors={setErrors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleValueBlur={handleValueBlur}
                    handleValueChange={handleValueChange}
                    touched={touched}
                    setTouched={setTouched}
                    onEditItem={onEditItem}
                    setOnEditItem={setOnEditItem}
                    STREET_TYPE={STREET_TYPE2}
                    STATE={STATE}
                    COUNTRIES={isGTO ? COUNTRIES_CODES : COUNTRIES2}
                    fontLabel={13}
                />
            ) : (
                <>
                    <QASAddress
                        formik={{
                            values: safeValues,
                            setFieldValue: setFieldValue,
                            errors: errors,
                        }}
                        details={true}
                        setSafeValues={setSafeValues}
                        setValues={setValues}
                        fontLabel={13}
                        streetType={STREET_TYPE}
                        state={STATE}
                        value={valueQAS}
                        setValue={setValueQAS}
                        setEnterAddMan={setEnterAddMan}
                    />
                    {touched.address && Boolean(errors.address) && (
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
                                {errors.address}
                            </Typography>
                        </Box>
                    )}
                </>
            )}
            {!isGTO && (
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
                        <CustomSwitch
                            checked={enterAddMan}
                            onChange={() => setEnterAddMan(!enterAddMan)}
                            InputProps={{
                                style: {
                                    fontSize: 14,
                                },
                            }}
                        />
                    </Typography>
                </Box>
            )}

            {
                //Mobile Number
            }
            <FormControlLabel
                sx={{
                    m: 0,
                    alignItems: 'flex-start',
                    width: 1,
                    mt: 2,
                    fontSize: 14,
                }}
                control={
                    <TextField
                        id="mobile"
                        name="mobile"
                        fullWidth
                        type="tel"
                        // type="tel" id="phone" name="phone"

                        size="small"
                        placeholder="Mobile Number"
                        error={touched.mobile && Boolean(errors.mobile)}
                        value={values.mobile}
                        onFocus={(e) => {
                            handleValueChange('mobile', '');
                            setTouched({
                                ...touched,
                                mobile: true,
                            });
                            setOnEditItem('mobile');
                        }}
                        onBlur={(e) => {
                            if (values.mobile.length == 0) {
                                handleValueChange('mobile', safeValues.mobile);
                            } else {
                                setSafeValues({
                                    ...safeValues,
                                    mobile: values.mobile,
                                });
                                handleValueBlur('mobile');
                            }
                            setOnEditItem('');
                        }}
                        onChange={(e) => {
                            handleValueChange('mobile', e.target.value);
                        }}
                        InputProps={{
                            style: {
                                fontSize: 14,
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    {!touched.mobile ? (
                                        <CancelRounded fontSize="small" />
                                    ) : onEditItem == 'mobile' ? (
                                        <></>
                                    ) : errors.mobile ? (
                                        <Info color="error" fontSize="small" />
                                    ) : (
                                        <CheckCircle color="success" fontSize="small" />
                                    )}
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            type: 'number',
                        }}
                    />
                }
                label={<Typography fontSize={14}>Mobile Number {isGTO && <span style={{ color: 'red' }}>*</span>}</Typography>}
                labelPlacement="top"
            />
            {Boolean(errors.mobile) && (
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
                        {errors.mobile}
                    </Typography>
                </Box>
            )}
            {isGTO && (
                <AddBankAccountContent
                    values={values}
                    formInput={formInput}
                    setFormInput={setFormInput}
                    errors={errors}
                    setErrors={setErrors}
                    fromAcc={true}
                    edit={accounts?.length > 0 ? true : false}
                    country={values.country}
                    setModified={setModified}
                />
            )}
            <MyLoadingButton disabled={isModified ? false : true} loading={loading} type="submit" label="Save" />
            {result && (
                // <MyFormHelperText2>{result}</MyFormHelperText2>
                <MyFormHelperText3>{result}</MyFormHelperText3>
            )}
        </Container>
    );
};

const styles = {
    mainContainer: {
        pb: 5,
    },
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
};

const MyDetailForm = React.memo(WrapperComponent);

export default MyDetailForm;
