import React from 'react';
import moment from 'moment';
import { Box, Divider } from '@mui/material';
import CustomIndicatorTabs from '@Components/Shared/CustomIndicatorTabs';
import BoxDivider from '@Components/Shared/BoxDivider';
import RacingData from './RacingData';
import CustomTabPanel from '@Components/Shared/CustomTabPanel';

const ResultsSubMenu = (props) => {
    const { racedate, activeSubMenu, handleSubMenuChange } = props
    let resultdays = []
    Array.from(Array(14)).map((e, i) => {
        let tab = {}
        let d = moment(racedate).subtract(i, 'd').format('YYYY-MM-DD')
        let isYesterday = moment(moment().format('YYYY-MM-DD')).diff(moment(d), "days") == 1
        tab.day = d
        tab.label = isYesterday ? "Yesterday" : moment(racedate).subtract(i, 'd').format('ddd Do')
        resultdays.push(tab)
    });
    resultdays = resultdays.reverse()
    return (
        <React.Fragment>
            <Box sx={{ bgcolor: "white.main" }}>
                <Divider sx={{ borderColor: "#d0d1d2", boxShadow: "0 1px #fff" }} />
                <CustomIndicatorTabs
                    tabs={resultdays.map((item) => item.label)}
                    handler={handleSubMenuChange}
                    active={activeSubMenu}
                    label="Results Sub Menu"
                    clsName="resultsSubMenu"
                />
            </Box>
            {props.getFilterIcons && props.getFilterIcons()}
            {
                resultdays.map((item) => item.day).map((raceday, idx) =>
                    <CustomTabPanel
                        value={activeSubMenu}
                        index={idx}
                        key={idx}
                        content={
                            <RacingData
                                {...props}
                                key={raceday}
                                racedate={raceday}
                            />
                        }
                    />
                )
            }
        </React.Fragment>
    );
};

export default ResultsSubMenu;