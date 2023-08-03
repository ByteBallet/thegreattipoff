import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, SvgIcon } from '@mui/material';
import MarketDetails from './MarketDetails';
import TrendingMarketDetails from './TrendingMarketDetails';
import sgm from "@public/images/svg/sgm-icon.svg";

const MarketAccordion = ({ label, activeTab, setShow, show, events, showPopular = false,
    expanded, active, comp, status, betsLocal, handleChange, addTipToBetSlip, parentSGM, eventdesc, compName }) => {

    let markets = []
    let skipMarket = false
    let selectedMarket = events.marketmenu.filter((market) => market.marketlabel.replace("Markets", "") == label);
    if (selectedMarket.length > 0) {
        skipMarket = selectedMarket[0].eventid != 0 ? true : false
    }
    if (!skipMarket) {
        if (active == "all") {
            markets = events.submarketgroup ? events.submarketgroup.filter((item) => { if (item.grouplabel.replace("Markets", "") == label) return item }) : []
        } else {
            markets = events.sgmmarkets ? events.sgmmarkets.submarkets ? events.sgmmarkets.submarkets : markets : markets
        }
    }
    let chkSGM = events.marketmenu ? events.marketmenu.filter((market) => market.marketlabel.replace("Markets", "") == label) : []
    let isSGM = active == "all" && chkSGM.length > 0 && chkSGM[0].sgm
    return (
        <Box bgcolor="white.main">
            {
                skipMarket ?
                    <MarketDetails
                        subMarkets={selectedMarket}
                        view={active}
                        show={show}
                        setShow={setShow}
                        comp={comp}
                        addTipToBetSlip={addTipToBetSlip}
                        expanded={expanded}
                        status={status}
                        betsLocal={betsLocal}
                        skipMarket={skipMarket ? selectedMarket[0].eventid : 0}
                        activeTab={activeTab}
                        eventdesc={eventdesc}
                        compName={compName}
                    />
                    :
                    active == "sgm" && !showPopular ?
                        <React.Fragment>
                            {
                                markets.length > 0 ?
                                    <MarketDetails
                                        subMarkets={active == "all" ? markets[0].submarkets : markets}
                                        view={active}
                                        show={show}
                                        setShow={setShow}
                                        comp={comp}
                                        addTipToBetSlip={addTipToBetSlip}
                                        expanded={expanded}
                                        status={status}
                                        betsLocal={betsLocal}
                                        activeTab={activeTab}
                                        eventdesc={eventdesc}
                                        compName={compName}
                                    /> : null

                            }
                        </React.Fragment>
                        :
                        <Accordion
                            square
                            elevation={0}
                            expanded={expanded.toLowerCase() === label.toLowerCase()}
                            onChange={handleChange(label)}
                            TransitionProps={{ unmountOnExit: true }}
                            sx={{
                                color: expanded.toLowerCase() === label.toLowerCase() ? "white.main" : "inherit"
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon color={expanded.toLowerCase() === label.toLowerCase() ? "white" : "black.main"} />}
                                aria-controls={`${activeTab}-content`}
                                id={`${activeTab}-header`}
                                sx={{
                                    bgcolor: expanded.toLowerCase() === label.toLowerCase() ? "primary.main" : "inherit",
                                    backgroundImage: expanded.toLowerCase() === label.toLowerCase() ? "linear-gradient(0deg, #000, #736e6e)" : "none",
                                    height: 48,
                                    minHeight: 48,
                                    my: 0,
                                    '& .MuiAccordionSummary-content': {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    },
                                }}
                            >
                                <Typography mx={0.5} fontSize={14} className="textCapitalize" fontWeight="bold" color="inherit">{label}</Typography>
                                {isSGM &&
                                    <SvgIcon
                                        fontSize='small'
                                        sx={{ width: 30 }}
                                        color="grey.light"
                                        component={sgm}
                                        viewBox="0 0 2032.96 1048.56"
                                    />
                                }
                                {/* {isSGM &&
                                    <img src='/images/svg/sgm-icon.svg' alt="SGM" width={35} />
                                } */}
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                                <React.Fragment>
                                    {
                                        label.toLowerCase() == "popular"
                                            ?
                                            <TrendingMarketDetails
                                                match={events}
                                                parentSGM={parentSGM}
                                                status={status}
                                                addTipToBetSlip={addTipToBetSlip}
                                                betsLocal={betsLocal}
                                                view={active}
                                            /> :
                                            markets.length > 0 ?
                                                <MarketDetails
                                                    subMarkets={active == "all" ? markets[0].submarkets : markets}
                                                    view={active}
                                                    show={show}
                                                    setShow={setShow}
                                                    comp={comp}
                                                    addTipToBetSlip={addTipToBetSlip}
                                                    expanded={expanded}
                                                    status={status}
                                                    betsLocal={betsLocal}
                                                    activeTab={activeTab}
                                                    eventdesc={eventdesc}
                                                    compName={compName}
                                                /> : null

                                    }
                                </React.Fragment>
                            </AccordionDetails>
                        </Accordion>
            }
        </Box >
    );
};

export default MarketAccordion;