import React, { useState } from 'react';
import { Box, Grid, Stack, Typography, Divider } from '@mui/material';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import Link from 'next/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PurchasedTipsComments from './PurchasedTipsComments';
import BottomBar from '@modules/Transactions/Components/BottomBar';
import ExpandedPurchasedTipsView from './ExpandedPurchasedTipsView';
import RenderJockeyImage from './RenderJockeyImage';

const PurchasedTipsDetails = ({ details, comments }) => {
    const [hideImage, setHideImage] = useState(false);

    const renderStake = (stake) => {
        let stkLevel = details?.qUserStake?.filter((item) => stake >= item?.STAKEMIN && item?.STAKEMAX >= stake);
        return (
            <Typography fontSize={14}>
                Stake: <b>{stkLevel?.[0]?.LABEL}</b>
            </Typography>
        );
    };

    return (
        <Box>
            <Stack direction="column" spacing={0.5}>
                {details?.qSmartBetSlip?.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <Grid container spacing={0} px={2}>
                            <Grid item xs={1.5}>
                                <RenderJockeyImage data={item} />
                            </Grid>
                            <Grid item xs={10.5}>
                                <Stack direction="row" alignItems={'center'} justifyContent="space-between">
                                    <Typography noWrap fontWeight={'bold'} fontSize={14} sx={{ width: '90%' }}>
                                        {item?.FIELDNUM}.&nbsp;{item?.FIELDNAME}
                                    </Typography>
                                    <Typography fontWeight={'bold'} fontSize={14}>
                                        <NumberFormat
                                            value={item?.PRICE}
                                            decimalSeparator="."
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            displayType="text"
                                            thousandSeparator=","
                                        />
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems={'center'} justifyContent="space-between">
                                    {moment(moment(item?.ACTUALRACEDATE).format('YYYY-MM-DD HH:mm:ss')).diff(
                                        moment().format('YYYY-MM-DD HH:mm:ss')
                                    ) > 0 ? (
                                        <Link href={`/racing/${item?.RACEMEET}/${item?.RACEID}`}>
                                            <Typography noWrap fontSize={14} color="info.comment" sx={{ cursor: 'pointer', width: '90%' }}>
                                                <span className="textCapitalize">{item?.RACEMEET?.toLowerCase()}</span>&nbsp;R
                                                {item?.RACENUM}&nbsp;
                                                <span style={{ color: 'black' }}>({moment(item?.ACTUALRACEDATE).format('h.mm a')})</span>
                                            </Typography>
                                        </Link>
                                    ) : (
                                        <Typography noWrap fontSize={14} color="grey.main" sx={{ width: '90%' }}>
                                            <span className="textCapitalize">{item?.RACEMEET?.toLowerCase()}</span>&nbsp;R{item?.RACENUM}
                                            &nbsp;
                                            <span style={{ color: 'black' }}>({moment(item?.ACTUALRACEDATE).format('h.mm a')})</span>
                                        </Typography>
                                    )}
                                </Stack>
                                <Stack direction="row" alignItems={'center'} justifyContent="space-between">
                                    <Typography fontSize={14} className="textCapitalize">
                                        Tip Type:&nbsp;<b>{item?.BOOKIEBETTYPE?.toLowerCase()}</b>
                                    </Typography>
                                    {renderStake(item?.STAKEAMOUNT)}
                                </Stack>
                            </Grid>
                            <PurchasedTipsComments item={item} comments={comments} />
                            {idx < details?.qSmartBetSlip?.length - 1 && (
                                <Grid item xs={12}>
                                    <Divider sx={{ my: 1 }} />
                                </Grid>
                            )}
                        </Grid>
                    </React.Fragment>
                ))}
            </Stack>
        </Box>
    );
};

export default PurchasedTipsDetails;
