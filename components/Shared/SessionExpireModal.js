import React from 'react';
import { useState } from 'react';
import {
    Modal,
    Button,
    Typography,
    Stack,
    CardContent,
    Card
} from '@mui/material';
import CustomDialog from './CustomDialog';
import Login from '@Components/user/Login';

const style = (theme) => ({
    [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        overflowY: "auto",
        maxHeight: 600
    },
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
});

const SessionExpireModal = ({ open, handleClose }) => {
    const [login, setLogin] = useState(false);
    const handleOpenLogin = () => setLogin(true)
    const handleCloseLogin = () => { setLogin(false); }
    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style} className="HeaderModal">
                    <CardContent
                        sx={{

                            bgcolor: "white.main"
                        }}>
                        <Stack direction="column" justifyContent="center" alignItems="center">
                            <Typography fontSize={14}>
                                Session has expired.  Please login
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleOpenLogin}
                                sx={{
                                    px: 6,
                                    fontWeight: 600,
                                    my: 2
                                }}
                            >
                                Login
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Modal>
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
        </React.Fragment>
    );
};

export default SessionExpireModal;