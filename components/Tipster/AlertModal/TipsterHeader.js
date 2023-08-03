import React, { useContext, useState } from 'react';
import { Box, Grid, Avatar, Typography, MenuItem, Select, Stack, Button, IconButton } from '@mui/material';
import AvatarUpload from '@Components/Avatar/AvatarUpload';
import { kFormatter } from '@Components/utils/util';
import SelectRaceType from '@Components/Tipster/SelectRaceType';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloseIcon from '@mui/icons-material/Close';

function TipsterHeader({ tipster, isUser, isProTipster, onClose }) {
    let imgsrc = '';
    let bg_imgsrc = '';

    const [selectedType, setselectedType] = useState(tipster?.RACETYPE ? tipster?.RACETYPE : 'R');

    if (tipster) {
        imgsrc =
            tipster.GROUP != null && tipster.GROUP != ''
                ? `${process.env.cdn}/images/AffiliateLogo/T-${tipster.GROUP.replace(/ /g, '-')}.png`
                : `${process.env.cdn}/images/AffiliateLogo/Horse-Racing-shoe.png`;
        bg_imgsrc = isProTipster ? `/images/races/pro_tips.png` : `/images/races/free_tips.png`;
    }

    const handleOnClickType = (key) => (event) => {
        setselectedType(key);
    };

    const secondaryImg = `/images/gto/pro-tipsters-bg.png`;
    return (
        <Box
            sx={{
                background: `url(${bg_imgsrc}) no-repeat`,
                height: '215px',
                backgroundSize: '100% 100%',
            }}
        >
            <Box>
                <Box sx={{ position: 'absolute', top: 0, lineHeight: 1, width: '100%', mt: 1.5 }}>
                    <Box sx={{ position: 'absolute', top: 0, right: 0, pr: 1 }}>
                        <IconButton onClick={() => onClose(false)}>
                            <CloseIcon color="white" />
                        </IconButton>
                    </Box>
                    <Stack alignItems={'center'} sx={{ lineHeight: 1 }}>
                        <Typography
                            component={'p'}
                            color={isProTipster ? 'yellow.secondary' : 'white.main'}
                            fontSize={22}
                            fontWeight="bold"
                        >
                            TIP ALERTS
                        </Typography>
                        <Stack direction={'row'} sx={{ mt: -1, alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ transform: 'rotate(-20deg)', mr: 0.5 }}>
                                <NotificationsActiveIcon size="small" color={isProTipster ? 'yellow' : 'white'} />
                            </Box>
                            <Typography sx={{ fontSize: 14, color: 'white.main', fontWeight: 'bold' }}>
                                Get alerts when tips drop
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>

                <Box sx={{ zIndex: 9 }}>
                    <Box sx={{ width: '100%', pt: '50px' }}>
                        <AvatarUpload
                            image={tipster.AVATARPATH.length > 0 ? `${process.env.cdn}/images/avatar/${tipster.AVATARPATH}` : undefined}
                            dimensions={{ width: 75, height: 75 }}
                            showUpdate={false}
                            userID={'12345'}
                            avatarPos="AvatarUploadPos"
                            iconAction={false}
                            isProTipster={isProTipster}
                        />
                        <Grid item xs className="textAlignCoulmnCenter" mt={3}>
                            {tipster.ROLES == 'PROTIP' || tipster.MEDIA == '1' ? (
                                <Typography
                                    fontSize={14}
                                    fontWeight="bold"
                                    sx={{}}
                                    color={isProTipster ? 'yellow.secondary' : 'white.main'}
                                >
                                    {tipster.FIRSTNAME} {tipster.SURNAME}
                                </Typography>
                            ) : (
                                <Typography fontSize={14} fontWeight="bold" color={'white.main'}>
                                    {tipster.ALIAS}
                                </Typography>
                            )}
                            <Typography component="p" fontSize={10} color={'white.main'}>
                                TIPSTER | {tipster.STATE}
                            </Typography>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default TipsterHeader;
