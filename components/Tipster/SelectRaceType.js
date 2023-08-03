import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, SvgIcon, Select, Avatar, Box } from '@mui/material';
import { hotbetCatList } from '@lib/constants';

const SelectRaceType = ({ selectedType, setselectedType, isProTipster, defaultRaceTypes = ['R', 'H', 'G'], isFeed = false }) => {
    const handleOnChange = (event) => {
        setselectedType(event.target.value);
    };

    const ICON_SIZE = isFeed ? 20 : isProTipster ? 30 : 30;
    const COLOR = isProTipster ? 'yellow.secondary' : 'grey.secondary';

    function SelectIcon({ item }) {
        return (
            <SvgIcon
                component={item?.svg_icon}
                viewBox={item?.view_box}
                sx={{
                    fontSize: ICON_SIZE,
                    color: COLOR,
                }}
            />
        );
    }
    return (
        <React.Fragment>
            {defaultRaceTypes?.length > 1 ? (
                <Select
                    IconComponent={isProTipster ? null : KeyboardArrowDownIcon}
                    id="outlined-select-currency"
                    value={selectedType}
                    onChange={handleOnChange}
                    variant="standard"
                    color="primary"
                    sx={{
                        fontSize: 14,
                        '&:before': {
                            border: 0,
                        },
                        '&:after': {
                            border: 0,
                        },
                    }}
                >
                    {defaultRaceTypes.map((racetype) =>
                        hotbetCatList
                            .filter((e) => e.value == racetype)
                            .map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                    <SelectIcon item={item} />
                                </MenuItem>
                            ))
                    )}
                </Select>
            ) : (
                <React.Fragment>
                    {defaultRaceTypes.map((racetype) =>
                        hotbetCatList
                            .filter((e) => e.value == racetype)
                            .map((item) => (
                                <Box key={item.value} value={item.value}>
                                    {' '}
                                    <SelectIcon item={item} />
                                </Box>
                            ))
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default SelectRaceType;
