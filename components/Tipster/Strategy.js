import React, { useContext, useEffect, useRef, useState } from 'react';
import authAPI from '@Components/utils/authAPI';
import { Box, Grid, TextField, MenuItem, Select, Typography, Button, ListSubheader } from '@mui/material';
import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import { useFormik } from 'formik';
import moment from 'moment';
import CustomALert from '@Components/Shared/CustomALert';
import { getAllRaceTracks, gettiptacticsMenu, getUserBio } from '@services/tipster/tipsterService';
import { UserContext } from '@Context/User/UserProvider';
import { toTitleCase } from '@utils/hotBetUtils';

const Strategy = ({ tipster, selectedType, isUser }) => {
    const { user } = useContext(UserContext)
    const [strategy, setstrategy] = useState([]);
    const [tactics, settactics] = useState();
    const [tracks, settracks] = useState();
    const [status, setstatus] = useState();
    const initForm = useRef({})

    const getUserStrategy = async () => {
        let body = { userid: tipster?.USERID };
        const response = await getUserBio(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            //setstrategy(response?.data?.details)
            let data = response?.data?.details?.[0];
            if (data) {
                let val = {
                    favcourse: data?.FAVCOURSE?.length > 0 ? data?.FAVCOURSE?.toLowerCase() : '',
                    tiptactic: data?.TACTICS,
                    oddsInfluence: 0,
                    stratrace: data?.STRATSELECT,
                    stratstake: data?.STRATSTAKE,
                    betmotto: data?.BETMOTTO,
                    profileBIO: data?.BIO,
                    tipcareerstart: data?.TIPCAREERSTART,
                    joindate: moment(data?.JOINDATE).format('YYYY-MM-DD HH:mm:ss'),
                    favpub: data?.FAVPUB,
                    favclub: data?.FAVCLUB,
                    stratracetype: data?.STRATRACETYPE,
                }
                setinitValues(val);
                initForm.current = val
            }
        }
    };
    const gettiptactics = async () => {
        let body = { userid: tipster?.USERID };
        const response = await gettiptacticsMenu(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            settactics(response?.data?.tactics);
        }
    };

    const getRaceTracks = async () => {
        let body = { userid: tipster?.USERID, racetype: selectedType, group: true };
        const response = await getAllRaceTracks(body);
        if (!response.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
            settracks(response?.data);
        }
    };

    useEffect(() => {
        gettiptactics();
        getUserStrategy();
        getRaceTracks();
    }, []);

    let dispname = tipster.ROLES == 'PROTIP' || tipster.MEDIA == '1' ? tipster.FIRSTNAME + ' ' + tipster.SURNAME : tipster.ALIAS;
    let initData = {
        favcourse: '',
        tiptactic: 0,
        oddsInfluence: 0,
        stratrace: '',
        stratstake: '',
        betmotto: '',
        profileBIO: '',
        tipcareerstart: '',
        joindate: '',
        favpub: '',
        favclub: '',
        stratracetype: '',
    };
    const [initValues, setinitValues] = useState(initData);
    const formik = useFormik({
        initialValues: initValues,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const url = `${process.env.server}/user/UpdateBio`;
            const resp = await authAPI(url, { userid: tipster?.USERID, formval: values }, 'POST', true);
            if (resp && !resp.error && resp.data) {
                if (resp?.ERROBJ?.ERRORCODE > 0 || !resp?.data?.success) {
                    setstatus({
                        type: 'error',
                        message: 'Strategy update failed. Please try again.',
                    });
                } else {
                    setstatus({
                        type: 'success',
                        message: 'Strategy saved successfully.',
                    });
                }
            } else {
                setstatus({
                    type: 'error',
                    message: 'Strategy update failed. Please try again.',
                });
            }
        },
    });

    const renderTracks = (label) => {
        return [
            <ListSubheader key={label}>{label}</ListSubheader>,
            tracks?.[label.replace(/ /g, '_')]?.map((item, i) => (
                <MenuItem key={`${item}-${i}`} value={item?.RACEMEET?.toLowerCase()}>
                    <Typography className="textCapitalize" fontSize={14}>
                        {item?.RACEMEET?.toLowerCase()}
                    </Typography>
                </MenuItem>
            )),
        ];
    };
    let hideStrategyBox = !isUser || !user?.userID
    const renderTextValue = (text) => {
        return <Typography component={"p"} color='grey.dark' fontSize={13} p={1}
            sx={{
                bgcolor: 'grey.sportsOdds',
                border: 1,
                borderColor: 'grey.light',
                borderRadius: 1,
                px: 2, py: 1, width: 1, mb: 1
            }}
        >
            {text}
        </Typography>
    }
    const renderTracksBox = (showText) => {
        return <React.Fragment>
            <Typography
                sx={{
                    mb: 1,
                    fontSize: 14,
                }}
                component="p"
            >
                Favourite track?
            </Typography>
            {
                !showText ?
                    <Select
                        disabled={!isUser || !user?.userID}
                        displayEmpty
                        value={formik.values.favcourse}
                        onChange={formik.handleChange}
                        sx={styles.textFieldStyle}
                        size="small"
                        id="favcourse"
                        name="favcourse"
                        fullWidth
                        MenuProps={{
                            transitionDuration: 0,
                            PaperProps: {
                                style: {
                                    maxHeight: '40vh',
                                },
                            },
                        }}
                    >
                        <MenuItem value={''}>
                            <Typography className="textCapitalize" fontSize={14}>
                                Select Track
                            </Typography>
                        </MenuItem>
                        {tracks && tracks.groups.map((group, idx) => renderTracks(group))}
                    </Select> :
                    renderTextValue(toTitleCase(formik.values.favcourse))
            }
        </React.Fragment>
    }
    const renderFormBox = (showText) => {
        return <React.Fragment>
            <Typography
                sx={{
                    mb: 1,
                    fontSize: 14,
                }}
                component="p"
            >
                What factor is most important for you when doing the form?
            </Typography>
            {
                !showText ?
                    <Select
                        disabled={!isUser || !user?.userID}
                        value={formik.values.tiptactic}
                        onChange={formik.handleChange}
                        sx={styles.textFieldStyle}
                        size="small"
                        id="tiptactic"
                        name="tiptactic"
                        fullWidth
                        MenuProps={{
                            transitionDuration: 0,
                            PaperProps: {
                                style: {
                                    maxHeight: '40vh',
                                },
                            },
                        }}
                    >
                        <MenuItem value={0}>
                            <Typography className="textCapitalize" fontSize={14}>
                                Select factor
                            </Typography>
                        </MenuItem>
                        {tactics &&
                            tactics.map((item, idx) => (
                                <MenuItem key={`${item}-${idx}`} value={item?.ID}>
                                    <Typography className="textCapitalize" fontSize={14}>
                                        {item?.TACTICS}
                                    </Typography>
                                </MenuItem>
                            ))}
                    </Select> :
                    renderTextValue(tactics?.filter((item) => item?.ID == formik.values.tiptactic)?.[0]?.TACTICS)

            }
        </React.Fragment>
    }
    const renderRaceBox = (showText) => {
        return <React.Fragment>
            <Typography
                sx={{
                    mb: 1,
                    fontSize: 14,
                }}
                component="p"
            >
                Outline how you select your tips & which races to bet in
            </Typography>
            {!showText ?
                <TextField
                    disabled={!isUser || !user?.userID}
                    value={formik.values.stratrace}
                    onChange={formik.handleChange}
                    size="small"
                    sx={styles.textFieldStyle}
                    fullWidth
                    id="stratrace"
                    name="stratrace"
                    multiline
                    minRows={2}
                    placeholder="Add text here"
                    inputProps={{
                        maxLength: 300,
                    }}
                /> :
                renderTextValue(formik.values.stratrace)
            }
        </React.Fragment>
    }
    const renderStakeBox = (showText) => {
        return <React.Fragment>
            <Typography
                sx={{
                    mb: 1,
                    fontSize: 14,
                }}
                component="p"
            >
                Outline your staking strategy - how do you determine the size of your bets or weight of your tips?
            </Typography>
            {!showText ?
                <TextField
                    disabled={!isUser || !user?.userID}
                    value={formik.values.stratstake}
                    onChange={formik.handleChange}
                    size="small"
                    sx={styles.textFieldStyle}
                    fullWidth
                    id="stratstake"
                    name="stratstake"
                    multiline
                    minRows={2}
                    placeholder="Add text here"
                    inputProps={{
                        maxLength: 300,
                    }}
                /> :
                renderTextValue(formik.values.stratstake)
            }
        </React.Fragment>
    }
    const renderBetBox = (showText) => {
        return <React.Fragment>
            <Typography
                sx={{
                    mb: 1,
                    fontSize: 14,
                }}
                component="p"
            >
                What&apos;s your betting motto?
            </Typography>
            {!showText ?
                <TextField
                    disabled={!isUser || !user?.userID}
                    value={formik.values.betmotto}
                    onChange={formik.handleChange}
                    size="small"
                    sx={styles.textFieldStyle}
                    fullWidth
                    id="betmotto"
                    name="betmotto"
                    multiline
                    minRows={2}
                    placeholder="Add text here"
                    inputProps={{
                        maxLength: 300,
                    }}
                /> :
                renderTextValue(formik.values.betmotto)
            }
        </React.Fragment>
    }
    const renderAboutBox = (showText) => {
        return <React.Fragment>
            <Typography
                sx={{
                    mb: 1,
                    fontSize: 14,
                }}
                component="p"
            >
                Tell us about yourself
            </Typography>
            {!showText ?
                <TextField
                    disabled={!isUser || !user?.userID}
                    fullWidth
                    value={formik.values.profileBIO}
                    onChange={formik.handleChange}
                    size="small"
                    sx={styles.textFieldStyle}
                    id="profileBIO"
                    name="profileBIO"
                    multiline
                    minRows={2}
                    placeholder="Add text here"
                    inputProps={{
                        maxLength: 300,
                    }}
                /> :
                renderTextValue(<div
                    dangerouslySetInnerHTML={{
                        __html: formik.values.profileBIO,
                    }}
                />)
            }
        </React.Fragment>
    }
    return (
        <React.Fragment>
            <Box
                py={2}
                px={2}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                    formik.handleSubmit(e);
                }}
                sx={{ bgcolor: "white.main" }}
            >
                <CustomGridTitle title={`${dispname} Tipping Strategy`} />
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        {
                            hideStrategyBox ?
                                formik.values.favcourse?.length > 0 ?
                                    renderTracksBox(true) :
                                    null : renderTracksBox()
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        {
                            hideStrategyBox ?
                                formik.values.tiptactic?.length > 0 ?
                                    renderFormBox(true) :
                                    null : renderFormBox()
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        {
                            hideStrategyBox ?
                                formik.values.stratrace?.length > 0 ?
                                    renderRaceBox(true) :
                                    null : renderRaceBox()
                        }

                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        {
                            hideStrategyBox ?
                                formik.values.stratstake?.length > 0 ?
                                    renderStakeBox(true) :
                                    null : renderStakeBox()
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        {
                            hideStrategyBox ?
                                formik.values.betmotto?.length > 0 ?
                                    renderBetBox(true) :
                                    null : renderBetBox()
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={0} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                        {
                            hideStrategyBox ?
                                formik.values.profileBIO?.length > 0 ?
                                    renderAboutBox(true) :
                                    null : renderAboutBox()
                        }

                    </Grid>
                </Grid>
                {
                    isUser && user?.userID &&
                    <Grid container spacing={0} sx={{ my: 2 }}>
                        <Grid item xs={12}>
                            <Button
                                disabled={JSON.stringify(formik?.values) === JSON.stringify(initForm?.current)}
                                color="success"
                                variant="contained"
                                type="submit"
                                sx={{
                                    width: 1,
                                }}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                }

                {status && (
                    <Box sx={{ my: 2 }}>
                        <CustomALert content={status.message} severity={status.type} warning={false} isHtml={false} />
                    </Box>
                )}
            </Box>
        </React.Fragment>
    );
};

const styles = {
    textFieldStyle: {
        backgroundColor: 'grey.joinField',
        borderRadius: 2,
        mx: 0,

        '& input::placeholder': {
            fontSize: '13px',
        },
        '& textarea::placeholder': {
            fontSize: '13px',
        },
        '& textarea': {
            fontSize: 14,
        },
        [`& fieldset`]: {
            borderColor: 'grey.joinBorder',

            borderRadius: 2,
            '&.focused': {
                borderColor: 'red',
            },
        },

        fontSize: 14,
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                backgroundColor: 'white.main',
            },
        },
    },
};

export default Strategy;
