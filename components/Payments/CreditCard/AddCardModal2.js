import React, { useState, useEffect, useContext } from 'react';
import CommonModal from '../Common/CommonModal';
import DepositAmountPanel from '../Common/DepositAmountPanel';
import moment from 'moment';
import { Box, FormControlLabel, Container, FormGroup, Card, CardContent, Typography, TextField } from '@mui/material';
import Image from 'next/image';
import CustomLabelField from '../Common/CustomLabelField';
import { UserContext } from '../../../Context/User/UserProvider';
import { proceedBankCreditCardRegister } from '../../../lib/deposit';
import LoadingButton from '@mui/lab/LoadingButton';
import CustomSelect from '../../common/CustomSelect';
import CircularProgress from '@mui/material/CircularProgress';
import { MyFormHelperText2 } from '../Common/MyFormHelperText';
import MyFormHelperText from '../Common/MyFormHelperText';

import { YEARS2, MONTHS } from '../../utils/register.util';
import { useRouter } from 'next/router';
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

    const handleBlurs = (e = undefined) => {
        console.log('AddCardModal::handleBlurs');
        const _errors = checkData(formInput);
        setErrors(_errors);
    };
    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (formInput.expyear != 0 || formInput.expmonth != 0) {
            const _errors = checkData(formInput);
            setErrors(_errors);
        }
    }, [formInput.expyear, formInput.expmonth]);

    const handleSubmit = async (e) => {
        console.log('AddCardModal::handleSubmit');
        e.preventDefault();
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
                setResult({
                    status: _result.ERROBJ.ERRORCODE,
                    msg: _result.ERROBJ.ERRORDESC,
                });
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

                if (result.status === 0) {
                    router.push({
                        pathname: '/deposit/success',
                        query: {
                            amount: 600,
                            state: {
                                amount: 400,
                            },
                        },
                    });
                }
                setResult(null);
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    // console.log('AddCardModal,errors=', errors);

    return (
        <CommonModal open={opened} onClose={onClose} title="Add new Credit / Debit Card">
            <Card component="form" sx={{ backgroundColor: 'white', m: 0, p: 0 }} onSubmit={handleSubmit}>
                <CardContent>
                    <Box>
                        <Box item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Image src="/images/tools/VISA.png" width={125} height={25} alt="VISA" />
                        </Box>
                        <CustomLabelField
                            value={formInput.nameoncard}
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleBlurs(e)}
                            name="nameoncard"
                            placeholder="Cardholder's name"
                            label="Card must be in registered account holder's name:"
                            error={errors.nameoncard}
                        />
                        <CustomLabelField
                            value={formInput.cardnumber}
                            name="cardnumber"
                            type="number"
                            onChange={(e) => handleChange(e)}
                            onBlur={(e) => handleBlurs(e)}
                            placeholder="Card number"
                            label="Card Number:"
                            error={errors.cardnumber}
                        />
                        <Container
                            sx={{
                                px: 0,
                                mx: 0,
                                my: 2,
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Box item sx={{ width: 4 / 5, mx: 0 }}>
                                <FormControlLabel
                                    sx={{
                                        width: 1,
                                        m: 0,
                                        alignItems: 'flex-start',
                                    }}
                                    control={
                                        <FormGroup
                                            className={'abcd1234'}
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
                                                labelId="limit_date"
                                                id="limit_date-select"
                                                value={formInput.expmonth}
                                                data={[]}
                                                name="expmonth"
                                                placeholder="Select month"
                                                size="small"
                                                sx={{
                                                    width: 1 / 2,
                                                    fontSize: 14,
                                                }}
                                                onChange={(e) => handleChange(e)}
                                            // onBlur={handleBlur}
                                            >
                                                {MONTHS}
                                            </CustomSelect>
                                            <CustomSelect
                                                labelId="limit_date"
                                                id="limit_date-select"
                                                name="expyear"
                                                value={formInput.expyear}
                                                data={YEARS2}
                                                placeholder="Select year"
                                                size="small"
                                                // onBlur={handleBlur}
                                                sx={{
                                                    width: 1 / 2,
                                                    mx: 2,
                                                    fontSize: 14,
                                                }}
                                                onChange={(e) => handleChange(e)}
                                            ></CustomSelect>
                                        </FormGroup>
                                    }
                                    label={<Typography sx={{ fontSize: 14 }}>Expire Date</Typography>}
                                    labelPlacement="top"
                                />
                            </Box>
                            <Box item sx={{ width: 1 / 5, mx: 0 }}>
                                <FormControlLabel
                                    sx={{
                                        m: 0,
                                        alignItems: 'flex-start',
                                    }}
                                    control={
                                        <TextField
                                            hiddenLabel
                                            type="number"
                                            placeholder="3 digits"
                                            variant="outlined"
                                            size="small"
                                            name="ccv"
                                            value={formInput.ccv}
                                            inputProps={{
                                                style: { fontSize: '0.9rem' },
                                                maxLength: 3,
                                            }}
                                            onChange={(e) => handleChange(e)}
                                            onBlur={(e) => handleBlurs(e)}
                                            sx={{
                                                pr: 0,
                                                width: 1,
                                            }}
                                        />
                                    }
                                    label={<Typography sx={{ fontSize: '0.9rem' }}>CVV:</Typography>}
                                    labelPlacement="top"
                                />
                            </Box>
                            <Box item sx={{ width: 1, mx: 0 }}>
                                <MyFormHelperText>{errors.date || errors.ccv}</MyFormHelperText>
                            </Box>
                        </Container>
                    </Box>
                    asdasdasdasd
                    <DepositAmountPanel
                        amount={formInput.depositamount}
                        setAmount={(v) => setFormInput({ ...formInput, depositamount: v })}
                        error={errors.depositamount}
                        setError={(depositamount) => setErrors({ ...errors, depositamount })}
                        labelStyle={{
                            mt: 2,
                            fontSize: 14,
                            fontWeight: 'normal',
                        }}
                    />
                    <Box
                        item
                        sx={{
                            display: 'flex',
                            pt: 2,
                            justifyContent: 'center',
                        }}
                    >
                        <LoadingButton
                            loading={loading}
                            loadingIndicator={
                                <Typography
                                    color="inherit"
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
                            disabled={errors.nameoncard || errors.cardnumber || errors.ccv || errors.depositamount}
                            sx={{
                                mt: 3,

                                fontSize: 16,
                                fontWeight: 'bold',
                                py: 0,
                                mx: 6,
                                height: 42,
                                boxShadow: '0px 2px 0px 0px #386c01',
                            }}
                            type="submit"
                        >
                            Add Card & Deposit Now
                        </LoadingButton>
                    </Box>
                    <Box sx={{ my: 2 }}>{result && <MyFormHelperText2>{result}</MyFormHelperText2>}</Box>
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
            </Card>
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
    },
};

const regEx1 = /^[a-zA-Z0-9\s-]*$/;
// const GW_P_Num_Regex = /[0-9]/;

const regEx2 = /^(4|5)[0-9]{15}$/;
const regEx3 = /^[0-9]{3}$/;
const checkData = (data) => {
    let errors = {};
    let today = moment();
    let curyear = today.year();
    let curmonth = today.month() + 1;

    // console.log('checkData formInput=', curyear, curmonth, data);
    // console.log('data.expyear > curyear ', data.expyear > curyear);
    // console.log(
    //     'data.expyear == curyear && data.expmonth > curmonth',
    //     data.expyear == curyear,
    //     data.expyear == curyear && data.expmonth > curmonth
    // );

    if (!data.nameoncard) {
        errors.nameoncard = 'Please input the username';
    } else {
        if (!regEx1.test(data.nameoncard)) {
            errors.nameoncard = 'Only letters, spaces & hyphens permitted.';
        }
    }
    if (!data.expyear || !data.expmonth) {
        errors.date = 'Expire Date invalid';
    } else {
        if (data.expyear > curyear || (data.expyear == curyear && data.expmonth > curmonth)) {
        } else {
            errors.date = 'Expire Date invalid';
        }
    }
    if (!data.cardnumber) {
        errors.cardnumber = 'Please input the Card number';
    } else {
        if (!regEx2.test(data.cardnumber)) {
            errors.cardnumber = 'Card number is invalid';
        }
    }
    if (!data.ccv) {
        errors.ccv = 'CVV is invalid';
    } else if (!regEx3.test(data.ccv)) {
        errors.ccv = 'CVV is invalid';
    }

    if (!data.depositamount) {
        errors.depositamount = 'Minimum deposit is $5.';
    } else {
        if (data.depositamount < 5) {
            errors.depositamount = 'Minimum deposit is $5.';
        }
    }
    // console.log('AddCardModal::CheckData=', data, errors);
    return errors;
};
