import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/Link';
import { UserContext } from '../../../Context/User/UserProvider';
// import { useFormik } from 'formik';
// import { useRouter } from 'next/router';
import MyLoadingButton from '../../common/MyLoadingButton';
import { MyFormHelperText2 } from '../../common/MyFormHelperText';
import { VALIDATE5 } from '../../utils/register.util';
import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { proceedUserChangePass } from '../../../lib/fetcher';
import InputTextField3 from '../../common/InputTextField3';
import {
    CancelRounded,
    Close,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import PasswordCheckPanel from '../../common/PasswordCheckPanel';

const ChangePasswordForm = (props) => {
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [touched, setTouched] = useState({

    });
    const [errors, setErrors] = useState({

    });
    const [values, setValues] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleBlur = (e) => {
        const _errors = VALIDATE5(values);

        setErrors({
            ...errors,
            [e.target.name]: _errors[e.target.name]
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let body = {
            ...values,
            clientid: user.clientID,
            userid: user?.userID
        };
        let _res = await proceedUserChangePass(body);
        if (_res.error) {
            setResult({ status: 404, msg: '404 - Something went wrong.' });
        } else {
            let _result = _res.data.ERROBJ;
            if (_result.ERRORCODE != 0) {
                setResult({
                    status: _result.ERRORCODE,
                    msg: _result.ERRORDESC,
                });
            } else {
                setResult({
                    status: 200,
                    msg: 'Your Password has been updated.',
                });
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                if (result.status === 200) {
                    setValues({
                        current: '',
                        new: '',
                        confirm: ''
                    });
                }
                setResult(null);
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    // console.log('touched.new=',touched.new, 'error.new', errors.new);

    return (
        <>
            <Box sx={{ my: 0, mx: 2, mb: 5 }} component="form" onSubmit={handleSubmit}>

                <Box sx={styles.mainContainer}>
                    <InputTextField3
                        label="Current Password"
                        // type="password"
                        name="current"
                        id="current"
                        type={showPassword2 ? 'text' : 'password'}
                        placeholder="Current Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={
                            () => {
                                setTouched({
                                    ...touched,
                                    'current': true
                                });
                            }
                        }
                        value={values.current}
                        error={
                            touched.current &&
                            Boolean(errors.current)
                        }
                        errormsg={errors.current}
                        inputProps={{
                            style: {
                                fontSize: 14,
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {values.current.length == 0 ? (
                                        <IconButton
                                            onClick={() =>
                                                setValues({
                                                    ...values,
                                                    current: '',
                                                })
                                            }
                                            sx={{ px: 0 }}
                                        >
                                            <CancelRounded fontSize="small" />
                                        </IconButton>
                                    ) : showPassword2 ? (
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword2(
                                                    !showPassword2
                                                )
                                            }
                                            sx={{ px: 0 }}
                                        >
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword2(
                                                    !showPassword2
                                                )
                                            }
                                            sx={{ px: 0 }}
                                        >
                                            <VisibilityOff fontSize="small" />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />

                    <InputTextField3
                        label="New Password"
                        type={showPassword3 ? 'text' : 'password'}
                        name="new"
                        id="new"
                        placeholder="New Password"
                        onChange={handleChange}
                        onFocus={
                            (e) => {
                                setTouched({
                                    ...touched,
                                    'new': true
                                });
                                setFocused(true);
                            }
                        }
                        onBlur={(e) => {
                            setFocused(false);
                            handleBlur(e);
                        }}

                        value={values.new}
                        error={
                            // touched.new && Boolean(errors.new)
                            !focused && Boolean(errors.new)
                        }
                        errormsg={errors.new}
                        inputProps={{
                            style: {
                                fontSize: 14,
                            }
                        }}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {values.new.length == 0 ? (
                                        <IconButton
                                            onClick={() =>
                                                setValues({
                                                    ...values,
                                                    new: '',
                                                })
                                            }
                                            sx={{ px: 0 }}
                                        >
                                            <CancelRounded fontSize="small" />
                                        </IconButton>
                                    ) : showPassword3 ? (
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword3(
                                                    !showPassword3
                                                )
                                            }
                                            sx={{ px: 0 }}
                                        >
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword3(
                                                    !showPassword3
                                                )
                                            }
                                            sx={{ px: 0 }}
                                        >
                                            <VisibilityOff fontSize="small" />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                    {(focused || values.new.length > 0) && (
                        <PasswordCheckPanel value={values.new} />
                    )}

                    <InputTextField3
                        label={'Confirm Password'}
                        type={showPassword ? 'text' : 'password'}
                        name="confirm"
                        id="confirm"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirm}
                        error={
                            touched.confirm &&
                            Boolean(errors.confirm)
                        }
                        errormsg={errors.confirm}
                        inputProps={{
                            style: {
                                fontSize: 14,
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {values.confirm.length == 0 ? (
                                        <IconButton
                                            onClick={() =>
                                                setValues({
                                                    ...values,
                                                    confirm: '',
                                                })
                                            }
                                            sx={{ px: 0 }}
                                        >
                                            <CancelRounded fontSize="small" />
                                        </IconButton>
                                    ) : showPassword ? (
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            sx={{ px: 0 }}
                                        >
                                            <Visibility fontSize="small" />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            sx={{ px: 0 }}
                                        >
                                            <VisibilityOff fontSize="small" />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MyLoadingButton
                                loading={loading}
                                disabled={
                                    values.current.length == 0 ||
                                    values.new.length == 0 ||
                                    values.confirm.length == 0 ||
                                    Boolean(errors.current) ||
                                    Boolean(errors.new) ||
                                    Boolean(errors.confirm)
                                }
                                label="Change Password"
                                type="submit"

                            />
                            {result && (
                                <MyFormHelperText2>
                                    {result}
                                </MyFormHelperText2>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
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

export default ChangePasswordForm;
