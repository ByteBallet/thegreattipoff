import { Typography, Badge, Box, Fade, Stack } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { getBetID, getOddsValues } from "@Components/utils/RacingUtil";
import { TipContext } from "@Context/Tip/TipProvider";

function TipOdds(props) {
    //check if odds null and populate it based on sprices obj
    let price = 0;
    let stype = "";
    let btype = "";
    let data = getOddsValues(props.raceField, props.win, props.productGroupType).split("_")
    price = parseFloat(data[0])
    stype = data[1]
    btype = data[2]

    price = price ? price > 99 ? price.toFixed(0) : price <= 1 ? 0 : price.toFixed(2) : 0;
    const [color, setColor] = useState("grey.tipBtn");
    const timer = useRef(null);
    const { tips } = useContext(TipContext);

    useEffect(() => {
        //replace betype in tipid for type="place"
        let selected = checkTipSelected()
        if (!selected) {
            if (props.change < 0) {
                setColor("#fed9d8");
            } else if (props.change > 0) {
                setColor("#e8ffd7");
            }
            else if (props.change == 0) {
                setColor("grey.tipBtn");
            }
        }
        timer.current = setTimeout(() => setColor(selected ? "primary.main" : "grey.tipBtn"), 2000);
        return () => clearTimeout(timer.current);
    }, [props.change]);

    useEffect(() => {
        let selected = checkTipSelected()
        setColor(selected ? "primary.main" : "grey.tipBtn")
    }, [tips.singles, props.productGroupType]);

    function checkTipSelected() {
        //replace betype in tipid for type="place"
        // Update productbettype in id
        let idx = props.tipId.lastIndexOf("_")
        let tip_id = props.tipId.substr(0, idx + 1) + (props.productGroupType ? props.productGroupType.toLowerCase() : "")
        tip_id = props.win ? tip_id : tip_id.replace("win", "place")
        let selected = tips.singles.filter((sTip) => getBetID(sTip) === tip_id).length > 0 ? true : false;
        return selected
    }
    const getBgColor = () => {
        let bg_color = "grey.tipBtn"
        if (props.raceResulted || props.raceStatus != 'open') {
            bg_color = "grey.disabledTip"
        } else {
            if (checkTipSelected()) {
                bg_color = "primary.main"
            } else {
                bg_color = color
            }
        }
        return bg_color
    }
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box
                className="oddsBtn"
                sx={{
                    backgroundColor: "white.main",
                    boxShadow: "none !important",
                    border: 1,
                    borderColor: (props.raceResulted || props.raceStatus != 'open') ? "#f5f5f5" : "transparent",
                    borderRadius: 2,
                    my: 1,
                    cursor: (props.raceResulted || props.raceStatus != 'open') ? "text" : "pointer"
                }}>
                <Badge
                    badgeContent={props.win && props.fav == 1 && props.productGroupType.toLowerCase() == "fixed" ? "FAV" : 0}
                    color="primary"
                    className="FavBadge textAlignCoulmnCenter">
                    {props.change > 0 &&
                        <Fade
                            in={Boolean(props.change != 0)}
                            timeout={1500}
                            unmountOnExit
                        >
                            <ArrowDropUpIcon fontSize="small" sx={{ color: "#7fc73f", position: "absolute", top: "-10px" }} />
                        </Fade>
                    }
                    {
                        price <= 1 && props.noOddsLabel ?
                            <Typography
                                fontSize={12}
                                fontWeight="600"
                                sx={{
                                    textAlign: "center",
                                    my: "auto",
                                    px: 1,
                                    lineHeight: 1
                                }}
                                color={(props.raceResulted || props.raceStatus != 'open') ? "grey.disabledTipText" : "black.main"}
                            >
                                {price <= 1 ? props.noOddsLabel ? props.noOddsLabel : "TBD" : price}
                            </Typography> :
                            <Typography
                                fontSize={14}
                                fontWeight="600"
                                sx={{
                                    textAlign: "center",
                                    my: "auto",
                                    px: 1,
                                }}
                                color={(props.raceResulted || props.raceStatus != 'open') ? "grey.disabledTipText" : "black.main"}
                            >
                                {price <= 1 ? "TBD" : price}
                            </Typography>
                    }
                    {props.change < 0 &&
                        <Fade
                            in={Boolean(props.change != 0)}
                            timeout={1500}
                            unmountOnExit
                        >
                            <ArrowDropDownIcon fontSize="small" sx={{ color: "#f85759", position: "absolute", bottom: "-10px" }} />
                        </Fade>
                    }
                </Badge>
            </Box>
        </Box >
    );
}

export default TipOdds;