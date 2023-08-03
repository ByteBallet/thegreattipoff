import { Tab } from '@mui/material';
import Tabs from '@Components/Tabs/Tabs';

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const CustomIndicatorTabs = (props) => {
    const isCentered = props.tabs.length <= 2;

    return (
        <Tabs
            value={props.active}
            onChange={props.handler}
            aria-label={props.label}
            variant={!isCentered && 'scrollable'}
            centered={isCentered}
            className={props?.clsName}
        >
            {props.tabs.map((tab, idx) => (
                <Tab
                    key={idx}
                    label={tab}
                    {...a11yProps(idx)}
                    sx={{
                        backgroundColor: 'transparent',
                        '&.Mui-selected': {
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                            color: 'black.main',
                        },
                    }}
                />
            ))}
        </Tabs>
    );
};

export default CustomIndicatorTabs;
