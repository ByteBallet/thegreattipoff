import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

function SaveBtn(props) {
	return (
		<LoadingButton
			fullWidth
			disableElevation
			loading={props.loading}
			variant="contained"
			sx={{
				backgroundColor: props.bg ? props.bg.backgroundColor : "grey.primary",
				color: props.bg ? props.bg.color : "grey.main",
			}}
			onClick={props.onClick}
		>
			{props.children}
		</LoadingButton>
	);
}

export default SaveBtn;
