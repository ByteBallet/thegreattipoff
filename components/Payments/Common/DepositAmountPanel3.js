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
import CVVNumberField from '@Components/common/CVVNumberField';

export default function DepositAmountPanel3(props) {    
    const {    
        label,  
        placeholder = 'Minimum withdraw is $5',
        formInput,
        setFormInput,
        errors,
        setErrors,
        handleChange,
        handleBlur
    } = props;
    
    
    const addValue = (v) => {              
      let kk = parseFloat(formInput.amount);      

      if(!kk){        
        setFormInput({
            ...formInput,
            amount:(parseFloat(v)).toFixed(2)
        });
      }else{
        setFormInput({
          ...formInput,
          amount:(kk+parseFloat(v)).toFixed(2)
        });
      }
                      
      setErrors({        
        ...errors,
        amount:undefined,
      });                      
    }; 
        
    let numbers = [10, 25, 50, 100, 500];

    return (
        <Box sx={ styles.container}>                                            
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Typography sx={{ fontSize: 14, pb: 0, fontWeight: 'bold' }}>
                    {label}
                </Typography>   
               <TextField
                sx={styles.textFieldStyle}
                size="small"
                id="amount"
                name="amount"
                value={formInput.amount}
                onChange={handleChange}
                onBlur={handleBlur}                                            
                placeholder={placeholder}
                inputProps={{
                  style:{
                    fontSize:14,
                  },
                   type:'text',
                   inputMode:'decimal',
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
                          Boolean(formInput.amount) && 
                          
                            <CancelRounded  fontSize='small' color="grey" sx={{padding:0}} onClick={()=>setFormInput({
                              ...formInput,
                              amount:''
                            })}/>
                          
                        }
                      </InputAdornment>
                    ),
                }}
                />
                </Grid>
             
                <Grid item xs={3}>
                   <Typography sx={{ fontSize: 14, pb: 0, fontWeight: 'bold' }}>
                    CVV:
                  </Typography>   
                

                   <TextField
                        hiddenLabel
                        id="ccv32"
                        name="ccv32"
                        placeholder="3 digits" 
                        variant="outlined"                                                     
                        fullWidth
                        type="number"
                        inputProps={{
                            style: {
                                fontSize: 14,
                                backgroundColor: 'white',
                            },
                            type:'text',
                            inputMode:'numeric',
                        }}                         
                        value={formInput.ccv32}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        size="small"
                    />
                 </Grid>             
            </Grid>

            <Box sx={{display:'flex', justifyContent:'space-between', my:2}}>
              {
                numbers.map((num,idx)=>
                <AmountButton
                key={idx}
                number={num}
                onClick={()=>addValue(num)}
                />
                )
              }              
            </Box>
            <Container sx={{ px: 2 }}>
              {
              errors.amount? 
                <MyFormHelperText>{errors.amount}</MyFormHelperText>
                :errors.ccv?
                <MyFormHelperText>{errors.ccv}</MyFormHelperText>
                :void 0
              }                            
            </Container>
        </Box>
    );
}

const AmountButton = (props) => {
    const { number, onClick } = props;
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
                // variant="button"                
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
        },
    },
};

const isInteger = /^\d+$/;
const isCurrency=/^(\d+(\.\d{0,9})?|\.?\d{1,9})$/;