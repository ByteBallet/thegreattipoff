import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CreditCardForm from './CreditCardForm';
import { isHotBetWidget } from '@Components/utils/util';
function PaymentMethods({ image, text, bBottom }) {
    const router = useRouter();
    let boxStyle = styles.listBox;
    boxStyle.borderBottom = bBottom ? 1 : 0;
    let srcImg, urlImg;
    if (image == 'visa') {
        srcImg = (
            <Image src="/images/tools/VISA.png" width={75} height={15} alt="VISA" />
        );
        urlImg = '/deposit/creditcard';
    } else if (image == 'poli') {
        srcImg = (
            <Image src="/images/tools/POLi.png" width={35} height={15} alt="POLi" />
        );
        urlImg = '/deposit/poli';
    } else if (image == 'bank') {
        srcImg = (
            <Image src="/images/tools/Bank.png" width={20} height={20} alt="Bank" />
        );
        urlImg = '/deposit/bankTransfer';
    }
    const handleClick = () => {
        router.push({
            pathname: urlImg,
        });
    }

    return (
        <Box
            sx={boxStyle}
            onClick={handleClick}>
            <Box sx={{ width: 75, display: 'flex', alignItems: 'center' }}>
                {srcImg}
            </Box>
            <Box sx={{ width: 150, ml: 4 }}>
                <Typography sx={{ fontSize: 16 }}>{text}</Typography>
            </Box>
            <Box>
                <ArrowForwardIosSharpIcon sx={{ fontSize: 14 }} />
            </Box>
        </Box>
    );
}

export default function UserPayMethod() {

    let hbWidget = isHotBetWidget()
    return (
        <Box sx={styles.container}>
            <Typography sx={{ fontWeight: 'bold', mb: hbWidget ? 0 : 4 }}>
                Deposit into your account now
            </Typography>
            {
                hbWidget ? <CreditCardForm /> :
                    <Box sx={{ width: '100%', px: 6 }}>
                        <PaymentMethods image="visa" text="Credit / Debit Card" />
                        <PaymentMethods image="poli" text="POLi" />
                        <PaymentMethods
                            image="bank"
                            text="Bank Transfer"
                            bBottom={true}
                        />
                    </Box>
            }
            {!hbWidget && <Typography
                sx={{
                    fontSize: 12,
                    color: 'grey.main',
                    mt: 4,
                    textAlign: 'center',
                }}
            >
                All transactions are secured and processed <br /> in Australian
                Dollars (AUD)
            </Typography>
            }
        </Box>
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
    listBox: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        borderTop: 1,
        borderBottom: 0,
        borderColor: 'grey.light',
        py: 1.25,
        cursor: "pointer"
    },
};
