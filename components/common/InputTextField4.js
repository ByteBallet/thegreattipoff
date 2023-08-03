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

export default function InputTextField4 (props) {
  const {label, error, ...rest} = props;
  
  const [focused, setFocused] = useState(false);
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
      
      // sx={{
      //   backgroundColor:(!focused && error)?'error.light':'white',
      //   borderColor:(!focused && error)?'error.main':'border.outlined'
      // }}     
      
      onFocus={(e)=>{
        setFocused(true);
        setModified(true);
        if(props.onFocus) props.onFocus(e);

      }
      }
      onChange={e=>{
        // setInputValue(e.target.value);
        if(props.onChange) props.onChange(e);
      }}
      onBlur = {(e)=>{
        setFocused(false);
          if(props.onBlur) props.onBlur(e);                  
      }}
      {...rest}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {
              focused?
              <></>:
              isModified==false?
              <CancelRounded fontSize="small"/>:
              props.value.length==0?
              <CancelRounded fontSize="small"/>
              :error?
              <Info color="error" fontSize="small"/>
              :              
              <CheckCircle color="success" fontSize="small"/>              
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