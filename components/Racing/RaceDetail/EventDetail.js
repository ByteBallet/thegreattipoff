import { Box, Typography, Grid } from "@mui/material";
import { useEffect, useState, useRef, useContext } from "react";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
import { UserContext } from "../../../Context/User/UserProvider";
import RaceFieldCountdownRenderer from "../RaceFieldCountdownRenderer";
import moment from "moment";

function EventDetail(props) {
	const { user } = useContext(UserContext);
	const { eventDetails, raceTime } = props;
	const [raceDistance, setRaceDistance] = useState("");
	const [eventName, setEventName] = useState("");

	const countDownRef = useRef();
	const refIDHome = useRef();

	const mounted = useRef(false);
	const rid = useRef(0);
	const router = useRouter();

	useEffect(() => {
		mounted.current = true;
		rid.current = router.query.raceid;
		return () => {
			mounted.current = false;
			rid.current = 0;
			//clearInterval(refIDHome.current);
		};
	}, []);

	useEffect(() => {
		if (eventDetails) {
			setRaceDistance(eventDetails.racedistance);
			setEventName(eventDetails.event);
		}
	}, [eventDetails]);

	function resultsCheck() {
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
					props.setRaceStatus(raceState);
					if (
						countDownRef.current &&
						!countDownRef.current.isStopped()
					) {
						countDownRef.current.stop();
					}
				}

				if (raceState == 'final') {
					clearInterval(refIDHome.current);
				}
			})
			.catch((e) => console.log(e));

	}
	let local_date = moment.utc(raceTime).local().format();
	return (
		<Box sx={{ display: "flex", justifyContent: "space-between", mx: 2, minHeight: 30, alignItems: "center", pb: 1 }}>
			<Grid container>
				<Grid item xs={(props.raceResulted || props.raceStatus == "final") ? 8 : 9} flexWrap="nowrap" container>
					<Typography sx={{ fontWeight: "bold", fontSize: 13, mr: 0.5 }}>{raceDistance} </Typography>
					<Typography sx={{ fontSize: 13, fontWeight: 500 }} noWrap variant="h2">
						R{eventDetails.racenum}&nbsp;{eventName}
					</Typography>
				</Grid>
				<Grid item xs={(props.raceResulted || props.raceStatus == "final") ? 4 : 3} container justifyContent="flex-end">
					<Typography sx={{ fontSize: 13 }}>
						{eventDetails && raceTime && (
							<Countdown
								overtime={true}
								ref={countDownRef}
								date={new Date(local_date)}
								local_time={eventDetails.getRaceTimeUtc()}
								renderer={RaceFieldCountdownRenderer}
								status={props.raceStatus.toLowerCase()}
								onStart={() => {
									let a = moment().utc();
									if (moment.utc(eventDetails.racetimeutc).diff(a) < 0 &&
										!props.raceResulted && props.raceStatus != "final") {
										resultsCheck();
									}
								}}
								onComplete={() => {
									resultsCheck();
								}}
							/>
						)}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
}

export default EventDetail;
