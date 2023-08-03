import { useState } from 'react';
import { TextField } from '@mui/material';

const NumericField = (props) => {
  const { value, ...rest } = props;
  const [value2, setValue2] = useState({ value });
  const handleKeyUp = (e) => {
    setValue2(e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim());
  }
  return (
    <TextField
      onKeyUp={e => handleKeyUp(e)}
      value={value2}
      {...rest} />
  );
}

export default NumericField;