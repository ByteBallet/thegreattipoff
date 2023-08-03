import React, { useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { List, ListItem, Paper, Box, Badge } from "@mui/material";
import { handleRDNumberSliderScroll } from '../../utils/util';

function RaceNumberSlider(props) {
	const numListRef = useRef(null);
	const listRef = useRef(null);

	const { racenumbers, setRaceFields, racesClosed } = props;
	const router = useRouter();
	const { detail, raceid } = router.query;
	let quaddie_Races = props.quaddienum > 0 ? racenumbers.slice(props.quaddienum - 1, props.quaddienum + 3) : []
	function getExoticNum(racenum) {
		let number = quaddie_Races.findIndex((item) => item.racenum == racenum);
		return number + 1;
	}
	useEffect(() => {
		if (listRef?.current?.offsetWidth && numListRef?.current?.offsetWidth) {
			handleRDNumberSliderScroll(
				listRef.current.offsetWidth,
				numListRef.current.offsetWidth,
				listRef.current,
				racenumbers,
				raceid
			);
		}
	}, [raceid]);



	function NumList(params) {
		const pathname = `/${params.racetype === "R" ? "racing" : params.racetype === "G" ? "greyhound" : "harness"}/${detail}/${params.raceid}`;
		const router = useRouter();
		let bgButton = params.selected ? "primary.main" : (props.isDesktop ? "grey.tipBtn" : "white")
		let color;
		let font = "bold";
		let checkRaceClosed = racesClosed.filter((race) => race.raceid == params.raceid).length > 0 ? true : false
		if (checkRaceClosed || params.abandoned) {
			color = "grey.main";
			font = "regular";
		}
		if (params.racenum && params.selected) {
			color = checkRaceClosed ? "grey.main" : process.env.APP_BRAND == 'gto' ? "white.main" : "text.default";
			font = params.selected && !checkRaceClosed ? "bold" : "regular";
		}

		let showQuaddie = (props.raceStatus == "" || props.raceStatus == "open") &&
			props.isQuaddieActive &&
			props.quaddieRaces.indexOf(props.raceid) > -1 &&
			params.racenum >= props.quaddienum &&
			params.racenum <= props.quaddienum + 3

		return (
			<ListItem sx={{ width: 'auto', px: 0.6, py: 0, cursor: "pointer" }} ref={numListRef}>
				<Box
					onClick={() => {
						router.push(
							{
								pathname: pathname,
							},
							undefined,
							{ shallow: true }
						);
					}}>
					<Badge
						badgeContent={(showQuaddie && props.showTick(params.racenum)) ? <CheckOutlinedIcon color="primary" sx={{ fontSize: 8 }} /> : 0}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						overlap='circular'
						sx={{
							'& .MuiBadge-badge': {
								bgcolor: "black.main",
								border: 1,
								fontSize: 8,
								width: 12,
								height: 12,
								minWidth: 0,
								padding: 0,
							}
						}}
					>
						<Badge
							badgeContent={showQuaddie ? getExoticNum(params.racenum) : 0}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							overlap='circular'
							sx={{
								'& .MuiBadge-badge': {
									bgcolor: "white.main",
									color: "black",
									border: 1,
									fontSize: 8,
									width: 12,
									height: 12,
									minWidth: 0,
									padding: 0,
								}
							}}
						>

							<Paper
								elevation={showQuaddie ? 0 : 1}
								sx={{
									width: 35,
									height: 35,
									borderRadius: 30,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: bgButton,
									color: color,
									fontSize: 12,
									fontWeight: font,
									border: showQuaddie ? 1 : 0
								}}>
								R{params.racenum}
							</Paper>
						</Badge>
					</Badge>
				</Box>
			</ListItem >
		);
	}
	return (
		<div
			ref={listRef}
			style={{
				display: 'flex',
				overflow: 'auto',
				scrollBehavior: 'smooth',
				alignContent: 'flex-start',
				height: '70px',
				marginLeft: '19px',
				marginRight: '19px',
			}}
		>
			{racenumbers.map((item) => (
				<NumList
					key={item.raceid}
					racetype={item.racetype}
					racerun={item.racerun}
					raceid={item.raceid}
					racenum={item.racenum}
					selected={item.raceid === raceid ? true : false}
					abandoned={item.abandoned}
				/>
			))}
		</div>
	);
}

export default RaceNumberSlider;
