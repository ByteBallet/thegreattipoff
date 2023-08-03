import { FormHelperText, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
const MessageHelperText = (props) => {
    const { error, title, children, ...rest } = props;

    return (
        <FormHelperText
            error={error}
            sx={{
                my: 1,
                mx: 0,
                py: 1,
                px: 1,
                width: '100%',
                backgroundColor: error ? '#fce3e6' : '#e7f4da',
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                visibility: !children && !title ? 'hidden' : 'visible',
            }}
        >
            {title ? (
                <Typography
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: error ? '#ff0000' : '#54aa01',
                    }}
                >
                    {title}
                </Typography>
            ) : (
                void 0
            )}
            {children ? (
                <Typography
                    style={{
                        fontSize: 14,
                        color: error ? '#ff0000' : '#54aa01',
                        whiteSpace: 'pre-wrap',
                        textAlign: ' center',
                    }}
                >
                    {children}
                </Typography>
            ) : (
                void 0
            )}
        </FormHelperText>
    );
};

export default MessageHelperText;
