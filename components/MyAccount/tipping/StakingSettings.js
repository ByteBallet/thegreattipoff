import React, { useEffect, useState, useContext, useRef } from 'react';
import { getUserStaking } from '@services/user/userService';
import DoneIcon from '@mui/icons-material/Done';
import { Tabs, Tab, Box, Typography, Grid, Divider, Button, Card, CardContent } from '@mui/material';
import { UserContext } from '@Context/User/UserProvider';
import NumberFormat from 'react-number-format';
import CustomStakeSettings from './CustomStakeSettings';
import CommonModal from '@Components/Payments/Common/CommonModal';
import { MyFormHelperText2 } from '@Components/common/MyFormHelperText';
import { validateStakeSettings } from '@Components/utils/util';

const StakingSettings = () => {
    const lowRef = useRef();
    const highRef = useRef();
    const [error1, setError1] = useState();
    let stakings = ['Lowest', 'Lower', 'Standard', 'Higher', 'Highest'];
    const [error, setError] = useState();
    const [confirmModal, setconfirmModal] = useState({
        open: false,
        type: '',
    });
    const { user } = useContext(UserContext);
    const [defaultStake, setdefaultStake] = useState(true);
    let initSettings = {
        Lowest: '',
        Lower: '',
        Standard: '',
        Higher: '',
        Highest: '',
    };
    const [settings, setsettings] = useState(initSettings);
    const [defaultsettings, setdefaultsettings] = useState();
    const getStaking = async () => {
        const resp = await getUserStaking({ userid: user?.userID, update: false });
        if (resp?.data?.user?.length > 0) {
            setdefaultStake(false);
            setStakeSettings(resp?.data?.user);
        } else {
            setsettings(initSettings);
        }
        if (resp?.data?.default?.length > 0) {
            resp?.data?.user?.length == 0 && setdefaultStake(true);
            setdefaultsettings(resp?.data?.default);
        }
    };

    const setStakeSettings = (data) => {
        let obj = {};
        stakings.map((label) => {
            let selected = data.filter((item) => item.LABEL == label);
            if (selected.length > 0) {
                obj[selected?.[0]?.LABEL] = selected?.[0]?.STAKEMAX;
            }
        });
        setsettings(obj);
    };

    useEffect(() => {
        getStaking();
    }, []);

    useEffect(() => {
        const fetcha = () => {
            if (error) {
                if (error.status === 200) {
                }
                setError(null);
                setError1(null);
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [error]);

    const [value, setValue] = useState(defaultStake ? 0 : 1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const updateStake = async (del, custom = false) => {
        if (custom) {
            let body = {
                userid: user?.userID,
                update: true,
                delete: del,
                ...settings,
            };
            const resp = await getUserStaking(body);
        } else {
            const resp = await getUserStaking({ userid: user?.userID, update: true, delete: del });
        }
        setError({
            status: 200,
            type: 'success',
            msg: `${del ? 'Default' : 'Custom'} Staking Selected`,
        });
        getStaking();
    };

    const renderContent = (label, stake, idx) => {
        return (
            <Grid container key={idx} sx={{ my: 1, alignItems: 'center' }}>
                <Grid item xs={12} sx={{ py: 2 }}>
                    <Divider />
                </Grid>
                <Grid container item xs={8}>
                    <Typography component="p" fontSize={13} sx={{ display: 'flex', flexDirection: 'column' }}>
                        {label}
                    </Typography>
                </Grid>
                <Grid container item xs={4} justifyContent="end">
                    <Typography fontSize={13} fontWeight="bold">
                        <NumberFormat value={stake} suffix={`${' '} units`} displayType="text" />
                    </Typography>
                </Grid>
            </Grid>
        );
    };
    const handleStake = (isDefault) => {
        if (isDefault) {
            updateStake(true);
        } else {
            const validate = validateStakeSettings();
            if (validate?.err) {
                setError({
                    status: 404,
                    type: 'error',
                    msg: validate?.msg,
                });
            } else {
                setError(null);
                updateStake(false, true);
            }
        }
        setconfirmModal({
            open: false,
            type: '',
        });
    };
    return (
        <Box pb={2}>
            <Box px={2}>
                <Typography component="p" fontSize={12} align="center">
                    Use the default staking settings or add your custom staking settings.
                </Typography>
            </Box>
            <Box sx={{ px: 2, pt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tabs
                    TabIndicatorProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    className="RacingTabs"
                    value={value}
                    onChange={handleChange}
                    aria-label="stake settings"
                >
                    <Tab icon={defaultStake ? <DoneIcon fontSize="small" /> : null} iconPosition="start" label="Default Staking" />
                    <Tab icon={!defaultStake ? <DoneIcon fontSize="small" /> : null} iconPosition="start" label="Custom Staking" />
                </Tabs>
            </Box>
            <Box px={2}>
                {value == 0 && defaultsettings && defaultsettings.map((item, idx) => renderContent(item?.LABEL, item?.STAKEMAX, idx))}
                {value == 1 && (
                    <CustomStakeSettings
                        lowRef={lowRef}
                        highRef={highRef}
                        setError1={setError1}
                        error1={error1}
                        setsettings={setsettings}
                        defaultStake={defaultStake}
                    />
                )}
                {value == 1 && settings && stakings.map((item, idx) => renderContent(item, settings[item], idx))}
                {value == 1 ? (
                    <>
                        {defaultStake && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                <Button
                                    disabled={
                                        error1 ||
                                        Boolean(settings['Lowest'] == 0) ||
                                        Boolean(settings['Lowest']?.length == 0) ||
                                        Boolean(settings['Highest'] == 0) ||
                                        Boolean(settings['Highest']?.length == 0)
                                    }
                                    color="success"
                                    variant="contained"
                                    onClick={() =>
                                        setconfirmModal({
                                            open: true,
                                            type: 'Custom',
                                        })
                                    }
                                >
                                    Use Custom Staking
                                </Button>
                            </Box>
                        )}
                    </>
                ) : (
                    <>
                        {!defaultStake && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                <Button
                                    color="success"
                                    variant="contained"
                                    onClick={() =>
                                        setconfirmModal({
                                            open: true,
                                            type: 'Default',
                                        })
                                    }
                                >
                                    Use Default Staking
                                </Button>
                            </Box>
                        )}
                    </>
                )}
                {error && <MyFormHelperText2>{error}</MyFormHelperText2>}
            </Box>
            <CommonModal
                open={confirmModal.open}
                onClose={() =>
                    setconfirmModal({
                        open: false,
                        type: '',
                    })
                }
                title="Change Staking settings"
            >
                <Card sx={{ backgroundColor: 'white', m: 0, p: 0 }}>
                    <CardContent>
                        <Box pb={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Typography>Are you sure you want to use {confirmModal.type} Staking?</Typography>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={() => handleStake(confirmModal.type == 'Default')}
                                sx={{ my: 2 }}
                            >
                                Confirm
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </CommonModal>
        </Box>
    );
};

export default StakingSettings;
