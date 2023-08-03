import React from 'react';
import { Box, Typography, Stack, TableRow, TableCell, TableContainer, Table, TableHead, TableBody, Paper, tableCellClasses } from '@mui/material';
import { groupByKey } from '@Components/utils/util';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const PremiumReportStaking = ({ report, renderTitle, renderAvatar, renderRacemeet }) => {
    let data = report?.qmeeting?.length > 0 ? groupByKey(report?.qmeeting, "RACEMEET") : {}

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#672089",
            color: theme.palette.white.main,
            '@media print': {
                backgroundColor: "#672089",
                color: theme.palette.white.main,
                WebkitPrintColorAdjust: "exact"
            }
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "rgb(242, 234, 245)",
            '@media print': {
                backgroundColor: "rgb(242, 234, 245)",
                WebkitPrintColorAdjust: "exact"
            }
        },
        '&:nth-of-type(even)': {
            backgroundColor: "rgb(248, 244, 249)",
            '@media print': {
                backgroundColor: "rgb(248, 244, 249)",
                WebkitPrintColorAdjust: "exact"
            }
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const renderStake = (stake) => {
        let stkLevel = report?.qStakeDetails?.filter((item) => stake >= item?.STAKEMIN && item?.STAKEMAX >= stake)
        return <Typography fontSize={14} fontWeight={"bold"}>
            {stkLevel?.[0]?.LABEL}
        </Typography>
    }
    return (
        <React.Fragment>
            {
                report?.qStake?.length > 0 && report?.client == "gto" &&
                <Box px={1}>
                    <Box sx={{
                        position: "relative",
                        bottom: { xs: 0, md: -50 }
                    }}>
                        {renderAvatar(140, 140)}
                        {renderTitle("Staking Plan")}
                    </Box>
                    <Typography component="p" mt={2} align="center" fontSize={14} >
                        <strong>{report?.qUser?.[0]?.FIRSTNAME}&apos;s staking plan is listed below. </strong>
                    </Typography>
                    <Typography component="p" mt={2} align="center" fontSize={14}>
                        The staking plan outlines {report?.qUser?.[0]?.FIRSTNAME}&apos;s betting plan based on
                        risk assessed for each race, rated runners and other factors like value.
                        The staked level is an indicator of how much {report?.qUser?.[0]?.FIRSTNAME} would outlay on each horse,
                        compared to his average stake amount (<b>Medium stake</b>).
                    </Typography>
                    <Typography component="p" mt={3} align="center" fontSize={14} >
                        Some races may include more than one staked selection, while other races may not include any staked selections.
                    </Typography>
                    {
                        Object.keys(data).map((key, idx) =>
                            <Box key={idx} my={4}>
                                {renderRacemeet(key, data?.[key]?.[0]?.RACESTATE)}
                                <TableContainer component={Paper} sx={{ my: 2 }}>
                                    <Table aria-label="simple table" size="small">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Race</StyledTableCell>
                                                <StyledTableCell align="center" sx={{ px: 0 }}>Horse</StyledTableCell>
                                                <StyledTableCell align="center">Fixed Odds<sup>*</sup></StyledTableCell>
                                                <StyledTableCell>Stake Level</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data[key]?.map((item, idx) =>
                                                    item?.STAKE && item?.STAKE > 0 ?
                                                        <StyledTableRow key={idx}>
                                                            <StyledTableCell component="th" scope="row" sx={{ p: 1 }}>
                                                                {
                                                                    (idx == 0 ||
                                                                        item?.RACENUM != data[key][idx - 1]?.RACENUM) ?
                                                                        <Typography fontSize={14}>
                                                                            Race&nbsp;{item?.RACENUM}<br />{moment(item?.RACETIME).format("h:mm A")}
                                                                        </Typography>
                                                                        :
                                                                        <div style={{ minHeight: 40 }}></div>
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center" sx={{ px: 1 }}>
                                                                {item?.SELECTIONNUMBER}.&nbsp;{item?.FIELDNAME}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <NumberFormat
                                                                    thousandSeparator={true}
                                                                    decimalSeparator="."
                                                                    decimalScale={2}
                                                                    fixedDecimalScale={true}
                                                                    displayType="text"
                                                                    prefix="$"
                                                                    value={item?.FIXEDODDS || '0'}
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell>
                                                                {
                                                                    renderStake(item?.STAKE)
                                                                }
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                        :
                                                        null
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )
                    }
                </Box>

            }
        </React.Fragment>
    );
};

export default PremiumReportStaking;