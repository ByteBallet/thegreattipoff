import React, { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Select, MenuItem, Box } from '@mui/material';
import { getStakeOptions } from '@Components/utils/util';

const StakeSelect = ({ variant = 'outlined', value, onChange, bgcolor = 'transparent', isStakeAll = false, stakeSettings = [] }) => {
    const defaultOptions = {
        'Lowest (50)': '50',
        'Lower (75)': '75',
        'Standard (100)': '100',
        'Higher (200)': '200',
        'Highest (250)': '250',
    };
    const [options, setoptions] = useState(defaultOptions);
    const styles = {
        textFieldStyle: {
            backgroundColor: bgcolor,
            color: 'white.main',
            borderRadius: 2,
            padding: '7px 5px',
            textAlign: isStakeAll ? 'left' : 'right',
            '& input::placeholder': {
                fontSize: '13px',
            },
            [`& fieldset`]: {
                borderRadius: 2,
                '&.focused': {
                    borderColor: 'inherit',
                },
            },
            fontSize: 14,
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused': {
                    backgroundColor: 'white.main',
                },
            },
            '& .MuiSelect-select': {
                pl: '0px !important',
                py: '2px !important',
            },
            '&:before': {
                border: 0,
            },
            '&:after': {
                border: 0,
            },
            '& .MuiSelect-icon': {
                color: isStakeAll ? 'white.main' : 'primary.main',
            }
        },
    };
    useEffect(() => {
        stakeSettings?.length > 0 && setoptions(getStakeOptions(stakeSettings));
    }, [stakeSettings]);
    return (
        <Box sx={{ width: 1 }}>
            <FormControl
                variant={variant}
                sx={{
                    bgcolor: bgcolor,
                    borderRadius: 2,
                }}
                fullWidth
            >
                <Select
                    IconComponent={KeyboardArrowDownIcon}
                    labelId="stakes-label"
                    id="stakes-singles"
                    value={value}
                    onChange={onChange}
                    MenuProps={{
                        transitionDuration: 0,
                    }}
                    sx={styles.textFieldStyle}
                >
                    {Object.keys(options).map((key, idx) => (
                        <MenuItem key={idx} value={options[key]?.toString()}>
                            {key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default StakeSelect;
