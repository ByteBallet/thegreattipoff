import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { getButtonIcons } from '../utils/icons';
import { makeStyles } from '@mui/styles';

import {
    CheckCircleOutlined,
    InfoOutlined,
    CancelRounded,
    Visibility,
    VisibilityOff,
    Info,
    CheckCircle,
} from '@mui/icons-material';
const useStyles2 = makeStyles((theme) => ({
    iconButton: {
        '& .MuiIconButton-root': {
            fontSize: '1.2rem',
        },
    },
}));
const InputTextField2 = (props) => {
    const { error, reset, isEyed, focused, name, ...rest } = props;
    // console.log("InputTextField", name, isFirst, reset);
    const isFocused = focused === name;
    const classes = useStyles2();
    const [visible, setVisible] = useState(false);
    // useEffect(() => {

    // }, [focused]);
    console.log('visible=', visible);
    return (
        <TextField
            color={error ? 'error' : 'success'}
            type={visible ? 'text' : 'password'}
            name={name}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {isFocused ? (
                            isEyed ? (
                                <IconButton
                                    onClick={() => setVisible(!visible)}
                                    className={classes.iconButton}
                                >
                                    {visible ? (
                                        <Visibility size="small" />
                                    ) : (
                                        <VisibilityOff size="small" />
                                    )}
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={reset}
                                    className={classes.iconButton}
                                >
                                    <CancelRounded
                                        size="small"
                                        style={{ paddingRight: 0 }}
                                    />
                                </IconButton>
                            )
                        ) : error ? (
                            <Info color="error" size="small" />
                        ) : (
                            <CheckCircle color="success" size="small" />
                        )}
                    </InputAdornment>
                ),
            }}
            {...rest}
        />
    );
};

export default InputTextField2;
