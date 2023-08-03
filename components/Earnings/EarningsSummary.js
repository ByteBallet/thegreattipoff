import React, { useContext, useEffect, useReducer, useState } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import { getEarningSummary } from '@services/earnings/earningsService';
import { TableContainer, Table, TableRow, TableCell, TableBody, Box, Paper, TableHead, CircularProgress } from '@mui/material';
import NumberFormat from 'react-number-format';

const initialState = {
    alltime: [],
    summary: [],
};
const reducer = (state, action) => {
    const newState = {
        ...state,
        ...action.payload,
    };
    switch (action.type) {
        case 'update':
            return newState;
        case 'reset':
            return initialState;
        default:
            throw new Error();
    }
};
const EarningsSummary = ({ month }) => {
    const { user } = useContext(UserContext);
    const [loading, setloading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { alltime, summary } = state;

    const handleStateUpdates = (value) => {
        dispatch({
            type: 'update',
            payload: value,
        });
    };
    const getSummary = async () => {
        setloading(true);
        let body = {
            userid: user?.userID,
            filter: month,
            summary: true,
        };
        const resp = await getEarningSummary(body);
        if (!resp?.error && resp?.data?.ERROBJ?.ERRORCODE == 0) {
            handleStateUpdates({
                alltime: resp?.data?.alltime,
                summary: resp?.data?.summary,
            });
            setloading(false);
        }
    };
    useEffect(() => {
        getSummary();
    }, [month, user?.userID]);

    function getTotal(sales, hotbet) {
        if (sales == '' && hotbet == '') return '0';
        return sales + hotbet;
    }

    return (
        <Box sx={{ bgcolor: 'white.main' }}>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{ color: 'grey.main', whiteSpace: 'nowrap' }}>Tip Sales</TableCell>
                            <TableCell padding="none" align="center" sx={{ color: 'grey.main', whiteSpace: 'nowrap' }}>
                                HOT Bets
                            </TableCell>
                            <TableCell sx={{ color: 'grey.main', whiteSpace: 'nowrap' }} align="right">
                                Total Earnings
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {summary?.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell padding="none" sx={{ pl: 2, whiteSpace: 'nowrap' }}>
                                        <b>{item?.label}</b>
                                    </TableCell>
                                    <TableCell>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={item?.sales || '0'}
                                            decimalSeparator="."
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType="text"
                                            prefix="$"
                                        />
                                    </TableCell>
                                    <TableCell padding="none" align="center">
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={item?.hotbet || '0'}
                                            decimalSeparator="."
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType="text"
                                            prefix="$"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={getTotal(item?.sales, item?.hotbet)}
                                            decimalSeparator="."
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType="text"
                                            prefix="$"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {alltime?.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell padding="none" sx={{ pl: 2, whiteSpace: 'nowrap' }}>
                                        <b>{item?.label}</b>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={item?.sales || '0'}
                                            decimalSeparator="."
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType="text"
                                            prefix="$"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} padding="none" align="center">
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={item?.hotbet || '0'}
                                            decimalSeparator="."
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType="text"
                                            prefix="$"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="right">
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={getTotal(item?.sales, item?.hotbet)}
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
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
};

export default EarningsSummary;
