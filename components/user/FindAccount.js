import * as React from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	FormControl,
	TextField,
	Button,
} from "@mui/material";
import axios from "axios";
import {
	validateEmail,
	IsValidEmail,
	IsValidInteger,
	validatemobile,
} from "../utils/util";
import CustomDialog from "../Shared/CustomDialog";
import ResetPasswordOptions from "./ResetPasswordOptions";
import { makeStyles } from "@mui/styles";

const FindAccount = (props) => {
	const useStyles = makeStyles({
		customTextField: {
			"& input::placeholder": {
				fontSize: "14px",
			},
		},
	});

	const classes = useStyles();
	const [openOptionsModal, setOpenOptionsModal] = React.useState(false);
	const handleOptionsModalOpen = (e) => {
		setOpenOptionsModal(true);
	};
	const handleOptionsModalClose = (e) => {
		setOpenOptionsModal(false);
		props.onParentClose();
	};
	const [value, setValue] = React.useState("");
	const [userData, setUserData] = React.useState({});
	const [errdesc, seterrdesc] = React.useState("");

	const handleChange = (e) => {
		setValue(e.target.value);
		seterrdesc("");
	};
	const findUserAccount = async (e) => {
		e.preventDefault();
		let searchtype = "";
		let error = 0;
		let acct = value;
		if (acct != "") {
			if (validateEmail(acct) && IsValidEmail(acct)) {
				searchtype = "email";
			} else {
				acct = acct.replace("+61", "0");
				if (IsValidInteger(acct) && validatemobile(acct)) {
					searchtype = "mobile";
				} else {
					error = 1;
					seterrdesc("Please enter valid Email / Mobile number.");
				}
			}
		} else {
			error = 1;
			seterrdesc("Please enter valid Email / Mobile number.");
		}
		let body = {
			details: acct,
			searchtype: searchtype,
		};
		if (error != 1) {
			const res = await axios({
				method: "post",
				url: `${process.env.server}/resetpassword/getUserAccount`,
				params: body,
				headers: {
					"Content-Type": "application/json",
					XAPIGTO: process.env.APP_BRAND.toUpperCase(),
				},
			});
			const data = await res.data;
			if (data.USERID > 0) {
				setUserData(data);
				handleOptionsModalOpen();
			} else {
				seterrdesc(
					"No search results <br> Your search did not return any results. Please try again with other information."
				);
			}
		}
	};
	const details = userData.DETAILS ? JSON.parse(userData.DETAILS)[0] : [];
	return (
		<Box>
			<Card sx={{ bgcolor: "background.dialogcontent" }} component="form">
				<CardContent>
					<Typography
						variant="subtitle1"
						component="p"
						fontSize={16}
						mt={2}
						color="text.dialog"
					>
						Enter your email address or mobile number so we can identify you.</Typography>
					<FormControl variant="outlined" sx={{ mt: 4, mb: 2 }} fullWidth>
						<TextField
							required
							fullWidth
							autoFocus
							size="small"
							sx={{ backgroundColor: "text.active" }}
							classes={{ root: classes.customTextField }}
							id="input-with-icon-textfield"
							hiddenLabel
							placeholder="Email / Mobile number"
							value={value}
							onChange={handleChange}
							variant="outlined"
						/>
					</FormControl>
					{errdesc != "" && (
						<Box sx={{ backgroundColor: "error.light", mt: 1, py: 1, px: 3 }}>
							<Typography sx={{ color: "error.main" }}>
								<div dangerouslySetInnerHTML={{ __html: errdesc }} />
							</Typography>
						</Box>
					)}
					<Button
						color="success"
						variant="contained"
						fullWidth
						size="small"
						sx={{
							mt: 3,
							mb: 2,
							fontSize: 18,
							fontWeight: "bold",
							py: 0.2,
							height: 42,
							boxShadow: "0px 2px 0px 0px #386c01",
						}}
						onClick={findUserAccount}
					>
						Search
					</Button>
				</CardContent>
			</Card>
			<CustomDialog
				id={"forgotpassword"}
				open={openOptionsModal}
				title={"Forgot your login?"}
				content={
					<ResetPasswordOptions
						data={details}
						searchtype={userData.SEARCHTYPE}
						onParentClose={handleOptionsModalClose}
						smslimit={userData.SMSLIMIT}
					/>
				}
				fullScreen
				showX
				onClose={handleOptionsModalClose}
			/>
		</Box>
	);
};

export default FindAccount;
