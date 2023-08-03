import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Avatar, Typography, MenuItem, Select, Stack, Button, useMediaQuery } from '@mui/material';
import TipsterTabs from './TipsterTabs';
import AvatarUpload from '@Components/Avatar/AvatarUpload';
import { UserContext } from '@Context/User/UserProvider';
import IconGroup from '@modules/HotBets/Components/IconGroup';
import FollowButton from './FollowButton';
import CustomDialog from '@Components/Shared/CustomDialog';
import Promote from '@Components/user/Promote';
import { kFormatter } from '@Components/utils/util';
import SelectRaceType from '@Components/Tipster/SelectRaceType';
import TipsterLogo from './TipsterLogo';
import { useRouter } from 'next/router';
import { getHBTipster } from '@services/hotbets/hotbetsService';

const TipsterHome = ({ tipster, ntips, nearnings, isUser, selectedCategory, HBMarket, page, isProTipster, isShare, setHBMarket }) => {
    const router = useRouter();
    const style = (theme) => ({
        [theme.breakpoints.down('md')]: {
            bottom: 55,
        },
        [theme.breakpoints.up('md')]: {
            bottom: 55,
        },
        width: 1,
        height: 25,
        bgcolor: isProTipster ? '#141821' : '#301235',
        position: 'relative',
        opacity: 0.7,
        zIndex: 1,
    });

    const { user } = useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    const [hideIcon, sethideIcon] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let imgsrc = '';
    let bg_imgsrc = '';

    const [defaultRaceTypes, setdefaultRaceType] = useState(tipster?.DEFAULTRACETYPE);
    const [selectedType, setselectedType] = useState(router?.query?.rtype || defaultRaceTypes?.[0]);

    if (tipster) {
        imgsrc =
            tipster.GROUP != null && tipster.GROUP != ''
                ? `${process.env.cdn}/images/AffiliateLogo/T-${tipster.GROUP.replace(/ /g, '-')}.png`
                : `${process.env.cdn}/images/AffiliateLogo/Horse-Racing-shoe.png`;
        bg_imgsrc = isProTipster ? `/images/races/home-bg-pro-${selectedType}.png` : `/images/races/home-bg-${selectedType}.png`;
    }

    const handleOnClickType = (key) => (event) => {
        setselectedType(key);
    };

    const getTipsterDetails = async () => {
        const response = await getHBTipster(user?.userID, tipster.ALIAS, tipster?.USERID, selectedType);
        setHBMarket(response?.data?.HBMarket);
    };

    useEffect(() => {
        getTipsterDetails()
    }, [selectedType])


    const secondaryImg = `/images/gto/pro-tipsters-bg.png`;
    return (
        <React.Fragment>
            {tipster && (
                <Box sx={{ width: 1 }}>
                    <Box sx={{ width: 1, bgcolor: isProTipster ? '#141821' : '#f0f1f2' }}>
                        <Box
                            sx={{
                                background: `url(${bg_imgsrc}) no-repeat`,
                                height: '160px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                backgroundSize: 'cover',
                            }}
                        >
                            <Grid container alignItems={'end'} justifyContent="space-between">
                                <Grid item xs container justifyContent={'center'}>
                                    {tipster?.FOLLOWERS > 0 && (
                                        <Typography sx={{ lineHeight: 1, mb: 4, zIndex: 9 }} color="white.main" noWrap align="center">
                                            <Typography component={'span'} color={isProTipster ? 'yellow.secondary' : 'white.main'}>
                                                <b>{kFormatter(tipster?.FOLLOWERS || 0)}</b>{' '}
                                            </Typography>
                                            <small style={{ opacity: 0.6 }}>{tipster?.FOLLOWERS && 'Followers'}</small>
                                        </Typography>
                                    )}
                                </Grid>

                                <Grid item xs container sx={{ zIndex: 9 }}>
                                    <AvatarUpload
                                        image={
                                            tipster.AVATARPATH.length > 0
                                                ? `${process.env.cdn}/images/avatar/${tipster.AVATARPATH}`
                                                : undefined
                                        }
                                        dimensions={{ width: 110, height: 110 }}
                                        showUpdate={false}
                                        userID={user?.userID}
                                        avatarPos="AvatarUploadPos"
                                        iconAction={isUser ? true : false}
                                        isProTipster={isProTipster}
                                    />
                                </Grid>
                                <Grid item xs container justifyContent={'center'} sx={{ zIndex: 9 }}>
                                    <Box mb={3}>
                                        {isUser ? (
                                            <Button
                                                size="small"
                                                onClick={handleOpen}
                                                variant="contained"
                                                sx={{
                                                    width: 'auto',
                                                    borderRadius: 10,
                                                    mr: 1,
                                                    minWidth: 'auto',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    bgcolor: 'white.main',
                                                    '&:hover': {
                                                        bgcolor: 'black.main',
                                                        color: 'white.main',
                                                    },
                                                }}
                                            >
                                                <Typography fontSize={14} color={'black.main'} fontWeight="600">
                                                    Get Follows
                                                </Typography>
                                            </Button>
                                        ) : (
                                            <FollowButton
                                                isProTipster={isProTipster}
                                                follow={tipster?.FOLLOWING}
                                                tipster={tipster.ALIAS}
                                                tipsterid={tipster?.USERID}
                                            />
                                        )}
                                    </Box>
                                </Grid>
                                {/* <Grid item xs={12}>
                                <Box sx={style}></Box>
                            </Grid> */}
                            </Grid>
                        </Box>
                        <Box sx={style}></Box>
                    </Box>
                    <Box
                        sx={
                            isProTipster
                                ? {
                                    background: `url(${secondaryImg}) no-repeat`,
                                    height: '90px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundSize: 'cover',
                                    width: 1,
                                    position: 'relative',
                                    top: -20,
                                }
                                : {
                                    height: '75px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundSize: 'cover',
                                }
                        }
                    >
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs={2} pl={2}>
                                <TipsterLogo tipster={tipster} isProTipster={isProTipster} />
                            </Grid>
                            <Grid item xs className="textAlignCoulmnCenter">
                                {tipster.ROLES == 'PROTIP' || tipster.MEDIA == '1' ? (
                                    <Typography
                                        variant="h1"
                                        fontWeight="bold"
                                        sx={{ lineHeight: 1, mt: 2 }}
                                        color={isProTipster ? 'yellow.secondary' : 'black.main'}
                                    >
                                        {tipster.FIRSTNAME} {tipster.SURNAME}
                                    </Typography>
                                ) : (
                                    <Typography fontWeight="bold" variant="h1" sx={{ fontSize: 18 }} color={isProTipster ? 'yellow.secondary' : 'black.main'}>
                                        {tipster.ALIAS}
                                    </Typography>
                                )}
                                <Typography component="p" fontSize={14} color={isProTipster ? 'grey.main' : 'black.main'}>
                                    {tipster?.TIPSTERORG} | {tipster.STATE}
                                </Typography>
                            </Grid>
                            <Grid container item xs={2} justifyContent="flex-end" mr={1}>
                                <Box
                                    sx={{
                                        zIndex: 5,
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        color: 'black.main',
                                    }}
                                >
                                    {
                                        !hideIcon &&
                                        <SelectRaceType
                                            selectedType={selectedType}
                                            setselectedType={setselectedType}
                                            isProTipster={isProTipster}
                                            defaultRaceTypes={isProTipster ? ['R'] : defaultRaceTypes}
                                        />
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                    </Box>
                    <TipsterTabs
                        selectedType={selectedType}
                        tipster={tipster}
                        ntips={ntips}
                        nearnings={nearnings}
                        selectedCategory={selectedCategory}
                        HBMarket={HBMarket}
                        page={page}
                        isProTipster={isProTipster}
                        isShare={isShare}
                        sethideIcon={sethideIcon}
                    />
                </Box>
            )}
            <CustomDialog
                id={'promote'}
                open={open}
                title={''}
                content={<Promote onParentClose={handleClose} userid={tipster?.USERID} open={open} />}
                fullScreen={true}
                showX
                onClose={handleClose}
            />
        </React.Fragment>
    );
};

export default TipsterHome;
