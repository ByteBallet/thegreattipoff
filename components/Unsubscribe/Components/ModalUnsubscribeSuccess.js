import { Box, Typography, Button } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useState } from 'react';
import { useRouter } from 'next/router';
function ModalUnsubscribeSuccess({ alertObj }) {
    const handleChange = (value) => {
        console.log(value);
    };
    const router = useRouter();
    if (!alertObj) return <></>;
    let label =
        alertObj.followlabel === ''
            ? 'All Blackbook alerts'
            : `Blackbook emails for ${alertObj?.followlabel}`;
    return (
        <Box
            sx={{
                backgroundColor: 'white.main',
                width: '80%',
                borderRadius: '10px',
                padding: 2,
            }}
        >
            <Typography
                component="p"
                fontWeight="fontWeightBold"
                py={1}
                px={2}
                sx={{ textAlign: 'center' }}
                fontSize={18}
            >
                {`You've been successfully unsubscribed from:`}
            </Typography>

            <div>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={true} color="success" />}
                        label={label}
                    />
                </FormGroup>
            </div>
            <Box sx={{ mt: 1 }}>
                <Typography
                    component="p"
                    sx={{ textAlign: 'center' }}
                    fontSize={14}
                >
                    There may be a short delay of up to 24 hours for our systems
                    to be updated.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ width: '70%' }}
                    onClick={() => router.push('/')}
                >
                    Close
                </Button>
            </Box>
        </Box>
    );
}

export default ModalUnsubscribeSuccess;
