import React, { useState, useEffect, useContext } from 'react';
import CommonModal from '@Components/Payments/Common/CommonModal';

import { Box, Button, Typography, Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

import { UserContext } from '@Context/User/UserProvider';
import { proceedBankCreditCardUnregister } from '@lib/deposit';
import { MyFormHelperText2 } from '@Components/Payments/Common/MyFormHelperText';
const getMaskResult = (number) => {
    return '**** **** **** '.concat(number ? number.substr(15) : '1234');
};
export default function RemoveCardModal(props) {
    const {
        card = {
            CMNUM: '1234 1234 1234 1234',
        },
        opened = false,
        onClose = () => { },
        result,
        setResult,
        handleClick = () => { }
    } = props;
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const { clientID } = user;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const _res0 = await proceedBankCreditCardUnregister({
            clientid: clientID,
            userid: user?.userID,
            cardid: card.ccid,
        });
        let _result = _res0.data;

        if (_res0.error) {
            setResult({
                status: 403,
                msg: _res0.desc
            });
        } else if (_result.ERROBJ) {
            if (_result.ERROBJ.ERROR === 0) {
                setResult({
                    status: 200,
                    msg: 'Card successfully deleted',
                });
                onClose();
            } else {
                setResult({
                    status: _result.ERROBJ.ERROR,
                    msg: _result.ERROBJ.ERRORDESC
                });
            }

        } else {
            setResult({
                status: 403,
                msg: '404 - Something went wrong',
            });
        }
        setLoading(false);
        handleClick()
    };

    return (
        <CommonModal
            open={opened}
            onClose={onClose}
            title="Confirm Card Removal"
        >
            <Container
                sx={{ backgroundColor: 'white', m: 0, px: 2, py: 1, pb: 3 }}
                component="form"
                onSubmit={handleSubmit}
            >
                <Typography
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mx: 6,
                        my: 1,
                        mt: 2,
                        fontSize: 14,
                        textAlign: 'center',
                    }}
                >
                    Are you sure you want to remove the following card?
                </Typography>
                <Typography
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mx: 4,
                        my: 1,
                        fontSize: 14,
                    }}
                >
                    {getMaskResult(card.cmnum)}
                </Typography>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <LoadingButton
                        loading={loading}
                        loadingIndicator={
                            <Typography
                                color="inherit"
                                sx={{
                                    width: 'max-content',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress
                                    color="inherit"
                                    size={16}
                                    sx={{ mr: 1 }}
                                />{' '}
                                Please wait...
                            </Typography>
                        }
                        color="success"
                        variant="contained"
                        // onClick={() => handleSubmit()}
                        fullWidth
                        size="small"
                        sx={{
                            mt: 1,

                            fontSize: 16,
                            fontWeight: 'bold',
                            py: 0,
                            mx: 6,
                            height: 42,
                            boxShadow: '0px 2px 0px 0px #386c01',
                        }}
                        type="submit"
                    >
                        Confirm
                    </LoadingButton>
                </Container>


            </Container>
        </CommonModal>
    );
}
