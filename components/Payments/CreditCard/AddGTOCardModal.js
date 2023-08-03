import React, { useState, useEffect, useContext } from 'react';
import CommonModal from '@Components/Payments/Common/CommonModal';
import DepositAmountPanel from '@Components/Payments/Common/DepositAmountPanel';
import moment from 'moment';
import { Box, FormControlLabel, Container, FormGroup, Card, CardContent, Typography, Grid, TextField, Select, Input } from '@mui/material';
import Image from 'next/image';

import { UserContext } from '@Context/User/UserProvider';
import { proceedBankCreditCardRegister, polliSubmit } from '@lib/deposit';
import CustomSelect from '@Components/common/CustomSelect';
import MyFormHelperText from '@Components/common/MyFormHelperText';
import { YEARS2, MONTHS } from '@Components/utils/register.util';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import CardNumberField, { CCVNumberField } from '@Components/Payments/Common/CardNumberField';
import MyLoadingButton from '@Components/common/MyLoadingButton';
import updateUserSession from '@Components/utils/updateUserSession';
import { getSession } from 'next-auth/client';
import sendAlert from '@services/Shared/sendAlert';
import axios from 'axios';

const isGTO = process.env.APP_BRAND == 'gto';

export default function AddGTOCardModal(props) {
    const { opened = false, onClose = () => { }, setDepositState = () => { } } = props;
    const { user, addUser } = useContext(UserContext);
    const router = useRouter();
    const { clientID } = user;
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);

    const [ccResp, setCCResp] = useState({
        url: null,
        accessToken: null,
    });

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

        setErrors({
            ...errors,
            [name]: _errors[name],
        });
        // setErrors(_errors);
    };
    const handleChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        if (name === 'amount') {
            value = value.replace(/[^\d.]/g, '');
        } else if (name == 'ccv') {
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
                [name]: value,
            });
            setErrors({
                ...errors,
                date: _errors.date,
            });
        }
    };

    const updateData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user);
    };

    const submitGTO = async (e) => {
        e.preventDefault();
        return;
        if (ccResp.url !== null && ccResp.accessToken !== null) {
            if (isGTO) {
                let body = {
                    EWAY_ACCESSCODE: ccResp.accessToken,
                    EWAY_PAYMENTTYPE: 'Credit Card',
                    EWAY_CARDNAME: formInput.nameoncard,
                    EWAY_CARDNUMBER: formInput.cardnumber,
                    EWAY_CARDEXPIRYMONTH: `${formInput.expmonth}`,
                    EWAY_CARDEXPIRYYEAR: `${formInput.expyear}`,
                    EWAY_CARDCVN: formInput.ccv,
                };

                const fData = new FormData();
                for (const [key, value] of Object.entries(body)) {
                    fData.append(`${key}`, `${value}`);
                }

                if (ccResp.url) {
                    // const poliReponse = await
                    fetch(ccResp.url, {
                        body: fData,
                        'Content-Type': 'multipart/form-data',
                        method: 'post',
                        mode: 'no-cors',
                    }).then((res) => {

                        router.push(ccResp.url);
                    });
                }
            }
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        return;

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
        // setLoading(true);

        if (user && user?.userID) {
            formInput.userid = user.userID;
        }

        const _res0 = await proceedBankCreditCardRegister(formInput);
        let _result = _res0.data;

        if (!_res0.error) {
            const url = _res0?.data?.CCREQUEST.FORMURL;
            if (isGTO) {
                let body = {
                    EWAY_ACCESSCODE: _res0?.data?.CCREQUEST.ACCESSCODE,
                    EWAY_PAYMENTTYPE: 'Credit Card',
                    EWAY_CARDNAME: formInput.nameoncard,
                    EWAY_CARDNUMBER: formInput.cardnumber,
                    EWAY_CARDEXPIRYMONTH: `${formInput.expmonth}`,
                    EWAY_CARDEXPIRYYEAR: `${formInput.expyear}`,
                    EWAY_CARDCVN: formInput.ccv,
                };

                const fData = new FormData();
                for (const [key, value] of Object.entries(body)) {
                    fData.append(`${key}`, `${value}`);
                }

                // const data = new URLSearchParams();
                // for (const pair of fData) {
                //     data.append(pair[0], pair[1]);
                // }



                // const resp = await fetch(url, {
                //     method: 'post',
                //     body: data,
                //     mode: 'no-cors',
                // });



                if (url && body?.EWAY_ACCESSCODE) {
                    // const poliReponse = await
                    fetch(url, {
                        body: fData,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*',
                        method: 'post',
                        mode: 'no-cors',
                        redirect: 'follow',
                    }).then((res) => {
                        console.log('Redirected', res);
                    });
                }
            }
        }

        // if (_res0.error) {
        //     setResult({
        //         status: 403,
        //         msg: _res0.desc,
        //         depositamount: 0,
        //     });
        // } else if (_result.ERROBJ) {
        //     if (_result.ERROBJ.ERRORCODE === 0) {
        //         if (_result.SUCCESS == true) {
        //             setResult({
        //                 status: 200,
        //                 msg: 'Successful',
        //                 depositamount: _result.DEPOSITAMOUNT,
        //             });
        //             //update session
        //             updateUserSession(false).then(() => {
        //                 updateData();
        //             });
        //         } else {
        //             setResult({
        //                 status: _result.ERROBJ.ERROR,
        //                 msg: _result.ERROBJ.ERRORDESC,
        //                 depositamount: 0,
        //             });
        //         }
        //     } else {
        //         if (_result.ERROBJ.ERROR == 0) {
        //             if (_result.SUCCESS == true) {
        //                 setResult({
        //                     status: 200,
        //                     msg: 'Successful',
        //                     depositamount: _result.DEPOSITAMOUNT,
        //                 });
        //                 //update session
        //                 updateUserSession(false).then(() => {
        //                     updateData();
        //                 });
        //                 router.push({
        //                     pathname: '/deposit/success',
        //                     query: {
        //                         amount: _result.DEPOSITAMOUNT,
        //                         receipt: _result.BANKRECEIPT,
        //                         state: {
        //                             amount: _result.DEPOSITAMOUNT,
        //                             receipt: _result.BANKRECEIPT,
        //                         },
        //                     },
        //                 });
        //             } else {
        //                 setResult({
        //                     status: _result.ERROBJ.ERROR,
        //                     msg: _result.ERROBJ.ERRORDESC,
        //                     depositamount: 0,
        //                 });
        //             }
        //         } else {
        //             setResult({
        //                 status: _result.ERROBJ.ERROR,
        //                 msg: _result.ERROBJ.ERRORDESC,
        //                 depositamount: 0,
        //             });
        //         }
        //     }
        // } else {
        //     setResult({
        //         status: 403,
        //         msg: 'An error has occurred. Please check your account balance before trying again.',
        //         depositamount: 0,
        //     });
        //     sendAlert(user.alias, user.userID, user.clientID, depositamount + (cardnumber ? cardnumber.slice(-4) : ''), 'ADD CARD FAIL');
        // }
        setLoading(false);
    };

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                //Reset the data
                // console.log('SebTest,result=', result);
                if (result.status === 200) {
                    if (!isGTO) {
                        setResult(null);
                        router.push({
                            pathname: '/deposit/success',
                            query: {
                                amount: result?.depositamount,
                                state: {
                                    amount: result?.depositamount,
                                },
                            },
                        });
                    }
                    const tt = setTimeout(fetcha, 600);
                    return () => clearTimeout(tt);
                } else {
                    setResult(null);
                    const tt = setTimeout(fetcha, 3000);
                    return () => clearTimeout(tt);
                }
            }
        };
    }, [result]);

    // console.log('AddCardModal,result=', result);

    const formik = useFormik({
        initialValues: {
            clientid: clientID,
            nameoncard: '',
            cardnumber: '',
            expyear: 0,
            expmonth: 0,
            ccv: '',
            depositamount: '',
        },
        validate: (values) => VALIDATE(values),
        onSubmit: async (values) => {
            setLoading(true);
            setLoading(false);
        },
    });

    let depositEnable = false;

    if (formInput.nameoncard == "" || formInput.cardnumber == "" || formInput.expyear === 0 || formInput.expmonth == 0 || formInput.ccv == "" || formInput.depositamount == "" || (ccResp.url == null && isGTO)) {
        depositEnable = true;
    }


    return (
        <CommonModal open={opened} onClose={onClose} title="Add new Credit / Debit Card">
            <Card component="form" sx={{ backgroundColor: 'white', m: 0, p: 0 }}>
                <CardContent>
                    <Box item sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src="/images/tools/VISA.png" width={125} height={25} alt="VISA" />
                    </Box>
                    <FormControlLabel
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
                                    },
                                }}
                                onBlur={(e) => handleBlur('nameoncard')}
                                onChange={(e) => handleChange(e)}
                            />
                        }
                        label={<Typography fontSize={14}>Card must be in registered account holder&apos;s name:</Typography>}
                        labelPlacement="top"
                    />
                    {errors.nameoncard && <MyFormHelperText>{errors.nameoncard}</MyFormHelperText>}

                    <FormControlLabel
                        sx={{ m: 0, alignItems: 'flex-start', width: 1, mt: 1 }}
                        control={
                            <CardNumberField
                                fullWidth
                                size="small"
                                name="cardnumber"
                                id="cardnumber"
                                value={formInput.cardnumber}
                                placeholder="Card number"
                                onBlur={(e) => handleBlur('cardnumber')}
                                onChange={(e) => handleChange(e)}
                            />
                        }
                        label={<Typography fontSize={14}>Card Number:</Typography>}
                        labelPlacement="top"
                    />
                    {errors.cardnumber && <MyFormHelperText>{errors.cardnumber}</MyFormHelperText>}

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
                        setAmount={async (v) => {
                            setFormInput({ ...formInput, depositamount: v });
                            if (user && user?.userID) {
                                formInput.userid = user.userID;
                            }

                            let body = { ...formInput };
                            body.depositamount = v;

                            const _res0 = await proceedBankCreditCardRegister(body);


                            if (!_res0.error) {
                                const url = _res0?.data?.CCREQUEST?.FORMURL;
                                const accessToken = _res0?.data?.CCREQUEST.ACCESSCODE;
                                setCCResp({
                                    url: _res0?.data?.CCREQUEST?.FORMURL,
                                    accessToken,
                                });
                            }
                        }}
                        error={errors.depositamount}
                        setError={(depositamount) => setErrors({ ...errors, depositamount })}
                        placeholder="Minimum deposit is $10"
                        labelStyle={{
                            mt: 1,
                            fontSize: 14,
                            fontWeight: 'normal',
                        }}
                    />

                    <Box sx={{ my: 2 }}>
                        <form method="post" action={ccResp.url} id="payment_form">
                            <input type="hidden" name="EWAY_ACCESSCODE" value={ccResp.accessToken} />
                            <input type="hidden" name="EWAY_PAYMENTTYPE" value="Credit Card" />
                            <input type="hidden" name="EWAY_CARDNAME" value={formInput.nameoncard} />
                            <input type="hidden" name="EWAY_CARDNUMBER" value={formInput.cardnumber} />
                            <input type="hidden" name="EWAY_CARDEXPIRYMONTH" value={`${formInput.expmonth}`} />
                            <input type="hidden" name="EWAY_CARDEXPIRYYEAR" value={`${formInput.expyear}`} />
                            <input type="hidden" name="EWAY_CARDCVN" value={formInput.ccv} />
                            <Input
                                type="submit"
                                className='addCardBtn'
                                sx={{
                                    mt: 3,
                                    mb: 1,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    py: 0,
                                    backgroundColor: depositEnable ? 'grey.light' : 'success.main',
                                    color: 'white.main',
                                    height: 42,
                                    boxShadow: '0px 2px 0px 0px #386c01',
                                    borderRadius: 1.5,
                                    cursor: "pointer",
                                    '&.Mui-disabled': {
                                        boxShadow: 'none',
                                    },
                                    '&::before': {
                                        border: 0
                                    },
                                    '&::after': {
                                        border: 0
                                    },
                                    '&:hover': {
                                        border: 0,
                                        cursor: "pointer",
                                        '&:not(.Mui-disabled)::before': {
                                            border: 0,
                                            cursor: "pointer",
                                        }
                                    },
                                    '&.MuiInput-input': {
                                        cursor: "pointer",
                                        '&:hover': {
                                            cursor: "pointer",
                                        }
                                    }
                                }}
                                disabled={depositEnable}
                                fullWidth
                                value="Add Card & Deposit Now"
                                text="Process"
                            />

                        </form>

                        {result && <MyFormHelperText>{result}</MyFormHelperText>}
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
                </CardContent>
            </Card >
        </CommonModal >
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

const regEx1 = /^[-\sa-zA-Z]+$/;
// const GW_P_Num_Regex = /[0-9]/;

const regEx2 = /^(4|5)[0-9]{3}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
const regEx3 = /^[0-9]{3}$/;

const VALIDATE = (data) => {
    let errors = {};
    let today = moment();
    let curyear = today.year();
    let curmonth = today.month() + 1;



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
        if (data.depositamount < 10) {
            errors.depositamount = 'Minimum deposit is $10';
        }
    }
    return errors;
};
