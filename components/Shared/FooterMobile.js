import Footer18Plus from '@Components/Footer/Footer18Plus';
import FooterAppDownload from '@Components/Footer/FooterAppDownload';
import FooterDisclaimer from '@Components/Footer/FooterDisclaimer';
import FooterHotDigital from '@Components/Footer/FooterHotDigital';
import FooterHotDigitalLogo from '@Components/Footer/FooterHotDigitalLogo';
import { BANKING_IMAGES, FOOTER_LINKS, WAGERING_IMAGES } from '@lib/constants';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/Link';
import React from 'react';

const isGTO = process.env.APP_BRAND == 'gto';

const FooterMobile = () => {
    return (
        <Box>
            <footer>
                {!isGTO && (
                    <>
                        <Typography variant="h4" fontSize={16} align="center">
                            Approved Wagering Provider
                        </Typography>
                        <Card sx={{ bgcolor: 'white.main', py: 2, mt: 2 }}>
                            <CardContent sx={{ p: 0 }}>
                                <Box sx={{ bgcolor: 'white.main', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {WAGERING_IMAGES.map((item, idx) => (
                                        <img
                                            src={`/images/footer/${item.file}`}
                                            height="40"
                                            alt={item.label}
                                            key={idx}
                                            style={{ marginRight: 25, marginBottom: 10 }}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                        <Typography variant="h4" fontSize={16} mt={2} align="center">
                            EliteBet is Powered By:
                        </Typography>
                        <Card sx={{ bgcolor: 'white.main', py: 2, mt: 2 }}>
                            <CardContent sx={{ py: 0 }}>
                                <Box sx={{ bgcolor: 'white.main', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {BANKING_IMAGES.map((item, idx) => (
                                        <img
                                            src={`/images/footer/${item.file}`}
                                            height="30"
                                            alt={item.label}
                                            key={idx}
                                            style={{ marginRight: 25, marginBottom: 10 }}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </>
                )}
                <Box sx={{ bgcolor: 'secondary.main', p: 2, mt: 2 }}>
                    <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                        {FOOTER_LINKS.map((item, idx) => (
                            <Link href={item.link} key={idx}>
                                <Typography color="text.active" fontSize={14} fontWeight="bold" sx={{ cursor: 'pointer' }}>
                                    {item.label}
                                </Typography>
                            </Link>
                        ))}
                    </Stack>
                    <Grid container columnSpacing={2} sx={{ color: 'text.active', mt: 2 }}>
                        <Grid container item xs={6}>
                            <Box sx={{ ml: 3, mb: 2, mt: 1 }}>
                                <Footer18Plus />
                            </Box>
                            <FooterDisclaimer />
                        </Grid>
                        <Grid container item xs={2}></Grid>
                        <Grid item xs={4} container justifyContent="flex-end" alignItems="flex-end">
                            <FooterHotDigital />
                        </Grid>
                        <Grid container item xs={12} sx={{ mt: 3 }}>
                            <FooterHotDigitalLogo />
                        </Grid>
                    </Grid>
                </Box>
            </footer>
        </Box>
    );
};

export default FooterMobile;
