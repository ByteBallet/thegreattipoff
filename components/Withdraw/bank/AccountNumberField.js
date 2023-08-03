import { TextField } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="000000000000"
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

export default function AccountNumberField(props) {
   return (
      <TextField          
            {...props}                        
            InputProps={{
                inputComponent: TextMaskCustom,
                fontSize: 14,                                
            }}
            
            inputProps={{
              inputMode: 'numeric',
              type:'number',
            }}
        />
   )
}
