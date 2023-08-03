import React, { useState } from 'react';
import CustomMaskInput from './CustomMaskInput';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { CheckCircleOutlined, InfoOutlined, CancelRounded, Visibility, VisibilityOff, Info, CheckCircle } from "@mui/icons-material";
const CustomCreditField = (props) => {

  const { error, ...rest } = props;
  const [state, setState] = useState()

  return (
    <CustomMaskInput
      color={error ? 'error' : 'success'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {
              error ?
                <Info color="error" size="small" /> :
                <CheckCircle color="success" size="small" />
            }
          </InputAdornment>
        )
      }}
      {...rest}
    />
  )

}

export default CustomCreditField;