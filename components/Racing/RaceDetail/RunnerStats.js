import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

const font = {
	secHeading: 13,
	smallHeading: 11,
};

function Details(props) {
	return (
		<Box width="100%">
			<Box display="flex">
				<Box sx={{ bgcolor: "grey.dividends", width: "50%", mr: 0.2, mt: 0.2, p: 0.5 }}>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Typography fontSize={font.secHeading} color={props.colorLeft ? props.colorLeft : "grey.light"} pl={1}>
							{props.keyLeft}
						</Typography>
						<Typography fontSize={font.secHeading} color="text.active" fontWeight="bold" pr={1}>
							{props.valueLeft}
						</Typography>
					</div>
					{props.secondValLeft ? (
						<Box textAlign="end">
							<Typography fontSize={font.secHeading} color="text.active" fontWeight="bold" pr={1}>
								{props.secondValLeft}
							</Typography>
						</Box>
					) : null}
				</Box>
				<Box sx={{ bgcolor: "grey.dividends", width: "50%", mt: 0.2, p: 0.5 }}>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Typography fontSize={font.secHeading} color={props.colorRight ? props.colorRight : "grey.light"} pl={1}>
							{props.keyRight}
						</Typography>
						<Typography fontSize={font.secHeading} color="text.active" fontWeight="bold" pr={1} >
							{props.valueRight}
						</Typography>
					</div>
					{props.secondValRight ? (
						<Box textAlign="end">
							<Typography fontSize={font.secHeading} color="text.active" fontWeight="bold" pr={1}>
								{props.secondValRight}
							</Typography>
						</Box>
					) : null}
				</Box>
			</Box>
		</Box>
	);
}



export default function RunnerStats({ formGuide }) {
	const vals = formGuide.career;
	let wPer;
	let pPer;
	if (vals && vals !== "") {
		try {
			let fSplit = vals.split(":");
			let total = fSplit[0];
			let winPlace = fSplit[1].trim().split(" ");
			let win = winPlace[0];
			let place = +winPlace[2] + +winPlace[1] + +winPlace[0];

			wPer = isNaN(((win / total) * 100).toFixed(0)) ? "N/A" : `${((win / total) * 100).toFixed(0)}%`;
			pPer = isNaN(((place / total) * 100).toFixed(0)) ? "N/A" : `${((place / total) * 100).toFixed(0)}%`;
		} catch (e) {
			console.log(e);
		}
	}
	const isDesktop = useMediaQuery('(min-width:900px)');
	let trnstat = formGuide.trainerstats ? formGuide.trainerstats : null
	if (trnstat) {
		let sumPlc = 0
		let sumW = 0
		let arr = trnstat.split(":")
		if (arr.length >= 2) {
			let val = arr[1].trim().split(" ")
			sumW = isNaN(((val[0] / +arr[0]) * 100).toFixed(0)) ? "N/A" : `${((val[0] / +arr[0]) * 100).toFixed(0)}%`;
			sumPlc = val.reduce((sum, num) => sum + +num, 0)
			sumPlc = isNaN(((sumPlc / +arr[0]) * 100).toFixed(0)) ? "N/A" : `${((sumPlc / +arr[0]) * 100).toFixed(0)}%`;
			trnstat = sumW + " W " + sumPlc + " P"
		}
	}
	let Jstat = formGuide.jockeystats ? formGuide.jockeystats : null
	if (Jstat) {
		let sumPlc = 0
		let sumW = 0
		let arr = Jstat.split(":")
		if (arr.length >= 2) {
			let val = arr[1].trim().split(" ")
			sumW = isNaN(((val[0] / +arr[0]) * 100).toFixed(0)) ? "N/A" : `${((val[0] / +arr[0]) * 100).toFixed(0)}%`;
			sumPlc = val.reduce((sum, num) => sum + +num, 0)
			sumPlc = isNaN(((sumPlc / +arr[0]) * 100).toFixed(0)) ? "N/A" : `${((sumPlc / +arr[0]) * 100).toFixed(0)}%`;
			Jstat = sumW + " W " + sumPlc + " P"
		}
	}
	return (
		<Box mt={2}>
			<Details keyLeft="Career:" keyRight="Track/Distance:"
				valueLeft={formGuide.career || "N/A"}
				valueRight={formGuide.careertrackdist || "N/A"} />
			<Details
				keyLeft="Distance:"
				keyRight="Track:"
				valueLeft={formGuide.careerdistance || "N/A"}
				valueRight={formGuide.careertrack || "N/A"}
			/>
			<Details keyLeft="First Up:" keyRight="Second Up:" valueLeft={formGuide.firstup || "N/A"} valueRight={formGuide.secondup || "N/A"} />
			<Details keyLeft="Third Up:" keyRight="Fourth Up:" valueLeft={formGuide.thirdup || "N/A"} valueRight={formGuide.fourthup || "N/A"} />
			<Details keyLeft="Wins:" keyRight="Places:" valueLeft={wPer || "N/A"} valueRight={pPer || "N/A"} />
			<Box mt={2} />
			<Details
				keyLeft="Trainer:"
				keyRight="Jockey:"
				valueLeft={trnstat || "N/A"}
				valueRight={Jstat || "N/A"}
			/>
			<Details
				keyLeft="Jockey & Horse:"
				keyRight="WFA:"
				valueLeft={formGuide.careerhorsejockey || "N/A"}
				valueRight={formGuide.careerwfa || "N/A"}
			/>
			<Details
				keyLeft="Group 1:"
				keyRight="Group 2:"
				valueLeft={formGuide.careergroup1 || "N/A"}
				valueRight={formGuide.careergroup2 || "N/A"}
			/>
			<Details
				keyLeft="Group 3:"
				keyRight="Night:"
				valueLeft={formGuide.careergroup3 || "N/A"}
				valueRight={formGuide.careernight || "N/A"}
			/>
			<Box mt={2} />
			<Details
				keyLeft="Firm:"
				keyRight="Heavy:"
				colorRight="red"
				valueLeft={formGuide.careerfirm || "N/A"}
				valueRight={formGuide.careerheavy}
			/>
			<Details
				keyLeft="Good:"
				keyRight="Wet:"
				colorLeft="#54b13f"
				valueLeft={formGuide.careergood || "N/A"}
				valueRight={formGuide.careerwet || "N/A"}
			/>
			<Details
				keyLeft="Soft:"
				keyRight="Synthetic:"
				colorLeft="#dc6e20"
				colorRight="#906ee2"
				valueLeft={formGuide.careersoft || "N/A"}
				valueRight={formGuide.careersynth || "N/A"}
			/>
			{
				isDesktop ?
					<Details
						keyLeft="Wet (Sire):"
						keyRight="Wet (DamSire):"
						valueLeft={formGuide.sireonwet.replace(/\(/g, "").replace(/\)/g, "") || "N/A"}
						valueRight={formGuide.damsireonwet.replace(/\(/g, "").replace(/\)/g, "") || "N/A"}
					/> :
					<React.Fragment>
						<Box width="100%">
							<Box sx={{ bgcolor: "grey.dividends", mt: 0.22, py: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<Typography fontSize={font.secHeading} color={"grey.light"} pl={1}>
									Wet (Sire):{" "}
								</Typography>
								<Typography fontSize={font.secHeading} color="text.active" fontWeight="bold" pr={1} >
									{formGuide.sireonwet.replace(/\(/g, "").replace(/\)/g, "") || "N/A"}
								</Typography>
							</Box>
						</Box>
						<Box width="100%">
							<Box sx={{ bgcolor: "grey.dividends", mt: 0.22, py: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<Typography fontSize={font.secHeading} color={"grey.light"} pl={1}>
									Wet (DamSire):{" "}
								</Typography>
								<Typography fontSize={font.secHeading} color="text.active" fontWeight="bold" pr={1} >
									{formGuide.damsireonwet.replace(/\(/g, "").replace(/\)/g, "") || "N/A"}
								</Typography>
							</Box>
						</Box>
					</React.Fragment>
			}
		</Box>
	);
}
