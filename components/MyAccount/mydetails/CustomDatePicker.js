import { FormControl, FormGroup, InputAdornment, TextField } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const CustomDatePicker = (props) => {
  const { dateDOB, monthDOB, yearDOB } = props;

  return (
    <FormGroup row style={{ justifyContent: 'space-between' }}>
      <TextField
        aria-describedby="date-day-text"
        InputLabelProps={{ style: { pointEvents: 'auto' } }}
        variant="outlined"
        disabled
        value={dateDOB}
        size="small"
        style={{
          marginLeft: 0, padding: '4px',
        }}
        sx={{
          width: '30%',
          '&  div': {
            backgroundColor: '#f3f3f3',
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {<ExpandMoreIcon />}
            </InputAdornment>
          ),
        }}
        type="text" />

      <TextField
        aria-describedby="date-month-text"
        InputLabelProps={{ style: { pointEvents: 'auto' } }}
        variant="outlined"
        disabled
        value={monthDOB}
        size="small"
        style={{
          marginLeft: 0, padding: '4px',
        }}
        sx={{
          width: '30%',
          '&  div': {
            backgroundColor: '#f3f3f3',
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {<ExpandMoreIcon />}
            </InputAdornment>
          ),
        }}
        type="text" />

      <TextField
        aria-describedby="date-year-text"
        InputLabelProps={{ style: { pointEvents: 'auto' } }}
        variant="outlined"
        disabled
        value={yearDOB}
        size="small"
        style={{
          fontSize: '0.9rem',
          marginLeft: 0, padding: '4px',
        }}
        sx={{
          width: '35%',
          '&  div': {
            backgroundColor: '#f3f3f3',
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {<ExpandMoreIcon />}
            </InputAdornment>
          ),
        }}
        type="text" />

    </FormGroup>
  )
}

export default CustomDatePicker;