import {
    Box,
    Container,
    IconButton,
    MenuItem,
    Select,
    FormGroup,
    FormLabel,
    FormControl,
    Typography,
    Button,
    OutlinedInput,
    InputAdornment,
    Grid,
    TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { SvgIcon } from '@mui/material';
import ModifyIcon from '@public/images/svg/edit.svg';
import DeleteIcon from '@public/images/svg/icon-trash2.svg';
import { MyFormHelperText2 } from '@Components/common/MyFormHelperText';
import { proceedCreditCardVerify } from '@lib/deposit';
import MyLoadingButton from '@Components/common/MyLoadingButton';
import moment from 'moment';
import { Info, ExpandMore, ExpandLess, ExpandCircleDown } from '@mui/icons-material';
import { UserContext } from '@Context/User/UserProvider';
import CVVNumberField from '@Components/common/CVVNumberField';
import CentNumberField from '@Components/common/CentNumberField';
import { useRouter } from 'next/router';
import CreditCardVerifyMessage from '@Components/Shared/CreditCardVerifyMessage';

export default function CreditCardSelect(props) {
    const {
        cards = [],
        modifyUpCard = () => {},
        type = 1,
        removeUpCard = () => {},
        selectedCard = {},
        setSelectedCard = () => {},
        updateNotice = false,
        allverified = false,
        setreload = () => {},
    } = props;

    let isVerified = selectedCard.civ == true ? true : false;
    //    let isVerified = true;
    const { user } = useContext(UserContext);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();

    const [inputData, setInputData] = useState({
        cents: '',
        ccv: '',
    });

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);

        let body = {
            clientid: user.clientID,
            cardid: selectedCard.ccid,
            username: user.alias,
            ...inputData,
        };
        const res = await proceedCreditCardVerify(body);
        if (res.error) {
            setResult({
                status: 404,
                msg: '404 - Something went wrong.',
            });
        } else if (res?.data?.ERROBJ?.ERROR > 0) {
            setResult({
                status: 404,
                msg: res?.data?.ERROBJ?.ERRORDESC,
            });
        } else {
            let _result = res.data;
            if (_result.ERROBJ && _result.ERROBJ.ERROR == 0) {
                setInputData({
                    cents: '',
                    ccv: '',
                });
                setExpanded(false);
                setreload(true);
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        const fetcha = () => {
            if (result && result.status != undefined) {
                setResult();
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    return (
        <>
            <Container sx={styles.container}>
                <Box sx={{ flex: 1 }}>
                    <CardSelect
                        cards={cards}
                        value={selectedCard}
                        isVerified={isVerified}
                        type={type}
                        onChange={(v) => setSelectedCard(v.target.value)}
                    />

                    {updateNotice ? (
                        <MyFormHelperText2>
                            {{
                                status: 200,
                                msg: 'Your card details have been updated.',
                            }}
                        </MyFormHelperText2>
                    ) : (
                        isCardExpired(selectedCard) && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: 'error.light',
                                    width: 1,

                                    mt: 0,
                                    mb: 2,
                                    p: 1,
                                }}
                                align="center"
                            >
                                <Typography color="error.main" fontSize={14}>
                                    Card expired. Tap {process.env.APP_BRAND == 'gto' ? 'Edit' : `Verify`} to update.
                                </Typography>
                            </Box>
                        )
                    )}
                </Box>

                <Box sx={{ display: 'flex' }}>
                    {isVerified ? (
                        <>
                            <IconButton onClick={() => modifyUpCard(selectedCard)} sx={{ px: 1.5 }}>
                                {/* <EditOutlined size="small" /> */}
                                <SvgIcon component={ModifyIcon} size="small" viewBox="0 0 1000 1000" sx={{ fontSize: 18 }} color="black" />
                            </IconButton>

                            <IconButton onClick={() => removeUpCard(selectedCard)} sx={{ p: 0 }}>
                                <SvgIcon component={DeleteIcon} viewBox="0 0 26 26" sx={{ fontSize: 18 }} color="black" />
                            </IconButton>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex' }}>
                            <Button
                                variant="contained"
                                endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                                color="error"
                                size="small"
                                fullWidth
                                sx={{ ml: 1, px: 1, py: 0.8, fontSize: 14, fontWeight: '600' }}
                                onClick={() => setExpanded(!expanded)}
                            >
                                Verify
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
            {!allverified && <ProceedVerificationMessage />}
            {expanded && (
                <Container sx={{ p: 0, py: 2 }} component="form" onSubmit={handleVerify}>
                    {selectedCard && <CreditCardVerifyMessage depositdate={selectedCard.verifydate} amt={selectedCard.verifyamt} />}
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <CentNumberField
                                hiddenLabel
                                id="outlined_1"
                                placeholder="Enter Cents..."
                                sx={{ mr: 1 }}
                                inputProps={{
                                    style: {
                                        fontSize: 14,
                                        backgroundColor: 'white',
                                    },
                                    type: 'text',
                                    inputMode: 'numeric',
                                }}
                                value={inputData.cents}
                                onChange={(e) =>
                                    setInputData({
                                        ...inputData,
                                        cents: e.target.value,
                                    })
                                }
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CVVNumberField
                                hiddenLabel
                                id="outlined_2"
                                placeholder="Enter Card CCV"
                                variant="outlined"
                                fullWidth
                                inputProps={{
                                    style: {
                                        fontSize: 14,
                                        backgroundColor: 'white',
                                    },
                                    type: 'text',
                                    inputMode: 'numeric',
                                }}
                                value={inputData.ccv}
                                onChange={(e) =>
                                    setInputData({
                                        ...inputData,
                                        ccv: e.target.value,
                                    })
                                }
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MyLoadingButton
                                loading={loading}
                                disabled={inputData.cents == '' || inputData.ccv == '' || inputData.ccv.length < 3}
                                // type="submit"
                                onClick={handleVerify}
                                label="Verify Your Card"
                                size="small"
                                sx={{
                                    height: 40,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    my: 1,
                                }}
                            />
                        </Grid>
                        {result && <MyFormHelperText2>{result}</MyFormHelperText2>}
                    </Grid>
                </Container>
            )}
        </>
    );
}

const getMaskedNumber = (card) => {
    if (!card) {
        return '**** **** **** 0000';
    }
    return '**** **** **** '.concat(card.cmnum ? card.cmnum.substr(15) : '1234');
};

const getExpireInfo = (card) => {
    let cem = card.cem || 1;
    let cey = card.cey || 2004;

    return 'Exp: '
        .concat(cem < 10 ? '0' : '')
        .concat(cem)
        .concat('/')
        .concat(cey % 100);
};

const InfoAlert = () => {
    return (
        <Box sx={{ pr: 0.5, pt: 1 }}>
            <Info color="error" size="small" />
        </Box>
    );
};

export const CardSelect = (props) => {
    const { cards, type = 1, value, ...rest } = props;
    return (
        <FormControl
            color="primary"
            fullWidth
            // error="false"
            size="small"
            sx={{
                // borderColor: 'error.main',
                backgroundColor: 'white',
                pb: 2,
            }}
        >
            {cards.length == 1 ? (
                <CreditWithExpireSingleField card={cards[0]} />
            ) : (
                <Select
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: '70vh',
                            },
                        },
                    }}
                    IconComponent={ExpandCircleDown}
                    value={value}
                    variant="outlined"
                    color="primary"
                    renderValue={(value) => <CreditWithExpireField card={value} />}
                    className="Mui-focused"
                    inputProps={{
                        sx: {
                            padding: '10 12px !important',
                            // padding:1
                        },
                    }}
                    {...rest}
                >
                    {cards.map((card, idx) => (
                        <MenuItem key={idx} value={card} fullWidth sx={{ fontSize: 14, lineHeight: 1 }}>
                            <CreditWithExpireField card={card} type={3} />
                        </MenuItem>
                    ))}
                </Select>
            )}
        </FormControl>
    );
};
const CreditWithExpireSingleField = (props) => {
    const { card } = props;
    return (
        <FormGroup
            row
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
                px: 2,
                pr: 3,
                my: 0,
                width: '100%',
                fontSize: 14,
                borderRadius: 1,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'primary.main',
            }}
        >
            <Typography sx={styles.text1}>{getMaskedNumber(card)}</Typography>

            <Typography sx={styles.text}>{getExpireInfo(card)}</Typography>
        </FormGroup>
    );
};

const CreditWithExpireField = (props) => {
    const { card, type = 1 } = props;

    return (
        <FormGroup
            row
            fullWidth
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',

                py: 0,

                width: type == 3 ? '100%' : 'unset',

                fontSize: 14,
            }}
        >
            <FormControl>
                <Typography sx={styles.text1}>{getMaskedNumber(card)}</Typography>
            </FormControl>
            <FormLabel>
                {card.civ ? (
                    <Typography sx={styles.text}>{getExpireInfo(card)}</Typography>
                ) : (
                    <Typography sx={{ ...styles.text, color: 'error.main' }}>Unverified</Typography>
                )}
            </FormLabel>
        </FormGroup>
    );
};

const ProceedVerificationMessage = () => {
    // const router = useRouter();
    const [loading2, setLoading2] = useState(false);

    // const handleClick = async (e) => {
    //   setLoading2(true);
    //   router.push('/myaccount/verifications');
    // }

    return (
        <Box
            sx={{
                mx: 0,
                my: 1,
                px: 1,
                py: 1,
                backgroundColor: 'error.light',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography sx={{ color: 'error.main' }} fontSize={14}>
                Please verify your credit card/s to withdraw.
            </Typography>

            {/* <MyLoadingButton
          loading={loading2}
          onClick={handleClick}        
          size="small"
          label="Verify"      
          color="error"   
          
          sx={{           
            mt:1,
            mx:2,     
            px:3,  
            py:2.5,
            fontSize:18,
            backgroundColor:'error.main',        
            boxShadow: '0px 2px 0px 0px error.light',
          }}
          />       */}
        </Box>
    );
};

const isCardExpired = (card) => {
    let today = moment();
    let curyear = today.year();
    let curmonth = today.month() + 1;
    if (!card.cey) return false;
    // console.log('curyear, curmonth, card.cey, card.cem', curyear, curmonth, card.cey, card.cem);
    if (card.cey > curyear || (card.cey == curyear && card.cem >= curmonth)) {
    } else {
        return true;
    }
    return false;
};

const styles = {
    container: {
        // width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        // p: 1,
        // px: 2,
        mx: 0,
        ml: 0,
        mr: 0,
        pl: 0,
        pr: 0,
        // my: 2,
        // border: 1,
        // borderRadius: 2,
        // borderColor: 'success.main',
        alignItems: 'flex-start',
        // mr: 1,
    },
    text1: {
        width: 'auto',
        fontFamily: 'Roboto',
        fontSize: 14,
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: 'grey.main',
        // mr: 2,
    },
};
