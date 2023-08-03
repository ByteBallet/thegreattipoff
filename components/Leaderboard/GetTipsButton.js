import { Button } from '@mui/material';
import React from 'react';

const GetTipsButton = ({ onClick }) => {
    return (
        <Button
            onClick={() => onClick()}
            fullWidth
            variant="contained"
            size="small"
            color="success"
            sx={{
                fontWeight: '700',
                height: '35px',
            }}
        >
            Get Tips
        </Button>
    );
};

export default GetTipsButton;
