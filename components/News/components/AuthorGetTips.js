import GetTipsButton from '@Components/Leaderboard/GetTipsButton';
import FollowButton from '@Components/Tipster/FollowButton';
import LoadGetTips from '@Components/Tipster/GetTips/LoadGetTips';
import { UserContext } from '@Context/User/UserProvider';
import AddToBetSlipButton from '@modules/HotBets/Components/AddToBetSlipButton';
import { Box, Typography } from '@mui/material';
import { getHBTipster } from '@services/hotbets/hotbetsService';
import { toTitleCase } from '@utils/hotBetUtils';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';

const AuthorGetTips = ({ tipsterid, alias, card, handleBetSlip, isDesktop = true }) => {
    const [openGetTipsModal, setOpenGetTipsModal] = useState(false);
    const [summaryList, setsummary] = useState([]);
    const [betSlipCount, settotalBetsRef] = useState(0)
    const [tipster, settipster] = useState()
    const { user } = useContext(UserContext)

    const getHBTipMarketData = async (init = false) => {
        let fromDate = moment().format('YYYY-MM-DD')
        let toDate = moment(fromDate).add(5, 'days').format('YYYY-MM-DD')
        try {
            const response = await getHBTipster(user?.userID, alias, tipsterid, 'X', fromDate, toDate);
            if (response && !response.error) {
                let summary = response?.data?.HBMarket?.hbtipsummary
                settipster(response?.data?.HBMarket?.hotbetad?.[0])
                if (summary?.length > 0) {
                    const filteredSummary = summary.filter((data) => data?.USERID === tipsterid);
                    setsummary(filteredSummary);
                    settotalBetsRef(filteredSummary.reduce((sum, tip) => sum + +tip.NTIPS, 0))
                } else {
                    setsummary([])
                }
            }
        } catch (error) {
        } finally {
        }
    };

    useEffect(() => {
        getHBTipMarketData()
        return () => {
            setsummary([])
            settotalBetsRef(0)
        }
    }, [tipsterid])

    const handleOnClickGetTips = () => {
        setOpenGetTipsModal(true);
    };

    return (
        <React.Fragment>
            {
                betSlipCount > 0 && tipster &&
                <Box sx={{
                    bgcolor: "success.alert",
                    border: 1,
                    borderColor: "success.alerttext",
                    borderRadius: 1.5,
                    px: isDesktop ? 3 : 1.5,
                    pt: 1,
                    mt: isDesktop ? 3 : 0
                }}>
                    <Typography component={"p"} color="black.main" fontWeight={"bold"} fontSize={isDesktop ? 18 : 14} align="center">
                        {toTitleCase(tipster?.FIRSTNAME)} has tips available now!
                    </Typography>
                    <AddToBetSlipButton
                        betSlipCount={betSlipCount}
                        isLoading={false}
                        onClick={handleOnClickGetTips}
                        isAddtoBetLoading={false}
                        loading={openGetTipsModal}
                        variant={'get-tip'}
                        skipSessionChk={true}
                        uid={tipsterid}
                    />
                </Box>
            }
            {
                betSlipCount == 0 && !isDesktop && tipster &&
                <Box sx={{
                    bgcolor: "success.alert",
                    border: 1,
                    borderColor: "success.alerttext",
                    borderRadius: 1.5,
                    px: 1.5,
                    py: 1.5,
                }}>
                    <Typography component={"p"} color="black.main" fontWeight={"bold"} fontSize={14} align="center">
                        Follow {toTitleCase(tipster?.FIRSTNAME)}
                    </Typography>
                    <Typography component={"p"} color="black.main" fontWeight={"bold"} fontSize={12} align="center" mb={1}>
                        & don&apos;t miss a tip
                    </Typography>
                    <FollowButton
                        format="btn"
                        fullwidth={1}
                        follow={card?.FOLLOWING || 0}
                        tipster={card?.AUTHOR}
                        tipsterid={card?.AUTHORID}
                        showIcon={true}
                    />
                </Box>
            }
            <LoadGetTips
                isCarousel={true}
                open={openGetTipsModal}
                setOpenGetTipsModal={setOpenGetTipsModal}
                alias={toTitleCase(alias)}
                tipster={tipster}
                selectedCategory={null}
                selectedType={''}
                selectedDate={0}
                handleBetSlip={handleBetSlip}
            />
        </React.Fragment>
    );
};

export default AuthorGetTips;