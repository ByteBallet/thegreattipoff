import React, { useState, useEffect, useContext } from 'react';
import CommonModal from '@Components/Payments/Common/CommonModal';
import { Box, Container, Button, Grid, FormGroup, FormControlLabel, TextField, Typography } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { CreditLabel } from '@Components/Payments/Common/CreditWithExpire';
import CustomLabelField from '@Components/Payments/Common/CustomLabelField';
import CustomSelect from '@Components/common/CustomSelect';
import MyFormHelperText, { MyFormHelperText2 } from '@Components/Payments/Common/MyFormHelperText';
import { CCVNumberField } from '@Components/Payments/Common/CardNumberField';
import moment from 'moment';
import { YEARS2, DATES, MONTHS } from '@Components/utils/register.util';
import { UserContext } from '@Context/User/UserProvider';
import { proceedBankCreditCardUpdate } from '@lib/deposit';
import NumberFormat from 'react-number-format';
export default function EditCardModal(props) {
    const { card = {}, opened = false, onClose = () => {}, setUpdateNotice = () => {} } = props;

    const [errors, setErrors] = useState({});
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    const { clientID } = user;

    const [formInput, setFormInput] = useState({
        clientid: clientID,
        expyear: 0,
        expmonth: 0,
        cardID: card.ccid,
        ccv: '',
        depositamount: 0,
    });

    // console.log('EditModal, FormINput=', formInput);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'depositamount') {
            value = value.replace(/[^\d.]/g, '');
        } else if (name == 'ccv') {
            value = value.replace(/[^\d]/g, '');
            value = value.substr(0, 3);
        }
        console.log('AddCardModal::handleChange ', name, value);

        setFormInput({
            ...formInput,
            [name]: value,
        });

        if (name == 'expyear' || name == 'expmonth') {
            const _errors = VALIDATE({
                ...formInput,
                [name]: value,
            });
            setErrors({
                ...errors,
                date: _errors.date,
            });
        }
    };

    const handleBlur = (name) => {
        const _errors = VALIDATE(formInput);
        console.log('AddCardModal::handleBlurs,', _errors);
        setErrors({
            ...errors,
            [name]: _errors[name],
        });
        // setErrors(_errors);
    };

    useEffect(() => {
        if (opened) {
            setFormInput({
                clientid: clientID,
                cardID: card.ccid,
                expyear: card.cey,
                expmonth: card.cem,
                ccv: '',
                depositamount: 0,
            });
        }
    }, [opened]);

    useEffect(() => {
        const fetcha = () => {
            if (result && result.status != undefined) {
                //Reset the data
                setResult();
                // if (result.status === 0) {
                onClose();
                // }
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    // useEffect(() => {
    //     if (formInput.expyear != 0 || formInput.expmonth != 0) {
    //         const _errors = checkData(formInput);
    //         setErrors(_errors);
    //     }
    // }, [formInput.expyear, formInput.expmonth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const clientSideToken = process.env.client.eway_secret;
            const encrypted_value = eCrypt.encryptValue(formInput.ccv, clientSideToken);

            try {
                let formInput2 = {
                    ...formInput,
                    year: formInput.expyear,
                    month: formInput.expmonth,
                    userid: user?.userID,
                };

                if (process.env.client.name == 'gto') {
                    formInput2.ccv = encrypted_value;
                }
                const _res0 = await proceedBankCreditCardUpdate(formInput2);

                if (_res0.error) {
                    setResult({
                        status: 403,
                        msg: _res0.desc,
                    });

                    setLoading(false);
                    return;
                }

                let _result = _res0.data;

                if (_result.ERROBJ && _result.ERROBJ.ERROR == 0) {
                    setResult({
                        status: 200,
                        msg: 'Successful',
                    });
                    setUpdateNotice(true);
                    onClose();
                } else if (_result.ERROBJ) {
                    console.log('HERE');
                    setResult({
                        status: 403,
                        msg: _result.ERROBJ.ERRORDESC,
                    });
                } else {
                    setResult({
                        status: 403,
                        msg: 'Card details incorrect! Please check details and try again.',
                    });
                }
            } catch (e) {
                console.log('Error-updating form', e);
            }
        } catch (e) {
            console.log('Authorization error', e);
        }

        // let _errors = checkData(formInput);
        // if(_errors!={})
        //     setErrors(_errors);
        //     setLoading(false);
        //     return;
        // }

        setLoading(false);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://secure.ewaypayments.com/scripts/eCrypt.js'; // 'https://secure.ewaypayments.com/scripts/eCrypt.min.js';
        script.async = true;

        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    function func(e) {
        e.preventDefault();
        console.log(e);
        console.log(new FormData(e.target));
    }

    return (
        <CommonModal open={opened} onClose={onClose} id="edit-modal" title="Edit Credit/Debit Card">
            <Box component="form" sx={{ backgroundColor: 'white', m: 0, p: 2 }} onSubmit={handleSubmit}>
                {/* <h1>Edit Modal</h1> */}
                <CustomLabelField
                    label={<Typography sx={{ fontSize: 14 }}>Card Number:</Typography>}
                    labelStyle={{ fontSize: 16, mb: 0.5 }}
                    style={{ mt: 0, mb: 3 }}
                    control={<CreditLabel card={card} />}
                    error=""
                />

                <Typography sx={{ width: 1, mt: 2, py: 1, fontSize: 14, fontWeight: 'bold' }}>Update Card Details:</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <FormControlLabel
                            sx={{ width: 1, m: 0, alignItems: 'flex-start', mt: 1 }}
                            control={
                                <FormGroup
                                    sx={{
                                        width: 1,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'nowrap',
                                        justifyContent: 'space-between',
                                    }}
                                    mx={0}
                                    px={0}
                                >
                                    <CustomSelect
                                        id="expmonth"
                                        name="expmonth"
                                        value={formInput.expmonth}
                                        placeholder="Select month"
                                        size="small"
                                        sx={{
                                            //  width:1/2,
                                            width: '45%',
                                            fontSize: 14,
                                        }}
                                        onChange={(e) => handleChange(e)}
                                        onBlur={(e) => handleBlur('date')}
                                    >
                                        {MONTHS}
                                    </CustomSelect>
                                    <CustomSelect
                                        id="expyear"
                                        name="expyear"
                                        value={formInput.expyear}
                                        placeholder="Select year"
                                        size="small"
                                        sx={{
                                            //  width:1/2,
                                            width: '50%',
                                            //  mx:1,
                                            // px:1,
                                            fontSize: 14,
                                        }}
                                        data={YEARS2}
                                        onChange={(e) => handleChange(e)}
                                        onBlur={(e) => handleBlur('date')}
                                    />
                                </FormGroup>
                            }
                            label={<Typography sx={{ fontSize: 14 }}>Expiry Date:</Typography>}
                            labelPlacement="top"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            sx={{ m: 0, alignItems: 'flex-start', width: 1, mt: 1 }}
                            control={
                                <CCVNumberField
                                    fullWidth
                                    size="small"
                                    name="ccv"
                                    id="ccv"
                                    variant="outlined"
                                    placeholder="3 digits"
                                    value={formInput.ccv}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur('ccv')}
                                    inputProps={{
                                        style: {
                                            fontSize: 14,
                                        },
                                        type: 'text',
                                        maxLength: 3,
                                        inputMode: 'numeric',
                                    }}
                                />
                            }
                            label={<Typography sx={{ fontSize: 14 }}>CVV:</Typography>}
                            labelPlacement="top"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {errors.date ? (
                            <MyFormHelperText>{errors.date}</MyFormHelperText>
                        ) : errors.ccv ? (
                            <MyFormHelperText>{errors.ccv}</MyFormHelperText>
                        ) : (
                            void 0
                        )}
                    </Grid>
                </Grid>

                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        py: 2,
                    }}
                >
                    <LoadingButton
                        loading={loading}
                        loadingIndicator={
                            <Typography
                                color="inherit"
                                fullWidth
                                sx={{
                                    width: 'max-content',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress color="inherit" size={16} sx={{ mr: 1 }} /> Please wait...
                            </Typography>
                        }
                        color="success"
                        variant="contained"
                        // onClick={() => handleSubmit()}
                        fullWidth
                        size="small"
                        disabled={
                            Boolean(errors.ccv) ||
                            Boolean(errors.date) ||
                            formInput.expyear === null ||
                            formInput.expmonth === null ||
                            formInput.expyear == 0 ||
                            formInput.expmonth == 0 ||
                            formInput.ccv == ''
                        }
                        sx={{
                            // mt: 3,
                            // width: 1,
                            fontSize: 16,
                            fontWeight: 'bold',
                            py: 0,
                            mx: 6,
                            height: 42,
                            boxShadow: '0px 2px 0px 0px #386c01',
                        }}
                        type="submit"
                    >
                        Save
                    </LoadingButton>
                </Container>
                {/* <Container sx={{ px: 4 }}> */}
                {result && <MyFormHelperText2>{result}</MyFormHelperText2>}
                {/* </Container> */}
            </Box>
        </CommonModal>
    );
}

const regEx3 = /^[0-9]{3}$/;

const VALIDATE = (data) => {
    let errors = {};
    let today = moment();
    let curyear = today.year();
    let curmonth = today.month() + 1;

    // console.log('Checkdata:', data);
    // // //
    // console.log('checkData formInput=', curyear, curmonth, data);
    // console.log('data.expyear > curyear ', data.expyear > curyear);
    // console.log(
    //     'data.expyear == curyear && data.expmonth > curmonth',
    //     data.expyear == curyear,
    //     data.expmonth >= curmonth
    // );

    if (!data.expyear || !data.expmonth) {
    } else {
        if (data.expyear > curyear || (data.expyear == curyear && data.expmonth > curmonth)) {
        } else {
            errors.date = 'Expiry Date invalid';
        }
    }

    if (!data.ccv) {
        // errors.ccv = 'CCV is invalid';
    } else if (!regEx3.test(data.ccv)) {
        errors.ccv = 'CCV is invalid';
    }
    return errors;
};
