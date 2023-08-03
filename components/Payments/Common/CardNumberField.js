import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
const { IMaskInput } = require("react-imask");


 const CardNumberCustom = React.forwardRef(function CardNumberCustom(props,ref){
  const {onChange, ...rest} = props;
  return (
    <IMaskInput
      {...rest}
      mask="0000 0000 0000 0000"
      definitions={{
        '#':/[0-9]/,
      }}
         
          inputRef={ref}
          onAccept={(value) =>
              onChange({ target: { name: props.name, value } })
          }
          overwrite
      />
    );
});

CardNumberCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const CurrencyNumberCustom = React.forwardRef(function CurrencyNumberCustom(props,ref){
  const {onChange, ...rest} = props;
  return (
    <IMaskInput
      {...rest}
      mask="000"     
      definitions={{
        '#':/[0-9]/,
      }}
         
          inputRef={ref}
          onAccept={(value) =>
              onChange({ target: { name: props.name, value } })
          }
          overwrite
      />
    );
});

CurrencyNumberCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};



export default function CardNumberField(props){
  return (
    <TextField
    {...props}
   
    inputProps={{ 
      style:{
        fontSize:14,
      },
      type:'text',
      inputMode: 'numeric',
    }}
    InputProps={{
      inputComponent:CardNumberCustom,           
    }}
    />
  );
}


const CCVNumberCustom = React.forwardRef(function CCVNumberCustom(props,ref){
  const {onChange, ...rest} = props;
  return (
    <IMaskInput
      {...rest}
      mask="000"     
      definitions={{
        '#':/[0-9]/,
      }}
      // type="number"    
      // inputMode='numeric'
          inputRef={ref}
          onAccept={(value) =>
              onChange({ target: { name: props.name, value } })
          }
          overwrite
      />
    );
});

CCVNumberCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export  function CCVNumberField(props){
  return (
    <TextField
    {...props}
    
    inputProps={{ 
      style:{
      fontSize:14,
      },
      maxLength: 3,
      type:'text',
      inputMode: 'numeric' 
    }}
    // InputProps={{
    //   inputComponent:CCVNumberCustom,
      
      
    // }}
    />
  );
}