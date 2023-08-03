import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, Modal, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CloseOutlined } from '@mui/icons-material';
import { getTextColor } from '@Components/utils/util';

const style = (theme) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        position: 'fixed',
        bottom: '0',
        maxHeight: '90%',
        overflowY: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        overflowY: "auto",
        maxHeight: 700
    },
});

const CommonModal = ({ open, onClose, title, children }) => {
    const theme = useTheme();
    return (
        <Modal
            anchor="top"
            open={open}
            onClose={onClose}
        >
            <Box sx={style}>
                <Container
                    id="header"
                    align="center"
                    sx={{
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        height: '40px',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        color: getTextColor(theme.palette.primary.main)
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 'auto',
                            justifyContent: 'flex-start',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            color: "inherit"
                        }}
                    >
                        {title}
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            fontWeight: 'bold',
                            mr: 0,
                            pr: 0,
                        }}
                    >
                        <CloseOutlined
                            sx={{
                                stroke: getTextColor(theme.palette.primary.main),
                                strokeWidth: 4,
                                fontSize: 16,
                                color: "inherit"
                            }}
                            size="small"
                        />
                    </IconButton>
                </Container>

                <Box
                    sx={{
                        backgroundColor: '#ffffff',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Modal>
    );
};
const styles = {};
export default CommonModal;
