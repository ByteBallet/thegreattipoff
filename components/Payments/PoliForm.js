import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import PoliHeader from './Poli/PolliHeader';
import DepositAmountPanel from './Common/DepositAmountPanel';
import { MyFormHelperText2 } from './Common/MyFormHelperText';
import { UserContext } from '../../Context/User/UserProvider';
import SubmitButtonPanel from './Common/SubmitButtonPanel';
import { proceedBankingPoliDeposit } from '../../lib/deposit';
import MyLoadingButton from '@Components/common/MyLoadingButton';
import updateUserSession from '@Components/utils/updateUserSession';
import { getSession } from 'next-auth/client';

export default function PoliForm(props) {
    const isGTO = process.env.APP_BRAND == 'gto';
    let minAmt = isGTO ? 10 : 5;
    const { user, addUser } = useContext(UserContext);
    const { clientID } = user;
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (props.fail) {
            setResult({
                status: 403,
                msg: 'POLi deposit unsuccessful. Please check details and try again.',
            });
        } else if (props.cancel) {
            setResult({
                status: 403,
                msg: 'POLi deposit was cancelled',
            });
        } else if (props.success) {
        }
    }, [props]);

    const updateData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        let request_body = {
            clientid: clientID,
            depositamount: amount,
        };

        if (isGTO) {
            request_body.userid = user.userID;
        }

        const _res0 = await proceedBankingPoliDeposit(request_body);
        let _result = _res0.data;

        if (_res0.error == false) {
            if (_result.ERROBJ) {
                if (_result.ERROBJ.ERRORCODE === 0) {
                    if (_result.SUCCESS == true) {
                        setResult({
                            status: 200,
                            msg: 'Successful',
                            depositamount: _result.DEPOSITAMOUNT,
                        });
                        //update session
                        updateUserSession(false).then(() => {
                            updateData();
                        });
                    } else {
                        setResult({
                            status: _result.ERROBJ.ERROR,
                            msg: _result.ERROBJ.ERRORDESC,
                            depositamount: 0,
                        });
                    }
                } else {
                    if (_result.ERROBJ.ERROR == 0) {
                        if (isGTO) {
                            if (_result?.POLIREQUEST?.NAVIGATEURL) {
                                window.location.href = _result?.POLIREQUEST?.NAVIGATEURL;
                                return;
                            }
                        } else {
                            if (_result.SUCCESS == true) {
                                // if (Boolean(windowReference))
                                //     windowReference.location = _res0.data.poliUrl;

                                window.location.href = _result.poliUrl;
                                //window.open(_result.poliUrl, "_blank");
                            } else {
                                setResult({
                                    status: _result.ERROBJ.ERROR,
                                    msg: _result.ERROBJ.ERRORDESC,
                                });
                            }
                        }
                    } else {
                        setResult({
                            status: _result.ERROBJ.ERROR,
                            msg: _result.ERROBJ.ERRORDESC,
                        });
                    }
                }
            } else {
                setResult({
                    status: 403,
                    msg: _result.ERROBJ.ERRORDESC,
                });
            }
            // const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
            // if (newWindow) newWindow.opener = null;
        } else {
            if (_result && _result.ERROBJ) {
                setResult({
                    status: 403,
                    msg: _result.ERROBJ.ERRORDESC,
                });
            } else {
                setResult({
                    status: 403,
                    msg: '404 - Something went wrong',
                });
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

    // useEffect(() => {
    //     if (formInput.depositamount != undefined) {
    //         let _errors = checkData(formInput);
    //         setErrors(_errors);
    //     }
    // }, [formInput.depositamount]);

    return (
        <Container sx={{ px: 2 }} component="form" onSubmit={handleSubmit}>
            <PoliHeader />
            <Box item sx={{ p: 2 }}>
                <Typography sx={{ fontSize: 14 }}>
                    POLi offers a great alternative to Credit Cards. We provide a seamless secure payment experience by connecting you to
                    your bank, without any registration needed.
                </Typography>
            </Box>
            <Box item>
                <DepositAmountPanel
                    placeholder={`Minimum deposit is $${minAmt}`}
                    errormsg={`Minimum deposit is $${minAmt}`}
                    amount={amount}
                    setAmount={setAmount}
                    error={error}
                    setError={(depositamount) => setError(depositamount)}
                />
            </Box>
            <Box item>
                <MyLoadingButton
                    loading={loading}
                    disabled={error != '' || !amount || amount.length == 0}
                    label="Deposit Now"
                    type="submit"
                />
            </Box>
            {result && (
                <Box sx={{ my: 2 }}>
                    <MyFormHelperText2>{result}</MyFormHelperText2>
                </Box>
            )}
        </Container>
    );
}
