import MessageHelperText from '@Components/common/MessageHelperText';
import updateUserSession from '@Components/utils/updateUserSession';
import { UserContext } from '@Context/User/UserProvider';
import { proceedUserSettings } from '@lib/fetcher';
import { getSession } from 'next-auth/client';
import React, { useContext, useEffect, useState } from 'react';
import ManageBlackBookNotify from './ManageBlackBookNotify';
import { CheckCircle, CheckOutlined } from '@mui/icons-material';

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

const ManageBlackBookNotifyHome = () => {
    const { user, updateUserDetails, addUser } = useContext(UserContext);
    const [result, setResult] = useState({});

    const handleChange = (name) => {
        doUserSettings({
            ...user,
            pid: user.userID,
            [name]: !user[name],
        });
    };

    const updateData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user);
    };

    const doUserSettings = async (value2) => {
        let value3 = {
            clientid: value2.clientID,
            pid: value2.userID,
            showbalance: user.showbalance == 1,
            quickbet: user.singletap == 1,
            maillist: user.puntActive,
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

    useEffect(() => {
        // Reload of the data here
        updateUserSession(true).then(() => {
            updateData();
        });
    }, []);

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                setResult();
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    return (
        <React.Fragment>
            <ManageBlackBookNotify handleChange={handleChange} />
            {result && <MyFormHelperText2>{result}</MyFormHelperText2>}
        </React.Fragment>
    );
};

export default ManageBlackBookNotifyHome;
