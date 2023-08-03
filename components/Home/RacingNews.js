import CarouselTitle from "./CarouselTitle";
import NewsList from "@Components/News/NewsList";
import { Box, List } from "@mui/material";
const RacingNews = (props) => {
    return (
        <Box mx={2}>
            <CarouselTitle carouselData={props.carouselData} title={props.title} />
            <List>
                {props.races.map((article, idx) => (
                    <NewsList article={article} key={idx} lastRec={props?.races?.length == idx + 1} />
                ))}
            </List>
        </Box>
    );
};

export default RacingNews;