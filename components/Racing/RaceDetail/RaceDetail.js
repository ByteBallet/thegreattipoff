import React from 'react';
import { useEffect, useState, useRef, useContext, useMemo } from 'react';
import {
    Box,
    Drawer,
    Typography,
    Container,
    Grid,
    useMediaQuery,
    Stack,
} from '@mui/material';
import authAPI from '../../utils/authAPI';
import RaceField from './RaceField';
import { useRouter } from 'next/router';
import { UserContext } from '../../../Context/User/UserProvider';
import BettingFilters from '../../Betting/BettingFilters';
import { makeStyles } from '@mui/styles';
import FieldCombinations from '../../Betting/FieldCombinations';
import LoadBetSlip from '../../BetSlip/LoadBetSlip';
import { getOddsPrices } from '@Components/utils/RacingUtil';
import RaceTipField from './RaceTipField';
import SRM from '../SRM/SRM';
import RenderRaceField from './RenderRaceField';

import SRMSummaryBar from '../SRM/SRMSummaryBar';

const useStyles = makeStyles((theme) => ({
    activebutton: {
        backgroundColor: theme.palette.primary.main,
    },
    inactivebutton: {
        backgroundColor: theme.palette.grey.tipBtn,
    },
}));

function RaceDetail(props) {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const classes = useStyles();
    const {
        event,
        raceFields,
        setRaceFields,
        raceResulted,
        raceStatus,
        betProductType,
        speedMap,
    } = props;
    let columns = props.columns
        ? props.columns
        : process.env.client.enableBetting == 'true'
        ? ['Win']
        : ['Win', ''];
    const sorted = useRef('asc');
    const sortedP = useRef('asc');
    const sortedF = useRef('default');
    const sortedB = useRef('default');
    const [isBoxed, setBoxed] = useState(
        props.activeTabName == 'Quaddie' ? true : false
    );
    const [selectedParent, setParentSelected] = useState(false);
    const btypeRef = useRef(betProductType);
    let bets = localStorage.getItem(props.activeTabName)
        ? JSON.parse(localStorage.getItem(props.activeTabName))
        : {};
    let raceBets = {};
    //store local storage bets in state
    if (props.activeTabName == 'Quaddie' && props.raceNumbers.length > 0) {
        let key = 'R' + props.quaddienum + '_' + props.quaddieRaces[0];
        let racenum =
            props.raceNumbers.filter((e) => e.raceid === props.raceid).length >
            0
                ? props.raceNumbers.filter((e) => e.raceid === props.raceid)[0]
                      .racenum
                : null;
        let quaddie_selections = bets ? bets[key] : {};
        raceBets = quaddie_selections
            ? quaddie_selections[racenum]
                ? quaddie_selections[racenum]
                : {}
            : {};
    } else {
        raceBets = isBoxed
            ? localStorage.getItem('Boxed' + props.activeTabName)
                ? JSON.parse(
                      localStorage.getItem('Boxed' + props.activeTabName)
                  )
                : {}
            : bets
            ? bets[props.raceid]
                ? bets[props.raceid]
                : {}
            : {};
    }
    const [betsLocal, setBetsLocal] = useState(raceBets);
    const [combinations, setFieldCombinations] = useState(0);
    const [showCombinations, setsCombinations] = useState(true);
    const [stats, setStats] = useState([]);
    const { user } = useContext(UserContext);
    const mounted = useRef(false);
    const rid = useRef(0);
    const intervalidRef = useRef(0);
    const intervalRefCount = useRef(0);
    const router = useRouter();
    const sortColumn = useRef();
    const sortUpdate = useRef(false);
    const [openBetSlip, setopenBetSlip] = useState(false);

    const isSRM = props.activeTabName == 'SameRaceMulti' ? true : false;

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    useEffect(() => {
        mounted.current = true;
        rid.current = router.query.raceid;
        return () => {
            mounted.current = false;
            rid.current = 0;
            sortColumn.current = null;
            setFieldCombinations(0);
        };
    }, [router.query.raceid]);

    // useEffect(() => {
    // 	sortColumn.current = null
    // 	if (speedMap) {
    // 		sortFieldsByBarrier("desc")
    // 		setTimeout(() => {
    // 			sortUpdate.current = true
    // 		}, 20);
    // 	} else {
    // 		sortFieldsByNum("desc")
    // 		sortUpdate.current = false
    // 	}
    // }, [speedMap]);

    useEffect(() => {
        if (raceStatus == 'final') {
            clearInterval(intervalidRef.current);
            intervalidRef.current = 0;
            intervalRefCount.current = 0;
        } else {
            if (intervalidRef.current !== 0) {
                clearInterval(intervalidRef.current);
                intervalidRef.current = 0;
                if (intervalRefCount.current == 0) {
                    startResultCheck();
                    intervalRefCount.current = ++intervalRefCount.current;
                }
            } else {
                if (intervalRefCount.current == 0) {
                    startResultCheck();
                    intervalRefCount.current = ++intervalRefCount.current;
                }
            }
        }
        return () => {
            clearInterval(intervalidRef.current);
            intervalidRef.current = 0;
            intervalRefCount.current = 0;
        };
    }, [router.query.raceid, raceResulted, betProductType]);

    useEffect(() => {
        if (raceStatus == 'final') {
            clearInterval(intervalidRef.current);
            intervalidRef.current = 0;
            intervalRefCount.current = 0;
        }
        return () => {
            clearInterval(intervalidRef.current);
            intervalidRef.current = 0;
            intervalRefCount.current = 0;
        };
    }, [raceStatus]);

    function getUpdatedPrices() {
        let btype = btypeRef.current;
        const url = `${process.env.server}/selecttips/getRacePrices`;
        authAPI(
            url,
            {
                raceid: rid.current,
                clientid: user.clientID ? user.clientID : '',
            },
            'POST',
            false
        )
            .then((resp) => {
                if (resp.error) {
                    return;
                } else {
                    if (
                        resp.data &&
                        resp.data.QRACEDETAIL &&
                        resp.data.QRACEDETAIL.length &&
                        (raceStatus == 'open' || raceStatus == '')
                    ) {
                        resp.data.QRACEDETAIL.forEach((item) => {
                            let index = raceFields.findIndex(
                                (rItem) => rItem.actualcode === item.ACTUALCODE
                            );
                            let winchange = {};
                            let placechange = {};
                            let winprice = 0;
                            let placeprice = 0;
                            if (index != -1) {
                                if (isDesktop) {
                                    Object.keys(item.SPRICES).map(
                                        (product, idx) => {
                                            if(product !== 'srm') {
                                                winchange[product] = [];
                                                placechange[product] = [];
                                                let p1 = item.SPRICES[product];
                                                let p2 = raceFields[index].sprices[
                                                    product
                                                ]
                                                    ? raceFields[index].sprices[
                                                          product
                                                      ]
                                                    : [];
                                                let p = [...p2, ...p1];
                                                let w = p
                                                    .filter(
                                                        (item) =>
                                                            item.BTYPE.toLowerCase() ==
                                                            'win'
                                                    )
                                                    .reduce(function (
                                                        prev,
                                                        current
                                                    ) {
                                                        return (
                                                            +current.PRICE - +prev
                                                        );
                                                    },
                                                    0);
                                                let plc = p
                                                    .filter(
                                                        (item) =>
                                                            item.BTYPE.toLowerCase() ==
                                                            'place'
                                                    )
                                                    .reduce(function (
                                                        prev,
                                                        current
                                                    ) {
                                                        return (
                                                            +current.PRICE - +prev
                                                        );
                                                    },
                                                    0);
                                                winchange[product] = [
                                                    ...winchange[product],
                                                    w,
                                                ];
                                                placechange[product] = [
                                                    ...placechange[product],
                                                    plc,
                                                ];
                                            }
                                            
                                        }
                                    );
                                } else {
                                    winprice =
                                        item.SCRATCHING == 'N'
                                            ? getOddsPrices(item, true, btype)
                                            : 0;
                                    placeprice =
                                        item.SCRATCHING == 'N'
                                            ? getOddsPrices(item, false, btype)
                                            : 0;
                                    winchange =
                                        raceFields[index].win &&
                                        raceFields[index].win != 0
                                            ? winprice - raceFields[index].win
                                            : 0;
                                    placechange =
                                        raceFields[index].place &&
                                        raceFields[index].place != 0
                                            ? placeprice -
                                              raceFields[index].place
                                            : 0;
                                }
                                raceFields[index].updateOdds(
                                    item.SPRICES,
                                    {
                                        win:
                                            item.SCRATCHING != 'N'
                                                ? item.WINDEDUCT
                                                : winprice,
                                        place:
                                            item.SCRATCHING != 'N'
                                                ? item.PLACEDEDUCT
                                                : placeprice,
                                    },
                                    item.SCRATCHING != 'N' ? true : false,
                                    {
                                        winchange: winchange,
                                        placechange: placechange,
                                    },
                                    item.FLUCS ? item.FLUCS : item.flucs
                                );
                            }
                        });
                    }

                    //update race status
                    let status = resp?.data?.raceStatus?.status
                        ? resp.data.raceStatus.status.toLowerCase()
                        : 'open';

                    if (raceStatus !== status) {
                        props.setRaceStatus(status);
                    }

                    if (
                        (status == 'interim' || status == 'final') &&
                        !raceResulted
                    ) {
                        props.setRaceResulted(true);
                    }
                    if (
                        mounted.current &&
                        (raceStatus == 'open' || raceStatus == '')
                    ) {
                        if (sortColumn && sortColumn.current) {
                            sortColumn.current == 'barrier'
                                ? sortFieldsByBarrier(sortedB.current)
                                : sortColumn.current == 'win'
                                ? sortFieldsByWin(
                                      sorted.current,
                                      btypeRef.current
                                  )
                                : sortColumn.current == 'place'
                                ? sortFieldsByPlace(
                                      sortedP.current,
                                      btypeRef.current
                                  )
                                : sortColumn.current == 'field'
                                ? sortFieldsByNum(sortedF.current)
                                : setRaceFields([...raceFields]);
                        }
                        // update bet products dropdown
                        props.setbetproducts(resp.data.betproducts);
                    }
                }
            })
            .catch((e) => console.log(e));
    }

    function startResultCheck() {
        const newIntervalId = setInterval(() => {
            if (
                rid.current === 0 ||
                raceStatus == 'final' ||
                raceStatus == 'abandoned'
            )
                return;
            getUpdatedPrices();
        }, 5000);
        intervalidRef.current = newIntervalId;
    }

    const sortFieldsByWin = (sort, productType) => {
        const scratchedN = raceFields.filter((item) => !item.scratching);
        const scratchedY = raceFields.filter((item) => item.scratching);
        if (sort === 'default' || sort === 'desc') {
            setRaceFields([
                ...scratchedN.sort(
                    (a, b) =>
                        getOddsPrices(a, true, productType) -
                        getOddsPrices(b, true, productType)
                ),
                ...scratchedY,
            ]);
        } else if (sort === 'asc') {
            setRaceFields([
                ...scratchedN.sort(
                    (a, b) =>
                        getOddsPrices(b, true, productType) -
                        getOddsPrices(a, true, productType)
                ),
                ...scratchedY,
            ]);
        }
    };
    const sortFieldsByPlace = (sort, productType) => {
        const scratchedN = raceFields.filter((item) => !item.scratching);
        const scratchedY = raceFields.filter((item) => item.scratching);
        if (sort === 'default' || sort === 'desc') {
            setRaceFields([
                ...scratchedN.sort(
                    (a, b) =>
                        getOddsPrices(a, false, productType) -
                        getOddsPrices(b, false, productType)
                ),
                ...scratchedY,
            ]);
        } else if (sort === 'asc') {
            setRaceFields([
                ...scratchedN.sort(
                    (a, b) =>
                        getOddsPrices(b, false, productType) -
                        getOddsPrices(a, false, productType)
                ),
                ...scratchedY,
            ]);
        }
    };

    const winSort = (productType, setSortCol = false) => {
        btypeRef.current = productType;
        sortColumn.current = 'win';
        sorted.current =
            sorted.current === 'default' || sorted.current === 'desc'
                ? 'asc'
                : 'desc';
        resetOtherSorts(
            'default',
            speedMap ? 'desc' : 'default',
            sorted.current,
            'asc'
        );
        sortFieldsByWin(sorted.current, productType);
    };

    const placeSort = (productType, setSortCol = false) => {
        btypeRef.current = productType;
        sortColumn.current = 'place';
        sortedP.current =
            sortedP.current === 'default' || sortedP.current === 'desc'
                ? 'asc'
                : 'desc';
        resetOtherSorts(
            'default',
            speedMap ? 'desc' : 'default',
            'asc',
            sortedP.current
        );
        sortFieldsByPlace(sortedP.current, productType);
    };

    const fieldSort = (setSortCol = false) => {
        sortedF.current =
            sortedF.current === 'default' || sortedF.current === 'asc'
                ? 'desc'
                : 'asc';
        sortColumn.current = 'field';
        resetOtherSorts('default', sortedF.current, 'asc', 'asc');
        sortFieldsByNum(sortedF.current);
    };

    const barSort = (setSortCol = false) => {
        sortedB.current =
            sortedB.current === 'default' || sortedB.current === 'asc'
                ? 'desc'
                : 'asc';
        sortColumn.current = 'barrier';
        resetOtherSorts(
            sortedB.current,
            speedMap ? 'desc' : 'default',
            'asc',
            'asc'
        );
        sortFieldsByBarrier(sortedB.current);
    };

    const resetOtherSorts = (bar, field, win, place) => {
        sortedB.current = bar;
        sortedF.current = field;
        sorted.current = win;
        sortedP.current = place;
    };

    const sortFieldsByBarrier = (sort) => {
        const scratchedN = raceFields.filter((item) => !item.scratching);
        const scratchedY = raceFields.filter((item) => item.scratching);
        if (sort === 'default' || sort === 'asc') {
            setRaceFields([
                ...scratchedN
                    .sort(
                        (a, b) =>
                            (a.barrier ? a.barrier : 0) -
                            (b.barrier ? b.barrier : 0)
                    )
                    .reverse(),
                ...scratchedY,
            ]);
        } else {
            setRaceFields([
                ...scratchedN.sort(
                    (a, b) =>
                        (a.barrier ? a.barrier : 0) -
                        (b.barrier ? b.barrier : 0)
                ),
                ...scratchedY,
            ]);
        }
    };

    const sortFieldsByNum = (sort) => {
        const scratchedN = raceFields.filter((item) => !item.scratching);
        const scratchedY = raceFields.filter((item) => item.scratching);
        if (sort === 'default' || sort === 'asc') {
            setRaceFields([
                ...scratchedN.sort((a, b) => a.fieldnum - b.fieldnum).reverse(),
                ...scratchedY,
            ]);
        } else {
            setRaceFields([
                ...scratchedN.sort((a, b) => a.fieldnum - b.fieldnum),
                ...scratchedY,
            ]);
        }
    };

    function showStat(actualcode) {
        let chk = stats.filter((item) => item === actualcode);
        if (chk.length > 0) {
            setStats(stats.filter((item) => item !== actualcode));
        } else {
            setStats([...stats, actualcode]);
        }
    }

    const showBoxRow = () => {
        if (
            props.activeTabName === 'Win/Place' ||
            props.activeTabName === 'SameRaceMulti'
        ) {
            return false;
        } else {
            return true;
        }
    };
    // let showBoxRow = props.activeTabName != 'Win/Place'  ? true : false;

    let fields = {
        Quinella: 2,
        Exacta: 2,
        Trifecta: 3,
        First4: 4,
    };
    let fieldsCount = props.activeTabName ? fields[props.activeTabName] : 0;

    function getClassName(field) {
        let classlist = Array.from(field.classList);
        let idxActiveClass = classlist.findIndex((item) =>
            item.includes('activebutton')
        );
        let getclassname =
            idxActiveClass != -1 ? classlist[idxActiveClass] : null;
        return getclassname;
    }

    function toggleClass(field) {
        let getclassname = getClassName(field);
        getclassname
            ? field.classList.remove(getclassname)
            : field.classList.add(classes.activebutton);
    }

    //Fields Selection Logic
    const toggleField = (e, ele, pos) => {
        //check background color
        let bets = localStorage.getItem(props.activeTabName)
            ? JSON.parse(localStorage.getItem(props.activeTabName))
            : {};
        let data = {};
        let key = null;
        let qbets = {};
        let racenum = props.raceNumbers.filter(
            (e) => e.raceid === props.raceid
        )[0].racenum;
        if (props.activeTabName == 'Quaddie') {
            key = 'R' + props.quaddienum + '_' + props.quaddieRaces[0];
            qbets = bets[key] ? bets[key] : {};
            data = qbets ? (qbets[racenum] ? qbets[racenum] : {}) : {};
        } else {
            data = isBoxed
                ? localStorage.getItem('Boxed' + props.activeTabName)
                    ? JSON.parse(
                          localStorage.getItem('Boxed' + props.activeTabName)
                      )
                    : {}
                : bets[props.raceid]
                ? bets[props.raceid]
                : {};
        }

        let parentfield = document.getElementsByName('parentfield' + pos)[0];
        let getAllFields = document.getElementsByName('field' + pos);
        toggleClass(e.currentTarget);
        let arr = data[pos] ? data[pos] : [];
        let arr1 = [];
        if (ele != 'parentfield') {
            let fnum = e.currentTarget.dataset.fieldnum;
            let chkField = data[pos] ? arr.indexOf(fnum) : null;
            if (chkField == -1 || chkField == null) {
                arr.push(fnum);
            } else {
                arr.splice(chkField, 1);
            }
            data[pos] = arr;
            let getclassname = getClassName(parentfield);
            //check if all fields selected under parent and change bgcolor accordingly
            arr.length == getAllFields.length
                ? parentfield.classList.add(classes.activebutton)
                : getclassname
                ? parentfield.classList.remove(getclassname)
                : null;
        } else {
            //checking if fields array has all elements
            arr.length != getAllFields.length &&
                Array.from(getAllFields).map((ele, idx) => {
                    let fnum = ele.dataset.fieldnum;
                    arr1.push(fnum);
                });
            //change background color of corresponding fields when parent clicked
            Array.from(getAllFields).map((ele, idx) => {
                let getclassname = getClassName(ele);
                arr1.length > 0
                    ? ele.classList.add(classes.activebutton)
                    : getclassname
                    ? ele.classList.remove(getclassname)
                    : null;
            });
            data[pos] = arr1;
        }
        props.activeTabName != 'Quaddie' && (bets[props.raceid] = data);
        if (props.activeTabName == 'Quaddie') {
            localStorage.setItem(
                'Boxed' + props.activeTabName,
                JSON.stringify(data)
            );
            setBetsLocal(data);
            let totalRunners = raceFields.filter(
                (item) => !item.scratching
            ).length;
            qbets[racenum] = data;
            qbets[racenum]['fields'] = totalRunners;
            bets[key] = qbets;
            localStorage.setItem(props.activeTabName, JSON.stringify(bets));
            props.setquaddieBets(qbets);
        } else {
            isBoxed
                ? localStorage.setItem(
                      'Boxed' + props.activeTabName,
                      JSON.stringify(data)
                  )
                : localStorage.setItem(
                      props.activeTabName,
                      JSON.stringify(bets)
                  );
            setBetsLocal(bets[props.raceid]);
        }
        setsCombinations(true);
    };
    const getAddBar = () => {
        return isDesktop ? (
            <Box
                p={1}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    bgcolor: 'primary.main',
                    position: 'sticky',
                    bottom: 0,
                }}
            >
                <Typography fontSize={13}>
                    Tap <b>+</b> button to select runners
                </Typography>
            </Box>
        ) : (
            <Drawer
                anchor="bottom"
                hideBackdrop={true}
                variant="persistent"
                open={true}
                PaperProps={{
                    style: {
                        zIndex: 10,
                        bottom: { xs: 50 },
                    },
                }}
            >
                <Box
                    p={1}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        bgcolor: 'primary.main',
                    }}
                >
                    <Typography fontSize={13}>
                        Tap <b>+</b> button to select runners
                    </Typography>
                </Box>
            </Drawer>
        );
    };
    const renderSRMComp = () => {
        return (
            <>
                {raceFields.map((item) => (
                    <SRM
                        stats={stats}
                        key={item.actualcode}
                        showStat={showStat}
                        raceField={item}
                        raceid={props.raceid}
                        event={event}
                        raceResulted={raceResulted}
                        columns={columns}
                        flucs={props.flucs}
                        hotbet={props.hotbet}
                        runners={props.runners}
                        speedMap={speedMap}
                        activeTabName={props.activeTabName}
                        fieldsCount={fieldsCount}
                        isBoxed={isBoxed}
                        toggleField={toggleField}
                        betsLocal={betsLocal}
                        setBetsLocal={setBetsLocal}
                        raceBetProducts={props.racebetproducts}
                        productGroupType={betProductType ? betProductType : ''}
                        eventDetails={props.eventDetails}
                        setsCombinations={setsCombinations}
                        raceStatus={raceStatus}
                        handleBetSlip={handleBetSlip}
                        quaddieRaces={props.quaddieRaces}
                        quaddienum={props.quaddienum}
                        racenumbers={props.raceNumbers}
                        setquaddieBets={props.setquaddieBets}
                        quaddieBets={props.quaddieBets}
                        totalRunners={
                            raceFields.filter((item) => !item.scratching).length
                        }
                        desktopColumns={props.desktopColumns}
                        raceSpeedMaps={props.raceSpeedMaps}
                        sortUpdate={sortUpdate}
                    />
                ))}
            </>
        );
    };
    const renderRaceFieldcomp = () => {
        return (
            <React.Fragment>
                {raceFields.map((item) => (
                    <RenderRaceField
                        stats={stats}
                        key={item.actualcode}
                        showStat={showStat}
                        raceField={item}
                        raceid={props.raceid}
                        event={event}
                        raceResulted={raceResulted}
                        columns={columns}
                        flucs={props.flucs}
                        hotbet={props.hotbet}
                        runners={props.runners}
                        speedMap={speedMap}
                        activeTabName={props.activeTabName}
                        fieldsCount={fieldsCount}
                        isBoxed={isBoxed}
                        toggleField={toggleField}
                        betsLocal={betsLocal}
                        setBetsLocal={setBetsLocal}
                        raceBetProducts={props.racebetproducts}
                        productGroupType={betProductType ? betProductType : ''}
                        eventDetails={props.eventDetails}
                        setsCombinations={setsCombinations}
                        raceStatus={raceStatus}
                        handleBetSlip={handleBetSlip}
                        quaddieRaces={props.quaddieRaces}
                        quaddienum={props.quaddienum}
                        racenumbers={props.raceNumbers}
                        setquaddieBets={props.setquaddieBets}
                        quaddieBets={props.quaddieBets}
                        totalRunners={
                            raceFields.filter((item) => !item.scratching).length
                        }
                        desktopColumns={props.desktopColumns}
                        raceSpeedMaps={props.raceSpeedMaps}
                        sortUpdate={sortUpdate}
                    />
                ))}
            </React.Fragment>
        );
    };

    // if (isSRM && props.availexotics['srm'] === false) {
    //     return <div>SRM not available here</div>;
    // }
    return (
        <Box
            sx={{
                backgroundColor: 'text.active',
                pb: { xs: 2, sm: 0 },
                pt: 1,
                mb: { xs: 4, sm: 0 },
            }}
        >
            {showBoxRow() && !raceResulted && (
                <BettingFilters
                    {...props}
                    fieldsCount={fieldsCount}
                    isBoxed={isBoxed}
                    setBoxed={setBoxed}
                    toggleField={toggleField}
                    selectedParent={selectedParent}
                    setParentSelected={setParentSelected}
                    betsLocal={betsLocal}
                    setBetsLocal={setBetsLocal}
                    quaddiekey={
                        props.quaddienum > 0
                            ? 'R' +
                              props.quaddienum +
                              '_' +
                              props.quaddieRaces[0]
                            : 0
                    }
                    racenum={
                        props.raceNumbers.length > 0 &&
                        props.raceNumbers.filter(
                            (e) => e.raceid === props.raceid
                        ).length > 0
                            ? props.raceNumbers.filter(
                                  (e) => e.raceid === props.raceid
                              )[0].racenum
                            : null
                    }
                />
            )}
            <Container disableGutters sx={{ pb: { sm: 4 } }}>
                <Box
                    sx={{ borderBottom: 1, borderColor: 'grey.border1' }}
                    mb={1}
                    pb={1}
                    mx={2}
                >
                    <Grid container columnSpacing={1}>
                        <Grid item xs={isDesktop ? 1 : 1.5}>
                            {speedMap && (
                                <Box
                                    onClick={barSort}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'end',
                                        cursor: 'pointer',
                                        height: '100%',
                                    }}
                                >
                                    <Typography
                                        style={{
                                            fontSize: 13,
                                            color: 'grey',
                                        }}
                                    >
                                        Bar
                                    </Typography>
                                    <Box ml={0.4} mb={0.4}>
                                        <div className="up-arrow"></div>
                                        <div className="down-arrow"></div>
                                    </Box>
                                </Box>
                            )}
                        </Grid>
                        {isDesktop && props.activeTabName == 'Win/Place' ? (
                            <React.Fragment>
                                <Grid item xs>
                                    <Box
                                        onClick={fieldSort}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'end',
                                            cursor: 'pointer',
                                            height: '100%',
                                        }}
                                    >
                                        <Typography
                                            style={{
                                                fontSize: 13,
                                                color: 'grey',
                                            }}
                                        >
                                            Runner
                                        </Typography>
                                        <Box ml={0.4} mb={0.4}>
                                            <div className="up-arrow"></div>
                                            <div className="down-arrow"></div>
                                        </Box>
                                    </Box>
                                </Grid>
                                {props?.desktopColumns?.map((item, idx) => (
                                    <Grid item xs="auto" key={idx}>
                                        <Box
                                            onClick={() =>
                                                item.btype.toLowerCase() !=
                                                'win'
                                                    ? placeSort(item.pg)
                                                    : winSort(item.pg)
                                            }
                                            sx={{
                                                display: 'flex',
                                                width: 60,
                                                justifyContent: 'center',
                                                alignItems: 'end',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Stack
                                                direction="column"
                                                alignItems="center"
                                                justifyContent="end"
                                            >
                                                {item.dropdownlabel
                                                    .replace(/\s/, '~')
                                                    .split('~')
                                                    .map((label, i) => (
                                                        <Typography
                                                            noWrap
                                                            key={i}
                                                            component="div"
                                                            align="center"
                                                            sx={{
                                                                fontSize:
                                                                    isDesktop
                                                                        ? 11
                                                                        : 13,
                                                            }}
                                                        >
                                                            {label}
                                                        </Typography>
                                                    ))}
                                            </Stack>
                                            {item != '' && (
                                                <Box ml={0.4} mb={0.4}>
                                                    <div className="up-arrow"></div>
                                                    <div className="down-arrow"></div>
                                                </Box>
                                            )}
                                        </Box>
                                    </Grid>
                                ))}
                                {process.env.APP_BRAND == 'gto' && (
                                    <Grid item xs={1}></Grid>
                                )}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Grid
                                    item
                                    xs={
                                        isDesktop
                                            ? 6.5
                                            : columns.length > 1 ||
                                              props.activeTabName == 'First4' ||
                                              process.env.APP_BRAND == 'gto'
                                            ? 5.9
                                            : 6.5
                                    }
                                >
                                    <Box onClick={fieldSort}>
                                        <Typography
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                fontSize: isDesktop ? 11 : 13,
                                                color: 'grey',
                                            }}
                                        >
                                            Runner
                                            <Box ml={0.4}>
                                                <div className="up-arrow"></div>
                                                <div className="down-arrow"></div>
                                            </Box>
                                        </Typography>
                                    </Box>
                                </Grid>
                                {columns.map((item, idx) => (
                                    <Grid
                                        item
                                        xs={
                                            isDesktop
                                                ? 4.5
                                                : columns.length > 1
                                                ? 2.3
                                                : props.activeTabName ==
                                                  'First4'
                                                ? 4.6
                                                : process.env.APP_BRAND == 'gto'
                                                ? 2.3
                                                : 4
                                        }
                                        key={idx}
                                    >
                                        <Box
                                            onClick={() =>
                                                item.btype.toLowerCase() !=
                                                'win'
                                                    ? placeSort(item.pg)
                                                    : winSort(item.pg)
                                            }
                                            mr={
                                                isBoxed
                                                    ? isDesktop
                                                        ? 6
                                                        : 2
                                                    : props.activeTabName ==
                                                      'Win/Place'
                                                    ? columns.length > 1
                                                        ? 0
                                                        : 1.5
                                                    : 0
                                            }
                                            sx={{
                                                display: 'flex',
                                                justifyContent: isBoxed
                                                    ? isDesktop
                                                        ? 'end'
                                                        : 'center'
                                                    : props.activeTabName ==
                                                      'Win/Place'
                                                    ? columns.length > 1
                                                        ? 'center'
                                                        : 'flex-end'
                                                    : 'flex-end',
                                            }}
                                        >
                                            <Typography
                                                noWrap
                                                ml={isBoxed ? 1 : 0}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                    fontSize: 13,
                                                    color: 'grey.dark',
                                                    justifyContent: isBoxed
                                                        ? 'flex-start'
                                                        : props.activeTabName ==
                                                          'Win/Place'
                                                        ? 'center'
                                                        : 'flex-end',
                                                }}
                                            >
                                                {item?.raceoddlabel?.replace(
                                                    / /g,
                                                    ''
                                                )}
                                                {item?.btype != '' && (
                                                    <Box ml={0.4}>
                                                        <div className="up-arrow"></div>
                                                        <div className="down-arrow"></div>
                                                    </Box>
                                                )}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                                {process.env.APP_BRAND == 'gto' && (
                                    <Grid item xs={2.3}></Grid>
                                )}
                                <Grid item xs={12}></Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </Box>
                {isSRM ? renderSRMComp() : renderRaceFieldcomp()}
            </Container>
            {props.activeTabName == 'Quaddie' &&
                props.quaddieBets &&
                Object.values(props.quaddieBets).some(
                    (x) => Object.values(x)[0].length > 0
                ) && (
                    <FieldCombinations
                        activeTabName={props.activeTabName}
                        raceid={props.raceid}
                        betsLocal={betsLocal}
                        setBetsLocal={setBetsLocal}
                        combinations={combinations}
                        showCombinations={showCombinations}
                        setsCombinations={setsCombinations}
                        setFieldCombinations={setFieldCombinations}
                        isBoxed={isBoxed}
                        event={event}
                        handleBetSlip={handleBetSlip}
                        racenumbers={props.raceNumbers}
                        quaddienum={props.quaddienum}
                        quaddiekey={
                            props.quaddienum > 0
                                ? 'R' +
                                  props.quaddienum +
                                  '_' +
                                  props.quaddieRaces[0]
                                : 0
                        }
                        setquaddieBets={props.setquaddieBets}
                        quaddieBets={props.quaddieBets}
                        totalRunners={
                            raceFields.filter((item) => !item.scratching).length
                        }
                    />
                )}
            {props.activeTabName != 'Quaddie' &&
                props.activeTabName != 'Win/Place' &&
                Object.values(betsLocal).some((x) => x.length > 0) && (
                    <FieldCombinations
                        activeTabName={props.activeTabName}
                        raceid={props.raceid}
                        betsLocal={betsLocal}
                        setBetsLocal={setBetsLocal}
                        combinations={combinations}
                        showCombinations={showCombinations}
                        setsCombinations={setsCombinations}
                        setFieldCombinations={setFieldCombinations}
                        isBoxed={isBoxed}
                        event={event}
                        handleBetSlip={handleBetSlip}
                        racenumbers={props.raceNumbers}
                        quaddienum={props.quaddienum}
                        quaddiekey={
                            props.quaddienum > 0
                                ? 'R' +
                                  props.quaddienum +
                                  '_' +
                                  props.quaddieRaces[0]
                                : 0
                        }
                        setquaddieBets={props.setquaddieBets}
                        quaddieBets={props.quaddieBets}
                        totalRunners={
                            raceFields.filter((item) => !item.scratching).length
                        }
                    />
                )}

            {props.activeTabName === 'SameRaceMulti' && (
                <SRMSummaryBar raceid={props.raceid} />
            )}
            {props.activeTabName == 'Quaddie' &&
                props.quaddieBets &&
                !Object.values(props.quaddieBets).some(
                    (x) => Object.values(x)[0].length > 0
                ) &&
                getAddBar()}
            {props.eventDetails?.rules && (
                <Box sx={{ mt: { xs: 2, md: 0 }, mb: { xs: 0, md: 2 } }}>
                    <Typography
                        component="p"
                        align="center"
                        fontSize={14}
                        fontWeight="bold"
                    >
                        <b>Event Rules</b>:&nbsp;{props.eventDetails?.rules}
                    </Typography>
                </Box>
            )}

            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </Box>
    );
}

export default RaceDetail;
