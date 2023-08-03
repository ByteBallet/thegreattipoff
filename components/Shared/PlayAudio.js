import React, { useEffect, useState } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Button } from '@mui/material';

const PlayAudio = ({ url, text = "Listen", variant = "text" }) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing])
    return (
        <Button variant={variant} startIcon={<VolumeUpIcon sx={{ color: "black.main" }} />} onClick={toggle}>
            <u>{playing ? "Pause" : text}&nbsp;audio</u>
        </Button>
    );
};

export default PlayAudio;