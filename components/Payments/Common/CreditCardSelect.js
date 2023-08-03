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
    OutlinedInput,
    InputAdornment,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { SvgIcon } from '@mui/material';
import ModifyIcon from '@public/images/svg/edit.svg';
import DeleteIcon from '@public/images/svg/icon-trash2.svg';
import moment from 'moment';
import { ExpandCircleDown, KeyboardArrowDownOutlined } from '@mui/icons-material';
import { MyFormHelperText3 } from './MyFormHelperText';

const getMaskedNumber = (card) => {
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
export const CardSelect2 = (props) => {
    const { cards, ...rest } = props;
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Select
                sx={{
                    mx: 0,
                    p: 0,
                    ml: 1,
                    width: '100%',
                    height: 36,
                }}
                variant="outlined"
                {...rest}
                color="primary"
                IconComponent={null}
                inputProps={{
                    variant: 'outlined',
                    color: 'success',
                    style: {
                        fontSize: 14,
                    },
                    sx: {
                        m: 0,
                        padding: '0 !important',
                        borderColor: 'success',
                    },
                }}
                renderValue={(value) => {
                    return value ? <CreditWithExpire type={2} card={value} /> : <></>;
                }}
            >
                {cards.map((card, idx) => (
                    <MenuItem key={idx} value={card} sx={{ fontSize: 14, lineHeight: 1 }}>
                        {getMaskedNumber(card)}
                    </MenuItem>
                ))}
            </Select>
            <KeyboardArrowDownOutlined sx={{ ml: 2 }} />
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
                    {cards.map(
                        (card, idx) =>
                            card?.cmnum?.length > 0 && (
                                <MenuItem key={idx} value={card} fullWidth sx={{ fontSize: 14, lineHeight: 1 }}>
                                    <CreditWithExpireField card={card} type={3} />
                                </MenuItem>
                            )
                    )}
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
                // px:1,
                // py:0.3,
                py: 0,
                // mr:1,
                // my: 0,
                width: type == 3 ? '100%' : 'unset',

                fontSize: 14,
            }}
        >
            <FormControl>
                <Typography sx={styles.text1}>{getMaskedNumber(card)}</Typography>
            </FormControl>
            <FormLabel>
                <Typography sx={styles.text}>{getExpireInfo(card)}</Typography>
                {/* <CheckCircle
                    size="small"
                    // color="grey"
                    sx={{ fontSize: '120%', color: '#606060' }}
                /> */}
            </FormLabel>
        </FormGroup>
    );
};
const CreditWithExpire = (props) => {
    const { card, type = 1, selected = false } = props;

    // console.log('CreditWithExpire card=', card);

    return (
        <FormGroup
            row
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 0,
                my: 0,
                fontSize: 14,
            }}
        >
            <FormControl>
                <Typography sx={styles.text1}>{getMaskedNumber(card)}</Typography>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {type == 1 && (
                    <FormLabel>
                        <Typography sx={styles.text}>{getExpireInfo(card)}</Typography>
                    </FormLabel>
                )}
            </Box>
        </FormGroup>
    );
};

export default function CreditCardSelect(props) {
    const {
        cards = [],
        modifyUpCard = () => {},
        type = 1,
        removeUpCard = () => {},
        selectedCard = {},
        setSelectedCard = () => {},
        updateNotice = false,
    } = props;
    return (
        <Container sx={styles.container}>
            <Box sx={{ width: 1 }}>
                <CardSelect cards={cards} value={selectedCard} type={type} onChange={(v) => setSelectedCard(v.target.value)} />
                {updateNotice ? (
                    <MyFormHelperText3>
                        {{
                            status: 200,
                            msg: 'Your card details have been updated.',
                        }}
                    </MyFormHelperText3>
                ) : (
                    isCardExpired(selectedCard) && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: 'error.light',
                                width: 1,

                                mt: 2,
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
                <IconButton onClick={() => modifyUpCard(selectedCard)} sx={{ px: 1.5 }}>
                    {/* <EditOutlined size="small" /> */}
                    <SvgIcon component={ModifyIcon} size="small" viewBox="0 0 1000 1000" sx={{ fontSize: 18 }} color="black" />
                </IconButton>

                <IconButton onClick={() => removeUpCard(selectedCard)} sx={{ p: 0 }}>
                    <SvgIcon component={DeleteIcon} viewBox="0 0 26 26" sx={{ fontSize: 18 }} color="black" />
                </IconButton>
            </Box>
        </Container>
    );
}

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
