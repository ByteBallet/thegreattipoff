import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Container,
    Modal,
    IconButton,
    Button,
    Typography,
    Paper,
    Drawer,
    CardContent,
    Card
} from '@mui/material';

import { CloseOutlined } from '@mui/icons-material';
import { getTextColor, getTopOffset, isHotBetWidget } from '@Components/utils/util';
import { useTheme } from '@mui/material/styles';

const style = (theme) => ({
    [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        overflowY: "auto",
        maxHeight: 700
    },
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
});

const CommonModal = ({ type = 1, open, onClose, title, children }) => {
    const theme = useTheme();
    let hbWidget = isHotBetWidget()
    if (type == 2) {
        return (
            <React.Fragment>
                <Modal
                    anchor="bottom"
                    open={open}
                    onClose={onClose}
                    sx={{
                        transform: { xs: `translateY(${getTopOffset() + 40}px)`, sm: 'translateY(60px)' },
                        overflowY: "auto"
                    }}
                >
                    <Box>
                        <Container
                            id="header"
                            align="center"
                            sx={{
                                bgcolor: 'primary.main',
                                display: 'flex',
                                height: '60px',
                                px: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: 'auto',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                }}
                            >
                                <Container
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        // fontFamily: 'Meiryo UI',
                                        letterSpacing: '0',
                                        lineHeight: '1.0',
                                        // fontSize: '1.2rem',
                                        // fontWeight: 'bold',
                                        color: getTextColor(theme.palette.primary.main)
                                    }}
                                >
                                    {title}
                                    {/* ABCDE */}
                                </Container>
                            </Box>

                            <IconButton
                                onClick={onClose}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    // fontWeight: 'bold',
                                }}
                            >
                                <CloseOutlined
                                    sx={{
                                        fill: 'transparent',
                                        stroke: 'black',
                                        strokeWidth: 4,
                                        strokeOpacity: 0.25,
                                        fontSize: 16,
                                    }}
                                    size="small"
                                />
                            </IconButton>
                        </Container>

                        <Box
                            sx={{
                                backgroundColor: '#eeeff1',
                                p: 0,
                                m: 0,
                            }}
                        >
                            {children}
                        </Box>
                    </Box>
                </Modal>
            </React.Fragment >
        );
    } else if (type == 3) {
        return (
            <Modal anchor="top" open={open} onClose={onClose}>
                <Box
                    sx={{
                        background: 'white',
                        width: '100%',
                        position: 'fixed',
                        bottom: 0,
                    }}
                >
                    <Container
                        id="header"
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            py: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                alignSelf: 'center',
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: getTextColor(theme.palette.primary.main)
                            }}
                        >
                            {title}
                        </Typography>
                        <IconButton onClick={onClose}>
                            <CloseOutlined
                                sx={{
                                    fill: 'transparent',
                                    stroke: 'black',
                                    strokeWidth: 4,
                                    strokeOpacity: 0.25,
                                    fontSize: 16,
                                }}
                                size="small"
                            />
                        </IconButton>
                    </Container>
                    <Container
                        id="body"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            p: 0,
                            backgroundColor: 'white',
                            width: 1,
                        }}
                    >
                        {children}
                    </Container>
                </Box>
            </Modal>
        );
    }
    return (
        <React.Fragment>
            <Modal
                anchor="top"
                open={open}
                onClose={onClose}
                sx={{
                    transform: { xs: `translateY(${getTopOffset() + 40}px)`, sm: 'translateY(60px)' },
                    overflowY: "auto"
                }}
                BackdropProps={{
                    style: {
                        transform: 'translateY(60px)',
                    },
                }}
            >
                <Card sx={style} className="HeaderModal">
                    <CardContent
                        sx={{
                            p: 0,
                        }}>
                        <Container
                            id="header"
                            align="center"
                            sx={{
                                backgroundColor: hbWidget ? "secondary.main" : process.env.APP_BRAND == "gto" ? "background.default" : 'primary.main',
                                display: 'flex',
                                height: '60px',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: 'auto',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                }}
                            >
                                <Container
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        // fontFamily: 'Meiryo UI',
                                        letterSpacing: '0',
                                        lineHeight: '1.0',
                                        color: getTextColor(theme.palette.primary.main)
                                    }}
                                >
                                    {title}
                                </Container>
                            </Box>
                            {
                                !hbWidget &&
                                <IconButton
                                    onClick={onClose}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <CloseOutlined
                                        sx={{
                                            fill: 'transparent',
                                            stroke: getTextColor(process.env.APP_BRAND == "gto" ? theme.palette.background.default : theme.palette.primary.main),
                                            strokeWidth: 4,
                                            strokeOpacity: 0.25,
                                            fontSize: 16,
                                        }}
                                        size="small"
                                    />
                                </IconButton>
                            }
                        </Container>

                        <Box
                            sx={{
                                backgroundColor: '#eeeff1',
                            }}
                        >
                            {children}
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
        </React.Fragment>
    );
};

export default CommonModal;
