import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Container, Box, Grid, Typography, Button, CircularProgress } from '@mui/material';

import { UserContext } from '@Context/User/UserProvider';
import { useRouter } from 'next/router';
import {
    fetchBankCreditCards,
    fetchBankingWithdrawStatus,
} from '@lib/deposit';
import Image from 'next/image';

import { BoxDivider2 } from '../Payments/Layout/UserDepositLayout';
import CreditCardSelect from './creditcard/CreditCardSelect';
import DepositAmountPanel2 from './common/DepositAmountPanel2';
import WithdrawableInfoPanel from './common/WithdrawableInfoPanel';
import EditCardModal from '../Payments/CreditCard/EditCardModal';
import RemoveCardModal from '@Components/Payments/CreditCard/RemoveCardModal';
import MyFormHelperText, {
    MyFormHelperText2,
} from '@Components/Payments/Common/MyFormHelperText';
import moment from 'moment';
import { SvgIcon } from '@mui/material';
import ModifyIcon from '@public/images/svg/edit.svg';
import ConfirmPasswordModal from './common/ConfirmPasswordModal';


export default function CreditCardScreen(props) {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({});
    const [amount, setAmount] = useState(0);
    const [selectedCard, setSelectedCard] = useState();
    const [withdrawable, setWithdrawable] = useState();
    const [updateNotice, setUpdateNotice] = useState();
    const [allverified, setAllVerified] = useState(true);
    const [errors, setErrors] = useState({});
    const [reload, setreload] = useState(false);
    const [showDialog, setShowDialog] = useState({
        type: '',
        card: {},
    });

    const fn = async () => {
        setLoading(true);
        await _fetchWithdrawStatus(user?.clientID, 'Ccard');
        await _fetchCreditCards();
        setLoading(false);
    }

    useEffect(() => {
        fn();
    }, [])

    useEffect(() => {
        reload && fn();
    }, [reload])


    const _fetchCreditCards = async () => {
        let _res0 = await fetchBankCreditCards({
            clientid: user?.clientID,
            sourcescreen: 'withdraw',
        });

        let _result = _res0.data;
        if (_res0.error) {
        } else if (_result && _result.creditcards) {
            setCards(_result.creditcards);

            _result.creditcards.forEach((card, idx) => {
                if (!card.civ) {
                    setAllVerified(false);
                }
            });

            if (_result.creditcards.length > 0) {
                setSelectedCard(_result.creditcards[0]);
            }
        }
    };

    const _fetchWithdrawStatus = async (id, withdrawtype) => {
        if (id) {
            let _res0 = await fetchBankingWithdrawStatus({
                clientid: id,
                withdrawtype,
            });
            if (_res0.error) {

            } else {
                let _result = _res0.data;
                if (_result.ERROBJ.ERROR != 0) {
                    setWithdrawable(_result);
                } else {
                    setWithdrawable(_result);
                }
            }
        }
    };

    const handleAmountBlur = (amount0) => {
        let amount1 = amount;
        if (amount0) {
            amount1 = amount0;
        }

        let val = parseFloat(amount1);
        if (!amount1 || amount1.length == 0) {
            setErrors({
                ...errors,
                depositamount: undefined,
            });
            setResult();
            return;
        }
        if (!val) {
            setErrors({
                ...errors,
                depositamount: 'Invalid amount entered',
            });
            setResult({
                status: 404,
                msg: 'Invalid amount entered',
            });
            return;
        }


        let amt = parseFloat(amount1).toFixed(2);
        setAmount(amt);

        if (amt > withdrawable) {
            setErrors({
                ...errors,
                depositamount: `Amount exceeds your Withdrawable balance of ${getBalanceString(withdrawable)}`
            });
            setResult({
                status: 404,
                msg: `Amount exceeds your Withdrawable balance of ${getBalanceString(withdrawable)}`
            });
        } else {
            if (amt >= 10.0) {
                setErrors({
                    ...errors,
                    depositamount: undefined,
                });

                setResult();
            } else if (amt < 10 && amt == withdrawable) {

                setErrors({
                    ...errors,
                    depositamount: undefined,
                });
                setResult();

            } else {
                setErrors({
                    ...errors,
                    depositamount: 'Minimum withdrawal amount is $10',
                });
                setResult({
                    status: 404,
                    msg: 'Minimum withdrawal amount is $10'
                });
            }
        }

    }

    useEffect(() => {
        if (user && user.clientID) {
            _fetchCreditCards(user.clientID || '');
        }
    }, []);

    useEffect(() => {
        if (showDialog.type === '') {
            _fetchCreditCards(user.clientID || '');
        }
    }, [showDialog.type]);

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                if (errors.depositamount) { }
                else setResult(null);
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);


    useEffect(() => {
        const fetcha = () => {
            if (updateNotice) {
                setUpdateNotice(false);
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [updateNotice]);

    const modifyUpCard = (card) => {
        setShowDialog({ type: 'modifyCard', card });
        // alert('modify');
    };

    const removeUpCard = (card) => {
        setShowDialog({ type: 'removeCard', card });
        // alert('remove');
    };

    const confirmUpPassword = (card) => {
        setShowDialog({ type: 'confirmPassword' });
    };

    const isCardExpired = (card) => {
        let today = moment();
        let curyear = today.year();
        let curmonth = today.month() + 1;
        if (!card.cey) return false;
        // console.log('curyear, curmonth, card.cey, card.cem', curyear, curmonth, card.cey, card.cem);
        if (
            card.cey > curyear ||
            (card.cey == curyear && card.cem >= curmonth)
        ) {

        } else {
            return true;
        }
        return false;
    }
    return (
        <>
            {
                loading ?
                    <Container sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 3
                    }}>
                        <CircularProgress size={32} sx={{ color: "grey.joinBorder" }} />
                    </Container>
                    :
                    <Container
                        alignItems="center"
                        component="form"
                        // onSubmit={handleSubmit}                
                        sx={{
                            px: 0
                        }}
                    >
                        <Box item sx={{ pt: 2 }}>
                            <WithdrawableInfoPanel
                                type={1}
                                withdrawable={withdrawable}
                            />
                        </Box>
                        <BoxDivider2 />
                        <Box item sx={{ px: 2 }}>
                            <CreditCardSelectHeader />
                            {Boolean(cards) && cards.length > 0 &&
                                <CreditCardSelect
                                    cards={cards}
                                    type={1}
                                    modifyUpCard={modifyUpCard}
                                    removeUpCard={removeUpCard}
                                    selectedCard={selectedCard}
                                    setSelectedCard={setSelectedCard}
                                    updateNotice={updateNotice}
                                    allverified={allverified}
                                    setreload={setreload}

                                />}

                        </Box>
                        <BoxDivider2 />
                        <Box item sx={{ px: 2 }}>
                            <DepositAmountPanel2
                                label="Withdrawal Amount:"
                                placeholder="Enter withdrawal amount"
                                name="depositamount"
                                handleBlur={handleAmountBlur}
                                amount={amount}
                                setAmount={setAmount}
                            // error={errors.depositamount}                        
                            />
                        </Box>
                        <Box
                            item
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                pt: 2,
                                mx: 10,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                type="button"
                                size="medium"
                                fullWidth
                                disabled={
                                    isCardExpired(selectedCard) || !selectedCard || selectedCard.civ == false || !allverified || !parseFloat(amount) || errors.depositamount || !withdrawable.canwithdraw
                                }
                                onClick={() => confirmUpPassword()}
                                sx={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    py: 0,
                                    backgroundColor: 'success.main',
                                    color: 'white.main',
                                    height: 42,
                                    boxShadow: '0px 2px 0px 0px #386c01',
                                }}
                            >
                                Withdraw
                            </Button>
                        </Box>
                        {
                            result &&
                            <Box sx={{ my: 2, mx: 4 }}>
                                <MyFormHelperText2>{result}</MyFormHelperText2>
                            </Box>
                        }
                    </Container>
            }
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
                    setCards(
                        cards.filter(
                            (cdd, i) => cdd.ccid != showDialog.card.ccid
                        )
                    );
                }}
            />
            <ConfirmPasswordModal
                opened={showDialog.type == 'confirmPassword'}
                onClose={() => {
                    setShowDialog({ type: '' });
                }}
                amount={amount}
                withdrawID={selectedCard ? selectedCard.ccid : 0}
                withdrawtype="Ccard"
            />
        </>
    );
}
const CreditCardSelectHeader = (props) => {
    const { text = 'Select Card:' } = props;
    return (
        <Box sx={styles.linear}>
            <Box>
                <Typography sx={styles.title}>{text}</Typography>
            </Box>
            <Box>
                <Image
                    src="/images/tools/VISA.png"
                    width={100}
                    height={20}
                    alt="VISA"
                />
            </Box>
        </Box>
    );
};

const getBalanceString = (balance) =>
    (balance ? balance : '0').toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

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
        mb: 2,
        cursor: 'pointer',
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
    },
};
