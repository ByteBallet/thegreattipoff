import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const ResponsibleGambling = ({ bgcolor = "white.main", textColor = "inherit", linkColor = "info.comment" }) => {
    return (
        <Stack direction="column" sx={{ bgcolor: bgcolor, p: 2 }}>
            <Typography color={textColor} fontSize={13} fontWeight="bold" sx={{ mb: 1 }} align="center">What are you really gambling with?</Typography>
            <Box sx={{ lineHeight: 1.2, textAlign: "center" }}>
                <Typography color={textColor} fontSize={13} fontStyle={"italic"} align="center">For free and confidential support call 1800 858 858 or visit&nbsp;</Typography>
                <a href="http://gamblinghelponline.org.au" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <Typography color={linkColor} fontStyle={"italic"} fontSize={13} align="center"
                        sx={{
                            textDecorationColor: linkColor,
                            textDecoration: "underline"
                        }}>
                        gamblinghelponline.org.au
                    </Typography></a>
            </Box>
        </Stack>
    );
};

export default ResponsibleGambling;