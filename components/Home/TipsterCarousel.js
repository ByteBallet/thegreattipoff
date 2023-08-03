import React from 'react';
import Link from 'next/Link';
import { toTitleCase } from '@utils/hotBetUtils';
import { Typography, Stack, useMediaQuery } from '@mui/material';
import TrendingHotBets from '@modules/HotBets/Components/TrendingHotBets';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const TipsterCarousel = ({
    isTrack = false,
    experts,
    track,
    data,
    locid = 0,
    periodCode = -1
}) => {
    const isDesktop = useMediaQuery('(min-width:900px)');

    let period = data?.periodcode
    let tipsters = data?.hotbet
    let periodlabel = data?.periodlabel
    let title = '';
    if (isTrack) {
        title = track + ' tips';
    } else {
        if (period == 'TD') {
            title = title + ' ' + periodlabel?.toLowerCase();
        } else if (period == 'YD') {
            title = title + ' ' + periodlabel?.toLowerCase();
        } else {
            title = title + " " + periodlabel?.toLowerCase();
        }
        title = "& results for " + toTitleCase(title)
    }
    let data1 = isTrack ? experts : tipsters;
    return (
        <React.Fragment>
            {data1?.length > 0 && (
                <React.Fragment>
                    <Stack
                        direction="row"
                        justifyContent={'space-between'}
                        sx={{ mb: 1.5 }}
                        alignItems="center"
                    >
                        <Link href="/horse-racing-tips">
                            <Typography component="h1" fontSize={14}
                                fontWeight={isTrack ? "bold" : "regular"}
                                className={isTrack ? 'textCapitalize' : null}>
                                {!isTrack && <b style={{ cursor: "pointer" }}>Horse Racing Tips</b>} {title}
                            </Typography>
                        </Link>
                        <Link
                            href={isTrack ? `/horse-racing-results?timeperiod=${periodCode}&locid=${locid}` : `/horse-racing-results?timeperiod=${data?.period}`}
                        >
                            <Typography
                                fontSize={12}
                                sx={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <strong>Show All</strong>{' '}
                                <KeyboardArrowRightOutlinedIcon fontSize="small" />
                            </Typography>
                        </Link>
                    </Stack>
                    <TrendingHotBets
                        isCarousel={true}
                        isDesktop={isDesktop}
                        trendingHotBets={data1}
                        getTipsterCarousel={() => { }}
                        isHomePage={true}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default TipsterCarousel;
