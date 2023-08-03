import React from 'react';
import { Button } from '@mui/material';

const CustomOutlinedButton = ({ handleClick, title, rounded = true, icon = null,
    color = "success", size = "large", disabled = false, bgcolor = "inherit" }) => {
    return (
        <Button
            disabled={disabled}
            color={color}
            variant="outlined"
            endIcon={icon}
            size={size}
            sx={{
                fontWeight: "bold",
                borderRadius: rounded ? 10 : 2,
                minWidth: "auto",
                px: size == "small" ? 1 : 1.2,
                width: 1,
                border: 1.5,
                bgcolor: bgcolor
            }}
            onClick={handleClick}
        >
            {title}
        </Button>
    );
};

export default CustomOutlinedButton;