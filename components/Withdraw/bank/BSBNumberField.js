import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="000-000"            
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) =>
                onChange({ target: { name: props.name, value } })
            }  
            style={{
              fontSize:14,
            }}         
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function BSBNumberField(props) {
    return (
        <TextField
            {...props}            
            // type="number"
            InputProps={{
                inputComponent: TextMaskCustom,               
            }}
            inputProps={{
              type:'text',
              inputmode:'numeric',
            }}
        />
    );
    // return <Input {...props} inputComponent={TextMaskCustom} />;
}
