import React from 'react';
import { Typography, Box, Grid, Stack } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import Image from "next/image";
import { TipContext } from "@Context/Tip/TipProvider";
import NumberFormat from "react-number-format";
import { getBetID } from "@Components/utils/RacingUtil";
import { SportTeams } from 'SportTeams';

const getTeamLogo = (team, src, setImgSrc, fallbackSrc) => {
    return (
        <Image
            src={src}
            alt={team}
            width={40}
            height={33}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    )
}

const getTeamDetails = (team, odds, line, status, showOnlyOdds) => {
    return (
        <Grid container spacing={0}>
            {
                !showOnlyOdds &&
                <Grid item xs={12} zeroMinWidth>
                    <Typography
                        component='p'
                        fontSize={12}
                        noWrap
                        align="center"
                        sx={{ lineHeight: 1.2 }}
                        color={(status != 'open') ? "grey.disabledTipText" : "black.main"}>
                        {team}
                    </Typography>
                </Grid>
            }
            <Grid item xs={12} zeroMinWidth>
                <Typography
                    component='p'
                    fontSize={showOnlyOdds ? 14 : 12}
                    noWrap
                    fontWeight={700}
                    align="center"
                    sx={{ lineHeight: 1.2 }}
                    color={(status != 'open') ? "grey.disabledTipText" : "black.main"}
                >
                    {line}&nbsp;<NumberFormat
                        value={odds}
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType="text"
                    />
                </Typography>
            </Grid>
        </Grid>
    )
}

const SportsOdds = ({ team, odds, teamcode, position, addToBetSlip, line, shadow,
    logo, tipId, betType, productGroupType, type, status, betsLocal, eventid, view = "all", featured, showOnlyOdds }) => {
    const colorRef = useRef(featured ? "white.main" : "grey.tipBtn")
    const { tips } = useContext(TipContext);

    const [imgSrc, setImgSrc] = useState((teamcode && teamcode != "") ? `https://silks.elitebet.com.au/assets/teamsilks/silks/${teamcode.replace(/_/g, "/")}.png` : `/images/no-team-icon.jpg`);
    let fallbackSrc = `/images/no-team-icon.jpg`

    const handleAddBet = (event) => {
        status == 'open' && addToBetSlip("singles", position, betType, productGroupType, event)
    }
    const checkContext = (tip_id) => {
        return tips.singles.filter((sTip) => getBetID(sTip) === tip_id).length > 0
    }

    const checkSGMLocal = (tip_id) => {
        // let bets = localStorage.getItem("SGM") ? JSON.parse(localStorage.getItem("SGM")) : {}
        // let sgmBets = (bets && bets[eventid]) ? bets[eventid] : []
        let tipselected = betsLocal.filter((sTip) => getBetID(sTip) === tip_id).length > 0 ? true : false;
        return tipselected
    }

    function checkTipSelected() {
        let tipselected = false
        let tip_id = tipId + "_" + betType.toLowerCase() + "_fixed"
        tipselected = view == "all" ? checkContext(tip_id) : (betsLocal && checkSGMLocal(tip_id))
        return tipselected
    }

    const getBgColor = () => {
        let bg_color = featured ? "white.main" : "grey.tipBtn"
        if (status != 'open') {
            bg_color = "grey.disabledTip"
        } else {
            if (checkTipSelected()) {
                bg_color = "primary.main"
            } else {
                bg_color = colorRef.current
            }
        }
        return bg_color
    }

    //gradient color code
    let getTeam = SportTeams.BOOKIETEAMS ? SportTeams.BOOKIETEAMS.filter((team) => teamcode != "" && team.TEAMCODE == teamcode) : null
    let colorcode = teamcode ? (getTeam && getTeam.length > 0) ? "#" + getTeam[0].COLORCODE : null : null
    let gradientColor = featured ? "#fff" : "#eeeeee"

    return (
        <Box>
            <Stack
                direction='row'
                alignItems="center"
                sx={{
                    backgroundColor: getBgColor(),
                    borderRadius: 2,
                    width: "100%",
                    boxShadow: "0px 2px 0px 0px #DDDDDD",
                    px: 1,
                    height: 40,
                    backgroundImage: (status != 'open' || checkTipSelected()) ? "none" : shadow ? `linear-gradient( ${position == 0 ? "-" : "+"}90deg,${gradientColor}  50%, ${colorcode} 90%)` : 'none',
                    backgroundRepeat: "no-repeat",
                    border: (status != 'open' || checkTipSelected()) ? 1 : 0,
                    borderColor: (status != 'open') ? "#f5f5f5" : "transparent",
                    cursor: "pointer"
                }}
                onClick={handleAddBet}>
                {
                    logo ?
                        <React.Fragment>
                            <Box
                                sx={{
                                    width: position == 0 ? "30%" : "70%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: position == 0 ? "flex-start" : "center"
                                }}>
                                {
                                    position == 0 ?
                                        (teamcode != "" && logo && getTeamLogo(team, imgSrc, setImgSrc, fallbackSrc, line))
                                        :
                                        getTeamDetails(team, odds, line, status, showOnlyOdds)
                                }
                            </Box>
                            <Box
                                className="HideTextOverflow"
                                sx={{
                                    width: position == 0 ? "70%" : "30%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: position == 0 ? "center" : "flex-end"
                                }}>
                                {
                                    position == 0 ?
                                        getTeamDetails(team, odds, line, status, showOnlyOdds)
                                        :
                                        (teamcode != "" && logo && getTeamLogo(team, imgSrc, setImgSrc, fallbackSrc, line))
                                }
                            </Box>
                        </React.Fragment>
                        :
                        <Box
                            className="HideTextOverflow"
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            {getTeamDetails(team, odds, line, status, showOnlyOdds)}
                        </Box>
                }
            </Stack>
        </Box>
    );
}

export default SportsOdds;