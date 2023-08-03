import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { ButtonGroup, Button, SvgIcon, Typography, Container, Box, Tooltip, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { GTO_HOME_MENU, HOME_MENU } from '@lib/constants';
import clock from '@public/images/svg/clock.svg';
import moment from 'moment';
import { useSession } from "next-auth/client"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { UserContext } from '@Context/User/UserProvider';
import CustomDialog from './CustomDialog';
import Login from '@Components/user/Login';

const DesktopMenuBar = () => {
    const { user } = useContext(UserContext)
    const [open, setOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const isGTO = process.env.APP_BRAND == 'gto'
    const router = useRouter();
    const [session] = useSession();
    const onLink = (href, name, newWindow = 0) => {
        if (name == "Blackbook") {
            user?.userID ? router.push(href) : setLogin(true)
        } else if (newWindow == 1) {
            const newWindow = window.open(href, '_blank', 'noopener,noreferrer')
        }
        else if (href) {
            router.push(href);
        }
        open && handleClose()
    };
    let path = router?.asPath
    let menu = []
    if (session) {
        menu = process.env.client.restrictedModules.indexOf("hotbet") > -1 ? HOME_MENU.filter((item) => item.path != "hotbets") : HOME_MENU
    } else {
        menu = HOME_MENU.filter((item) => item.path != "hotbets" && item.path != "myaccount")
    }
    if (isGTO) {
        menu = GTO_HOME_MENU
    }

    const handleCloseLogin = () => {
        setLogin(false);
    };

    const renderMenu = (item) => {
        return <Button
            endIcon={item?.options?.length > 0 ? <KeyboardArrowDownIcon sx={{ color: open == item?.id ? "white.mainn" : "black.main" }} /> : null}
            key={item.id}
            variant="text"
            className={
                isGTO ? null :
                    (path == "/" && item.path == "home") ?
                        "homeActiveTab" :
                        path.includes(item.path) ?
                            "homeActiveTab"
                            : null
            }
            onClick={(e) => onLink(item?.link, item?.name)}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: item.name != "Promotions" ? "100px !important" : "120px !important",
                height: 42,
                borderBottom: (path === "/" && item.path == "home") ? 2 :
                    (path.includes(item.path) && item.name == "Get Tips" && path.includes("Free-Tips")) ? 0 :
                        path.includes(item.path) ? 2 : 0
                ,
                borderColor: isGTO ? "success.main" : "primary.main",
                borderRadius: 0,
                borderRight: "0 !important",
                bgcolor: (isGTO && open == item?.id) ? "#240E37" : "inherit",
                color: (isGTO && open == item?.id) ? "white.main" : "inherit",
                '& .MuiTypography-root': {
                    color: (isGTO && open == item?.id) ? "white.main" : "inherit",
                    backgroundColor : '0xfff',
                },
                '& .MuiButton-endIcon': {
                    color: (isGTO && open == item?.id) ? "white.main" : "inherit"
                },
                '&:hover': {
                    backgroundColor: (isGTO) ? "#240E37" : "inherit",
                    color: (isGTO) ? "white.main" : "inherit",
                    '& .MuiTypography-root': {
                        color: isGTO ? "white.main" : "inherit",
                        backgroundColor : '0xfff',
                    },
                    '& .MuiButton-endIcon>*:nth-of-type(1)': {
                        color: !isGTO ? "black.main" : "white.main"
                    },
                },
                '&.MuiButtonGroup-grouped:not(:last-of-type)': {
                    borderColor: (isGTO) ? "success.main" : "primary.main",
                },
                '& .MuiButton-endIcon': {
                    ml: 0.2,
                },
                '& .MuiButton-endIcon>*:nth-of-type(1)': {
                    fontSize: 16
                },
            }}
        >
            {
                item?.icon?.svg != "" &&
                <SvgIcon
                    sx={{ width: 15, height: 15, color: 'black.main' }}
                    component={item?.icon.svg}
                    viewBox={item?.icon.viewBox}
                />
            }
            <Typography
                component="p"
                ml={0.5}
                fontSize={14}
            >
                {item?.name}
            </Typography>
        </Button>
    }

    const handleOpen = (id) => {
        setOpen(id)
    }
    const handleClose = () => {
        setOpen()
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    bgcolor: "white.main",
                    boxShadow: "2px 2px 5px rgb(230 230 230)",
                    position: "sticky",
                    top: 60,
                    zIndex: 100
                }}>
                <Container
                    fixed
                    disableGutters
                    sx={{
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <ButtonGroup
                        variant="text"
                        sx={{
                            zIndex: (theme) => theme.zIndex.modal + 100,
                        }}
                    >
                        {menu.map((item) => (
                            <React.Fragment key={item?.id}>
                                {
                                    item?.options?.length > 0 ?
                                        <Tooltip
                                            open={open == item?.id}
                                            onClose={handleClose}
                                            onOpen={() => handleOpen(item?.id)}
                                            placement="bottom-start"
                                            title={
                                                <List sx={{
                                                    bgcolor: "#240E37",
                                                    py: 0.5,
                                                }}>
                                                    {
                                                        item?.options?.map((ele, idx) =>
                                                            <ListItem disablePadding key="idx">
                                                                <ListItemButton onClick={(e) => onLink(ele?.link, item?.name, ele?.target ? 1 : 0)} sx={{ py: 0.2 }}>
                                                                    <ListItemText primary={ele?.label} sx={{
                                                                        '& .MuiListItemText-primary': {
                                                                            color: "white.main",
                                                                            fontSize: 14,
                                                                        }
                                                                    }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        )
                                                    }
                                                </List>}
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        p: 0,
                                                        margin: "0px !important"
                                                    }
                                                }
                                            }}
                                        >
                                            {renderMenu(item)}
                                        </Tooltip>
                                        :
                                        renderMenu(item)
                                }
                            </React.Fragment>

                        ))}
                    </ButtonGroup>
                    <Typography fontSize={12}>
                        <SvgIcon
                            component={clock}
                            viewBox='0 0 16 16'
                            sx={{ width: 10, height: 10, mr: 0.5 }}
                        />
                        {moment().format('dddd, DD MMMM YYYY')}
                    </Typography>
                </Container>
            </Box>
            <CustomDialog
                id={'login'}
                open={login}
                title={'Login to your account'}
                content={<Login onParentClose={handleCloseLogin} page={'/myaccount/managealerts'} />}
                fullScreen
                showX={true}
                onClose={handleCloseLogin}
                disablePortal={false}
            />
        </React.Fragment>
    );
};

export default DesktopMenuBar;