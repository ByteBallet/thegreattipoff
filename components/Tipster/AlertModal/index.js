import { Box, Button, TextField, Typography, Stack, InputAdornment, CircularProgress, IconButton } from '@mui/material';
import { useState } from 'react';

import TipsterHeader from './TipsterHeader';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { ALERT_MODAL } from './alertmodal.service';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import CloseIcon from '@mui/icons-material/Close';
import InfoAlert from '@Components/Shared/InfoAlert';
import CustomALert from '@Components/Shared/CustomALert';

const DETAILS = [
    {
        value: 'fname',
        type: 'text',
        placeholder: 'First Name',
        icon: (
            <InputAdornment position="start">
                <PersonIcon color="grey" />
            </InputAdornment>
        ),
    },
    {
        value: 'mobile',
        type: 'number',
        placeholder: 'Mobile Number',
        icon: (
            <InputAdornment position="start">
                <PhoneIcon color="grey" />
            </InputAdornment>
        ),
    },
    {
        value: 'email',
        type: 'email',
        placeholder: 'Email Address',
        icon: (
            <InputAdornment position="start">
                <EmailIcon color="grey" />
            </InputAdornment>
        ),
    },
];

function Submit({ details, handleChange, submitForm, loading, values }) {
    const shownDetails = details.filter((item) => item.value !== 'email');

    return (
        <>
            <Box sx={{ width: '100%', p: 2, mt: 1 }}>
                {shownDetails.map((item, index) => (
                    <Box key={index} mb={1.5}>
                        <TextField
                            size="small"
                            sx={styles.textFieldStyle}
                            fullWidth
                            onChange={(e) => handleChange(e.target.value, item.value)}
                            value={values[item.value]}
                            placeholder={item.placeholder}
                            type={item.type}
                            InputProps={{
                                startAdornment: item.icon,
                            }}
                        />
                    </Box>
                ))}
            </Box>

            <Stack direction="column" justifyContent="center" alignItems={'center'}>
                <Box sx={{ textAlign: 'center', lineHeight: 1, mb: 2 }}>
                    <Typography fontSize={12}>
                        You acknowledge our terms and conditions <br /> when you press Submit
                    </Typography>
                </Box>

                <Box mb={2}>
                    <Button onClick={submitForm} variant="contained" sx={{ width: '250px', fontWeight: 'bold' }} color="success">
                        {loading ? (
                            <>
                                <CircularProgress color="white" />
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </Box>
            </Stack>
        </>
    );
}

function Confirm({ details, handleChange, confirmForm, loading, values, formSubmit }) {
    const shownDetails = details.filter((item) => item.value === 'email');
    const isValidEmail = /^$|^.*@.*\..*$/;
    const isValidEmailAlt = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    const [emailErors, setEmailErrors] = useState(false);

    return (
        <>
            <Box sx={{ width: '100%', p: 2, mt: 1 }}>
                <Box sx={{ textAlign: 'center', lineHeight: 1, mb: 2 }}>
                    {formSubmit?.tipalert?.success ? (
                        <Typography fontSize={12} color={formSubmit?.tipalert?.success ? 'black' : 'error.alerttext'}>
                            {formSubmit?.tipalert?.message}
                        </Typography>
                    ) : (
                        <InfoAlert content={formSubmit?.tipalert?.message} />
                    )}
                </Box>
                {shownDetails.map((item, index) => (
                    <Box key={index} mb={1.5}>
                        <TextField
                            size="small"
                            sx={styles.textFieldStyle}
                            fullWidth
                            onChange={(e) => handleChange(e.target.value, item.value)}
                            value={values[item.value]}
                            placeholder={item.placeholder}
                            onBlur={() => {
                                if (!isValidEmail.test(values.email) || !isValidEmailAlt.test(values.email)) {
                                    setEmailErrors(true);
                                } else {
                                    setEmailErrors(false);
                                }
                            }}
                            type={item.type}
                            InputProps={{
                                startAdornment: item.icon,
                            }}
                        />
                        {emailErors && (
                            <Box mt={2}>
                                <CustomALert severity="error" content="Please enter a valid email." warning={true} />
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>

            <Stack direction="column" justifyContent="center" alignItems={'center'}>
                <Box sx={{ textAlign: 'center', lineHeight: 1, mb: 2 }}>
                    <Typography fontSize={12}>
                        You acknowledge our terms and conditions <br /> when you press Confirm
                    </Typography>
                </Box>

                <Box mb={2}>
                    <Button
                        onClick={() => {
                            if (!isValidEmail.test(values.email) || !isValidEmailAlt.test(values.email)) {
                                setEmailErrors(true);
                            } else {
                                confirmForm();
                            }
                        }}
                        variant="contained"
                        sx={{ width: '250px', fontWeight: 'bold' }}
                        color="success"
                    >
                        {loading ? (
                            <>
                                <CircularProgress color="white" />
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </Button>
                </Box>
            </Stack>
        </>
    );
}

function Success({ formSubmit, onCloseModal }) {
    return (
        <>
            <Box sx={{ width: '100%', p: 2, mt: 1 }}>
                <Box sx={{ textAlign: 'center', lineHeight: 1, mb: 1 }}>
                    <CheckCircleIcon color="success" sx={{ fontSize: 70 }} />
                </Box>
                <Box sx={{ textAlign: 'center', lineHeight: 1, mb: 1 }}>
                    <Typography fontSize={14}>{formSubmit?.tipalert?.message}</Typography>
                </Box>
            </Box>

            <Stack direction="column" justifyContent="center" alignItems={'center'}>
                <Box mb={2}>
                    <Button onClick={onCloseModal} variant="contained" sx={{ width: '250px', fontWeight: 'bold' }} color="success">
                        Close
                    </Button>
                </Box>
            </Stack>
        </>
    );
}

function TipsterAlert({ tipster, isUser, isProTipster, onClose }) {
    const [values, setValues] = useState({
        fname: '',
        mobile: '',
        email: '',
    });

    const [loading, setLoading] = useState(false);
    const [screen, setScreen] = useState(0); // [0->Init, 1->Submit, 2->Confirm]
    const [formSubmit, setFormSubmit] = useState({
        submit: false,
        confirm: false,
        tipalert: null,
        formfield: null,
    });

    const handleChange = (value, name) => {
        setValues({
            ...values,
            [name]: value,
        });
    };

    async function submitForm() {
        const body = {
            firstname: values.fname,
            mobile: values.mobile,
            email: '',
            followid: tipster.USERID,
            alerttype: 'TIPALERT',
            status: '',
            id: 0,
        };
        setLoading(true);
        const resp = await ALERT_MODAL.activateFollow(body);
        if (resp && resp?.formfield && resp?.tipalert) {
            setFormSubmit({
                tipalert: resp.tipalert,
                formfield: resp?.formfield,
            });
            setScreen(1);
        }

        setLoading(false);
    }

    async function confirmForm() {
        const body = {
            firstname: values.fname,
            mobile: values.mobile,
            followid: tipster.USERID,
            alerttype: 'TIPALERT',
            email: values.email,
            status: formSubmit.tipalert.status,
            id: formSubmit.tipalert.id,
        };

        setLoading(true);
        const resp = await ALERT_MODAL.activateFollow(body);
        if (resp && resp?.tipalert) {
            setFormSubmit({
                tipalert: resp.tipalert,
                formfield: resp.formfield,
            });

            if (resp?.tipalert?.status == 'COMPLETE' && resp?.tipalert?.success) {
                setScreen(2);
            }
        }
        setLoading(false);
    }

    function GetScreen() {
        switch (screen) {
            case 0:
                return <Submit details={DETAILS} handleChange={handleChange} submitForm={submitForm} loading={loading} values={values} />;
            case 1:
                return (
                    <Confirm
                        details={DETAILS}
                        handleChange={handleChange}
                        confirmForm={confirmForm}
                        loading={loading}
                        values={values}
                        formSubmit={formSubmit}
                    />
                );
            case 2:
                return <Success formSubmit={formSubmit} onCloseModal={() => onClose(false)} />;
            default:
                return <Submit details={DETAILS} handleChange={handleChange} submitForm={submitForm} loading={loading} values={values} />;
        }
    }
    return (
        <Box bgcolor={'grey.logobg'}>
            <TipsterHeader tipster={tipster} isUser={isUser} isProTipster={isProTipster} onClose={onClose} />
            {GetScreen()}
        </Box>
    );
}

export default TipsterAlert;

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

/**
 * 
 * {showFields() && (
                <Box sx={{ width: '100%', p: 2, mt: 1 }}>
                    {(formSubmit.submit || formSubmit.confirm) && (
                        <Box sx={{ textAlign: 'center', lineHeight: 1, mb: 2 }}>
                            <Typography fontSize={12}>{formSubmit?.tipalert.message}</Typography>
                        </Box>
                    )}
                    {shownDetails.map((item, index) => (
                        <Box key={index} mb={1.5}>
                            <TextField
                                size="small"
                                sx={styles.textFieldStyle}
                                fullWidth
                                onChange={(e) => handleChange(e.target.value, item.value)}
                                value={values[item.value]}
                                placeholder={item.placeholder}
                                type={item.type}
                                InputProps={{
                                    startAdornment: item.icon,
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            )}

            <Stack direction="column" justifyContent="center" alignItems={'center'}>
                {!formSubmit.submit && (
                    <Box sx={{ textAlign: 'center', lineHeight: 1, mb: 2 }}>
                        <Typography fontSize={12}>
                            You acknowledge our terms and conditions <br /> when you press Submit
                        </Typography>
                    </Box>
                )}
                <Box mb={2}>
                    <Button
                        onClick={formSubmit.submit ? submitForm : formSubmit.confirm ? submitEmail : submitForm}
                        variant="contained"
                        sx={{ width: '250px', fontWeight: 'bold' }}
                        color="success"
                    >
                        {loading ? (
                            <>
                                <CircularProgress color="white" />
                            </>
                        ) : (
                            <> {formSubmit.submit ? 'Submit' : formSubmit.confirm ? 'Confirm' : ''}</>
                        )}
                    </Button>
                </Box>
            </Stack>
 */
