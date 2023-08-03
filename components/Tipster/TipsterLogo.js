import { Box, Avatar, SvgIcon } from '@mui/material';
import shortLogo from '@public/images/svg/logo-short-gto.svg';
import { useState } from 'react';

function TipsterLogo({ tipster, isProTipster = false, isMenu = false }) {
    let imgsrc = '';
    const [hideImage, setHideImage] = useState(false);
    let fallbackSrc = `${process.env.cdn}/images/AffiliateLogo/Horse-Racing-shoe.png`;
    if (tipster) {
        imgsrc =
            tipster.GROUP != null && tipster.GROUP != ''
                ? `${process.env.cdn}/images/AffiliateLogo/T-${tipster.GROUP.replace(/ /g, '-')}.png`
                : fallbackSrc;
        if (isProTipster) {
            imgsrc = `${process.env.cdn}/images/logo/logo-short.svg`;
        }
    }

    function GTOLogoShort() {
        return (
            <SvgIcon
                component={shortLogo}
                viewBox={'0 0 397.1 405.21'}
                sx={{
                    fontSize: 50,
                    color: 'white',
                }}
            />
        );
    }
    if (tipster.GROUP == 'the Great Tip Off' && !isProTipster) {
        imgsrc = `${process.env.cdn}/images/AffiliateLogo/T-GTO.png`;
        // imgsrc = `${process.env.cdn}/images/AffiliateLogo/T-GTO.png`;
    }
    return (
        <Box>
            {tipster.ROLES == 'PROTIP' || (tipster.MEDIA == '1' && !isProTipster) ? (
                <Avatar src={imgsrc}
                    alt={tipster.GROUP}
                    variant="rounded"
                    sx={{ width: isMenu ? 40 : isProTipster ? 50 : 60, height: isMenu ? 40 : isProTipster ? 40 : 60, bgcolor: "transparent" }}
                >
                    <Avatar src={fallbackSrc}
                        alt={tipster.GROUP}
                        variant="rounded"
                        sx={{ width: isMenu ? 40 : 60, height: isMenu ? 40 : 60, bgcolor: "transparent" }}
                    />
                </Avatar>
            ) : isProTipster ? (
                <Avatar src={imgsrc} alt={tipster.GROUP} variant="rounded" sx={{ width: isMenu ? 40 : 50, height: isMenu ? 40 : 40 }} />
            ) : tipster.PROTIPPER == '1' ? (
                <Avatar src={`${process.env.cdn}/images/AffiliateLogo/T-Pro.png`} alt={"PRO"} variant="rounded" sx={{ width: isMenu ? 40 : 60, height: isMenu ? 40 : 60 }} />
            ) : (
                <Avatar src={`${process.env.cdn}/images/AffiliateLogo/T-Punter.png`} alt={"PUNTER"} variant="rounded" sx={{ width: isMenu ? 40 : 60, height: isMenu ? 40 : 60 }} />
            )}
        </Box>
    );
}

export default TipsterLogo;
