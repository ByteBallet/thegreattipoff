import React, { useContext, useCallback, useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    TextField,
    Checkbox,
    FormControlLabel,
    Container,
    Button,
} from '@mui/material';
import {
    CheckOutlined,
    KeyboardArrowLeftOutlined,
    KeyboardArrowRightOutlined,
} from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import CommonModal from './Common/CommonModal';
import { InputAdornment } from '@mui/material';
import Image from 'next/image';
import { CardSelect } from './Common/CreditCardSelect';
import { UserContext } from '../../Context/User/UserProvider';
import { fetchCreditCards } from '../../lib/fetcher';
import { useRouter } from 'next/router';
import { proceedBankCreditCardDeposit } from '../../lib/deposit';
import { MyFormHelperText2 } from './common/MyFormHelperText';
import { SuccessInfoPanel, SuccessPanel } from './SuccessForm';
import { CancelRounded } from '@mui/icons-material';
import { getSession } from 'next-auth/client';
import updateUserSession from '@Components/utils/updateUserSession';
import NumberFormat from 'react-number-format';
import { isHotBetWidget } from '@Components/utils/util';

export const QuickBetSuccessForm = (props) => { };

const getBalanceString = (balance) => {
    return balance ? balance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    }) : '$0.00';
}

export default function QuickDepositModal(props) {
    const { open, onClose, betamount, betslipClose, handleAlertClick } = props;
    const { user, addUser } = useContext(UserContext);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState({});
    const [selectedCard, setSelectedCard] = useState(null);
    let isGTO = process.env.APP_BRAND == 'gto';

    let init_state = {
        status: 0,
        amount: '',
        cvv: ""
    }
    const [values, setValues] = useState(init_state);

    const _fetchCreditCards = async () => {
        const _result = await fetchCreditCards({
            clientid: user?.clientID,
            sourcescreen: 'quickdeposit',
            userid: user?.userID
        });
        if (
            (_result && !_result.creditcards) ||
            (_result.creditcards && _result.creditcards.length < 1)
        ) {
            return;
        }

        if (_result && _result.creditcards) {
            if (_result.creditcards == {}) setCards([]);
            else {
                setCards(_result.creditcards);
            }
        }
    }

    useEffect(() => {
        if (open) {
            setValues({
                status: 0,
                cvv: "",
                amount: betamount == 0 ? "" : betamount,
            })
            if (user?.clientID) {
                _fetchCreditCards();
            }
        }
    }, [open]);

    useEffect(() => {
        if (cards.length > 0) {
            // setValues({ ...values, selectedCard: cards[0] });
            setSelectedCard(cards[0]);
        }
    }, [cards]);

    const updateData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let _body = {
            clientid: user?.clientID,
            cardID: selectedCard.ccid,
            depositamount: values.amount,
            ccv: values.cvv,
            userid: user?.userID
        };
        const _res0 = await proceedBankCreditCardDeposit(_body);
        let _result = _res0.data;
        if (_res0.error) {
            setResult({
                status: 403,
                msg: _res0.desc,
            });
        } else if (_result.ERROBJ) {
            if (_result.ERROBJ.ERRORCODE === 0) {
                setResult({
                    status: 0,
                    msg: 'Successful',
                });
                //update session
                updateUserSession(false).then(() => {
                    updateData();
                })
                onClose()
                handleAlertClick(_result.DEPOSITAMOUNT)
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
            setResult({});
        };
        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    const handleValidate = (data) => {
        let _errors = {};
        if (!data.amount) {

        }
        else {
            const val = parseFloat(data.amount);
            if (!val) {
                _errors.amount = "Invalid amount entered";
            } else if (val < 5.0) {
                _errors.amount = "Minimum deposit amount is $5";
            }
        }

        if (!data.ccv) {
        } else {
            const val = parseInt(data.ccv);
            if (!val) {
                _errors.ccv = "Enter valid CCV";
            } else if (data.ccv.length < 3) {
                _errors.ccv = "Enter valid CCV";
            }
        }
        return _errors;
    };

    const handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'amount') {
            value = value.replace(/[^\d.]/g, '');
        } else if (name == 'ccv') {
            value = value.replace(/[^\d]/g, '');
            value = value.substr(0, 3);
        }
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleBlur = e => {
        let _errors = handleValidate(values);
        if (e.target.name == 'amount' && Boolean(parseFloat(values.amount))) {
            setValues({
                ...values,
                amount: parseFloat(values.amount).toFixed(2)
            })
        }
        setErrors({
            ...errors,
            [e.target.name]: _errors[e.target.name]
        });
    }

    return (
        <CommonModal
            open={open}
            onClose={onClose}
            title="Quick Deposit"
        >
            {values.status == 0 && (
                <React.Fragment>
                    <Box mx={2} pt={1}>
                        <AlertPanel
                            status={403}
                            msg={`Insufficient Funds. Your available balance is ${getBalanceString(
                                user.balance
                            )}`}
                        />
                    </Box>
                    <Container
                        sx={{ px: 2 }}
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        {
                            cards.length > 0 &&
                            <React.Fragment>
                                <CreditCardPanel
                                    cards={cards}
                                    selectedCard={selectedCard}
                                    setSelectedCard={setSelectedCard}
                                />
                                <DepositAmountPanel
                                    values={values}
                                    betamount={betamount}
                                    setValues={setValues}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    cards={cards}
                                />
                            </React.Fragment>
                        }

                        <OtherPaymentButtonPanel onClose={onClose} betslipClose={betslipClose} title={cards.length > 0 ? "Deposit using another payment method" : "Select deposit method"} />
                        {
                            cards.length > 0 &&
                            <SubmitButtonPanel
                                loading={loading}
                                disabled={!selectedCard || values.amount < 5 || !values.cvv}
                                handleSubmit={handleSubmit}
                            />
                        }
                        <Box pb={2} >
                            <MyFormHelperText2>{result}</MyFormHelperText2>
                        </Box>
                    </Container>
                </React.Fragment>
            )}
        </CommonModal>
    );
}

export const SuccessForm = (props) => {
    // return <Typography variant="h1">Success</Typography>;
    const {
        amount,
        onClick = () => {
            alert('not implemented yet...');
        },
    } = props;
    return (
        <Grid container justifyContent="center">
            <Grid item align="center" py={1}>
                <Image
                    src="/images/tools/VISA.png"
                    width={100}
                    height={20}
                    alt="visa"
                />
            </Grid>
            <SuccessPanel />
            <SuccessInfoPanel amt={amount} />
            <Grid item align="center" sx={{ width: 1, mt: 4, py: 2, px: 6 }}>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{
                        fontSize: 14,
                        py: 1,
                    }}
                    onClick={onClick}
                >
                    Done
                </Button>
            </Grid>
        </Grid>
    );
};
const SubmitButtonPanel = (props) => {
    const { loading = false, disabled = false, handleSubmit } = props;
    return (
        <Grid item align="center" sx={{ pb: 2, px: 6 }}>
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
                        <CircularProgress
                            color="inherit"
                            size={16}
                            sx={{ mr: 1 }}
                        />{' '}
                        Please wait...
                    </Typography>
                }
                color="success"
                variant="contained"
                onClick={handleSubmit}
                fullWidth
                size="small"
                disabled={disabled}
                sx={{
                    // mt: 3,
                    // width: 1,
                    fontSize: 14,
                    fontWeight: 'bold',
                    py: 1,
                    // mx: 6,
                    // height: 30,
                    boxShadow: '0px 2px 0px 0px #386c01',
                }}
                type="submit"
            >
                Deposit Now
            </LoadingButton>
        </Grid>
    );
};
const OtherPaymentButtonPanel = (props) => {
    const router = useRouter();
    let hbWidget = isHotBetWidget()
    let pageLink = hbWidget ? '/deposit/creditcard' : '/deposit'
    return (
        <Box
            sx={{
                // px: 3,
                pt: 1.5,
                pb: 3.5,
            }}
        >
            <Button
                variant="contained"
                color="white"
                fullWidth
                size="medium"
                sx={{
                    justifyContent: 'space-between',
                    backgroundColor: '#eeeff1',
                    alignItems: "center"
                }}
                onClick={() => {
                    props.onClose()
                    props.betslipClose()
                    router.push({ pathname: pageLink });
                }}
            >
                <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
                    {props.title}
                </Typography>
                <KeyboardArrowRightOutlined />
            </Button>
        </Box>
    );
};
const CreditCardPanel = (props) => {
    const { cards, selectedCard, setSelectedCard } = props;
    return (
        <Grid
            container
            justifyContent={'space-between'}
            alignItems="center"
            my={2}
            columnSpacing={0.5}
        >
            <Grid item xs={2.5}>
                <Image
                    src="/images/tools/VISA.png"
                    width={80}
                    height={16}
                    alt="visa"
                />
            </Grid>
            <Grid item xs>
                <CardSelect
                    type={2}
                    cards={cards}
                    value={selectedCard}
                    onChange={(v) => setSelectedCard(v.target.value)}
                />
            </Grid>
        </Grid>
    );
};

const DepositAmountPanel = (props) => {
    const { values, setValues, handleBlur, handleChange, betamount = 0, cards } = props;
    return (
        <Box sx={{ width: "100%", justifyContent: "space-between", display: "flex", alignItems: "center" }}>
            <Box sx={{ mx: 0, width: cards.length > 0 ? 2 / 3 : 1, px: 0 }}>
                <Typography sx={{ fontSize: 14, pb: 0, fontWeight: 'bold' }}>
                    Deposit Amount:
                </Typography>
                <TextField
                    fullWidth
                    sx={styles.textFieldStyle}
                    size="small"
                    id="amount"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Minimum deposit is $5'
                    inputProps={{
                        style: {
                            fontSize: 14,
                        },
                        type: 'text',
                        inputMode: 'numeric',
                    }}

                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                {
                                    Boolean(values.amount) &&

                                    <CancelRounded fontSize='small' color="grey" sx={{ padding: 0 }} onClick={() => setValues({ ...values, amount: '' })} />

                                }
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            {
                cards.length > 0 &&
                <Box sx={{ mx: 0, width: 1 / 3, px: 0, pl: 1 }}>
                    <Typography sx={{ fontSize: 14, pb: 0, fontWeight: 'bold' }}>
                        CVV:
                    </Typography>
                    <TextField
                        hiddenLabel
                        id="ccv"
                        name="ccv"
                        sx={styles.textFieldStyle}
                        placeholder="3 digits"
                        variant="outlined"
                        fullWidth
                        type="number"
                        inputProps={{
                            style: {
                                fontSize: 14,
                            },
                            type: 'text',
                            maxLength: 3,
                            inputMode: 'numeric',
                        }}
                        value={values.cvv}
                        onChange={(e) =>
                            setValues({ ...values, cvv: e.target.value })
                        }
                        onBlur={handleBlur}
                        size="small"
                    />
                </Box>

            }
        </Box>
    );
};
const AlertPanel = (props) => {
    const { status = 0, msg } = props;
    return (
        <Box
            variant="outlined"
            color="success"
            sx={{
                width: 1,
                backgroundColor: status == 0 ? 'success.light' : 'error.light',
                borderWidth: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 1,
            }}
        >
            {status == 0 ? (
                <CheckOutlined
                    sx={{
                        color: 'success.main',
                        mr: 1,

                        fontSize: 20,
                    }}
                />
            ) : (
                <ErrorIcon
                    sx={{
                        color: `error.alerttext`,
                        mr: 1,
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                />
            )}
            <Typography
                color={status == 0 ? 'success.main' : 'error'}
                sx={{ fontSize: 12 }}
            >
                {msg}
            </Typography>
        </Box>
    );
};

const checkData = (data) => {
    if (!data.amount) {
        errors.amount = 'Minimum deposit is $5.';
    } else {
        if (data.amount < 5) {
            errors.amount = 'Minimum deposit is $5.';
        }
    }
};

const styles = {
    textFieldStyle: {
        backgroundColor: 'grey.joinField',
        borderRadius: 2,
        width: '100%',
        '& input::placeholder': {
            fontSize: '13px',
        },
        height: 40,
        fontSize: 14,
        [`& fieldset`]: {
            height: 45,
            borderRadius: 2,
            borderColor: 'grey.joinBorder',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                backgroundColor: 'white.main',
            },
        },
    },
};
