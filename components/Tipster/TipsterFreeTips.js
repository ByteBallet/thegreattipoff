import CustomOutlinedButton from '@Components/Shared/CustomOutlinedButton';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { addFreeTip } from '@services/tipster/tipsterService';
import React, { useContext, useState } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import Login from '@Components/user/Login';
import CustomDialog from '@Components/Shared/CustomDialog';
import { useRouter } from 'next/router';
import moment from 'moment';
import CustomALert from '@Components/Shared/CustomALert';

const TipsterFreeTips = ({ showFreeText = false, tipsterTips, onClose }) => {
    const { user } = useContext(UserContext)
    const router = useRouter();
    const [showLogin, setshowLogin] = useState(false)
    const [error, seterror] = useState('')
    const handleClick = (tip) => {
        if (tip?.PURCHASED > 0) {
            onClose()
            router.push("/tipsTransactions/free")
        }
        else if (user?.userID) {
            applyFreeTip(tip)
        } else {
            setshowLogin(true)
        }
    };
    const applyFreeTip = async (tip) => {
        let body = {
            userid: user?.userID || 0,
            tipsterid: tip?.USERID,
            racetype: tip?.RACETYPE,
            racedate: moment(
                tip?.RACEDATE
            ).format('YYYY-MM-DD')
        }
        const resp = await addFreeTip(body)
        if (resp?.data?.status == "success") {
            onClose()
            router.push("/tipsTransactions/free")
        } else {
            seterror(resp?.data?.message)
        }

    }
    let title = 'FREE';

    setTimeout(() => {
        error != '' && seterror('');
    }, 5000);
    const renderTipsByRace = (tip) => {
        let R = tip?.RACEMEETR ? <span><b style={{ color: "#902fa1" }}>R&nbsp;</b>{tip?.RACEMEETR?.toLowerCase()}</span> : ""
        let G = tip?.RACEMEETG ? (<span><b style={{ color: "#902fa1" }}>G&nbsp;</b>{tip?.RACEMEETG?.toLowerCase()}</span>) : ""
        let H = tip?.RACEMEETH ? (<span><b style={{ color: "#902fa1" }}>H&nbsp;</b>{tip?.RACEMEETH?.toLowerCase()}</span>) : ""
        return <Typography fontSize={14} className="textCapitalize" my={1} sx={{ color: "#666668" }}>
            {R}&nbsp;{G}&nbsp;{H}
        </Typography>
    }
    return (
        <Box px={2} >
            {
                tipsterTips && tipsterTips.length > 0 &&
                <Grid container spacing={1.5} sx={{ my: 1 }}  >
                    {tipsterTips?.map((tip, idx) =>
                        <React.Fragment key={idx}>
                            <Grid item xs={7}>
                                <Stack direction="column" spacing={0}>
                                    <Typography component="p" fontWeight="bold" noWrap sx={{ color: "#585858", fontWeight: "600", fontSize: 17 }}>
                                        {title} Tips
                                    </Typography>
                                    {renderTipsByRace(tip)}
                                </Stack>
                            </Grid>
                            <Grid item xs={5} container alignItems={'center'} justifyContent="end">
                                <CustomOutlinedButton
                                    title={`${title?.toUpperCase()} Tips`}
                                    handleClick={() => handleClick(tip)}
                                    rounded={false}
                                    color="black"
                                    bgcolor="grey.sportsOdds"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </React.Fragment>
                    )}
                </Grid>
            }
            {
                error?.length > 0 &&
                <Box my={2}>
                    <CustomALert
                        content={error}
                        severity="error"
                        warning={false}
                        isHtml={false}
                    />
                </Box>
            }
            <CustomDialog
                id={'login'}
                open={showLogin}
                title={'Login to your account'}
                content={<Login onParentClose={onClose} />}
                fullScreen
                showX
                onClose={onClose}
                disablePortal={true}
            />
        </Box>
    );
};

export default TipsterFreeTips;
