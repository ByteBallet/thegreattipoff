import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../Themes/theme';
import {
    Stack,
    Typography,
    AppBar,
    Box,
    Toolbar,
    Button,
    Container,
    useMediaQuery,
    CardContent,
    Card
} from "@mui/material";
import HeaderStatic from "@Components/Header/HeaderStatic";

const Maintenance = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }} id="header">
                <HeaderStatic />
            </Box>
            <Box sx={{ height: "100vh", bgcolor: "background.default", pt: 2 }}>
                <Card sx={{ bgcolor: "white.main", borderRadius: 4, mx: 2, height: 1 }}>
                    <CardContent sx={{ height: 1 }}>
                        <Stack
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ height: 1 }}>
                            <Typography variant="h1">Temporarily Down for Maintenance</Typography>
                            <Typography component="p">
                                We are performing scheduled maintenance.
                            </Typography>
                            <Typography component="p">
                                We should be back online shortly.
                            </Typography>
                            <Typography component="p">
                                Thank you for your patience
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    );
};

export default Maintenance;