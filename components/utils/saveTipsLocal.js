import { serializeValues } from "./RacingUtil"

export default function saveTipsLocal(betSlipData, bettype) {
	switch (bettype) {
		case "singles": {
			let singles = [];
			if (betSlipData && betSlipData.singles && betSlipData.singles.length) {
				betSlipData.singles.forEach((element) => {
					singles.push(serializeValues(element));
				});
				localStorage.removeItem("singles");
				localStorage.setItem("singles", JSON.stringify(singles));
			}
		}
		case "multi": {
			if (betSlipData && betSlipData.multi && betSlipData.multi.length) {
				localStorage.removeItem("multi");
				localStorage.setItem("multi", JSON.stringify(betSlipData.multi));
			}
		}
		case "packages": {
			if (betSlipData && betSlipData?.packages && betSlipData?.packages?.length) {
				localStorage.removeItem("tippackages");
				localStorage.setItem("tippackages", JSON.stringify(betSlipData?.packages));
			}
		}
		default:
	}
}