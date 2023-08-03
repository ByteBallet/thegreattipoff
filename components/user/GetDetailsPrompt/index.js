import { Box, Button, TextField, Typography, Stack, InputAdornment, CircularProgress, IconButton } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';

import { VALIDATE } from './prompt.utils';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';

import gbSettings from '@stores/gbSettings';

const DETAILS = [
    {
        value: 'loginid',
        type: 'text',
        placeholder: 'Login ID',
        label: 'Login ID',
        icon: (
            <InputAdornment position="start">
                <PersonIcon color="grey" />
            </InputAdornment>
        ),
        endIcon: null,
    },
    {
        value: 'oldpassword',
        type: 'password',
        placeholder: 'Current Password',
        label: 'Current Password',
        icon: (
            <InputAdornment position="start">
                <LockIcon color="black.main" />
            </InputAdornment>
        ),
        endIcon: (
            <InputAdornment position="end">
                <VisibilityIcon color="grey" />
            </InputAdornment>
        ),
    },
    {
        value: 'newpassword',
        type: 'password',
        placeholder: 'New Password',
        label: 'New Password',
        icon: (
            <InputAdornment position="start">
                <LockIcon color="black" />
            </InputAdornment>
        ),
        endIcon: (
            <InputAdornment position="end">
                <VisibilityIcon color="grey" />
            </InputAdornment>
        ),
    },
    {
        value: 'dob',
        type: 'number',
        fields: [
            {
                value: 'day',
                type: 'number',
                placeholder: 'Enter day',
                label: 'Day',
                icon: null,
                endIcon: null,
            },
            {
                value: 'month',
                type: 'number',
                placeholder: 'Enter Month',
                label: 'Month',
                icon: null,
                endIcon: null,
            },
            {
                value: 'year',
                type: 'number',
                placeholder: 'Enter Year',
                label: 'Year',
                icon: null,
                endIcon: null,
            },
        ],
    },
    {
        value: 'postcode',
        type: 'number',
        placeholder: 'Postcode',
        label: 'Postcode',
        icon: null,
        endIcon: null,
    },
];

const initState = {
    loginid: '',
    oldpassword: '',
    newpassword: '',
    day: '',
    month: '',
    year: '',
    postcode: '',
};

function GetDetailsPrompt({ onClick }) {
    const [values, setValues] = useState(initState);
    const [errors, setErrors] = useState(initState);
    const [passwordShow, setShowPassword] = useState({
        oldpassword: false,
        newpassword: false,
    });
    const [saveDisabled, setSaveDisabled] = useState(true);

    const updateGbStore = gbSettings((store) => store.updateGbStore);

    const { user } = useContext(UserContext);
    const handleChange = async (value, name) => {
        setValues({
            ...values,
            [name]: value,
        });
    };

    useEffect(() => {
        let count = 0;
        Object.values(values).forEach((item) => {
            if (item !== '') count++;
        });
        if (count == Object.keys(values).length) {
            setSaveDisabled(false);
        } else {
            setSaveDisabled(true);
        }
    }, [values]);

    async function submitDetails() {
        const errors = await VALIDATE(values, 'submit');

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            // proceeed with the submission
            setErrors(initState);
            const body = {
                ...values,
                userid: user?.userID,
            };
            const url = `${process.env.server}/user/updateuserdetail`;
            const response = await authAPI(url, body, 'POST', true);
            if (!response.error) {
                if (response.data?.ERROBJ?.ERRORCODE == 99) {
                    setErrors({
                        ...errors,
                        global: response.data?.ERROBJ?.ERRORDESC,
                    });
                } else {
                    // close modal
                    updateGbStore({
                        key: 'showUserDetailsPrompt',
                        value: false,
                    });
                    onClick();
                }
            }
        }
    }

    async function checkErrors(val) {
        const errors = await VALIDATE(values, val);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        }
    }

    return (
        <Box sx={{ width: '100%', p: 2, mt: 1 }}>
            {/* <Box sx={{ mb: 2 }}>
                <Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Complete your details</Typography>
            </Box> */}
            {DETAILS.map((item, index) =>
                item.value == 'dob' ? (
                    <Stack direction="row" key={index}>
                        {item.fields.map((subitem, index) => (
                            <Box key={index} sx={{ mb: 1.5, pr: index == item.fields.length - 1 ? 0 : 1 }}>
                                <Typography fontSize={14} mb={0.5} sx={{ color: 'success' }}>
                                    {subitem.label}
                                </Typography>
                                <TextField
                                    size="small"
                                    sx={styles.textFieldStyle}
                                    onChange={(e) => handleChange(e.target.value, subitem.value)}
                                    value={values[subitem.value]}
                                    placeholder={subitem.placeholder}
                                    onBlur={checkErrors}
                                    type={subitem.type}
                                />
                                {errors[subitem.value] && errors[subitem.value] !== '' && (
                                    <Box mt={1}>
                                        <CustomALert severity="error" content={errors[subitem.value]} warning={true} />
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Box key={index} mb={1.5}>
                        <Typography fontSize={13} mb={0.5}>
                            {item.label}
                        </Typography>
                        <TextField
                            size="small"
                            sx={styles.textFieldStyle}
                            fullWidth
                            onChange={(e) => handleChange(e.target.value, item.value)}
                            value={values[item.value]}
                            placeholder={item.placeholder}
                            onBlur={() => checkErrors(item.value)}
                            type={item.type == 'password' ? (!passwordShow[item.value] ? 'text' : 'password') : item.type}
                            InputProps={{
                                startAdornment: item.icon,
                                endAdornment: (
                                    <Box
                                        onClick={() => {
                                            setShowPassword({
                                                ...passwordShow,
                                                [item.value]: !passwordShow[item.value],
                                            });
                                        }}
                                    >
                                        {item.endIcon}
                                    </Box>
                                ),
                            }}
                        />

                        {errors[item.value] && errors[item.value] !== '' && (
                            <Box mt={1}>
                                <CustomALert severity="error" content={errors[item.value]} warning={true} />
                            </Box>
                        )}
                    </Box>
                )
            )}

            <Box mt={2}>
                <Button disabled={saveDisabled} onClick={submitDetails} variant="contained" color="success" fullWidth>
                    Save
                </Button>

                {errors.global && errors.global !== '' && (
                    <Box mt={1}>
                        <CustomALert severity="error" content={errors.global} warning={true} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default GetDetailsPrompt;

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
        },
    },

    mainContainer: {
        backgroundColor: 'white.main',
        p: 2,
        borderRadius: 2,
        mt: 2,
    },
};

const CustomALert = ({ severity, content, warning, isHtml }) => {
    return (
        <Alert
            severity={severity}
            icon={<ErrorIcon sx={{ color: `error.alerttext` }} />}
            sx={{
                bgcolor: `error.alert`,
                width: '100%',
                border: 0.5,
                borderColor: `error.main`,
                alignItems: 'center',
                py: 0,
            }}
        >
            <Typography fontSize={12} color="error.main">
                {content}
            </Typography>
        </Alert>
    );
};
