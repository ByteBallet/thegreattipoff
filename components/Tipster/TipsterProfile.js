import React, { useContext, useState, useRef, useEffect } from 'react';
import Profile from '@modules/HotBets/Tabs/StatsTab/Profile';
import { Box, Stack, Typography, Button, TextField } from '@mui/material';
import BoxDivider from '@Components/Shared/BoxDivider';
import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import { UserContext } from '@Context/User/UserProvider';
import EditIcon from '@mui/icons-material/Edit';
import authAPI from '@Components/utils/authAPI';
import News from './News';

const TipsterProfile = ({ tipster, selectedType }) => {
    const { user } = useContext(UserContext)
    const [bio, setbio] = useState("")
    const [editBio, seteditBio] = useState(false)
    const [disableSave, setdisableSave] = useState(false)
    let count = useRef(0);
    const bioRef = useRef(bio);
    const handleBio = () => {
        seteditBio(true)
    }
    const handleChange = (event) => {
        setbio(event.target.value);
    };

    useEffect(() => {
        return () => {
            setbio("")
            setdisableSave(false)
            seteditBio(false)
            count.current = 0
        }
    }, [])

    useEffect(() => {
        if (count.current < 2) {
            bioRef.current = bio
        }
        count.current = count.current + 1
    }, [bio])

    const handleBioUpdate = async () => {
        const url = `${process.env.server}/user/UpdateBio`;
        let formval = { profilebio: bio }
        const res = await authAPI(
            url,
            { userid: tipster?.USERID, profile: true, formval },
            'POST',
            true
        );
        if (!res.error && res?.data?.ERROBJ?.ERRORCODE == 0) {
            bioRef.current = bio
            setdisableSave(true)
            setbio(bio)
        }
    }
    return (
        <React.Fragment>
            <Box px={2} mt={1}>
                <CustomGridTitle title={`Details`} />
                <Box sx={{ bgcolor: "white.main", borderRadius: 2, mt: 1.5 }}>
                    <Profile selectedType={selectedType} uid={tipster?.USERID} name={tipster?.ALIAS} setbio={setbio} />
                </Box>
                {
                    bio?.length > 0 &&
                    <React.Fragment>
                        <Box my={2}>
                            <BoxDivider />
                        </Box>
                        <Stack direction="row" justifyContent="space-between">
                            <CustomGridTitle title={`Biography`} />
                            {
                                user?.userID == tipster?.USERID &&
                                <Button
                                    onClick={handleBio}
                                    variant="text"
                                    endIcon={<EditIcon fontSize={'15'} />}
                                    sx={{
                                        '& .MuiButton-endIcon': {
                                            ml: 0.2
                                        }
                                    }}>
                                    Edit
                                </Button>
                            }
                        </Stack>
                        <Box sx={{
                            bgcolor: "white.main", borderRadius: 2, mt: 1.5, p: 2
                        }}>
                            {
                                editBio ?
                                    <TextField
                                        onChange={handleChange}
                                        value={bio}
                                        fullWidth
                                        id="outlined-multiline-flexible"
                                        multiline
                                        minRows={3}
                                        placeholder="Add a Note (optional)"
                                        sx={{
                                            borderColor: "grey.tipBtn",
                                            '& .MuiInputBase-multiline': {
                                                py: 1,
                                                fontSize: 13,
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 2,
                                                borderColor: "grey.tipBtn",
                                            },
                                            '& .MuiFormHelperText-root': {
                                                textAlign: "right",
                                                color: "grey.main",
                                                mr: 0,
                                                mt: 1
                                            }
                                        }}
                                        inputProps={{
                                            maxLength: 300,
                                        }}
                                    /> :
                                    <Typography fontSize={12} component="p" className='tipsterBio'>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: bio || "No Data",
                                            }}
                                        />
                                    </Typography>
                            }
                            {
                                editBio &&
                                <Button
                                    fullWidth
                                    onClick={handleBioUpdate}
                                    variant="contained"
                                    disabled={bioRef.current == bio || disableSave}
                                    color="success"
                                    sx={{
                                        fontWeight: (bioRef.current == bio || disableSave) ? "400" : "700",
                                        minWidth: "auto",
                                        mt: 2
                                    }}>
                                    Save
                                </Button>
                            }
                        </Box>
                    </React.Fragment>
                }
            </Box>
            <Box my={2} mx={2}>
                <BoxDivider />
            </Box>
            <News tipster={tipster} selectedType={selectedType} />
        </React.Fragment>
    );
};

export default TipsterProfile;