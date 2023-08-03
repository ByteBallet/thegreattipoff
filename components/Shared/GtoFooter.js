import { FOOTER_LINKS_SOCIL_MEDIA } from '@lib/constants';
import { Box, useMediaQuery, Container, Stack, Typography } from '@mui/material';
import { getFooterContent } from '@services/Home/homeService';
import Link from 'next/Link';
import React, { useEffect, useState } from 'react';
import FooterCategories from './FooterCategories';
import Image from 'next/image';

const GtoFooter = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [footer, setfooter] = useState([])
    useEffect(() => {
        const getFooterData = async () => {
            let body = {}
            const resp = await getFooterContent(body)
            setfooter(resp?.data?.footer)
        }
        getFooterData()
    }, [])

    return (
        <footer>
            <Box sx={{ bgcolor: "footer.main", py: 8 }}>
                <Stack direction="row" spacing={2} justifyContent={"center"} alignItems="center" sx={{ mb: 2, py: 4, bgcolor: "secondary.button" }}>
                    {
                        FOOTER_LINKS_SOCIL_MEDIA.map((item, idx) =>
                            <Box key={idx}>
                                <Link href={item.link} >
                                    <Image src={item.src} alt={item.src} width={40} height={40} alt={item.label} style={{ cursor: "pointer" }} priority={false} />
                                </Link>
                            </Box>
                        )}
                </Stack>
                <Container fixed disableGutters>
                    <FooterCategories footer={footer} />
                    <Box sx={{ color: "footer.text1", dispaly: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, my: 3, width: "90%", mx: "auto" }}>
                        <Stack direction="column" justifyContent={"center"} alignItems="center" >
                            <Typography color="inherit" fontSize={"inherit"} align="center">
                                Live Chat Support Hours
                            </Typography>
                            <Typography color="inherit" fontSize={"inherit"} align="center">
                                Mon-Fri: 9am to 5:30pm Sat: 9am to 5pm  Sun: Closed
                            </Typography>
                        </Stack>
                        <Stack direction="column" justifyContent={"center"} alignItems="center" sx={{ my: 3 }}>
                            <Typography color="inherit" fontSize={"inherit"} align="center">
                                Copyright &copy; 2023 S93
                            </Typography>
                            <Link href="/">
                                <Typography sx={{ color: "white.main", cursor: "pointer" }} fontSize={"inherit"} fontWeight="bold">
                                    thegreattipoff.com
                                </Typography>
                            </Link>
                        </Stack>
                        <Stack direction="column" justifyContent={"center"} alignItems="center" sx={{ my: 4 }}>
                            <Typography color="white.main" fontSize={16} align="center" fontWeight={"bold"}>
                                What are you really gambling with?
                            </Typography>
                            <Box sx={{ lineHeight: 1.2, textAlign: "center", mt: 2 }}>
                                <Typography color={"white.main"} fontSize={14} fontStyle={"italic"} align="center">For free and confidential support call 1800 858 858 or visit&nbsp;</Typography>
                                <a href="http://gamblinghelponline.org.au" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                                    <Typography color={"white.main"} fontStyle={"italic"} fontSize={14} align="center"
                                        sx={{
                                            textDecorationColor: "white.main",
                                            textDecoration: "underline"
                                        }}>
                                        gamblinghelponline.org.au
                                    </Typography></a>
                            </Box>
                        </Stack>
                        <Stack direction="column" spacing={2} justifyContent={"center"} alignItems="center">
                            <Typography color="inherit" fontSize={"inherit"} align="center">
                                Gamble Responsibly. Stay in Control. For gambling help call <b>1800 858 858</b> or your local State gambling helpline,
                                Gamblers Help, Mission Australia or visit&nbsp;
                                <a href="https://www.gamblinghelponline.org.au/" target="_blank" style={{ cursor: "pointer" }} rel="noreferrer">
                                    www.gamblinghelponline.org.au
                                </a>.
                                Users must be at least 18 years old.
                            </Typography>
                            <Typography color="inherit" fontSize={"inherit"} align="center">
                                TheGreatTipOff - Australia&apos;s racing tips hub, tip results & stats  (the &quot;site&quot;) is not a bookmaking or wagering website.
                                As such the site does not provide bookmaking or wagering services. We are a tipping and information service site.
                                If you choose to take tips or use information on this website, you acknowledge and agree that you will
                                only wager with licensed service providers for your jurisdiction.
                                For help call 1800 858 858 or visit Gambling Help Online .
                                Our full <Link href="/help/terms">Terms and Conditions</Link> are listed here.
                            </Typography>
                            <Typography color="inherit" fontSize={"inherit"} align="center">
                                TheGreatTipOff - Australia&apos;s racing tips hub, tip results & stats  is not associated or affiliated with,
                                or in any way related to, any of the media companies listed on this site.
                            </Typography>
                        </Stack>
                    </Box>
                </Container>
            </Box >
        </footer >
    );
};

export default GtoFooter;