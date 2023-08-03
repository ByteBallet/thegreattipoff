import { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { getVideos } from "@services/Home/homeService";
import ReactPlayer from 'react-player/youtube'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LazyLoad from 'react-lazy-load';

const VideosDesktop = () => {
	const [videos, setvideos] = useState([])
	const isDesktop = useMediaQuery('(min-width:900px)');

	const getVideo = async () => {
		let body = {
			nRecs: 3
		}
		const resp = await getVideos(body)
		setvideos(resp?.data?.videoset)
	}

	useEffect(() => {
		getVideo()
	}, [])

	return (
		<Box>
			<Grid container >
				{videos?.length > 0 &&
					<Box sx={{ py: 1 }}>
						<LazyLoad once>
							<ReactPlayer
								url={videos[0].VIDEOURL}
								controls={false}
								light={false}
								width={"100%"}
								height={"150px"}
								playIcon={<PlayCircleIcon sx={{ fontSize: 40, color: "white.main" }} />}
								config={{
									youtube: {
										playerVars: { showinfo: 1 }
									}
								}}
							/>
						</LazyLoad>

					</Box>
				}
			</Grid>
		</Box>
	);
};

export default VideosDesktop;
