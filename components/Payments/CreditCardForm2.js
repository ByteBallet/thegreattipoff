import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { UserContext } from '../../Context/User/UserProvider';
import {
    fetchBankCreditCards,
    proceedBankCreditCardDeposit,
} from '../../lib/deposit';
import { BoxDivider2 } from './Layout/UserDepositLayout';
import { MyFormHelperText2 } from './common/MyFormHelperText';
import CreditCardSelect from './common/CreditCardSelect';
import EditCardModal from './CreditCard/EditCardModal';
import RemoveCardModal from './CreditCard/RemoveCardModal';
import { getButtonIcons } from '../utils/icons';
import { useRouter } from 'next/router';
import DepositAmountPanel3 from './Common/DepositAmountPanel3';
import MyLoadingButton from '@Components/common/MyLoadingButton';
import AddCreditCardModal from './CreditCard/AddCreditCardModal';



export default function CreditCardForm(props) {
    const { user } = useContext(UserContext);
    // console.log('CreditCardForm user=', user);
    const router = useRouter();
    const { clientID } = user;
    // const [amount, setAmount] = useState('');
    // const [ccv, setCcv] = useState('');
    const [formInput, setFormInput] = useState({
        amount: '',
        ccv: '',

    });
    const [cards, setCards] = useState(
        [
            //  {
            //             cb: "NIL",
            //             ccid: 17140,
            //             cct: "",
            //             cem: 5,
            //             cey: 2022,
            //             civ: true,
            //             cmnum: "5555 #### #### 5555",
            //             cn: "qwergfhd",
            //             ct: "Mastercard",
            //             md: 500,
            //         },

            //         {

            //             cb: "NIL",
            //             ccid: 17178,
            //             cct: "17178",
            //             cem: 6,
            //             cey: 2023,
            //             civ: false,
            //             cmnum: "4503 #### #### 0303",
            //             cn: "CardHolder2",
            //             ct: "Visa",
            //             md: 500,
            //         }
        ]
    );
    const [result, setResult] = useState({});

    const [errors, setErrors] = useState({

    });

    const [selectedCard, setSelectedCard] = useState(
        //  {
        //       cb: "NIL",
        //       ccid: 17140,
        //       cct: "",
        //       cem: 5,
        //       cey: 2022,
        //       civ: true,
        //       cmnum: "5555 #### #### 5555",
        //       cn: "qwergfhd",
        //       ct: "Mastercard",
        //       md: 500,
        //   }
    );
    const [loading, setLoading] = useState(false);
    const [updateNotice, setUpdateNotice] = useState();

    const [showDialog, setShowDialog] = useState({
        type: '',
        card: {},
    });

    const _fetchCreditCards = async (id) => {
        const _res0 = await fetchBankCreditCards({
            clientid: clientID,
        });
        console.log(
            'fetchBankCreditCards clientID=',
            clientID,
            ', result=',
            _res0
        );

        if (_res0.error) {
        } else {
            let _result = _res0.data;
            console.log('creditcards data', _result);
            if (_result.ERROBJ && _result.ERROBJ.ERROR != 0) {
            } else {
                setCards(_result.creditcards);

                if (_result.creditcards.length > 0) {
                    setSelectedCard(_result.creditcards[0]);
                }
            }
        }
    };

    useEffect(() => {
        console.log('CreditCardFomr::useEffect, init user=', user);
        if (user && user.clientID) {
            _fetchCreditCards(user.clientID || '');
        }
    }, []);

    useEffect(() => {
        // console.log('CreditCardFomr::useEffect, result=', result);
        const fetcha = () => {
            if (result) {
                //Reset the data
                _fetchCreditCards(user.clientID || '');

                if (result.status == 0) {
                    router.push({
                        pathname: '/deposit/success',
                        query: { type: 1, amount, id: 123 },
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
            if (updateNotice) {
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
        if (amount < 5) {
            setError('Minimum deposit amount is $5');
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
                userid: user?.userID
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
                        status: 0,
                        msg: 'Successful',
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

    const handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'amount') {
            value = value.replace(/[^\d.]/g, '');
        } else if (name == 'ccv') {
            value = value.replace(/[^\d]/g, '');
        }
        setFormInput({
            ...formInput,
            [name]: value,
        });
    }

    const handleBlur = e => {
        let _errors = handleValidate(formInput);
        console.log('HandleValidate _errors= ', _errors);
        if (e.target.name == 'amount' && Boolean(parseFloat(formInput.amount))) {
            setFormInput({
                ...formInput,
                amount: parseFloat(formInput.amount).toFixed(2)
            })
        }
        setErrors({
            ...errors,
            [e.target.name]: _errors[e.target.name]
        });

        if (e.target.name == 'amount') {

        }
    }


    return (
        <>
            <Container
                sx={{ px: 0, py: 0 }}
                id="creditcardform"
                name="creditcardform"
                component="form"
                onSubmit={handleSubmit}
            >
                <Box sx={{ width: '100%', px: 2 }}>
                    <Box sx={styles.linear}>
                        <Box>
                            <Typography sx={styles.title}>{text}</Typography>
                        </Box>
                        <Box>
                            <Image
                                src="/images/tools/VISA.png"
                                width={100}
                                height={20}
                                alt="visa"
                            />
                        </Box>
                    </Box>
                    {
                        cards.length > 0 &&
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
                    }

                    {
                        // cards.length==0 &&
                        <Box item sx={styles.addCardContainer}>
                            <Button
                                variant="contained"
                                onClick={() => addUpCard()}
                                color="black"
                                size="small"
                                sx={styles.addCard}
                                startIcon={getButtonIcons(
                                    'svg',
                                    'PLUS',
                                    12,
                                    'white'
                                )}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Add New Card
                                </span
                                >
                            </Button>
                        </Box>
                    }
                </Box>
                <BoxDivider2 />
                <Box sx={{ width: '100%', px: 3, pt: 2, pb: 0 }}>

                    <DepositAmountPanel3
                        placeholder="Minimum deposit is $5"
                        label='Deposit Amount:'
                        formInput={formInput}
                        setFormInput={setFormInput}
                        errors={errors}
                        setErrors={setErrors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    <Box
                        item
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 3,
                        }}
                    >
                        <MyLoadingButton
                            loading={loading}
                            disabled={
                                !selectedCard ||
                                Boolean(errors.depositamount) ||
                                Boolean(errors.ccv) ||
                                !formInput.amount ||
                                !formInput.ccv
                            }
                            label="Deposit Now"
                        />
                    </Box>
                    {
                        result &&
                        <Box sx={{ my: 2 }}>
                            <MyFormHelperText2>{result}</MyFormHelperText2>
                        </Box>
                    }

                </Box>
            </Container>
            <AddCreditCardModal
                opened={showDialog.type == 'addCard'}
                onClose={() => setShowDialog({ type: '' })}
            // setDepositState={setDepositState}
            />
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
                result={result}
                setResult={setResult}
            />
        </>
    );
}

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
};

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