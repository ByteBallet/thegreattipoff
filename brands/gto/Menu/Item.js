import React, { useContext, useState } from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Typography, SvgIcon, TableRow, TableCell, Badge, Stack, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { UserContext } from '@Context/User/UserProvider';
import moment from 'moment';

const Item = ({ data, handleClose }) => {
    const router = useRouter();
    const onLink = (href) => {
        if (href && !chk) {
            router.push(href);
            handleClose();
        }
    };
    const { user } = useContext(UserContext);
    let joinDateDiff = user.joindate ? moment(moment().format('YYYY-MM-DD')).diff(moment(user.joindate), 'days') : 0;
    let chk = false;
    if (data?.name == 'Withdraw' && !user.verified) {
        chk = true;
    } else if (data?.name == 'Deposit' && !user.verified) {
        chk = joinDateDiff > 3 ? true : false;
    }

    function Icon({ icon }) {
        if (!icon?.icon) return null;
        return (
            <TableCell align="left" sx={{ width: 28, paddingLeft: 3 }}>
                {icon?.icon && (
                    <SvgIcon sx={{ pl: 0, width: 25 }} color="grey.light" component={icon?.icon.svg} viewBox={icon?.icon.viewBox} />
                )}
            </TableCell>
        );
    }

    function RowMultiple() {
        const [open, setOpen] = useState(false);

        const ArrowIcon = open ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;
        return (
            <>
                <TableRow sx={{ padding: 13 }} onClick={() => setOpen(!open)}>
                    <Icon icon={data} />
                    <TableCell sx={{ w: 150, paddingLeft: data?.icon ? 0 : 3 }}>
                        <Typography className="tableFontsize" component="p" color={chk ? 'grey.light' : 'inherit'}>
                            {data?.name}
                        </Typography>
                    </TableCell>
                    <TableCell padding="none" align="right" style={{ textAlign: 'right', width: 25 }}></TableCell>
                    <TableCell align="right" padding="none">
                        <ArrowIcon fontSize="medium" sx={{ mt: 1, mr: 3, color: chk ? 'grey.light' : 'inherit' }} />
                    </TableCell>
                </TableRow>
                {open && (
                    <>
                        {data.subMenu.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ padding: 13, bgcolor: '#F0F1F3', width: '100%' }}
                                onClick={() => onLink(item?.link)}
                            >
                                <>
                                    <TableCell align="left" sx={{ width: 28, paddingLeft: 3 }}></TableCell>
                                    <TableCell sx={{ w: 150, paddingLeft: 0 }}>
                                        <Typography className="tableFontsize" component="p" color={chk ? 'grey.light' : 'inherit'}>
                                            {item?.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell padding="none" align="right" style={{ textAlign: 'right', width: 25 }}></TableCell>
                                    <TableCell align="right" padding="none"></TableCell>
                                </>
                            </TableRow>
                        ))}
                    </>
                )}
            </>
        );
    }

    function RowSingle() {
        return (
            <TableRow sx={{ padding: 13 }} onClick={() => onLink(data?.link)}>
                <Icon icon={data} />
                <TableCell sx={{ w: 150, paddingLeft: data?.icon ? 0 : 3 }}>
                    <Typography className="tableFontsize" component="p" color={chk ? 'grey.light' : 'inherit'}>
                        {!user.verified && data?.name == 'My Account' ? (
                            <Badge
                                badgeContent="!"
                                color="error"
                                className="HeaderBadge"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        right: -8,
                                    },
                                }}
                            >
                                {data?.name}
                            </Badge>
                        ) : (
                            data?.name
                        )}
                    </Typography>
                </TableCell>
                <TableCell padding="none" align="right" style={{ textAlign: 'right', width: 25 }}></TableCell>
                <TableCell align="right" padding="none">
                    {/* <KeyboardArrowRightOutlinedIcon fontSize="medium" sx={{ mt: 1, mr: 3, color: chk ? 'grey.light' : 'inherit' }} /> */}
                </TableCell>
            </TableRow>
        );
    }
    return <>{data.sub ? <RowMultiple /> : <RowSingle />}</>;
};

export default Item;
