import React, { useContext, useEffect, useState } from 'react';
import followcountStore from '@stores/followcountStore';
import { Box, Tabs, Typography, Tab } from '@mui/material';
import FollowedTipsters from './FollowedTipsters';
import CustomTabPanel from '@Components/Shared/CustomTabPanel';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ManageTipsterFollows = ({ label }) => {
    let subtabs = ["Following", "Popular"]
    let followcount = followcountStore((state) => state[label])
    const [activeSubTab, setactiveSubTab] = useState(followcount > 0 ? 0 : 1)

    const handlesubtabsChange = (event, newValue) => {
        setactiveSubTab(newValue);
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    width: 1, backgroundColor: 'text.active', display: "flex", justifyContent: "center"
                }}
            >
                <Tabs
                    value={activeSubTab}
                    onChange={handlesubtabsChange}
                    aria-label="Follow Tipsters"
                    sx={{ width: 1 }}>
                    {subtabs.map((item, idx) =>
                        <Tab
                            key={idx}
                            label={item}
                            {...a11yProps(idx)}
                            sx={{
                                width: "50%",
                                backgroundColor: "transparent",
                                borderBottom: 1,
                                borderColor: 'grey.light',
                                color: "black.main",
                                '&.Mui-selected': {
                                    backgroundColor: "transparent",
                                    fontWeight: "bold",
                                    color: "black.main",
                                }
                            }}
                        />
                    )}
                </Tabs>
            </Box>
            {subtabs.map((item, idx) =>
                <CustomTabPanel
                    value={activeSubTab}
                    index={idx}
                    key={idx}
                    content={
                        <FollowedTipsters label={item} />
                    }
                />
            )}
        </React.Fragment >
    );
};

export default ManageTipsterFollows;