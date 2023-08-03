import React, {
    useMemo,
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    FormGroup,
    FormControl,
    FormHelperText,
    InputLabel,
    Input,
    Switch,
    FormLabel,
    TextField,
    FormControlLabel,
    Typography,
    Container,
    CircularProgress,
} from '@mui/material';
import IDVerificationPanel from './IDVerificationPanel';
import { UserContext } from '@Context/User/UserProvider';
import CreditCardList from './components/CreditCardList';
import { fetchBankCreditCards } from '@lib/deposit';
import { getButtonIcons } from '@Components/utils/icons';
import RemoveCardModal from './RemoveCardModal';
import { fetchVerifyID } from '@lib/fetcher';
import { useRouter } from 'next/router';
import { BoxDivider2 } from '@Components/Payments/Layout/UserDepositLayout';
import { getSession } from 'next-auth/client';
import moment from 'moment';
import AddCreditCardModal from '@Components/Payments/CreditCard/AddCreditCardModal';

const VerificationForm = (props) => {
    const { user, addUser } = useContext(UserContext);
    // console.log('CreditCardForm user=', user);    
    const { clientID } = user;
    const [amount, setAmount] = useState('');
    const router = useRouter();
    const [cards, setCards] = useState([]);
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);
    const [reload, setreload] = useState(false);
    // const [isVerified, setVerified] = useState([]);
    const [updateNotice, setUpdateNotice] = useState();

    const [showDialog, setShowDialog] = useState({
        type: '',
        card: {},
    });

    let isVerified = {
        verifiedStatus: user.verified,
        verifyStatuscode: 0,
        verifyStatusdesc: ""
    }

    const _fetchCreditCards = async (id) => {
        const _res0 = await fetchBankCreditCards({
            clientid: clientID,
        });

        if (_res0.error) {
        } else {
            let _result = _res0.data;
            // console.log('creditcards data', _result);
            if (_result.ERROBJ && _result.ERROBJ.ERROR != 0) {
            } else {
                setCards(_result.creditcards);
            }
        }
        setLoading(false)
    };

    useEffect(() => {
        if (user && user.clientID) {
            setLoading(true);

            _fetchCreditCards(user.clientID);
        }
    }, []);

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                //Reset the data
                _fetchCreditCards(user.clientID || '');
                setResult(null);
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

    useEffect(() => {
        if (reload) {
            _fetchCreditCards(user.clientID || '');
        }
    }, [reload]);



    const addUpCard = () => {
        setShowDialog({ type: 'addCard' });
    };

    const removeUpCard = (card) => {
        setShowDialog({ type: 'removeCard', card });
        // alert('remove');
    };
    const handleVerifyAccount = () => {
        // alert('handleVerifyAccount');
        router.push({
            pathname: '/myaccount/verifyID',
        });
    }
    let joinDateDiff = user.joindate ? moment(moment().format('YYYY-MM-DD')).diff(moment(user.joindate), "days") : 0
    return (
        <Container
            sx={{ p: 0 }}>
            {
                loading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress color="inherit" size={24} sx={{ m: 3 }} />
                    </Box>
                    :
                    <>
                        <Box sx={{ width: '100%', px: 2 }}>
                            <Box>
                                <IDVerificationPanel isVerified={isVerified} nomsg={false} handleVerifyAccount={handleVerifyAccount} />
                            </Box>
                        </Box>
                        <BoxDivider2 />
                        <Box sx={{ p: 0, px: 2, mb: 4.5 }}>
                            <Box sx={styles.linear}>
                                <Typography sx={styles.title}>Credit/Debit Cards</Typography>
                            </Box>
                            <CreditCardList
                                cards={cards}
                                removeUpCard={removeUpCard}
                                setUpdateNotice={setUpdateNotice}
                                setreload={setreload}
                            />
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
                                    disabled={!user.verified && joinDateDiff > 3 ? true : false}
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
                        </Box>
                        <AddCreditCardModal
                            opened={showDialog.type == 'addCard'}
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
                                console.log('RemoveCardMOdal::onClose');
                            }}
                        />
                    </>
            }
        </Container>


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
        pt: 3,
        pb: 0,
        my: 0,
        // pb: 1,

    },
    addCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        // mb: 4,     
        pb: 5
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
        pb: 0.5,
    },
};

export default VerificationForm;
