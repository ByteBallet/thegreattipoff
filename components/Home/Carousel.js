import { Box, Button, Typography} from "@mui/material"
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CarouselIcons from "./CarouselIcons";

const Carousel = () => {
    return (
        <>
            <Box mx={2} mt={1} mb={0} sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" component="h1">Horse Racing Tips</ Typography>
                <Button variant="text" href="/" sx={{ color: "#000",px:0 }} >Leaderboard <KeyboardArrowRightOutlinedIcon fontSize="small" /></Button>
            </Box>
            <CarouselIcons/>
        </>
    );
};

export default Carousel;