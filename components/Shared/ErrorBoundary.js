import React from "react"
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
import sendAlert from "@services/Shared/sendAlert";
import HeaderStatic from "@Components/Header/HeaderStatic";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        // Define a state variable to track whether is an error or not
        this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        sendAlert(this.props.alias, this.props.userID, this.props.clientID, error?.message + " in " + this.props.path, "WEB CRASH", 0)
    }
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <ThemeProvider theme={theme}>
                    <Box sx={{ flexGrow: 1 }} id="header">
                        <HeaderStatic />
                    </Box>
                    <Box sx={{ height: "100vh", bgcolor: "background.default", pt: 2 }}>
                        <Card sx={{ bgcolor: "white.main", borderRadius: 4, mx: 2 }}>
                            <CardContent>
                                <Stack
                                    direction="column"
                                    alignItems="center">
                                    <Typography variant="h6">SOMETHING WENT WRONG...</Typography>
                                    <img
                                        src={`/images/error.jpg`}
                                        alt={process.env.client.sitelabel}
                                    />
                                    <Button
                                        size="large"
                                        type="button"
                                        variant="contained"
                                        onClick={() => this.setState({ hasError: false })}
                                        sx={{
                                            px: 6,
                                            fontWeight: "700",
                                            my: 2
                                        }}
                                    >
                                        TRY AGAIN
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>
                </ThemeProvider>
            )
        }

        // Return children components in case of no error

        return this.props.children
    }
}

export default ErrorBoundary