import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const InputWithValid2 = (props) => {
  const {
    name,
    rows,
    label,
    required,
    value,
    autoComplete,
    autoFocus,
    disabled,
    errorText,
    fullWidth,
    getIsValidField,
    margin,
    FormHelperTextProps,
    InputLabelProps,
    select,
    variant,
    SelectProps,
    type,
    regexp,
    inputProps,
    onChange,
    selectValues,
    classTextField,
    classMenuItem,
    classInputAdornment,
    classIconButton,

    ...rest
  } = props;

  const [state, setState] = React.useState({
    error: false,
    clue: '',
    showPassword: false
  });
  const onChangeWithValidation = (e) => {
    const { value } = e.target;
    const pattern = new RegExp(regexp || patternInput);
    let error = false;
    onChange(e);
    error = !pattern.test(value);
    if (!pattern.test(value)) {
      setState({ ...state, clue: errorText });
    } else {
      setState({ ...state, clue: '' });
    }
    setState({ ...state, error });
    if (getIsValidField) {
      getIsValidField(name, !error);
    }
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  const inputPropsWithRegexp = (regexp) ? ({ ...inputProps, pattern: regexp }) : inputProps;
  const { error, clue, showPassword } = state;
  const multiline = (!!rows);
  if (type === 'password') {

    return (
      <TextField
        id={name}
        type={showPassword ? 'text' : 'password'}
        name={name}
        FormHelperTextProps={FormHelperTextProps || {}}
        InputLabelProps={InputLabelProps || {}}
        disabled={disabled || false}
        // label={label}
        autoFocus={autoFocus || false}
        fullWidth={fullWidth || false}
        className={classTextField}
        multiline={multiline}
        rows={rows || 1}
        required={required}
        error={error}
        value={value}
        sm={12}
        md={12}
        xs={12}
        variant={variant || 'outlined'}
        helperText={clue}
        onChange={onChangeWithValidation}
        margin={margin || 'normal'}
        select={select || false}
        SelectProps={SelectProps || {}}
        autoComplete={autoComplete || ''}
        InputProps={{
          endAdornment: (
            <InputAdornment className={classInputAdornment} position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                className={classIconButton}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...rest}
      />
    );

  }
  return (
    <TextField
      id={name}
      name={name}
      FormHelperTextProps={FormHelperTextProps || {}}
      InputLabelProps={InputLabelProps || {}}
      disabled={disabled || false}
      // label={label}
      autoFocus={autoFocus || false}
      fullWidth={fullWidth || false}
      className={classTextField}
      multiline={multiline}
      rows={rows || 1}
      required={required}
      inputProps={inputPropsWithRegexp || {}}
      error={error}
      value={value}
      variant={variant || 'outlined'}
      helperText={clue}
      type={type || 'text'}
      onChange={onChangeWithValidation}
      margin={margin || 'normal'}
      select={select || false}
      SelectProps={SelectProps || {}}
      autoComplete={autoComplete || ''}
      {...rest}
    />
  );
}

export default InputWithValid2;