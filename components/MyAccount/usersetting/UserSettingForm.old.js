import React, { useMemo, useState, useEffect, useCallback, useContext } from 'react';
import { FormGroup, FormControl, FormLabel, Typography } from '@mui/material';
import CustomSwitch from '../../common/CustomSwitch';
import { makeStyles } from '@mui/styles';
import { proceedUserSettings } from '../../../lib/fetcher';
import { CheckCircle, CheckOutlined } from '@mui/icons-material';
import MessageHelperText from '../../common/MessageHelperText';
import { UserContext } from '../../../Context/User/UserProvider';
import { getSession } from 'next-auth/client';
import updateUserSession from '@Components/utils/updateUserSession';
import ManageBlackBookNotify from '../blackbook/ManageBlackBookNotify';

const useStyles5 = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginTop: '0px',
        marginLeft: 0,
        padding: '4px',
        marginBottom: '8px',
        '& .MuiInputBase-input': {
            padding: '6px',
            marginTop: '4px',
            marginBottom: '4px',
            paddingLeft: '12px',
        },

        '& .MuiTextField-root': {
            marginTop: '0',
            marginBottom: '0',
        },
        marginRight: 0,
        width: '100%',
    },
    formLabel: {
        marginLeft: '4px',
        alignSelf: 'center',
    },

    formGroup: {
        textAlign: 'left',
        paddingBottom: '8px',
        paddingTop: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e3e3e3',
        '&:first-child': {
            borderTop: '1px solid #e3e3e3',
        },
    },
}));

const MyFormHelperText2 = (props) => {
    const { children, ...rest } = props;
    const isError = !children || children.status === 200 ? false : true;
    const msg = children?.msg || '';
    if (msg === '') return '';
    // console.log('MyFormHelperText', children, isError, msgContent);
    if (isError) {
        return <MessageHelperText error={isError}>{msg}</MessageHelperText>;
    } else {
        return (
            <MessageHelperText
                error={isError}
                title={
                    <React.Fragment>
                        <CheckOutlined
                            fontSize="small"
                            color="success"
                            style={{
                                transform: ' translateY(5px)',
                                marginRight: '6px',
                            }}
                        />
                        Success!
                    </React.Fragment>
                }
            >
                {msg}
            </MessageHelperText>
        );
    }
};

const UserSettingForm = (props) => {
    const classes = useStyles5();
    const [result, setResult] = useState({});

    const { user, updateUserDetails, addUser } = useContext(UserContext);

    const handleChange = (name) => {
        let obj = {
            ...user,
            pid: user.userID,
            [name]: !user[name],
        };
        doUserSettings(obj);
    };

    const updateData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user);
    };

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                setResult();
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    const doUserSettings = async (value2) => {
        let value3 = {
            clientid: value2.clientID,
            pid: value2.userID,
            showbalance: value2.showbalance == 1,
            quickbet: value2.singletap == 1,
            maillist: value2?.maillist ?? 1,
            puntActive: value2?.puntActive ?? 1,
            alertemail: value2.alertemail == 1,
            alertapp: value2.alertapp == 1,
        };
        const _result = (await proceedUserSettings(value3)) || {};

        if (_result) {
            if (_result.error) {
                setResult({ status: 404, msg: _result.desc });
            } else {
                const errorCode = _result.ERROBJ.ERRORCODE;
                if (errorCode == 0) {
                    setResult({ status: 200, msg: 'Update successful' });
                    //update session
                    updateUserSession(true).then(() => {
                        updateData();
                    });
                } else
                    setResult({
                        status: errorCode,
                        msg: _result.ERROBJ.ERRORDESC,
                    });
            }
        } else {
            setResult({ status: 403, msg: 'Network error' });
        }
    };

    return (
        <form style={{ padding: '16px', paddingBottom: '64px' }}>
            <Typography sx={{ fontSize: 10 }}>
                <FormGroup
                    row
                    sx={{
                        py: 1,
                        // px: 1,
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: '#e2e2e2',
                        borderTopWidth: 1,
                        borderTopStyle: 'solid',
                        borderTopColor: '#e2e2e2',
                    }}
                >
                    <FormLabel
                        component="legend"
                        sx={{
                            // ml: 1,
                            p: 0,
                            fontSize: '14px',
                            alignSelf: 'center',
                        }}
                    >
                        Show Account Balance
                    </FormLabel>
                    <FormControl>
                        <CustomSwitch
                            name="showbalance"
                            checked={user ? user.showbalance === 1 : false}
                            onChange={() => handleChange('showbalance')}
                        />
                    </FormControl>
                </FormGroup>

                <FormGroup
                    row
                    sx={{
                        py: 1,
                        // px: 1,
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: '#e2e2e2',
                    }}
                >
                    <FormLabel
                        component="legend"
                        sx={{
                            // ml: 1,
                            p: 0,
                            fontSize: '14px',
                            alignSelf: 'center',
                        }}
                    >
                        One Tap {process.env.APP_BRAND === 'gto' ? 'Tip' : 'Bet'}
                    </FormLabel>
                    <FormControl>
                        <CustomSwitch
                            name="singletap"
                            checked={user ? user.singletap === 1 : false}
                            onChange={() => handleChange('singletap')}
                        />
                    </FormControl>
                </FormGroup>

                <FormGroup
                    row
                    sx={{
                        py: 1,
                        // px: 1,
                        justifyContent: 'space-between',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderBottomColor: '#e2e2e2',
                    }}
                >
                    <FormLabel
                        component="legend"
                        sx={{
                            // ml: 1,
                            p: 0,
                            fontSize: '14px',
                            alignSelf: 'center',
                        }}
                    >
                        Opt in to marketing communication
                    </FormLabel>
                    <FormControl>
                        <CustomSwitch
                            name="maillist"
                            checked={user ? user.maillist === 1 : false}
                            onChange={() => handleChange('maillist')}
                        />
                    </FormControl>
                </FormGroup>

                <ManageBlackBookNotify handleChange={handleChange} />

                {result && <MyFormHelperText2>{result}</MyFormHelperText2>}
            </Typography>
        </form>
    );
};

export default UserSettingForm;
