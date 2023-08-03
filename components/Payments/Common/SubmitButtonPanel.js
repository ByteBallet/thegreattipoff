import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';

export default function SubmitButtonPanel(props) {
    const { loading = false, disabled = false, label = 'Save' } = props;
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                py: 2,
                mt: 2,
            }}
        >
            <LoadingButton
                loading={loading}
                loadingIndicator={
                    <Typography
                        color="inherit"
                        fullWidth={true}
                        sx={{
                            width: 'max-content',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress
                            color="inherit"
                            size={16}
                            sx={{ mr: 1 }}
                        />{' '}
                        Please wait...
                    </Typography>
                }
                color="success"
                variant="contained"
                // onClick={() => handleSubmit()}
                fullWidth={true}
                size="small"
                disabled={disabled}
                sx={{
                    // mt: 3,
                    // width: 1,
                    fontSize: 16,
                    fontWeight: 'bold',
                    py: 0,
                    mx: 4,
                    height: 42,
                    boxShadow: '0px 2px 0px 0px #386c01',
                }}
                type="submit"
            >
                {label}
            </LoadingButton>
        </Container>
    );
}
