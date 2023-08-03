import React from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Stack, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import BoxDivider from '../Shared/BoxDivider';
import CustomDialog from '../Shared/CustomDialog';
import Promote from './Promote';
import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import Link from 'next/Link';
import { getLink } from '@Components/utils/RacingUtil';

const UserTips = ({ tipster, selectedType }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box m={2}>
            <Box>
                <CustomGridTitle title="Get Tips" />
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <Grid container spacing={0} sx={{ pb: 2 }}>
                            <Link href={"/horse-racing-tips"}>
                                <Grid item xs={12} container justifyContent={'space-between'} alignItems="center" sx={{ cursor: "pointer" }}>
                                    <Typography fontSize={14}>Tips from Pro Punters</Typography>
                                    <KeyboardArrowRightOutlinedIcon />
                                </Grid>
                            </Link>
                            <Grid item xs={12}>
                                <BoxDivider />
                            </Grid>
                            <Link href="/horse-racing-tips?media=Free-Tips">
                                <Grid item xs={12} container justifyContent={'space-between'} alignItems="center" sx={{ cursor: "pointer" }}>
                                    <Typography fontSize={14}>
                                        Free Tips from popular Media Experts
                                    </Typography>
                                    <KeyboardArrowRightOutlinedIcon />
                                </Grid>
                            </Link>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
            <Box sx={{ my: 3 }}>
                <BoxDivider />
            </Box>
            <Box mb={4}>
                <CustomGridTitle title="Tip & Earn" />
                <Card sx={{ mt: 1 }}>
                    <CardContent className="slideritem">
                        <Grid container spacing={0} sx={{ pb: 2, cursor: "pointer" }}>
                            <Link href="/racing">
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justifyContent={'space-between'}
                                    alignItems="center"
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <Stack direction={'row'} alignItems="center">
                                        <Typography fontSize={14}>Enter Tips -</Typography>
                                        <Typography fontSize={14} color="primary">
                                            &nbsp;horses, harness and greys
                                        </Typography>
                                    </Stack>
                                    <KeyboardArrowRightOutlinedIcon />
                                </Grid>
                            </Link>
                            <Grid item xs={12}>
                                <BoxDivider />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                justifyContent={'space-between'}
                                alignItems="center"
                                onClick={handleOpen}
                                sx={{ cursor: 'pointer' }}
                            >
                                <Stack direction={'row'} alignItems="center">
                                    <Typography color="primary" fontWeight="bold" fontSize={14}>
                                        $
                                    </Typography>
                                    <Typography fontSize={14}>&nbsp;PROMOTE</Typography>
                                </Stack>
                                <KeyboardArrowRightOutlinedIcon />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <CustomDialog
                    id={'promote'}
                    open={open}
                    title={''}
                    content={<Promote onParentClose={handleClose} userid={tipster?.USERID} open={open} tipster={tipster} />}
                    fullScreen={false}
                    dialogbg="#3e0148"
                    dialogtextcolor="#000"
                    titlecolor="#000"
                    showX
                    onClose={handleClose}
                />
            </Box>
        </Box>
    );
};

export default UserTips;
