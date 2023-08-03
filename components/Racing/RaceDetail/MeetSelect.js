import { FormControl, MenuItem, Select, Box, Typography, SvgIcon, Tooltip, Divider, Icon } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import PartlyCloudy from "../../../public/images/svg/partly-cloudy.svg";
import PossibleShowers from "../../../public/images/svg/possible-showers.svg";
import Rain from "../../../public/images/svg/rain.svg";
import Sunny from "../../../public/images/svg/sunny.svg";
import Cloudy from "../../../public/images/svg/cloudy.svg";
import Thunderstorms from "../../../public/images/svg/thunderstorms.svg";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import authAPI from "@Components/utils/authAPI";
import moment from "moment";

function MeetSelect(props) {
	const { raceLocations, raceName } = props;
	const [loc, setLoc] = useState(raceName);
	const router = useRouter();

	let racetype = {
		R: true,
		G: true,
		H: true,
		count: 3,
	}
	let racemeet = {
		AU: true,
		INT: true,
		count: 2,
	}
	useEffect(() => {
		loc != raceName && setLoc(raceName)
	}, [raceName])

	async function getNextRaceDetails(locDetails) {
		let body = {
			racetype: JSON.stringify(racetype),
			startdate: locDetails.racedate,
			enddate: locDetails.racedate,
			track: locDetails.locid,
			jsonresp: '1',
			country: JSON.stringify(racemeet),
			nexttojump: '0'
		};
		const url = `${process.env.server}/races/getRaceMeetings`;

		const response = await authAPI(url, body, 'POST', false);
		if (!response.error) {
			if (response.data.ERROBJ.ERRORCODE == 0) {
				let data = JSON.parse(response.data[locDetails.racetype])
				props.reset();
				const href = `/${locDetails.getRaceType()}/${locDetails.racemeet}/${data[0].NEXTRACEID}`;
				router.push(href);
			}
		}
	}

	function changeLocation(e) {
		setLoc(e.target.value);
		const locDetails = raceLocations.filter((l) => l.racemeet === e.target.value);

		if (locDetails && locDetails.length) {
			getNextRaceDetails(locDetails[0])
			// const href = `/${locDetails[0].getRaceType()}/${locDetails[0].racemeet}/${locDetails[0].nextrace}`;
			// router.push(href);
		} else {
			console.log("Error handling here");
		}
	}

	function getUpperCaseName(name) {
		name = name[0].toUpperCase() + name.slice(1, name.length);
		return name;
	}

	const WeatherIcon = React.forwardRef(function WeatherIcon(props, ref) {
		let weather = props.weather;
		let weather_icon = "";
		let view_box = "0 0 380 380";
		if (weather == "Overcast") {
			weather_icon = PartlyCloudy;
			view_box = "0 0 459.75 420";
		} else if (weather == "Cloudy") {
			weather_icon = Cloudy;
			view_box = "0 0 380 229.65";
		} else if (weather == "Fine") {
			weather_icon = Sunny;
		} else if (weather == "Hot") {
			weather_icon = Sunny;
		} else if (weather == "Showery") {
			weather_icon = Rain;
			view_box = "0 0 380 336.4";
		} else if (weather == "Raining") {
			weather_icon = Thunderstorms;
			view_box = "0 0 380 336.4";
		} else if (weather == "Drizzling") {
			weather_icon = PossibleShowers;
			view_box = "0 0 414.75 471.92";
		}
		return (
			<div {...props} ref={ref} >
				<SvgIcon color="grey.light" component={weather_icon} viewBox={view_box} mt={1} fontSize="small"></SvgIcon>
			</div>
		);
	});
	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between", mx: 2, mb: 0, alignItems: "center" }}>
				<Box>
					<FormControl
						fullWidth
						variant="outlined"
						sx={{
							".MuiSelect-icon": {
								color: "black.main",
								fontSize: 20
							},
							".MuiOutlinedInput-notchedOutline": {
								border: 0,
							},
							".MuiSelect-select": {
								pt: 1.5,
								pb: 1.5,
								px: 0,
							},
							"& .Mui-focused .MuiOutlinedInput-notchedOutline": {
								border: "none",
								borderRadius: "5px 5px 0 0",
							},
						}}>
						<Select value={loc} onChange={(e) => changeLocation(e)}
							className="textCapitalize "
							MenuProps={{
								transitionDuration: 0,
								PaperProps: {
									style: {
										minWidth: "35vh"
									}
								}
							}}
							IconComponent={KeyboardArrowDownIcon}>
							{raceLocations.map((lc) => (
								<MenuItem key={lc.nextrace} value={lc.racemeet} disabled={lc.abandoned != 1 ? false : true}>
									<Typography sx={{ fontSize: 14, fontWeight: lc.racemeet === loc ? "bold" : "regular" }} className="textCapitalize">
										{getUpperCaseName(lc.racemeet)}
									</Typography>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box
					mt={1}
					sx={{
						display: "flex",
						flexWrap: "nowrap",
						alignItems: "center",
					}}
				>
					{props.weather != "" && (
						<Tooltip enterTouchDelay={0} title={props.weather} arrow placement="left-start">
							<WeatherIcon weather={props.weather} />
						</Tooltip>
					)}
					<Typography variant="subtitle2" component="div" ml={1} mb={0.5}>
						{props.trackcondition}
					</Typography>
				</Box>
			</Box>
			<Box mx={2}>
				<Divider sx={{ borderColor: "#d0d1d2", boxShadow: "0 1px #fff" }} />
			</Box>
		</>
	);
}

export default MeetSelect;
