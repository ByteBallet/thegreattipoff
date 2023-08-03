import {
	Card,
	Button,
	Typography,
	Box,
	CardMedia,
	Grid,
	CardActionArea,
	useMediaQuery,
	Stack
} from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import BoxDivider from "../Shared/BoxDivider";
import Link from "next/Link";
import { getVideos } from "@services/Home/homeService";
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player/youtube'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RenderVideos from "./RenderVideos";

const Videos = ({ videos }) => {

	const isDesktop = useMediaQuery('(min-width:900px)');

	return (
		<Box>
			<Typography fontSize={16} component="p" fontWeight="fontWeightBold" my={2}>
				Videos
			</Typography>
			<Grid container spacing={2}>
				{
					videos?.map((item, idx) =>
						<Grid item xs={12} sx={{ position: "relative" }} key={idx}>
							<Box sx={{ bgcolor: "primary.main", borderRadius: 2 }}>
								<ReactPlayer
									url={item?.VIDEOURL}
									controls={true}
									light={idx != 0 ? (item?.THUMBIMG ? `${process.env.cdn}/images/latestnews/tipstershow/` : true) + item?.THUMBIMG : true}
									width={"100%"}
									height={isDesktop ? "300px" : idx != 0 ? "150px" : "250px"}
									playIcon={<PlayCircleIcon sx={{ fontSize: 40, color: "white.main" }} />}
									config={{
										youtube: {
											playerVars: { showinfo: 1 }
										}
									}}
								/>
							</Box>
						</Grid>
					)
				}
			</Grid>
			<Link href="/videos">
				<Typography fontSize={14} align="right" sx={{ display: "flex", justifyContent: "end", alignItems: "center", my: 2, cursor: "pointer" }}>
					View More <KeyboardArrowRightOutlinedIcon fontSize="small" />
				</Typography>
			</Link>
		</Box>
	);
};

export default Videos;
