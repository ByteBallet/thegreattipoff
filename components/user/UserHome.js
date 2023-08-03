import React, { useContext } from 'react';
import { Box, Grid, Avatar, Typography, MenuItem, Select } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import TipsterTabs from '../Tipster/TipsterTabs';
import AvatarUpload from '../Avatar/AvatarUpload';
import { UserContext } from '@Context/User/UserProvider';


const UserHome = ({ tipster, ntips, nearnings }) => {
    const { user } = useContext(UserContext)
    let imgsrc = "";
    let bg_imgsrc = "";
    const [selectedIndex, setSelectedIndex] = React.useState("R");
    const handleChange = (event) => {
        setSelectedIndex(event.target.value);
    };
    if (Object.entries(tipster).length > 0) {
        imgsrc = tipster.GROUP != null && tipster.GROUP != "" ? `${process.env.cdn}/images/AffiliateLogo/T-${tipster.GROUP.replace(/ /g, '-')}.png` : `${process.env.cdn}/images/AffiliateLogo/Horse-Racing-shoe.png`;
        bg_imgsrc = `/images/races/home-bg-${tipster.DEFAULTRACETYPE}.png`;
    }
    return (
        <Box>
            <Box sx={{ background: `url(${bg_imgsrc}) no-repeat`, height: "160px", display: "flex", alignItems: "flex-end", backgroundSize: 'cover' }}>
                {
                    tipster?.USERID == user?.userID &&
                    <AvatarUpload
                        image={
                            tipster.AVATARPATH.length > 0 ?
                                `${process.env.cdn}/images/avatar/${tipster.AVATARPATH}` :
                                undefined
                        }
                        dimensions={{ width: 110, height: 110 }}
                        showUpdate={false}
                        userID={user?.USERID}
                        avatarPos="AvatarUploadPos"
                        iconAction={true}
                    />
                }
            </Box>
            <Box my={3}>
                <Grid container direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={2} pl={2}>
                        {
                            tipster.ROLES == "PROTIP" || tipster.MEDIA == "1" ?
                                <Avatar
                                    src={imgsrc}
                                    alt={tipster.GROUP}
                                    variant="rounded"
                                    sx={{ width: 50, height: 50 }}
                                /> : tipster.PROTIPPER == "1" ?
                                    <Avatar src={`${process.env.cdn}/images/AffiliateLogo/T-Pro.png`} alt={"PRO"} variant="rounded" sx={{ width: 60, height: 60 }} /> :
                                    <Avatar src={`${process.env.cdn}/images/AffiliateLogo/T-Punter.png`} alt={"PUNTER"} variant="rounded" sx={{ width: 60, height: 60 }} />
                        }
                    </Grid>
                    <Grid item xs className='textAlignCoulmnCenter'>
                        {
                            tipster.ROLES == "PROTIP" || tipster.MEDIA == "1" ?
                                <Typography variant="h1">{tipster.FIRSTNAME} {tipster.SURNAME}</Typography> :
                                <Typography variant="h1">{tipster.ALIAS}</Typography>
                        }
                        <Typography>TIPSTER | {tipster.STATE}</Typography>
                    </Grid>
                    <Grid item xs={2} align="right" pr={2}>
                        <Select
                            value={selectedIndex}
                            autoWidth
                            variant="standard"
                            disableUnderline
                            IconComponent={KeyboardArrowDownOutlinedIcon}
                            onChange={handleChange}
                            MenuProps={{
                                transitionDuration: 0
                            }}
                        >
                            <MenuItem value="R">
                                <Avatar src="/images/races/horse.png" sx={{ width: 30, height: 30, bgcolor: "background.default" }} />
                            </MenuItem>
                            <MenuItem value="H">
                                <Avatar src="/images/races/harness.png" sx={{ width: 30, height: 30, bgcolor: "background.default" }} />
                            </MenuItem>
                            <MenuItem value="G">
                                <Avatar src="/images/races/greys.png" sx={{ width: 30, height: 30, bgcolor: "background.default" }} />
                            </MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Box>
            <TipsterTabs favcode={selectedIndex} tipster={tipster} ntips={ntips} nearnings={nearnings} />
        </Box>
    );
};

export default UserHome;