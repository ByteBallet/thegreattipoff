import { Grid, Box, Typography } from '@mui/material';
import { getTipMarketStaticContent } from '@services/leaderboard/lbService';
import { toTitleCase } from '@utils/hotBetUtils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CustomGridTitle from './CustomGridTitle';

const TipMarketStaticContent = ({ raceType = '', isTrack = false }) => {
    const router = useRouter()
    const [content, setcontent] = useState([])
    const getStaticContent = async () => {
        let pageLink = router?.asPath?.split("/")
        let body = {
            urlpath: pageLink[pageLink?.length - 1],
            raceType: raceType,
            racelocation: isTrack
        }
        const resp = await getTipMarketStaticContent(body)
        setcontent(resp?.data?.qGetContent)
    }

    useEffect(() => {
        getStaticContent()
    }, [router?.asPath])
    return (
        <React.Fragment>
            {
                content?.length > 0 &&
                <Grid container spacing={2} sx={{ p: 2 }}>
                    {
                        content?.map((item, idx) =>
                            item?.CONTENT?.length > 0 && <React.Fragment key={idx}>
                                <Grid container item xs={12}>
                                    <CustomGridTitle title={toTitleCase(item?.LABEL)} component="h2" />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Box sx={{
                                        bgcolor: "white.main", borderRadius: 2, px: 2, py: 1, width: 1
                                    }}>
                                        <Typography fontSize={13} component="p" className='tipsterBio'>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item?.CONTENT,
                                                }}
                                            />
                                        </Typography>
                                    </Box>
                                </Grid>
                            </React.Fragment>
                        )}
                </Grid>
            }
        </React.Fragment >
    );
};

export default TipMarketStaticContent;