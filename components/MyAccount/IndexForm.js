import React, { useEffect, useState } from 'react';
import { getButtonIcons } from '../utils/icons';
import { IconButton, Button, Typography, Paper, Drawer, Badge, Avatar } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useContext } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import Link from 'next/Link';
import { fetchVerifyID } from '@lib/fetcher';
import { getSession } from 'next-auth/client';
import { MYACCOUNT_GTO_MENU, MYACCOUNT_MENU } from '@lib/constants';
import { getBankDetails } from '@services/tipster/tipsterService';
import ErrorIcon from '@mui/icons-material/Error';

const NavigationItem = (props) => {
    const { icon, label, onClick, to = '/', pagelink, showAlert = false } = props;
    const { user } = useContext(UserContext);
    return (
        <Link href={pagelink}>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="detail" style={{ padding: '0' }}>
                        <KeyboardArrowRightOutlinedIcon />
                    </IconButton>
                }
                disablePadding
            >
                <ListItemButton
                    selected={false}
                    key={label}
                    sx={{
                        margin: '4px 0',
                        cursor: "pointer"
                    }}
                >
                    <ListItemIcon sx={{ marginRight: '30px' }}>
                        {icon ? (
                            <object
                                data={`/images/svg/${icon}.svg`}
                                type="image/svg+xml"
                                width={18}
                                height={18}
                                style={{ fill: 'rgba(0,0,0,0.3)' }}
                                alt={ icon }
                            />
                        ) : (
                            <InboxIcon />
                        )}
                    </ListItemIcon>
                    {!user.verified && label == 'Verification' ? (
                        <Badge badgeContent="!" color="error" className="HeaderBadge">
                            <ListItemText
                                id={'label'}
                                primary={label}
                                primaryTypographyProps={{
                                    color: 'rgba(0,0,0,0.9)',
                                    fontWeight: 'medium',
                                    variant: 'body2',
                                    fontSize: '14px',
                                    // textTransform: 'Capitalize',
                                    fontFamily: 'Roboto',
                                }}
                            />
                        </Badge>
                    ) :
                        (showAlert && label == 'My Details') ?
                            <ListItemText
                                id={'label'}
                                primary={label}
                                secondary={
                                    <Typography
                                        fontSize={12}
                                        color="error"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ErrorIcon />
                                        &nbsp;Add bank details&nbsp;
                                    </Typography>
                                }
                                primaryTypographyProps={{
                                    color: 'rgba(0,0,0,0.9)',
                                    fontWeight: 'medium',
                                    variant: 'body2',
                                    fontSize: '14px',
                                    // textTransform: 'Capitalize',
                                    fontFamily: 'Roboto',
                                }}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            />
                            :
                            (
                                <ListItemText
                                    id={'label'}
                                    primary={label}
                                    primaryTypographyProps={{
                                        color: 'rgba(0,0,0,0.9)',
                                        fontWeight: 'medium',
                                        variant: 'body2',
                                        fontSize: '14px',
                                        // textTransform: 'Capitalize',
                                        fontFamily: 'Roboto',
                                    }}
                                />
                            )}
                </ListItemButton>
            </ListItem>
        </Link>
    );
};

export default function IndexForm(props) {
    const { user, addUser } = useContext(UserContext);
    const isGTO = process.env.APP_BRAND == 'gto';
    const items = isGTO ? MYACCOUNT_GTO_MENU : MYACCOUNT_MENU;
    let totalEarnings = user?.totalEarnings || 0;

    useEffect(() => {
        !isGTO && handleVerify(user.clientID);
    }, []);

    const handleVerify = async (clientid) => {
        const userSession = await getSession();
        const _res0 = await fetchVerifyID({
            clientid: clientid,
            status: 'check',
        });
        if (_res0.error) {
        } else {
            let _res = _res0.data;
            addUser({
                ...userSession.user,
                verified: _res.verified,
                greenIDToken: _res.greenIDToken,
            });
        }
    };
    return (
        <React.Fragment>
            <List
                component="div"
                sx={{
                    pt: 1,
                    pb: 4,
                    px: 2,
                    mb: 4,
                }}
            >
                <ListItemButton>
                    <ListItemIcon sx={{ color: 'primary.main', marginRight: '24px' }}>
                        <Avatar
                            sx={{
                                width: 35,
                                height: 35,
                                bgcolor: 'background.default',
                            }}
                            src={`${process.env.cdn}/images/avatar/${user?.avatarPath}`}
                        >
                            <object data={`/images/svg/avatard.svg`} type="image/svg+xml" width={28} height={28} />
                        </Avatar>
                        {/* <object
                            data={`/images/svg/avatar.svg`}
                            type="image/svg+xml"
                            width={28}
                            height={28}
                        /> */}
                    </ListItemIcon>
                    <ListItemText
                        primary={user.fullname}
                        secondary={user.alias}
                        primaryTypographyProps={{
                            fontWeight: 'bold',
                            variant: 'body2',
                            lineHeight: '1.0',
                            fontSize: 16,
                        }}
                        secondaryTypographyProps={{
                            fontSize: 11,
                        }}
                    />
                </ListItemButton>
                <Divider />
                {items.map((row, id) => (
                    <React.Fragment key={id}>
                        <NavigationItem icon={row.icon} label={row.label} to={row.to} pagelink={row.to} showAlert={totalEarnings > 0 && !user?.hasBank} />
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </React.Fragment>
    );
}
