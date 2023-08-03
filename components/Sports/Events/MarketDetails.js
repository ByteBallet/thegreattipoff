import React from 'react';
import { useContext, useState, useEffect, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Stack, Grid, SvgIcon } from '@mui/material';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import SubMarketDetails from './SubMarketDetails';
import sgm from "@public/images/svg/sgm-icon.svg";

const MarketDetails = ({ subMarkets, view, setShow, show, comp, addTipToBetSlip, status, betsLocal, skipMarket = 0, activeTab, eventdesc, compName }) => {
    const [markets, setMarkets] = useState({});
    const { user } = useContext(UserContext)

    const handleChange = (eventid) => (event, isExpanded) => {
        isExpanded && getEventComp(eventid)
        setShow(isExpanded ? eventid : 0);
    };

    async function getEventComp(eventid) {
        let body = {
            eventid: eventid,
            clientid: user.clientID ? user.clientID : "",
        };
        const url = `${process.env.server}/sports/GetEventComp`;

        const response = await authAPI(url, body, 'POST', false);
        if (!response.error) {
            if (response.data.ERROBJ.ERRORCODE == 0) {
                setMarkets(response.data.sportmarket)
            }
        }
    }

    useEffect(() => {
        if (skipMarket != 0 && show != skipMarket && activeTab != 0) {
            getEventComp(skipMarket)
            setShow(skipMarket);
        }
        if (activeTab == 0) { setShow(0) }
    }, [activeTab])

    return (
        <Box>
            <Grid container rowSpacing={1} columnSpacing={0}>
                {
                    subMarkets.map((market, idx) =>
                        <Grid container item xs={12} key={idx}>
                            <Accordion
                                square
                                elevation={0}
                                TransitionProps={{ unmountOnExit: true }}
                                key={idx}
                                sx={{
                                    width: "100%",
                                }}
                                expanded={show === market.eventid}
                                onChange={handleChange(market.eventid)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${market.desc}-content`}
                                    id={`${market.desc}-header`}
                                    sx={{
                                        bgcolor: show === market.eventid ? "primary.light1" : "inherit",
                                        mx: show === market.eventid ? 0 : 2,
                                        borderBottom: show === market.eventid ? 0 : 1, borderColor: 'grey.border1',
                                        px: show === market.eventid ? 2 : 0,
                                        height: 50,
                                        minHeight: 50,
                                        my: 0,
                                        '& .MuiAccordionSummary-content': {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        },
                                    }}
                                >
                                    <Typography mx={0.5} fontSize={14} className="textCapitalize" fontWeight={view == "sgm" ? "bold" : "normal"}>
                                        {market.marketlabel ? market.marketlabel : market.desc}
                                    </Typography>
                                    {market.sgm && view == "all" &&
                                        <SvgIcon
                                            fontSize='small'
                                            sx={{ width: 32 }}
                                            color="grey.light"
                                            component={sgm}
                                            viewBox="0 0 2032.96 1048.56"
                                        />
                                    }
                                </AccordionSummary>
                                <AccordionDetails sx={{ pt: 0 }}>
                                    {markets &&
                                        <Box>
                                            {
                                                markets.competitors && markets.competitors.map((item, idx) =>
                                                    <Box key={idx}>
                                                        <SubMarketDetails
                                                            market={item}
                                                            parentMarket={markets}
                                                            comp={comp}
                                                            productGroupType={market.desc}
                                                            addTipToBetSlip={addTipToBetSlip}
                                                            show={show}
                                                            status={status}
                                                            betsLocal={betsLocal}
                                                            isSGM={market.sgm}
                                                            view={view}
                                                            eventdesc={eventdesc}
                                                            compName={compName}
                                                        />
                                                    </Box>
                                                )
                                            }
                                            {
                                                markets?.comment?.length > 0 &&
                                                <Box sx={{ bgcolor: "background.default", mt: 2, py: 4, px: 2, color: "grey.main", display: "flex", justifyContent: "center" }}>
                                                    <Typography color="inherit" fontSize={14} align="center" ><b>Event Rules</b>: {markets?.comment}</Typography>
                                                </Box>
                                            }
                                        </Box>
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )
                }

            </Grid >
        </Box >
    );
};

export default MarketDetails;