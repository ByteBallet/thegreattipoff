import { Box } from '@mui/material';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import authAPI from '@Components/utils/authAPI';
import FieldsModel from '@Models/Racing/Fields';
import FutureRaceFields from '../Futures/FutureRaceFields';

const JockeyChallengeFields = ({ details, setRaceStatus, setRaceResulted,
    raceStatus, raceResulted, handleBetSlip, raceid, expanded }) => {
    const [raceFields, setRaceFields] = useState([]);
    const [betproducts, setbetproducts] = useState([]);
    const [eventDetails, setEventDetails] = useState();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (Object.keys(details).length > 0) {
            if (details && details.raceStatus) {
                let status = details.raceStatus.status
                    ? details.raceStatus.status.toLowerCase()
                    : 'open';
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
            }

            if (
                details &&
                details.betproducts &&
                details.betproducts.length > 0
            ) {
                setbetproducts(details.betproducts);
            }

            if (details && details.jockeyevent) {
                setEventDetails(details.jockeyevent)
            }

            if (
                details &&
                details.QRACEDETAIL &&
                details.QRACEDETAIL.length
            ) {
                let fields = [];
                let sFields = [];
                details.QRACEDETAIL.forEach((field) => {
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
                        racemeet: details.jockeyevent.eventname,
                        racetimeutc: details.jockeyevent.racetimeUTC,
                        racenum: "",
                        eventname: details.jockeyevent.eventname,
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
                setRaceFields(sortedFields);
            }
        }
    }, [details])
    let columns = ["Win"]

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (expanded == raceid) {
                if (raceStatus == 'final' || raceStatus == "abandoned") return;
                raceFields.length > 0 && getUpdatedPrices()
            }
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
                            if (index > -1) {
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
                            }
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
                        setRaceFields([...raceFields]);
                    }
                }
            }).catch((e) => console.log(e));
    }
    return (
        <Box>
            {raceFields.map((item, idx) => (
                <FutureRaceFields
                    key={idx}
                    raceField={item}
                    raceid={eventDetails.eventid}
                    columns={columns}
                    raceStatus={raceStatus}
                    raceResulted={raceResulted}
                    raceBetProducts={betproducts}
                    eventDetails={eventDetails}
                    handleBetSlip={handleBetSlip}
                    isJC={true}
                />
            ))}
        </Box>
    );
};

export default JockeyChallengeFields;