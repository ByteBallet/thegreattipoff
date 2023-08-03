import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Box, Grid, Button, Container, Typography, TextField, FormControlLabel, FormGroup, InputAdornment, Fade, Snackbar } from '@mui/material';
import Image from 'next/image';
import { UserContext } from '../../Context/User/UserProvider';
import { fetchBankCreditCards, proceedBankCreditCardDeposit } from '@lib/deposit';
import { BoxDivider2 } from './Layout/UserDepositLayout';
import MyFormHelperText, { MyFormHelperText2 } from './Common/MyFormHelperText';
import CreditCardSelect from './Common/CreditCardSelect';
import EditCardModal from './CreditCard/EditCardModal';
import RemoveCardModal from './CreditCard/RemoveCardModal';
import { getButtonIcons } from '../utils/icons';
import { CancelRounded, CloseOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import DepositAmountPanel3 from './Common/DepositAmountPanel3';
import moment from 'moment';
import MyLoadingButton from '@Components/common/MyLoadingButton';
import updateUserSession from '@Components/utils/updateUserSession';
import { getSession } from 'next-auth/client';
import { isHotBetWidget } from '@Components/utils/util';
import AddCreditCardModal from './CreditCard/AddCreditCardModal';
import CustomALert from '@Components/Shared/CustomALert';
import CircularLoader from '@Components/common/CircularLoader';

export default function CreditCardForm(props) {
    let hbWidget = isHotBetWidget();
    const isGTO = process.env.APP_BRAND == 'gto';
    let minAmt = isGTO ? 10 : 5;
    const { user, addUser } = useContext(UserContext);
    const router = useRouter();
    const { clientID, alias } = user;
    // const [amount, setAmount] = useState('');
    // const [ccv, setCcv] = useState('');
    const [formInput, setFormInput] = useState({
        amount: '',
        ccv: '',
    });
    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });
    const [cards, setCards] = useState([]);
    const [result, setResult] = useState();

    const [errors, setErrors] = useState({});

    const [depositErr, setdepositErr] = useState(false)

    const [selectedCard, setSelectedCard] = useState();
    const [cardsloading, setCardsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateNotice, setUpdateNotice] = useState();

    const [showDialog, setShowDialog] = useState({
        type: 'tpye',
        card: {},
    });

    const updateData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user);
    };

    const _fetchCreditCards = async (id) => {
        setCardsLoading(true)
        const _res0 = await fetchBankCreditCards({
            clientid: clientID,
            sourcescreen: 'deposit',
            username: alias,
            userid: user?.userID,
        });

        if (_res0.error) {
        } else {
            let _result = _res0.data;
            if (_result.ERROBJ && _result.ERROBJ.ERROR != 0) {
            } else {
                setCards(_result.creditcards);

                if (_result.creditcards.length > 0) {
                    setSelectedCard(_result.creditcards[0]);
                }
            }
        }
        setCardsLoading(false)
    };

    useEffect(() => {
        if (user && user?.userID) {
            _fetchCreditCards(user.clientID || '');
        }
        if (router?.query?.status && router?.query?.status == 0) {
            setdepositErr(true)
        }
        setTimeout(() => {
            setdepositErr(false)
        }, 5000);
    }, []);

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                //Reset the data
                _fetchCreditCards(user.clientID || '');

                if (result.status == 200 && result?.depositamount && result?.bankreceipt) {
                    router.push({
                        pathname: '/deposit/success',
                        query: { type: 1, ID: '', amount: result.depositamount, token: '', receipt: result.bankreceipt },
                    });
                }
                setResult();
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    useEffect(() => {
        const fetcha = () => {
            if (updateNotice == true) {
                setUpdateNotice(false);
            }
        };
        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [updateNotice]);

    useEffect(() => {
        if (showDialog.type === '') {
            _fetchCreditCards(user.clientID || '');
        }
    }, [showDialog.type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert('handleSubmit');
        if (amount < minAmt) {
            // setError('Minimum deposit amount is $5');
            return;
        }
        if (cards.length > 0) {
            setLoading(true);
            let card = selectedCard;

            const _res0 = await proceedBankCreditCardDeposit({
                clientid: clientID,
                cardID: card.ccid,
                depositamount: formInput.amount,
                ccv: formInput.ccv,
                userid: user?.userID,
            });
            let _result = _res0.data;

            if (_res0.error) {
                setResult({
                    status: 403,
                    msg: _res0.desc,
                });
            } else if (_result.ERROBJ) {
                if (_result.ERROBJ.ERRORCODE === 0) {
                    setResult({
                        status: 200,
                        depositamount: _result.DEPOSITAMOUNT,
                        bankreceipt: _result.BANKRECEIPT,
                        msg: 'Successful',
                    });
                    //update session
                    updateUserSession(false).then(() => {
                        updateData();
                    });
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
            handleClick()
            setLoading(false);
        }
    };

    let text = cards.length > 0 ? 'Select Card:' : 'Add Card:';
    const modifyUpCard = (card) => {
        setShowDialog({ type: 'modifyCard', card });
    };
    const addUpCard = () => {
        setShowDialog({ type: 'addCard' });
    };

    const removeUpCard = (card) => {
        setShowDialog({ type: 'removeCard', card });
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
    };

    const handleBlur = (e) => {
        let _errors = handleValidate(formInput, minAmt);
        if (e.target.name == 'amount' && Boolean(parseFloat(formInput.amount))) {
            setFormInput({
                ...formInput,
                amount: parseFloat(formInput.amount).toFixed(2),
            });
        }
        setErrors({
            ...errors,
            [e.target.name]: _errors[e.target.name],
        });

        if (e.target.name == 'amount') {
        }
    };

    const addValue = (v) => {
        let kk = parseFloat(formInput.amount);

        if (!kk) {
            setFormInput({
                ...formInput,
                amount: parseFloat(v).toFixed(2),
            });
        } else {
            setFormInput({
                ...formInput,
                amount: (kk + parseFloat(v)).toFixed(2),
            });
        }

        setErrors({
            ...errors,
            amount: undefined,
        });
    };

    const isCardExpired = (card) => {
        let today = moment();
        let curyear = today.year();
        let curmonth = today.month() + 1;
        if (!card?.cey) return false;
        if (card?.cey > curyear || (card?.cey == curyear && card?.cem >= curmonth)) {
        } else {
            return true;
        }
        return false;
    };

    let numbers = [10, 25, 50, 100, 500];
    const handleClick = () => {
        setalertTip({
            ...alertTip,
            open: true,
        });
    };

    const handleAlertClose = () => {
        setalertTip({
            ...alertTip,
            open: false,
        });
    };
    console.log(result)
    return (
        <>
            <Container sx={{ px: 0, py: 0 }} id="creditcardform" name="creditcardform" component="form" onSubmit={handleSubmit}>
                {
                    depositErr &&
                    <Box my={2} px={2}>
                        <CustomALert content={"Payment Failed. Check card details"} severity="error" warning={true} isHtml={false} />
                    </Box>
                }
                <Box sx={{ width: '100%', px: 2 }}>
                    <Box sx={styles.linear}>
                        <Box>
                            <Typography sx={styles.title}>{text}</Typography>
                        </Box>
                        <Box>
                            <Image src="/images/tools/VISA.png" width={100} height={20} alt="visa" />
                        </Box>
                    </Box>
                    {
                        cardsloading &&
                        <CircularLoader />
                    }
                    {cards.length > 0 && !cardsloading && (
                        <Box sx={{ p: 0, mx: 0, mt: 4.5, mb: 4.5 }}>
                            <CreditCardSelect
                                cards={cards}
                                modifyUpCard={modifyUpCard}
                                removeUpCard={removeUpCard}
                                selectedCard={selectedCard}
                                setSelectedCard={setSelectedCard}
                                updateNotice={updateNotice}
                            />
                        </Box>
                    )}
                    {
                        // cards.length==0 &&
                        <Box item sx={styles.addCardContainer}>
                            <Button
                                variant="contained"
                                onClick={() => addUpCard()}
                                color="black"
                                size="small"
                                sx={styles.addCard}
                                startIcon={getButtonIcons('svg', 'PLUS', 12, 'white')}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Add New Card
                                </span>
                            </Button>
                        </Box>
                    }
                </Box>
                <BoxDivider2 />
                <Box sx={{ width: '100%', px: 3, pt: 2, pb: 0 }}>
                    <Box sx={{ width: '100%', justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mx: 0, width: 2 / 3, px: 0 }}>
                            <Typography sx={{ fontSize: 14, pb: 0, fontWeight: 'bold' }}>Deposit Amount:</Typography>
                            <TextField
                                fullWidth
                                sx={styles.textFieldStyle}
                                size="small"
                                id="amount"
                                name="amount"
                                value={formInput.amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={`Minimum deposit is $${minAmt}`}
                                inputProps={{
                                    style: {
                                        fontSize: 14,
                                    },
                                    type: 'text',
                                    inputMode: 'decimal',
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {Boolean(formInput.amount) && (
                                                <CancelRounded
                                                    fontSize="small"
                                                    color="grey"
                                                    sx={{ padding: 0 }}
                                                    onClick={() =>
                                                        setFormInput({
                                                            ...formInput,
                                                            amount: '',
                                                        })
                                                    }
                                                />
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box sx={{ mx: 0, width: 1 / 3, px: 0, pl: 1 }}>
                            <Typography sx={{ fontSize: 14, pb: 0, fontWeight: 'bold' }}>CVV:</Typography>
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
                                value={formInput.ccv}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                size="small"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                        {numbers.map((num, idx) => (
                            <AmountButton key={idx} number={num} onClick={() => addValue(num)} />
                        ))}
                    </Box>
                    <Box sx={{ px: 2, m: 0 }}>
                        {errors.amount ? (
                            <MyFormHelperText>{errors.amount}</MyFormHelperText>
                        ) : errors.ccv ? (
                            <MyFormHelperText>{errors.ccv}</MyFormHelperText>
                        ) : (
                            void 0
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        // pt:3,
                        px: 3,
                    }}
                >
                    <MyLoadingButton
                        loading={loading}
                        disabled={
                            isCardExpired(selectedCard) ||
                            !selectedCard ||
                            Boolean(errors.depositamount) ||
                            Boolean(errors.ccv) ||
                            !formInput.amount ||
                            !formInput.ccv
                        }
                        type="submit"
                        label="Deposit Now"
                    />
                </Box>
                {result && (
                    // <Box sx={{ my: 2, mx: 3 }}>

                    //     <MyFormHelperText2>{result}</MyFormHelperText2>
                    // </Box>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={alertTip.open}
                        autoHideDuration={5000}
                        onClose={handleAlertClose}
                        sx={{ bottom: { xs: 100, sm: 0 } }}
                        TransitionComponent={alertTip.Transition}
                        onClick={handleAlertClose}
                        message={
                            <CustomALert
                                severity={result?.status == 200 ? "success" : "error"}
                                content={result?.msg}
                                warning={true}
                                isHtml={false}
                            />
                        }
                    />
                )}
            </Container>
            <AddCreditCardModal opened={showDialog.type == 'addCard'} onClose={() => setShowDialog({ type: '' })} />
            <EditCardModal
                card={showDialog.card}
                setUpdateNotice={setUpdateNotice}
                opened={showDialog.type == 'modifyCard'}
                onClose={() => setShowDialog({ type: '' })}
            />
            <RemoveCardModal
                card={showDialog.card}
                opened={showDialog.type == 'removeCard'}
                onClose={() => {
                    setShowDialog({ type: '' });
                    setCards(cards.filter((cdd, i) => cdd.ccid != showDialog.card.ccid));
                }}
                result={result}
                setResult={setResult}
                handleClick={handleClick}
            />
        </>
    );
}

const AmountButton = (props) => {
    const { number, onClick } = props;
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const fetcha = () => {
            if (clicked) {
                setClicked(false);
            }
        };

        const tt = setTimeout(fetcha, 100);
        return () => clearTimeout(tt);
    }, [clicked]);

    return (
        <Button
            size="small"
            // variant="button"
            onClick={onClick}
            className="oddsBtn"
            sx={{
                color: 'black.main',
                backgroundColor: 'grey.tipBtn',
                '&:hover': {
                    bgcolor: 'grey.tipBtn',
                },
            }}
        >
            <Typography
                fontSize={14}
                fontWeight="600"
                sx={{
                    textAlign: 'center',
                    my: 'auto',
                    px: 1,
                }}
                color="black.main"
            >
                +${number}
            </Typography>
        </Button>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 5,
    },
    linear: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottom: 1,
        borderColor: 'grey.light',
        pt: 3,
        pb: 1,
        cursor: 'pointer',
    },
    addCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        mb: 4,
    },
    addCard: {
        width: 3 / 5,
        color: 'black',

        py: 1,
        fontSize: '1rem',
        letterSpacing: '0.02em',
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
    },
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

const handleValidate = (data, minAmt) => {
    let _errors = {};
    if (!data.amount) {
    } else {
        const val = parseFloat(data.amount);
        if (!val) {
            _errors.amount = 'Invalid amount entered';
        } else if (val < parseFloat(minAmt)) {
            _errors.amount = 'Minimum deposit amount is $' + minAmt;
        }
    }

    if (!data.ccv) {
    } else {
        const val = parseInt(data.ccv);
        if (!val) {
            _errors.ccv = 'Enter valid CCV';
        } else if (data.ccv.length < 3) {
            _errors.ccv = 'Enter valid CCV';
        }
    }
    return _errors;
};
