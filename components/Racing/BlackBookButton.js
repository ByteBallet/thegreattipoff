
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
import blackbook from '@stores/blackbook';
import { useTheme } from '@mui/material/styles';
import { getTextColor } from '@Components/utils/util';

const BlackBookButton = ({ follow, runner, actualcode, rtype, btnTheme = "light" }) => {
    const theme = useTheme();
    const { user } = useContext(UserContext);
    const [notes, setnotes] = useState("")
    const [followModal, setfollowModal] = useState(false)
    const [login, setLogin] = useState(false);

    const addRunner = blackbook((state) => state.addRunner);
    const removeRunner = blackbook((state) => state.removeRunner);

    useEffect(() => {
        notes != "" && setnotes("")
        if (follow == "1" && user?.userID) {
            FollowRunner()
        }
    }, [runner])

    const following = blackbook((state) =>
        state.blackbooklist.find((item) => item === runner)
    );

    function FollowRunner() {
        addRunner(runner);
    }

    function UnFollowRunner() {
        removeRunner(runner);
    }

    const handleOpenLogin = () => setLogin(true)
    const handleCloseLogin = () => { setLogin(false); }
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
        setfollowModal(false)
    }
    const handleChange = (event) => {
        setnotes(event.target.value);
    };

    const handleFollow = async () => {
        let body = {
            userid: user?.userID,
            action: following ? "delete" : "follow",
            followid: actualcode,
            followname: runner,
            followtype: rtype,
            comment: notes
        }
        const url = `${process.env.server}/notifications/setFollow`
        const response = await authAPI(url, body, 'POST', true);
        if (!response.error) {
            if (following) {
                UnFollowRunner()
            } else {
                FollowRunner()
                handleClick()
            }
            onClose()
        }
    }

    const handleFollowClick = () => {
        if (user?.userID) {
            setfollowModal(true)
        } else {
            handleOpenLogin()
        }
    }

    return (
        <React.Fragment>
            {
                following ?
                    <Button
                        size="small"
                        variant={btnTheme == "light" ? "text" : "contained"}
                        onClick={handleFollow}
                        sx={{
                            borderRadius: btnTheme == "light" ? 0 : 10,
                            border: btnTheme == "light" ? 0 : 1,
                            borderColor: btnTheme == "light" ? "" : 'primary.main',
                            minWidth: "auto",
                            px: btnTheme == "light" ? 0 : 2,
                            py: btnTheme == "light" ? 0 : 0.5,
                            bgcolor: btnTheme == "light" ? "" : 'black.main',
                            '&:hover': {
                                bgcolor: btnTheme == "light" ? "" : 'black.main',
                                color: btnTheme == "light" ? "grey.main" : "primary.main"
                            }
                        }}>
                        <Typography
                            fontSize={btnTheme == "light" ? 12 : 14}
                            color={btnTheme == "light" ? "grey.main" : "primary.main"}
                            fontWeight={btnTheme == "light" ? "400" : "700"}>
                            Remove from Blackbook
                        </Typography>
                    </Button> :
                    <Button
                        size="small"
                        onClick={handleFollowClick}
                        variant={btnTheme == "light" ? "text" : "contained"}
                        startIcon={<NotificationsActiveIcon sx={{ fontSize: 12, color: btnTheme == "light" ? "grey.main" : getTextColor(theme.palette.primary.main), }} />}
                        sx={{
                            bgcolor: btnTheme == "light" ? "" : 'primary.main',
                            borderRadius: btnTheme == "light" ? 0 : 10,
                            color: btnTheme == "light" ? "grey.main" : getTextColor(theme.palette.primary.main),
                            minWidth: "auto",
                            px: btnTheme == "light" ? 0 : 1.5,
                            py: btnTheme == "light" ? 0 : 1,
                            '&:hover': {
                                bgcolor: btnTheme == "light" ? "" : 'primary.main',
                                color: btnTheme == "light" ? "grey.main" : getTextColor(theme.palette.primary.main),
                            }
                        }}>
                        <Typography fontSize={btnTheme == "light" ? 12 : 14} color="inherit" fontWeight={btnTheme == "light" ? "400" : "700"}>Add to Blackbook</Typography>
                    </Button>
            }
            <CommonModal open={followModal} onClose={onClose} title="Add to your Blackbook">
                <Box
                    id="followmodal"
                    name="followmodal"
                    sx={{ backgroundColor: 'white', m: 0, p: 2 }}
                >
                    <Typography component="p" align="center" mb={2} fontSize={13}>
                        Receive alerts before <b className='textCapitalize'>{runner?.toLowerCase()}</b> races
                    </Typography>
                    <TextField
                        onChange={handleChange}
                        value={notes}
                        fullWidth
                        id="outlined-multiline-flexible"
                        multiline
                        minRows={3}
                        placeholder="Add a Note on runner (optional)"
                        helperText={`${notes?.length} / 300`}
                        sx={{
                            borderColor: "primary.main",
                            '& .MuiInputBase-multiline': {
                                py: 1,
                                fontSize: 13,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 2,
                                borderColor: "primary.main",
                            },
                            '& .MuiFormHelperText-root': {
                                textAlign: "right",
                                color: "grey.main",
                                mr: 0,
                                mt: 1
                            }
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
                                fontWeight: "bold",
                                boxShadow: "0px 2px 0px 0px #386c01",
                                borderRadius: 2,
                                minWidth: 100,
                                width: 1,
                                fontSize: 15
                            }}
                            onClick={handleFollow}
                        >
                            {"Save"}
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
                        content={<Typography color="inherit" fontSize="inherit">Added to Blackbook. <Link href="/myaccount/managealerts">View Here</Link></Typography>}
                        warning={true}
                        isHtml={false}
                    />
                }
            />
            <CustomDialog
                id={"login"}
                open={login}
                title={"Login to your account"}
                content={<Login onParentClose={handleCloseLogin} />}
                fullScreen
                showX
                onClose={handleCloseLogin}
                disablePortal={false}
            />
        </React.Fragment >
    );
};

export default BlackBookButton;