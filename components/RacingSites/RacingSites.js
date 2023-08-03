import React, { useState } from 'react';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

import AvatarUpload from '@Components/Avatar/AvatarUpload';
import SelectRaceType from '@Components/Tipster/SelectRaceType';

import RacingTabs from './RacingTabs';
import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';



const RacingSites = ({ profileDetails }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [openBetSlip, setopenBetSlip] = useState(false)
    const [selectedType, setselectedType] = useState('R');
    const [hideIcon, sethideIcon] = useState(false)
    const TopProfile = () => {
        return (
            <Box
                sx={{
                    background: `url(${`/images/races/racing-site-banner-${selectedType}.png`}) no-repeat`,
                    height: isDesktop ? 200 : "160px",
                    display: "flex",
                    alignItems: "flex-end",
                    backgroundSize: '100% 100%'
                }}>
                <Grid
                    container
                    alignItems={"end"}
                    justifyContent="space-between"
                >
                    <Grid item xs container sx={{ zIndex: 9 }}>
                        <AvatarUpload
                            image={
                                profileDetails?.logothumbnail ?
                                    `${process.env.cdn}/images/AffiliateLogo/${profileDetails?.logothumbnail}` :
                                    undefined
                            }
                            dimensions={{ width: 110, height: 110 }}
                            avatarPos="AvatarUploadPos"
                        />
                    </Grid>
                </Grid>
            </Box>)
    }

    const ProfileDetails = () => {
        return (
            <Box mt={2.5} mb={1}>
                <Grid container direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={2} pl={2} />
                    <Grid item xs className='textAlignCoulmnCenter'>
                        <Typography fontSize={20} fontWeight="bold">{profileDetails.sitename}</Typography>
                        <Typography component="p" fontSize={10}>Racing Broadcaster</Typography>
                    </Grid>
                    <Grid container item xs={2} justifyContent="flex-end" mr={1}>
                        <Box
                            sx={{
                                zIndex: 5,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                color: "black.main"
                            }}
                        >

                            {!hideIcon &&
                                <SelectRaceType
                                    selectedType={selectedType}
                                    setselectedType={setselectedType} />
                            }
                        </Box>

                    </Grid>
                </Grid>
            </Box>
        )
    }

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };
    const renderBio = () => {
        return <React.Fragment>
            <Box sx={{ paddingLeft: '20px', paddingTop: '30px' }}>
                <CustomGridTitle title={`About ${profileDetails.sitename}`} />
            </Box>
            <Grid className='tipsterBio' sx={{ p: 2, bgcolor: 'white.main', m: 2, borderRadius: '5px' }}>
                <div dangerouslySetInnerHTML={{ __html: profileDetails.intro }} />
            </Grid>
        </React.Fragment>
    }
    return (
        <React.Fragment>
            <Box>
                <TopProfile />
                <ProfileDetails />
                <RacingTabs
                    selectedType={selectedType}
                    siteId={profileDetails?.siteid}
                    isNewFeed={profileDetails?.feednew}
                    siteName={profileDetails?.sitename}
                    handleBetSlip={handleBetSlip}
                    setopenBetSlip={setopenBetSlip}
                    sethideIcon={sethideIcon}
                    renderBio={renderBio}
                />
            </Box>
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </React.Fragment >

    );
};

export default RacingSites;