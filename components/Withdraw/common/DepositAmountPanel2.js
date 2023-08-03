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
} from '@mui/material';
import { parseInt } from 'lodash';
import React, { useEffect, useState } from 'react';
import MyFormHelperText from '@Components/common/MyFormHelperText';
import { CancelRounded } from '@mui/icons-material';

export default function DepositAmountPanel2(props) {
    // const [error, setError] = useState('');
    const {
        amount = '',
        setAmount = () => {},
        placeholder = 'Minimum withdraw is $5',
        error = '',
        label = 'Deposit Amount:',
        handleBlur,                        
    } = props;
 
    const setValue = (v) => {        
 
       const isCurrency=/^(\d+(\.\d{0,9})?|\.?\d{1,9})$/;
       if(!isCurrency.test(amount)){
         setAmount(parseFloat(v).toFixed(2));         
         handleBlur(parseFloat(v).toFixed(2));
       }else{
         setAmount((parseFloat(amount) + parseFloat(v)).toFixed(2));
         handleBlur((parseFloat(amount) + parseFloat(v)).toFixed(2));
       }
       
    };

    const handleChange = e => {       
      let vv = e.target.value;    
      setAmount(vv.replace(/[^\d.]/g, ''));
    }
    

    return (
        <Box sx={styles.container }>
            <Typography sx={{ fontSize: 14, pb: 0, fontWeight: 'bold' }}>
                {label}
            </Typography>
           
             <TextField
            sx={styles.textFieldStyle}
            size="small"
            id="amount"
            name="amount"
            value={parseFloat(amount)?amount:''}
            onChange={handleChange}
            onBlur={(e)=>{             
              handleBlur(e.target.value);
            }}            
            fullWidth
            type="number"
            placeholder={placeholder}
            inputProps={{
              style:{
                fontSize:14,
              },
              inputMode: 'decimal', type:'number',
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        $
                    </InputAdornment>
                ),
                endAdornment:(
                  <InputAdornment position='end'>
                    {
                      Boolean(amount) && 
                      
                        <CancelRounded fontSize="small" color="grey" sx={{padding:0}} onClick={()=>{
                        setAmount('');                        
                      }}/>
                      
                    }
                  </InputAdornment>
                ),
            }}
            />

            <Box sx={{display:'flex', justifyContent:'space-between', my:2}}>
                <AmountButton                    
                    number={10}
                    onClick={(e) => setValue(10)}
                />
                <AmountButton                   
                    number={25}
                    onClick={(e) => setValue(25)}
                />
                <AmountButton                   
                    number={50}
                    onClick={(e) => setValue(50)}
                />
                <AmountButton                   
                    number={100}
                    onClick={(e) => setValue(100)}
                />
                <AmountButton                   
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
    const {  number, onClick } = props;
    const [clicked, setClicked] = useState(false);

     useEffect(() => {
      const fetcha = () => {
        if(clicked){
          setClicked(false);
        }       
        
      };

    const tt = setTimeout(fetcha, 100);
    return () => clearTimeout(tt);
  }, [clicked]);

    return (
       <Button                
                size="small"                            
                onClick={onClick}
                className="oddsBtn"
                sx={{             
                  color:'black.main',
                  backgroundColor:'grey.tipBtn'       ,                                
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
        // '& :not(:first-child)': {
        //     ml: 2,
        // },
        width:1/7,
        fontSize: 12,
        fontWeight:'bold'        ,
        letterSpacing: 0,
        
        px:0,      
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
            // '&.Mui-focused fieldset': {
            //     borderColor: 'green',
            // },
        },
    },
};

const isInteger = /^\d+$/;
const isCurrency=/^(\d+(\.\d{0,9})?|\.?\d{1,9})$/;