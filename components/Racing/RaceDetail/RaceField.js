import React from 'react';
import { useContext, useRef, useState, useEffect } from 'react';
import authAPI from '@Components/utils/authAPI';
import {
    Box,
    Typography,
    Snackbar,
    Alert,
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Fade,
    Grid,
    useMediaQuery,
    Stack,
} from '@mui/material';
import StatComponent from './StatComponent';
import RaceOdds from './RaceOdds';
import RaceFieldScracthed from './RaceFieldScratched';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { UserContext } from '@Context/User/UserProvider';
import { TipContext } from '@Context/Tip/TipProvider';
// Tip Models
import Singles from '../../../Models/Tip/Singles';
import moment from 'moment';
import RaceTip from '../../Tipping/RaceTip';
import Priceflucs from '../../Betting/Priceflucs';
import FieldsSelection from '../../Betting/FieldsSelection';
import CustomALert from '../../Shared/CustomALert';
import { getBetID } from '../../utils/RacingUtil';
import { useSession } from 'next-auth/client';
import getBoostDetails from '@services/Betslip/getBoostDetails';
import InfoAlert from '@Components/Shared/InfoAlert';
import SpeedMap from './SpeedMap';

export default function RaceField({
    raceField,
    raceid,
    event,
    raceResulted,
    showStat,
    stats,
    columns,
    flucs,
    hotbet,
    runners,
    speedMap,
    activeTabName,
    fieldsCount,
    isBoxed,
    toggleField,
    betsLocal,
    setBetsLocal,
    raceBetProducts,
    productGroupType,
    eventDetails,
    setsCombinations,
    raceStatus,
    handleBetSlip,
    quaddieRaces,
    racenumbers,
    quaddienum,
    setquaddieBets,
    totalRunners,
    raceSpeedMaps,
    quaddieBets,
    desktopColumns,
    sortUpdate,
}) {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [session] = useSession();
    const { user } = useContext(UserContext);
    const { tips, addTip, removeTip } = useContext(TipContext);
    const [hideImage, setHideImage] = useState(false);

    const [alertTip, setalertTip] = useState({
        open: false,
        Transition: Fade,
    });
    // set image url
    let url = `${process.env.cdn}/images/silks/jockey-silk-${raceid}-${raceField.actualcode}.png`;
    if (event && event.racetype && event.racetype === 'G') {
        url = `${process.env.cdn}/images/greyhound/Grey-${raceField.fieldnum}.png`;
    }
    let fallbackSrc = `${process.env.cdn}/images/silkdefault.png`;

    function statsClicked() {
        showStat(raceField.actualcode);
    }

    // scratched horses
    if (raceField.scratching) {
        return (
            <RaceFieldScracthed
                raceField={raceField}
                columns={columns}
                activeTabName={activeTabName}
                isBoxed={isBoxed}
            />
        );
    }
    let tip = new Singles(
        raceid,
        event ? event.bookieeventid : '',
        raceField.actualcode,
        'TIP',
        'win',
        moment.utc(raceField.racetimeutc).local().format('DD MMM YYYY'),
        raceField.fieldnum,
        raceField.fieldname,
        'racing',
        event ? event.racetype : 'R',
        null,
        raceField.racetimeutc,
        raceField.racemeet,
        raceField.win,
        raceField.racenum,
        raceField.image,
        raceField.barrier,
        raceField.eventname
    );
    let selected =
        tips.singles.filter((sTip) => getBetID(sTip) === getBetID(tip)).length >
        0
            ? true
            : false;

    let totalbets = 0;
    Object.keys(tips).map((key, idx) => {
        key != 'multi' &&
            (totalbets = totalbets + (tips[key] ? tips[key].length : 0));
    });

    async function checkBoostAvailable() {
        if (
            tip.betType.toLowerCase() == 'win' &&
            session &&
            productGroupType.toLowerCase().indexOf('fixed') > -1
        ) {
            const res = await getBoostDetails(
                tip,
                user.clientID ? user.clientID : '',
                user.racingBoostBal,
                false
            );
            if (res && Object.keys(res).length > 0) {
                if (res.legstatuscode == '0' || res.legstatuscode == 0) {
                    tip.boostPrice = res.boostdiv;
                    tip.boostMode = res.boostmode;
                    tip.betPrice = res.currentprice;
                    tip.maxBoostStake = res.maxstake;
                    tip.boostAvailable = true;
                    tip.legerror = false;
                } else if (
                    res.legstatuscode == 307 ||
                    res.legstatuscode == 352 ||
                    res.legstatuscode == 353
                ) {
                    tip.boostAvailable = false;
                    tip.legerror = true;
                } else {
                    tip.boostAvailable = false;
                    tip.legerror = false;
                }
            } else {
                tip.boostAvailable = false;
            }
        }
    }

    function addTipToBetSlip(key, win, odds, stype, btype, pgType) {
        tip.betType = btype;
        tip.stype = stype;
        tip.price = odds;
        tip.betproducts = raceBetProducts;
        tip.productGroupType = pgType;
        tip.bookieeventid = event.bookieeventid;
        tip.betID = moment().valueOf();
        tip.sprices = raceField?.sprices;
        if (
            user &&
            user.mbsused &&
            user.mbsused.filter((item) => item == raceid).length == 0
        ) {
            tip.specials = eventDetails.special;
        }
        let selected =
            tips.singles.filter((sTip) => getBetID(sTip) === getBetID(tip))
                .length > 0
                ? true
                : false;
        if (selected) {
            removeTip({ key: key, tip });
        } else {
            addTip({ key: key, tip });
            //check for user login
            if (session) {
                if (totalbets == 0) {
                    //if single tap on, open betslip automatically
                    user.singletap == 1 ? handleBetSlip() : handleClick();
                } else {
                    handleClick();
                }
            } else {
                totalbets == 0 ? handleBetSlip() : handleClick();
            }
        }
    }

    const handleClick = () => {
        setalertTip({
            ...alertTip,
            open: true,
        });
    };

    let cutoffdate = moment().add(2, 'd').format('DD/MM/YY');
    let race_date = eventDetails.getRaceDateUtc();
    race_date = moment.utc(race_date).format('DD/MM/YY');

    const handleAlertClose = () => {
        setalertTip({
            ...alertTip,
            open: false,
        });
    };
    return (
        <Box mb={0.5}>
            <Box mx={2} sx={{ borderBottom: 1, borderColor: 'grey.border1' }}>
                <Grid container columnSpacing={1}>
                    <Grid item xs={isDesktop ? 1 : 1.5}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}
                            onClick={statsClicked}
                        >
                            <img
                                src={hideImage ? fallbackSrc : url}
                                width="23px"
                                height="26px"
                                alt="J-image"
                                onError={(e) => {
                                    setHideImage(true);
                                }}
                            />
                            <br />

                            {event &&
                                event.racetype === 'R' &&
                                eventDetails &&
                                (eventDetails.country == 'AU' ||
                                    eventDetails.country == 'NZ' ||
                                    eventDetails.country == 'HK') && (
                                    // (moment(race_date).isSameOrBefore(cutoffdate)) &&
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                    >
                                        {stats === raceField.actualcode ? (
                                            <KeyboardArrowUpIcon />
                                        ) : (
                                            <KeyboardArrowDownIcon />
                                        )}
                                    </IconButton>
                                )}
                        </Box>
                    </Grid>
                    {isDesktop && activeTabName == 'Win/Place' ? (
                        <React.Fragment>
                            <Grid item zeroMinWidth xs>
                                <Box
                                    justifyContent="space-between"
                                    alignSelf="center"
                                    lineHeight={1}
                                    sx={{ width: '90%' }}
                                    onClick={statsClicked}
                                >
                                    <Typography
                                        sx={{ color: 'grey.dark' }}
                                        noWrap
                                        component="p"
                                    >
                                        <span
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 13,
                                            }}
                                            className="fieldText"
                                        >
                                            {raceField.fieldnum}.{' '}
                                            {raceField.fieldname}{' '}
                                            {event && event.racetype === 'R'
                                                ? `(${raceField.barrier})`
                                                : null}
                                        </span>
                                    </Typography>
                                    {event && (
                                        <>
                                            <Box
                                                display="flex"
                                                className="HideTextOverflow"
                                                color="grey.dark"
                                            >
                                                {raceField.weight != 0 && (
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                color: 'grey.dark',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {raceField.weight}kg
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {raceField.jockey && (
                                                    <Box
                                                        ml={0.5}
                                                        className="HideTextOverflow"
                                                    >
                                                        <Typography
                                                            noWrap={true}
                                                            sx={{
                                                                color: 'grey.dark',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {event.racetype ===
                                                            'H'
                                                                ? 'D'
                                                                : event.racetype ===
                                                                  'G'
                                                                ? 'T'
                                                                : 'J'}
                                                            : {raceField.jockey}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                            <Box
                                                display="flex"
                                                sx={{ color: 'grey.dark' }}
                                            >
                                                {raceField.lastten && (
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                color: 'grey.dark',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {raceField.lastten}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {raceField.trainer && (
                                                    <Box
                                                        ml={0.5}
                                                        className="HideTextOverflow"
                                                    >
                                                        <Typography
                                                            noWrap={true}
                                                            sx={{
                                                                color: 'grey.dark',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            T:{' '}
                                                            {raceField.trainer}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            </Grid>
                            {desktopColumns.map((item, idx) =>
                                item != '' ? (
                                    <Grid item xs="auto" key={idx}>
                                        <RaceOdds
                                            raceField={raceField}
                                            change={
                                                item.btype.toLowerCase() ==
                                                'win'
                                                    ? raceField.winchange[
                                                          item.pg
                                                      ]
                                                    : raceField.placechange[
                                                          item.pg
                                                      ]
                                            }
                                            fav={raceField.fav}
                                            addTipToBetSlip={addTipToBetSlip}
                                            win={
                                                item.btype.toLowerCase() ==
                                                'win'
                                            }
                                            tipId={getBetID(tip)}
                                            productGroupType={item.pg}
                                            raceResulted={raceResulted}
                                            raceStatus={raceStatus}
                                            noOddsLabel={item.nooddslabel}
                                        />
                                    </Grid>
                                ) : (
                                    <Grid item xs={2.5} key={idx}>
                                        {process.env.client.enableTipping ==
                                            'true' &&
                                            process.env.client.enableBetting ==
                                                'false' && (
                                                <RaceTip
                                                    selected={selected}
                                                    raceResulted={raceResulted}
                                                    addTipToBetSlip={
                                                        addTipToBetSlip
                                                    }
                                                />
                                            )}
                                    </Grid>
                                )
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Grid
                                item
                                zeroMinWidth
                                xs={
                                    isDesktop
                                        ? 6.5
                                        : columns.length > 1 ||
                                          activeTabName == 'First4'
                                        ? 5.9
                                        : 6.5
                                }
                            >
                                <Box
                                    justifyContent="space-between"
                                    alignSelf="center"
                                    lineHeight={1}
                                    sx={{ width: '90%' }}
                                    onClick={statsClicked}
                                >
                                    <Typography
                                        sx={{ color: 'grey.dark' }}
                                        noWrap
                                        component="p"
                                    >
                                        <span
                                            style={{
                                                fontWeight: '600',
                                                fontSize: 13,
                                            }}
                                            className="fieldText"
                                        >
                                            {raceField.fieldnum}.{' '}
                                            {raceField.fieldname}{' '}
                                            {event && event.racetype === 'R'
                                                ? `(${raceField.barrier})`
                                                : null}
                                        </span>
                                    </Typography>
                                    {event && (
                                        <>
                                            <Box
                                                display="flex"
                                                className="HideTextOverflow"
                                                color="grey.dark"
                                            >
                                                {raceField.weight != 0 && (
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                color: 'grey.dark',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {raceField.weight}kg
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {raceField.jockey && (
                                                    <Box
                                                        ml={0.5}
                                                        className="HideTextOverflow"
                                                    >
                                                        <Typography
                                                            noWrap={true}
                                                            sx={{
                                                                color: 'grey.dark',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {event.racetype ===
                                                            'H'
                                                                ? 'D'
                                                                : event.racetype ===
                                                                  'G'
                                                                ? 'T'
                                                                : 'J'}
                                                            : {raceField.jockey}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                            <Box
                                                display="flex"
                                                sx={{ color: 'grey.dark' }}
                                            >
                                                {raceField.lastten && (
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                color: 'grey.dark',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {raceField.lastten}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                {raceField.trainer && (
                                                    <Box
                                                        ml={0.5}
                                                        className="HideTextOverflow"
                                                    >
                                                        <Typography
                                                            noWrap={true}
                                                            sx={{
                                                                color: 'grey.dark',
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            T:{' '}
                                                            {raceField.trainer}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            </Grid>
                            {columns.length > 0 ? (
                                columns.map((item, idx) =>
                                    item != '' ? (
                                        <Grid
                                            item
                                            xs={
                                                isDesktop
                                                    ? 4.5
                                                    : columns.length > 1
                                                    ? 2.3
                                                    : activeTabName == 'First4'
                                                    ? 4.6
                                                    : 4
                                            }
                                            key={idx}
                                        >
                                            {activeTabName == 'Win/Place' ? (
                                                <RaceOdds
                                                    raceField={raceField}
                                                    change={
                                                        item.btype.toLowerCase() ==
                                                        'win'
                                                            ? raceField.winchange
                                                            : raceField.placechange
                                                    }
                                                    fav={raceField.fav}
                                                    addTipToBetSlip={
                                                        addTipToBetSlip
                                                    }
                                                    win={
                                                        item.btype.toLowerCase() ==
                                                        'win'
                                                    }
                                                    tipId={getBetID(tip)}
                                                    productGroupType={
                                                        productGroupType
                                                    }
                                                    raceResulted={raceResulted}
                                                    raceStatus={raceStatus}
                                                    noOddsLabel={
                                                        item.nooddslabel
                                                    }
                                                />
                                            ) : (
                                                <FieldsSelection
                                                    raceField={raceField}
                                                    fieldsCount={fieldsCount}
                                                    odds={raceField.win}
                                                    fav={raceField.fav}
                                                    isBoxed={isBoxed}
                                                    fieldnum={
                                                        raceField.fieldnum
                                                    }
                                                    toggleField={toggleField}
                                                    activeTabName={
                                                        activeTabName
                                                    }
                                                    raceid={raceid}
                                                    betsLocal={betsLocal}
                                                    setBetsLocal={setBetsLocal}
                                                    setsCombinations={
                                                        setsCombinations
                                                    }
                                                    raceResulted={raceResulted}
                                                    raceStatus={raceStatus}
                                                    productGroupType={
                                                        productGroupType
                                                    }
                                                    quaddieRaces={quaddieRaces}
                                                    quaddienum={quaddienum}
                                                    racenumbers={racenumbers}
                                                    setquaddieBets={
                                                        setquaddieBets
                                                    }
                                                    totalRunners={totalRunners}
                                                />
                                            )}
                                        </Grid>
                                    ) : (
                                        <Grid item xs={2.5} key={idx}>
                                            {process.env.client.enableTipping ==
                                                'true' &&
                                                process.env.client
                                                    .enableBetting ==
                                                    'false' && (
                                                    <RaceTip
                                                        selected={selected}
                                                        raceResulted={
                                                            raceResulted
                                                        }
                                                        addTipToBetSlip={
                                                            addTipToBetSlip
                                                        }
                                                    />
                                                )}
                                        </Grid>
                                    )
                                )
                            ) : (
                                <Grid
                                    item
                                    xs={
                                        isDesktop
                                            ? 4.5
                                            : columns.length > 1
                                            ? 2.3
                                            : activeTabName == 'First4'
                                            ? 4.6
                                            : 4
                                    }
                                >
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                            mr: 1,
                                        }}
                                    >
                                        -
                                    </Typography>
                                </Grid>
                            )}
                        </React.Fragment>
                    )}
                    <Grid container item xs={12}>
                        <Box sx={{ width: 1 }}>
                            <Collapse in={flucs} timeout="auto" unmountOnExit>
                                <Priceflucs
                                    flucs={raceField.flucs}
                                    raceField={raceField}
                                />
                            </Collapse>
                        </Box>
                        {raceSpeedMaps &&
                            raceSpeedMaps.length > 0 &&
                            speedMap &&
                            raceSpeedMaps.filter(
                                (item) => item.FIELDNUM == raceField.fieldnum
                            ).length > 0 && (
                                <React.Fragment>
                                    <Grid
                                        container
                                        item
                                        xs={isDesktop ? 1 : 1.5}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Typography
                                            fontSize={14}
                                            fontWeight="bold"
                                            align="center"
                                        >
                                            {event && event.racetype === 'R'
                                                ? `(${raceField.barrier})`
                                                : null}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={isDesktop ? 11 : 10.5}>
                                        <SpeedMap
                                            raceid={raceid}
                                            fieldnum={raceField.fieldnum}
                                            actualcode={raceField.actualcode}
                                            raceSpeedMaps={raceSpeedMaps}
                                        />
                                    </Grid>
                                </React.Fragment>
                            )}
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={alertTip.open}
                autoHideDuration={5000}
                onClose={handleAlertClose}
                sx={{ bottom: { xs: 60, sm: 0 } }}
                TransitionComponent={alertTip.Transition}
                onClick={handleAlertClose}
                message={
                    <CustomALert
                        severity="success"
                        content={`Selection added to ${
                            process.env.client.enableTipping == true
                                ? 'Tip'
                                : 'Bet'
                        } Slip`}
                        warning={true}
                        isHtml={false}
                    />
                }
            />
            <Collapse
                in={
                    stats.filter((item) => item === raceField.actualcode)
                        ?.length > 0 &&
                    event &&
                    event.racetype === 'R'
                }
                timeout="auto"
                unmountOnExit
            >
                <StatComponent
                    raceid={raceid}
                    fieldnum={raceField.fieldnum}
                    actualcode={raceField.actualcode}
                    racetype={event?.racetype}
                />
            </Collapse>
        </Box>
    );
}
