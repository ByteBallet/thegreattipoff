import ParentLayout from './ParentLayout';
import Header from '../Components/Header';
import { Box, Chip, Typography, Button, Stack } from '@mui/material';
import CustomChip from '../Components/CustomChip';
import GetTipsButton from '@Components/Leaderboard/GetTipsButton';
import React, { useState, useContext } from 'react';
import LoadGetTips from '@Components/Tipster/GetTips/LoadGetTips';
import { toTitleCase } from '@utils/hotBetUtils';
import { UserContext } from '@Context/User/UserProvider';
import { ConnectedTvOutlined } from '@mui/icons-material';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import moment from 'moment';
import SelectRaceType from '@Components/Tipster/SelectRaceType';

function Info({ body, showMore, onClick, content, alias, showIcon, showTime }) {
    const heading = (
        <Typography fontSize={14}>
            {alias}{' '}
            <>
                <Typography fontSize={14} fontWeight={'bold'}>
                    {content?.totaltips}
                </Typography>{' '}
                Horse Racing Tip{content?.totaltips > 1 ? 's' : ''}
            </>
        </Typography>
    );

    function AllTipTypes() {
        return (
            <Typography fontSize={14} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                {toTitleCase(alias)}&nbsp;
                {content?.totaltipsracetype?.R && (
                    <Stack direction="row" alignItems={"center"}>
                        <Typography fontWeight={'bold'} fontSize={14} component={'span'}>
                            {content?.totaltipsracetype?.R ?? ''}
                        </Typography>&nbsp;tips&nbsp;
                        <SelectRaceType
                            selectedType={"R"}
                            setselectedType={() => { }}
                            isProTipster={false}
                            isFeed={true}
                            defaultRaceTypes={["R"]}
                        />
                    </Stack>
                )}
                {content?.totaltipsracetype?.G && (
                    <Stack direction="row" alignItems={"center"}>
                        <Typography fontWeight={'bold'} fontSize={14} component={'span'}>
                            {content?.totaltipsracetype?.G ?? ''}
                        </Typography>&nbsp;tips&nbsp;
                        <SelectRaceType
                            selectedType={"G"}
                            setselectedType={() => { }}
                            isProTipster={false}
                            isFeed={true}
                            defaultRaceTypes={["G"]}
                        />
                    </Stack>
                )}
                {content?.totaltipsracetype?.H && (
                    <Stack direction="row" alignItems={"center"}>
                        <Typography fontWeight={'bold'} fontSize={14} component={'span'}>
                            {content?.totaltipsracetype?.H ?? ''}
                        </Typography>&nbsp;tips&nbsp;
                        <SelectRaceType
                            selectedType={"H"}
                            setselectedType={() => { }}
                            isProTipster={false}
                            isFeed={true}
                            defaultRaceTypes={["H"]}
                        />
                    </Stack>
                )}
            </Typography>
        );
    }

    return (
        <Box sx={{ marginBottom: '10px', lineHeight: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '10px',
                    justifyContent: "space-between"
                }}
            >
                <Stack direction="row">
                    <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
                        {/* <Chip size="small" label="NEWS" color="primary" /> */}
                        <CustomChip text="TIPS" color="white.main" backgroundColor={'primary.main'} />
                    </Box>
                    <Box ml={1}>
                        {content?.totaltipsracetype ? (
                            <AllTipTypes />
                        ) : (
                            <Typography
                                fontSize={14}
                                sx={{
                                    display: 'flex',
                                    marginLeft: '5px',
                                    alignItems: 'center',
                                }}
                            >
                                {heading}
                            </Typography>
                        )}
                    </Box>
                    {
                        showIcon &&
                        <SelectRaceType
                            selectedType={showIcon}
                            setselectedType={() => { }}
                            isProTipster={false}
                            isFeed={true}
                            defaultRaceTypes={[showIcon]}
                        />
                    }
                </Stack>
                {
                    showTime &&
                    <Typography fontSize={12} color="grey.main">
                        {showTime}
                    </Typography>
                }
            </Box>
            <Typography
                fontSize={14}
                sx={{
                    alignItems: 'center',
                }}
            >
                {body}
            </Typography>
            {content.atips.length > 4 && (
                <Box component={'span'} ml={1}>
                    {showMore ? (
                        <Typography fontSize={14} color="info.comment" onClick={() => onClick(false)}>
                            Show Less
                        </Typography>
                    ) : (
                        <Typography fontSize={14} color="info.comment" onClick={() => onClick(true)}>
                            Show More
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
}

function Buttons() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button variant="contained" color="success" sx={{ display: 'flex', flexGrow: '1' }}>
                <Typography fontWeight={'bold'} fontSize={14} color="white.main">
                    Get Tips
                </Typography>
            </Button>
        </Box>
    );
}

function Tips({ item, isUser }) {
    const [openBetSlip, setopenBetSlip] = useState(false);
    const { user } = useContext(UserContext);
    const { tipster, content } = item;
    const [openGetTipsModal, setOpenGetTipsModal] = useState(false);

    const [showMore, setShowMore] = useState(false);

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    function getTipsBody() {
        let TextBody = '';
        let end = showMore ? content.atips.length : 4;
        content.atips.slice(0, end).forEach((item, index) => {
            TextBody += `${item.availtips} @ ${item.location}, `;
        });

        TextBody = TextBody.trimEnd().substring(0, TextBody.length - 2);
        return TextBody;
    }

    const handleOnClickGetTips = (uid) => {
        setOpenGetTipsModal(true);
    };

    const time = moment(content.lasttipdate);
    const now = moment();

    const diff = now.diff(time);

    let showAddButton = true;
    if (diff > 0) showAddButton = false;

    const postDateChk = moment(moment(item?.postdate).format('YYYY-MM-DD')).diff(
        moment().format('YYYY-MM-DD'),
        'days'
    )
    let postTime = item.posttimeUTC ? moment.utc(item.posttimeUTC).local().format('HH:mm a') : null
    if (postDateChk < 0) showAddButton = false;

    return (
        <React.Fragment>
            <ParentLayout>
                {isUser && <Header avatar={tipster.avatarpath} name={tipster.alias} mediaGroup={tipster.mediagroup} showMore={showMore} />}
                <Info alias={tipster.alias} content={content} body={getTipsBody()} onClick={setShowMore} showMore={showMore} showIcon={content?.racetype} showTime={postTime} />

                <Stack alignItems={'center'} justifyContent="center">
                    <Box width="40%">
                        {showAddButton && <GetTipsButton tipsterID={tipster?.tipsterid} onClick={handleOnClickGetTips} />}
                    </Box>
                </Stack>
            </ParentLayout>
            <LoadGetTips
                open={openGetTipsModal}
                setOpenGetTipsModal={setOpenGetTipsModal}
                alias={tipster.alias ? toTitleCase(tipster.alias) : ''}
                tipster={tipster}
                selectedCategory={null}
                selectedType={''}
                defaultRType={content?.totaltipsracetype?.G ? "G" : content?.totaltipsracetype?.H ? "H" : "R"}
                selectedDate={0}
                handleBetSlip={handleBetSlip}
            />
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </React.Fragment>
    );
}

export default Tips;
