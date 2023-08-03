import React from 'react';
import { Box, Typography, Stack, TableRow, TableCell, TableContainer, Table, TableHead, TableBody, Paper, tableCellClasses } from '@mui/material';
import NumberFormat from 'react-number-format';
import { styled } from '@mui/material/styles';

const PremiumReportParlays = ({ report, renderTitle, renderAvatar, renderRacemeet }) => {
    let chknoparlay = report?.qTipData?.filter((item) => (item?.PARLAYLASTWEEK?.length == 0 && item?.PARLAYTHISWEEK?.length == 0))?.length > 0
    let chkparlay = report?.qTipData?.filter((item) => (item?.PARLAYLASTWEEK?.length > 0 && item?.PARLAYTHISWEEK?.length > 0))?.splice(0, 1)
    let chkThisWeekparlay = report?.qParlayTips?.filter((item) => (item?.PARLAYLASTWEEK?.length > 0 || item?.PARLAYTHISWEEK?.length > 0))?.splice(0, 1)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.white.main,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "rgb(242, 234, 245)",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "rgb(248, 244, 249)",
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <React.Fragment>
            {
                !chknoparlay &&
                <Box px={1}>
                    {
                        chkparlay && chkparlay?.length > 0 &&
                        <React.Fragment>
                            {renderRacemeet("Parlay Play")}
                            {
                                chkparlay?.map((item, idx) =>
                                    <React.Fragment key={idx}>
                                        {
                                            item?.PARLAYLASTWEEK?.length > 0 &&
                                            <Stack direction="column">
                                                <Typography fontSize={13} component="p"><b>LAST WEEK</b></Typography>
                                                <Typography fontSize={12} component="p">
                                                    {item?.PARLAYLASTWEEK}
                                                </Typography>
                                            </Stack>
                                        }
                                        {
                                            item?.PARLAYBALANCE > 0 &&
                                            <Typography fontSize={13} component="p" my={2}>
                                                <b style={{ marginRight: 20 }}>BALANCE</b>
                                                <u>
                                                    <NumberFormat
                                                        thousandSeparator={true}
                                                        fixedDecimalScale={0}
                                                        displayType="text"
                                                        prefix="$"
                                                        value={item?.PARLAYBALANCE || '0'}
                                                    />
                                                </u>
                                            </Typography>
                                        }
                                        {
                                            report?.qParlayTips?.length > 0 &&
                                            <React.Fragment>
                                                {
                                                    chkThisWeekparlay && chkThisWeekparlay?.map((item, idx) =>
                                                        item?.PARLAYTHISWEEK?.length > 0 &&
                                                        <Stack direction="column" key={idx}>
                                                            <Typography fontSize={13} component="p"><b>THIS WEEK</b></Typography>
                                                            <Typography fontSize={12} component="p">
                                                                {item?.PARLAYTHISWEEK}
                                                            </Typography>
                                                        </Stack>
                                                    )
                                                }
                                                <TableContainer component={Paper} sx={{ my: 2 }}>
                                                    <Table aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>Meeting</StyledTableCell>
                                                                <StyledTableCell align="center">Race</StyledTableCell>
                                                                <StyledTableCell align="center">Selection</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                report?.qmeeting?.map((item, idx) =>
                                                                    item?.PARLAYTIP == 1 &&
                                                                    <StyledTableRow key={idx}>
                                                                        <StyledTableCell component="th" scope="row">
                                                                            {item?.RACEMEET}&nbsp;({item?.RACESTATE})
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="center">
                                                                            {item?.RACENUM}
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="center">
                                                                            {item?.SELECTIONNUMBER}
                                                                        </StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </React.Fragment>

                                        }
                                    </React.Fragment>
                                )
                            }
                        </React.Fragment>
                    }
                </Box>

            }
        </React.Fragment >
    );
};

export default PremiumReportParlays;