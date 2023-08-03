import { Box, Typography, Grid, Button } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ShowMore({ onClick }) {
    return (
        <Button fullWidth sx={{ backgroundColor: 'white.main', display: 'flex', justifyContent: 'center' }} onClick={onClick}>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 0.5 }}>
                <Typography fontSize={12} fontWeight="bold" color={'primary.main'}>
                    Show More
                </Typography>
                <ExpandMoreIcon color="primary.main" fontSize="12" />
            </Box>
        </Button>
    );
}

export default ShowMore;
