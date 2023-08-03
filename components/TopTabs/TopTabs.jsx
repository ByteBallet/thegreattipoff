import { Tabs, Tab } from '@mui/material';

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const TopTabs = ({ tabs, handler, active, itemWidth }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Tabs
                value={active}
                onChange={handler}
                variant="scrollable"
                scrollButtons={true}
                TabIndicatorProps={{
                    style: {
                        display: 'none',
                    },
                }}
                className="RacingTabs"
            >
                {tabs.map((item, idx) => (
                    <Tab
                        style={{ width: itemWidth }}
                        label={item}
                        {...a11yProps(idx)}
                        key={idx}
                    />
                ))}
            </Tabs>
        </div>
    );
};

export default TopTabs;
