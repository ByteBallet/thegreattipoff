import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const FormikSelectBox = ({
    value,
    handleOnChange,
    label,
    options,
    disabled,
    error,
    id,
    name,
    selectId,
}) => {
    const handleChange = (event) => {
        handleOnChange(event.target?.value);
    };
    return (
        <Box flexDirection={'column'}>
            <Typography variant="p">{label}</Typography>
            <br />
            <FormControl sx={{ m: 1, width: '90%' }}>
                <Select
                    error={error}
                    id={selectId}
                    disabled={disabled}
                    size="small"
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                        transitionDuration: 0,
                    }}
                >
                    {Array.isArray(options) &&
                        options?.length > 0 &&
                        options?.map((option) => (
                            <MenuItem key={option[id]} value={option[id]}>
                                {option[name]}
                            </MenuItem>
                        ))}
                </Select>
                {error && (
                    <FormHelperText sx={{ color: 'red' }}>
                        {error}
                    </FormHelperText>
                )}
            </FormControl>
        </Box>
    );
};

export default FormikSelectBox;
