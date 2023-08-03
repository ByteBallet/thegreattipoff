import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Typography,
} from "@mui/material";
import Link from 'next/Link';

const HeaderStatic = ({ title = "" }) => {
    return (
        <React.Fragment>
            <AppBar
                sx={{
                    bgcolor: 'background.header',
                }}
            >
                <Toolbar
                    variant="dense"
                    sx={{
                        justifyContent: 'space-between',
                        minHeight: 50,
                        alignItems: 'center',
                    }}
                    disableGutters
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "nowrap",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100%"
                        }}>
                        <Link href="/">
                            <img
                                src={`${process.env.cdn}/images/logo/logo.svg`}
                                alt={process.env.client.sitelabel}
                                className="logo"
                                style={{ cursor: "pointer" }}
                            />
                        </Link>
                        {
                            title != "" &&
                            <Typography color={"text.active"} className="textCapitalize" ml={3} align="center" sx={{ width: "70%" }}>{title.toLocaleLowerCase()}</Typography>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar sx={{ minHeight: 50 }} disableGutters />
        </React.Fragment >
    );
};

export default HeaderStatic;