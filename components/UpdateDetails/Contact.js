import { useEffect, useState } from "react";
// MUI component imports
import { Grid, Box, Typography, TextField, InputAdornment } from "@mui/material";

// Icons import
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import authAPI from "../utils/authAPI";

// save btn
import SaveBtn from "./SaveBtn";

function Contact(props) {
	const [loading, setLoading] = useState(false);

	const [email, setEmail] = useState(null);
	const [mobile, setMobile] = useState(null);

	const [changeColor, setChangeColor] = useState({ backgroundColor: "grey.primary", color: "grey.main" });

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (props.email) {
			setEmail(props.email);
		}
		if (props.mobile) {
			setMobile(props.mobile);
		}
	}, [props.email, props.mobile]);

	function validateDetails() {
		console.log("validating details");
		const isValidEmail = /^$|^.*@.*\..*$/;
		const isValidEmailAlt = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		const isInteger = /^\d+$/;
		if (email.length === 0 || !email) {
			setError(true);
			setErrorMessage("Email is required");
			return false;
		} else if (!isValidEmail.test(email) || !isValidEmailAlt.test(email)) {
			setError(true);
			setErrorMessage("Please enter a valid email");
			return false;
		}
		if (mobile.length === 0 || !mobile) {
			setError(true);
			setErrorMessage("Mobile number is required");
			return false;
		} else if (!isInteger.test(mobile)) {
			setError(true);
			setErrorMessage("Please enter a valid mobile");
			return false;
		} else if (mobile.length < 10 || mobile.length > 20) {
			setError(true);
			setErrorMessage("Please enter a valid mobile");
			return false;
		}

		return true;
	}

	async function checkEmailExistence() {
		let url = `${process.env.server}/user/checkEmail`;
		try {
			const response = await fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					XAPIGTO: process.env.APP_BRAND.toUpperCase(),
				},
				body: JSON.stringify({ email: email }),
			});

			const isEmailValid = await response.json();
			if (+isEmailValid !== 0) {
				// error, email already exists
				setError(true);
				setErrorMessage("Email address already exists. Enter a different email address.");
				return false;
			} else {
				console.log("email is valid");
				return true;
			}
		} catch (e) {
			setError(true);
			setErrorMessage("Unable to verify email - Network Error");
			return false;
		}
	}
	async function checkMobileExistence() {
		let url = `${process.env.server}/user/checkmobile`;
		try {
			const response = await fetch(url, {
				method: "POST",
				mode: "cors",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					XAPIGTO: process.env.APP_BRAND.toUpperCase(),
				},
				body: JSON.stringify({ mobile: mobile }),
			});

			const isEmailValid = await response.json();
			if (+isEmailValid !== 0) {
				// error, email already exists
				setError(true);
				setErrorMessage("Mobile address already exists. Enter a different mobile number.");
				return false;
			} else {
				console.log("Mobile is valid");
				return true;
			}
		} catch (e) {
			setError(true);
			setErrorMessage("Unable to verify mobile - Network Error");
			return false;
		}
	}

	async function saveContactDetails() {
		const url = `${process.env.server}/user/update`;
		if (props.userID === null) {
			return;
		}
		if (!validateDetails()) {
			console.log("in if");
			return;
		} else {
			const vEmail = await checkEmailExistence();
			const vMobile = await checkMobileExistence();
			if (vEmail && vMobile) {
				setError(false);
				setErrorMessage("");
				setLoading(true);
				const body = {
					userid: props.userID,
					email,
					mobile: `${mobile}`,
				};

				const response = await authAPI(url, body, "POST", true);
				setChangeColor({ backgroundColor: "grey.primary", color: "grey.main" });
				setTimeout(function disableLoading() {
					setLoading(false);
				}, 2000);
			}

			//console.log(response);
		}
	}

	const fontLabel = props.fontLabel;
	return (
		<div>
			<Box sx={{ mt: 4, backgroundColor: "grey.primary", mx: 0, py: 1 }}>
				<Typography sx={{ mx: 2, mt: 4, fontWeight: "bold", fontSize: fontLabel + 2 }}>Contact</Typography>
			</Box>

			<Grid container spacing={2}>
				<Grid item xs={12} sx={{ mx: 2 }}>
					<Typography
						sx={{
							mb: 1,
							mt: 1,
							fontWeight: "bold",
							fontSize: fontLabel,
						}}
						component="p"
					>
						Email <Typography sx={{ fontSize: 14 }}>(to help us verify your account)</Typography>
					</Typography>

					<TextField
						classes={{ root: props.customTextField }}
						size="small"
						id="email"
						name="email"
						value={email ? email : ""}
						onChange={(e) => {
							setChangeColor({ backgroundColor: "primary", color: "white" });
							setEmail(e.target.value);
						}}
						fullWidth
						sx={{ backgroundColor: "text.active" }}
						placeholder="Enter your email address"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailIcon color="black" />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item xs={12} sx={{ mx: 2 }}>
					<Typography
						sx={{
							mb: 1,
							mt: 1,
							fontWeight: "bold",
							fontSize: fontLabel,
						}}
						component="p"
					>
						Mobile <Typography sx={{ fontSize: 14 }}>(for prizes, commissions & purchases)</Typography>
					</Typography>

					<TextField
						classes={{ root: props.customTextField }}
						size="small"
						id="mobile"
						name="mobile"
						fullWidth
						value={mobile ? mobile : ""}
						onChange={(e) => {
							setChangeColor({ backgroundColor: "primary", color: "white" });
							setMobile(e.target.value);
						}}
						sx={{ backgroundColor: "text.active" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PhoneIcon color="black" />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
			</Grid>
			{error ? (
				<Grid item xs={12} sx={{ mx: 2, mt: 2 }}>
					<Box sx={{ backgroundColor: "error.light", mt: 0, py: 1, px: 3 }}>
						<Typography sx={{ color: "error.main" }}>{errorMessage}</Typography>
					</Box>
				</Grid>
			) : null}

			<Grid item xs={12} sx={{ mx: 2, mt: 2 }}>
				<SaveBtn loading={loading} onClick={saveContactDetails} bg={changeColor}>
					Save
				</SaveBtn>
			</Grid>
		</div>
	);
}

export default Contact;
