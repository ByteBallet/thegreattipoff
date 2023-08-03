import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Box, Typography, ClickAwayListener, useMediaQuery } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import HtmlTooltip from '@Components/ToolTip';
import moment from 'moment';

function GetToolTipContent({ details, parentStats }) {
    const isTip = parentStats.STREAkUNIT == 'TIP';
    const isWin = details.WINPERIOD == 1;

    const trackLabel = parentStats.RACETRACK == 'All' ? 'All Tracks' : parentStats.RACETRACK;

    const date = moment(details.RACEDATE).format('DD-MM-YYYY');

    if (isWin) {
        if (isTip) {
            return (
                <Box textAlign={'center'}>
                    <Box textAlign={'center'}>
                        <Typography color="success.main" fontWeight={'bold'}>
                            {parentStats.STREAK}
                        </Typography>
                        <Typography color="white.main">tips at</Typography>
                        <Typography color="success.main" fontWeight={'bold'}>
                            {trackLabel}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography color="white.main">{date}</Typography>
                    </Box>
                    <Box>
                        <Typography color="white.main">Win Price: {details.WINPROFIT}</Typography>
                    </Box>
                </Box>
            );
        } else {
            return (
                <Box textAlign={'center'}>
                    <Box textAlign={'center'}>
                        <Typography color="success.main" fontWeight={'bold'} textAlign={'center'}>
                            {parentStats.STREAK} {parentStats.STREAKUNIT}{' '}
                        </Typography>
                        <Typography color="white.main" textAlign={'center'}>
                            tipping streak at{' '}
                        </Typography>
                        <Typography color="success.main" fontWeight={'bold'} textAlign={'center'}>
                            {trackLabel}
                        </Typography>
                    </Box>
                    <Typography color="white.main">{date}</Typography>
                    <Box>
                        <Typography color="white.main">
                            Win Profit: {details.WINPROFIT.toFixed(0)}% from {details?.TOTALTIPS} selections
                        </Typography>
                    </Box>
                </Box>
            );
        }
    } else {
        if (isTip) {
            return (
                <Box textAlign={'center'}>
                    <Box textAlign={'center'}>
                        <Typography color="white.main">Last</Typography>
                        <Typography color="success.main" fontSize={'bold'}>
                            {parentStats.STREAK}
                        </Typography>
                        <Typography color="white.main">tips at</Typography>
                        <Typography color="success.main" fontSize={'bold'}>
                            {trackLabel}
                        </Typography>
                    </Box>
                    <Typography color="white.main">{date}</Typography>
                </Box>
            );
        } else {
            return (
                <Box textAlign={'center'}>
                    <Box textAlign={'center'}>
                        <Typography color="success.main" fontWeight={'bold'} textAlign={'center'}>
                            {parentStats.STREAK} {parentStats.STREAKUNIT}{' '}
                        </Typography>
                        <Typography color="white.main" textAlign={'center'}>
                            tipping streak at{' '}
                        </Typography>
                        <Typography color="success.main" fontWeight={'bold'} textAlign={'center'}>
                            {trackLabel}
                        </Typography>
                    </Box>
                    <Typography textAlign={'center'} color="white.main">
                        {date}
                    </Typography>
                    <Box alignItems={'center'} justifyContent={'center'} sx={{ display: 'flex' }}>
                        <Typography textAlign={'center'} color="white.main">
                            Total Selections: {details?.TOTALTIPS}
                        </Typography>
                    </Box>
                </Box>
            );
        }
    }
}

function MobileStreak({ title, item }) {
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <Box onClick={handleTooltipOpen}>
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <Box>
                    <HtmlTooltip
                        title={title ?? <></>}
                        arrow
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                    >
                        {item.WINPERIOD == 1 ? (
                            <CheckCircleIcon
                                color="success"
                                sx={{
                                    fontSize: 20,
                                }}
                            />
                        ) : (
                            <CancelIcon
                                sx={{
                                    fontSize: 20,
                                    color: 'grey.dark',
                                }}
                            />
                        )}
                    </HtmlTooltip>
                </Box>
            </ClickAwayListener>
        </Box>
    );
}

function DesktopStreak({ title, item }) {
    return (
        <Box sx={{ cursor: 'pointer' }}>
            <HtmlTooltip title={title ?? <></>} arrow>
                {item.WINPERIOD == 1 ? (
                    <CheckCircleIcon
                        color="success"
                        sx={{
                            fontSize: 20,
                        }}
                    />
                ) : (
                    <CancelIcon
                        sx={{
                            fontSize: 20,
                            color: 'grey.dark',
                        }}
                    />
                )}
            </HtmlTooltip>
        </Box>
    );
}

// <Box key={index}>
//     <HtmlTooltip arrow title={<GetToolTipContent details={item} parentStats={data?.STREAKDETAIL.streak[0]} />}>
// {item.WINPERIOD == 1 ? (
//     <CheckCircleIcon
//         key={index}
//         color="success"
//         sx={{
//             fontSize: 20,
//         }}
//     />
// ) : (
//     <CancelIcon
//         key={item?.RACEDATE}
//         sx={{
//             fontSize: 20,
//             color: 'grey.dark',
//         }}
//     />
// )}
//     </HtmlTooltip>
// </Box>

const StreakDetails = ({ data }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    return (
        <>
            {data?.STREAKDETAIL?.detail && data.STREAKDETAIL.detail.length > 0 && (
                <Stack direction="row" justifyContent={'center'} alignItems="center">
                    {data.STREAKDETAIL.detail.map((item, index) =>
                        isDesktop ? (
                            <DesktopStreak
                                key={index}
                                item={item}
                                title={<GetToolTipContent details={item} parentStats={data?.STREAKDETAIL.streak[0]} />}
                            />
                        ) : (
                            <MobileStreak
                                key={index}
                                item={item}
                                title={<GetToolTipContent details={item} parentStats={data?.STREAKDETAIL.streak[0]} />}
                            />
                        )
                    )}
                </Stack>
            )}
        </>
    );

    return (
        <>
            <HtmlTooltip title={<Box>Hekki</Box>} arrow></HtmlTooltip>
        </>
    );

    // Rdundant
    // return (
    //     <React.Fragment>
    //         {
    //             data?.STREAK ?
    //                 <Stack direction="row" justifyContent={"center"} alignItems="center">
    //                     {[...Array(data?.STREAK)].map((item, idx) =>
    //                         idx % 2 == 0 ? <CheckCircleIcon
    //                             key={item?.RACEDATE}
    //                             color="success"
    //                             sx={{
    //                                 fontSize: 20
    //                             }}
    //                         /> :
    //                             <CancelIcon
    //                                 key={item?.RACEDATE}
    //                                 sx={{
    //                                     fontSize: 20,
    //                                     color: "grey.dark"
    //                                 }}
    //                             />
    //                     )}
    //                 </Stack>
    //                 :
    //                 "--"
    //         }

    //     </React.Fragment>
    // );
};

export default StreakDetails;
