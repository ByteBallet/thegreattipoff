import { Box, TableCell, TableRow, Typography, Stack, Grid, useMediaQuery } from "@mui/material";
import moment from "moment";
import NumberFormat from "react-number-format";

export default function RaceFieldScracthed({ raceField, isBoxed, activeTabName, columns }) {
	let scratch_time = moment.utc(raceField.scratchtime).local().format("DD/MM, HH:mm");
	const isDesktop = useMediaQuery('(min-width:900px)');
	return (
		<Box mb={0.5}>
			<Box mx={2} sx={{ borderBottom: 1, borderColor: 'grey.border1' }} >
				<Grid container columnSpacing={1} wrap='nowrap'>
					<Grid item xs={isDesktop ? 1 : 1.5}></Grid>
					<Grid item zeroMinWidth xs={6.5}>
						<Box justifyContent="space-between" lineHeight={1}>
							<Typography sx={{ fontSize: 13, color: "grey.dark", textDecoration: "line-through" }} noWrap component="p">
								{raceField.fieldnum}. {raceField.fieldname} ({raceField.barrier})
							</Typography>
							<Box>
								<Typography sx={{ color: "grey.dark", fontSize: 11 }} noWrap>SCRATCHED {scratch_time}</Typography>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={4}>
						{
							raceField.win == 0 && raceField.place == 0 &&
							<Typography
								noWrap
								fontSize={13}
								color="grey.dark"
								sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
								No Deductions
							</Typography>
						}
						{
							(raceField.win > 0 || raceField.place > 0) &&
							<Stack direction="column" justifyContent="flex-end" sx={{ width: "100%" }}>
								<Typography fontSize={13} color="grey.dark" align="right">Deductions</Typography>
								<Stack direction="row" justifyContent="flex-end">
									{
										raceField.win > 0 && <Typography fontSize={13} color="grey.dark">
											W&nbsp;<NumberFormat
												thousandSeparator={true}
												value={raceField.win / 100}
												decimalSeparator="."
												decimalScale={2}
												fixedDecimalScale={true}
												displayType="text"
												prefix="$"
											/>
										</Typography>
									}
									{
										raceField.place > 0 && <Typography fontSize={13} color="grey.dark">&nbsp;/&nbsp;</Typography>
									}
									{
										raceField.place > 0 && <Typography fontSize={13} color="grey.dark">
											P&nbsp;<NumberFormat
												thousandSeparator={true}
												value={raceField.place / 100}
												decimalSeparator="."
												decimalScale={2}
												fixedDecimalScale={true}
												displayType="text"
												prefix="$"
											/>
										</Typography>
									}
								</Stack>
							</Stack>
						}
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
