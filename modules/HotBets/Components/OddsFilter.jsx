import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const OddsFilter = ({ handleChange, value, onChangeCommitted, min, max }) => {
    return (
        <Box sx={{ mx: 2 }}>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                disableSwap
                onChangeCommitted={onChangeCommitted}
                min={min}
                max={max}
                sx={{
                    '.MuiSlider-rail': {
                        backgroundColor: "#c7c7c7",
                        borderColor: "#c7c7c7"
                    },
                    '.MuiSlider-track': {
                        backgroundColor: "#ACACAC",
                        borderColor: "#ACACAC"
                    }
                }}
            />
        </Box>
    );
};

export default OddsFilter;
