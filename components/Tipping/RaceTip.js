import { getOddsValues, getBetID } from "@Components/utils/RacingUtil";
import { TipContext } from "@Context/Tip/TipProvider";
import { Typography, Badge, Box, Fade, Stack } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";

export default function RaceTip(props) {
	//check if odds null and populate it based on sprices obj
	let price = 0;
	let stype = "";
	let btype = "";
	let data = getOddsValues(props.raceField, props.win, props.productGroupType).split("_")
	price = parseFloat(data[0])
	stype = data[1]
	btype = data[2]

	price = price ? price > 99 ? price.toFixed(0) : price <= 1 ? 0 : price.toFixed(2) : 0;
	const timer = useRef(null);
	const { tips } = useContext(TipContext);

	function checkTipSelected() {
		//replace betype in tipid for type="place"
		// Update productbettype in id
		let idx = props.tipId.lastIndexOf("_")
		let tip_id = props.tipId.substr(0, idx + 1) + (props.productGroupType ? props.productGroupType.toLowerCase() : "")
		tip_id = props.win ? tip_id : tip_id.replace("win", "place")
		let selected = tips.singles.filter((sTip) => getBetID(sTip) === tip_id).length > 0 ? true : false;
		return selected
	}

	const handleAddBet = (event) => {
		if (!props.raceResulted && props.raceStatus == 'open') {
			props.addTipToBetSlip("singles", props.win, price, stype, btype, props.productGroupType)
		}
	}
	const getBgColor = () => {
		let bg_color = "grey.tipBtn"
		if (props.raceResulted || props.raceStatus != 'open') {
			bg_color = "grey.disabledTip"
		} else {
			if (checkTipSelected()) {
				bg_color = "primary.main"
			}
		}
		return bg_color
	}
	return (
		<Box
			className="oddsBtn"
			sx={{
				backgroundColor: getBgColor(),
				boxShadow: "none !important",
				border: 1,
				borderColor: (props.raceResulted || props.raceStatus != 'open') ? "transparent" : "grey.dark1",
				borderRadius: 2,
				my: 1,
				cursor: (props.raceResulted || props.raceStatus != 'open') ? "text" : "pointer",
			}}
			onClick={handleAddBet}>
			<Typography
				color={(props.raceResulted || props.raceStatus != 'open') ? "grey.disabledTipText" : checkTipSelected() ? "white.main" : "black.main"}
				sx={{ fontSize: 13 }}>TIP</Typography>
		</Box>
	);
}
