/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IconButton, Drawer, Box, Typography, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ItemList from 'Menu/ItemList';
import FooterAppDownload from '@Components/Footer/FooterAppDownload';
import Footer18Plus from '@Components/Footer/Footer18Plus';
import FooterDisclaimer from '@Components/Footer/FooterDisclaimer';
import FooterHotDigital from '@Components/Footer/FooterHotDigital';
import FooterHotDigitalLogo from '@Components/Footer/FooterHotDigitalLogo';

const isGTO = process.env.APP_BRAND == 'gto';

const MenuDrawer = ({ handleOpenLoginModal, setopenBetSlip, open }) => {
    const isGTO = process.env.APP_BRAND == 'gto';
    const handleClose = () => {
        setopenBetSlip(false);
    };

    return (
        <>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        maxWidth: '80%',
                    },
                }}
            >
                <Box
                    sx={{
                        bgcolor: isGTO ? 'background.header' : '#000000',
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={`${process.env.cdn}/images/logo/logo.svg`}
                        alt={process.env.client.sitelabel}
                        height={35}
                        style={{ width: isGTO ? 120 : 'auto' }}
                    />
                    <IconButton
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            right: 12,
                        }}
                    >
                        <CloseIcon color={isGTO ? 'white' : 'yellow'} onClick={handleClose} />
                    </IconButton>
                </Box>
                <Box sx={{ bgcolor: '#F0F1F3', px: 0 }}>
                    <ItemList handleClose={handleClose} handleOpenLoginModal={handleOpenLoginModal} />
                </Box>
                {process.env.APP_BRAND !== 'gto' && (
                    <Box sx={{ bgcolor: 'background.default', p: 1 }}>
                        <Stack direction="column" spacing={0} justifyContent="center" alignItems="center">
                            <Typography fontSize={13} fontWeight="bold">
                                Download the APP
                            </Typography>
                            <FooterAppDownload handleClose={handleClose} />
                        </Stack>
                        <Box sx={{ ml: 3, mb: 2, mt: 1 }}>
                            <Footer18Plus />
                        </Box>
                        <FooterDisclaimer />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <FooterHotDigital />
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <FooterHotDigitalLogo />
                        </Box>
                    </Box>
                )}
            </Drawer>
        </>
    );
};

export default MenuDrawer;
