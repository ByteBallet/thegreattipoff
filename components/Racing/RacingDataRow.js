import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Countdown from "react-countdown";
import { Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import RacingDataRowRenderer from "./RacingDataRowRenderer";
import { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../../Context/User/UserProvider";
import { Grid, Box } from "@mui/material";

const RacingDataRow = (props) => {
	const { user } = useContext(UserContext);
	const router = useRouter();
	const onLink = (href) => {
		router.push({
			pathname: href,
		});
	};
	const rmeet = props.nextjump.RACEMEET.toLowerCase().trim();
	const pagelink =
		props.nextjump.RACETYPE == "H"
			? "/harness/" + rmeet.replace(/ /g, '_') + "-" + props.nextjump.NEXTRACEID
			: props.nextjump.RACETYPE == "G"
				? "/greyhound/" + rmeet.replace(/ /g, '_') + "-" + props.nextjump.NEXTRACEID
				: "/racing/" + rmeet.replace(/ /g, '_') + "-" + props.nextjump.NEXTRACEID;

	const nextjumprace = props.nextjump.NEXTRACENUMBER != 99 ? props.nextjump.NEXTRACENUMBER : "";
	let local_date = moment.utc(props.nextjump.NEXTRACETIMEUTC).local().format();
	let local_time = moment.utc(props.nextjump.NEXTRACETIMEUTC).local().format("HH:mm");

	const countDownRef = useRef();
	const refIDHome = useRef();
	const [status, setStatus] = useState('');

	useEffect(() => {
		return () => {
			resetTimer()
		}
	}, [props.nextjump.NEXTRACEID]);

	useEffect(() => {
		return () => {
			resetTimer()
		}
	}, []);

	const resetTimer = () => {
		clearInterval(refIDHome.current);
		setStatus('')
		refIDHome.current = 0
	}

	const updateStatus = () => {
		const url = `${process.env.server}/selecttips/getRacePrices`;
		// TODO: To be replaced by clientid
		let body = { raceid: props.nextjump.NEXTRACEID, clientid: user.clientID ? user.clientID : "" };
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
				let raceState = data?.raceStatus?.status?.toLowerCase();
				if (!raceState) return;

				if (raceState.toLowerCase() !== 'open') {
					setStatus(raceState);
					if (
						countDownRef.current &&
						!countDownRef.current.isStopped()
					) {
						countDownRef.current.stop();
					}
				}

				if (raceState.toLowerCase() == 'final') {
					clearInterval(refIDHome.current);
				}
			})
			.catch((e) => console.log(e));
	}

	function resultsCheck() {
		const newIntervalId = setInterval(() => {
			if (status == 'final' || status == "abandoned") return;
			updateStatus()
		}, 10000);
		refIDHome.current = newIntervalId;
	}
	return (
		<Box sx={{
			width: "100%",
			height: "100%",
			borderBottom: props.showborder ? 1 : 0,
			borderColor: 'grey.border1',
			mx: 2,
			display: 'flex',
			alignItems: "center",
		}}>
			<Grid container onClick={() => onLink(pagelink)} alignItems="center">
				<Grid item xs={6}>
					<Stack direction="row" alignItems="center">
						<Typography mr={0.5} fontSize={14} className="textCapitalize">
							{rmeet}
						</Typography>
						<Typography color="grey.dark" fontSize={12}>
							{props.nextjump.RACECOUNTRY == "AU" ? props.nextjump.REGION : props.nextjump.RACECOUNTRY}
						</Typography>
					</Stack>
				</Grid>
				<Grid item xs={6} justifyContent="flex-end">
					{
						props.nextjump.ABANDONED == 1 ?
							<Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
								<Typography color="grey.dark" align="right" fontSize={13}>Abandoned</Typography>
								<KeyboardArrowRightOutlinedIcon fontSize="20" sx={{ mt: 1 }} />
							</Stack> :
							<Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
								{
									(props.nextjump.NEXTRACETIMEUTC != "3000-01-01" && props.nextjump.NEXTRACENUMBER != 99) ? (
										<Countdown
											overtime={true}
											date={new Date(local_date)}
											renderer={RacingDataRowRenderer}
											local_time={local_time}
											nextjumprace={nextjumprace}
											raceno={props.nextjump.NEXTRACENUMBER}
											status={status.toLowerCase()}
											isSpecial={props.nextjump.ISSPECIAL > 0 && user.clientID}
											onStart={() => {
												let a = moment().utc();
												if (moment.utc(props.nextjump.NEXTRACETIMEUTC).diff(a) < 0 && props.nextjump.FINALEVENTSTATUS != 1) {
													updateStatus()
													resultsCheck();
												}
											}}
											onStop={() => {
												//if (flag) setFlag(false);
											}}
											onComplete={() => {
												//if (flag) setFlag(false);
												resultsCheck();
											}}
										/>
									) :
										<Typography fontSize={13}>Finished</Typography>
								}
								<KeyboardArrowRightOutlinedIcon fontSize="20" sx={{ mt: 1 }} />
							</Stack>
					}
				</Grid>
			</Grid>
		</Box>
	);
};

export default RacingDataRow;
