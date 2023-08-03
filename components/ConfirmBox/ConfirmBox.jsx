import React from 'react';
import { Box, Button, Grid, Modal } from '@mui/material';
import { getTextColor } from '@Components/utils/util';
import { useTheme } from '@mui/styles';

const ConfirmBox = ({
    isOpen,
    onClose,
    title,
    onClickLeftBtn,
    onClickRight,
    leftText,
    rightText,
    fullwidth = false
}) => {
    const theme = useTheme();
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className={'boostDlg-popover'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#FFFEF8',
                    width: '80%',
                    height: "auto",
                    border: '1px solid #818182',
                    borderRadius: '5px',
                    padding: '15px',
                }}
            >
                <>
                    <p style={{ textAlign: 'center' }}>{title}</p>
                    <Grid container spacing={2}>
                        <Grid item xs={fullwidth ? 12 : 6} sm={6}>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ color: getTextColor(theme.palette.primary.main) }}
                                fullWidth
                                onClick={onClickLeftBtn}
                            >
                                {leftText}
                            </Button>
                        </Grid>
                        <Grid item xs={fullwidth ? 12 : 6} sm={6}>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ color: getTextColor(theme.palette.primary.main) }}
                                fullWidth
                                onClick={onClickRight}
                            >
                                {rightText}
                            </Button>
                        </Grid>
                    </Grid>
                </>
            </Box>
        </Modal>
    );
};

export default ConfirmBox;
