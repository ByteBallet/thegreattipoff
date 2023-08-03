import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import { getAllRaceTracks, getPeriodMenuOptions, getResults } from '@services/tipster/tipsterService';
import {
    Box,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    Grid,
    ListSubheader,
    MenuItem,
    Select,
    Stack,
    Typography,
    Checkbox,
    ListItemText,
    OutlinedInput,
    FilledInput,
    TextField,
    Divider,
    Button,
} from '@mui/material';
import { getGroupDataSet } from '@utils/transactions.util';
import moment from 'moment';
import DateTitle from '@modules/Transactions/Components/DateTitle';
import NumberFormat from 'react-number-format';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { groupByKey } from '@Components/utils/util';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularLoader from '@Components/common/CircularLoader';
import FilterContainer from '@Components/Leaderboard/FilterContainer';
import CustomDialog from '../Shared/CustomDialog';
import Login from '@Components/user/Login';
import RacingIcon from '@Components/RacingIcon';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ResultsFilterContainer from './ResultsFilterContainer';
import CommonModal from '@Components/Payments/Common/CommonModal';
import CustomSuccessButton from '@Components/Shared/CustomSuccessButton';
import { useRouter } from 'next/router';
import InfoAlert from '@Components/Shared/InfoAlert';
import { RACETYPE_FILTER, TIPSTER_TIP_TYPE } from '@lib/constants';
import NoPendingBets from '@modules/Transactions/Components/NoPendingBets';

const Results = ({ selectedCategory, tipster, selectedType }) => {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [verify, setverify] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [resultsRaw, setresultsRaw] = useState([]);
    const [results, setResults] = useState([]);
    const [startrec, setstartrec] = useState(0);
    const [totalRecs, setTotalRecs] = useState(10000);
    const [tracks, settracks] = useState();
    const [period, setperiod] = useState();
    const [loadmore, setloadmore] = useState(true);

    const [openLogin, setOpenLogin] = useState(false);
    const [filter, setFilter] = useState(RACETYPE_FILTER[selectedType] || 0);
    const [resultTime, setResultTime] = useState(7);
    const [resultType, setResultType] = useState(0);
    const [tipType, settipType] = useState([0]);

    const [articleTag, setarticleTag] = useState("")

    const handleDataFormat = (dataSet) => {
        if (dataSet?.length > 0) {
            const newData =
                dataSet.map((item) => {
                    const dateTimeValue = item?.RACEDATE;
                    const formatedDate = moment(dateTimeValue).format('DD MMM YYYY');
                    return {
                        ...item,
                        date: formatedDate,
                    };
                });
            const groupDataSet = getGroupDataSet(newData);
            setResults(groupDataSet);
        } else {
            setResults([])
        }
    };

    const getTipTypes = () => {
        let typeList = [];
        tipType?.map((tt, idx) => {
            let list = TIPSTER_TIP_TYPE.filter((item) => item?.id == tt)
                .map((ele) => (ele.name))?.[0];
            typeList.push(list);
        })
        return typeList
    }

    const getData = async (locid = 0, menu = false, reset) => {
        if (reset) {
            setIsLoading(true);
        }
        const filters = ['all', 'win', 'place'];
        const tipTypes = ['win', 'place'];
        const filterTypes = ['all', 'R', 'G', 'H'];
        const date = new Date();
        const dateValue = date.setDate(date.getDate() - resultTime);
        const tt = moment(dateValue).format('YYYY-MM-DD');
        let body = {
            cat: selectedCategory,
            racetype: filterTypes[filter],
            uid: user?.userID ?? 0,
            tipsterid: tipster?.USERID,
            adid: selectedCategory === 'FreqWin' ? locid : tipster?.ADVERTID,
            startrec: reset ? 0 : startrec,
            resulttype: filters[resultType] ?? 'all',
            tipster: true,
            menu: menu,
            tracks: null,
            timeperiod: resultTime,
            page: 'tipster',
            tipType: getTipTypes(),
        };
        try {
            const response = await getResults(body);

            if (menu) {
                response?.data?.tracks && settracks(groupByKey(response?.data?.tracks, 'LABEL'));
            } else {
                if (response?.data?.tracks) {
                    response?.data?.tracks && settracks(groupByKey(response?.data?.tracks, 'LABEL'));
                }

                if (response?.data?.results) {
                    if (reset) {
                        setresultsRaw(response?.data?.results);
                        handleDataFormat(response?.data?.results);
                    } else {
                        setresultsRaw([...resultsRaw, ...response?.data?.results]);
                        handleDataFormat([...resultsRaw, ...response?.data?.results]);
                    }
                    setstartrec(response?.data?.startrec);
                    setTotalRecs(response?.data?.totaltips);
                    response?.data?.results?.length == 0 && setloadmore(false);
                }
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseLogin = () => {
        setOpenLogin(false)
    };

    useEffect(() => {
        setFilter(RACETYPE_FILTER[selectedType] || 0)
    }, [selectedType])


    useEffect(() => {
        getData(0, false, true);
    }, [filter, resultTime, resultType, tipType]);

    const renderRows = (item, currentIdx, total) => {
        let win = item?.POSITION == 1;
        let placed = item?.POSITION > 1 && item?.POSITION <= 3 && item?.BETTYPELABEL == 'Place';
        let price = win ? item?.RESULTPRICE : item?.RESULTPRICE;

        const iconImageWith = '35px';

        const getBgColor = () => {
            let bgcolor = "white.main"
            let betType = item?.BETTYPELABEL?.toLowerCase()
            if (item?.POSITION) {
                if (item?.POSITION == 1 && betType == "win") {
                    bgcolor = 'background.winpos'
                } else if (betType == "win" && item?.POSITION <= 3) {
                    bgcolor = 'background.placepos'
                } else if (item?.POSITION == 1 && betType == "place") {
                    bgcolor = 'background.winpos'
                } else if (item?.POSITION <= 3 && betType == "place") {
                    bgcolor = 'background.placepos'
                }
            }
            return bgcolor
        }

        return (
            <React.Fragment>
                <Grid
                    item
                    xs={12}
                    container
                    sx={{
                        pt: 1,
                        borderColor: 'grey.joinBorder',
                        bgcolor: getBgColor(),
                        px: 2,
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="start" sx={{ width: 1 }}>
                        <Box sx={{ width: '80%', display: 'flex' }}>
                            <Box sx={{ width: iconImageWith }}>
                                <RacingIcon racetype={item.RACETYPE ?? 'R'} />
                            </Box>
                            <Stack direction="column" spacing={0} alignItems="flex-start">
                                <Typography
                                    component="p"
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: 14,
                                        textDecoration: 'none',
                                        mt: -0.3,
                                    }}
                                    color="inherit"
                                >
                                    {item?.SELECTION}.&nbsp;{item?.FIELDNAME}
                                </Typography>
                                <Typography fontSize={14} className="textCapitalize" color={'grey.main'}>
                                    {item?.RACEMEET?.toLowerCase()}&nbsp;R{item?.RACENUM}
                                </Typography>
                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'flex-end',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography fontSize={14} fontWeight="bold">
                                <NumberFormat
                                    thousandSeparator={true}
                                    value={price ? price : '0'}
                                    decimalSeparator="."
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    displayType="text"
                                />
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction={'row'} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Box sx={{ marginLeft: iconImageWith }}>
                            <Typography fontSize={14} noWrap>
                                Tip type:{' '}
                                <Typography fontWeight={'bold'} fontSize={14} noWrap>
                                    {item?.BETTYPELABEL
                                        ? item?.BETTYPELABEL
                                        : win
                                            ? 'Win'
                                            : item?.POSITION && item?.POSITION <= 3
                                                ? 'Place'
                                                : 'No Return'}
                                </Typography>
                            </Typography>
                        </Box>

                        <Stack direction="column" alignItems={'flex-end'} justifyContent="space-between" sx={{ width: 1 }}>
                            <Typography fontSize={14} noWrap>
                                Stake:&nbsp;<b>{item?.STAKELABEL ? item?.STAKELABEL : 'Standard'}</b>
                            </Typography>
                            <Typography
                                fontSize={14}
                                className="textCapitalize"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 0.5,
                                }}
                            >
                                Result:&nbsp;
                                <Typography
                                    fontSize={14}
                                    sx={{
                                        color: win || placed ? 'success.main' : 'inherit',
                                        fontWeight: win || placed ? 'bold' : 'inherit',
                                    }}
                                >
                                    {win ? 'Win' :
                                        (item?.BETTYPE == 'w' && item?.POSITION > 1 && item?.POSITION <= 3) ? 'No Return' :
                                            (item?.POSITION > 1 && item?.POSITION <= 3) ? 'Win' : 'No Return'}
                                </Typography>
                                &nbsp;
                                {(win || placed) && (
                                    <CheckCircleIcon
                                        color="success"
                                        sx={{
                                            fontSize: 14,
                                        }}
                                    />
                                )}
                            </Typography>
                        </Stack>
                    </Stack>
                    {currentIdx < total - 1 && (
                        <Box sx={{ width: 1, pt: 1 }}>
                            <Divider />
                        </Box>
                    )}
                </Grid>
            </React.Fragment>
        );
    };

    useEffect(() => {
        if (user?.userID && !user?.verified) {
            setverify(true);
        }
    }, []);

    let recCount = totalRecs;
    if (user?.userID) {
        // if (user?.verified) {
        //     // recCount = user?.userID == tipster?.USERID ? recCount : 60;
        // } else {
        //     recCount = user?.userID == tipster?.USERID ? recCount : 5;
        // }
    } else {
        // recCount = 5;
    }

    const handleBtnClick = () => {
        router.push('/myaccount/verifications');
    };

    const getArticleTag = () => {
        const filterTypes = ['all', 'R', 'G', 'H'];
        const filters = ['all', 'win', 'place'];
        setarticleTag(tipster?.USERID + "_" + selectedCategory + "_" + filterTypes[filter] + "_" + resultTime + "_" + getTipTypes() + "_" + filters[resultType] ?? 'all')
    }

    return (
        <React.Fragment>
            {user?.userID && !user?.verified ? (
                <React.Fragment>
                    <CommonModal open={verify} onClose={() => setverify(false)} title="Verify your mobile">
                        <Card sx={{ backgroundColor: 'white', m: 0, p: 0 }}>
                            <CardContent>
                                <Box
                                    p={2}
                                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                                >
                                    <Typography component="p" align="center" fontSize={14}>
                                        To access Tipster Results, you must verify your mobile number.
                                    </Typography>
                                    <Typography component="p" align="center" mt={2} mb={5} fontSize={14}>
                                        Start the verification process via the button below.
                                    </Typography>
                                    <CustomSuccessButton
                                        fullwidth={true}
                                        title={'Verify my mobile number'}
                                        handleClick={handleBtnClick}
                                        rounded={false}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </CommonModal>
                    <Box py={4} sx={{ mx: { xs: 2, sm: 20 } }}>
                        <InfoAlert
                            content={
                                <Stack direction="column" alignItems={'center'} justifyContent={'center'} sx={{ width: 1 }}>
                                    <Typography component="p" align="center" color="info.comment" fontSize={13} mb={2}>
                                        To access Tipster Results, verify your mobile number via the button below.
                                    </Typography>
                                    <CustomSuccessButton
                                        fullwidth={true}
                                        title={'Verify my mobile number'}
                                        handleClick={handleBtnClick}
                                        rounded={false}
                                    />
                                </Stack>
                            }
                        />
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{ bgcolor: 'white.main', px: 2, mt: 1, pb: 1, pt: 2 }}>
                        <ResultsFilterContainer
                            setFilter={setFilter}
                            setResultTime={setResultTime}
                            setResultType={setResultType}
                            filter={filter}
                            resultTime={resultTime}
                            resultType={resultType}
                            isUser={user?.userID == tipster?.USERID}
                            editable={true}
                            tipType={tipType}
                            settipType={settipType}
                        />
                    </Box>
                    {
                        (user?.userID == 47158 || user?.userID == 47043 || user?.userID == 28 || user?.userID == 1) &&
                        <Box mt={2} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                            <CustomSuccessButton title={'Generate Article Tag'} handleClick={getArticleTag} rounded={false} />
                            {articleTag?.length > 0 &&
                                <Typography my={1}>
                                    {articleTag}
                                </Typography>}
                        </Box>
                    }
                    {isLoading ? (
                        <CircularLoader />
                    ) : (
                        <Box sx={{ p: 2 }}>
                            {results?.length > 0 ? (
                                results.map((section, idx) => (
                                    <Box mt={1} key={idx}>
                                        <DateTitle date={section[0].date} showTime={false} />
                                        {section?.length > 0 && (
                                            <Card key={idx} sx={{ width: 1 }}>
                                                <CardContent sx={{ p: 0, borderRadius: 2 }}>
                                                    <Grid container spacing={0}>
                                                        {section.map((item, i) => {
                                                            return renderRows(item, i, section.length);
                                                        })}
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </Box>
                                ))
                            ) : (
                                <Box>
                                    <NoPendingBets type={'tipsterResults'} />
                                </Box>
                            )}
                        </Box>
                    )}
                    {user?.userID && loadmore && startrec < recCount && results?.length > 0 && (
                        <Button
                            variant="text"
                            onClick={() => getData(0, false, false)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'black.main',
                                fontSize: 13,
                                width: '100%',
                            }}
                        >
                            More Results <KeyboardArrowDownIcon fontSize="small" />
                        </Button>
                    )}
                    {!user?.userID && loadmore && (
                        <Stack direction="row" alignItems={'center'} justifyContent="center">
                            <Button onClick={() => setOpenLogin(true)}>
                                <Typography fontSize={14}>Login to Show More</Typography>
                                <ExpandMore size="small" />
                            </Button>
                        </Stack>
                    )}
                </React.Fragment>
            )}

            <CustomDialog
                id={'login'}
                open={openLogin}
                title={'Login to your account'}
                content={<Login onParentClose={handleCloseLogin} skipRoute={true} />}
                fullScreen
                showX={true}
                disablePortal={false}
                onClose={handleCloseLogin}
            />
        </React.Fragment>
    );
};

export default Results;
