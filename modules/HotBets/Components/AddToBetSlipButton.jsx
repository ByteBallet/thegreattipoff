import React from 'react';
import { useState } from 'react';
import { Stack, Typography, Button, Avatar, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/client';
import Login from '@Components/user/Login';
import CustomDialog from '@Components/Shared/CustomDialog';

const CButton = ({ isHorizontal, disabled, onClick, betSlipCount, variant, uid, fromGetTips }) => {
    return (
        <Button
            id={fromGetTips ? `addHBbtn-${uid}` : null}
            color="success"
            variant="contained"
            size="large"
            sx={{
                width: isHorizontal ? '100%' : '90%',
                height: '35px',
                boxShadow: '0px 2px 0px 0px #386c01',
                borderRadius: 1.5,
                '&:disabled': {
                    boxShadow: '0px 2px 0px 0px #386c01',
                    backgroundColor: 'success.main',
                },
            }
            }
            disabled={disabled}
            onClick={onClick}
        >
            <Typography color={'white.main'} fontWeight="bold" fontSize={14} noWrap>
                {variant === 'get-tip' ? 'Get Tips' : 'Add to Bet Slip'}
            </Typography>
            <Avatar
                sx={{
                    width: betSlipCount > 99 ? 24 : 19,
                    height: betSlipCount > 99 ? 22 : 19,
                    bgcolor: '#305c01',
                    ml: 0.5,
                    fontSize: 11,
                }}
            >
                {
                    betSlipCount > 99 ?
                        <b>99<small style={{ fontSize: 7.5 }}>+</small></b> :
                        <b>{betSlipCount}</b>
                }
            </Avatar>
        </Button >
    );
};

const AddToBetSlipButton = ({
    betSlipCount,
    isAddtoBetLoading,
    onClick,
    isHorizontal,
    loading = false,
    variant = 'add-bet',
    skipSessionChk = false,
    uid = 0,
    fromGetTips = false
}) => {
    const [session] = useSession();
    const [login, setLogin] = useState(false);
    const handleOpenLogin = () => setLogin(true);
    const handleCloseLogin = () => {
        setLogin(false);
    };
    return (
        <React.Fragment>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: 1 }} mb={2.2} mt={1}>
                {loading ? (
                    <Button
                        color="success"
                        variant="contained"
                        size="large"
                        sx={{
                            width: isHorizontal ? '100%' : '90%',
                            height: '35px',
                            minWidth: isHorizontal ? '150px' : 'auto',
                            boxShadow: '0px 2px 0px 0px #386c01',
                            borderRadius: 1.5,
                            '&:disabled': {
                                boxShadow: 'none',
                                backgroundColor: 'success.main',
                            },
                        }}
                        disabled
                    >
                        <CircularProgress color="inherit" size={16} sx={{ mr: 1 }} />
                    </Button>
                ) : (
                    <CButton
                        isHorizontal={isHorizontal}
                        isAddtoBetLoading={isAddtoBetLoading}
                        onClick={session || skipSessionChk ? onClick : handleOpenLogin}
                        betSlipCount={betSlipCount}
                        variant={variant}
                        uid={uid}
                        fromGetTips={fromGetTips}
                    />
                )}
            </Stack>
            <CustomDialog
                id={'login'}
                open={login}
                title={'Login to your account'}
                content={<Login onParentClose={handleCloseLogin} />}
                fullScreen
                showX
                onClose={handleCloseLogin}
                disablePortal={true}
            />
        </React.Fragment>
    );
};

export default AddToBetSlipButton;
