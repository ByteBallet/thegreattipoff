import styled from 'styled-components';
import AvatarUpload from '@Components/Avatar/AvatarUpload';
import React, { useContext } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import Image from 'next/image';
import Title from './StyledComponents/Title';
import { Box, Divider, Typography } from '@mui/material';

import TipsterLogo from '../TipsterLogo';

import RacingIcon from '@Components/RacingIcon';

import lbStore from '@stores/lbStore';

import NumberFormat from 'react-number-format';

const ImageWrapper = styled.div`
    margin: 0px 15px;
    padding: 10px 0px;
`;

const Container = styled.div`
    background: white;
    width: 100%;
`;

const CenteredContainer = styled.div`
    display: flex;
    justify-content: ${(props) => props.jsContent};
`;

const BodyContainer = styled(Container)`
    border: solid 1px;
    border-color: grey;
    background: #ececec;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 10px 10px;
`;

const Header = styled.div`
    background: purple;
    max-height: 50px;
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px 0px 0px;
`;

const SubText = styled(Title)`
    font-size: 12px;
    font-weight: bold;
`;

const TipsterDetails = ({ avatar, racetype, type, loc, tipster, profitstats }) => {
    const { user } = useContext(UserContext);
    const tipsterName = (tipster?.ROLES == 'PROTIP' || tipster?.MEDIA == '1') ? tipster?.FIRSTNAME + ' ' + tipster?.SURNAME : tipster?.ALIAS;

    const bettype = lbStore((state) => state.bettype);
    const staking = lbStore((state) => state.staking);
    const period = lbStore((state) => state.period);
    const track = lbStore((state) => state.alternateRaceTrack);
    const numTips = lbStore((state) => state.numTips);

    const amount = profitstats?.FROMAMOUNT ?? '';
    const total = profitstats?.TOAMOUNT ?? '';

    const isProfit = profitstats?.PROFITAMOUNT > 0;

    const noProfitHeading = `${profitstats?.qStats[0]?.TOTALWIN || 0} Winners at $${profitstats?.qStats[0]?.AVGWIN?.toFixed(2) || 0} avg`;
    const noProfitSubHeading = `over 90 days`;
    return (
        <Box sx={{ pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <TipsterLogo tipster={tipster} />
                </Box>
                <Box>
                    <AvatarUpload
                        image={avatar.length > 0 ? `${process.env.cdn}/images/avatar/${avatar}` : undefined}
                        dimensions={{ width: 70, height: 70 }}
                        showUpdate={false}
                        userID={user?.userID}
                        avatarPos=""
                        iconAction={user?.userID == tipster?.USERID}
                    />
                    <Box sx={{ mb: 3 }}>
                        <Title weight={600} marginTop={'5px'}>
                            {tipsterName}
                        </Title>
                        <SubText>
                            {type} | {loc}
                        </SubText>
                    </Box>
                </Box>
                <Box>
                    <RacingIcon racetype={racetype} width={40} height={45} />
                </Box>
            </Box>

            <Divider />

            <Box sx={{ lineHeight: 1 }}>
                <CenteredContainer jsContent="center">
                    <Typography
                        sx={{ lineHeight: 1, mt: 3, mb: 1 }}
                        color="primary.main"
                        noWrap
                        align="center"
                        fontSize={24}
                        fontWeight="600"
                    >
                        {isProfit ? (
                            <>
                                Turned{' '}
                                <NumberFormat
                                    thousandSeparator={true}
                                    value={amount}
                                    decimalSeparator="."
                                    decimalScale={0}
                                    fixedDecimalScale={true}
                                    displayType="text"
                                    prefix="$"
                                />{' '}
                                into{' '}
                                <NumberFormat
                                    thousandSeparator={true}
                                    value={total}
                                    decimalSeparator="."
                                    decimalScale={0}
                                    fixedDecimalScale={true}
                                    displayType="text"
                                    prefix="$"
                                />
                            </>
                        ) : (
                            <>{noProfitHeading}</>
                        )}
                    </Typography>
                </CenteredContainer>
                <CenteredContainer jsContent="center">
                    <Typography sx={{ lineHeight: 1, mb: 4 }} color="grey.main" noWrap fontSize={15} align="center">
                        {isProfit ? (
                            <>
                                over {period} days from $100 {bettype?.replace("Even", "")} bets
                            </>
                        ) : (
                            <>{noProfitSubHeading}</>
                        )}
                    </Typography>
                </CenteredContainer>
            </Box>

            <Box>
                <Divider sx={{ minWidth: 300 }} />
            </Box>

            <div>
                <CenteredContainer jsContent="space-between">
                    <Typography sx={{ lineHeight: 1, mt: 3, mb: 1 }} color="grey.main" noWrap align="center" fontSize={13}>
                        Tracks:{' '}
                        <Typography
                            sx={{ lineHeight: 1, textTransform: 'capitalize' }}
                            color="black.main"
                            noWrap
                            align="center"
                            fontSize={13}
                        >
                            {track == 'all' ? 'All Tracks' : track.toLowerCase()}
                        </Typography>
                    </Typography>
                    <Typography sx={{ lineHeight: 1, mt: 3, mb: 1 }} color="grey.main" noWrap align="center" fontSize={13}>
                        Bet Type:{' '}
                        <Typography
                            sx={{ lineHeight: 1, textTransform: 'capitalize' }}
                            color="black.main"
                            noWrap
                            align="center"
                            fontSize={13}
                        >
                            {bettype == 'placeEven' ? 'Place Bet' :
                                (bettype == 'winEven' ? 'Win Bet' : 'All')}
                        </Typography>
                    </Typography>
                </CenteredContainer>
                <CenteredContainer jsContent="space-between">
                    <Typography sx={{ lineHeight: 1 }} color="grey.main" noWrap align="center" fontSize={13}>
                        Period:{' '}
                        <Typography
                            sx={{ lineHeight: 1, textTransform: 'capitalize' }}
                            color="black.main"
                            noWrap
                            align="center"
                            fontSize={13}
                        >
                            {period} days
                        </Typography>
                    </Typography>
                    <Typography sx={{ lineHeight: 1, mb: 4 }} color="grey.main" fontSize={13}>
                        Staking:{' '}
                        <Typography sx={{ lineHeight: 1 }} color="black.main" noWrap align="center" fontSize={13}>
                            {staking == 'evenstake' ? 'Even' : 'Actual'} Stake
                        </Typography>
                    </Typography>
                </CenteredContainer>
            </div>
        </Box>
    );
};

function StatsImage({ tipster, HbMarket, racetype }) {
    if (!HbMarket) return <></>;

    const profitstats = Object.values(HbMarket)[0]?.profit ?? null;
    if (!profitstats) return <></>;

    return (
        <Container>
            <ImageWrapper>
                <Header>
                    <img src={`${process.env.cdn}/images/logo/logo.svg`} className="logo" style={{ cursor: 'pointer' }} alt="logo"/>
                </Header>
                <BodyContainer>
                    <TipsterDetails
                        tipster={tipster}
                        avatar={tipster.AVATARPATH}
                        alias={tipster.ALIAS}
                        type={tipster.MEDIAGROUP}
                        loc={tipster?.STATE || ''}
                        profitstats={profitstats}
                        racetype={racetype}
                    />
                </BodyContainer>
            </ImageWrapper>
        </Container>
    );
}

export default StatsImage;
