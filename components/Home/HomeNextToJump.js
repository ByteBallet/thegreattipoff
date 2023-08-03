import NextItemList from '@Components/BetHome/NextItemList';
import { UserContext } from '@Context/User/UserProvider';
import { MAIN_CATEGORIES } from '@lib/constants';
import { getAllRaces } from '@lib/fetcher';
import React, { useCallback, useState, useContext, useEffect } from 'react';

const HomeNextToJump = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState();
    const reloadData = useCallback(async () => {
        const data2 = (await getAllRaces(user.promo, 'R')) || {};
        setData(data2?.all);
    }, []);
    useEffect(() => {
        reloadData();
    }, []);
    return (
        <NextItemList
            active={MAIN_CATEGORIES.racings}
            hotevents={data}
            reloadData={reloadData}
            hideTabs={true}
        />
    );
};

export default HomeNextToJump;