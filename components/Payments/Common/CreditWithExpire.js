import React from 'react';
import {
    FormGroup,
    Box,
    FormLabel,
    FormControl,
    Container,
} from '@mui/material';
import { CheckCircle, CheckOutlined } from '@mui/icons-material';

const getMaskedNumber = (card) => {
    return '**** **** **** '.concat(
        card.cmnum ? card.cmnum.substr(15) : '1234'
    );
};
const getExpireInfo = (card) => {
    return 'Exp: '
        .concat(card.cem < 10 ? '0' : '')
        .concat(card.cem)
        .concat('/')
        .concat(card.cey % 100);
};
export const CreditLabel = (props) => {
    const { card } = props;
    return (
        <FormGroup row sx={styles.container}>
            <FormLabel sx={styles.text1}>{getMaskedNumber(card)}</FormLabel>
        </FormGroup>
    );
};
export default function CreditWithExpire(props) {
    const {
        card = {
            cb: '',
            ccid: 0,
            cct: '0',
            cem: 0,
            cey: 0,
            civ: false,
            cmnum: '0',
            cn: '0',
            ct: '0',
        },
        selected = false,
    } = props;
    // console.log('CreditWithExpire card=', card);
    return (
        <FormGroup
            row
            sx={{
                ...styles.container,
                borderColor: selected ? 'success.main' : '#d0d0d0',
            }}
        >
            <FormLabel sx={styles.text1}>{getMaskedNumber(card)}</FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormLabel sx={styles.text}>{getExpireInfo(card)}</FormLabel>
                <CheckCircle
                    color={selected ? 'success' : 'grey'}
                    size="small"
                    sx={{ fontSize: '120%' }}
                />
            </Box>
        </FormGroup>
    );
}
const styles = {
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        p: 1,
        px: 2,
        border: 1,
        borderRadius: 2,
        borderColor: 'grey.light',
        backgroundColor: 'grey.joinField',
        alignItems: 'center',
        mr: 1,
    },
    text1: {
        width: 'auto',
        fontFamily: 'Roboto',
        fontSize: 14,
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 14,
        mr: 2,
    },
};
