import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { TableContainer, Table, Box, TableBody, TableRow, TableCell, SvgIcon, Typography, Stack } from '@mui/material';
import { hotbetCatList } from '@lib/constants';
import hotbet from '@public/images/svg/hotbet.svg';
import horses from "@public/images/svg/horse-racing1.svg";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import SportsAToZ from '../Sports/SportsAToZ';
import TrendingSports from '@modules/Sports/Desktop/TrendingSports';
import { UserContext } from '@Context/User/UserProvider';
import account from '@public/images/svg/my-account-icon.svg';

const QuickLinks = ({ hideData = false }) => {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const onLink = (href) => {
        router.push({
            pathname: href
        });
    };

    return (
        <React.Fragment>
            <TableContainer component={Box} px={1}>
                <Table
                    aria-label="caption table"
                >
                    <TableBody>
                        {
                            user?.roles === 'Admin' &&
                            <TableRow onClick={() => onLink('/myaccount/promotion')} sx={{ cursor: "pointer" }}>
                                <TableCell
                                    align="left"
                                    padding="none"
                                    style={{ width: 40, height: 40 }}
                                >
                                    <SvgIcon
                                        color="grey.light"
                                        component={account}
                                        viewBox='0 0 1816.76 1981.92'
                                        sx={{
                                            fontSize: 17,
                                            mt: 1,
                                            ml: 1
                                        }}
                                    />
                                </TableCell>
                                <TableCell padding="none" size="medium">
                                    <Typography className="data-row-tilte-text">Promotions Management</Typography>
                                </TableCell>
                            </TableRow>
                        }
                        {
                            hotbetCatList.map((item, idx) =>
                                <TableRow key={item?.label} onClick={() => onLink(item?.link)} sx={{ cursor: "pointer" }}>
                                    <TableCell
                                        align="left"
                                        padding="none"
                                        style={{ width: 40, height: 40 }}
                                    >
                                        <SvgIcon
                                            color="grey.light"
                                            component={item?.svg_icon}
                                            viewBox={item?.view_box}
                                            sx={{
                                                fontSize: 17,
                                                mt: 1,
                                                ml: 1
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell padding="none" size="medium">
                                        <Typography className="data-row-tilte-text">{item?.label}</Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                            process.env.client.restrictedModules.indexOf("hotbet") == -1 &&
                            <TableRow key="hotbets" onClick={() => onLink("/hotbets")} sx={{ cursor: "pointer" }}>
                                <TableCell
                                    align="left"
                                    padding="none"
                                    style={{ width: 40, height: 40 }}
                                >
                                    <SvgIcon
                                        color="grey.light"
                                        component={hotbet}
                                        viewBox="0 0 44.593 55.624"
                                        sx={{
                                            fontSize: 17,
                                            mt: 1,
                                            ml: 1
                                        }}
                                    />
                                </TableCell>
                                <TableCell padding="none" size="medium">
                                    <Typography className="data-row-tilte-text">HOT Bets</Typography>
                                </TableCell>
                            </TableRow>
                        }
                        <TableRow key="futures" onClick={() => onLink("/futures")} sx={{ cursor: "pointer" }}>
                            <TableCell
                                align="left"
                                padding="none"
                                style={{ width: 40, height: 40 }}
                            >
                                <SvgIcon
                                    color="grey.light"
                                    component={horses}
                                    viewBox="0 0 466.36 510.95"
                                    sx={{
                                        fontSize: 17,
                                        mt: 1,
                                        ml: 1
                                    }}
                                />
                            </TableCell>
                            <TableCell padding="none" size="medium">
                                <Typography className="data-row-tilte-text">Futures & Extras</Typography>
                            </TableCell>
                        </TableRow>
                        {
                            !hideData &&
                            <React.Fragment>
                                <TrendingSports onLink={onLink} />
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Typography
                                            component="p"
                                            fontWeight="bold"
                                            fontSize={14}
                                        >
                                            Sports A-Z
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <SportsAToZ />
                                <TableRow onClick={() => onLink("/sports")} sx={{ cursor: "pointer" }}>
                                    <TableCell colSpan={2} align="right" sx={{ border: 0 }}>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            justifyContent="flex-end"
                                        >view more
                                            <KeyboardArrowRightOutlinedIcon fontSize='small' />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};

export default QuickLinks;