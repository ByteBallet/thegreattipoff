import React from 'react';
import FutureRaceFields from './FutureRaceFields';
import { useEffect, useState, useRef, useContext, useMemo } from "react";
import { Box, Button, Typography, Container, Grid, useMediaQuery } from "@mui/material";
import { getOddsPrices } from '@Components/utils/RacingUtil';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';

const FutureRaces = ({ raceFields, raceid, raceResulted, raceStatus,
    setRaceFields, setRaceStatus, setRaceResulted, raceBetProducts, eventDetails }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext);
    let columns = ["Win", "Place"]
    const [sortColumn, setSortColumn] = useState(null);
    const [sorted, setSorted] = useState("default");
    const [sortedP, setSortedP] = useState("asc");
    const [sortedF, setSortedF] = useState("default");
    // const [intervalid, setintervalid] = useState(0);
    const [openBetSlip, setopenBetSlip] = useState(false);
    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    function winSort(setSortCol = false) {
        !setSortCol && setSortColumn("win")
        setSorted((sorted === "default" || sorted === "desc") ? "asc" : "desc");
        const scratchedN = raceFields.filter((item) => !item.scratching);
        const scratchedY = raceFields.filter((item) => item.scratching);
        if (sorted === "default" || sorted === "desc") {
            setRaceFields([...scratchedN.sort((a, b) => (getOddsPrices(a, true, "Fixed") - getOddsPrices(b, true, "Fixed"))), ...scratchedY]);
        } else if (sorted === "asc") {
            setRaceFields([...scratchedN.sort((a, b) => (getOddsPrices(b, true, "Fixed") - getOddsPrices(a, true, "Fixed"))), ...scratchedY]);
        }
    }


    function placeSort(setSortCol = false) {
        !setSortCol && setSortColumn("place")
        setSortedP((sortedP === "default" || sortedP === "desc") ? "asc" : "desc");
        const scratchedN = raceFields.filter((item) => !item.scratching);
        const scratchedY = raceFields.filter((item) => item.scratching);
        if (sortedP === "default" || sortedP === "desc") {
            setRaceFields([...scratchedN.sort((a, b) => (getOddsPrices(a, false, "Fixed") - getOddsPrices(b, false, "Fixed"))), ...scratchedY]);
        } else if (sortedP === "asc") {
            setRaceFields([...scratchedN.sort((a, b) => (getOddsPrices(b, false, "Fixed") - getOddsPrices(a, false, "Fixed"))), ...scratchedY]);
        }
    }

    function fieldSort(setSortCol = false) {
        setSortedF((sortedF === "default" || sortedF === "asc") ? "desc" : "asc");
        !setSortCol && setSortColumn("field")
        const scratchedN = raceFields.filter((item) => !item.scratching);
        const scratchedY = raceFields.filter((item) => item.scratching);
        if (sortedF === "default" || sortedF === "asc") {
            setRaceFields([...scratchedN.sort((a, b) => a.fieldname.localeCompare(b.fieldname)).reverse(), ...scratchedY]);
        } else {
            setRaceFields([...scratchedN.sort((a, b) => a.fieldname.localeCompare(b.fieldname)), ...scratchedY]);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (raceStatus == 'final' || raceStatus == "abandoned") return;
            getUpdatedPrices()
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    function getUpdatedPrices() {
        const url = `${process.env.server}/selecttips/getRacePrices`;
        authAPI(url, { raceid: raceid, clientid: user.clientID ? user.clientID : "" }, "POST", false)
            .then((resp) => {
                if (resp.error) {
                    return;
                } else {
                    if (resp.data && resp.data.QRACEDETAIL && resp.data.QRACEDETAIL.length && (raceStatus == "open" || raceStatus == "")) {
                        resp.data.QRACEDETAIL.forEach((item) => {
                            let index = raceFields.findIndex((rItem) => rItem.actualcode === item.ACTUALCODE);
                            let win = item.SCRATCHING == "N" ? item.SPRICES["Fixed"] ? item.SPRICES["Fixed"].filter(obj => obj && obj.BTYPE === 'Win') : 0 : 0;
                            let place = item.SCRATCHING == "N" ? item.SPRICES["Fixed"] ? item.SPRICES["Fixed"].filter(obj => obj && obj.BTYPE === 'Place') : 0 : 0;
                            let winprice = win != "0" ? win.length > 0 ? win[0].PRICE : 0 : win;
                            let placeprice = place != "0" ? place.length > 0 ? place[0].PRICE : 0 : place;
                            let winchange = raceFields[index].win ? winprice - raceFields[index].win : 0;
                            let placechange = raceFields[index].place ? placeprice - raceFields[index].place : 0;

                            raceFields[index].updateOdds(
                                item.SPRICES,
                                {
                                    win: item.SCRATCHING != "N" ? item.WINDEDUCT : winprice,
                                    place: item.SCRATCHING != "N" ? item.PLACEDEDUCT : placeprice,
                                },
                                item.SCRATCHING != "N" ? true : false,
                                {
                                    winchange: winchange,
                                    placechange: placechange,
                                },
                                item.flucs,
                            );
                        })
                    }

                    //update race status
                    let status = resp.data ? resp.data.raceStatus.status.toLowerCase() : ""
                    if (
                        status == 'closed' ||
                        status == 'suspended' ||
                        status == 'interim' ||
                        status == 'final'
                    ) {
                        if (raceStatus !== status) {
                            setRaceStatus(status);
                        }
                    }

                    if (status == 'interim') {
                        setRaceResulted(true);
                    }

                    if (status == 'final') {
                        if (!raceResulted) setRaceResulted(true);
                    }
                    if (raceStatus == "open" || raceStatus == "") {
                        if (sortColumn) {
                            sortColumn == "win" ?
                                winSort(true) :
                                sortColumn == "place" ?
                                    placeSort(true) :
                                    sortColumn == "field" ?
                                        fieldSort(true) :
                                        setRaceFields([...raceFields]);
                        }
                    }
                }
            }).catch((e) => console.log(e));
    }


    return (
        <Box sx={{ backgroundColor: "text.active", pb: 2, pt: 1, mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }} mx={2} my={1}>
                <Button variant="contained" disabled className="BetProductSelect" sx={{ py: 0, px: 3 }}>
                    Fixed
                </Button>
            </Box>
            <Container disableGutters>
                <Box sx={{ borderBottom: 1, borderColor: 'grey.border1' }} pb={1} mx={2} mt={1}>
                    <Grid container columnSpacing={1} justifyContent="space-between">
                        <Grid item xs={isDesktop ? 10 : 7.4}>
                            <Box onClick={fieldSort}>
                                <Typography
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        fontSize: 13,
                                        color: "grey",
                                    }}>
                                    Runner
                                    <Box ml={0.4}>
                                        <div className="up-arrow"></div>
                                        <div className="down-arrow"></div>
                                    </Box>
                                </Typography>
                            </Box>
                        </Grid>
                        {columns.map((item, idx) =>
                            <Grid item xs={isDesktop ? "auto" : 2.3} key={idx} container alignItems={"flex-end"}>
                                <Box
                                    onClick={idx == "1" ? placeSort : winSort}
                                    sx={{
                                        display: "flex",
                                        width: isDesktop ? 60 : "100%",
                                        justifyContent: "center",
                                        alignItems: "end",
                                        cursor: "pointer"

                                    }}>
                                    <Typography
                                        noWrap
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            fontSize: 13,
                                            color: "grey.dark",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            width: 1
                                        }}>
                                        {item.replace(/ /g, "")}
                                        {
                                            item != "" &&
                                            <Box ml={0.4}>
                                                <div className="up-arrow"></div>
                                                <div className="down-arrow"></div>
                                            </Box>
                                        }
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                </Box>
                {raceFields.map((item, idx) => (
                    <FutureRaceFields
                        key={idx}
                        raceField={item}
                        raceid={raceid}
                        columns={columns}
                        raceStatus={raceStatus}
                        raceResulted={raceResulted}
                        raceBetProducts={raceBetProducts}
                        eventDetails={eventDetails}
                        handleBetSlip={handleBetSlip}
                        isJC={false}
                    />
                ))}
            </Container>
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </Box>
    );
};

export default FutureRaces;