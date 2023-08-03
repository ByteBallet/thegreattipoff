import PropTypes from 'prop-types';

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}
const CustomTabPanel = (props) => {
    return (
        <TabPanel value={props.value} index={props.index}>
            {props.content}
        </TabPanel>
    );
};

export default CustomTabPanel;
