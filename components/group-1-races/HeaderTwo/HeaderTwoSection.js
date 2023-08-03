import { TableBody, useMediaQuery, TableCell, TableHead, TableRow, Stack, Typography, Box, CircularProgress } from '@mui/material';
import Link from 'next/Link';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import TitleBar from '@Components/common/TitleBar';
import TableContantMobile from './TableContantMobile';
import { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import CircularLoader from '@Components/common/CircularLoader';

const HeaderTwoSection = ({ item }) => {

    const isDesktop = useMediaQuery('(min-width:900px)');
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [currentRowCount, setCurrentRowCount] = useState(5);
    const [loading, setloading] = useState(false)
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (item.data?.length > 0) {
            //
            setTotalRowCount(item.data?.length)
        }
    }, [item])

    const handleShowMore = () => {
        setPage(page + 1);
        setCurrentRowCount(5 * page);
        setloading(true)
        setTimeout(() => {
            setloading(false)
        }, 500);

    }
    const TableHeader = () => {
        return (
            <TableHead >
                <TableRow sx={{ height: '45px' }}>
                    <TableCell padding="none" sx={{ width: '17%', textAlign: 'left', fontWeight: 700, paddingLeft: '30px' }} >Months</TableCell>
                    <TableCell padding="none" sx={{ width: '18%', textAlign: 'left', fontWeight: 700 }}>Track</TableCell>
                    <TableCell padding="none" sx={{ width: '18%', textAlign: 'left', fontWeight: 700, paddingLeft: '30px' }}>Race</TableCell>
                    <TableCell padding="none" sx={{ width: '15%', fontWeight: 700, textAlign: 'center' }}>Prizemoney</TableCell>
                    <TableCell padding="none" sx={{ width: '14%', fontWeight: 700, textAlign: 'center' }}>Distance</TableCell>
                    <TableCell padding="none" sx={{ width: '14%', fontWeight: 700, textAlign: 'center' }}>Conditions</TableCell>
                    <TableCell padding="none" sx={{ width: '20%', fontWeight: 700 }} />
                </TableRow>
            </TableHead >
        )
    }

    const TableContant = ({ data }) => {
        return (
            <TableBody sx={{}}>
                <Link href={data.URL}>
                    <TableRow sx={{ backgroundColor: '#fff', height: '50px', cursor: "pointer" }}>
                        <TableCell padding="none" sx={{ width: '17%', textAlign: 'left', paddingLeft: '30px' }} >{data.MONTH}</TableCell>
                        <TableCell padding="none" sx={{ width: '18%', textAlign: 'left' }}>{data.TRACK}</TableCell>
                        <TableCell padding="none" sx={{ width: '18%', textAlign: 'left', fontWeight: 700 }}>{data.EVENTDESC}</TableCell>
                        <TableCell padding="none" sx={{ width: '15%', textAlign: 'center' }}>
                            <NumberFormat
                                thousandSeparator={true}
                                value={data.PRIZEMONEY}
                                fixedDecimalScale={false}
                                displayType="text"
                                prefix="$"
                            />
                        </TableCell>
                        <TableCell padding="none" sx={{ width: '14%', textAlign: 'center' }}>{data.DISTANCE}</TableCell>
                        <TableCell padding="none" sx={{ width: '14%', textAlign: 'left' }}>{data.CONDITIONS}</TableCell>
                        <TableCell padding="none" sx={{ width: '20%', fontWeight: 700, paddingLeft: '10px', paddingRight: '10px' }}>
                            <KeyboardArrowRightOutlinedIcon fontSize="small" />
                        </TableCell>
                    </TableRow>
                </Link>
            </TableBody >
        )
    }

    const ShowMore = () => {
        return (
            loading ? <CircularLoader py={1} />
                : <Stack sx={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                    padding: '12px',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                }} onClick={handleShowMore}>
                    <Typography fontSize={13}>Show More</Typography>
                    <Box ml={1}>
                        <KeyboardArrowDownIcon fontSize="small" />
                    </Box>
                </Stack>)
    }
    let endRec = isDesktop ? totalRowCount : currentRowCount
    return (
        <Box sx={{ mb: { xs: 0, md: 2 } }}>
            <TitleBar key={item.title} title={item.title} />
            {isDesktop && <TableHeader />}
            {item.data?.length > 0 && item.data.slice(0, endRec).map(row =>
                < >
                    {isDesktop ? <TableContant key={row.ID} data={row} /> : <TableContantMobile key={row.ID} data={row} />}
                </>
            )}
            {totalRowCount >= 5 && currentRowCount < totalRowCount && !isDesktop && <ShowMore />}
        </Box>)
}





export default HeaderTwoSection;


