import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import Link from 'next/Link';
import Batch from './Batch';


const useStyles = makeStyles((theme) => ({
    cardContainer: {
        paddingTop: '10px',
        borderColor: "grey.joinBorder",
        paddingLeft: '15px',
        paddingRight: '15px',
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "start",
        width: '100%',
        paddingTop: '5px'
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "start",
        width: '100%',
        paddingTop: '15px',
        paddingBottom: '15px'
    },
    readmoreText: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        fontSize: 13,
    }
    ,
    newsTitle: {
        fontSize: 13,
        fontWeight: '600',
        lineHeight: '18px',
        paddingBottom: '10px'
    },
    newsText: {
        fontSize: 13,
        lineHeight: '18px'
    },
}));

const NewsFeedTile = ({ postTypeLabel, content, siteName }) => {

    const classes = useStyles();

    const renderNewsText = (text) => {
        if (text.length > 75) {
            return <>
                {text.substring(0, 60)}...<Link href={'#'} ><Typography className={classes.readmoreText} sx={{ cursor: "pointer" }}> Read more</Typography></Link>
            </>
        }
        else {
            return text
        }
    }

    const renderNewsTitle = (text) => {
        if (text.length > 50) {
            return <>
                {text.substring(0, 50)}...
            </>
        }
        else {
            return text
        }
    }
    return <React.Fragment>
        <Grid item xs={12} className={classes.cardContainer} container>
            <Stack className={classes.topRow}>
                <Box sx={{ width: '80%' }}>
                    <Stack spacing={0} alignItems="flex-start">
                        <Typography
                            component="p"
                            sx={{
                                fontSize: 13,
                            }}
                        >
                            {siteName} is the News
                        </Typography>
                    </Stack>
                </Box>
                <Batch text={postTypeLabel} />
            </Stack>
            <Stack className={classes.bottomRow}>
                <Box sx={{ width: '40%' }}>
                    <Image
                        src={`${process.env.cdn}/images/latestnews/feature/${content.newsimage}`}
                        alt={content.newstitle}
                        width={130}
                        height={110}
                    />
                </Box>
                <Box sx={{ width: '60%', paddingLeft: '10px' }}>
                    <Typography
                        component="p"
                        className={classes.newsTitle}
                    >
                        {renderNewsTitle(content.newstitle)}
                    </Typography>
                    <Typography
                        component="p"
                        className={classes.newsText}
                    >
                        {renderNewsText(content.newsintro)}
                    </Typography>
                </Box>
            </Stack>

        </Grid>
    </React.Fragment >




};

export default NewsFeedTile;



