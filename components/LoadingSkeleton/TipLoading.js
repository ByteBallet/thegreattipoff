import { Box } from "@mui/material";

import Skeleton from "@mui/material/Skeleton";

export default function TipLoading({ isBetslip = false, skipHeader = false, displayColumns = 15 }) {
	function TipLoadingTips() {
		return (
			<Box sx={{ display: "flex", mx: 2, my: 2, justifyContent: "space-between" }}>
				<Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: isBetslip ? "grey.dividends" : "grey.primary" }} />
				<Skeleton variant="rectangular" width="85%" height={40} sx={{ bgcolor: isBetslip ? "grey.dividends" : "grey.primary" }} />
			</Box>
		);
	}

	function TipLoadingHeading(props) {
		return (
			<Box sx={{ display: "flex", mx: 2, my: 2, justifyContent: "space-between" }}>
				<Skeleton variant="rectangular" width="100%" height={props.height} sx={{ bgcolor: isBetslip ? "grey.dividends" : "grey.primary" }} />
			</Box>
		);
	}

	function RaceNumbers() {
		return (
			<Box sx={{ display: "flex", mx: 2, my: 2, justifyContent: "space-between" }}>
				{Array(6)
					.fill()
					.map((item, index) => (
						<Skeleton key={index} variant="circular" width={50} height={50} sx={{ bgcolor: isBetslip ? "grey.dividends" : "grey.primary" }} />
					))}
			</Box>
		);
	}

	function LoadingScreen(props) {
		return (
			<>
				{!skipHeader && <TipLoadingHeading height={80} />}
				{!skipHeader && <RaceNumbers />}
				{!skipHeader && <TipLoadingHeading height={30} />}
				{Array(displayColumns)
					.fill()
					.map((item, index) => (
						<TipLoadingTips key={index} />
					))}
			</>
		);
	}

	return <LoadingScreen />;
}
