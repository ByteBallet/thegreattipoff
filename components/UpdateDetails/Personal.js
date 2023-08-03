import { useEffect, useState } from "react";
// MUI component imports
import { Grid, Box, Typography, TextField, Select, MenuItem } from "@mui/material";

// save button details
import SaveBtn from "./SaveBtn";

import authAPI from "../utils/authAPI";

// Date library
import moment from "moment";

function Personal(props) {
	// persoanl details
	const [firstName, setFirstName] = useState(null);
	const [surName, setSurName] = useState(null);
	const [date, setDate] = useState(null);
	const [month, setMonth] = useState(null);
	const [year, setYear] = useState(null);

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [changeColor, setChangeColor] = useState({ backgroundColor: "grey.primary", color: "grey.main" });

	// state variables
	const [loading, setLoading] = useState(false);
	// returns the list of months in short form eg Jan
	const MONTHS = moment.monthsShort();
	const monthsLong = moment.months();

	// returns the current year
	const CURRENT_YEAR = moment().year() - 18;

	// generate an array of years, starting from current year - 18 to last 100 years
	let YEARS = [...Array(100).keys()];
	for (let i = 0; i < YEARS.length; i++) {
		YEARS[i] = CURRENT_YEAR - i;
	}

	const fontLabel = props.fontLabel;

	function validateFields() {
		const validWord = /^[a-zA-Z\s]*$/;
		const checkPunctuation = /^[a-zA-Z0-9\s]*$/;
		const checkSpaces = /\s/g;
		// validation checks for firstName
		if (!firstName) {
			setError(true);
			setErrorMessage("Please enter your firstname");
			return false;
		} else if (firstName.length < 3) {
			setError(true);
			setErrorMessage("Please enter your firstname. At least 3 characters");
			return false;
		} else if (!validWord.test(firstName)) {
			setError(true);
			setErrorMessage("Firstname invalid. No punctuation or numeric characters.");
			return false;
		} else if (!checkPunctuation.test(firstName)) {
			setError(true);
			setErrorMessage("Firstname invalid. No punctuation characters.");
			return false;
		} else if (checkSpaces.test(firstName)) {
			setError(true);
			setErrorMessage("Firstname cannot contain spaces");
			return false;
		}

		// validation checks for surname
		if (!surName) {
			setError(true);
			setErrorMessage("Please enter your surname");
			return false;
		} else if (surName.length < 3) {
			setError(true);
			setErrorMessage("Please enter your surname. At least 3 characters");
			return false;
		} else if (!validWord.test(surName)) {
			setError(true);
			setErrorMessage("Surname invalid. No punctuation or numeric characters.");
			return false;
		} else if (!checkPunctuation.test(surName)) {
			setError(true);
			setErrorMessage("Surname invalid. No punctuation characters.");
			return false;
		} else if (checkSpaces.test(surName)) {
			setError(true);
			setErrorMessage("Surname cannot contain spaces");
			return false;
		}

		if (date === 0 || month === 0 || year === 0) {
			setError(true);
			setErrorMessage("Date is required");
			return false;
		}

		return true;
	}

	useEffect(() => {
		if (props.firstName) {
			setFirstName(props.firstName);
		}
		if (props.surName) setSurName(props.surName);
		if (props.dob) {
			let m = props.dob.split(",")[0].trim();
			let d = props.dob.split(", ")[1].split(" ")[0];
			let y = props.dob.split(", ")[1].split(" ")[1];

			if (m && d && y) {
				setDate(d.trim());
				setMonth(monthsLong.indexOf(m.trim()) + 1);
				setYear(YEARS.indexOf(+y.trim()) + 1);
			}
		}
	}, [props.firstName, props.surName, props.dob]);

	// function calls the API and saves the data
	async function savePersonalDetails() {
		const url = `${process.env.server}/user/update`;
		if (props.userID === null) {
			return;
		}
		if (!validateFields()) {
			return;
		} else {
			setErrorMessage("");
			setError(false);
			setLoading(true);
			let db = `${monthsLong[month - 1]}, ${date} ${YEARS[year] + 1}`;
			let dateOfBirth = new Date(YEARS[year] + 1, month - 1, date);
			const body = {
				userid: props.userID,
				firstName,
				surName,
				dob: dateOfBirth,
			};

			const response = await authAPI(url, body, "POST", true);
			setChangeColor({ backgroundColor: "grey.primary", color: "grey.main" });
			setTimeout(function disableLoading() {
				setLoading(false);
			}, 2000);
			console.log(response);
		}
	}
	return (
		<div>
			<Box sx={{ mt: 4, backgroundColor: "grey.primary", mx: 0, py: 1 }}>
				<Typography sx={{ mx: 2, mt: 4, fontWeight: "bold", fontSize: fontLabel + 2 }}>Personal</Typography>
			</Box>

			<Grid container spacing={2}>
				<Grid item xs={12} sx={{ mx: 2 }}>
					<Typography
						sx={{
							mb: 1,
							mt: 1,

							fontSize: fontLabel,
						}}
						component="p">
						First Name
					</Typography>

					<TextField
						classes={{ root: props.customTextField }}
						size="small"
						value={firstName ? firstName : ""}
						onChange={(e) => {
							setChangeColor({ backgroundColor: "primary", color: "white" });
							setFirstName(e.target.value);
						}}
						id="firstname"
						name="firstname"
						fullWidth
						sx={{ backgroundColor: "text.active" }}
						placeholder="Enter your firstname"
					/>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={12} sx={{ mx: 2 }}>
					<Typography
						sx={{
							mb: 1,
							mt: 1,

							fontSize: fontLabel,
						}}
						component="p">
						Surname
					</Typography>

					<TextField
						classes={{ root: props.customTextField }}
						value={surName ? surName : ""}
						onChange={(e) => {
							setChangeColor({ backgroundColor: "primary", color: "white" });
							setSurName(e.target.value);
						}}
						size="small"
						id="surname"
						name="surname"
						fullWidth
						sx={{ backgroundColor: "text.active" }}
					/>
				</Grid>
			</Grid>

			<Typography sx={{ mb: 1, mt: 1, fontSize: fontLabel, mx: 2 }} component="p">
				Date of Birth
			</Typography>
			<Box sx={{ mx: 2 }}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Select
							value={date ? date : 0}
							onChange={(e) => {
								setChangeColor({ backgroundColor: "primary", color: "white" });
								setDate(e.target.value);
							}}
							size="small"
							id="dateDOB"
							name="dateDOB"
							sx={{ backgroundColor: "text.active" }}
							fullWidth
							MenuProps={{
								transitionDuration: 0
							}}>
							<MenuItem value={0}>DD</MenuItem>
							{[...Array(31).keys()].map((itm, idx) => (
								<MenuItem key={`DD-${idx}`} value={itm + 1}>
									{itm + 1}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={4}>
						<Select
							value={month ? month : 0}
							onChange={(e) => {
								setChangeColor({ backgroundColor: "primary", color: "white" });
								setMonth(e.target.value);
							}}
							size="small"
							id="monthDOB"
							name="monthDOB"
							sx={{ backgroundColor: "text.active" }}
							fullWidth
							MenuProps={{
								transitionDuration: 0
							}}>
							<MenuItem value={0}>MM</MenuItem>
							{MONTHS.map((item, idx) => (
								<MenuItem key={`${item}-${idx}`} value={idx + 1}>
									{item}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={4} sx={{ me: 2 }}>
						<Select
							value={year ? year : 0}
							onChange={(e) => {
								setChangeColor({ backgroundColor: "primary", color: "white" });
								setYear(e.target.value);
							}}
							size="small"
							id="yearDOB"
							name="yearDOB"
							sx={{ backgroundColor: "text.active" }}
							fullWidth
							MenuProps={{
								transitionDuration: 0
							}}
						>
							<MenuItem value={0}>YYYY</MenuItem>
							{YEARS.map((item, idx) => {
								return (
									<MenuItem key={`${item}-${idx}`} value={idx + 1}>
										{item}
									</MenuItem>
								);
							})}
						</Select>
					</Grid>
					{error ? (
						<Grid item xs={12}>
							<Box sx={{ backgroundColor: "error.light", mt: 0, py: 1, px: 3 }}>
								<Typography sx={{ color: "error.main" }}>{errorMessage}</Typography>
							</Box>
						</Grid>
					) : null}

					<Grid item xs={12}>
						<SaveBtn loading={loading} onClick={savePersonalDetails} bg={changeColor}>
							Save
						</SaveBtn>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default Personal;
