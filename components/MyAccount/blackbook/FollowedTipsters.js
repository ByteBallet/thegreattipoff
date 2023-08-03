import React, { useContext, useEffect, useState } from 'react';
import { getFollows } from '@services/alerts/alertsService';
import { UserContext } from '@Context/User/UserProvider';
import { Grid, Box, Stack, Typography, Button } from '@mui/material';
import TipsterInfo from '@Components/BetSlip/Hotbet/TipsterInfo';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Link from 'next/Link';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import followcountStore from '@stores/followcountStore';
import LoadSearchModal from '@Components/Search/LoadSearchModal';
import followStore from '@stores/followStore';

const FollowedTipsters = ({ label, isRunner = false, raceType, fromFeed = false }) => {
    const { user } = useContext(UserContext);
    const [followers, setfollowers] = useState([]);
    const [hideLoadMore, sethideLoadMore] = useState(false);
    const [openSearch, setopenSearch] = useState(false);

    const following = followStore((state) => state.tipsterFollowing);

    const handleSearch = () => {
        setopenSearch(!openSearch);
    };

    const updateFollows = followcountStore((state) => state.updateFollows);

    const getData = async (clear = false) => {
        let res = {};
        let ftype = isRunner ? raceType : 'punter';
        res =
            (await getFollows(
                user?.userID,
                false,
                followers ? followers.length : 0,
                ftype,
                0,
                label?.toLowerCase()
            )) || {};
        if (!res.error && res?.data?.ERROBJ?.ERRORCODE == 0) {
            if (res?.data?.followset?.length == 0) {
                sethideLoadMore(true);
            }
            if (clear) {
                setfollowers(res?.data?.followset);
            } else {
                setfollowers([...followers, ...res?.data?.followset]);
                if (label == 'Following') {
                    updateFollows(
                        isRunner ? false : true,
                        res?.data?.followset?.length
                    );
                }
            }
        }
    };

    useEffect(() => {
        !isRunner && user?.userID && getData();
    }, []);

    useEffect(() => {
        isRunner && user?.userID && getData(true);
    }, [raceType]);
    const isGTO = process.env.APP_BRAND == 'gto';
    return (
        <React.Fragment>


            <Box py={2}>
                {followers && followers.length > 0 && (
                    <Grid container spacing={0}>
                        {followers.map((card, idx) => (
                            <Grid item container xs={12} key={idx}>
                                <TipsterInfo
                                    card={card}
                                    avatar={card?.details?.avatar}
                                    alias={card?.followlabel}
                                    link={card?.link}
                                    group={card?.details?.mediagroup}
                                    pushnotf={card?.pushnotf}
                                    comment={card?.comment}
                                    nfollows={card?.nfollows}
                                    followid={card?.followid}
                                    id={card?.id}
                                    isPopular={
                                        label?.toLowerCase() != 'following'
                                    }
                                    followtype={card?.followtype?.toLowerCase()}
                                    isRunner={isRunner}
                                    details={card?.details}
                                    raceType={raceType}
                                    hotbet={card?.hotbet}
                                />
                            </Grid>
                        ))}
                        {!hideLoadMore &&
                            label?.toLowerCase() != 'following' && (
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justifyContent={'center'}
                                >
                                    <Button
                                        color="black"
                                        variant="text"
                                        onClick={() => getData()}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        View more
                                        <KeyboardArrowDownOutlinedIcon fontSize="small" />
                                    </Button>
                                </Grid>
                            )}
                    </Grid>
                )}
                {((followers && followers.length == 0) ||
                    following?.length == 0) &&
                    !isRunner && !fromFeed && (
                        isGTO ?
                            <Stack
                                onClick={handleSearch}
                                direction="row"
                                alignItems={'center'}
                                justifyContent="space-between"
                                sx={{
                                    pt: 2,
                                    cursor: 'pointer',
                                }}
                            >
                                <Typography fontSize={13}>
                                    Search for your favourite Pro Punters and Media experts
                                </Typography>
                                <KeyboardArrowRightOutlinedIcon fontSize="small" />
                            </Stack> :
                            <Link href="/hotbets">
                                <Stack
                                    direction="row"
                                    alignItems={'center'}
                                    justifyContent="space-between"
                                    sx={{
                                        borderTop: 1,
                                        borderColor: 'grey.tipBtn',
                                        pt: 2,
                                        cursor: "pointer"
                                    }}
                                >
                                    <Typography fontSize={13}>
                                        Find winning Tipsters at the HOT Bet Tip
                                        Market
                                    </Typography>
                                    <KeyboardArrowRightOutlinedIcon fontSize="small" />
                                </Stack>
                            </Link>
                    )}
                {
                    // followers && followers.length == 0 &&
                    isRunner && (
                        <Stack
                            onClick={handleSearch}
                            direction="row"
                            alignItems={'center'}
                            justifyContent="space-between"
                            sx={{
                                pt: 2,
                                cursor: 'pointer',
                            }}
                        >
                            <Typography fontSize={13}>
                                Search for a runner & add to Blackbook
                            </Typography>
                            <KeyboardArrowRightOutlinedIcon fontSize="small" />
                        </Stack>
                    )
                }
            </Box>
            <LoadSearchModal
                open={openSearch}
                handleSearch={handleSearch}
                setopenSearch={setopenSearch}
            />
        </React.Fragment>
    );
};

export default FollowedTipsters;
