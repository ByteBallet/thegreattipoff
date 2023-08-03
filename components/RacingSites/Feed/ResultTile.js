import React from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles((theme) => ({
    cardContainer: {
        paddingTop: '10px',
        borderColor: "grey.joinBorder",
        paddingLeft: '15px',
        paddingRight: '15px',
    },
}));

const ResultTile = ({ postTypeLabel, content }) => {

    const classes = useStyles();

    return <>heere</>

    return <React.Fragment>
        <Grid item xs={12} className={classes.cardContainer} container>
            <Typography
                component="p"
                sx={{
                    fontSize: 15,
                }}
            >
                ResultTile
            </Typography>
        </Grid>
    </React.Fragment >




};

export default ResultTile;



