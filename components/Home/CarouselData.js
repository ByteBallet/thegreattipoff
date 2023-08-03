import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselItem from './CarouselItem';
import { Container } from '@mui/material';
import authAPI from '@Components/utils/authAPI';

const CarouselData = (props) => {
    let data = [];
    const [carouseldata, setcarouselData] = useState([])
    useEffect(() => {
        async function getCarouseldata(params) {
            const url = `${process.env.server}/protip/getHomePageCarousel`
            const response = await authAPI(
                url,
                params,
                'POST',
                false
            );
            let data = response.error ? [] : response?.data?.DATA;
            setcarouselData(data);
        }
        getCarouseldata(props);
    }, [props]);
    return (
        <Container sx={{ display: "flex", overflowX: "auto", pb: 1.5 }}>
            {
                carouseldata.length > 0
                &&
                carouseldata.map((tipster, idx) => (
                    <CarouselItem tipster={tipster} key={idx} />
                ))}
        </Container>
    );
};

export default CarouselData;