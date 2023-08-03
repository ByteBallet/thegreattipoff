import { Box, Typography } from '@mui/material';

function CustomChip({ text, color, backgroundColor }) {
    return (
        <Box
            sx={{
                backgroundColor: backgroundColor,
                lineHeight: 1,
                px: 1,
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20px',
            }}
        >
            <Typography sx={{ color: color }} fontSize={12} fontWeight="bold">
                {text}
            </Typography>
        </Box>
    );
}

export default CustomChip;
