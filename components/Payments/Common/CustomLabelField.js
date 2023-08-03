import React from 'react';
import {
    FormGroup,
    TextField,
    FormControlLabel,
    Typography,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
import MyFormHelperText from './MyFormHelperText';
import {
    CheckCircleOutline,
    CheckCircleIcon,
    CheckCircleOutlineOutlined,
    CheckCircle,
} from '@mui/icons-material';
const CustomLabelField = (props) => {
    const {
        error = undefined,
        type = 'text',
        name = 'name',
        placeholder = 'placeholder',
        label = 'Label',
        value = 0,
        onChange = () => {},
        control = undefined,
        onBlur = () => {},
        labelStyle = {},
        style = {},
        inputComponent={}
    } = props;

    return (
        <FormGroup sx={{ my: 2, ...style }}>
            <FormControlLabel
                sx={styles.container}
                control={
                    control ? (
                        control
                    ) : (
                        <TextField
                            className="deposit-amount"
                            name={name}
                            hiddenLabel
                            type={type}
                            placeholder={placeholder}
                            variant="outlined"
                            size="small"
                            value={value}
                            inputProps={{
                                inputComponent:inputComponent,
                                style: {
                                    fontSize: 14,
                                    '& input[type=number]': {
                                        '-moz-appearance': 'textfield',
                                    },
                                    '& input[type=number]::-webkit-outer-spin-button':
                                        {
                                            '-webkit-appearance': 'none',
                                            margin: 0,
                                        },
                                    '& input[type=number]::-webkit-inner-spin-button':
                                        {
                                            '-webkit-appearance': 'none',
                                            margin: 0,
                                        },
                                },
                            }}
                            onChange={(e) => onChange(e)}
                            onBlur={(e) => onBlur(e)}
                            sx={styles.inputField}
                            InputProps={{}}
                        />
                    )
                }
                label={
                    <Typography sx={{ fontSize: 14, pb: 0, ...labelStyle }}>
                        {label}
                    </Typography>
                }
                labelPlacement="top"
            />
            <MyFormHelperText>{error}</MyFormHelperText>
        </FormGroup>
    );
};
export default CustomLabelField;
const styles = {
    container: {
        m: 0,
        alignItems: 'flex-start',
        width: 1,
    },
    inputField: {
        pr: 0,
        width: 1,
        fontSize: 12,
        fontFamily: 'Meiryo UI',
        backgroundColor: 'white',
    },
};
