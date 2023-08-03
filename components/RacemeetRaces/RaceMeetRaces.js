import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Countdown from "react-countdown";
import { Typography, Stack, Box } from "@mui/material";
import moment from "moment";
import Link from "next/Link"
import { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/User/UserProvider";
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { useRouter } from "next/router";

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
	let data = "";
	let redFlag = false;
	let iBadge = true;
	let ele = "";
	let sign = ""
	if (props.status !== 'open' && props.status !== '') {
		redFlag = true
		return (
			<Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
				<Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: "61vw" }}>
					<Avatar className={redFlag ? "redBadge" : "greyBadge"} sx={{ width: 35, height: 35 }}>
						<Typography className="tableFontsize" color={redFlag ? "error.countdown" : "text.default"}>
							R{props.raceno}
						</Typography>
					</Avatar>
					<Typography className="tableFontsize" noWrap>{props.event}</Typography>
				</Stack>
				{props.abandoned != 1 &&
					<>
						<Typography color="text.default" fontSize={13} fontWeight="bold" className='textCapitalize'>
							{props.status == "final" ? "Resulted" : props.status}
						</Typography>
					</>
				}
			</Stack>
		)
	}

	if (completed) {
		sign = '-';
	}
	if (days > 0) {
		data = <Typography color="text.default" fontSize={13}>{props.local_time}</Typography>;
		iBadge = false;
	} else if (hours > 0) {
		data = hours <= 1 && minutes < 10 ? <Typography color="text.active" fontSize={13}>{hours}h</Typography> : <Typography color="text.default" fontSize={13}>{props.local_time}</Typography>;
		iBadge = hours <= 1 && minutes < 10 ? true : false;
	} else {
		if (minutes > 0) {
			data = <Typography fontSize={13} color="text.active">{sign} {minutes}m {(minutes < process.env.countdown || sign == '-') && seconds + "s"}</Typography>;
			redFlag = (minutes <= process.env.countdown || sign == '-') ? true : false;
		} else {
			data = <Typography fontSize={13} color="text.active" >{sign} {seconds}s</Typography>;
			redFlag = true;
		}
	}
	ele = (
		<Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
			<Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: "58vw" }}>
				<Avatar className={redFlag ? "redBadge" : "greyBadge"} sx={{ width: 35, height: 35 }}>
					<Typography className="tableFontsize" color={redFlag ? "error.countdown" : "text.default"}>
						R{props.raceno}
					</Typography>
				</Avatar>
				<Typography className="tableFontsize" noWrap>{props.event}</Typography>
			</Stack>
			{props.abandoned != 1 &&
				<Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
					{
						props.isSpecial &&
						<CurrencyExchangeOutlinedIcon sx={{ color: "info.comment" }} />
					}
					{data != "" &&
						iBadge ?
						<Avatar variant="rounded" sx={{ bgcolor: redFlag ? "error.main" : "text.default", width: 60, height: 25, float: "right" }}>
							{data}
						</Avatar> :
						<Avatar variant="rounded" sx={{ bgcolor: "white.main", width: 60, height: 25, float: "right" }}>
							{data}
						</Avatar>
					}
				</Stack>
			}
		</Stack>
	);
	return ele;
};


const RaceMeetRaces = (props) => {
	const router = useRouter();
	const { user } = useContext(UserContext);
	let local_date = moment.utc(props.nextjump.RACETIMEUTC).local().format();
	let local_time = moment.utc(props.nextjump.RACETIMEUTC).local().format("HH:mm");
	const raceType = props.nextjump.RACETYPE === "R" ? "racing" : props.nextjump.RACETYPE === "G" ? "greyhound" : "harness";
	const rmeet = props.nextjump.RACEMEET
	const pagelink = `${raceType}/${rmeet.toLowerCase()}`;
	const countDownRef = useRef();
	const refIDHome = useRef();
	const [racestatus, setRaceStatus] = useState(props.result.racestatus.toLowerCase());

	const resetTimer = () => {
		clearInterval(refIDHome.current)
		setRaceStatus('')
		refIDHome.current = 0
	}

	useEffect(() => {
		return () => {
			resetTimer()
		}
	}, [props.raceid, router]);

	useEffect(() => {
		return () => {
			resetTimer()
		}
	}, []);

	function getRaceStatus() {
		const url = `${process.env.server}/selecttips/getRacePrices`;
		// TODO: To be replaced by clientid
		let body = { raceid: props.raceid, clientid: user.clientID ? user.clientID : "" };
		let options = {
			method: 'POST',
			mode: 'cors',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				XAPIGTO: process.env.APP_BRAND.toUpperCase(),
			},
			body: JSON.stringify(body),
		};
		fetch(url, options)
			.then((res) => res.json())
			.then((data) => {
				let raceState = data.raceStatus.status.toLowerCase();
				if (!raceState) return;

				if (raceState !== 'open') {
					setRaceStatus(raceState);
					if (
						countDownRef.current &&
						!countDownRef.current.isStopped()
					) {
						countDownRef.current.stop();
					}
				}

				if (raceState == 'final') {
					clearInterval(refIDHome.current);
					props.setRender(true)
				} else {
					props.setRender(false)
				}
			})
			.catch((e) => console.log(e));
	}

	function resultsCheck() {
		const newIntervalId = setInterval(() => {
			if (racestatus == 'final' || racestatus == "abandoned") return;
			getRaceStatus()
		}, 10000);

		refIDHome.current = newIntervalId;
	}
	let res = props.result.results
	return (
		<>
			{props.status == 0 && (
				<Link href={`/${pagelink}/${props.nextjump.RACEID}`}>
					<TableRow key={props.nextjump.RACEID} sx={{ cursor: "pointer" }}>
						<TableCell size="small" sx={{ px: 0 }}>
							<Countdown
								overtime={true}
								date={new Date(local_date)}
								renderer={renderer}
								local_time={local_time}
								raceno={props.nextjump.RACENUM}
								racedistance={props.nextjump.RACEDISTANCE}
								event={props.nextjump.EVENT}
								abandoned={props.nextjump.ABANDONED}
								status={racestatus}
								isSpecial={props.nextjump.ISSPECIAL > 0 && user.clientID}
								onStart={() => {
									let a = moment().utc();
									if (moment.utc(props.nextjump.RACETIMEUTC).diff(a) < 0 && racestatus != "final") {
										getRaceStatus()
										resultsCheck()
									}
								}}
								onStop={() => {
								}}
								onComplete={() => {
									resultsCheck();
								}}
							/>
						</TableCell>
						<TableCell align="right" padding="none" size="small">
							{
								props.nextjump.ABANDONED == 1 ?
									<Typography color="grey.dark" className="tableFontsize">Abandoned</Typography> :
									<KeyboardArrowRightOutlinedIcon fontSize="medium" sx={{ mt: 1 }} />
							}
						</TableCell>
					</TableRow>
				</Link>
			)}
			{props.status == 1 && (
				<Link href={`/${pagelink}/${props.nextjump.RACEID}`}>
					<TableRow key={props.nextjump.RACEID} sx={{ cursor: "pointer" }}>
						<TableCell size="small" sx={{ px: 0 }}>
							<Stack direction="row" spacing={1.5} alignItems="center" justifyContent="start" sx={{ width: "62vw" }}>
								<Avatar className="greyBadge" sx={{ width: 35, height: 35 }}>
									<Typography color="grey.dark" className="tableFontsize">
										R{props.nextjump.RACENUM}
									</Typography>
								</Avatar>
								<Typography color="grey.dark" className="tableFontsize" noWrap>{props.nextjump.EVENT}</Typography>
							</Stack>
						</TableCell>
						<TableCell align="right" padding="none" size="small">
							<Stack direction="row" alignItems="center" justifyContent="flex-end">
								{
									props.nextjump.ABANDONED == 1 ?
										<Typography color="grey.dark" className="tableFontsize" >Abandoned</Typography> :
										<Typography className="tableFontsize" noWrap>
											{res.split(",").join(", ").replace(", ,", ",")}
										</Typography>
								}
								<KeyboardArrowRightOutlinedIcon fontSize="medium" color="grey.dark" />
							</Stack>
						</TableCell>
					</TableRow>
				</Link>
			)}
		</>
	);
};

export default RaceMeetRaces;
