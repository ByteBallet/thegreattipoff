import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { getTipsterBackground } from '@services/tipster/tipsterService';
import { toTitleCase } from '@utils/hotBetUtils';
import React, { useEffect, useState } from 'react';

const TipsterBackground = ({ tipster }) => {
    const [content, setcontent] = useState([]);
    useEffect(() => {
        const getBackground = async () => {
            let body = {
                userid: tipster?.USERID,
            };
            const resp = await getTipsterBackground(body);
            setcontent(resp?.data?.background);
        };
        getBackground();
    }, []);
    if (!content[0]) return;

    return (
        <React.Fragment>
            {content?.length > 0 && content?.[0]?.PAGENARRA?.length > 0 && (
                <Grid container spacing={0} sx={{ p: 2 }}>
                    <Grid container item xs={12}>
                        <CustomGridTitle title={`${toTitleCase(tipster?.ALIAS)} Background`} component="h2" />
                    </Grid>
                    <Grid container item xs={12}>
                        <Box
                            sx={{
                                bgcolor: 'white.main',
                                borderRadius: 2,
                                px: 2,
                                width: 1,
                                mt: 2,
                            }}
                        >
                            {content?.map((item, idx) => (
                                <Stack direction="column" key={idx} spacing={0.5} sx={{ my: 2 }}>
                                    {item?.PAGETITLE && (
                                        <Typography fontSize={14} component="p" fontWeight={'bold'}>
                                            {item?.PAGETITLE}
                                        </Typography>
                                    )}
                                    <Typography fontSize={13} component="p" className="tipsterBio">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: item?.PAGENARRA,
                                            }}
                                        />
                                    </Typography>
                                </Stack>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
};

export default TipsterBackground;
