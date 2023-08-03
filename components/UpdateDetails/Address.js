import { useEffect, useState } from "react";

// MUI imports
import { Grid, Box, Typography, TextField, InputAdornment, Select, MenuItem, Button, Switch } from "@mui/material";

// fields imports
import { STREET_TYPE, STATE, VALIDATE, SUBMIT_FORM } from "../utils/register.util";

// list of country names
import * as countryList from "country-list";

// Component import
import SaveBtn from "./SaveBtn";

import authAPI from "../utils/authAPI";
import { isInteger } from "formik";

function Address(props) {
	const [loading, setLoading] = useState(false);
	const [aptNo, setAptNo] = useState("");
	const [stNo, setStNo] = useState("");
	const [stName, setStName] = useState("");
	const [stType, setStType] = useState(0);
	const [suburb, setSuburb] = useState("");
	const [state, setState] = useState(0);
	const [postCode, setPostCode] = useState("");
	const [country, setCountry] = useState(0);

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [changeColor, setChangeColor] = useState({ backgroundColor: "grey.primary", color: "grey.main" });

	// List of countries
	const COUNTRIES = countryList.getNames();

	useEffect(() => {
		if (props.aptNo) setAptNo(props.aptNo);
		if (props.stNo) setStNo(props.stNo);
		if (props.stName) setStName(props.stName);
		if (props.stType) {
			setStType(STREET_TYPE.indexOf(props.stType) + 1);
		}
		if (props.suburb) setSuburb(props.suburb);
		if (props.state) {
			setState(STATE.indexOf(props.state) + 1);
		}
		if (props.postCode) setPostCode(props.postCode);
		if (props.country) {
			const codeCountry = countryList.getCodeList()[props.country.toLowerCase()];
			setCountry(COUNTRIES.indexOf(codeCountry));
		}
	}, [props.aptNo, props.stNo, props.stName, props.stType, props.suburb, props.state, props.postCode, props.country]);

	function validateAddress() {
		const isInteger = /^\d+$/;
		const isValidWordHyphen = /^[a-zA-Z0-9\s-]*$/;
		if (country === 0) {
			setError(true);
			setErrorMessage("Country is required.");
			return false;
		} else if (state === 0) {
			setError(true);
			setErrorMessage("State is required.");
			return false;
		} else if (country === 12 && !postCode) {
			setError(true);
			setErrorMessage("Postcode is required.");
			return false;
		} else if (state && state !== 9 && postCode.length < 4) {
			setErrorMessage("Invalid postcode");
			setError(true);
			return false;
		} else if (!isInteger.test(postCode)) {
			setError(true);
			setErrorMessage("Invalid postcode");
			return false;
		} else if (suburb !== "" && !isValidWordHyphen.test(suburb)) {
			setError(true);
			setErrorMessage("Suburb invalid. No punctuation or numeric characters.");
			return false;
		}

		return true;
	}

	async function updateAddress() {
		const url = `${process.env.server}/user/update`;
		if (props.userID === null) {
			return;
		}
		if (!validateAddress()) {
			return;
		} else {
			setLoading(true);
			setErrorMessage("");
			setError(false);
			const body = {
				userid: props.userID,
				aptNo,
				stNo,
				stName,
				stType: stType === 0 ? "" : STREET_TYPE[stType - 1],
				suburb,
				state: STATE[state - 1],
				postCode,
				country: countryList.getCode(COUNTRIES[country]),
			};

			const response = await authAPI(url, body, "POST", true);
			setChangeColor({ backgroundColor: "grey.primary", color: "grey.main" });
			setTimeout(function disableLoading() {
				setLoading(false);
			}, 2000);
			console.log(response);
		}
	}

	// font size from props
	const fontLabel = props.fontLabel;
	return (
		<div>
			<Box sx={{ mt: 4, backgroundColor: "grey.primary", mx: 0, py: 1 }}>
				<Typography sx={{ mx: 2, mt: 4, fontWeight: "bold", fontSize: fontLabel + 2 }}>Address</Typography>
			</Box>
			<Box sx={{ mx: 2 }}>
				{true ? (
					<>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Typography
									sx={{
										mb: 1,
										mt: 1,

										fontSize: fontLabel,
									}}
									component="p"
								>
									Appartment No
								</Typography>

								<TextField
									classes={{ root: props.customTextField }}
									size="small"
									value={aptNo ? aptNo : ""}
									onChange={(e) => {
										setChangeColor({ backgroundColor: "primary", color: "white" });
										setAptNo(e.target.value);
									}}
									id="aptNo"
									name="aptNo"
									fullWidth
									sx={{ backgroundColor: "text.active" }}
									placeholder="Enter appartment no"
								/>
							</Grid>
							<Grid item xs={6}>
								<Typography
									sx={{
										mb: 1,
										mt: 1,

										fontSize: fontLabel,
									}}
									component="p"
								>
									Street No <span style={{ color: "purple" }}>*</span>
								</Typography>

								<TextField
									classes={{ root: props.customTextField }}
									size="small"
									value={stNo ? stNo : ""}
									onChange={(e) => {
										setChangeColor({ backgroundColor: "primary", color: "white" });
										setStNo(e.target.value);
									}}
									id="stNo"
									name="stNo"
									fullWidth
									sx={{ backgroundColor: "text.active" }}
									placeholder="Enter street number"
								/>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item xs={8}>
								<Typography
									sx={{
										mb: 1,
										mt: 1,

										fontSize: fontLabel,
									}}
									component="p"
								>
									Street Name
								</Typography>

								<TextField
									classes={{ root: props.customTextField }}
									value={stName ? stName : ""}
									onChange={(e) => {
										setChangeColor({ backgroundColor: "primary", color: "white" });
										setStName(e.target.value);
									}}
									size="small"
									id="stName"
									name="stName"
									fullWidth
									sx={{ backgroundColor: "text.active" }}
									placeholder="Enter street name"
								/>
							</Grid>
							<Grid item xs={4}>
								<Typography
									sx={{
										mb: 1,
										mt: 1,

										fontSize: fontLabel,
									}}
									component="p"
								>
									Street Type
								</Typography>

								<Select
									value={stType ? stType : 0}
									onChange={(e) => {
										setChangeColor({ backgroundColor: "primary", color: "white" });
										setStType(e.target.value);
									}}
									size="small"
									id="stType"
									name="stType"
									sx={{ backgroundColor: "text.active" }}
									fullWidth
									MenuProps={{
										transitionDuration: 0,
										PaperProps: {
											style: {
												maxHeight: '40vh',
											},
										},
									}}
								>
									<MenuItem value={0}>Select</MenuItem>
									{STREET_TYPE.map((item, idx) => (
										<MenuItem key={`${item}-${idx}`} value={idx + 1}>
											{item}
										</MenuItem>
									))}
								</Select>
							</Grid>
						</Grid>

						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography
									sx={{
										mb: 1,
										mt: 1,

										fontSize: fontLabel,
									}}
									component="p"
								>
									Suburb
								</Typography>

								<TextField
									classes={{ root: props.customTextField }}
									size="small"
									value={suburb ? suburb : ""}
									onChange={(e) => {
										setChangeColor({ backgroundColor: "primary", color: "white" });
										setSuburb(e.target.value);
									}}
									id="locality"
									name="locality"
									fullWidth
									sx={{ backgroundColor: "text.active" }}
									placeholder="Enter suburb name"
								/>
							</Grid>
						</Grid>
					</>
				) : null}
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography
							sx={{
								mb: 1,
								mt: 1,

								fontSize: fontLabel,
							}}
							component="p"
						>
							State
						</Typography>

						<Select
							value={state ? state : 0}
							onChange={(e) => {
								setChangeColor({ backgroundColor: "primary", color: "white" });
								setState(e.target.value);
							}}
							size="small"
							id="state"
							name="state"
							sx={{ backgroundColor: "text.active" }}
							fullWidth
							MenuProps={{
								transitionDuration: 0,
								PaperProps: {
									style: {
										maxHeight: '40vh',
									},
								},
							}}
						>
							<MenuItem value={0}>Select</MenuItem>
							{STATE.map((item, idx) => (
								<MenuItem key={`${item}-${idx}`} value={idx + 1}>
									{item}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={6}>
						<Typography
							sx={{
								mb: 1,
								mt: 1,

								fontSize: fontLabel,
							}}
							component="p"
						>
							Postcode
						</Typography>

						<TextField
							classes={{ root: props.customTextField }}
							value={postCode ? postCode : 0}
							onChange={(e) => {
								setChangeColor({ backgroundColor: "primary", color: "white" });
								setPostCode(value);
							}}
							size="small"
							id="postCode"
							name="postCode"
							fullWidth
							sx={{ backgroundColor: "text.active" }}
							placeholder="Enter postcode"
						/>
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography
							sx={{
								mb: 1,
								mt: 1,

								fontSize: fontLabel,
							}}
							component="p"
						>
							Country
						</Typography>

						<Select
							value={country ? country : 0}
							onChange={(e) => {
								setChangeColor({ backgroundColor: "primary", color: "white" });
								setCountry(e.target.value);
								if (e.target.value !== 12) {
									setState(STATE.length);
								}
							}}
							size="small"
							id="country"
							name="country"
							sx={{ backgroundColor: "text.active" }}
							fullWidth
							MenuProps={{
								transitionDuration: 0,
								PaperProps: {
									style: {
										maxHeight: '40vh',
									},
								},
							}}
						>
							<MenuItem value={0}>Select</MenuItem>
							{COUNTRIES.map((item, idx) => (
								<MenuItem key={`C-${idx}`} value={idx}>
									{item}
								</MenuItem>
							))}
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
						<SaveBtn loading={loading} onClick={updateAddress} bg={changeColor}>
							Save
						</SaveBtn>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default Address;
