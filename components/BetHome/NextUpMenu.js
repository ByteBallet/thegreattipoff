import React from 'react';
import { useState, useCallback, useEffect, useContext } from 'react';
import NextUpDesktopData from './NextUpDesktopData';
import { getAllRaces } from '../../lib/fetcher';
import { UserContext } from '@Context/User/UserProvider';

const NextUpMenu = () => {
    const [data, setData] = useState({});
    const { user } = useContext(UserContext);

    const reloadData = useCallback(async () => {
        const res = (await getAllRaces(user.promo)) || {};
        setData(res.all)
    }, []);

    useEffect(() => {
        reloadData();
    }, [])
    return (
        <NextUpDesktopData type="Racing" data={data} reloadData={reloadData} />
    );
};

export default NextUpMenu;