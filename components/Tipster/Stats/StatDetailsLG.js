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

const StatsDetailsLG = (props) => {
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

    const HEADING = props.size == 'small' ? 14 : 22;
    const SUB_HEADING = props.size == 'small' ? 12 : 15;
    const TEXT = props.size == 'small' ? 10 : 13;
    const ICON_SIZE = props.size == 'small' ? 15 : 20;

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
            <Box>
                <img src={getIconPath(iconName, colorId + 1)} height={20} alt={'card.name'} />
            </Box>
        ) : null;
    };
    const RenderHeader = () => {
        if(HBMarket?.STATTYPE == "DEFAULT") {
            return (
                <>
                    <DefaultHeader />
                </>
            );
        } else {
            switch (data?.STATTYPE) {
                case 'STRK':
                    return (
                        <>
                            <StrkHeader />
                        </>
                    );
                case 'STAT':
                    return (
                        <>
                            <StatHeader />
                        </>
                    );
                default:
                    return <HeaderFreqWin />
            }
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
                        fontSize: HEADING,
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
                                        fontSize: SUB_HEADING,
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
                        fontSize: TEXT,
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
                    fontSize: HEADING,
                }}
            >
                <b>
                    {`${adDetail?.adDetails?.[0]?.VALUESCORE || ''}`}
                    {` winning `}
                    {`${adDetail?.adDetails?.[0]?.SUPINFO?.toLowerCase() || ''}s `}
                </b>
                in a row
            </Typography>
            <Stack direction="row" alignItems={'center'} justifyContent={'center'} sx={{ width: '100%' }}>
                {data?.RACETRACK.toLowerCase() != 'all' && (
                    <Typography
                        noWrap
                        sx={{
                            fontSize: SUB_HEADING,
                        }}
                    >
                        at{' '}
                        <span className="textCapitalize">
                            {data?.RACETRACK?.toLowerCase()}
                            <br />
                        </span>
                    </Typography>
                )}
            </Stack>
            <Stack direction="row" mt={1}>
                {adDetail?.streak?.detail?.length > 0 &&
                    adDetail?.streak?.detail.map((item) => {
                        return <CheckCircleIcon key={item?.RACEDATE} sx={{ fontSize: ICON_SIZE, color: 'success.main' }} />;
                    })}
            </Stack>
        </Stack>
    );

    const StatHeader = () => {
        return (
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
                            fontSize: HEADING,
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
                            <Typography fontSize={HEADING - 2}>{` into `}</Typography>
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
                    <Typography component="p" align={'left'} sx={{ lineHeight: 1.4, fontSize: SUB_HEADING }}>
                        from {adDetail?.profit?.qStats?.length > 0 && adDetail?.profit?.qStats[0].TOTALWIN} winners{' '}
                        {data?.RACETRACK.toLowerCase() != 'all' && (
                            <Typography
                                noWrap
                                sx={{
                                    fontSize: SUB_HEADING,
                                }}
                            >
                                at{' '}
                                <span className="textCapitalize">
                                    {data?.RACETRACK?.toLowerCase()}
                                    <br />
                                </span>
                            </Typography>
                        )}
                    </Typography>
                </Stack>
            </>
        );
    };

    const DefaultHeader = () => {
        return (
            <>
                <Stack
                    direction="column"
                    spacing={0}
                    alignItems={isHorizontal ? 'start' : 'center'}
                    justifyContent={'center'}
                    className="HideTextOverflow"
                    sx={{ width: isHorizontal ? 1 : 'auto' }}
                >
                    {RenderIcon()}
                    <Typography
                        noWrap
                        sx={{
                            fontSize: HEADING,
                            fontWeight: 'bold',
                        }}
                    >
                        {HBMarket?.hotbetaddetail?.label}
                    </Typography>
                </Stack>
            </>
        );
    };

    return (
        <React.Fragment>
            <Stack direction="row" alignItems={'start'} justifyContent="center" spacing={1}>
                {RenderIcon()}
                {selectedCategory.toLowerCase() === 'default' ? (
                    <Typography
                        noWrap
                        sx={{
                            fontSize: HEADING,
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
        </React.Fragment>
    );
};

export default StatsDetailsLG;

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
        fontWeight: 'normal',
        color: '#9e9e9e',
    },
    subTitleSpanText: {
        fontWeight: 'bold',
        color: 'black',
    },
    winIcon: {
        color: '#58aa00',
        marginLeft: '5px',
        marginTop: '3px',
    },
});
