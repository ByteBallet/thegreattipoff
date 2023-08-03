import React, { useContext, useState } from "react";
import { Box, Tab, Tabs, Typography, CircularProgress, Divider } from "@mui/material";

import authAPI from "../../utils/authAPI";

// Tab Components
import RunnerStats from "./RunnerStats";
import RunnerComments from "./RunnerComments";
import RunnerForm from "./RunnerForm";
import ErrorIcon from "@mui/icons-material/Error";
import NumberFormat from "react-number-format";
import { UserContext } from "@Context/User/UserProvider";
import BoxDivider from "@Components/Shared/BoxDivider";
import BlackBookButton from "../BlackBookButton";
import { BoxDivider2 } from "@Components/Payments/Layout/UserDepositLayout";
import { isClientGTO } from "@Components/utils/util";

const font = {
	secHeading: 13,
};

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && (
				<Box>
					<Typography color="text.active">{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function StatHeading({ sire, dam, horsefd, horsecolour, sex, age, stabled, epm, damsire, last15 }) {
	return (
		<Box width="100%" my={2}>
			<Box display="flex">
				<Box width="50%" lineHeight={1}>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light">
							Colour:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{horsecolour}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light">
							Age:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{age ? age + " yo" : ""}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light">
							Type:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{sex}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light">
							Stabled:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{stabled}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light">
							Prize Money:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{epm && epm != "N/A" ? <NumberFormat
								thousandSeparator={true}
								value={epm}
								displayType="text"
								prefix="$"
							/> : "N/A"}
						</Typography>
					</div>
				</Box>
				<Box width="50%" lineHeight={1}>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light">
							Foaled:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{horsefd}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light" >
							Sire:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{sire}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light" >
							Dam:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{dam}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light" >
							DamSire:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{damsire}
						</Typography>
					</div>
					<div>
						<Typography fontSize={font.secHeading} color="grey.light" >
							Last 15:{" "}
						</Typography>
						<Typography fontSize={font.secHeading} fontWeight="bold" color="text.active">
							{last15}
						</Typography>
					</div>
				</Box>
			</Box>
		</Box>
	);
}

export default function StatComponent(props) {
	const isGTO = isClientGTO()
	const { user } = useContext(UserContext);
	const [value, setValue] = React.useState(0);
	const [loading, setLoading] = React.useState(true);
	const [err, setErr] = React.useState(false);

	const [formGuide, setFormGuide] = useState(null);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	async function getStats() {
		const url = `${process.env.server}/races/getBookieRaceForm`;
		const response = await authAPI(url, { userid: user?.userID, eventid: props.raceid, fieldnum: props.fieldnum, actualcode: props.actualcode }, "POST", false);

		setLoading(false);
		if (response.error) {
			setErr(true);
		} else {
			if (response.data.ERROBJ.ERRORCODE > 0) {
				setErr(true);
			} else {
				if (err) setErr(false);
				if (response.data.RACEFORM) {
					setFormGuide(response.data.RACEFORM);
				}
			}
		}
	}

	React.useEffect(() => {
		getStats();
		// const t = setTimeout(() => {
		// 	setLoading(false);
		// }, 3000);

		// return () => clearTimeout(t);
	}, []);

	if (err)
		return (
			<Box
				sx={{
					width: "100%",
					height: 75,
					backgroundColor: "text.default",
					color: "grey.light",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 12,
				}}>
				<ErrorIcon fontSize="small" color="grey.light" />
				<Box ml={1}>Form Guide not available.</Box>
			</Box>
		);
	return (
		<Box sx={{ width: "100%", backgroundColor: "background.legs", color: "text.active" }} className="NoSwipe">
			{loading || formGuide == null ? (
				<Box display="flex" justifyContent="center" pt={4} height={150}>
					<CircularProgress color="white" />
				</Box>
			) : (
				<Box p={2}>
					<RunnerComments comment={formGuide.comment || "Comments unavailable at this time."} />

					<StatHeading
						sex={formGuide.sex || ""}
						sire={formGuide.rbrs || "N/A"}
						dam={formGuide.rbrd || "N/A"}
						horsefd={formGuide.horsefd || "N/A"}
						horsecolour={formGuide.horsecolour || ""}
						age={formGuide.age || ""}
						stabled={formGuide.rstbl || "N/A"}
						epm={formGuide.rearn || "N/A"}
						damsire={formGuide.damsire || "N/A"}
						last15={formGuide.rlsix || "N/A"}
					/>

					<Box>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="Shows Form Guide"
							className="statsTabs">
							<Tab
								label="Stats"
								{...a11yProps(0)}
								sx={{
									width: "50%",
									backgroundColor: "transparent",
									borderBottom: 1,
									borderColor: 'grey.light',
									color: "grey.light",
									'&.Mui-selected': {
										backgroundColor: "transparent",
										color: "white.main",
										fontWeight: "bold"
									}
								}}
							/>
							<Tab
								label="Form"
								{...a11yProps(0)}
								sx={{
									width: "50%",
									backgroundColor: "transparent",
									color: "grey.light",
									borderBottom: 1,
									borderColor: 'grey.light',
									'&.Mui-selected': {
										backgroundColor: "transparent",
										color: "white.main",
										fontWeight: "bold"
									}
								}}
							/>
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<RunnerStats formGuide={formGuide} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<RunnerForm pr={formGuide.previousrun} />
					</TabPanel>
					<Box mt={3}>
						<Divider sx={{ borderColor: "grey.dividends" }} />
					</Box>
					<Box my={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
						<BlackBookButton
							follow={formGuide?.following}
							runner={formGuide?.rn}
							actualcode={props?.actualcode}
							rtype={props?.racetype}
							btnTheme={"dark"} />
					</Box>
				</Box>
			)}
		</Box>
	);
}