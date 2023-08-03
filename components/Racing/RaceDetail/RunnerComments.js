import { Typography, Box } from "@mui/material";
import React from "react";

export default function RunnerComments({ comment }) {
	return (
		<Box>
			<Box mb={0.5}>
				<Typography color="grey.light" fontSize={14}>
					Runner Comments
				</Typography>
			</Box>
			<Box>
				<Typography color="text.active" fontSize={13} component='p' sx={{ lineHeight: 1.2 }}>
					{comment}
				</Typography>
			</Box>
		</Box>
	);
}
