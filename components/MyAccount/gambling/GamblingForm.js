import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
    FormGroup,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
    ArrowForward,
    ArrowLeftOutlined,
    ArrowRight,
    ArrowRightOutlined,
    KeyboardArrowRight,
} from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';

const useStyles6 = makeStyles((theme) => ({
    formGroup: {
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e3e3e3',
        '&:first-child': {
            borderTop: '1px solid #e3e3e3',
        },
    },
    linkButton: {
        '&:first-child': {
            borderTop: '1px solid #e3e3e3',
        },
        width: '100%',
        textAlign: 'left',
        borderBottom: '1px solid #d3d3d3',
    },
    list3: {
        width: '100%',
        paddingBottom: '0',
        fontSize: '0.9rem',
    },
}));

const GamblingForm = (props) => {
    const router = useRouter();
    const classes = useStyles6();
    return (
        <List
            component="div"
            sx={{
                pt: 2,
                pb: 12,
                px: 2,
            }}
        >
            <ListItem
                className={classes.linkButton}
                sx={{ width: 1 }}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <KeyboardArrowRight />
                    </IconButton>
                }
            >
                <ListItemButton
                    sx={{ padding: 0 }}
                    onClick={() =>
                        router.push('/myaccount/gambling/depositlimit')
                    }
                >
                    <ListItemText primaryTypographyProps={{style:{fontSize:14}}} primary="Deposit Limit" />
                </ListItemButton>
            </ListItem>
           
            <ListItem
                className={classes.linkButton}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <KeyboardArrowRight />
                    </IconButton>
                }
            >
                 <Divider />
                <ListItemButton
                    sx={{ padding: 0 }}
                    onClick={() =>
                        router.push('/myaccount/gambling/selfexclude')
                    }
                >
                    <ListItemText primaryTypographyProps={{style:{fontSize:14}}}  primary="Self Exclude" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default GamblingForm;
