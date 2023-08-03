import { TextField, InputAdornment, IconButton, colors } from '@mui/material';
import { getButtonIcons } from '../utils/icons';
import { makeStyles } from '@mui/styles';
import {
    CheckCircleOutlined,
    InfoOutlined,
    CancelRounded,
} from '@mui/icons-material';

const useStyles2 = makeStyles((theme) => ({
    textField: {
        '& .MuiInputBase-root': {
            fontSize: '0.9rem',
        },
    },
}));

const InputTextField = (props) => {
    const { disabled, error, reset, isFirst, name } = props;
    // console.log("InputTextField", name, isFirst, reset);
    const classes = useStyles2();
    return (
        <TextField
            color={error ? 'error' : 'success'}
            // className={classes.textField}
            InputProps={{
                style: {
                    backgroundColor: disabled ? '#eeeeee' : 'white',
                },
                endAdornment: (
                    <InputAdornment position="end">
                        {/* <CheckCircleOutline color="success" /> */}
                        {disabled ? (
                            getButtonIcons('svg', 'LOCK', 14, '#ccc')
                        ) : error ? (
                            <InfoOutlined
                                color="error"
                                sx={{ fontSize: '16px' }}
                            />
                        ) : isFirst ? (
                            <IconButton
                                onClick={reset}
                                style={{ paddingRight: '0' }}
                            >
                                <CancelRounded
                                    sx={{
                                        fontSize: '16px',
                                    }}
                                />
                            </IconButton>
                        ) : (
                            <CheckCircleOutlined
                                color="success"
                                sx={{
                                    fontSize: '16px',
                                }}
                            />
                        )}
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};

export default InputTextField;
