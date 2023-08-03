import { FormControl, Container, Typography, Box, TextField, InputAdornment } from '@mui/material';

import CommonModal from '../../Payments/Common/CommonModal';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { signIn } from 'next-auth/client';
import { getSession } from 'next-auth/client';
import { UserContext } from '../../../Context/User/UserProvider';
import InputTextField2 from '../../common/InputTextField2';
import MyFormHelperText, {
    MyFormHelperText2,
} from '../../Payments/Common/MyFormHelperText';
import MyLoadingButton from '../../Payments/Common/MyLoadingButton';
import { proceedBankingWithdraw } from '../../../lib/deposit';
import { useRouter } from 'next/router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import MyLoadingButton from '@Components/common/MyLoadingButton';

export default function ConfirmPasswordModal(props) {
    const {
        opened = false,
        onClose = () => { },
        withdrawID = '',
        withdrawtype = '',
        amount = 0,
    } = props;
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const [result, setResult] = useState(null);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState();
    const { clientID } = user;
    const router = useRouter();
    // console.log('ConfirmPasswordModal user=', user);

    const handleSubmit = async (e) => {
        // console.log('ConfirmPasswordModal Submit');
        e.preventDefault();
        setLoading(true);
        let body = {
            clientid: clientID,
            withdrawtype: withdrawtype,
            password,
            withdrawamt: amount,
            withdrawID: withdrawID,
        };
        const _res0 = await proceedBankingWithdraw(body);
        // console.log('proceedBankingWithdraw res=', _res0);
        if (_res0.error) {
            setResult({
                status: 403,
                msg: '404 - Something went wrong',
            });
        } else {
            let _result = _res0.data;

            if (_result.ERROBJ.ERRORCODE != 0) {
                setResult({
                    status: _result.ERROBJ.ERRORCODE,
                    msg: _result.ERROBJ.ERRORDESC,
                });
            } else {
                //
                setResult(null);
                router.push({
                    pathname: '/withdraw/success',
                    query: { type: withdrawtype == 'Ccard' ? 1 : withdrawtype == 'EFT' ? 3 : 2, withdrawamt: amount, transid: _result.bankreceipt },
                });
                //  onClose();
            }
        }
        setLoading(false);
    };

    const handleBlur = (name) => {

    }
    useEffect(() => {
        // console.log('useEffect for result, result=', result);
        const fetcha = () => {
            if (result) {
                //Reset the data
                setResult();

                if (result.status != 403) {
                    // router.push({
                    //     pathname: '/withdraw/success',
                    //     query: { type: withdrawtype=='Ccard'?1:withdrawtype=='EFT'?3:2, amount, id: 123 },
                    // });
                }
            }
        };

        const tt = setTimeout(fetcha, 8000);
        return () => clearTimeout(tt);
    }, [result]);

    useEffect(() => {
        setResult(null);
        setPassword('');
    }, []);

    return (
        <CommonModal open={opened} onClose={onClose} title="Confirm Withdrawal">
            <Container
                component="form"
                onSubmit={handleSubmit}
                sx={{ py: 1, px: 2 }}
                align="center"
            >
                <Typography sx={{ fontSize: 14 }}>
                    Enter your account password to confirm your withdrawal of{' '}
                    ${getBalanceString(amount)}
                </Typography>
                <Box sx={{ px: 4, py: 2 }}>
                    <TextField
                        fullWidth
                        sx={styles.textFieldStyle}
                        size="small"
                        placeholder="Enter Password"
                        value={password}
                        error={Boolean(error)}
                        onChange={e => setPassword(e.target.value)}
                        onBlur={e => () => { }}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment postion="end"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <VisibilityOffIcon color="secondary.light" />
                                    ) : (
                                        <VisibilityIcon color="secondary.light" />
                                    )}
                                </InputAdornment>
                            )

                        }}
                    />
                </Box>
                <MyFormHelperText>{error}</MyFormHelperText>

                <Box item sx={{ px: 3, py: 2 }}>
                    <MyLoadingButton
                        loading={loading}
                        disabled={password == ''}
                        label="Confirm"
                        type="submit"
                    // size="small"
                    />
                </Box>
                {result && (
                    <Box item sx={{ py: 2, px: 3 }}>
                        <MyFormHelperText2>{result}</MyFormHelperText2>
                    </Box>
                )}
            </Container>
        </CommonModal>
    );
}

const getBalanceString = (balance) =>
    (balance ? balance : '0').toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });

const styles = {
    textFieldStyle: {
        backgroundColor: 'grey.joinField',
        borderRadius: 2,

        '& input::placeholder': {
            fontSize: '13px',
        },
        [`& fieldset`]: {
            borderColor: 'grey.joinBorder',

            borderRadius: 2,
            '&.focused': {
                borderColor: 'red',
            },
        },

        fontSize: 14,
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                backgroundColor: 'white.main',
            },
            // '&.Mui-focused fieldset': {
            //     borderColor: 'green',
            // },
        },
    },
}