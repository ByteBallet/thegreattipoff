import React from 'react';
import { Alert, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmTipsRemove = ({
    isOpen,
    onClose,
    title,
    onClickLeftBtn,
    leftText
}) => {
    return (
        <Dialog
            disablePortal={true}
            disableEscapeKeyDown
            open={isOpen}
            onClose={onClose}
            maxWidth={'xs'}
            aria-labelledby={`tips remove`}
            aria-describedby={`tips remove`}
            sx={{
                zIndex: (theme) => theme.zIndex.modal - 100,
                top: `env(safe-area-inset-top)`,
                border: 1
            }}
            PaperProps={{
                sx: {
                    bgcolor: "background.comment",
                    color: "info.comment",
                    borderColor: "info.comment",
                    border: 1,
                    p: 2
                },
            }}
        >
            <DialogTitle sx={{ p: 0 }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: "info.comment",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <Grid container spacing={0}
                    justifyContent="center"
                    sx={{
                        fontSize: 12,
                        bgcolor: "background.comment",
                        color: "info.comment",
                        mx: "auto"
                    }}>
                    <Grid container justifyContent="center" alignItems={"center"} item xs={12}>
                        <InfoIcon sx={{ color: "info.comment", fontSize: 24, mr: 1 }} />
                        {title}
                    </Grid>
                    <Grid item xs={12} container justifyContent="center" alignItems={"center"}>
                        <Button size="small" onClick={onClickLeftBtn} variant="contained"
                            sx={{
                                bgcolor: "info.comment",
                                mt: 1
                            }}>
                            {leftText}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmTipsRemove;
