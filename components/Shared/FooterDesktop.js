import React from 'react';
import { Card, CardContent, Stack, Typography, Box, Grid } from '@mui/material';
import BoxDivider from './BoxDivider';
import { WAGERING_IMAGES, BANKING_IMAGES, FOOTER_LINKS } from '@lib/constants';
import Link from 'next/Link';
import Footer18Plus from '@Components/Footer/Footer18Plus';
import FooterDisclaimer from '@Components/Footer/FooterDisclaimer';
import FooterAppDownload from '@Components/Footer/FooterAppDownload';
import FooterHotDigital from '@Components/Footer/FooterHotDigital';
import FooterHotDigitalLogo from '@Components/Footer/FooterHotDigitalLogo';

const FooterDesktop = () => {
    return (
        <React.Fragment>
            <footer>
                <BoxDivider />
                <Typography variant='h4' fontSize={16} >
                    Approved Wagering Provider
                </Typography>
                <Card sx={{ bgcolor: "white.main", py: 2, mt: 2 }}>
                    <CardContent sx={{ py: 0 }}>
                        <Stack direction="row" spacing={2} sx={{ bgcolor: "white.main" }}>
                            {
                                WAGERING_IMAGES.map((item, idx) =>
                                    <img src={`/images/footer/${item.file}`} height="40" alt={item.label} key={idx} />
                                )
                            }
                        </Stack>
                    </CardContent>
                </Card>
                <Typography variant='h4' fontSize={16} mt={2}>
                    EliteBet is Powered By:
                </Typography>
                <Card sx={{ bgcolor: "white.main", py: 2, mt: 2 }}>
                    <CardContent sx={{ py: 0 }}>
                        <Stack direction="row" spacing={2} sx={{ bgcolor: "white.main" }}>
                            {
                                BANKING_IMAGES.map((item, idx) =>
                                    <img src={`/images/footer/${item.file}`} height="30" alt={item.label} key={idx} />
                                )
                            }
                        </Stack>
                    </CardContent>
                </Card>
                <Box sx={{ bgcolor: "secondary.main", p: 2, mt: 2 }}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        {
                            FOOTER_LINKS.map((item, idx) =>
                                <Link href={item.link} key={idx}>
                                    <Typography color="text.active" fontSize={14} fontWeight="bold" sx={{ cursor: "pointer" }}>
                                        {item.label}
                                    </Typography>
                                </Link>
                            )
                        }
                    </Stack>
                    <Grid container columnSpacing={2} sx={{ color: "text.active", mt: 2 }}>
                        <Grid container item xs={6} >
                            <Box sx={{ ml: 3, mb: 2, mt: 1 }}>
                                <Footer18Plus />
                            </Box>
                            <FooterDisclaimer />
                        </Grid>
                        <Grid container item xs={2} ></Grid>
                        <Grid item xs={4} container justifyContent="flex-end">
                            <FooterAppDownload />
                            <FooterHotDigital />
                        </Grid>
                        <Grid container item xs={12} >
                            <FooterHotDigitalLogo />
                        </Grid>
                    </Grid>
                </Box>
            </footer>
        </React.Fragment >
    );
};

export default FooterDesktop;