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
    FormGroup,
    FormControlLabel,
    useMediaQuery,
} from '@mui/material';
import { getGroupDataSet } from '@utils/transactions.util';
//import InputUnstyled from '@mui/base/InputUnstyled';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import DateTitle from '@modules/Transactions/Components/DateTitle';
import NumberFormat from 'react-number-format';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { groupByKey } from '@Components/utils/util';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularLoader from '@Components/common/CircularLoader';
import FilterContainer from '@Components/Leaderboard/FilterContainer';

import RacingIcon from '@Components/RacingIcon';
import PendingTipsHeader from '@modules/Transactions/PendingTips/PendingTipsHeader';

import authAPI from '@Components/utils/authAPI';
import { useRouter } from 'next/router';
import DropdownButton from '@modules/Transactions/Components/DropdownButton';
import { ExpandMoreSection } from '../ResultRow';

import CustomChip from '../Feed/Components/CustomChip';

const All_CODES = [
    { id: 0, name: 'Win' },
    { id: 1, name: 'Place' },
];

const RenderRows = ({
    item,
    currentIdx,
    total,
    setSnackBar,
    stakeRange,
    type,
    tipType,
    setTipType,
    stakeType,
    setStakeType,
    rempveTip,
}) => {
    const [showEditContainer, setShowEditContainer] = useState(false);
    const [text, setEditText] = useState(item?.COMMENT ?? '');
    const [loading, setLoading] = useState(false);
    const [tipChange, setTipChange] = useState(false);
    const [price, setPrice] = useState((type === 'pending' ? item?.FIXEDPRICE : item?.RESULTPRICE) ?? 0);
    const [freeTip, setFreeTip] = useState(item?.FREETIP == 1 ?? false);

    // const [tipType, setTipType] = useState(item?.BETTYPELABEL.toLowerCase() === 'win' ? 0 : 1);
    // let comp = stakeRange.findIndex((tt) => tt?.name.toLowerCase() === item?.STAKELABEL.toLowerCase());
    // const [stakeType, setStakeType] = useState(comp ?? 0);

    let win = item?.POSITION == 1;
    let placed = item?.POSITION > 1 && item?.POSITION <= 3 && item?.BETTYPELABEL == 'Place';

    const isDesktop = useMediaQuery('(min-width:900px)');

    const iconImageWith = '35px';

    const router = useRouter();

    const { user } = useContext(UserContext);

    const isPremium = user?.premium == 1 ?? false;

    const onSaveComment = async (item) => {
        let body = {
            comment: text,
            tipid: item?.SELECTID,
            userid: item?.USERID,
            eventid: item?.RACEID,
            tiptype: All_CODES[tipType].name,
            staketype: stakeRange[stakeType].stake,
        };

        if (isPremium) {
            body.freetip = freeTip;
        }
        setLoading(true);
        // TODO: Add update for tip type and
        const url = `${process.env.server}/tipslip/updateComment`;
        try {
            const response = await authAPI(url, body, 'POST', true);
            if (!response.error) {
                setSnackBar(true);
                setTimeout(() => setSnackBar(false), 5000);
            }
        } catch (e) {
        } finally {
            setLoading(false);
            setShowEditContainer(false);
        }
    };

    useEffect(() => {
        setEditText(item?.COMMENT ?? '');
    }, [item?.COMMENT]);

    function getBackgroundColor(position) {
        if (position == 1) return 'background.placepos';
        else if (position == 2 || position == 3) return 'background.winpos';

        return 'inherit';
    }

    const freeTipLabel = () => {
        if (showEditContainer) {
            if (item?.FREETIP == 1) return true;
            else return false;
        }

        return freeTip;
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    pt: 1,
                    borderColor: 'grey.joinBorder',
                    // bgcolor: getBackgroundColor(item?.POSITION),
                    bgcolor: win ? 'background.winpos' : item?.POSITION && item?.POSITION <= 3 ? 'background.placepos' : 'inherit',
                    px: 2,
                    width: '100%',
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="start" sx={{ width: 1 }}>
                    <Box sx={{ width: '80%', display: 'flex' }}>
                        <Box sx={{ width: iconImageWith }}>
                            <RacingIcon racetype={item.RACETYPE ?? 'R'} />
                        </Box>
                        <Stack direction="column" spacing={0} alignItems="flex-start">
                            <Stack direction="row" spacing={0} alignItems="flex-start">
                                <Typography
                                    component="p"
                                    sx={{
                                        fontWeight: item?.SCRATCHING == 1 ? '400' : '600',
                                        fontSize: 14,
                                        textDecoration: item?.SCRATCHING == 1 ? 'line-through' : 'none',
                                    }}
                                    color={item?.SCRATCHING == 1 ? "grey.light" : "inherit"}
                                >
                                    {item?.SELECTION ?? item?.FIELDNUM}.&nbsp;{item?.FIELDNAME}
                                </Typography>{' '}
                                {type === 'pending' && item.PURCHASED == 0 && (
                                    <Box onClick={() => setShowEditContainer(true)}>
                                        <EditIcon
                                            fontSize="extra-small"
                                            sx={{
                                                color: 'primary.main',
                                                ml: 1,
                                            }}
                                        />
                                    </Box>
                                )}
                            </Stack>
                            <Typography
                                fontSize={12}
                                className="textCapitalize"
                                color={item?.SCRATCHING == 1 ? "grey.light" : type === 'pending' ? 'info.comment' : 'grey.main'}
                                onClick={() => {
                                    let eventUrl = `/racing/${item.RACEMEET}/${item.RACEID}`;
                                    // console.log(item);
                                    router.push(eventUrl);
                                }}
                            >
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
                        {isPremium && freeTipLabel() && (
                            <Box width="40px" mr={1}>
                                <CustomChip text="Free" color="white.main" backgroundColor="success.main" />
                            </Box>
                        )}
                        <Box pt={1}>
                            <Typography fontSize={13} fontWeight="bold" color={item?.SCRATCHING == 1 ? "grey.light" : 'inherit'}>
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
                    </Box>
                </Stack>

                <Stack direction={'row'} justifyContent="space-between" sx={{ width: '100%' }}>
                    <Box sx={{ marginLeft: iconImageWith, lineHeight: 1 }}>
                        {showEditContainer && type == 'pending' ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography fontSize={12} noWrap mr={1} >
                                    Tip type:{' '}
                                </Typography>
                                <DropdownButton
                                    options={All_CODES}
                                    onChange={(val) => {
                                        setTipChange(true);
                                        setTipType(val);
                                    }}
                                    fontWeight={'bold'}
                                    inputStyleProps={{ fontSize: 13, fontWeight: 'bold' }}
                                    value={tipType}
                                />
                            </Box>
                        ) : (
                            <Typography fontSize={12} noWrap color={item?.SCRATCHING == 1 ? "grey.light" : 'inherit'}>
                                Tip type:{' '}
                                <Typography fontWeight={'bold'} fontSize={12} noWrap color={item?.SCRATCHING == 1 ? "grey.light" : 'inherit'}>
                                    {/* {win ? 'Win' : item?.POSITION && item?.POSITION <= 3 ? 'Place' : 'Unplace'} */}
                                    {All_CODES[tipType]?.name || item?.BETTYPELABEL}
                                </Typography>
                            </Typography>
                        )}
                    </Box>

                    <Stack direction="column" alignItems={'flex-end'} justifyContent="space-between" sx={{ width: 1 }}>
                        {showEditContainer && type == 'pending' ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography fontSize={12} noWrap mr={1}>
                                    Stake:{' '}
                                </Typography>
                                <DropdownButton
                                    options={stakeRange}
                                    onChange={(val) => {
                                        setTipChange(true);
                                        setStakeType(val);
                                    }}
                                    fontWeight={'bold'}
                                    inputStyleProps={{ fontSize: 13, fontWeight: 'bold' }}
                                    value={stakeType}
                                />
                            </Box>
                        ) : (
                            <Typography fontSize={12} noWrap color={item?.SCRATCHING == 1 ? "grey.light" : 'inherit'}>
                                Stake:&nbsp;
                                <b>{type == 'pending' ? stakeRange[stakeType]?.name ?? item?.STAKELABEL : item?.STAKELABEL}</b>
                            </Typography>
                        )}
                        {type !== 'pending' && (
                            <Typography
                                fontSize={12}
                                className="textCapitalize"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 0.5,
                                }}
                            >
                                Result:&nbsp;
                                {
                                    item?.SCRATCHING == 1 ?
                                        <Typography
                                            fontSize={12}
                                            sx={{
                                                color: win || placed ? 'success.main' : 'inherit',
                                                fontWeight: win || placed ? 'bold' : 'inherit',
                                            }}
                                        >Scratched</Typography> :
                                        <React.Fragment>
                                            <Typography
                                                fontSize={12}
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
                                                        fontSize: 12,
                                                    }}
                                                />
                                            )}
                                        </React.Fragment>
                                }
                            </Typography>
                        )}
                    </Stack>
                </Stack>
                {type === 'pending' && (
                    <Box sx={{ width: '100%', mb: 2 }}>
                        {showEditContainer ? (
                            <>
                                <Box>
                                    <Box
                                        sx={{
                                            backgroundColor: 'grey2.main',
                                            p: 1,
                                            mt: 1,
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <Box>
                                            <Input
                                                type="text"
                                                id="lname"
                                                name="lname"
                                                value={text}
                                                disabled={!showEditContainer}
                                                onChange={(e) => {
                                                    setTipChange(true);
                                                    setEditText(e.target.value);
                                                }}
                                                fullWidth
                                                multiline={true}
                                                placeholder="Comment here... it adds merit to your tips"
                                                className="pendingCommentBox"
                                                sx={{
                                                    border: 0,
                                                    fontSize: 12,
                                                    color: 'grey.dark',
                                                }}
                                            />
                                        </Box>

                                        {/* <input
                                        type="text"
                                        id="lname"
                                        name="lname"
                                        value={text}
                                        disabled={showEditContainer}
                                        placeholder="Enter tips to save"
                                        
                                        onChange={(e) => setEditText(e.target.value)}
                                    /> */}
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                                        <Grid container>
                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                {loading ? (
                                                    <>
                                                        <CircularProgress />
                                                    </>
                                                ) : (
                                                    <>
                                                        {isPremium && (
                                                            <Grid item xs={1} sx={{}}>
                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                        sx={{ fontSize: 12 }}
                                                                        control={
                                                                            <Checkbox
                                                                                checked={freeTip}
                                                                                onChange={() => {
                                                                                    setTipChange(true);
                                                                                    setFreeTip(!freeTip);
                                                                                }}
                                                                            />
                                                                        }
                                                                        label="Free"
                                                                    />
                                                                </FormGroup>
                                                            </Grid>
                                                        )}
                                                        <Grid
                                                            item
                                                            xs={isPremium ? 11 : 12}
                                                            direction={'row'}
                                                            justifyContent={'flex-end'}
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                mr: -1,
                                                            }}
                                                        >
                                                            <Button
                                                                onClick={() => {
                                                                    setShowEditContainer(false);
                                                                    onSaveComment(item);
                                                                }}
                                                                variant="contained"
                                                                disabled={!tipChange}
                                                                size="small"
                                                                color="success"
                                                            >
                                                                <Typography px={4} fontWeight={'bold'} color="white.main">
                                                                    Save
                                                                </Typography>
                                                            </Button>
                                                        </Grid>
                                                        {isDesktop && (
                                                            <Grid item xs={1} sx={{}}>
                                                                <Button
                                                                    onClick={() => {
                                                                        setShowEditContainer(false);
                                                                        rempveTip.removeTip(item.SELECTID);
                                                                        // setEditText('');
                                                                    }}
                                                                >
                                                                    {rempveTip.loading ? <></> : <DeleteIcon color="grey" />}
                                                                </Button>
                                                            </Grid>
                                                        )}
                                                    </>
                                                )}
                                            </Grid>
                                            {!isDesktop && (
                                                <Box item xs={2} sx={{ position: 'absolute', right: 15 }}>
                                                    <Button
                                                        onClick={() => {
                                                            setShowEditContainer(false);
                                                            rempveTip.removeTip(item.SELECTID);
                                                            // setEditText('');
                                                        }}
                                                    >
                                                        {rempveTip.loading ? <></> : <DeleteIcon color="grey" />}
                                                    </Button>
                                                </Box>
                                            )}
                                        </Grid>
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <>
                                {text && text !== '' && (
                                    <Box
                                        sx={{
                                            backgroundColor: 'grey2.main',
                                            p: 1,
                                            mt: 1,
                                            borderRadius: '5px',
                                            border: 1,
                                            borderColor: 'grey.light',
                                        }}
                                    >
                                        <Typography fontSize={13} sx={{ color: 'grey.dark' }}>
                                            {text}
                                        </Typography>
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                )}
            </Box>
            {process.env.APP_BRAND !== 'gto' && (
                <Box pt={1}>
                    <ExpandMoreSection proccessDate={item.PROCESSTIME} mx={0} px={2} />
                    {currentIdx < total - 1 && (
                        <Box sx={{}}>
                            <Divider />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default RenderRows;
