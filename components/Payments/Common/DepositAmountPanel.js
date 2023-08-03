import { CancelRounded, CloseOutlined } from '@mui/icons-material';
import {
  Button,
  TextField,
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { parseInt } from 'lodash';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MyFormHelperText from './MyFormHelperText';


export default function DepositAmountPanel(props) {
  const isGTO = process.env.APP_BRAND == "gto"
  let minAmt = isGTO ? 10 : 5
  // const [error, setError] = useState('');
  const {
    amount = '',
    setAmount = () => { },
    placeholder = 'Minimum withdraw is $' + minAmt,
    error = '',
    label = 'Deposit Amount:',
    setError = () => { },
    labelStyle = {},
    minimum = parseFloat(minAmt),
    errormsg = 'Minimum deposit amount is $' + minAmt,
    style = {},
  } = props;

  const setValue = (v) => {
    let kk = parseFloat(amount);
    if (!kk) {
      setAmount((parseInt(v)).toFixed(2));

    } else
      setAmount((kk + parseFloat(v)).toFixed(2));

    setError('');
  };

  const handleChange = e => {
    let vv = e.target.value;
    vv = vv.replace(/[^\d.]/g, '');
    setAmount(vv);
  }

  const handleBlur = (e) => {
    let vv = e.target.value;
    let val = parseFloat(vv);

    if (!val) {
      setError("Invalid amount entered");
    } else if (val < minimum) {
      setError(errormsg);
    } else {
      setError('');
    }
  };

  return (
    <Box sx={{ ...styles.container, ...style }}>
      <Typography sx={{ fontSize: 14, pb: 0, fontWeight: 'bold' }}>
        {label}
      </Typography>

      <TextField
        sx={styles.textFieldStyle}
        size="small"
        id="amount"
        name="amount"
        value={amount}
        onChange={handleChange}
        onBlur={
          handleBlur
        }

        type="number"
        placeholder={placeholder}
        inputProps={{
          style: {
            fontSize: 14,
          },
          type: "text",
          inputMode: 'decimal',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              $
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              {
                Boolean(amount) &&

                <CancelRounded size="small" color="grey" sx={{ padding: 0 }} onClick={() => {
                  setAmount('');
                }} />

              }
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <AmountButton
          // selected={amount == 10}
          key={1}
          number={10}
          onClick={(e) => setValue(10)}
        />
        <AmountButton
          key={2}
          // selected={amount == 25}
          number={25}
          onClick={(e) => setValue(25)}
        />
        <AmountButton
          key={3}
          // selected={amount == 50}
          number={50}
          onClick={(e) => setValue(50)}
        />
        <AmountButton
          // selected={amount == 100}
          key={4}
          number={100}
          onClick={(e) => setValue(100)}
        />
        <AmountButton
          // selected={amount == 500}
          key={5}
          number={500}
          onClick={(e) => setValue(500)}
        />
      </Box>
      <Container sx={{ px: 2 }}>
        <MyFormHelperText>{error}</MyFormHelperText>
      </Container>
    </Box>
  );
}

const AmountButton = (props) => {
  const { selected = false, number, onClick } = props;
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetcha = () => {
      if (clicked) {
        setClicked(false);
      }

    };

    const tt = setTimeout(fetcha, 100);
    return () => clearTimeout(tt);
  }, [clicked]);

  return (
    <Button
      size="small"
      // variant="button"                
      onClick={onClick}
      className="oddsBtn"
      sx={{
        color: 'black.main',
        backgroundColor: 'grey.tipBtn',
        '&:hover': {
          bgcolor: "grey.tipBtn",
        }
      }}
    >
      <Typography
        fontSize={14}
        fontWeight="600"
        sx={{
          textAlign: "center",
          my: "auto",
          px: 1,
        }}
        color="black.main"
      >
        +${number}
      </Typography>
    </Button>

  );
};
const styles = {
  container: {
    my: 2,
  },
  depositButton: {},

  lbl: { fontSize: 16, fontWeight: 'bold', mb: 2 },
  amountButton: {
    width: 1 / 7,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0,

    px: 0,
  },
  linear: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 4,
    mx: 0,
  },

  textFieldStyle: {
    backgroundColor: 'grey.joinField',
    borderRadius: 2,
    width: '100%',
    '& input::placeholder': {
      fontSize: '13px',
    },
    height: 40,
    fontSize: 14,
    [`& fieldset`]: {
      height: 45,
      borderRadius: 2,
      borderColor: 'grey.joinBorder',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused': {
        backgroundColor: 'white.main',
      },
    },
  },
};

const isInteger = /^\d+$/;
const isCurrency = /^(\d+(\.\d{0,9})?|\.?\d{1,9})$/;