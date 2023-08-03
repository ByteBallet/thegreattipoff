import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { hbStatsTabs } from '@lib/constants';

const useStyles = makeStyles((theme) => ({
    tabsContainer: {
        borderBottom: 'solid',
        borderBottomColor: theme.palette.border.secondary,
        borderBottomWidth: '1px',
        textAlign: 'center',
    },
    tabContainer: {
        height: 45,
        width: '33.3%',
        borderBottomColor: theme.palette.border.yellow,
        borderWidth: '2.5px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: '7px',
        marginBottom: '-1.3px',
    },
}));

const Tabs = ({ selectedTab = 1, handleTabOnClick }) => {
    const classes = useStyles();

    return (
        <Stack
            direction="row"
            alignItems={'center'}
            className={classes.tabsContainer}
        >
            {hbStatsTabs.map((tab) => {
                return (
                    <Box
                        onClick={() => handleTabOnClick(tab?.id)}
                        key={tab?.id}
                        className={classes.tabContainer}
                        sx={{
                            borderBottom:
                                selectedTab == tab?.id ? 'solid' : 'none',
                            cursor: "pointer"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight:
                                    selectedTab == tab?.id ? 'bold' : 'normal',
                            }}
                        >
                            {tab?.name}
                        </Typography>
                    </Box>
                );
            })}
        </Stack>
    );
};
export default Tabs;
