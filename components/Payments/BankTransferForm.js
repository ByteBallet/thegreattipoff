import {
    Grid,
    Container,
    Box,
    Typography,
    IconButton,
    FormGroup,
    FormControlLabel,
    Snackbar,
    Select,
    Button,
    MenuItem,
    InputAdornment,
    Stack,
} from '@mui/material';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../Context/User/UserProvider';
import {
    fetchBankingClientEFT,
    proceedBankingEFTDeposit,
} from '../../lib/deposit';
import { BoxDivider2 } from './Layout/UserDepositLayout';
import Image from 'next/image';
import DepositAmountPanel from './Common/DepositAmountPanel';
import { MyFormHelperText2 } from './Common/MyFormHelperText';
import CustomDatePicker2 from './BankTransfer/CustomDatePicker2';
import BankInfoPanel from './BankTransfer/BankInfoPanel';
import SubmitButtonPanel from './Common/SubmitButtonPanel';
import MyLoadingButton from '@Components/common/MyLoadingButton';
import { DATES, MONTHS } from '@Components/utils/register.util';
import moment from 'moment';
import WithdrawInfo from '@Components/Withdraw/common/WithdrawInfo';

const CURRENT_YEAR = moment().year();
const YEARS = [...Array(1).keys()];
for (let i = 0; i < YEARS.length; i++) {
    YEARS[i] = CURRENT_YEAR - i;
}

export default function BankTransferForm(props) {
    const { user } = useContext(UserContext);
    const { clientID } = user;
    const [bankInfo, setBankInfo] = useState({
        bankname: '',
        bsb: '',
        accountname: '',
        accountnumber: '',
        depositamount: '',
        dateday: moment().date(),
        datemonth: moment().month() + 1,
        dateyear: moment().year()
    });
    // console.log('dateyear', moment().year());

    const [errors, setErrors] = useState({});
    const [result, setResult] = useState({});
    const [snackMessage, setSnackMessage] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        message: 'Bank Name Copied!',
    });

    const { open, vertical, horizontal, message } = snackMessage;

    const [loading, setLoading] = useState(false);

    // console.log('BanktransferForm user=', user);

    useEffect(() => {
        _fetchBankingClientEFT(clientID);
    }, []);

    let tt = 0;
    useEffect(() => {
        const fetcha = () => {
            if (snackMessage.open == true) {
                setSnackMessage({ ...snackMessage, open: false });
            }
        };
        tt = setTimeout(fetcha, 2000);
        return () => clearTimeout(tt);
    }, [snackMessage]);

    const _fetchBankingClientEFT = async (id) => {
        const _res = await fetchBankingClientEFT({ clientid: id });
        console.log('fetchBankingCLientEFT _result=', _res);

        if (_res.error == false) {
            setBankInfo({
                ...bankInfo,
                ..._res.data
            });
        } else {
            console.log('no data to fetchBankingClientEFT');
        }
    }


    const handleValueChange = (name, value) => {
        setBankInfo({
            ...bankInfo,
            [name]: value
        });

        if (name == 'dateday' || name == 'datemonth' || name == 'dateyear') {
            let _errors = checkData({
                ...bankInfo,
                [name]: value
            });

            setErrors({
                ...errors,
                date: _errors.date
            });
        }

    };

    const handleValueBlur = (name) => {

    }

    useEffect(() => {
        // console.log('useEffect for result, result=', result);
        const fetcha = () => {
            if (result && result.status != undefined) {
                //Reset the data                
                if (result.status === 0) {

                }
                setResult();
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (bankInfo.amount == undefined) {
            setBankInfo({ ...bankInfo, amount: '' });
            return;
        }
        setLoading(true);

        let formInput = {
            clientid: clientID,
            ...bankInfo,
        };

        let _res0 = await proceedBankingEFTDeposit(formInput);
        let _result = _res0.data;
        console.log(
            'proceedBankingEFTDeposit res=',
            _res0,
            '\n formINput=',
            formInput
        );

        if (_res0.error == false) {
            setResult({
                status: 200,
                msg: 'You have successfully notified us of your bank transfer',
            });
        } else if (_result && _result.ERROBJ) {
            setResult({
                status: 403,
                msg: _result.ERROBJ.ERRORDESC,
            });
        } else {
            setResult({
                status: 403,
                msg: '404 - Something went wrong',
            });
        }
        setLoading(false);
    };

    return (
        <Container
            sx={{ px: 0, py: 0 }}
            component="form"
            onSubmit={handleSubmit}
        >
            <Box sx={{ width: '100%', px: 2 }}>
                <HeaderBar />
                <DescriptionPanel alias={user.alias} />
                <BankInfoPanel
                    {...bankInfo}
                    alias={user.alias}
                    setSnackMessage={setSnackMessage}
                />
            </Box>

            <BoxDivider2 />
            <Box sx={{ width: '100%', px: 2 }}>
                <DepositAmountPanel
                    amount={bankInfo.depositamount}
                    setAmount={(depositamount) =>
                        setBankInfo({ ...bankInfo, depositamount })
                    }
                    placeholder='Minimum deposit is $5'
                    errormsg='Minimum deposit amount is $5'
                    error={errors.depositamount}
                    setError={(depositamount) =>
                        setErrors({ ...errors, depositamount })
                    }
                />



                <Box>
                    <Typography fontSize={14}>Date of bank transfer:</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Select value={bankInfo.dateday}
                                size="small"
                                id="dateday"
                                name="dateday"
                                onChange={(e) => {
                                    handleValueChange('dateday', e.target.value)
                                }}
                                onBlur={e => {
                                    handleValueBlur('dateday')
                                }}
                                sx={styles.textFieldStyle}
                                MenuProps={{
                                    style: {
                                        fontSize: 14,
                                    },
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
                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                            }}>
                                            {itm + 1}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={4}>
                            <Select value={bankInfo.datemonth}
                                size="small"
                                id="datemonth"
                                name="datemonth"
                                onChange={(e) => {
                                    handleValueChange('datemonth', e.target.value)
                                }}
                                onBlur={e => {
                                    handleValueBlur('datemonth')
                                }}
                                sx={styles.textFieldStyle}
                                MenuProps={{
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
                                        value={item.value}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                            }}>
                                            {item.label}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={4}>
                            <Select value={bankInfo.dateyear}
                                size="small"
                                id="dateyear"
                                name="dateyear"
                                onChange={(e) => {
                                    handleValueChange('dateyear', e.target.value)
                                }}
                                onBlur={e => {
                                    handleValueBlur('dateyear')
                                }}
                                sx={styles.textFieldStyle}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: '70vh',
                                        },
                                    },
                                }}
                                fullWidth
                                InputProps={{
                                    style: {
                                        fontSize: 14,
                                    },
                                }}
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
                                            value={item}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 14,
                                                }}>
                                                {item}
                                            </Typography>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Grid>
                    </Grid>
                </Box>
                <MyLoadingButton
                    loading={loading}
                    disabled={errors.date || !parseFloat(bankInfo.depositamount) || errors.depositamount
                        || bankInfo.datemonth == 0 || bankInfo.dateday == 0}
                    label="Send Notification"
                    type="submit"
                />

                {
                    result &&
                    <Box sx={{ my: 2 }}>
                        <MyFormHelperText2>{result}</MyFormHelperText2>
                    </Box>
                }
            </Box>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                // onClose={handleClose}

                sx={styles.message}
                key={vertical + horizontal}
            >
                <Button
                    variant="outlined"
                    color="success"
                    sx={{
                        width: 3 / 4,
                        backgroundColor: 'success.light',
                    }}
                >
                    {message}
                </Button>
            </Snackbar>
        </Container>
    );
}

const HeaderBar = (props) => {
    return (
        <Box sx={styles.linear}>
            <Box>
                <Typography sx={styles.title}>Bank Transfer</Typography>
            </Box>
            <Box>
                <Image
                    src="/images/tools/Bank.png"
                    width={20}
                    height={20}
                    alt="Bank"
                />
            </Box>
        </Box>
    );
};

const DescriptionPanel = (props) => {
    const { user } = useContext(UserContext);
    const { alias = user.user.ALIAS } = props;


    return (
        <Container direction="row" sx={styles.descriptions}>
            <Box item>
                <Typography sx={styles.text}>
                    You can deposit funds by electronic transfer or direct cash
                    at any National Australia Bank branch in Australia.
                </Typography>
            </Box>
            <Box item>
                <Typography sx={{ ...styles.text, fontWeight: 'bold' }}>
                    {`Use your Username (${alias}) as a reference.`}
                </Typography>
            </Box>
            <WithdrawInfo />
        </Container>
    );
};
const styles = {
    linear: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottom: 1,
        borderColor: 'grey.light',
        pt: 3,
        pb: 1,
        px: 0,
        cursor: 'pointer',
    },

    title: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 12,
    },
    text: {
        fontSize: 14,
        lineHeight: 0,
    },
    descriptions: {
        // borderBottom: 1,
        // borderColor: 'grey.light',
        px: 0,
        pb: 3,
        pt: 3,
    },
    message: {
        bottom: {
            xs: 90,
            sm: 50,
        },
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

const checkData = (data) => {
    let errors = {};


    if (!data.depositamount) {
        // errors.depositamount = 'Minimum deposit is $5.';
    } else {
        if (data.depositamount < 5) {
            errors.depositamount = 'Minimum deposit is $5';
        }
    }

    if (!data.dateday || !data.datemonth || !data.dateyear) {
        errors.date = 'Please select the date.';
    } else {
        let today = moment();
        let curyear = today.year();
        let curmonth = today.month() + 1;
        let curdate = today.date();

        if (data.dateyear < curyear ||
            (data.dateyear == curyear && data.datemonth < curmonth) ||
            (data.dateyear == curyear && data.datemonth == curmonth && data.dateday <= curdate)
        ) {

        } else {
            errors.date = 'Please select the date.';
        }
    }

    return errors;
};

