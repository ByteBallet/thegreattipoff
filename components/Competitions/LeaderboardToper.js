import { FormControl, MenuItem, Select, Typography, Box, Stack } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const LBToper = ({ qualified, handleChange }) => {
    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ pb: 1, px: 2 }}>
            <FormControl variant="standard" color={'black'}>
                <Select
                    IconComponent={KeyboardArrowDownIcon}
                    labelId="bettype-label"
                    id="bettype"
                    value={qualified}
                    onChange={handleChange}
                    className="BetProductsSelect"
                    inputProps={{
                        style: {
                            pr: 1,
                            border: 0,
                        },
                    }}
                    MenuProps={{
                        transitionDuration: 0,
                    }}
                    autoWidth
                >
                    <MenuItem value={0}>
                        <Typography fontSize={13} color={''}>
                            All Tipsters
                        </Typography>
                    </MenuItem>
                    <MenuItem value={1}>
                        <Typography fontSize={13} color={'black'}>
                            Qualified
                        </Typography>
                    </MenuItem>
                </Select>
            </FormControl>
            <Stack direction={'row'} justifyContent={'center'} sx={{ mt: 0.5, mb: 1 }}>
                <Box sx={{ width: '25px', height: '25px', bgcolor: '#fdf5f6', marginRight: '10px' }} />
                <Typography fontSize={13}>Not Qualified</Typography>
            </Stack>
        </Stack>
    );
};

export default LBToper;
