import React from 'react';
import { makeStyles } from '@mui/styles';
import { Stack, Typography, Box } from '@mui/material';
import { FOOTER_LINKS_SOCIL_MEDIA } from '@lib/constants';
import Link from 'next/Link';
import Image from 'next/image';

const useStyles = makeStyles({
    footerContainer: {
        backgroundColor: "#232323",
        paddingTop: '36px',
        marginTop: '12px'
    },
    socilMediaContainer: {
        backgroundColor: '#333333',
        height: '100px',
        width: '100%',
        marginBottom: '48px',
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: '#cccccc',
        textAlign: 'center'
    },
    whiteText: {
        color: '#ffff',
        textAlign: 'center'
    }

});

const GtoFooterDesktop = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <footer>
                <Box className={classes.footerContainer}>
                    <Stack direction="row" spacing={2} className={classes.socilMediaContainer}>
                        {
                            FOOTER_LINKS_SOCIL_MEDIA.map((item, idx) =>
                                <Box key={idx}>
                                    <Link href={item.link} >
                                        <Image src={item.src} width={40} height={40} alt={item.label} style={{ cursor: "pointer" }} priority={false} />
                                    </Link>
                                </Box>
                            )}
                    </Stack>
                    <Stack justifyContent={'center'}>
                        <Typography className={classes.text}>Live Chat Support Hours<br />Mon-Fri: 9am to 5:30pm Sat: 9am to 5pm </Typography>
                        <Box marginBottom={2} />
                        <Typography className={classes.text}>Copvright © 2023 S93</Typography>
                        <Typography className={classes.whiteText} > thegreattipoff.com</Typography>
                        <Box marginBottom={2} />
                        <Typography className={classes.text}>  Gamble Responsibly. Stay in Control. For gambling help call 1800 858 858 or your local State gambling helpline, Gamblers Help,<br />
                            Mission Australia or visit www.gamblinghelponline.org.au. Users must be at least 18 years old.</Typography>
                        <Box marginBottom={2} />
                        <Typography className={classes.text}>TheGreatTipOff.com (the &#34;site&#34;) is not a bookmaking or wagering website. As such the site does not provide bookmaking or wagering services.<br />
                            We are a tipping and information service site. If you choose to take tips or use information on this website, you acknowledge and agree that you will only wager with licensed<br />
                            service providers for your iurisdiction. For help call 1800 858 858 or visit www.gamblinghelponline org au. Our full Terms & Conditions are listed here.</Typography>
                        <Box marginBottom={2} />
                        <Typography className={classes.text}>TheGreatTipOff.com is not associated or affiliated with, or in any way related to, any of the media companies listed on this site.</Typography>
                        <Box marginBottom={12} />
                    </Stack>
                </Box>
            </footer>
        </React.Fragment >
    );
};

export default GtoFooterDesktop;
