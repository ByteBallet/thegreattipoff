import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { getResultsRecentWinners } from '@services/hotbets/hotbetsService';
import NumberFormat from 'react-number-format';
import NoDataLabal from '@Components/common/NoDataLabal';
import CircularLoader from '@Components/common/CircularLoader';
import Link from 'next/Link';
import { getTipsterAlias } from '@Components/utils/util';

const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: '12px',
        margin: '0px',
        padding: '0px',
    },
    boldText: {
        fontSize: '12px',
        fontWeight: 'bold',
        margin: '0px',
        padding: '0px',
    },
    dateColumn: {
        width: '20%',
        whiteSpace: 'nowrap',
        textAlign: 'center',
    },
    dateText: {
        fontSize: '12px',
        textAlign: 'left',
        margin: '0px',
        padding: '0px',
    },
    nameColumn: {
        width: '50%',
        textAlign: 'center',
    },
    subTitletext: {
        fontSize: '12px',
        margin: '-2px 0px 3px 0px',
        padding: '0px',
    },
    resultColumn: {
        width: '20%',
        flexDirection: 'row',
    },
    resultText: {
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '0px',
        padding: '0px',
    },
    rateColumn: {
        width: '10%',
    },
    rateText: {
        fontSize: '12px',
        textAlign: 'right',
        margin: '0px',
        padding: '0px',
    },
    rowContainer: {
        padding: '5px 10px 1px 10px',
        margin: '5px 15px 0px 15px',
    },
    headerText: {
        fontSize: '15px',
        textAlign: 'center',
        margin: '0px',
        padding: '15px 0px 12px 0px',
        fontWeight: 'bold',
    },
}));

const RecentWinners = ({
    selectedType,
    uid,
    adid,
    selectedCategory,
    locid = 0,
    isCarousel = false,
    HBMarket,
    timeperiod = -1,
    frmTipster = false,
    tipster = ""
}) => {
    const classes = useStyles();
    const [results, setResults] = useState([]);
    const [data, setData] = useState();
    // const [resultCount, setResultCount] = useState(5);
    const [isLoading, setIsLoading] = useState(true);

    const handelShowMoreWinners = () => {
        getData(data.startrec);
    };

    const getData = async (startrec) => {
        setIsLoading(true);

        let body = {
            cat: selectedCategory ?? '',
            racetype: selectedType,
            uid,
            adid: selectedCategory === 'FreqWin' ? locid : adid,
            startrec,
            timeperiod,
            locid,
        };

        if (HBMarket && HBMarket?.hotbetaddetail) {
            const { adDetails } = Object.values(HBMarket?.hotbetaddetail)[0];
            if (adDetails.length > 0) {
                const { LOCID, TIMEPERIOD } = adDetails[0];
                body.locid = LOCID;
                body.timeperiod = TIMEPERIOD;
            }
        }
        try {
            const response = await getResultsRecentWinners(body);
            if (response?.results) {
                setResults([...results, ...response?.results]);
                response?.totaltips &&
                    response?.totalwins &&
                    setData({
                        totaltips: response?.totaltips,
                        totalwins: response?.totalwins,
                        startrec: response?.startrec,
                    });
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData(0);
    }, []);

    let resultCount = data ? data.totalwins - data.startrec : 0;

    const ResultRow = ({ item, index }) => {
        const data = new Date(item.RACEDATE);
        return (
            <Stack
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignContent={'center'}
                alignItems={'center'}
                sx={{
                    background: (index + 1) % 2 === 1 && '#eeeff1',
                    borderTopLeftRadius: index === 0 ? 5 : 0,
                    borderTopRightRadius: index === 0 ? 5 : 0,
                    borderBottomLeftRadius:
                        (resultCount === 5 && index === 4) ||
                            (resultCount === 10 && index === 9)
                            ? 5
                            : 0,
                    borderBottomRightRadius:
                        (resultCount === 5 && index === 4) ||
                            (resultCount === 10 && index === 9)
                            ? 5
                            : 0,
                    p: '5px 10px 1px 10px',
                    m: isCarousel ? '5px 0px 0px 0px' : '5px 15px 0px 15px',
                }}
            >
                <Box className={classes.dateColumn}>
                    <p className={classes.dateText}>
                        {moment(data).format('DD MMM YY')}
                    </p>
                </Box>
                <Stack flexDirection={'column'} className={classes.nameColumn}>
                    <p
                        className={classes.boldText}
                        fontSize={12}
                    >{`${item?.SELECTION} ${item?.FIELDNAME}`}</p>
                    <p
                        className={classes.subTitletext}
                    >{`${item?.RACEMEET} R${item?.RACENUM}`}</p>
                </Stack>
                <Stack className={classes.resultColumn}>
                    <p
                        className={classes.resultText}
                        style={{ color: item?.POSITION === 1 && '#58aa00' }}
                    >
                        {item?.POSITION === 1 ? 'Win' : 'Loss'}
                    </p>
                    {item?.POSITION === 1 && (
                        <CheckCircleIcon
                            style={{
                                color: '#58aa00',
                                fontSize: '14px',
                                marginLeft: '5px',
                            }}
                        />
                    )}
                </Stack>
                <Box className={classes.rateColumn}>
                    <p className={classes.rateText}>
                        <NumberFormat
                            value={item?.POSITION === 1 && item?.RESULTPRICE}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType="text"
                        />
                    </p>
                </Box>
            </Stack>
        );
    };
    let content = frmTipster ? results?.slice(0, 6) : results
    return (
        <>
            {!isLoading && !results?.length > 0 && (
                <Box
                    sx={{
                        padding: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography style={{ color: 'inherit' }} fontSize={14}>
                        There&apos;s currently no results available. Check back
                        soon!
                    </Typography>
                </Box>
            )}
            {isLoading && <CircularLoader />}
            {!isLoading && results?.length > 0 && (
                <>
                    {data && (
                        <p className={classes.headerText}>{`${data?.totalwins
                            } Winner${data?.totalwins > 1 ? 's' : ''} from ${data?.totaltips
                            } tips`}</p>
                    )}
                    <Box mb={2}>
                        {results?.length > 0 &&
                            content.map((result, index) => {
                                return (
                                    <Stack key={result?.RACEID}>
                                        <ResultRow
                                            item={result}
                                            index={index}
                                        />
                                    </Stack>
                                );
                            })}
                    </Box>
                    {resultCount >= 0 && !frmTipster && (
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                variant="text"
                                onClick={handelShowMoreWinners}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    color: '#000',
                                    pb: 2,
                                }}
                            >
                                Show more winners
                                <KeyboardArrowDown fontSize="small" />
                            </Button>
                        </Box>
                    )}
                    {
                        resultCount >= 0 && frmTipster && (
                            <Link href={`/tipster/${getTipsterAlias(tipster)}/results`}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Button
                                        variant="text"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            color: '#000',
                                            pb: 2,
                                        }}
                                    >
                                        See all Results
                                        <KeyboardArrowDown fontSize="small" />
                                    </Button>
                                </Box>
                            </Link>
                        )
                    }
                </>
            )}
        </>
    );
};
export default RecentWinners;
