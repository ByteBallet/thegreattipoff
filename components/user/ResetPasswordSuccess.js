import React from 'react';
import { Card, Box, CardContent, Typography, Button } from '@mui/material';
import CustomDialog from '../Shared/CustomDialog';
import Login from './Login';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

const ResetPasswordSuccess = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleLoginOpen = () => setOpen(true);
    const handleLoginClose = (e) => {
        setOpen(false)
        props.onParentClose();
    };
    return (
        <Box>
            <Card sx={{ bgcolor: "background.dialogcontent" }}>
                <CardContent className="textAlignCoulmnCenter">
                    <CheckCircleOutlinedIcon color="primary" sx={{ fontSize: 50 }} />
                    <Typography variant="subtitle1" component="p" fontWeight="bold" align="center" mb={3} mt={1} color="text.dialog">
                        Success! Your Password has been changed.
                    </Typography>
                    <Button color="black" variant="text" onClick={handleLoginOpen} >
                        Login to&nbsp;<u>your account here.</u>
                    </Button>
                    <CustomDialog
                        id={"login"}
                        open={open}
                        title={"Login to your account"}
                        content={<Login onParentClose={handleLoginClose} />}
                        fullScreen
                        showX
                        onClose={handleLoginClose}
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default ResetPasswordSuccess;