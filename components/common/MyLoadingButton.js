import { Box, Button, Container, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

export default function MyLoadingButton(props) {
    const { label = 'Deposit Now', sx = {}, ...rest } = props;
    return (
        <LoadingButton
            loadingIndicator={
                <Typography
                    color="inherit"
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
            fullWidth
            disableElevation
            size="small"
            sx={{
                mt: 5,
                mb: 1,
                fontSize: rest.size === "small" ? 14 : 18,
                fontWeight: 'bold',
                py: 0,
                backgroundColor: 'success.main',
                color: 'white.main',
                height: rest.size === "small" ? 24 : 42,
                boxShadow: '0px 2px 0px 0px #386c01',
                borderRadius: 1.5,
                ...sx,
                // pt: 1,
            }}
            {...rest}
        >
            {label}
        </LoadingButton>
    );
}
