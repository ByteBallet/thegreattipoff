import React from 'react';
import ParentLayout from './ParentLayout';
import Header from '../Components/Header';
import { Box, Chip, Typography, Button, Stack, List, ListItem, ListItemIcon } from '@mui/material';
import CustomChip from '../Components/CustomChip';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import SelectRaceType from '@Components/Tipster/SelectRaceType';

const TextHeading = 'from 24 Oct 2022 tips:';
const TextBody = [`5 winners from 7 tips - 99% strike rate`, '999% profit on turnover', 'Returned $5,345 from $100 bets'];

function Info({ heading, content, showIcon, showTime }) {
    return (
        <Box sx={{ lineHeight: 0.25 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '10px',
                    justifyContent: "space-between"
                }}
            >
                {/* <Chip size="small" label="RESULTS" color="success" /> */}
                <Stack direction="row" alignItems={"center"} justifyContent={"start"} spacing={1}>
                    <CustomChip text="RESULTS" color="white.main" backgroundColor={'success.main'} />
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
            {
                content?.totalwin > 0 ? (
                    <React.Fragment>
                        <Box sx={{ lineHeight: 0.25 }}>
                            <Typography fontSize={14} sx={{textDecoration: 'underline'}}>
                                    Win Tips
                            </Typography>
                        </Box>
                        
                        <List sx={{ lineHeight: 0.25, listStyleType: 'disc' }}>
                            
                            <Typography
                                fontSize={14}
                                sx={{
                                    alignItems: 'center',
                                }}
                            >
                            <ListItem>
                                <Typography fontSize={14} fontWeight="bold" marginRight={0.5}>
                                    {content?.totalwin} winner{content?.totalwin > 1 ? 's' : ''}{' '}
                                </Typography>

                                <Typography fontSize={14}>
                                    from {content?.totalwintips} win tip{content?.totalwintips > 1 ? 's' : ''}{' '}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography fontSize={14} marginRight={1}>
                                    🎯{' '}
                                </Typography>
                                <Typography fontSize={14} fontWeight="bold">
                                    {content?.winstrikerate.toFixed(0)}% strike rate
                                </Typography>
                            </ListItem>
                            </Typography>
                            
                            <ListItem>
                            {
                                +content?.winprofit > 0 &&
                                <Typography
                                    fontSize={14}
                                    sx={{
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography component="span" fontWeight="bold" fontSize={14}>
                                        {content?.winprofit.toFixed(0)}%
                                    </Typography>{' '}
                                    profit on turnover
                                </Typography>
                            }
                            </ListItem>
                            <ListItem>
                            {
                                +content?.winprofitamount > 0 &&
                                <Box sx={{ lineHeight: 1 }}>
                                    <Typography fontSize={14}>Made </Typography>
                                    <Typography fontSize={14} fontWeight="bold">
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={content?.winprofitamount}
                                            decimalScale={0}
                                            displayType="text"
                                            prefix="$"
                                        />{' '}
                                    </Typography>
                                    <Typography fontSize={14}>profit from $100 win bets.</Typography>
                                </Box>
                            }
                            </ListItem>
                        </List>
                    </React.Fragment>
                ) : (
                    <Typography fontSize={14}>No winners tipped.</Typography>
                )
            }
            {
                content?.totalplace > 0 ? (
                    <React.Fragment>
                        <Box sx={{ lineHeight: 0.25 }}>
                            <Typography fontSize={14} sx={{textDecoration: 'underline'}}>
                                    Place Tips
                            </Typography>
                        </Box>
                        
                        <List sx={{ lineHeight: 0.25, listStyleType: 'disc' }}>
                            
                            <Typography
                                fontSize={14}
                                sx={{
                                    alignItems: 'center',
                                }}
                            >
                            <ListItem>
                                <Typography fontSize={14} fontWeight="bold" marginRight={0.5}>
                                    {content?.totalplace} placing{content?.totalplace > 1 ? 's' : ''}{' '}
                                </Typography>

                                <Typography fontSize={14}>
                                    from {content?.totalplacetips} place tip{content?.totalplacetips > 1 ? 's' : ''}{' '}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography fontSize={14} marginRight={1}>
                                    🎯{' '}
                                </Typography>
                                <Typography fontSize={14} fontWeight="bold">
                                    {content?.placestrikerate.toFixed(0)}% strike rate
                                </Typography>
                            </ListItem>
                            </Typography>
                           
                            <ListItem>
                            {
                                +content?.placeprofit > 0 &&
                                <Typography
                                    fontSize={14}
                                    sx={{
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography component="span" fontWeight="bold" fontSize={14}>
                                        {content?.placeprofit.toFixed(0)}%
                                    </Typography>{' '}
                                    profit on turnover
                                </Typography>
                            }
                            </ListItem>
                            <ListItem>
                            {
                                +content?.placeprofitamount > 0 &&
                                <Box sx={{ lineHeight: 1 }}>
                                    <Typography fontSize={14}>Made </Typography>
                                    <Typography fontSize={14} fontWeight="bold">
                                        <NumberFormat
                                            thousandSeparator={true}
                                            value={content?.placeprofitamount}
                                            decimalScale={0}
                                            displayType="text"
                                            prefix="$"
                                        />{' '}
                                    </Typography>
                                    <Typography fontSize={14}>profit from $100 place bets.</Typography>
                                </Box>
                            }
                            </ListItem>
                        </List>
                    </React.Fragment>
                ) : (
                    <Typography fontSize={14}>No winners tipped.</Typography>
                )
            }
            {/* {body.map((info, index) => (
                <div key={index}>
                    <Typography
                        fontSize={15}
                        sx={{
                            alignItems: 'center',
                        }}
                    >
                        {info}
                    </Typography>
                </div>
            ))} */}
        </Box >
    );
}

function Results({ item, isUser }) {
    const { tipster, content } = item;

    const heading = `for ${moment(content.racedate).format('D MMMM YYYY')}`;
    let postTime = item.posttimeUTC ? moment.utc(item.posttimeUTC).local().format('HH:mm a') : null
    return (
        <ParentLayout>
            {isUser &&
                <Header avatar={tipster.avatarpath} name={tipster.alias} mediaGroup={tipster.mediagroup} />
            }
            <Info content={content} heading={heading} showIcon={content?.racetype} showTime={postTime} />
        </ParentLayout>
    );
}

export default Results;
