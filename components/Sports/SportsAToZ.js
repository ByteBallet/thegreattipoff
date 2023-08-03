import React from 'react';
import { useState, useEffect } from 'react';
import AllSportRow from '@modules/Sports/AllSportRow';
import { getAllSport } from '@services/sports/sportsService';
import { SPORTS_MENU_TAB } from '@lib/constants';
import { useRouter } from 'next/router';

const SportsAToZ = () => {
    const router = useRouter();
    const [sportListData, setSportListData] = useState(null);
    const getData = async (activeTab) => {
        let response = null;
        switch (activeTab) {
            case SPORTS_MENU_TAB.TRENDING:
                response = await getTrendingSports();
                break;
            case SPORTS_MENU_TAB.ALL_SPORTS:
                response = await getAllSport();
                break;
            case SPORTS_MENU_TAB.UPCOMING:
                response = await getUpcomingSport();
                break;
        }
        response && response.length > 0 && setSportListData(response[0].list);
    };

    useEffect(() => {
        getData(1)
    }, [router]);
    return (
        <React.Fragment>
            {
                sportListData && sportListData.map((listItem, idx) =>
                    <AllSportRow data={listItem} allsports={true} key={idx} quicklink={true} />
                )
            }
        </React.Fragment>
    );
};

export default SportsAToZ;