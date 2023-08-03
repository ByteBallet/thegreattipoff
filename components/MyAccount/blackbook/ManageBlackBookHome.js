
import React, { useContext, useEffect, useState } from 'react';
import ManageBlackBook from '@Components/MyAccount/blackbook/ManageBlackBook';
import { UserContext } from '@Context/User/UserProvider';
import { getFollows } from '@services/alerts/alertsService';

const ManageBlackBookHome = () => {

    const { user } = useContext(UserContext)
    const [menu, setmenu] = useState()

    const getData = async () => {
        let res = {}
        res = (await getFollows(user?.userID, true)) || {};
        if (!res.error && res?.data?.ERROBJ?.ERRORCODE == 0) {
            setmenu(res?.data?.followmenu)
        }
    }

    useEffect(() => {
        if (user?.userID) {
            getData()
        }
    }, [])

    return (
        <React.Fragment>
            {
                menu ?
                    <ManageBlackBook menu={menu} />
                    :
                    ""
            }
        </React.Fragment>
    );
};

export default ManageBlackBookHome;