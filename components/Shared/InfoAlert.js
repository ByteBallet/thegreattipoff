import React from 'react';
import { Alert } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InfoAlert = ({ content, skipMargin = false }) => {
    return (
        <Alert
            severity="info"
            variant="outlined"
            icon={<InfoIcon fontSize="inherit" sx={{ color: "info.comment" }} />}
            sx={{
                fontSize: 12,
                bgcolor: "background.comment",
                color: "info.comment",
                borderColor: "info.comment",
                mb: skipMargin ? 0 : 2
            }}>
            {content}
        </Alert>
    );
};

export default InfoAlert;