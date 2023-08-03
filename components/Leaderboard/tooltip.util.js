import { Typography, Box, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import CircleIcon from '@mui/icons-material/Circle';

export const tooltip_data = {
    Profit: {
        html: (
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                <Typography textAlign={'center'} fontSize={12} color="white.main">
                    If Even Stake is selected, <br /> profit is calculated using $100 stake on each tip from best tote starting price.{' '}
                </Typography>
            </Stack>
        ),
    },
    POT: {
        html: (
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                <Typography textAlign={'center'} fontSize={12} color="white.main">
                    Profit on Turnover</Typography>
            </Stack>
        ),
    },
    'Strike%': {
        html: (
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                <Typography textAlign={'center'} fontSize={12} color="white.main">Strike Rate</Typography>
            </Stack>
        ),
    },
    Streak: {
        html: (
            <Stack direction={"column"} justifyContent={"center"}>
                <Typography fontSize={12} color="white.main">Tipster&apos;s best streak, in either of the following categories:</Typography>

                <List>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <Box mr={1}>

                                <CircleIcon fontSize='12' color="white" />
                            </Box>
                        </ListItemIcon>
                        <ListItemText><Typography fontSize={12} color="white.main">Tip Streak: consecutive winning tips.</Typography></ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <Box mr={1}>

                                <CircleIcon fontSize='12' color="white" />
                            </Box>
                        </ListItemIcon>
                        <ListItemText><Typography fontSize={12} color="white.main">Day Tip Streak: consecutive profitable tipping days.</Typography></ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <Box mr={1}>

                                <CircleIcon fontSize='12' color="white" />
                            </Box>
                        </ListItemIcon>
                        <ListItemText><Typography fontSize={12} color="white.main">Week Tip Streak: consecutive profitable tipping weeks.</Typography></ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <Box mr={1}>

                                <CircleIcon fontSize='12' color="white" />
                            </Box>
                        </ListItemIcon>
                        <ListItemText><Typography fontSize={12} color="white.main">Month Tip Streak: consecutive profitable tipping months.</Typography></ListItemText>
                    </ListItem>
                </List>

            </Stack>
        ),
    },
    Tips: {
        html: (
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                <Typography textAlign={'center'} fontSize={12} color="white.main">
                    Number of tips submitted in period</Typography>
            </Stack>
        ),
    },
    Odds: {
        html: (
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                <Typography textAlign={'center'} fontSize={12} color="white.main">
                    Average price using best tote starting price.
                </Typography>
            </Stack>

        ),
    },
};
