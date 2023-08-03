import React from 'react';
import { Box, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@Components/Themes/theme';

const LoadingScreen = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                bgcolor: "background.header",
                color: "primary.main"
            }}>
                <img
                    src={`${process.env.cdn}/images/logo/logo.svg`}
                    alt={process.env.client.sitelabel}
                    width={250}
                    height={120}
                />
            </Box>
        </ThemeProvider>
    );
};

export default LoadingScreen;