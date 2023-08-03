import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import authAPI from '@Components/utils/authAPI';
import RaceMeetRaceFields from './RaceMeetRaceFields';
import TipLoading from '@Components/LoadingSkeleton/TipLoading';
import { UserContext } from '@Context/User/UserProvider';

const RaceMeetHome = ({ data }) => {
    const { user } = useContext(UserContext)
    const racemeet = data[0].replace(/_/g, ' ');
    const [raceFields, setRaceFields] = useState({});
    const [render, setRender] = useState(false);

    async function getRaceMeetEvents() {
        let body = {
            raceid: data[1],
            jsonresp: '1',
            clientid: user.clientID ? user.clientID : "",
            userid: user.userID ? user.userID : 0,
            meeting: 'true',
            promo: user.promo,
        };
        const url = `${process.env.server}/races/getRaceDayEvents`;
        const response = await authAPI(url, body, 'POST', false);
        let races = !response.error
            ? response.data.ERROBJ.ERRORCODE == 0
                ? response.data
                : []
            : []
        setRaceFields(races)
    }

    useEffect(() => {
        getRaceMeetEvents()
    }, []);

    useEffect(() => {
        render && getRaceMeetEvents()
    }, [render]);

    if (Object.keys(raceFields).length == 0)
        return <TipLoading />

    return (
        Object.keys(raceFields).length > 0 &&
        <RaceMeetRaceFields
            races={raceFields}
            racemeet={racemeet}
            setRender={setRender}
            render={render}
        />
    );
};

export default RaceMeetHome;