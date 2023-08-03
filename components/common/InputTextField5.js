import React, {useState,useEffect} from 'react';
import { FormControlLabel,InputAdornment, TextField,Typography,Box } from "@mui/material";
import {
    CancelRounded,
    CheckCircle,
    CheckCircleOutlined,
    Info,
    InfoOutlined,
    Lock,
} from '@mui/icons-material';

export default function InputTextField5 (props) {
  const {label, error, ...rest} = props;  
  const [isFocused, setFocused] = useState(false);
  const [isModified, setModified] = useState(false);    
  
  return (
    <>
    <FormControlLabel
    fullWidth
    sx={{
      m:0,
      alignItems:'flex-start',
      width:1,
      mt:2,
      fontSize:14,
    }}
    control={
      <TextField      
      error ={
        isModified && Boolean(error)
      }
      onFocus={(e)=>{
        setFocused(true);
        setModified(true);
        if(props.onFocus) props.onFocus(e);
      }
      }
      onChange={e=>{        
        if(props.onChange) props.onChange(e);
      }}
      onBlur = {(e)=>{
        setFocused(false);
          if(props.onBlur) props.onBlur(e);                  
      }}    
      {...rest}     
      InputProps={{
        endAdornment:(
          <InputAdornment position="end">
            {
              
            }
          </InputAdornment>
        )
      }}
      />
    }
    label={
        <Typography fontSize={14}>{label||'No Label:'}</Typography>
    }
    labelPlacement="top"
    />
    {
      Boolean(error) &&
      <Box
          sx={{
              backgroundColor: 'error.light',
              mt: 1,
              py: 1,
              px: 3,
          }}
      >
          <Typography
              sx={{ color: 'error.main', fontSize: 14 }}
          >
              {error}
          </Typography>
      </Box>
    }
    </>
  );
}