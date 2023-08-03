import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useTheme } from '@mui/material/styles';
import UserPayMethod from "../Payments/UserPayMethod";
import { getTextColor, isHotBetWidget } from "@Components/utils/util";

const style = (theme) => ({
	[theme.breakpoints.down('sm')]: {
		position: "absolute",
		top: "0%",
		bottom: "60px",
		width: "100%",
	},
	[theme.breakpoints.up('sm')]: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 600,
		overflowY: "auto",
		maxheight: 700
	},
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	borderTopLeftRadius: 0,
	borderTopRightRadius: 0,
	borderBottomLeftRadius: 8,
	borderBottomRightRadius: 8,
});

export default function JoinConfirm({ open, setOpen, username }) {
	const handleClose = () => setOpen(false);
	const theme = useTheme();
	let hbWidget = isHotBetWidget()
	const renderContent = () => {
		return <Box sx={hbWidget ? {} : style}>
			{
				!hbWidget &&
				<Box
					sx={{
						height: hbWidget ? "100%" : "20%",
						background: "rgb(0, 0, 0)",
						background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(48,48,48,1) 50%, rgba(0,0,0,1) 100%)",
						overflowY: "auto"
					}}>
					<Box sx={{ display: "flex", widht: "100%", justifyContent: "flex-end", mr: 2, pt: 2, fontWeight: "bold", cursor: "pointer" }}>
						<CloseIcon onClick={handleClose} size="small" color="grey" />
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",

							color: "white.main",
						}}>
						<Image
							src={`${process.env.cdn}/images/logo/logo.svg`}
							width={170}
							height={60}
							alt={process.env.cdn}
						/>
					</Box>
				</Box>
			}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "20%",
					backgroundColor: "primary.alternate",
					pt: 2,
					color: getTextColor(theme.palette.primary.main),
				}}>
				<Typography sx={{ fontWeight: "bold", fontSize: 24, lineHeight: 1, color: "inherit" }}>Welcome to {process.env.client.clientname}</Typography>
				<Typography sx={{ fontWeight: "bold", fontSize: 24, color: "inherit" }}>{username}!</Typography>
				<Typography sx={{ mt: 2, color: "inherit" }}>You are almost ready..</Typography>
			</Box>
			<UserPayMethod />
		</Box>
	}
	return (
		<React.Fragment>
			{
				hbWidget ? renderContent() :
					<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
						{renderContent()}
					</Modal>
			}
		</React.Fragment>
	);
}
