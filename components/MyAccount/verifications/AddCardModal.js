import React, { useState, useEffect, useContext } from 'react';
import CommonModal from '@Components/Payments/Common/CommonModal';
import DepositAmountPanel from '@Components/Payments/Common/DepositAmountPanel';
import moment from 'moment';
import { Box, FormControlLabel, Container, FormGroup, Card, CardContent, Typography, Grid, TextField, Select } from '@mui/material';
import Image from 'next/image';

import { UserContext } from '@Context/User/UserProvider';
import { proceedBankCreditCardRegister } from '@lib/deposit';
import CustomSelect from '@Components/common/CustomSelect';
import { MyFormHelperText2 } from '@Components/common/MyFormHelperText';
import MyFormHelperText from '@Components/common/MyFormHelperText';
import { YEARS2, MONTHS } from '@Components/utils/register.util';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import CardNumberField, { CCVNumberField } from '@Components/Payments/Common/CardNumberField';
import MyLoadingButton from '@Components/common/MyLoadingButton';
export default function AddCardModal(props) {
    const { opened = false, onClose = () => { }, setDepositState = () => { } } = props;
    const { user } = useContext(UserContext);
    const router = useRouter();
    const { clientID } = user;
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);

    const [formInput, setFormInput] = useState({
        clientid: clientID,
        nameoncard: '',
        cardnumber: '',
        expyear: 0,
        expmonth: 0,
        ccv: '',
        depositamount: '',
    });

    useEffect(() => {
        if (opened) {
            setFormInput({
                clientid: clientID,
                username: '',
                nameoncard: '',
                cardnumber: '',
                expyear: 0,
                expmonth: 0,
                ccv: '',
                depositamount: '',
            });
        }
    }, [opened]);

    const handleBlur = (name) => {
        const _errors = VALIDATE(formInput);
        console.log('AddCardModal::handleBlurs,', _errors);
        setErrors({
            ...errors,
            [name]: _errors[name],
        });
        // setErrors(_errors);
    };
    const handleChange = (e) => {
        console.log('AddCardModal::handleChange ', e.target.name, e.target.value);

        let name = e.target.name;
        let value = e.target.value;
        if (name == 'ccv') {
            value = value.replace(/[^\d]/g, '');
            value = value.substr(0, 3);
        }
        setFormInput({
            ...formInput,
            [name]: value,
        });

        if (name == 'expyear' || name == 'expmonth') {
            const _errors = VALIDATE({
                ...formInput,
                [e.target.name]: e.target.value,
            });
            setErrors({
                ...errors,
                date: _errors.date,
            });
        }
    };

    const handleSubmit = async (e) => {
        console.log('AddCardModal::handleSubmit');
        e.preventDefault();

        let _errors = VALIDATE(formInput);
        let count = 0;

        Object.keys(_errors).map((key, idx) => {
            if (_errors[key] && _errors[key].length > 0) {
                count++;
            }
        });

        if (count > 0) {
            setErrors(_errors);
            return;
        }
        // doCreditCardRegister(formInput);
        setLoading(true);

        const _res0 = await proceedBankCreditCardRegister(formInput);
        let _result = _res0.data;
        console.log('DoCreditCardRegister result=', _result);

        if (_res0.error) {
            setResult({
                status: 403,
                msg: _res0.desc,
            });
        } else if (_result.ERROBJ) {
            if (_result.ERROBJ.ERRORCODE === 0) {
                if (_result.SUCCESS == true) {
                    setResult({
                        status: 200,
                        msg: 'Successful',
                    });
                } else {
                    setResult({
                        status: 404,
                        msg: '404 - Something went wrong',
                    });
                }
            } else {
                if (_result.ERROBJ.ERROR == 0) {
                    setResult({
                        status: 403,
                        msg: _result.ERROBJ.ERRORDESC || '404 - Something went wrong',
                    });
                } else {
                    setResult({
                        status: _result.ERROBJ.ERROR,
                        msg: _result.ERROBJ.ERRORDESC,
                    });
                }
            }
        } else {
            setResult({
                status: 403,
                msg: '404 - Something went wrong',
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                //Reset the data
                if (result.status === 200) {
                    setResult(null);
                    onClose();
                } else {
                    setResult(null);
                }
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    console.log('AddCardModal,result=', result);

    return (
        <CommonModal open={opened} onClose={onClose} title="Add new Credit / Debit Card">
            <Box
                id="addcardmodal"
                name="addcardmodal"
                component="form"
                sx={{ backgroundColor: 'white', m: 0, p: 2 }}
                onSubmit={handleSubmit}
            >
                <Box item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image src="/images/tools/VISA.png" width={125} height={25} alt="visa" />
                </Box>
                {/* <FormControlLabel
            sx={{ m: 0, alignItems: 'flex-start', width: 1, mt: 1 }}
            control={
              <TextField
                fullWidth
                size="small"
                name="nameoncard"
                id="nameoncard"
                value={formInput.nameoncard}
                placeholder="Cardholder's name"
                InputProps={{
                  style: {
                    fontSize: 14,
                  }
                }}
                onBlur={e => handleBlur('nameoncard')}
                onChange={e => handleChange(e)} />
            }
            label={<Typography fontSize={14}>Card must be in registered account holder's name:</Typography>}
            labelPlacement="top"
          /> */}
                <Box sx={{ width: 1, mt: 1 }}>
                    <Typography fontSize={14}>Card must be in registered account holder&apos;s name:</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        name="nameoncard"
                        id="nameoncard"
                        value={formInput.nameoncard}
                        placeholder="Cardholder's name"
                        InputProps={{
                            style: {
                                fontSize: 14,
                            },
                        }}
                        onBlur={(e) => handleBlur('nameoncard')}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.nameoncard && <MyFormHelperText>{errors.nameoncard}</MyFormHelperText>}
                </Box>
                <Box sx={{ width: 1, mt: 1 }}>
                    <Typography fontSize={14}>Card Number:</Typography>
                    {/* <CardNumberField
                fullWidth
                size="small"
                  name="cardnumber"
                  id="cardnumber"
                  value={formInput.cardnumber}
                  onChange={handleChange}
                  onBlur={()=>handleBlur('cardnumber')}
                  placeholder="3 digits"
                  inputProps={{
                    style:{
                      fontSize:14
                    },
                   inputMode:'numeric'            
                  }} /> */}
                    <CardNumberField
                        fullWidth
                        size="small"
                        name="cardnumber"
                        id="cardnumber"
                        value={formInput.cardnumber}
                        placeholder="Card number"
                        inputProps={{
                            style: {
                                fontSize: 14,
                            },
                            inputMode: 'numeric',
                        }}
                        onBlur={(e) => handleBlur('cardnumber')}
                        onChange={handleChange}
                    />

                    {errors.cardnumber && <MyFormHelperText>{errors.cardnumber}</MyFormHelperText>}
                </Box>
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
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="ccv"
                                    id="ccv"
                                    variant="outlined"
                                    placeholder="3 digits"
                                    value={formInput.ccv}
                                    inputProps={{
                                        style: {
                                            fontSize: 14,
                                        },
                                        type: 'text',
                                        maxLength: 3,
                                        inputMode: 'numeric',
                                    }}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={(e) => handleBlur('ccv')}
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
                <DepositAmountPanel
                    amount={formInput.depositamount}
                    setAmount={(v) => setFormInput({ ...formInput, depositamount: v })}
                    error={errors.depositamount}
                    setError={(depositamount) => setErrors({ ...errors, depositamount })}
                    labelStyle={{
                        mt: 1,
                        fontSize: 14,
                        fontWeight: 'normal',
                    }}
                />

                <Box sx={{ my: 2 }}>
                    <MyLoadingButton
                        loading={loading}
                        disabled={
                            formInput.nameoncard == '' ||
                            formInput.cardnumber == '' ||
                            formInput.ccv == '' ||
                            formInput.expyear == 0 ||
                            formInput.expmonth == 0 ||
                            formInput.depositamount == '' ||
                            Boolean(errors.nameoncard) ||
                            Boolean(errors.cardnumber) ||
                            Boolean(errors.date) ||
                            Boolean(errors.ccv) ||
                            Boolean(errors.depositamount)
                        }
                        label=" Add Card & Deposit Now "
                        type="submit"
                    />
                    {result && <MyFormHelperText2>{result}</MyFormHelperText2>}
                </Box>
                <Box sx={styles.container}>
                    <Typography
                        sx={{
                            fontSize: 11,
                            color: 'grey',

                            textAlign: 'center',
                        }}
                    >
                        All transactions are secured and processed <br /> in Australian Dollars (AUD)
                    </Typography>
                </Box>
            </Box>
        </CommonModal>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        mb: 4,
    },
};

const regEx1 = /^[a-zA-Z0-9\s-]*$/;
// const GW_P_Num_Regex = /[0-9]/;

const regEx2 = /^(4|5)[0-9]{3}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
const regEx3 = /^[0-9]{3}$/;

const VALIDATE = (data) => {
    let errors = {};
    let today = moment();
    let curyear = today.year();
    let curmonth = today.month() + 1;

    console.log('VALIDATE data:', data);

    if (!data.nameoncard) {
        errors.nameoncard = 'Please enter card holder`s name';
    } else {
        if (!regEx1.test(data.nameoncard)) {
            errors.nameoncard = 'Only letters, spaces & hyphens permitted.';
        }
    }
    if (!data.expyear || !data.expmonth) {
        // errors.date = 'Expiry Date invalid';
    } else {
        if (data.expyear > curyear || (data.expyear == curyear && data.expmonth > curmonth)) {
        } else {
            errors.date = 'Expiry Date invalid';
        }
    }

    if (!data.cardnumber) {
    } else {
        if (!regEx2.test(data.cardnumber)) {
            errors.cardnumber = 'Card number is invalid';
        }
    }

    if (!data.ccv) {
    } else if (!regEx3.test(data.ccv)) {
        errors.ccv = 'CVV is invalid';
    }

    if (!data.depositamount) {
    } else {
        if (data.depositamount < 5) {
            errors.depositamount = 'Minimum deposit is $5';
        }
    }
    return errors;
};
