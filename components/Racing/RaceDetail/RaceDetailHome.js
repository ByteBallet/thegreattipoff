import React from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useEffect, useState, useContext, useRef, useTransition } from 'react';
import { useRouter } from 'next/router';
import FieldsModel from '../../../Models/Racing/Fields';
import qMeeting from '../../../Models/Racing/Meetings';
import EventDetails from '../../../Models/Racing/EventDetails';
import TipLoading from '../../../components/LoadingSkeleton/TipLoading';
import authAPI from '../../../components/utils/authAPI';
import { groupByKey } from '../../../components/utils/util';
import { useSession } from 'next-auth/client';
import RaceSwipe from './RaceSwipe';
import FinalResults from '../RaceResults/FinalResults';
import BettingTabContent from '@Components/Betting/BettingTabContent';
import CustomTitleRounded from '@Components/Shared/CustomTitleRounded';
import CustomCard from '@Components/Shared/CustomCard';
import RaceFilterConatiner from './RaceFilterConatiner';
import { UserContext } from '@Context/User/UserProvider';
import { LOCAL_STORAGE_KEY } from '@lib/constants';

const RaceDetailHome = ({ isDesktop, raceStatus, setRaceStatus }) => {
    const [session] = useSession();
    const { user } = useContext(UserContext);
    // contains the parramaters for the location and race-id
    const router = useRouter();
    const { detail, raceid, Quaddie } = router.query;
    const [isPending, startTransition] = useTransition();
    const [raceFields, setRFields] = useState([]);
    const [raceSpeedMaps, setRaceSpeedMaps] = useState([]);
    const [raceNumbers, setRaceNumbers] = useState([]);
    const [raceLocations, setRaceLocations] = useState([]);
    const [eventDetails, setEventDetails] = useState();
    const [availexotics, setavailexotics] = useState([]);
    const [betproducts, setbetproducts] = useState([]);
    const [raceResulted, setRaceResulted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadRace, setLoadRace] = useState(false);
    const [error, setError] = useState(false);
    const [activeTab, setactiveTab] = useState(0);
    const [quaddienum, setquaddie] = useState(0);
    const [quaddieBets, setquaddieBets] = useState({});
    const [raceTime, setraceTime] = useState();
    const [racesClosed, setracesClosed] = useState([]);
    const [raceDate, setRaceDate] = useState();
    const columnsRef = useRef(null);
    const bettypesRef = useRef(null);

    const handleCheckLocalHotBetFlag = () => {
        if (eventDetails && eventDetails.isHotbet) {
            const isTopBetButtonClicked = localStorage.getItem(LOCAL_STORAGE_KEY.RACE_TOP_HOT_BET_BUTTON);
            if (isTopBetButtonClicked && JSON.parse(isTopBetButtonClicked)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const handleTabChange = (event, newValue) => {
        localStorage.setItem(LOCAL_STORAGE_KEY.RACE_TOP_HOT_BET_BUTTON, JSON.stringify(false));
        setactiveTab(newValue);
    };

    const setRaceFields = (fields) => {
        startTransition(() => {
            // Transition: Show the results
            setRFields(fields);
        });
    };
    const handleOnClickHotBet = (idx) => {
        localStorage.setItem(LOCAL_STORAGE_KEY.RACE_BOTTOM_HOT_BET_BUTTON, JSON.stringify(false));
        localStorage.setItem(LOCAL_STORAGE_KEY.RACE_TOP_HOT_BET_BUTTON, JSON.stringify(true));
        setactiveTab(idx);
    };

    function reset() {
        const isHotBetSelect = handleCheckLocalHotBetFlag();
        setRaceFields([]);
        setRaceSpeedMaps([]);
        //setracesClosed([])
        //setRaceNumbers([]);
        //setRaceLocations([]);
        //setEventDetails(null);
        setraceTime(null);
        setRaceResulted(false);
        setRaceStatus('open');
        setavailexotics([]);
        setquaddie(0);
        setquaddieBets({});
        if (quaddieRaces.indexOf(raceid) > -1) {
            Quaddie_idx != activeTab && setactiveTab(0);
        } else {
            setactiveTab(0);
        }
        setbetproducts([]);
    }
    async function getRaceDetail() {
        const url = `${process.env.server}/races/getRaceDayEvents`;
        const resp = await authAPI(
            url,
            {
                raceid: raceid,
                field: 'true',
                meeting: 'true',
                clientid: user.clientID ? user.clientID : '',
                userid: user.userID ? user.userID : 0,
                promo: user.promo,
            },
            'POST',
            session ? true : false
        );
        if (resp.error) {
            setError(true);
            setLoading(false);
            return;
        }

        // race numbers
        let raceNum = [];
        if (resp.data && resp.data.qRace && resp.data.qRace.length) {
            resp.data.qRace.forEach((race) => {
                raceNum.push({
                    racenum: race.RACENUM,
                    raceid: race.RACEID,
                    racetype: race.RACETYPE,
                    racerun: race.FINALEVENTSTATUS === 1 ? true : false,
                    racemeet: race.RACEMEET.toLowerCase(),
                    bookieeventid: race.RACECODE,
                    abandoned: race.ABANDONED,
                });
            });
            setRaceNumbers(raceNum);
        }

        if (resp.data && resp.data.Results && resp.data.Results.length) {
            let races_resulted = resp.data.Results.filter((race) => race.racestatus.toLowerCase() == 'final');
            setracesClosed(races_resulted);
        }

        // Race meetings
        let qMeet = [];
        if (resp.data && resp.data.QMEETINGS && resp.data.QMEETINGS.length) {
            resp.data.QMEETINGS.forEach((meeting) => {
                let meet = new qMeeting({
                    abandoned: meeting.ABANDONED,
                    category: meeting.CATEGORY,
                    countrylabel: meeting.COUNTRYLABEL,
                    nextrace: meeting.NEXTRACEID,
                    racemeet: meeting.RACEMEET,
                    racetype: meeting.RACETYPE,
                    racetimeutc: meeting.NEXTRACETIMEUTC,
                    locid: meeting.LOCID,
                    racedate: meeting.RACEDATE,
                });

                qMeet.push(meet);
            });
        }
        if (resp.data && resp.data.availexotics) {
            setavailexotics(resp.data.availexotics);
            resp.data.availexotics.quadrella && setquaddie(resp.data.availexotics.quaddie);
        }
        if (resp.data && resp.data.betproducts && resp.data.betproducts.length > 0) {
            setbetproducts(resp.data.betproducts);
        }
        setRaceLocations(qMeet);
    }

    const getSortedFields = (fields, speedmap) => {
        if (speedmap) {
            const scratchedN = fields.filter((item) => !item.scratching);
            const scratchedY = fields.filter((item) => item.scratching);
            return [...scratchedN.sort((a, b) => (a.barrier ? a.barrier : 0) - (b.barrier ? b.barrier : 0)), ...scratchedY];
        } else {
            return fields;
        }
    };

    async function getRace() {
        setLoadRace(true);
        const url = `${process.env.server}/races/getRaceDayEvents`;
        const resp = await authAPI(
            url,
            {
                raceid: raceid,
                field: 'true',
                meeting: 'true',
                clientid: user.clientID ? user.clientID : '',
                userid: user.userID ? user.userID : 0,
                promo: user.promo,
            },
            'POST',
            session ? true : false
        );
        if (resp.error) {
            setError(true);
            setLoadRace(false);
            setLoading(false);
            return;
        }
        let fields = [];
        let sFields = [];
        if (resp.data && resp.data.raceStatus) {
            setRaceDate(resp.data?.selectedRace[0]?.RACEDATE);
            setRaceStatus(resp.data.raceStatus.status ? resp.data.raceStatus.status.toLowerCase() : 'open');
        }
        if (resp.data && resp.data.QRACEDETAIL && resp.data.QRACEDETAIL.length) {
            resp.data.QRACEDETAIL.forEach((field) => {
                let rData = new FieldsModel({
                    actualcode: field.ACTUALCODE,
                    image: field.JOCKEYCOLORSLINK,
                    fieldnum: field.FIELDNUM,
                    fieldname: field.FIELDNAME,
                    weight: field.WEIGHT,
                    lastten: field.LASTTEN,
                    jockey: field.JOCKEY,
                    trainer: field.TRAINER,
                    scratching: field.SCRATCHING,
                    barrier: field.BARRIER,
                    racemeet: resp.data.selectedRace[0].RACEMEET,
                    racetimeutc: resp.data.selectedRace[0].RACETIMEUTC,
                    racenum: resp.data.selectedRace[0].RACENUM,
                    eventname: resp.data.selectedRace[0].EVENT,
                    fav: field.FAVIND,
                    sprices: field.SPRICES,
                    flucs: field.FLUCS,
                    scratchtime: field.SCRATCHTIME,
                    win: field.SCRATCHING === 'N' ? null : field.WINDEDUCT,
                    place: field.SCRATCHING === 'N' ? null : field.PLACEDEDUCT,
                });
                if (field.SCRATCHING === 'N') {
                    fields.push(rData);
                } else {
                    sFields.push(rData);
                }
            });
            let sortedFields = [...fields, ...sFields];
            let initSpeedMap =
                resp.data.selectedRace &&
                resp.data.selectedRace.length > 0 &&
                resp.data.selectedRace[0].RACETYPE == 'R' &&
                localStorage.getItem('speedMap')
                    ? localStorage.getItem('speedMap') == 1
                        ? true
                        : false
                    : false;

            let rFields = getSortedFields(sortedFields, false);
            //sort fields by barrier if speedmap on
            setRaceFields(rFields);

            setEventDetails(
                new EventDetails({
                    racedate: resp.data.selectedRace[0].RACEDATE,
                    racetime: resp.data.selectedRace[0].RACETIME,
                    racedistance: resp.data.selectedRace[0].RACEDISTANCE,
                    trackcondition: resp.data.selectedRace[0].TRACKCONDITION,
                    event: resp.data.selectedRace[0].EVENT,
                    weather: resp.data.selectedRace[0].WEATHER,
                    racetimeutc: resp.data.selectedRace[0].RACETIMEUTC,
                    racenum: resp.data.selectedRace[0].RACENUM,
                    country: resp.data.selectedRace[0].RACECOUNTRY,
                    racetype: resp.data.selectedRace[0].RACETYPE,
                    special:
                        resp.data.specials && resp.data.selectedRace[0].ISSPECIAL > 0
                            ? resp.data.specials.filter((item) => item.ID == resp.data.selectedRace[0].ISSPECIAL)
                            : [],
                    isHotbet: resp.data.availexotics && resp.data.availexotics['hotbet'] ? true : false,
                    rules: resp?.data?.raceStatus?.comment,
                })
            );

            setraceTime(resp.data.selectedRace[0].RACETIMEUTC);

            let status = resp.data.raceStatus.status ? resp.data.raceStatus.status.toLowerCase() : 'open';
            if (raceStatus !== status) {
                setRaceStatus(status);
            }

            if ((status == 'interim' || status == 'final') && !raceResulted) {
                setRaceResulted(true);
            }
        }
        if (resp.data && resp.data.availexotics) {
            setavailexotics(resp.data.availexotics);
            resp.data.availexotics.quadrella && setquaddie(resp.data.availexotics.quaddie);
        }
        if (resp.data && resp.data.betproducts && resp.data.betproducts.length > 0) {
            setbetproducts(resp.data.betproducts);
        }

        if (resp.data && resp.data.Results && resp.data.Results.length) {
            let races_resulted = resp.data.Results.filter((race) => race.racestatus.toLowerCase() == 'final');
            setracesClosed(races_resulted);
        }
        if (resp.data && resp.data.SPEEDMAPS && resp.data.SPEEDMAPS.length > 0) {
            setRaceSpeedMaps(resp.data.SPEEDMAPS);
        }

        setError(false);
        setLoadRace(false);
        setLoading(false);
    }

    let tabs = ['Win / Place'];
    if (availexotics['srm'] && process.env.client.SRM) {
        tabs.push('Same Race Multi');
    }
    availexotics['quinella'] ? tabs.push('Quinella') : tabs.push(null);
    availexotics['exacta'] ? tabs.push('Exacta') : tabs.push(null);
    if (!isDesktop) {
        availexotics['hotbet'] ? tabs.push('HOT Bets') : tabs.push(null);
    }
    availexotics['trifecta'] ? tabs.push('Trifecta') : tabs.push(null);
    availexotics['quadrella'] ? tabs.push('Quaddie') : tabs.push(null);
    availexotics['firstfour'] ? tabs.push('First 4') : tabs.push(null);

    let desktopColumns = betproducts?.filter((item) => item.raceoddlabel != '');
    let filterBets_Pg = desktopColumns?.length > 0 ? groupByKey(desktopColumns, 'pg') : '';
    var ColumnLabels = {};
    Object.keys(filterBets_Pg).map((product) => {
        ColumnLabels[product] = [];
        filterBets_Pg[product].map((item, idx) => {
            ColumnLabels[product].push(item);
        });
    });
    columnsRef.current = ColumnLabels;
    let Quaddie_idx = tabs.findIndex((tab) => tab === 'Quaddie');
    let quaddieRaces =
        raceNumbers.length > 0 && quaddienum > 0
            ? raceNumbers.filter((item) => item.racenum >= quaddienum && item.racenum <= quaddienum + 3).map((item) => item.raceid)
            : [];

    useEffect(() => {
        if (quaddienum > 0 && Quaddie_idx == activeTab) {
            let key = 'R' + quaddienum + '_' + quaddieRaces[0];
            let quaddieSelections = localStorage.getItem('Quaddie') ? JSON.parse(localStorage.getItem('Quaddie')) : {};
            let bets = quaddieSelections[key] ? quaddieSelections[key] : {};
            setquaddieBets(bets);
        }
    }, [quaddienum, activeTab]);
    useEffect(() => {
        Quaddie && Quaddie_idx != -1 && setactiveTab(Quaddie_idx);
    }, [availexotics]);

    useEffect(() => {
        setLoading(true);
        reset();
        if (raceid) {
            getRaceDetail();
        }
    }, [detail]);

    useEffect(() => {
        reset();
        raceid && getRace();
    }, [raceid]);

    useEffect(() => {
        raceStatus != '' && raceStatus != 'open' && clearLocalStorage();
    }, [raceStatus]);

    function clearLocalStorage() {
        tabs.map((tab) => {
            if (tab) {
                let tab1 = tab.replace(/ /g, '');
                if (localStorage.getItem(tab1)) {
                    let bets = JSON.parse(localStorage.getItem(tab1));
                    if (Quaddie_idx == activeTab) {
                        let key = 'R' + quaddienum + '_' + quaddieRaces[0];
                        bets[key] && delete bets[key];
                    } else {
                        bets[raceid] && delete bets[raceid];
                    }
                    Object.keys(bets).length > 0 ? localStorage.setItem(tab1, JSON.stringify(bets)) : localStorage.removeItem(tab1);
                }
            }
        });
    }
    // check for error and loading states
    if (error) return <div></div>;
    if (loading && raceFields.length === 0 && raceNumbers.length === 0) return <TipLoading />;
    const rType = eventDetails
        ? eventDetails.racetype === 'R'
            ? 'racing'
            : eventDetails.racetype === 'G'
            ? 'greyhound'
            : 'harness'
        : null;
    const pagelink = rType && quaddieRaces.length > 0 ? `/${rType}/${detail.toLocaleLowerCase()}/${quaddieRaces[0]}?Quaddie=1` : '';

    function showTick(rnum) {
        // let key = "R" + quaddienum + "_" + quaddieRaces[0]
        // let quaddieSelections = localStorage.getItem("Quaddie") ? JSON.parse(localStorage.getItem("Quaddie")) : {};
        let bets = quaddieBets;
        let selections = bets ? (bets[rnum] ? bets[rnum] : {}) : {};
        if (Object.keys(selections).length > 0) {
            return Object.values(selections)[0].length > 0;
        } else {
            return false;
        }
    }

    const getFilterContent = () => {
        return (
            <RaceFilterConatiner
                isDesktop={isDesktop}
                raceLocations={raceLocations}
                weather={eventDetails ? eventDetails.weather : ''}
                raceName={detail.toLocaleLowerCase()}
                reset={reset}
                raceStatus={raceStatus}
                setRaceStatus={setRaceStatus}
                racenumbers={raceNumbers}
                setRaceFields={setRaceFields}
                quaddienum={quaddienum}
                isQuaddieActive={activeTab == Quaddie_idx}
                quaddieRaces={quaddieRaces}
                raceid={raceid}
                showTick={showTick}
                quaddieBets={quaddieBets}
                racesClosed={racesClosed}
                setRaceResulted={setRaceResulted}
                raceResulted={raceResulted}
                eventDetails={eventDetails}
                raceTime={raceTime}
                tabs={tabs}
                handler={handleTabChange}
                active={activeTab}
                label="Betting Tabs"
                showscrollbuttons={false}
                Quaddie_idx={Quaddie_idx}
                link={pagelink}
                loadRace={loadRace}
                handleOnClickHotBet={handleOnClickHotBet}
            />
        );
    };

    return (
        <React.Fragment>
            {eventDetails && (
                <React.Fragment>
                    {isDesktop ? (
                        <Box mb={1}>
                            <CustomCard
                                title=""
                                isTable={false}
                                content={
                                    <React.Fragment>
                                        <CustomTitleRounded
                                            title={`Racing - ${
                                                eventDetails.country == 'AU' || eventDetails.country == 'NZ'
                                                    ? 'Australia and New Zealand'
                                                    : 'International'
                                            }`}
                                        />
                                        {getFilterContent()}
                                    </React.Fragment>
                                }
                            />
                        </Box>
                    ) : (
                        getFilterContent()
                    )}
                    {loadRace ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: 'text.active',
                                height: '100vh',
                                paddingTop: '10%',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            {process.env.client.enableBetting == 'true' ? (
                                (raceResulted || raceStatus != 'open') && raceStatus != 'abandoned' ? (
                                    <>
                                        {raceFields && raceFields.length ? (
                                            <BettingTabContent
                                                eventId={raceid}
                                                raceDate={raceDate}
                                                tabs={tabs}
                                                event={raceNumbers.filter((e) => e.raceid === raceid)[0]}
                                                raceFields={raceFields}
                                                setRaceFields={setRaceFields}
                                                raceName={detail}
                                                raceid={raceid}
                                                raceResulted={raceResulted}
                                                activetab={0}
                                                raceNumbers={raceNumbers}
                                                betproducts={betproducts}
                                                ColumnLabels={columnsRef.current}
                                                racebetproducts={betproducts}
                                                raceStatus={raceStatus}
                                                setRaceStatus={setRaceStatus}
                                                eventDetails={eventDetails}
                                                setRaceResulted={setRaceResulted}
                                                setbetproducts={setbetproducts}
                                                quaddienum={quaddienum}
                                                quaddieRaces={quaddieRaces}
                                                setquaddieBets={setquaddieBets}
                                                quaddieBets={quaddieBets}
                                                desktopColumns={desktopColumns}
                                                raceSpeedMaps={raceSpeedMaps}
                                                isPending={isPending}
                                                availexotics={availexotics}
                                            />
                                        ) : null}
                                    </>
                                ) : (
                                    <>
                                        <BettingTabContent
                                            eventId={raceid}
                                            raceDate={raceDate}
                                            tabs={tabs}
                                            event={raceNumbers.filter((e) => e.raceid === raceid)[0]}
                                            raceFields={raceFields}
                                            setRaceFields={setRaceFields}
                                            raceName={detail}
                                            raceid={raceid}
                                            raceResulted={raceResulted}
                                            activetab={activeTab}
                                            raceNumbers={raceNumbers}
                                            betproducts={betproducts}
                                            ColumnLabels={columnsRef.current}
                                            racebetproducts={betproducts}
                                            raceStatus={raceStatus}
                                            setRaceStatus={setRaceStatus}
                                            setRaceResulted={setRaceResulted}
                                            eventDetails={eventDetails}
                                            setbetproducts={setbetproducts}
                                            quaddieRaces={quaddieRaces}
                                            quaddienum={quaddienum}
                                            setquaddieBets={setquaddieBets}
                                            quaddieBets={quaddieBets}
                                            desktopColumns={desktopColumns}
                                            raceSpeedMaps={raceSpeedMaps}
                                            isPending={isPending}
                                            availexotics={availexotics}
                                        />
                                    </>
                                )
                            ) : null}
                            {process.env.client.enableTipping == 'true' && (
                                <div>
                                    {raceFields && raceFields.length ? (
                                        <BettingTabContent
                                            eventId={raceid}
                                            raceDate={raceDate}
                                            tabs={tabs}
                                            event={raceNumbers.filter((e) => e.raceid === raceid)[0]}
                                            raceFields={raceFields}
                                            setRaceFields={setRaceFields}
                                            raceName={detail}
                                            raceid={raceid}
                                            raceResulted={raceResulted}
                                            activetab={activeTab}
                                            raceNumbers={raceNumbers}
                                            betproducts={betproducts}
                                            ColumnLabels={columnsRef.current}
                                            racebetproducts={betproducts}
                                            raceStatus={raceStatus}
                                            setRaceStatus={setRaceStatus}
                                            setRaceResulted={setRaceResulted}
                                            eventDetails={eventDetails}
                                            setbetproducts={setbetproducts}
                                            quaddieRaces={quaddieRaces}
                                            quaddienum={quaddienum}
                                            setquaddieBets={setquaddieBets}
                                            quaddieBets={quaddieBets}
                                            desktopColumns={desktopColumns}
                                            raceSpeedMaps={raceSpeedMaps}
                                            isPending={isPending}
                                            availexotics={availexotics}
                                        />
                                    ) : null}
                                </div>
                            )}
                        </>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default RaceDetailHome;
