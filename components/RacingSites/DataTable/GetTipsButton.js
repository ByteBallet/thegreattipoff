import { Button } from '@mui/material';
import React from 'react';

const GetTipsButton = () => {
    return (
        <Button
            fullWidth
            variant='contained'
            size="small"
            color="success"
            sx={{
                borderRadius: '8px',
                fontWeight: "700"
            }}>
            Get Tips
        </Button>
    );
};

export default GetTipsButton;