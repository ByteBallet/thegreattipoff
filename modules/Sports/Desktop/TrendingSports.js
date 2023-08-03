import React, { useEffect, useState } from 'react';
import { getSportHighlights } from '@lib/fetcher';
import { TableRow, TableCell, Typography, Stack } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import TrendingSportItem from './TrendingSportItem';
import { useRouter } from 'next/router';

const TrendingSports = ({ onLink }) => {
    const [highlights, sethighlights] = useState([]);
    const router = useRouter();
    const getHighlights = async () => {
        const resp = (await getSportHighlights("all", 1, 0, 0)) || {};
        sethighlights(resp.hotevents || []);
    }

    useEffect(() => {
        getHighlights()
    }, [router]);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell colSpan={2}>
                    <Typography
                        component="p"
                        fontWeight="bold"
                        fontSize={14}
                    >
                        Trending Sports
                    </Typography>
                </TableCell>
            </TableRow>
            {
                highlights &&
                highlights.length > 0 &&
                highlights.map((row, idx) => (
                    <TrendingSportItem
                        data={row}
                        idx={idx}
                        key={idx}
                        hideArrow={true}

                    />
                ))}
            <TableRow onClick={() => onLink("/sports")} sx={{ cursor: "pointer" }}>
                <TableCell colSpan={2} align="right">
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
    );
};

export default TrendingSports;