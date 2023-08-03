import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PreviousCompetitions from './PreviousCompetitions';

const useStyles = makeStyles((theme) => ({
    cardStyle: {
        width: '90%',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '5px',
        border: 'solid',
        borderWidth: '1px',
        borderColor: '#d4d5d7',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    cardStyleDeskTop: {
        width: '90%',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '5px',
        borderBottom: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#d4d5d7',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5px',
        paddingLeft: '10px',
    },
    expandView: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '8px',
        paddingBottom: '5px',
        marginLeft: '10px',
        marginRight: '10px',
        borderTop: 'solid',
        borderTopWidth: '1px',
        borderColor: '#d4d5d7',
    },
    text: {
        fontSize: '12px',
    },
    textDesktop: {
        fontSize: '14px',
    },
}));

const ExpandingCards = ({ item, handleLoadPreviousLeaderBoard, isSelected, handleShowCurrentMonth }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:900px)');

    const [isExpand, setIsExpand] = useState(false);

    const handleExpandCard = () => {
        setIsExpand(!isExpand);
    };

    return (
        <div className={isDesktop ? classes.cardStyleDeskTop : classes.cardStyle}>
            <Stack className={classes.cardContainer} onClick={handleExpandCard}>
                <Typography className={isDesktop ? classes.textDesktop : classes.text}>{item.label}</Typography>
                {isExpand ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
            </Stack>
            {isExpand && (
                <div className={classes.expandView}>
                    {item.isArray ? (
                        <div style={{ paddingBottom: '8px' }}>
                            {item.data.length > 0 &&
                                item.data.map((i) => (
                                    <PreviousCompetitions
                                        key={i.e}
                                        item={i}
                                        handleLoadPreviousLeaderBoard={
                                            i.startdate === isSelected ? handleShowCurrentMonth : handleLoadPreviousLeaderBoard
                                        }
                                        isSelected={isSelected}
                                    />
                                ))}
                        </div>
                    ) : (
                        <div style={{ paddingLeft: '10px', paddingRight: '10px' }} dangerouslySetInnerHTML={{ __html: item.data }} />
                    )}
                </div>
            )}
        </div>
    );
};

export default ExpandingCards;
