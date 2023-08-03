import {
    CancelRounded,
    CheckCircle,
    CheckCircleOutlined,
    Info,
    InfoOutlined,
    Lock,
} from '@mui/icons-material';
import React, { useState } from 'react';
import {
    Box,
    IconButton,
    InputAdornment,
    Typography,
    MenuItem,
    Select,
    Divider,
    Switch,
} from '@mui/material';
import { TextField } from '@mui/material';
import { useRef } from 'react';

const InputTextField3 = (props) => {
    const inputRef = useRef();
    const [focused, setFocused] = useState(false);
    const [isModifed, setModified] = useState(false);
    return (
        <>
            {props.label && (
                <Typography
                    sx={{
                        mb: 0.5,
                        mt: 2,
                        fontSize: 13,
                    }}
                    component="p"
                >
                    {props.label}{' '}
                    {props.required && <span style={{ color: 'red' }}>*</span>}
                </Typography>
            )}
            {props.type == 'select' ? (
                <Select
                    sx={styles.textFieldStyle}
                    value={props.value}
                    size="small"
                    id={props.id}
                    name={props.name}
                    onChange={props.onChange ? props.onChange : () => { }}
                    onBlur={props.onBlur ? props.onBlur : () => { }}
                    error={props.error ? props.error : false}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: '70vh',
                            },
                        },
                    }}
                    fullWidth
                >
                    <MenuItem value={0}>
                        <Typography
                            sx={{ fontSize: 12, color: 'grey.secondary' }}
                        >
                            {props.placeholder ? props.placeholder : ''}
                        </Typography>
                    </MenuItem>
                    {props.data &&
                        props.data.map((item, idx) => (
                            <MenuItem value={item.value} key={idx}>
                                <Typography sx={{ fontSize: 14 }}>
                                    {item.label}
                                </Typography>
                            </MenuItem>
                        ))}
                </Select>
            ) : (
                <TextField
                    sx={styles.textFieldStyle}
                    size="small"
                    id={props.id ? props.id : 'firstname'}
                    name={props.name ? props.name : 'firstname'}
                    disabled={props.disabled ? props.disabled : false} //
                    onChange={props.onChange} //
                    onFocus={(e) => {
                        setFocused(true);
                        setModified(true);
                        if (props.onFocus) props.onFocus(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        if (props.onBlur) props.onBlur(e);
                    }} //props.onBlur
                    error={!focused ? props.error : false}
                    value={props.value ? props.value : ''}
                    type={props.type ? props.type : 'text'}
                    fullWidth
                    InputProps={
                        props.InputProps
                            ? props.InputProps
                            : {
                                style: {
                                    fontSize: 14,
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {props.disabled ? (
                                            <Lock
                                                color="grey"
                                                fontSize="small"
                                            />
                                        ) : focused ? (
                                            <IconButton
                                                onClick={props.onReset}
                                                sx={{
                                                    px: 0,
                                                }}
                                            >
                                                <CancelRounded fontSize="small" />
                                            </IconButton>
                                        ) : props.value.length == 0 ? (
                                            <CancelRounded fontSize="small" />
                                        ) : props.error ? (
                                            <Info
                                                color="error"
                                                fontSize="small"
                                            />
                                        ) : isModifed ?
                                            (
                                                <CheckCircle
                                                    color="success"
                                                    fontSize="small"
                                                />
                                            ) : (
                                                <CancelRounded fontSize="small" />
                                            )}
                                    </InputAdornment>
                                ),
                            }
                    }
                />
            )}

            {props.errormsg && (
                <Box
                    sx={{
                        backgroundColor: 'error.light',
                        mt: 1,
                        py: 1,
                        px: 3,
                    }}
                >
                    <Typography
                        sx={{
                            color: 'error.main',
                            fontSize: 14,
                        }}
                    >
                        {props.errormsg}
                    </Typography>
                </Box>
            )}
        </>
    );
};

const styles = {
    mainContainer: {},
    textFieldStyle: {
        backgroundColor: 'grey.joinField',
        borderRadius: 2,

        '& input::placeholder': {
            fontSize: '13px',
        },
        [`& fieldset`]: {
            borderColor: 'grey.joinBorder',

            borderRadius: 2,
            '&.focused': {
                borderColor: 'red',
            },
        },

        fontSize: 14,
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                backgroundColor: 'white.main',
            },
            // '&.Mui-focused fieldset': {
            //     borderColor: 'green',
            // },
        },
    },
};
export default InputTextField3;
