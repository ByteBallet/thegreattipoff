import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Image from 'next/image';
import { useRouter } from 'next/router';
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PendingWithdrawPanel from '@Components/Withdraw/common/PendingWithdrawalPanel';
import { UserContext } from '@Context/User/UserProvider';
import { fetchBankingWithdrawStatus } from '@lib/deposit';
function PaymentMethods({ image, text, bBottom, onClick = () => { } }) {
    let boxStyle = styles.listBox;
    boxStyle.borderBottom = bBottom ? 1 : 0;
    let srcImg;
    if (image == 'visa')
        srcImg = (
            <Image
                src="/images/tools/VISA.png"
                width={100}
                height={20}
                alt="Visa"
            />
        );
    if (image == 'poli')
        srcImg = (
            <Image src="/images/tools/POLi.png" width={50} height={20} alt="POLi" />
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
            <Box sx={{ width: 150, ml: 4, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 14 }}>{text}</Typography>
            </Box>
            <Box>
                {/* <ArrowForwardIosSharpIcon sx={{ fontSize: 14 }} /> */}
                <KeyboardArrowRightOutlinedIcon fontSize="20" sx={{ mt: 1 }} />
            </Box>
        </Box>
    );
}

export default function UserDepositMethod() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const [withdrawable, setWithdrawable] = useState();
    const { clientID } = user;
    const [result, setResult] = useState(
        //   {
        //   status:200,
        //   msg:'Your withdrawal has been cancelled. $10.00 has been added to your balance.'
        // }
    );

    const _fetchWithdrawStatus = async (clientid) => {
        setLoading(true);
        let withdrawtype = 'EFT';
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
        setLoading(false);
    };

    useEffect(() => {
        clientID && _fetchWithdrawStatus(clientID);
    }, [clientID]);

    useEffect(() => {
        // console.log('useEffect for result, result=', result);

        const fetcha = () => {
            if (result) {
                setResult();
            }
        };
        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);
    const isGTO = process.env.APP_BRAND == "gto"
    return (
        <>
            {
                loading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress color="inherit" size={24} sx={{ m: 3 }} />
                    </Box>
                    :
                    <Container sx={{ px: 3, py: 4, mt: 3 }}>
                        <Box sx={{}}>
                            <PendingWithdrawPanel
                                withdrawable={withdrawable}
                                postExecute={(v) => {
                                    _fetchWithdrawStatus(clientID, 'EFT');
                                    setResult(v)
                                }}
                            />
                        </Box>
                        <PaymentMethods
                            image="visa"
                            text="Credit / Debit Card"
                            onClick={() =>
                                router.push({ pathname: '/deposit/creditcard' })
                            }
                        />
                        <PaymentMethods
                            image="poli"
                            text="POLi"
                            onClick={() => router.push({ pathname: '/deposit/poli' })}
                            bBottom={isGTO ? true : false}
                        />
                        {
                            !isGTO &&
                            <PaymentMethods
                                image="bank"
                                text="Bank Transfer"
                                onClick={() =>
                                    router.push({
                                        pathname: '/deposit/bankTransfer',
                                    })
                                }
                                bBottom={true}
                            />
                        }
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
