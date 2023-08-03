import authAPI from '@Components/utils/authAPI';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CustomGridTitle from './CustomGridTitle';

const SchemaFAQ = ({ raceType = '', isTrack = false }) => {
    const router = useRouter()
    const routepath = router.asPath;
    const [faq, setfaq] = useState([])

    useEffect(() => {
        async function getSeodata(params) {
            const body = {
                urlpath: params,
                faq: true
            }
            const url = `${process.env.server}/seo/getseometa`
            const response = await authAPI(url, body, "POST", false);
            if (!response.error) {
                setfaq(response?.data?.faq)
            }
        }
        let path = routepath.indexOf("blog") > -1 ? "/" + routepath.split("/")[1] : routepath
        getSeodata(path);
        return () => {
            setfaq("");
        }
    }, [routepath]);

    return (
        <React.Fragment>
            {
                faq?.length > 0 &&
                <Grid container spacing={0} sx={{ p: 2 }}>
                    <Grid container item xs={12}>
                        <CustomGridTitle title={"Frequent Questions"} component="h2" />
                    </Grid>
                    <Grid container item xs={12}>
                        <Box sx={{
                            bgcolor: "white.main", borderRadius: 2, px: 2, width: 1, mt: 2
                        }}>
                            {
                                faq?.map((item, idx) =>
                                    <Stack direction="column" key={idx} spacing={0.5} sx={{ my: 2 }}>
                                        <Typography fontSize={14} component="p" fontWeight={"bold"}>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item?.QUESTION,
                                                }}
                                            />
                                        </Typography>
                                        <Typography fontSize={13} component="p" >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item?.ANSWER,
                                                }}
                                            />
                                        </Typography>
                                    </Stack>
                                )}

                        </Box>
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    );
};

export default SchemaFAQ;