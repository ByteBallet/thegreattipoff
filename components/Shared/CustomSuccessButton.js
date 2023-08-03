import React from 'react';
import { Button } from '@mui/material';

const CustomSuccessButton = ({
    handleClick,
    title,
    rounded = true,
    fullwidth = false,
    disabled = false,
    size = "small",
    fontSize = 14
}) => {
    return (
        <Button
            fullWidth={fullwidth}
            color="success"
            variant="contained"
            size={size}
            disabled={disabled}
            sx={{
                fontWeight: 'bold',
                boxShadow: '0px 2px 0px 0px #386c01',
                borderRadius: rounded ? 10 : 2,
                minWidth: 100,
                maxWidth: '350px',
                fontSize: fontSize,
            }}
            onClick={handleClick}
        >
            {title}
        </Button>
    );
};

export default CustomSuccessButton;
