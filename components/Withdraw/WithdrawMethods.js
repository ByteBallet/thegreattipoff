import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { UserContext } from '../../Context/User/UserProvider';
import { fetchBankCreditCards } from '../../lib/deposit';
import PendingWithdrawPanel from './common/PendingWithdrawalPanel';
import MyFormHelperText, { MyFormHelperText2 } from '@Components/common/MyFormHelperText';
import { fetchBankingWithdrawStatus } from '@lib/deposit';
export default function WithdrawMethods() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const { clientID } = user;
    const [cards, setCards] = useState([]);
    const [withdrawable, setWithdrawable] = useState();
    const [result, setResult] = useState(
        //   {
        //   status:200,
        //   msg:'Your withdrawal has been cancelled. $10.00 has been added to your balance.'
        // }
    );

    const _fetchCreditCards = useCallback(
        async (id) => {

            const _res0 = await fetchBankCreditCards({ clientid: id });

            let _result = _res0.data;
            if (_res0.error) {
            } else if (_result && _result.creditcards) {
                if (_result.creditcards.length > 0) {
                    setCards(_result.creditcards);
                }
            }

        },
        [clientID]
    );

    const _fetchWithdrawStatus = useCallback(async (clientid) => {


        // First check if Bank Transfer withdraw exists
        let withdrawtype = 'EFT';
        if (clientid) {
            let _res0 = await fetchBankingWithdrawStatus({
                clientid,
                withdrawtype,
            });

            if (_res0.error) {
            } else {
                let _result = _res0.data;

                if (_result.pendingamt <= 0) {
                    // if NO EFT withdraw then check Credit Card
                    let withdrawtype = 'Ccard';
                    let _res0 = await fetchBankingWithdrawStatus({
                        clientid,
                        withdrawtype,
                    });

                    if (_res0.error) {
                    } else {
                        let _result = _res0.data;

                        if (_result.pendingamt <= 0) {
                            setWithdrawable({});
                        } else {
                            // Show Ccard prending withdraw panel
                            setWithdrawable(_result);
                        }
                    }
                } else {
                    // Show EFT prending withdraw panel
                    setWithdrawable(_result);
                }
            }
        }
    }, []);

    useEffect(() => {

        const fetcha = () => {
            if (result) {
                setResult();
            }
        };
        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    useEffect(() => {
        const fn = async (clientid) => {

            await _fetchWithdrawStatus(clientid);
            await _fetchCreditCards(clientid);
            setLoading(false);

        }
        fn(clientID);
    }, []);

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
                    <Container sx={{ px: 3, py: 4, mt: 4 }}>
                        <Box sx={{}}>

                            <PendingWithdrawPanel
                                withdrawable={withdrawable}
                                postExecute={(v) => {
                                    _fetchWithdrawStatus(clientID);
                                    setResult(v);
                                }}
                            />
                        </Box>
                        <WithdrawMethod
                            image="bank"
                            text="Bank Transfer"
                            onClick={() =>
                                router.push({
                                    pathname: '/withdraw/bankTransfer',
                                })
                            }
                            bBottom={(cards && cards.length > 0) ? false : true}
                        />
                        {cards && cards.length > 0 && (
                            <WithdrawMethod
                                image="visa"
                                text="Credit / Debit Card"
                                onClick={() =>
                                    router.push({ pathname: '/withdraw/creditcard' })
                                }
                                bBottom={true}
                            />
                        )}
                    </Container>
            }
            {
                Boolean(result) &&
                <Box sx={{
                    width: '100%',
                    px: 4,
                    position: 'fixed',
                    bottom: 80,

                }}>
                    {/* <MyFormHelperText2>{result}</MyFormHelperText2> */}
                    <Box sx={{
                        px: 3,
                        py: 1,
                        backgroundColor: result.status != 200 ? 'error.light' : 'success.light',
                        borderColor: result.status != 200 ? 'error.main' : 'success.main',
                        borderRadius: 2,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        color: 'error.main',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Typography sx={{ color: result.status != 200 ? 'error.main' : 'success.main' }} fontSize={14}>{result.msg}</Typography>
                    </Box>
                </Box>
            }
        </>
    );
}

function WithdrawMethod({ image, text, bBottom, onClick = () => { } }) {
    let boxStyle = styles.listBox;
    boxStyle.borderBottom = bBottom ? 1 : 0;
    let srcImg;
    if (image == 'visa')
        srcImg = (
            <Image
                src="/images/tools/VISA.png"
                width={90}
                height={18}
                alt="VISA"
            />
        );
    if (image == 'bank')
        srcImg = (
            <Image src="/images/tools/Bank.png" width={20} height={20} alt="Bank" />
        );

    return (
        <Box sx={boxStyle} onClick={onClick}>
            <Box sx={{ width: 100, display: 'flex', alignItems: 'center' }}>
                {srcImg}
            </Box>
            <Box sx={{ width: 150, ml: 4 }}>
                <Typography sx={{ fontSize: 14 }}>{text}</Typography>
            </Box>
            <Box>
                <ArrowForwardIosSharpIcon sx={{ fontSize: 14 }} />
            </Box>
        </Box>
    );
}
const styles = {
    listBox: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        borderTop: 1,
        borderBottom: 0,
        borderColor: 'grey.light',
        py: 2,
        pl: 1,
        cursor: 'pointer',
    },
};
