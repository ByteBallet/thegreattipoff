import React from "react";
import { useFormikContext } from "formik";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const FormikTextBox = ({
  name,
  label,
  type,
  size,
  fullWidth,
  defaultValue,
  sx,
  InputLabelProps,
  multiline,
  rows,
  disabled = false,
  inputProps
}) => {
  const { handleChange, handleBlur, values, errors, touched } =
    useFormikContext();

  return (
    <Box>
      <Typography variant="p">{label}</Typography>
      <TextField
        error={touched[name] && errors[name] ? true : false}
        helperText={touched[name] && errors[name]}
        value={values[name]}
        name={name}
        onChange={handleChange(name)}
        onBlur={handleBlur(name)}
        size={size || "small"}
        fullWidth={fullWidth}
        type={type}
        sx={sx}
        InputLabelProps={InputLabelProps}
        inputProps={inputProps}
        defaultValue={defaultValue}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
      />
    </Box>
  );
};

export default FormikTextBox;
