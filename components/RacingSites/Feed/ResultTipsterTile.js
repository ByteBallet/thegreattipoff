import React from 'react';
import { Box, Grid, Stack, SvgIcon, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Batch from './Batch';
import TipsterAvatar from '@Components/BetSlip/Hotbet/TipsterAvatar';
import GetTipsButton from '../Buttons/GetTipsButton';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';
import StatsDetails from '@modules/HotBets/Components/StatsDetails';
import FollowButton from '@Components/Tipster/FollowButton';

import RacingIcon from '@Components/RacingIcon';
import { getSummaryTabTitles, toTitleCase } from '@utils/hotBetUtils';

import harness from '@public/images/svg/harness-racing.svg';
import greys from '@public/images/svg/greys-racing.svg';
import horses from '@public/images/svg/horse-racing.svg';
import StatsDetailsLG from '@Components/Tipster/Stats/StatDetailsLG';
import { useRouter } from 'next/router';
import { getTipsterAlias, scrollToTop } from '@Components/utils/util';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        paddingTop: '5px',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
        width: '100%',
        paddingTop: '5px',
        borderBottom: 'solid',
        borderBottomWidth: '2px',
        borderBottomColor: '#f0f1f2',
        height: '55px',
        marginBottom: '5px',
        paddingBottom: '60px',
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
        width: '100%',
        paddingTop: '5px',
        borderBottom: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#f0f1f2',
        height: '55px',
        paddingBottom: '55px',
    },
    resultRowTitle: {
        fontSize: 13.5,
        fontWeight: '600',
        padding: 0,
        margin: 0,
    },
    resultRowText: {
        fontSize: 13,
        paddingLeft: '12px',
    },
    winIcon: {
        color: '#58aa00',
        fontSize: '14px',
        marginLeft: '5px',
        marginTop: '3px',
    },
}));

const iconImageWith = '15px';

const ICON_SIZE = 15;
const COLOR = 'grey.secondary';

export const icons = {
    R: {
        value: 'R',
        svg_icon: horses,
        view_box: '0 0 466.36 510.95',
        label: 'Horses',
    },
    G: {
        value: 'G',
        svg_icon: greys,
        view_box: '0 0 1633 1465',
        label: 'Greys',
    },
    H: {
        value: 'H',
        svg_icon: harness,
        view_box: '0 0 1101 1850',
        label: 'Harness',
    },
};

function SelectIcon({ racetype }) {
    return (
        <SvgIcon
            component={icons[racetype]?.svg_icon}
            viewBox={icons[racetype]?.view_box}
            sx={{
                fontSize: ICON_SIZE,
                color: COLOR,
            }}
        />
    );
}

const ResultSummaryTile = ({ content, siteName }) => {
    const classes = useStyles();

    const ResultRow = ({ result }) => {
        let win = result?.POSITION == 1;
        const getBgColor = () => {
            let bgcolor = "white.main"
            let betType = result?.BETTYPELABEL?.toLowerCase()
            if (result?.POSITION) {
                if (result?.POSITION == 1 && betType == "win") {
                    bgcolor = 'background.winpos'
                } else if (betType == "win" && result?.POSITION <= 3) {
                    bgcolor = 'background.placepos'
                } else if (result?.POSITION == 1 && betType == "place") {
                    bgcolor = 'background.winpos'
                } else if (result?.POSITION <= 3 && betType == "place") {
                    bgcolor = 'background.placepos'
                }
            }
            return bgcolor
        }
        return (
            <Stack className={classes.resultRow} sx={{ bgcolor: getBgColor() }} px={1}>
                <Stack spacing={0} alignItems="flex-start" sx={{ width: '63%', flexDirection: 'row' }}>
                    <Stack sx={{ flexDirection: 'column', paddingLeft: '10px' }}>
                        <Stack direction={'row'}>
                            <Typography
                                sx={{
                                    fontSize: 15,
                                    fontWeight: '600',
                                    width: '20px',
                                }}
                                className={classes.resultRowTitle}
                            >{`${result?.SELECTION}.`}</Typography>
                            {result?.RESULTPRICE && parseFloat(result.RESULTPRICE) > 0 ? (
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontWeight: '600',
                                    }}
                                    className={classes.resultRowTitle}
                                >{`${result?.FIELDNAME} @ ${result?.RESULTPRICE.toFixed(2)}`}</Typography>
                            ) : (<Typography
                                sx={{
                                    fontSize: 15,
                                    fontWeight: '600',
                                }}
                                className={classes.resultRowTitle}
                            >{`${result?.FIELDNAME}`}</Typography>)}
                        </Stack>
                        <Stack direction={'row'}>
                            <Box sx={{ width: '20px' }}>
                                {/* <RacingIcon racetype={result.RACETYPE ?? 'R'} /> */}
                                <SelectIcon racetype={result.RACETYPE} />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: 'grey.main',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {`${result.RACEMEET.toLowerCase()} R${result?.RACENUM}`}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={'column'} sx={{ width: '40%' }}>
                    <Stack direction={'row'} justifyContent="flex-end">
                        <Typography
                            sx={{
                                paddingTop: '5px',
                                fontSize: 13,
                            }}
                        >
                            Stake: <b>{`${result?.STAKELABEL} (${result?.BETTYPELABEL})`}</b>
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="flex-end">
                        <Typography
                            sx={{
                                fontSize: 13,
                            }}
                        >
                            Result:{' '}
                            <span
                                style={{
                                    color: result.RESULTLABEL === 'Win' ? '#58aa00' : '#000',
                                    fontWeight: result.RESULTLABEL === 'Win' ? 'bold' : 'normal',
                                }}
                            >
                                {result.RESULTLABEL}
                            </span>
                        </Typography>
                        {result.RESULTLABEL === 'Win' && <CheckCircleIcon className={classes.winIcon} />}
                    </Stack>
                </Stack>
            </Stack>
        );
    };
    const format = 'btn';

    const router = useRouter();

    const getDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    const data = content?.beststat?.hotbetad[0];
    const adDetail = content?.beststat?.hotbetaddetail[data?.USERID];

    let showGetTips = true;
    if (content?.lasttipdate) {
        const currDate = moment();
        const tipsDate = moment(content.resultdate);

        showGetTips = currDate.diff(tipsDate) < 0;
    }

    const title = getSummaryTabTitles(data);

    return (
        <React.Fragment>
            <Grid className={classes.cardContainer} container>
                <Stack className={classes.topRow} px={1.5} mt={1}>
                    <Stack spacing={0} alignItems="flex-start" sx={{ width: '72%', flexDirection: 'row' }}>
                        <Stack onClick={() => router.push(`/tipster/${getTipsterAlias(content?.tipster?.alias)}`)} sx={{ cursor: "pointer" }}>
                            <TipsterAvatar avatar={content?.tipster?.avatarpath} alias={content?.tipster?.alias} />
                        </Stack>
                        <Stack sx={{ flexDirection: 'column', paddingLeft: '10px' }}
                            onClick={() => router.push(`/tipster/${getTipsterAlias(content?.tipster?.alias)}`)}>
                            <Typography
                                sx={{
                                    padding: 0,
                                    fontSize: 15,
                                    fontWeight: '600',
                                }}
                            >
                                {content?.tipster?.firstname || content?.tipster?.alias}
                            </Typography>
                            <Typography
                                sx={{
                                    marginTop: '-5px',
                                    fontSize: 15,
                                    fontWeight: '600',
                                }}
                            >
                                {content?.tipster?.surname || ''}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack justifyContent={'flex-end'} alignItems="flex-end">
                        <Box>
                            <Batch text={'RESULTS'} />
                        </Box>
                        <Typography
                            sx={{
                                paddingTop: '35x',
                                fontSize: 12,
                                textAlign: 'end',
                            }}
                        >
                            for {getDate(content?.results[0]?.RACEDATE) || ''}
                        </Typography>
                    </Stack>
                </Stack>
                {content?.results?.length > 0 &&
                    content.results.map((result) => <ResultRow key={result?.tipster?.surname} result={result} />)}
                <Stack alignItems="center" justifyContent="center" sx={{ width: 1, padding: '10px 20px 20px 20px' }}>
                    {/* <StatsDetails */}
                    {
                        ((content?.beststat?.STATTYPE && content?.beststat?.STATTYPE != "DEFAULT") ||
                            (content?.beststat?.hotbetaddetail[data?.USERID]?.profit?.PROFITAMOUNT > 0 &&
                                content?.beststat?.hotbetaddetail[data?.USERID]?.adDetails[0].STATTYPE == "STAT") ||
                            (content?.beststat?.hotbetaddetail[data?.USERID]?.adDetails[0].STATTYPE == "STRK")) &&
                        <Box py={1}>
                            <StatsDetailsLG
                                data={data}
                                colorId={0}
                                adDetail={adDetail}
                                title={title}
                                isTipsterStat={true}
                                content={content?.beststat}
                                selectedCategory={content?.beststat?.hotbetaddetail[data?.USERID]?.adDetails[0].STATTYPE ?? ''}
                                hotbetMarket={content?.beststat}
                                HBMarket={content?.beststat}
                                size="small"
                            />
                        </Box>
                    }
                    {content?.hastips === 1 && showGetTips ? (
                        <Box width="60%">
                            <GetTipsButton content={content} />
                        </Box>
                    ) : (
                        <Box mt={1} width="60%">
                            <FollowButton
                                follow={content?.beststat?.hotbetad[0].FOLLOWING ?? 0}
                                tipster={content?.tipster.alias}
                                tipsterid={content?.tipster.USERID}
                                fullwidth={true}
                                format="btn"
                            />
                        </Box>
                    )}
                </Stack>
            </Grid>
        </React.Fragment>
    );
};

export default ResultSummaryTile;
