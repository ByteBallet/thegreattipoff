import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import authAPI from '../../utils/authAPI';
import CarouselItem from '../../Home/CarouselItem';

const TipWinner = (props) => {
    const [data, setState] = useState("");
    useEffect(() => {
        async function getRaceResultssdata({ ...props }) {
            const url = `${process.env.server}/protip/getTipWinner`
            const response = await authAPI(
                url,
                { raceid: props.raceid, jsonresp: "1", reclimit: "10" },
                "POST",
                false
            );
            const results = !response.error ? response.data.ERROBJ.ERRORCODE == 0 ? response.data : "" : ""
            if (results != "") { setState(response.data.wintipster) }
        }
        getRaceResultssdata({ ...props });
    }, [props]);
    return (
        <Box sx={{ bgcolor: "background.default" }} px={2} py={1}>
            {data.length > 0 &&
                <>
                    <Typography fontSize={16} component="p" fontWeight="bold" my={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
                        Who tipped the winner?
                    </Typography>
                    <Container sx={{ display: "flex", overflowX: "auto", pl: 0, pb: 1.5 }}>
                        {data.map((tipster, idx) => (
                            <CarouselItem tipster={tipster} key={idx} follow={true} />
                        ))}
                    </Container>
                </>
            }
            <Typography fontSize={17} component="p" fontWeight="bold" mt={data.length > 0 ? 2 : 0} sx={{ display: 'flex', alignItems: 'center' }}>
                Full Field
            </Typography>
        </Box>
    );
};

export default TipWinner;