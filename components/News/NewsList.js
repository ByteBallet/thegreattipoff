import React from 'react';
import { Box, Divider, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Link from 'next/Link';
import { getNewsTitle } from '@Components/utils/util';

const NewsList = ({ article, lastRec = false, showDetail = false }) => {
    const punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const isDesktop = useMediaQuery('(min-width:900px)');

    return (
        <Box>
            <Link href={`/news/${getNewsTitle(article?.NEWSTITLE)}`}>
                <ListItem disableGutters sx={{ backgroundColor: isDesktop && '#fff', paddingX: isDesktop && 2, cursor: "pointer" }}>
                    <ul style={{padding: 0}}>
                    <ListItemText
                        primary={
                            <Typography
                                component="h3"
                                fontSize={14}
                                fontWeight={showDetail ? '700' : '400'}
                                noWrap
                                sx={{ width: 1 }}
                            >
                                {article.NEWSTITLE}
                            </Typography>
                        }
                        primaryTypographyProps={{ fontSize: 14 }}
                        secondary={
                            showDetail && (
                                <Typography component="span" fontSize={14} className="lineClamp newsDetail" sx={{ width: 1 }}>
                                    {article?.DESCTAG}
                                </Typography>
                            )
                            // <Typography
                            //     component="span"
                            //     fontSize={14}
                            //     className="lineClamp newsDetail"
                            //     sx={{ width: 1 }}
                            //     dangerouslySetInnerHTML={{
                            //         __html: article?.NEWSDETAIL,
                            //     }} />
                        }
                    />
                    </ul>
                    <ListItemIcon>
                        <KeyboardArrowRightOutlinedIcon color="grey.dark" />
                    </ListItemIcon>
                </ListItem>
            </Link>
            <Divider />
        </Box>
    );
};

export default NewsList;
