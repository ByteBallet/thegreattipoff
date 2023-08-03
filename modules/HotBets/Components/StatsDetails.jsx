import React from 'react';
import NumberFormat from 'react-number-format';
import { Stack, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@mui/styles';

import { HOT_BET_ICON_TYPE } from '@lib/constants';
import { getIconPath } from '@utils/hotBetUtils';
import Link from 'next/Link';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getTipsterAlias } from '@Components/utils/util';
import Image from 'next/image';

const StatsDetails = (props) => {
    const {
        data,
        colorId,
        selectedCategory,
        adDetail,
        title,
        isHorizontal,
        isTipsterStat = false,
        trending = false,
        HBMarket = {},
        isCarousel = false,
    } = props;
    const classes = useStyles();
    const RenderIcon = () => {
        let iconName = '';
        if (selectedCategory === 'FreqWin') {
            iconName = HOT_BET_ICON_TYPE.target;
        } else if (data?.STATTYPE == 'STRK') {
            iconName = HOT_BET_ICON_TYPE.flames;
        } else if (data?.STATTYPE == 'STAT') {
            iconName = HOT_BET_ICON_TYPE.bagCash;
        } else {
            iconName = HOT_BET_ICON_TYPE.target;
        }
        return iconName.length > 0 && !isTipsterStat ? (
            <Box sx={{ position: "relative", width: 20, height: 20 }}>
                <Image src={getIconPath(iconName, colorId + 1)} alt={iconName} layout="fill" style={{ position: "relative" }} />
            </Box>
        ) : null;
    };

    const RenderHeader = () => {
        switch (data?.STATTYPE) {
            case 'STRK':
                return <StrkHeader />;
            case 'STAT':
                return <StatHeader />;
            default:
                return <HeaderFreqWin />;
        }
    };
    const HeaderFreqWin = () => {
        return (
            <Stack
                direction="column"
                spacing={0}
                alignItems={isHorizontal ? 'start' : 'center'}
                justifyContent="start"
                sx={{ width: isHorizontal ? 1 : 'auto', lineHeight: 1 }}
            >
                <Typography
                    component="p"
                    sx={{
                        lineHeight: 1,
                        fontSize: isTipsterStat ? 15 : 13,
                    }}
                >
                    <b>{title.totalWins}</b>
                    {title.totalPeriods}
                </Typography>
                {renderSubText()}
                <Stack
                    direction="row"
                    alignItems={'center'}
                    justifyContent={data?.RACETRACK.toLowerCase() != 'all' ? 'space-between' : 'flex-end'}
                    sx={{ width: '100%' }}
                >
                    {data?.RACETRACK.toLowerCase() != 'all' && (
                        <React.Fragment>
                            <Stack
                                direction="row"
                                alignItems={'center'}
                                justifyContent={
                                    isHorizontal && !trending ? 'space-between' : isHorizontal || isCarousel ? 'start' : 'center'
                                }
                                sx={{ width: 1 }}
                            >
                                <Typography
                                    noWrap
                                    sx={{
                                        fontSize: isTipsterStat ? 15 : 13,
                                        color: 'grey.hb',
                                    }}
                                >
                                    at{' '}
                                    <span className="textCapitalize">
                                        {data?.RACETRACK?.toLowerCase()}
                                        <br />
                                    </span>
                                </Typography>
                            </Stack>
                        </React.Fragment>
                    )}
                    {isHorizontal && !trending && (
                        <Link href={`/tipster/${getTipsterAlias(data?.ALIAS)}/stats`}>
                            <Typography
                                component="p"
                                noWrap
                                sx={{
                                    lineHeight: 1,
                                    color: 'info.comment',
                                    fontSize: isTipsterStat ? 14 : 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 1,
                                    cursor: 'pointer',
                                }}
                            >
                                More Stats
                                <KeyboardArrowRightIcon sx={{ fontSize: 14 }} />
                            </Typography>
                        </Link>
                    )}
                </Stack>
            </Stack>
        );
    };

    const renderSubText = (start = '', end = '') => {
        return (
            <Stack className={classes.subTitleWrapper} alignItems="start">
                <Typography
                    noWrap
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        color: 'black.main',
                        fontWeight: 'bold',
                        fontSize: isTipsterStat ? 14 : 12,
                    }}
                >
                    <span className={classes.subTitleSpanText}>{start || title.strikeRate}&nbsp;</span>
                    {end || title.strikeRateText}
                </Typography>
            </Stack>
        );
    };

    const StrkHeader = () => (
        <Stack
            direction="column"
            justifyContent={'start'}
            sx={{ width: isHorizontal ? 1 : 'auto' }}
            alignItems={isHorizontal ? 'start' : 'center'}
            spacing={0}
        >
            <Typography
                noWrap
                sx={{
                    lineHeight: 1,
                    fontSize: isTipsterStat ? 15 : 13,
                }}
            >
                <b>
                    {`${adDetail?.adDetails?.[0]?.VALUESCORE || ''}`}
                    {` winning `}
                    {`${adDetail?.adDetails?.[0]?.SUPINFO?.toLowerCase() || ''}s `}
                </b>
                in a row
            </Typography>
            <Stack
                direction="row"
                alignItems={'center'}
                justifyContent={data?.RACETRACK.toLowerCase() != 'all' ? 'space-between' : 'flex-end'}
                sx={{ width: '100%' }}
            >
                {data?.RACETRACK.toLowerCase() != 'all' && (
                    <React.Fragment>
                        <Stack
                            direction="row"
                            alignItems={'center'}
                            justifyContent={isHorizontal && !trending ? 'space-between' : isHorizontal || isCarousel ? 'start' : 'center'}
                            sx={{}}
                        >
                            <Typography
                                noWrap
                                sx={{
                                    fontSize: isTipsterStat ? 15 : 13,
                                    color: 'grey.hb',
                                }}
                            >
                                at{' '}
                                <span className="textCapitalize">
                                    {data?.RACETRACK?.toLowerCase()}
                                    <br />
                                </span>
                            </Typography>
                        </Stack>
                    </React.Fragment>
                )}
                {isHorizontal && !trending && (
                    <Link href={`/tipster/${getTipsterAlias(data?.ALIAS)}/stats`}>
                        <Typography
                            component="p"
                            noWrap
                            sx={{
                                lineHeight: 1,
                                color: 'info.comment',
                                fontSize: isTipsterStat ? 14 : 12,
                                display: 'flex',
                                alignItems: 'center',
                                mt: 1,
                                cursor: 'pointer',
                            }}
                        >
                            More Stats
                            <KeyboardArrowRightIcon sx={{ fontSize: 14 }} />
                        </Typography>
                    </Link>
                )}
            </Stack>
            <Stack direction="row">
                {adDetail?.streak?.detail?.length > 0 &&
                    adDetail?.streak?.detail.map((item) => {
                        return <CheckCircleIcon key={item?.RACEDATE} className={classes.winIcon} />;
                    })}
            </Stack>
        </Stack>
    );

    const StatHeader = () => (
        <>
            <Stack
                direction="column"
                spacing={0}
                alignItems={isHorizontal ? 'start' : 'center'}
                justifyContent={'center'}
                className="HideTextOverflow"
                sx={{ width: isHorizontal ? 1 : 'auto' }}
            >
                <Typography
                    noWrap
                    sx={{
                        lineHeight: 1.2,
                        fontSize: isTipsterStat ? 15 : 13,
                    }}
                >
                    <b>
                        {` Turned `}

                        <NumberFormat
                            thousandSeparator={true}
                            value={adDetail?.profit?.FROMAMOUNT}
                            decimalSeparator="."
                            decimalScale={0}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                        />
                        {` into `}
                        <NumberFormat
                            thousandSeparator={true}
                            value={adDetail?.profit?.TOAMOUNT}
                            decimalSeparator="."
                            decimalScale={0}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                        />
                    </b>
                    {title.totalPeriods}
                </Typography>
                <Typography component="p" align={'left'} className={classes.subTitleText} sx={{ lineHeight: 1.4 }}>
                    from {adDetail?.profit?.qStats?.length > 0 && adDetail?.profit?.qStats[0].TOTALWIN} winner
                    {adDetail?.profit?.qStats[0].TOTALWIN > 1 && 's'}&nbsp;
                </Typography>
                <Stack
                    direction="row"
                    alignItems={'center'}
                    justifyContent={isCarousel ? 'start' : 'center'}
                    // justifyContent={data?.RACETRACK.toLowerCase() != 'all' ? 'space-between' : 'flex-end'}
                    sx={{ width: '100%' }}
                >
                    {data?.RACETRACK.toLowerCase() != 'all' && (
                        <React.Fragment>
                            <Stack
                                direction="row"
                                alignItems={'center'}
                                // justifyContent={isHorizontal && !trending ? 'space-between' : isHorizontal ? 'center' : 'center'}
                                sx={{ width: 1 }}
                                justifyContent={isCarousel ? 'start' : 'center'}
                            >
                                <Typography
                                    noWrap
                                    sx={{
                                        fontSize: isTipsterStat ? 15 : 13,
                                        color: 'grey.hb',
                                        textAlign: isCarousel ? 'left' : 'center',
                                        width: isCarousel ? '60%' : 'auto',
                                    }}
                                >
                                    at{' '}
                                    <span className="textCapitalize">
                                        {data?.RACETRACK?.toLowerCase()}
                                        <br />
                                    </span>
                                </Typography>
                            </Stack>
                        </React.Fragment>
                    )}
                    {isHorizontal && !trending && (
                        <Link href={`/tipster/${getTipsterAlias(data?.ALIAS)}/stats`}>
                            <Typography
                                component="p"
                                noWrap
                                sx={{
                                    lineHeight: 1,
                                    color: 'info.comment',
                                    fontSize: isTipsterStat ? 14 : 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                More Stats
                                <KeyboardArrowRightIcon sx={{ fontSize: 14 }} />
                            </Typography>
                        </Link>
                    )}
                </Stack>
            </Stack>
        </>
    );

    return (
        <React.Fragment>
            {isHorizontal ? (
                <Grid container spacing={1} alignItems="start">
                    <Grid item xs={1.4}>
                        {RenderIcon()}
                    </Grid>
                    <Grid item xs={10.6}>
                        {selectedCategory === 'FreqWin' ? <HeaderFreqWin /> : <RenderHeader />}
                    </Grid>
                </Grid>
            ) : (
                <Stack direction="row" alignItems={'start'} justifyContent="center" spacing={1}>
                    {RenderIcon()}
                    {selectedCategory && selectedCategory?.toLowerCase() === 'default' ? (
                        <Typography
                            noWrap
                            sx={{
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}
                        >
                            {HBMarket?.hotbetaddetail?.label}
                        </Typography>
                    ) : selectedCategory === 'FreqWin' ? (
                        <HeaderFreqWin />
                    ) : (
                        <RenderHeader />
                    )}
                </Stack>
            )}
        </React.Fragment>
    );
};

export default StatsDetails;

const useStyles = makeStyles({
    //subTitle
    subTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: 0,
        marginTop: '1px',
        marginBottom: '1px',
    },
    subTitleText: {
        fontSize: '12px',
        fontWeight: 'normal',
        color: '#9e9e9e',
    },
    subTitleSpanText: {
        fontWeight: 'bold',
        color: 'black',
    },
    winIcon: {
        color: '#58aa00',
        fontSize: '14px',
        marginLeft: '5px',
        marginTop: '3px',
    },
});
