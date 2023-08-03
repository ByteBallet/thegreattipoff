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

const TAB_LIST = [
    {
        value: 'showbalance',
        name: 'Show Account Balance',
    },
    {
        value: 'singletap',
        name: `One Tap ${process.env.APP_BRAND === 'gto' ? 'Tip' : 'Bet'}`,
    },
    {
        value: 'maillist',
        name: `Opt in to marketing communication`,
    },
];

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
    const { user, updateUserDetails, addUser } = useContext(UserContext);
    const [result, setResult] = useState({});
    const handleChange = (name) => {
        let obj = {
            ...user,
            pid: user.userID,
            [name]: !user[name],
        };

        console.log(obj);
        doUserSettings(obj);
    };

    const updateData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user);
    };

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
                // setResult({ status: 404, msg: _result.desc });
            } else {
                const errorCode = _result.ERROBJ.ERRORCODE;
                if (errorCode == 0) {
                    //setResult({ status: 200, msg: 'Update successful' });
                    //update session
                    updateUserSession(true).then(() => {
                        updateData();
                    });
                } else {
                }
                // setResult({
                //     status: errorCode,
                //     msg: _result.ERROBJ.ERRORDESC,
                // });
            }
        } else {
            // setResult({ status: 403, msg: 'Network error' });
        }
    };

    return (
        <div style={{ padding: '16px', paddingBottom: '64px' }}>
            {TAB_LIST.map((item, index) => (
                <FormGroup
                    key={index}
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
                        {item.name}
                    </FormLabel>
                    <FormControl>
                        <CustomSwitch
                            name={item.value}
                            checked={user ? user[item.value] === 1 : false}
                            onChange={() => handleChange(item.value)}
                        />
                    </FormControl>
                </FormGroup>
            ))}

            <ManageBlackBookNotify handleChange={handleChange} />

            {result && <MyFormHelperText2>{result}</MyFormHelperText2>}
        </div>
    );
};

export default UserSettingForm;
