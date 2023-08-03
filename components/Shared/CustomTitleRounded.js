import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getTextColor } from '@Components/utils/util';

const CustomTitleRounded = ({ title, bgcolor = "primary.main", textcolor }) => {
    const theme = useTheme();
    let bg = theme?.palette[bgcolor?.split(".")?.[0]][bgcolor?.split(".")?.[1]]
    let txtColor = textcolor ? textcolor : bg ? getTextColor(bg) : "blakc.main"
    return (
        <Box sx={{
            bgcolor: bgcolor,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
        }}>
            <Typography
                variant="h2"
                component="p"
                fontWeight="fontWeightBold"
                sx={{ fontSize: 14 }}
                px={2}
                py={1}
                color={txtColor}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default CustomTitleRounded;