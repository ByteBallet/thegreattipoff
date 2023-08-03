import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


class InputWithValid extends Component {
  state = {
    error: false,
    clue: '',
    showPassword: false,
  }

  onChangeWithValidation = (e) => {
    const {
      name, required, errorText, regexp, onChange, getIsValidField, inputProps,
    } = this.props;
    const { value } = e.target;
    const patternInput = inputProps && inputProps.pattern;
    let error = false;
    onChange(e);
    error = (required && value.length === 0);
    if (regexp || patternInput) {
      const pattern = new RegExp(regexp || patternInput);
      error = !pattern.test(value);
      if (!pattern.test(value)) {
        this.setState({ clue: errorText });
      } else {
        this.setState({ clue: '' });
      }
    }
    this.setState({ error });
    if (getIsValidField) {
      getIsValidField(name, !error);
    }
  };

  handleClickShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      name,
      rows,
      label,
      required,
      value,
      autoComplete,
      autoFocus,
      disabled,
      fullWidth,
      margin,
      FormHelperTextProps,
      InputLabelProps,
      select,
      variant,
      SelectProps,
      type,
      regexp,
      inputProps,
      selectValues,
      classTextField,
      classMenuItem,
      classInputAdornment,
      classIconButton,
    } = this.props;
    const inputPropsWithRegexp = (regexp) ? ({ ...inputProps, pattern: regexp }) : inputProps;
    const { error, clue } = this.state;
    const multiline = (!!rows);
    if (select) {
      return (
        <TextField
          id={name}
          name={name}
          FormHelperTextProps={FormHelperTextProps || {}}
          InputLabelProps={InputLabelProps || {}}
          disabled={disabled || false}
          label={label}
          autoFocus={autoFocus || false}
          fullWidth={fullWidth || false}
          className={classTextField}
          required={required}
          inputProps={inputPropsWithRegexp || {}}
          error={error}
          value={value}
          variant={variant || 'outlined'}
          helperText={clue}
          onChange={this.onChangeWithValidation}
          margin={margin || 'normal'}
          select={select || false}
          SelectProps={SelectProps || {}}
          autoComplete={autoComplete || ''}
        >
          {selectValues.map((option) => (
            <MenuItem className={classMenuItem} key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }
    if (type === 'password') {
      const { showPassword } = this.state;
      return (
        <TextField
          id={name}
          type={showPassword ? 'text' : 'password'}
          name={name}
          FormHelperTextProps={FormHelperTextProps || {}}
          InputLabelProps={InputLabelProps || {}}
          disabled={disabled || false}
          label={label}
          autoFocus={autoFocus || false}
          fullWidth={fullWidth || false}
          className={classTextField}
          multiline={multiline}
          rows={rows || 1}
          required={required}
          error={error}
          value={value}
          variant={variant || 'outlined'}
          helperText={clue}
          onChange={this.onChangeWithValidation}
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
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
        label={label}
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
        onChange={this.onChangeWithValidation}
        margin={margin || 'normal'}
        select={select || false}
        SelectProps={SelectProps || {}}
        autoComplete={autoComplete || ''}
      />
    );
  }
}

InputWithValid.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  errorText: PropTypes.string,
  rows: PropTypes.number,
  label: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  getIsValidField: PropTypes.func,
  autoComplete: PropTypes.string,
  regexp: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  FormHelperTextProps: PropTypes.object,
  InputLabelProps: PropTypes.object,
  select: PropTypes.bool,
  variant: PropTypes.string,
  SelectProps: PropTypes.object,
  selectValues: PropTypes.array,
  type: PropTypes.string,
  inputProps: PropTypes.object,
  classTextField: PropTypes.string,
  classMenuItem: PropTypes.string, // for 'select' type
  classInputAdornment: PropTypes.string, // for 'password' type
  classIconButton: PropTypes.string, // for 'password' type
};
export default InputWithValid;