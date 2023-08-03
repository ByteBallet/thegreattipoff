import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import TipsterCarousel from './TipsterCarousel';
import { UserContext } from '@Context/User/UserProvider';
import { getTrendingHB } from '@lib/fetcher';
import {
    getTodayMeeting,
    getTipsterCarousel,
} from '@services/Home/homeService';

const Tracks = ({ item }) => {
    const [trackData, setTrackData] = useState();
    const { LOCID, RACEMEET } = item;
    async function getTrackData() {
        const body = {
            userid: null,
            media: 0,
            racetype: 'R',
            page: 'tracks',
            period: 90,
            locid: LOCID,
            lbtype: 'BEST',
        };
        const { data, error } = await getTipsterCarousel(body);
        if (!error) {
            setTrackData(data.hotbet);
        }
    }
    useEffect(() => {
        getTrackData();
    }, []);

    return (
        <Box>
            <TipsterCarousel
                isTrack={true}
                experts={trackData}
                track={RACEMEET?.toLowerCase()}
            />
        </Box>
    );
};

const TrackExperts = ({ tracks }) => {
    // const [tracks, settracks] = useState();
    // const getTracks = async () => {
    //     const response = await getTodayMeeting({ racetype: 'R' });

    //     if (response && !response.error) {
    //         const { data } = response;
    //         settracks(data?.todaymeeting ?? []);
    //     }
    // };

    // useEffect(() => {
    //     getTracks();
    // }, []);
    return (
        <Box>
            {tracks?.length > 0 && (
                <React.Fragment>
                    <Typography fontSize={16} fontWeight="bold">
                        {tracks?.[0]?.tipsters?.periodlabel}{tracks?.[0]?.tipsters?.period != "90" && `&apos;s`} Track Experts
                    </Typography>
                    {/* {tracks.map((item, index) => (
                        <Tracks key={item.LOCID} item={item} />
                    ))} */}
                    {/* <TipsterCarousel
                        isTrack={true}
                        experts={tracks}
                        track="Randwick"
                    />
                    <TipsterCarousel
                        isTrack={true}
                        experts={tracks}
                        track="Flemington"
                    /> */}
                    {
                        tracks.map((item, idx) =>
                            <TipsterCarousel
                                isTrack={true}
                                experts={item?.tipsters?.hotbet}
                                key={idx}
                                track={item?.location?.toLowerCase()}
                                periodCode={item?.tipsters?.period}
                                locid={item?.locid}
                            />
                        )
                    }
                </React.Fragment>
            )}
        </Box>
    );
};

export default TrackExperts;
