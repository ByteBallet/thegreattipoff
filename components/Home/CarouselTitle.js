import {Container, Typography } from "@mui/material"; 
import CarouselItem from "./CarouselItem";

const CarouselTitle = (props) => {
    return (
        <>
            <Typography variant="subtitle1" component="p" fontWeight="fontWeightBold" mt={2} mb={1} sx={{ display: 'flex', alignItems: 'center' }}>
                {props.title}<Typography variant="span" className="font14" fontWeight="fontWeightRegular" >&nbsp;&nbsp;-&nbsp;&nbsp; 90 days stats</Typography>
            </Typography>
            <Container sx={{ display: "flex", overflowX: "auto", pl: 0, pb: 1.5 }}>
                {props.carouselData.map((tipster, idx) => (
                    <CarouselItem tipster={tipster} key={idx}/>
                ))}
            </Container>
        </>
    );
};

export default CarouselTitle;