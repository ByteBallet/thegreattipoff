import React from 'react';
import NumberFormat from 'react-number-format';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { makeStyles } from '@mui/styles';
import { Box, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import TipsterAvatar from '@Components/BetSlip/Hotbet/TipsterAvatar';
import Link from 'next/Link';
import { getMonth, getTipsterAlias, getYear } from '@Components/utils/util';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    sticky: {
        position: "sticky",
        left: 0,
    }
}));

const LeaderboardTableRightSideMenu = ({ dataRows, data }) => {

    const classes = useStyles();

    const TableHeader = () => {
        return (
            <TableHead sx={{ height: 40 }} >
                <TableRow >
                    <TableCell sx={{ width: "12%" }} />
                    <TableCell align="center" padding="none" sx={{ width: "30%", pr: 4 }} >
                        Tipster
                    </TableCell>
                    <React.Fragment>
                        <TableCell align="center" padding="none" sx={{ width: "13%", bgcolor: "#fdf7ef" }}>
                            POT
                        </TableCell>
                        <TableCell align="center" padding="none" sx={{ width: "5%", lineHeight: 1.5 }} />
                    </React.Fragment>
                </TableRow>
            </TableHead>
        )
    }

    const TableContant = () => {
        return (
            <TableBody>
                {dataRows?.length > 0 && dataRows.map((row, idx) => (
                    <Link href={`/tipster/${getTipsterAlias(row?.alias)}`} key={idx}>
                        <TableRow sx={{ cursor: 'pointer' }}>
                            <TableCell padding="none" sx={{ width: '12%' }}>
                                <TipsterAvatar avatar={row?.avatarpath} alias={row?.alias} borderColor="#fff" />
                            </TableCell>
                            <TableCell sx={{ width: '25%', pr: 0.5 }} >
                                <Box >
                                    <Typography
                                        className='textCapitalize lineClamp'
                                        color="inherit"
                                        sx={{
                                            fontSize: 14,
                                            wordBreak: "break-word",
                                            fontWeight: 700,
                                            lineHeight: 1
                                        }}>
                                        {row?.alias}
                                    </Typography>
                                    <Typography
                                        className='textCapitalize lineClamp'
                                        component="p"
                                        sx={{
                                            fontSize: 12,
                                            wordBreak: "break-word"
                                        }}
                                        color="grey.main">
                                        {row?.mediagroup
                                        }
                                    </Typography>
                                </Box>
                            </TableCell>

                            <TableCell align="center" padding="none" sx={{ bgcolor: "#fdf7ef", width: '13%' }}>
                                <NumberFormat
                                    thousandSeparator={true}
                                    value={Math.round(row.pot)}
                                    displayType="text"
                                />%
                            </TableCell>
                            <TableCell align="center" padding="none" sx={{ width: '13%' }}>
                                <KeyboardArrowRightOutlinedIcon fontSize="small" />
                            </TableCell>
                        </TableRow>
                    </Link>
                ))}
            </TableBody>
        )
    }

    return (
        <>
            <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} my={1}>
                <Typography fontWeight={"bold"} fontSize={13}>
                    {getMonth(data?.startdate)} {getYear(data?.startdate)}
                </Typography>
                <Typography color="primary.main" fontWeight={"bold"} fontSize={12}>
                    Ends: {moment(data?.enddate).diff(
                        moment(moment().format('YYYY-MM-DD')),
                        'days'
                    )} days
                </Typography>
            </Stack>
            <Divider sx={{ borderColor: "#d0d1d2", boxShadow: "0 1px #fff" }} />
            <TableContainer sx={{ width: 1, overflowX: "hidden" }}>
                <Table
                    size={"small"}
                    style={{ tableLayout: "fixed" }}
                    sx={{
                        fontSize: 12,
                        '& .MuiTableCell-root': {
                            fontSize: 12,
                        },
                    }}
                >
                    <TableHeader />
                    <TableContant />
                </Table>

            </TableContainer>

        </>
    );
};

export default LeaderboardTableRightSideMenu;