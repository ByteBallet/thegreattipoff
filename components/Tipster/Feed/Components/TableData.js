import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Box, Chip, Grid, Typography } from '@mui/material';
import CustomChip from './CustomChip';

function createData(name, last_week, this_week) {
    return { name, last_week, this_week };
}

const rows = [
    createData('Your Following', 159, 6.0),
    createData('Following you', 237, 9.0),
    createData('Your page visits', 262, 16.0),
    createData('Your Tip packages sold', 305, 3.7),
    createData('Your HOT Bets taken', 356, 16.0),
];

function Row({ desc, lWeek, tWeek, showChip }) {
    return (
        <Grid container sx={{ lineHeight: 1 }}>
            <Grid item xs={6}>
                {showChip ? (
                    <Box width={'120px'}>
                        <CustomChip text={desc} color={'white.main'} backgroundColor={'primary.main'} />
                    </Box>
                ) : (
                    <Typography sx={{}} fontSize={12}>
                        {desc}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Typography sx={{}} fontSize={12}>
                    {lWeek}
                </Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Typography fontWeight={'bold'} fontSize={12}>
                    {tWeek}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default function UserData({ content }) {
    const rows = [
        createData('Your Following', content?.lastweek?.nyoufollow ?? 0, content?.currentweek?.nyoufollow ?? 0),
        createData('Following you', content?.lastweek?.nfollows, content?.currentweek?.nfollows),
        createData('Your page visits', content?.lastweek?.pagevisit, content?.currentweek?.pagevisit),
        createData('Your Tip packages sold', content?.lastweek?.tipssold, content?.currentweek?.tipssold),
        createData('Your HOT Bets taken', content?.lastweek?.hotbetsold, content?.currentweek?.hotbetsold),
    ];

    return (
        <Box>
            <Box mb={1}>
                <Row desc="WEEKLY UPDATES" lWeek="Last Week" tWeek="This Week" showChip={true} />
            </Box>
            {rows.map((row, index) => (
                <Row desc={row?.name ?? ''} lWeek={row?.last_week} tWeek={row?.this_week} key={index} />
            ))}
        </Box>
    );
}

// export default function UserData() {
//     return (
//         <TableContainer component={Paper}>
//             <Table aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>
//                             <Chip
//                                 size="small"
//                                 label="WEEKLY UPDATE"
//                                 color="secondary"
//                             />
//                         </TableCell>
//                         <TableCell align="right">Last Week</TableCell>
//                         <TableCell align="right">This Week</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map((row) => (
//                         <TableRow
//                             key={row.name}
//                             sx={{
//                                 '&:last-child td, &:last-child th': {
//                                     border: 0,
//                                 },
//                             }}
//                         >
//                             <TableCell component="th" scope="row">
//                                 {row.name}
//                             </TableCell>
//                             <TableCell align="right">{row.last_week}</TableCell>
//                             <TableCell align="right">{row.this_week}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }
