import { Avatar, Box, Card, Typography, Grid, CardContent, Button } from "@mui/material";
import { useSession } from "next-auth/client";
import authAPI from "../utils/authAPI";
import { useEffect, useState, useContext } from "react";
import CustomDialog from "../Shared/CustomDialog";
import FollowTipster from "../Tipster/FollowTipster";
import { UserContext } from "../../Context/User/UserProvider";

const CarouselItem = (props) => {
	const { user, updateUserDetails } = useContext(UserContext);
	const [session, loading] = useSession();
	const [openFollowModal, setOpenFollowModal] = useState(false);
	const [isfollows, setFollowFlag] = useState(session && user.followlist ? (user.followlist.indexOf(props.tipster.USERID) > 0 ? true : false) : false);
	const handleModalOpen = (e) => {
		setOpenFollowModal(true);
	};
	const handleModalClose = (e) => {
		setOpenFollowModal(false);
	};
	if (!"isTrending" in props) {
		props.isTrending = false;
	}
	if (!"follow" in props) {
		props.follow = false;
	}
	const imgsrc =
		props.tipster.MEDIAGROUP != null && props.tipster.MEDIAGROUP != ""
			? `${process.env.cdn}/images/affiliatelogo/T-${props.tipster.MEDIAGROUP.replace(/ /g, "-")}.png`
			: `${process.env.cdn}/images/affiliatelogo/Horse-Racing-shoe.png`;

	// useEffect(() => {
	// 	async function getUserFollows() {
	// 		const updateURL = `${process.env.server}/oAuth/refreshToken`;
	// 		const resp = await fetch(updateURL, {
	// 			method: "POST",
	// 			headers: {
	// 				XAPIGTO: process.env.APP_BRAND.toUpperCase(),
	// 				Authorization: session.user.refresshtoken,
	// 			},
	// 			body: JSON.stringify({
	// 				uid: `${session.user.userID}`,
	// 				username: `${session.user.alias}`,
	// 			}),
	// 		});
	// 		const data = await resp.json();
	// 		let list = data.FOLLOWLIST.split(",");
	// 		setFollowFlag(list.includes('' + props.tipster.USERID + ''))
	// 	}
	// 	if (!user.followlist && session) { getUserFollows(); }
	// }, []);

	async function setFollow(uid) {
		const url = `${process.env.server}/info/setFollow`;
		const body = {
			followset: (!isfollows ? "f-" : "u-") + "punter-" + uid,
			uid: `${session.user.userID}`,
		};
		const response = await authAPI(url, body, "POST", true);
		if (!response.error) {
			if (response.data.ERROBJ.ERRORCODE == 0) {
				let list = response.data.FOLLOWLIST.split(",");
				setFollowFlag(list.includes('' + uid + ''))
				updateUserDetails("followlist", response.data.FOLLOWLIST)
			}
		}
	}
	return (
		<Box mr={2}>
			<Card sx={{ minWidth: 210, p: 1 }}>
				<CardContent sx={{ p: 1 }} className="slideritem">
					<Grid container spacing={2} columnSpacing={1} direction="row" justifyContent="center" alignItems="center">
						<Grid container item spacing={1} xs={3}>
							<Avatar
								src={`${process.env.cdn}/images/avatar/${props.tipster.AVATARPATH}`}
								alt={props.tipster.ALIAS}
								sx={{ width: 45, height: 45 }}
							/>
						</Grid>
						<Grid container item spacing={1} xs={9}>
							<Typography variant="h2" noWrap ml={1.2} fontSize={16} mb={0.3} className="textCapitalize">
								{props.tipster.ALIAS}
							</Typography>
							<Box sx={{ display: "flex", alignItems: "flex-start" }} ml={1.2}>
								{props.tipster.ROLES == "PROTIP" || props.tipster.MEDIA == "1" ? (
									<Avatar src={imgsrc} alt={props.tipster.MEDIAGROUP} variant="rounded" sx={{ width: 30, height: 30 }} />
								) : props.tipster.PROTIPPER == "1" ? (
									<Avatar src={`${process.env.cdn}/images/AffiliateLogo/T-Pro.png`} alt={"PRO"} variant="rounded" sx={{ width: 30, height: 30 }} />
								) : (
									<Avatar src={`${process.env.cdn}/images/AffiliateLogo/T-Punter.png`} alt={"PUNTER"} variant="rounded" sx={{ width: 30, height: 30 }} />
								)}
								{!props.follow && (
									<Box ml={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", lineHeight: 1 }}>
										{props.isTrending ? (
											<>
												<Typography variant="subtitle2" className="font14" noWrap>
													{Math.round(props.tipster.STATVALUE)}
													{props.tipster.STATTYPE == "POT"
														? "% PROFIT"
														: props.tipster.STATTYPE == "DAY"
															? " Day Streak"
															: " Month Streak"}
												</Typography>
												<Typography className="font12" color="grey.main">
													on turnover
												</Typography>
											</>
										) : (
											<>
												<Typography variant="subtitle2" className="font14" noWrap>
													{Math.round(props.tipster.WINPROFIT)}% PROFIT
												</Typography>
												<Typography className="font12" color="grey.main">
													on turnover
												</Typography>
											</>
										)}
									</Box>
								)}
								{!session && !loading && props.follow && (
									<Box ml={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", lineHeight: 1 }}>
										<Button
											variant="contained"
											onClick={handleModalOpen}
											size="small"
											disableElevation
											sx={{
												px: 3,
												fontWeight: "bold",
												borderRadius: 4,
											}}>
											Follow
										</Button>
										<CustomDialog
											id={"followTipster"}
											open={openFollowModal}
											title={
												<Box
													sx={{
														background: `url(${process.env.cdn}/images/advert/TipAlertLanding-Mobile-320W.png) no-repeat`,
														height: "100px",
														display: "flex",
														alignItems: "start",
														backgroundSize: "cover",
													}}>
													<Typography mt={0.5} pl={0.5} color="success.main" fontWeight="bold">
														{props.tipster.ALIAS.toUpperCase()}
													</Typography>
												</Box>
											}
											content={
												<FollowTipster
													tipsterid={props.tipster.USERID}
													name={props.tipster.ALIAS}
													onParentClose={handleModalClose}
												/>
											}
											fullScreen
											showX
											onClose={handleModalClose}
										/>
									</Box>
								)}
								{session && props.follow && (
									<Box ml={1} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", lineHeight: 1 }}>
										<Button
											variant="contained"
											onClick={() => setFollow(props.tipster.USERID)}
											size="small"
											disableElevation
											sx={{
												px: isfollows ? 2 : 3,
												fontWeight: "bold",
												borderRadius: 4,
											}}>
											{isfollows ? "Unfollow" : "Follow"}
										</Button>
									</Box>
								)}
							</Box>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
};

export default CarouselItem;
