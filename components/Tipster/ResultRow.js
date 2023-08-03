import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import { getAllRaceTracks, getPeriodMenuOptions, getResults } from '@services/tipster/tipsterService';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    FormHelperText,
    Grid,
    ListSubheader,
    MenuItem,
    Select,
    Stack,
    Typography,
    Checkbox,
    ListItemText,
    SnackbarContent,
    FilledInput,
    TextField,
    Divider,
    Button,
    Input,
    Snackbar,
    useMediaQuery,
} from '@mui/material';
import { getGroupDataSet } from '@utils/transactions.util';
//import InputUnstyled from '@mui/base/InputUnstyled';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import DateTitle from '@modules/Transactions/Components/DateTitle';
import NumberFormat from 'react-number-format';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { groupDataByParam, groupByKey } from '@Components/utils/util';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularLoader from '@Components/common/CircularLoader';
import FilterContainer from '@Components/Leaderboard/FilterContainer';

import RacingIcon from '@Components/RacingIcon';
import PendingTipsHeader from '@modules/Transactions/PendingTips/PendingTipsHeader';

import authAPI from '@Components/utils/authAPI';
import { useRouter } from 'next/router';
import DropdownButton from '@modules/Transactions/Components/DropdownButton';

const All_CODES = [
    { id: 0, name: 'Win' },
    { id: 1, name: 'Place' },
];

import RenderRows from './Pending/RenderRows';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CustomALert from '@Components/Shared/CustomALert';

function RowItemPending({ item, currentIdx, total, setSnackBar, stakeRange, type, rempveTip }) {
    const [tipType, setTipType] = useState(item?.BETTYPELABEL.toLowerCase() === 'win' ? 0 : 1);
    let comp = stakeRange.findIndex((tt) => tt?.name.toLowerCase() === item?.STAKELABEL.toLowerCase());
    const [stakeType, setStakeType] = useState(comp ?? 0);

    return (
        <RenderRows
            item={item}
            currentIdx={currentIdx}
            total={total}
            setSnackBar={setSnackBar}
            stakeRange={stakeRange}
            type={type}
            tipType={tipType}
            setTipType={setTipType}
            stakeType={stakeType}
            setStakeType={setStakeType}
            rempveTip={rempveTip}
        />
    );
}

function RowItemResults({ item, currentIdx, total, setSnackBar, stakeRange, type }) {
    const [tipType, setTipType] = useState(item?.BETTYPELABEL.toLowerCase() === 'win' ? 0 : 1);
    const [stakeType, setStakeType] = useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <RenderRows
                item={item}
                currentIdx={currentIdx}
                total={total}
                setSnackBar={setSnackBar}
                stakeRange={stakeRange}
                type={type}
                tipType={tipType}
                setTipType={setTipType}
                stakeType={stakeType}
                setStakeType={setStakeType}
            />
        </Box>
    );
}

export function ExpandMoreSection({ proccessDate, mx = 2, px = 0 }) {
    const [showExpandMore, setShowExpandMore] = useState(false);
    return (
        <>
            {showExpandMore && (
                <Box mx={mx} py={1}>
                    <Stack py={1} direction={'row'} justifyContent="space-between" px={px}>
                        <Typography fontSize={12} color="grey.main">
                            Tip Entry Date:
                        </Typography>
                        <Typography fontSize={12} color="back.main">
                            {moment(proccessDate).format('Do, MMMM YYYY, h:mm:ss a')}
                        </Typography>
                    </Stack>
                    <Divider />
                </Box>
            )}
            {!showExpandMore && (
                <Divider
                    style={{
                        marginLeft: 12,
                        marginRight: 12,
                    }}
                />
            )}
            <Stack mx={2} mb={1} direction={'row'} justifyContent="flex-end" sx={12}>
                <Box
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 0.5 }}
                    onClick={() => setShowExpandMore(!showExpandMore)}
                >
                    <Typography fontSize={13} color="back.main">
                        Details
                    </Typography>
                    {showExpandMore ? <ExpandLess /> : <ExpandMore />}
                </Box>
            </Stack>
        </>
    );
}

function SectionTime({ sectionUnsorted, setSnackBar, stakeRange, type, rempveTip }) {
    const grouppedByTime = groupByKey(sectionUnsorted, 'RACEDATE');
    // if (type === 'pending') {
    //     return (
    //         <>
    //             {Object.values(grouppedByTime).map((item, key) => (
    //                 <SectionContainer section={item} type={type} stakeRange={stakeRange} setSnackBar={setSnackBar} key={key} />
    //             ))}
    //         </>
    //     );
    // }
    return (
        <Box>
            {Object.values(grouppedByTime).map((item, key) => (
                <SectionContainer
                    rempveTip={rempveTip}
                    section={item}
                    type={type}
                    stakeRange={stakeRange}
                    setSnackBar={setSnackBar}
                    key={key}
                />
            ))}
        </Box>
    );
    // return <SectionContainer section={sectionUnsorted} type={type} stakeRange={stakeRange} setSnackBar={setSnackBar} />;
}

function SectionContainer({ section, setSnackBar, stakeRange, type, rempveTip }) {
    return (
        <>
            {section?.length > 0 && (
                <Box width="100%">
                    <Box sx={{ my: 1 }}>
                        {type == 'pending' && <PendingTipsHeader heading={'Share your link to earn more from your tips'} />}
                    </Box>
                    <Card sx={{ width: '100%' }}>
                        <CardContent sx={{ p: 0, borderRadius: 2 }}>
                            <Grid container spacing={0}>
                                <Box container sx={{ width: '100%' }}>
                                    {section.map((item, i) => (
                                        <>
                                            {type === 'pending' ? (
                                                <RowItemPending
                                                    key={i}
                                                    item={item}
                                                    currentIdx={i}
                                                    total={section.length}
                                                    setSnackBar={setSnackBar}
                                                    stakeRange={stakeRange}
                                                    type={type}
                                                    rempveTip={rempveTip}
                                                />
                                            ) : (
                                                <RowItemResults
                                                    key={i}
                                                    item={item}
                                                    currentIdx={i}
                                                    total={section.length}
                                                    setSnackBar={setSnackBar}
                                                    stakeRange={stakeRange}
                                                    type={type}
                                                />
                                            )}
                                        </>
                                    ))}
                                </Box>
                            </Grid>
                        </CardContent>
                        <Box sx={{}}>
                            <ExpandMoreSection proccessDate={section[0].PROCESSTIME} />
                        </Box>
                    </Card>
                </Box>
            )}
        </>
    );
}

function RenderRow({
    snackMessage,
    setSnackMessage,
    snackbar,
    setSnackBar,
    results,
    type,
    stakeRange,
    rempveTip,
    pendingService = null,
    snackColor,
    setSnackColor,
}) {
    const bg = { bg: `success.alert`, text: `success.alerttext` };
    const bgError = {
        bg: 'error.alert',
        text: 'error.alerttext',
    };
    return (
        <Box sx={{ p: 2 }}>
            {results?.length > 0 ? (
                results.map((section, idx) => (
                    <Box mt={1} key={idx}>
                        <DateTitle date={section[0]?.date || section[0]?.RACEDATE} showTime={false} />
                        <SectionTime
                            rempveTip={rempveTip}
                            sectionUnsorted={section}
                            type={type}
                            stakeRange={stakeRange}
                            setSnackBar={setSnackBar}
                        />
                    </Box>
                ))
            ) : (
                <></>
            )}
        </Box>
    );
}

export default RenderRow;