import { Box, Button, Container, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

export default function MyLoadingButton(props) {
    const { label = 'Deposit Now', ...rest } = props;
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
            size="small"
            sx={{
                mt: 0,

                fontSize: 18,
                fontWeight: 'bold',
                py: 0,
                height: 42,
                boxShadow: '0px 2px 0px 0px #386c01',
            }}
            {...rest}
        >
            {label}
        </LoadingButton>
    );
}
