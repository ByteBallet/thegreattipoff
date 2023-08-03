import React, { useContext, useRef, useState, useEffect } from 'react';
import { Box, Button, TextareaAutosize, TextField, Typography, Fade, Snackbar } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CommonModal from '@Components/Payments/Common/CommonModal';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import Link from 'next/Link';
import CustomALert from '@Components/Shared/CustomALert';
import CustomDialog from '@Components/Shared/CustomDialog';
import Login from '@Components/user/Login';
import followStore from '@stores/followStore';
import followcountStore from '@stores/followcountStore';

const FollowButton = ({
    follow,
    tipster,
    tipsterid,
    format = 'secondary',
    fullwidth = false,
    manageBook = false,
    setfollowing,
    showIcon = true,
    isProTipster,
}) => {
    const { user } = useContext(UserContext);
    const [notes, setnotes] = useState('');
    const [followModal, setfollowModal] = useState(false);
    const [login, setLogin] = useState(false);

    const addTipster = followStore((state) => state.addTipster);
    const removeTipster = followStore((state) => state.removeTipster);
    const incrementFollows = followcountStore((state) => state.incrementFollows);

    useEffect(() => {
        notes != '' && setnotes('');
        if (follow == '1' && user?.userID) {
            FollowTipster();
        }
    }, [tipsterid]);

    const following = followStore((state) => state.tipsterFollowing.find((item) => item === tipsterid));

    const handleOpenLogin = () => setLogin(true);
    const handleCloseLogin = () => {
        setLogin(false);
    };

    function FollowTipster() {
        addTipster(tipsterid);
    }

    function UnFollowTipster() {
        removeTipster(tipsterid);
    }

    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });
    const handleClick = () => {
        setalertTip({
            ...alertTip,
            open: true,
        });
    };
    const handleAlertClose = () => {
        setalertTip({
            ...alertTip,
            open: false,
        });
    };
    const onClose = () => {
        setfollowModal(false);
    };
    const handleChange = (event) => {
        setnotes(event.target.value);
    };

    const handleFollow = async () => {
        localStorage.setItem('affiliate', 'GTOFORCE');
        let body = {
            userid: user?.userID,
            action: following ? 'delete' : 'follow',
            followid: tipsterid,
            followname: tipster,
            followtype: 'punter',
            comment: notes,
        };
        const url = `${process.env.server}/notifications/setFollow`;
        const response = await authAPI(url, body, 'POST', true);
        if (!response.error) {
            if (following) {
                UnFollowTipster();
            } else {
                FollowTipster();
                handleClick();
                if (manageBook) {
                    setfollowing(1);
                    incrementFollows(true);
                }
            }
            onClose();
        }
    };

    const handleFollowClick = () => {
        localStorage.setItem('affiliate', 'GTOFORCE');
        if (user?.userID) {
            setfollowModal(true);
        } else {
            localStorage.setItem('affiliate', 'GTOFORCE');
            handleOpenLogin();
        }
    };
    let btnColor = process.env.APP_BRAND == 'eb' ? 'black.main' : 'white.main';
    let btnTxtColor = process.env.APP_BRAND == 'eb' ? 'white.main' : 'black.main';
    let fontSize = process.env.APP_BRAND == 'eb' ? 14 : 12;

    let backgroundStylesFollow = {
        width: fullwidth ? 1 : 'auto',
        borderRadius: format === 'btn' ? 1 : 10,
        mr: 0,
        minWidth: 'auto',
        height: '35px',
        px: 1.5,
        py: fullwidth ? 1 : 0.5,

        bgcolor: format == 'btn' ? 'black.main' : format == 'primary' ? 'primary.main' : btnColor,
        border: process.env.APP_BRAND == 'gto' ? 1 : 0,
        borderColor: isProTipster ? 'yellow.secondary' : format == 'btn' ? 'black.main' : 'primary.main',
        '&:hover': {
            bgcolor: format == 'btn' ? 'black.main' : format == 'primary' ? 'primary.main' : btnColor,
            color: format == 'primary' ? 'black.main' : btnTxtColor,
        },
    };

    let backgroundStyleFollowing = {
        width: fullwidth ? 1 : 'auto',
        borderRadius: format === 'btn' ? 1 : 10,
        mr: 1,
        border: 1,
        borderColor: 'primary.main',
        minWidth: 'auto',
        px: 1.5,
        height: '35px',
        py: fullwidth ? 1 : 0.5,
        bgcolor: format == 'btn' ? 'white.main' : format == 'primary' ? 'black.main' : 'white.main',
        '&:hover': {
            bgcolor: format == 'btn' ? 'primary.main' : format == 'primary' ? 'black.main' : 'white.main',
            color: format == 'primary' ? 'primary.main' : 'black.main',
        },
    };

    return (
        <React.Fragment>
            {following ? (
                <Button
                    size="small"
                    onClick={handleFollow}
                    variant="contained"
                    sx={
                        isProTipster
                            ? {
                                ...backgroundStyleFollowing,
                                background: 'linear-gradient(  rgba(245,221,146,1) 0%, rgba(221,178,55,1) 70%)',
                                borderColor: 'yellow.main',
                            }
                            : { ...backgroundStyleFollowing }
                    }
                >
                    <Typography
                        fontSize={fontSize}
                        color={format == 'btn' ? 'primary.main' : format == 'primary' ? 'primary.main' : 'black.main'}
                        fontWeight={isProTipster ? '800' : '500'}
                    >
                        Following
                    </Typography>
                </Button>
            ) : (
                <Button
                    size="small"
                    onClick={handleFollowClick}
                    variant="contained"
                    startIcon={
                        showIcon && (
                            <NotificationsActiveIcon
                                sx={{
                                    fontSize: 10,
                                    color: format == 'btn' ? 'white.main' : format == 'primary' ? 'black.main' : btnTxtColor,
                                }}
                            />
                        )
                    }
                    sx={
                        isProTipster
                            ? { ...backgroundStylesFollow, background: 'linear-gradient(  rgba(245,221,146,1) 0%, rgba(221,178,55,1) 70%)' }
                            : { ...backgroundStylesFollow }
                    }
                >
                    <Typography
                        fontSize={fontSize}
                        color={format == 'btn' ? 'white.main' : format == 'primary' ? 'black.main' : btnTxtColor}
                        fontWeight="600"
                    >
                        Follow
                    </Typography>
                </Button>
            )}
            <CommonModal open={followModal} onClose={onClose} title="Add to the Tipsters you Follow">
                <Box id="followmodal" name="followmodal" sx={{ backgroundColor: 'white', m: 0, p: 2 }}>
                    <Typography component="p" align="center" mb={2} fontSize={13}>
                        Receive alerts when <b className="textCapitalize">{tipster?.toLowerCase()}</b> tips
                    </Typography>
                    <TextField
                        onChange={handleChange}
                        value={notes}
                        fullWidth
                        id="outlined-multiline-flexible"
                        multiline
                        minRows={3}
                        placeholder={`Add a Note for Tipster (optional)`}
                        helperText={`${notes?.length} / 300`}
                        sx={{
                            borderColor: 'primary.main',
                            '& .MuiInputBase-multiline': {
                                py: 1,
                                fontSize: 13,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 2,
                                borderColor: 'primary.main',
                            },
                            '& .MuiFormHelperText-root': {
                                textAlign: 'right',
                                color: 'grey.main',
                                mr: 0,
                                mt: 1,
                            },
                        }}
                        inputProps={{
                            maxLength: 300,
                        }}
                    />
                    <Box my={3}>
                        <Button
                            color="success"
                            variant="contained"
                            sx={{
                                fontWeight: 'bold',
                                boxShadow: '0px 2px 0px 0px #386c01',
                                borderRadius: 2,
                                minWidth: 100,
                                width: 1,
                                fontSize: 15,
                            }}
                            onClick={handleFollow}
                        >
                            {'Follow'}
                        </Button>
                    </Box>
                </Box>
            </CommonModal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={alertTip.open}
                autoHideDuration={5000}
                onClose={handleAlertClose}
                sx={{ bottom: { xs: 60, sm: 0 } }}
                TransitionComponent={alertTip.Transition}
                onClick={handleAlertClose}
                message={
                    <CustomALert
                        severity="success"
                        content={
                            <Typography color="inherit" fontSize="inherit">
                                Added to Follows. <Link href="/myaccount/managealerts" style={{ cursor: "pointer" }}>View Here</Link>
                            </Typography>
                        }
                        warning={true}
                        isHtml={false}
                    />
                }
            />
            <CustomDialog
                id={'login'}
                open={login}
                title={'Login to your account'}
                content={<Login onParentClose={handleCloseLogin} />}
                fullScreen
                showX
                onClose={handleCloseLogin}
                disablePortal={false}
            />
        </React.Fragment>
    );
};

export default FollowButton;
