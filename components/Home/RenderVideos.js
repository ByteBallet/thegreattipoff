import { Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const RenderVideos = ({ item }) => {
    const videoRef = useRef();
    const [stop, setStop] = useState(false);

    const handleVideo = () => {
        setStop(!stop);
        if (stop === true) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };
    return (
        <React.Fragment>
            {/* <video ref={videoRef}>
                <source src={item?.VIDEOURL} type="video/mp4" />
            </video> */}

            <Stack direction="row"
                alignItems={"start"}
                sx={{ position: "absolute", top: 25, px: 1 }} spacing={2}
                justifyContent={"space-between"}
            >
                <Typography fontSize={16} fontWeight="bold" color="white.main">
                    {item?.TITLE}
                </Typography>
                <Stack direction="column" alignItems={"center"} justifyContent="center" spacing={2}>
                    <Typography fontSize={16} color="white.main" noWrap fontWeight="bold">Watch Now</Typography>
                    <PlayCircleIcon sx={{ fontSize: 40, color: "white.main" }} />
                    <Typography fontSize={14} color="white.main" noWrap>{item?.TOTALTIME}</Typography>
                </Stack>
            </Stack>
        </React.Fragment>
    );
};

export default RenderVideos;