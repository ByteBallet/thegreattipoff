import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import NumberFormat from "react-number-format";

const font = {
	heading: 11,
	content: 13,
};

function FormDetails({ pr, plc, st }) {
	return (
		<Box borderTop={1} borderColor="grey.backdrop" wisth="100%" pt={1.5} pb={2}>
			<Box lineHeight={1.25} sx={{ width: "100%" }}>
				<div>
					<Typography fontSize={font.content} color="text.active">
						{pr.rc + "," || "N/A"}{" "}
					</Typography>
					<Typography fontSize={font.content} color="grey.light">
						Finished {plc + (pr.strt ? "/" + pr.strt : "N/A")}{" "}
					</Typography>
					<Typography fontSize={font.content} color="text.active">
						{pr.mgn + "L" || "N/A"}
					</Typography>
				</div>
			</Box>
			<Box display="flex" sx={{ justifyContent: "space-between" }}>
				<Box width="50%" lineHeight={1.5} sx={{ borderRight: 1, borderColor: "grey.backdrop", pr: 1 }}>
					{/* <div>
					<Typography fontSize={font.content} color="text.active">
						Kia Ora Mdn Plate
					</Typography>
				</div> */}
					<div>
						<Typography fontSize={font.content} color="grey.light">
							Jockey:{" "}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							{pr.jdt || "N/A"}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.content} color="grey.light">
							Barrier:{" "}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							{pr.b || "N/A"}
						</Typography>
					</div>

					<div>
						<Typography fontSize={font.content} color="grey.light">
							Weight:{" "}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							{+pr.w == 0 ? "-" : pr.w + "kg" || "N/A"}
						</Typography>
					</div>

					<div>
						<Typography fontSize={font.content} color="grey.light">
							Winning Time:{" "}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							{pr.dur || "N/A"}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.content} color="grey.light">
							Flucs:{" "}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							<Typography fontSize={font.content} color="grey.light">open</Typography> {pr.po ? "$" + (+pr.po).toFixed(2) : "N/A"}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							<Typography fontSize={font.content} color="grey.light">&nbsp;|&nbsp;mid</Typography> {pr.pm ? "$" + (+pr.pm).toFixed(2) : "N/A"}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							<Typography fontSize={font.content} color="grey.light">&nbsp;|&nbsp;SP</Typography> {pr.ps ? "$" + (+pr.ps).toFixed(2) : "N/A"}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.content} color="grey.light">
							Rail:{" "}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							{pr.rpos || "N/A"}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.content} color="grey.light">
							Prize Money:{" "}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							{pr.epm && pr.epm != "N/A" ? <NumberFormat
								thousandSeparator={true}
								value={pr.epm}
								displayType="text"
								prefix="$"
							/> : "N/A"}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.content} color="grey.light">
							Running:{" "}
						</Typography>
						{pr.pos && pr.pos.length
							? pr.pos.map((it, idx) => (
								<Typography fontSize={font.content} color="text.active" key={idx}>
									<Typography fontSize={font.content} color="grey.light" className="textCapitalize">{idx != 0 && " | "}{it.Key.split("_").join(" ")}</Typography> {it.Value ? it.Value + (it.Value == 1 ? "st" : it.Value == 2 ? "nd" : it.Value == "3" ? "rd" : "th") : "N/A"}
								</Typography>
							))
							: null}
					</div>
					<div>
						<Typography fontSize={font.content} color="grey.light">
							Closing {pr.sd && pr.sd + "m"}:{" "}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							{pr.st || "N/A"}
						</Typography>
					</div>

					{/* <div>
						<Typography fontSize={font.content} color="grey.light">
							SP:{" "}
						</Typography>
						<Typography fontSize={font.content} color="text.active">
							{pr.ps ? "$" + (+pr.ps).toFixed(2) : "N/A"}
						</Typography>
					</div> */}

					{/* <div>
					<Typography fontSize={font.content} color="text.active">
						Sectional 600m: 0:45.17s
					</Typography>
				</div> */}
				</Box>
				<Box width="50%" lineHeight={1.5} sx={{ pl: 1.5 }}>
					{pr.pvpl && pr.pvpl.length
						? pr.pvpl.map((it, idx) => (
							<Box key={it.key} borderBottom={idx == 2 ? 0 : 1} pb={1} pt={idx == 0 ? 0 : 1} borderColor="grey.backdrop">
								<Typography fontSize={font.content} color="grey.light">
									{it.pos}{it.pos == 1 ? "st" : it.pos == 2 ? "nd" : it.pos == "3" ? "rd" : "th"}&nbsp;
									<Typography fontWeight="bold" fontSize={font.content} color="text.active">
										{it.rn}
									</Typography>
								</Typography>
								<div>
									<Typography fontSize={font.content} color="grey.light">W: {it.rw || "N/A"}&nbsp;|&nbsp;
									</Typography>
									<Typography fontSize={font.content} color="grey.light">Bar: {it.rb || "N/A"}&nbsp;|&nbsp;
									</Typography>
									<Typography fontSize={font.content} color="grey.light">J: {it.jdt || "N/A"}
									</Typography>
								</div>
								<br />
							</Box>
						))
						: null}

					{/* <Box borderBottom={1} py={1} borderColor="text.default">
					<Typography fontSize={font.content} color="text.active">
						1st Captain Wise 3.0L
					</Typography>
					<br />
					<Typography fontSize={font.content} color="text.active">
						Madi Derrick 57.5kg
					</Typography>
				</Box>
				<Box pt={1.25}>
					<Typography fontSize={font.content} color="text.active">
						1st Captain Wise 3.0L
					</Typography>
					<br />
					<Typography fontSize={font.content} color="text.active">
						Madi Derrick 57.5kg
					</Typography>
				</Box> */}
				</Box>
			</Box>
		</Box>
	);
}

function FormHeadings(props) {
	return (
		<>
			<Grid container sx={{ bgcolor: "grey.dividends", my: 0.5, py: 1, mx: 0, width: "100%" }} columnSpacing={0.7}  >
				<Grid item xs={1.5} className="HideTextOverflow">
					<Typography color={"text.active"} fontSize={font.heading} noWrap>
						{props.position}
					</Typography>
				</Grid>
				<Grid item xs={2} >
					<Typography color={"grey.light"} fontSize={font.heading} noWrap>
						{props.date}
					</Typography>
				</Grid>
				<Grid item xs={3} className="HideTextOverflow">
					<Typography color={"text.active"} fontSize={font.heading} noWrap={true}>
						{props.location}
					</Typography>
				</Grid>
				<Grid item xs={2} className="HideTextOverflow">
					<Typography color={"grey.light"} fontSize={font.heading} noWrap>
						{props.length}
					</Typography>
				</Grid>
				<Grid item xs={2.5} className="HideTextOverflow">
					<Typography color={props.groundColor} fontSize={font.heading} noWrap>
						{props.ground}
					</Typography>
				</Grid>
				<Grid item xs={1} container alignItems="center" >
					{props.showDetails ? (
						<KeyboardArrowUpIcon color="grey" fontSize="small" />
					) : (
						<KeyboardArrowDownIcon color="grey" fontSize="small" />
					)}
				</Grid>
			</Grid>

			{props.showDetails ? (
				<Box px={1} backgroundColor="#4D4E4F">
					<FormDetails pr={props.pr} plc={props.plc} st={props.st} showDetails={props.showDetails} />
				</Box>
			) : null}
		</>
	);
}

function getUTCDate(date) {
	let d = moment.utc(date).format("DD/MM/YY");

	return `${d}`;
}

function getColor(color) {
	let textBg = "text.active";
	if (color) {
		color = color.toLowerCase().split(" ")[0];
		switch (color) {
			case "good":
				textBg = "#54b13f";
				break;
			case "heavy":
				textBg = "#eb1b0e";
				break;
			case "soft":
				textBg = "#dc6e20";
				break;
			case "synthetic":
				textBg = "#906ee2";
				break;
			case "wet":
				textBg = "#dcdcdc";
				break;
			default:
				break;
		}
	}

	return textBg;
}
export default function RunnerForm(props) {
	const [s, setS] = useState(-1);

	function openSelected(idx) {
		setS(s == idx ? -1 : idx);
	}
	return (
		<div>
			{
				props.pr.length > 0 ?
					<React.Fragment>
						<Typography fontSize={font.heading} color="grey.light">
							Recent Starts
						</Typography>
						{props.pr.map((item, index) => (
							<Box key={index} onClick={() => openSelected(index)}>
								<FormHeadings
									position={item.plc + "/" + item.strt}
									date={getUTCDate(item.rundate)}
									location={item.mn}
									length={item.rd + "m"}
									ground={item.con}
									groundColor={getColor(item.con || null)}
									pr={item}
									plc={item.plc}
									st={item.st}
									showDetails={s === index ? true : false}
								/>
							</Box>
						))
						}
					</React.Fragment> :
					<Box py={1}><Typography color={"grey.light"} fontSize={font.content}>No race history for this horse / first starter</Typography></Box>
			}
			{/* <FormHeadings position="4/8" date="12/12/21" location="Randwick" length="1600m" ground="Soft" showDetails={false} />
			<FormHeadings position="4/8" date="12/12/21" location="Hawksbury" length="1200m" ground="Heavy" showDetails={true} />
			<FormHeadings position="4/8" date="12/12/21" location="Kembla" length="900m" ground="Good" showDetails={false} />
			<FormHeadings position="4/8" date="22/22/22" location="Warwcik Farm" length="400m" ground="Firm" showDetails={false} /> */}
		</div>
	);
}
