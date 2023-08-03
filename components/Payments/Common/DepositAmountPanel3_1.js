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
            {/* <Grid container spacing={2}>
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
                type="number"
                inputProps={{
                  style:{
                    fontSize:14,                  
                  },
                   inputMode:'numeric',                  
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
                

                   <CVVNumberField
                        hiddenLabel
                        id="ccv"
                        name="ccv"
                        placeholder="3 digits" 
                        variant="outlined"                                                     
                        fullWidth
                        inputProps={{
                            style: {
                                fontSize: 14,
                                backgroundColor: 'white',
                            },                            
                            inputMode:'numeric',
                        }}                         
                        value={formInput.ccv}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        size="small"
                    />
                 </Grid>             
            </Grid> */}
            <Box sx={{justifyContent: "space-between", display: "flex", alignItems: "center", width: "100%" }}>
             
              <Box sx={{mx:0,width:1/3,px:0,pl:1}}>               
                  <Typography fontSize={14} fontWeight="600">CVV:</Typography>
                  <TextField
                  key={2324}
                  fullWidth
                  sx={styles.textFieldStyle}
                  size="small"
                  name="ccv323"
                  id="ccv323"
                  value={formInput.ccv323}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="3 digits"
                  type="number"
                  inputProps={{
                    style:{
                      fontSize:14
                    },
                    id:'ccv323',
                    name:'ccv323',
                   inputMode:'numeric'            
                  }}
                  />
              </Box>
               <Box sx={{mx:0,width:2/3, px:0}}>
              <Typography key={2323} fontSize={14} fontWeight="600">{label}</Typography>
                <TextField
                fullWidth
                sx={styles.textFieldStyle}
                size="small"
                name="amount"
                id="amount"
                type="number"
                value={formInput.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                inputProps={{
                  style:{
                    fontSize:14
                  },
                  id:'amount',
                  name:'amount',
                 inputMode:'numeric'            
                }}
                />
              </Box>
          </Box>             
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
            <Box sx={{width:'100%', px: 2 }}>
              {
              errors.amount? 
                <MyFormHelperText>{errors.amount}</MyFormHelperText>
                :errors.ccv?
                <MyFormHelperText>{errors.ccv}</MyFormHelperText>
                :void 0
              }                            
            </Box>
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