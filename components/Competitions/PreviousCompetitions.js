import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Stack, Typography, useMediaQuery } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    mainWrapper: {
        border: 'solid',
        marginBottom: '5px',
        borderWidth: '1px',
        borderColor: '#d4d5d7',
        width: '100%',
    },
    dateCol: {
        textAlign: 'left',
        paddingX: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
    },
    rankCol: {
        borderRight: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#d4d5d7',
        textAlign: 'left',
        paddingX: '5px',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myPotCol: {
        borderRight: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#d4d5d7',
        textAlign: 'left',
        paddingX: '5px',
        width: '17%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    winnerCol: {
        textAlign: 'left',
        paddingLeft: '5px',
        paddingRight: '5px',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButton: {
        color: 'white',
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '28%',
    },
    showButton: {
        backgroundColor: '#58aa00',
        border: 'none',
        borderRadius: 5,
        borderColor: '#58aa00',
        borderWidth: '2px',
        border: 'solid',
        hover: null,
    },
    showingButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#58aa00',
        borderWidth: '2px',
        border: 'solid',
        hover: null,
    },
}));

const PreviousCompetitions = ({ item, handleLoadPreviousLeaderBoard, isSelected }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:900px)');
    const fontSize = isDesktop ? '13px' : '11px';

    const date = new Date(item.startdate);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${month} ${year}`;

    const handleOnClick = () => {
        handleLoadPreviousLeaderBoard(item.compid, formattedDate, item.startdate);
    };

    const DeskTop = () => {
        return (
            <Stack direction={'row'} className={classes.mainWrapper}>
                <Stack
                    sx={{
                        width: '30%',
                        justifyContent: 'center',
                        paddingLeft: '15px',
                    }}
                >
                    <Typography fontWeight={'700'} fontSize={fontSize}>
                        {formattedDate}
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '35%',
                        justifyContent: 'center',
                    }}
                >
                    <Typography fontSize={fontSize}>
                        My POT:
                        <b>
                            {' '}
                            {item.pot}% ({item.rank}
                            <span style={{ fontSize: '5px' }}>TH</span>)
                        </b>
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '35%',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        variant="contained"
                        // className={item.startdate === isSelected ? classes.showingButton : classes.showButton}
                        color={item.startdate === isSelected ? 'white' : 'success'}
                        onClick={handleOnClick}
                        sx={{
                            border: isSelected ? 1 : 0,
                            borderColor: '#58aa00',
                        }}
                    >
                        <Typography
                            fontWeight={'700'}
                            fontSize={fontSize}
                            textAlign={'center'}
                            color={item.startdate === isSelected ? '#58aa00' : '#fff'}
                        >
                            {item.startdate === isSelected ? 'Showing' : 'Show'}
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
        );
    };

    return (
        <>
            <DeskTop />
        </>
    );
};

export default PreviousCompetitions;
