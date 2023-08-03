import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import NumberFormat from 'react-number-format';
import TipsterAvatar from '@Components/BetSlip/Hotbet/TipsterAvatar';
import Link from 'next/Link';
import { getTipsterAlias } from '@Components/utils/util';

const useStyles = makeStyles({
    sticky: {
        position: 'sticky',
        left: 0,
    },
});

const LeaderboardTable = ({ dataRows }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:900px)');
    const TableHeader = () => {
        return (
            <TableHead>
                <TableRow>
                    <TableCell sx={{ width: '12%' }} />
                    <TableCell align="center" padding="none" sx={{ width: '25%', pr: 4 }}>
                        Tipster
                    </TableCell>
                    <React.Fragment>
                        <TableCell align="center" padding="none" sx={{ width: '13%' }}>
                            POT
                        </TableCell>
                        <TableCell align="center" padding="none" sx={{ width: '13%', lineHeight: 1.5 }}>
                            No.
                            <br />
                            Tips
                        </TableCell>
                        <TableCell align="center" padding="none" sx={{ width: '14%', lineHeight: 1.5 }}>
                            Winners
                        </TableCell>
                        <TableCell align="center" padding="none" sx={{ width: '13%', lineHeight: 1.5, pb: 1 }}>
                            Avg.
                            <br />
                            Odds
                        </TableCell>
                    </React.Fragment>
                </TableRow>
            </TableHead>
        );
    };

    const TableContant = () => {
        return (
            <TableBody>
                {dataRows?.length > 0 &&
                    dataRows.map((row, idx) => (
                        <TableRow key={idx} sx={{ bgcolor: row?.qualified === 1 ? '' : '#fdf5f6' }}>
                            <TableCell padding="none" sx={{ width: '12%', cursor: 'pointer', pl: { xs: 0.3, md: 1 } }}>
                                <Stack direction="row" alignItems="center" spacing={isDesktop ? 0.5 : 0.2}>
                                    <b style={{ fontSize: isDesktop ? 12 : 10 }}>{idx + 1}</b>
                                    <Link href={`/tipster/${getTipsterAlias(row?.alias)}`}>
                                        <TipsterAvatar avatar={row?.avatarpath} alias={row?.alias} borderColor="#fff" />
                                    </Link>
                                </Stack>
                            </TableCell>
                            <TableCell sx={{ width: '25%' }}>
                                <Box>
                                    <Link sx={{ textDecoration: 'none' }} href={`/tipster/${getTipsterAlias(row?.alias)}?rtype=R`}>
                                        <Typography
                                            align='left'
                                            component={'p'}
                                            className="textCapitalize"
                                            color="inherit"
                                            noWrap
                                            sx={{
                                                fontSize: 13,
                                                fontWeight: 700,
                                                lineHeight: 1.2,
                                                width: 1,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {(row?.alias?.trim()?.includes(' ') && !isDesktop) ?
                                                <div
                                                    className={"lineClamp"}
                                                    dangerouslySetInnerHTML={{
                                                        __html: row?.alias?.trim()?.replace(/ /g, "</br>")

                                                    }}
                                                /> : (row?.alias?.toLowerCase())
                                            }
                                        </Typography>
                                    </Link>
                                    <Typography
                                        className="lineClamp"
                                        component="p"
                                        sx={{
                                            fontSize: 12,
                                            wordBreak: 'break-word',
                                        }}
                                        color="grey.main"
                                    >
                                        {row?.mediagroup}
                                    </Typography>
                                </Box>
                            </TableCell>

                            <TableCell align="center" padding="none" sx={{ width: '13%', bgcolor: '#fffbef' }}>
                                <Typography fontWeight={'bold'} fontSize={14}>
                                    <NumberFormat thousandSeparator={true} value={Math.round(row.pot)} displayType="text" suffix="%" />
                                </Typography>
                            </TableCell>
                            <TableCell align="center" padding="none" sx={{ width: '13%' }}>
                                {row?.ntips}
                            </TableCell>
                            <TableCell align="center" padding="none" sx={{ width: '14%' }}>
                                <NumberFormat
                                    thousandSeparator={true}
                                    value={Math.round(row.correct)}
                                    decimalSeparator="."
                                    fixedDecimalScale={true}
                                    displayType="text"
                                />
                            </TableCell>
                            <TableCell align="center" padding="none" sx={{ width: '14%' }}>
                                <NumberFormat
                                    thousandSeparator={true}
                                    value={row.avgodds}
                                    decimalSeparator="."
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    displayType="text"
                                    prefix="$"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        );
    };

    return (
        <TableContainer>
            <Table
                size={'small'}
                aria-label="simple table"
                style={{ tableLayout: 'fixed' }}
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
    );
};

export default LeaderboardTable;
