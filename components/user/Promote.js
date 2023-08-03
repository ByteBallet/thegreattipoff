import { Box, Stack, Typography, Avatar, Button, Grid, CardContent, Card } from '@mui/material';
import React, { useState, useEffect } from 'react';
import BoxDivider from '../Shared/BoxDivider';
import Link from 'next/Link';
import { FormControl, TextField, InputAdornment } from "@mui/material";
import { useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { makeStyles } from "@mui/styles";
import authAPI from "../utils/authAPI";
import { proceedUserUpdateDetails } from '@lib/fetcher';
import { MyFormHelperText3 } from '@Components/Payments/Common/MyFormHelperText';

// custom style for placeholder text in input
const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: "14px",
            color: "grey.secondary"
        },
    },
});

const Promote = ({ userid, open, onParentClose }) => {
    const router = useRouter();
    const [result, setResult] = useState();
    const [session, loading] = useSession();
    const [values, setValues] = useState({
        instagram: "",
        twitter: "",
        facebook: ""
    });
    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
    };
    const refreshData = () => {
        router.reload();
    }
    const classes = useStyles();

    const updateSocialLinks = async (e) => {
        e.preventDefault();
        if (session) {
            try {
                let body = {
                    userid: userid,
                    twitter: values.twitter,
                    facebook: values.facebook,
                    instagram: values.instagram
                }
                const res = await proceedUserUpdateDetails(body);
                if (!res.error) {
                    if (res?.data?.ERROBJ?.ERRORCODE > 0) {
                        setResult({
                            status: 404,
                            msg: res?.data?.ERROBJ?.ERRORDESC,
                        });
                    } else {
                        setResult({
                            status: 200,
                            msg: 'Your details have been updated.',
                            title: 'Success!',
                        });
                    }
                } else {
                    setResult({
                        status: 404,
                        msg: res.desc,
                    });
                }
            } catch (error) {
                throw new Error(error);
            }
        } else {
            setResult({
                status: 404,
                msg: "Invalid Request",
            });
        }
    }

    useEffect(() => {
        async function getUserDetails() {
            const url = `${process.env.server}/user/getUserDetail`;
            const response = await authAPI(url, { userid: userid }, "POST", true);
            if (!response.error) {
                setValues({
                    instagram: response?.data?.user?.[0]?.INSTAGRAM,
                    twitter: response?.data?.user?.[0]?.TWITTERID,
                    facebook: response?.data?.user?.[0]?.FACEBOOK
                });
            }
        }
        open && getUserDetails()
    }, [open]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (result && result.status) {
                setResult();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [result]);

    return (
        <Card sx={{ bgcolor: "background.default", pb: 2 }}>
            <CardContent >
                <Typography variant="h1" color="primary" align="center">Promote</Typography>
                <Typography variant="subtitle2" align="center" color="text.default" fontWeight="normal" my={2}>Click the icons below and follow us on social media <b>to access latest news and exclusive promotions!</b></Typography>
                <Stack direction="row" spacing={2} justifyContent="center" my={2}>
                    <Link href="https://twitter.com/theGreatTipOff">
                        <a target="_blank">
                            <Avatar
                                src="/images/tools/twitter.png"
                                alt="Twitter"
                                variant="rounded"
                                sx={{ width: 50, height: 50, cursor: "pointer" }}
                            />
                        </a>
                    </Link>
                    <Link href="https://www.facebook.com/pages/The-Great-Tip-Off-theGreatTipOffcom/277267735303">
                        <a target="_blank">
                            <Avatar
                                src="/images/tools/facebook.png"
                                alt="Facebook"
                                variant="rounded"
                                sx={{ width: 50, height: 50, cursor: "pointer" }}
                            />
                        </a>
                    </Link>
                    <Link href="https://www.instagram.com/theGreatTipOff/">
                        <a target="_blank">
                            <Avatar
                                src="/images/tools/instagram.png"
                                alt="Instagram"
                                variant="rounded"
                                sx={{ width: 50, height: 50, cursor: "pointer" }}
                            />
                        </a>
                    </Link>
                </Stack>
                <BoxDivider />
                <Typography variant="subtitle2" align="center" color="text.default" fontWeight="normal" my={3}>
                    Let us know your social media usernames so we can <b>promote your tipping performance!</b>
                </Typography>
                <Box component="form" onSubmit={updateSocialLinks}>
                    <Grid container rowSpacing={0.5} columnSpacing={2}>
                        <Grid item xs={3}>
                            <Typography
                                variant="span"
                                component="p"
                                mt={2}
                            >
                                Twitter
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl variant="outlined" sx={{ my: 1, bgcolor: "text.active" }} fullWidth>
                                <TextField
                                    id="twitter-textfield"
                                    hiddenLabel
                                    value={values.twitter}
                                    size="small"
                                    classes={{ root: classes.customTextField }}
                                    onChange={handleChange("twitter")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">@</InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography
                                variant="span"
                                component="p"
                                mt={2}
                            >
                                Facebook
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl variant="outlined" sx={{ my: 1, bgcolor: "text.active" }} fullWidth>
                                <TextField
                                    id="facebook-textfield"
                                    hiddenLabel
                                    size="small"
                                    value={values.facebook}
                                    onChange={handleChange("facebook")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">facebook.com/</InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography
                                variant="span"
                                component="p"
                                mt={2}
                            >
                                Instagram
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl variant="outlined" sx={{ my: 1, bgcolor: "text.active" }} fullWidth>
                                <TextField
                                    id="input-with-icon-textfield"
                                    hiddenLabel
                                    size="small"
                                    value={values.instagram}
                                    onChange={handleChange("instagram")}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">@</InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        className="font20"
                        sx={{ mt: 3 }}
                        type="submit"
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="text"
                        size="large"
                        fullWidth
                        sx={{ mb: 2 }}
                        onClick={onParentClose}
                    >
                        <u>No Thanks</u>
                    </Button>
                    {result && (
                        // <MyFormHelperText2>{result}</MyFormHelperText2>
                        <MyFormHelperText3>{result}</MyFormHelperText3>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default Promote;