import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';
import { isNumber } from 'lodash';

const CurrencyNumberCustom = forwardRef(function CurrencyNumberCustom(
  {
      allowDecimals = true,
      allowNegativeValue = true,
      id,
      name,
      className,
      customInput,
      decimalsLimit,
      defaultValue,
      disabled = false,
      maxLength: userMaxLength,
      value: userValue,
      onValueChange,
      fixedDecimalLength,
      placeholder,
      decimalScale,
      prefix,
      suffix,
      intlConfig,
      step,
      min,
      max,
      disableGroupSeparators = false,
      disableAbbreviations = false,
      decimalSeparator: _decimalSeparator,
      groupSeparator: _groupSeparator,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      transformRawValue,
      ...props
    },
    ref
){
    
});



export function CurrencyInputField  (props) {    
  const {...rest} = props;
  
    return (
      <TextField
      {...rest}      
      
      />
    )
    
}