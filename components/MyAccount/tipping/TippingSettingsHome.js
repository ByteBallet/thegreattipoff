import React from 'react';
import { IconButton, ListItem, ListItemText, ListItemButton, ListItemIcon, Divider, Box } from '@mui/material';
import Link from 'next/Link';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import InboxIcon from '@mui/icons-material/Inbox';
import BoxDivider from '@Components/Shared/BoxDivider';

const TippingSettingsHome = () => {
    const items = [
        {
            icon: 'result',
            label: 'Tip Package Pricing',
            to: '/myaccount/tipping/pricing',
        },
        {
            icon: 'cog',
            label: 'Staking Settings',
            to: '/myaccount/tipping/staking',
        },
    ];
    return (
        <Box py={2} mx={2} sx={{ borderTopWidth: 1, borderTop: 1, borderColor: 'grey.border1' }}>
            {items.map((row, id) => (
                <React.Fragment key={id}>
                    <Link href={row.to}>
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
                                key={row.label}
                                sx={{
                                    margin: '4px 0',
                                    cursor: "pointer"
                                }}
                            >
                                <ListItemIcon sx={{ marginRight: '30px' }}>
                                    {row.icon ? (
                                        <object
                                            data={`/images/svg/${row.icon}.svg`}
                                            type="image/svg+xml"
                                            width={18}
                                            height={18}
                                            style={{ fill: 'rgba(0,0,0,0.3)' }}
                                            alt={ row.icon }
                                        />
                                    ) : (
                                        <InboxIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    id={'label'}
                                    primary={row.label}
                                    primaryTypographyProps={{
                                        color: 'rgba(0,0,0,0.9)',
                                        fontWeight: 'medium',
                                        variant: 'body2',
                                        fontSize: '14px',
                                        // textTransform: 'Capitalize',
                                        fontFamily: 'Roboto',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider />
                </React.Fragment>
            ))}
        </Box>
    );
};

export default TippingSettingsHome;
