import { useState } from "react";

// MUI component imports
import { Grid, Box, Typography, TextField, InputAdornment } from "@mui/material";

// Component import
import SaveBtn from "./SaveBtn";

import authAPI from "../utils/authAPI";

// Icon imports
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Password(props) {
	// state variables
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [password, setPassword] = useState("");
	const [changeColor, setChangeColor] = useState({ backgroundColor: "grey.primary", color: "grey.main" });

	function validatePassword() {
		//validate the password returns true or false
		const checkSpaces = /\s/g;
		const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
		if (password === "") {
			setError(true);
			setErrorMessage("Password is required");
			return false;
		} else if (password.length < 8) {
			setError(true);
			setErrorMessage("Password too short. Password must contain at least 8 characters.");
			return false;
		} else if (checkSpaces.test(password)) {
			setErrorMessage("Password cannot contain spaces");
			setError(true);
			return false;
		} else if (!passwordRegex.test(password)) {
			setErrorMessage("Password requires at least one numeric, one capital and one lowercase.");
			setError(true);
			return false;
		} else return true;
	}

	async function savePassword() {
		const url = `${process.env.server}/user/update`;
		if (props.userID === null) {
			return;
		}
		if (!validatePassword()) {
			return;
		} else {
			setError(false);
			setLoading(true);
			const body = {
				userid: props.userID,
				password,
			};

			const response = await authAPI(url, body, "POST", true);
			setChangeColor({ backgroundColor: "grey.primary", color: "grey.main" });
			setTimeout(function disableLoading() {
				setLoading(false);
			}, 2000);
			console.log(response);
		}
	}

	const fontLabel = props.fontLabel;
	return (
		<div>
			<Box sx={{ mt: 2, backgroundColor: "grey.primary", mx: 0, py: 1 }}>
				<Typography sx={{ mx: 2, fontWeight: "bold", fontSize: fontLabel + 2 }}>Password</Typography>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={12} sx={{ mx: 2 }}>
					<Typography
						sx={{
							mb: 1,
							mt: 1,
							fontSize: fontLabel,
						}}
						component="p"
					>
						Username
					</Typography>

					<TextField
						value={props.alias ? props.alias : ""}
						disabled
						fullWidth
						classes={{ root: props.customTextField }}
						size="small"
						sx={{ backgroundColor: "text.active" }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PersonIcon color="grey.primary" />
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

							fontSize: fontLabel,
						}}
						component="p"
					>
						Password
					</Typography>

					<TextField
						classes={{ root: props.customTextField }}
						size="small"
						value={password}
						onChangeCapture={(e) => {
							setChangeColor({ backgroundColor: "primary", color: "white" });
							setPassword(e.target.value);
						}}
						id="password"
						name="password"
						placeholder="Change password"
						fullWidth
						sx={{ backgroundColor: "text.active" }}
						type={showPassword ? "text" : "password"}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon color="grey.primary" />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <VisibilityOffIcon color="secondary.light" /> : <VisibilityIcon color="secondary.light" />}
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				{error ? (
					<Grid item xs={12} sx={{ mx: 2 }}>
						<Box sx={{ backgroundColor: "error.light", mt: 0, py: 1, px: 3 }}>
							<Typography sx={{ color: "error.main" }}>{errorMessage}</Typography>
						</Box>
					</Grid>
				) : null}

				<Grid item xs={12} sx={{ mx: 2 }}>
					<SaveBtn loading={loading} onClick={savePassword} bg={changeColor}>
						Save
					</SaveBtn>
				</Grid>
			</Grid>
		</div>
	);
}

export default Password;
