import { useMediaQuery, Typography, Box } from '@mui/material';


const HeaderOne = () => {

    const isDesktop = useMediaQuery('(min-width:900px)');

    return (
        <Box sx={{ py: 2 }}>
            <Typography fontWeight={'700'}>Group One and Feature Races</Typography><br />
            <Typography>A full list of Group One and Feature Races can be found below</Typography>
        </Box>
    );
};
export default HeaderOne;


