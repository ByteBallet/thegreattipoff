import { useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";

import authAPI from "../utils/authAPI";

function DefaultAlias(props) {
	const [value, setValue] = useState(props.dispalias === 0 ? "alias" : "firstName");

	useEffect(() => {
		setValue(props.dispalias === 0 ? "alias" : "firstName");
	}, [props.dispalias]);

	const handleChange = async (event) => {
		setValue(event.target.value);

		await updateAddress(event.target.value);
	};

	async function updateAddress(val) {
		const url = `${process.env.server}/user/update`;
		if (props.userID === null) {
			return;
		}

		const body = {
			userid: props.userID,
			dispalias: val === "alias" ? 0 : 1,
		};
		const response = await authAPI(url, body, "POST", true);
	}

	return (
		<FormControl component="fieldset">
			<Box sx={{ ml: 2 }}>
				<FormLabel sx={{ my: "auto", mr: 1 }}>Show on site as</FormLabel>
				<RadioGroup row aria-label="gender" name="controlled-radio-buttons-group" value={value} onChange={handleChange}>
					<FormControlLabel value="alias" control={<Radio />} label={props.alias} />
					<FormControlLabel value="firstName" control={<Radio />} label={`${props.firstName} ${props.surName}`} />
				</RadioGroup>
			</Box>
		</FormControl>
	);
}

export default DefaultAlias;
