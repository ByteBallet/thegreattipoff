import React, { useEffect, useContext, useCallback, useState } from 'react';
import { Grid, Box, Container, Typography, Button, Link } from '@mui/material';
import Image from 'next/image';
import { CheckOutlined, Receipt } from '@mui/icons-material';
import { getButtonIcons } from '../utils/icons';
import { UserContext } from '../../Context/User/UserProvider';
import { fetchBankingPoliComplete } from '../../lib/deposit';
import updateUserSession from '@Components/utils/updateUserSession';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { CartContext } from '@Context/Cart/CartProvider';
import { getTotalbets, isHotBetWidget } from '@Components/utils/util';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';

export default function SuccessForm(props) {
    let hbWidget = isHotBetWidget();
    const { cartItems } = useContext(CartContext)
    let totalCart = getTotalbets(cartItems)
    const [openBetSlip, setopenBetSlip] = useState(false);


    const { type = 1, ID, amount, token, receipt } = props;
    const { user, addUser } = useContext(UserContext);
    const [state, setState] = useState({
        politranid: ID,
        amt: amount ?? props.AMOUNT,
        receiptnum: receipt ?? props?.RECEIPTNUM,
    });
    const { clientID } = user;
    const isLoggedin = clientID ? true : false
    const isGTO = process.env.APP_BRAND == "gto"

    const router = useRouter();

    useEffect(() => {
        if (type == 2) {
            _fetchBankingPoliComplete();
        }
    }, [type]);

    useEffect(() => {
        if (type == 2) {
            _fetchBankingPoliComplete();
        }

        updateUserSession(false).then(() => {
            updateData();
        })
    }, []);

    useEffect(() => {
        if (type == 2 && isLoggedin) {
            _fetchBankingPoliComplete();
        }
    }, [isLoggedin]);

    const updateData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user)
    };

    const _fetchBankingPoliComplete = async () => {
        if (clientID) {
            let reqBody = {
                clientid: clientID,
                politoken: token,
                userid: user?.userID,
            };
            const _res = await fetchBankingPoliComplete(reqBody);
            if (_res.error == false) {
                setState(_res.data);
            } else {
                //nothing
            }

            //update session
            updateUserSession(false).then(() => {
                updateData();
            })
        }
    }

    const handleBuyTips = () => {
        if (totalCart > 0) {
            setopenBetSlip(true)
        } else {
            router.push("/tipmarket/horse-racing-tips")
        }
    }


    return (
        <Container sx={{ px: 0, pb: 3 }}>
            <CardTypePanel type={type} />
            <Container row sx={{ px: 0 }}>
                <SuccessPanel />
                <SuccessInfoPanel {...state} parentProps={props} query={router?.query} />
                {!hbWidget && <GotoPanel isGTO={isGTO} handleBuyTips={handleBuyTips} />}
            </Container>
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </Container>
    );
}
export const CardTypePanel = ({ type = 1 }) => {
    return (
        <Container sx={styles.center}>
            {type == 1 && (
                <Image
                    src="/images/tools/VISA.png"
                    width={100}
                    height={20}
                    alt="visa"
                />
            )}
            {type == 2 && (
                <Image
                    src="/images/tools/POLi.png"
                    width={50}
                    height={20}
                    alt="POLi"
                />
            )}
            {type == 3 && (
                <Image
                    src="/images/tools/Bank.png"
                    width={20}
                    height={20}
                    alt="Bank"
                />
            )}
        </Container>
    );
};
const GotoPanel = (props) => {
    return (
        <Container direction="row" align="center" sx={{ my: 2 }}>
            {
                props?.isGTO ?
                    <Box item>
                        <Box sx={styles.gotoButton} onClick={props?.handleBuyTips}>
                            <Typography sx={styles.linkText}>Buy Tips Now</Typography>
                        </Box>
                    </Box> :
                    <React.Fragment>
                        <Box item sx={{ cursor: "pointer" }}>
                            <Link href="/racing" sx={styles.gotoButton}>
                                {getButtonIcons('svg', 'HORSES', 20)}

                                <Typography sx={styles.linkText}> Go to Racing</Typography>
                            </Link>
                        </Box>
                        <Box item sx={{ cursor: "pointer" }}>
                            <Link href="/sports" sx={styles.gotoButton}>
                                {getButtonIcons('svg', 'SOCC', 26)}

                                <Typography sx={{ ...styles.linkText, ml: 0.5 }}>
                                    {' '}
                                    Go to Sports
                                </Typography>
                            </Link>
                        </Box>
                    </React.Fragment>
            }
        </Container>
    );
};
export const SuccessPanel = (props) => {
    return (
        <Container
            direction="row"
            align="center"
            sx={{
                backgroundColor: 'success.light',
                color: 'success',
                width: 1,
                py: 3,
                px: 0,
            }}
        >
            <Box item>
                <CheckOutlined
                    color="success"
                    size="large"
                    sx={{
                        stroke: '#59ab01',
                        strokeWidth: 5,
                        fontSize: '200%',
                    }}
                />
            </Box>
            <Box item>
                <Typography
                    sx={{
                        color: 'success.main',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                >
                    Deposit Successful
                </Typography>
            </Box>
        </Container>
    );
};
export const SuccessInfoPanel = (props) => {
    const { politranid } = props;
    const amt = props?.amt || props?.parentProps.AMOUNT || props?.query?.amount
    const receiptnum = props?.receiptnum || props?.parentProps.RECEIPTNUM || props?.query?.receipt

    return (
        <Container direction="row" align="center" sx={{ pt: 2 }}>
            {amt && (
                <Box item sx={{ my: 0, py: 0, lineHeight: 0 }}>
                    <Typography
                        sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        {getCurrencyString(parseFloat(amt))} has been added to your balance
                    </Typography>
                </Box>
            )}
            {/* <Box item sx={{ my: 0, py: 0, lineHeight: 0.3 }}>
                <Typography sx={{ fontSize: 12, color: '#707070' }}>
                    {receiptnum} has been added to your balance
                </Typography>
            </Box> */}
            {politranid && (
                <Box item sx={{ mt: 1, fontSize: 16, }}>
                    <Typography sx={{}}>POLi ID: {politranid}</Typography>
                </Box>
            )}
            {receiptnum && (
                <Box item sx={{ mt: 1, fontSize: 16, }}>
                    <Typography sx={{}}>Receipt Number: {receiptnum}</Typography>
                </Box>
            )}
        </Container>
    );
};
const getCurrencyString = (balance) => {
    return (balance ? balance : '0').toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};
const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        pt: 2,
        pb: 2,
        px: 0,
    },
    gotoButton: {
        // width:1/2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'rgb(0,0,0)',
        border: 1,
        borderColor: 'black',
        borderRadius: 1,
        my: 2,
        height: 40,
        mx: 6,
        // py: 1,
        backgroundColor: 'grey.tipBtn',
        textDecoration: 'none',
    },
    linkText: {
        ml: 1,
        fontSize: 14,
        fontWeight: 'bold',
        curor: "pointer"
    },
};
