import CommonModal from '../../Payments/Common/CommonModal';
import { UserContext } from '@Context/User/UserProvider';
import { Container, InputAdornment, TextField, Typography, Box, Button } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MyFormHelperText, { MyFormHelperText2 } from '@Components/common/MyFormHelperText';
import MyLoadingButton from '@Components/common/MyLoadingButton';
import Image from "next/image";
import { proceedWithdrawUpdate } from '@lib/deposit';
import { getSession } from 'next-auth/client';
import updateUserSession from '@Components/utils/updateUserSession';

export default function PendingWithdrawPanel (props){

  const {    
    postExecute = ()=>{},
    withdrawable={},    
  } = props;
    
  
  const [ opened, setOpened] = useState(false);

  const isPending = withdrawable.pendingamt>0;

  
  const handleCancelPending = () => {
    setOpened(true);
  }   
  
  return (
    <>
    {
      !isPending?
      <></>
    :    
      <Box sx={styles.pendingContainer}>
        <Box sx={{p:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
          <Typography fontSize={13} lineHeight={1.5} component="div" sx={{pb:1}}>Pending Withdrawal</Typography>
          <Typography fontSize={13}   lineHeight={1.5} fontWeight="600" component="div" >{getBalanceString(withdrawable.pendingamt)}</Typography>
        </Box>
        <Box>
          {
            withdrawable.pendingmethod=='CCard'?
             <Image
                src="/images/tools/VISA.png"
                width={90}
                height={18}
                alt="VISA"
            />
            :withdrawable.pendingmethod=='EFT'?
            <Image src="/images/tools/Bank.png" width={24} height={24} alt="Bank" />
            :
            <></>
          }
        </Box>
       <Box sx={{width:1/3}}>
           <Button variant="outlined"
            color="black"
            size="small"
            onClick={handleCancelPending}
            fullWidth
            sx={{    
                    
            borderWidth:2,
            borderRadius:2,
            alignItems:'center',
            fontSize:14,
            fontWeight:'600'
            }}
            >
            Cancel
          </Button>
       </Box>

      </Box>
    }
    <ConfirmPasswordModal
    opened={opened}
    onClose={()=>setOpened(false)}
    withdrawable={withdrawable}
    postExecute={postExecute}
    />

    </>
  );
}

const getBalanceString = (balance) => {
    return balance ?  balance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    }):'$0.00' ;
}

const ConfirmPasswordModal = (props)=>{
  const {
    opened=false,
    onClose=()=>{},
    withdrawable={},
    postExecute=()=>{},    
  } = props;

  const [formInput, setFormInput] = useState({
    password:''
  });
  const {user, addUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // onClose();
    // postExecute({
    //       status:200,
    //       msg:`Your withdrawal has been cancelled. ${getBalanceString(withdrawable.withdrawbleamt)} has been added to your balance.`
    //     });
   
    // Pass a $zero amount to  cancel the withdrawal
    let body = {
      clientid:user.clientID,   
      password:formInput.password,
      withdrawid:withdrawable.pendingwithdrawid,
      withdrawamt:0,
      withdrawtype: withdrawable.pendingmethod,
    };

    const updateData = async () => {
      const userSession = await getSession();
      userSession && addUser(userSession.user)
    };  

    const _res0 = await proceedWithdrawUpdate(body);
    if(_res0.error){
      setResult({
        status:404,
        msg:'404 - Something went wrong!'
      });

    }else{
      let _res = _res0.data;
      if(_res.success==true){
        //Success
        onClose();
        postExecute({
          status:200,
          msg:`Your withdrawal has been cancelled. ${getBalanceString(withdrawable.pendingamt)} has been added to your balance.`
        });
        //update session
          updateUserSession(false).then(() => {
            updateData();
        })
      }else{
        setResult({
          status:_res.ERROBJ.ERRORCODE,
          msg:_res.ERROBJ.ERRORDESC,
        })
      }
    }
    setLoading(false);
  }  

  useEffect(() => {               
        const fetcha = () => {
           if(result){
            setResult();
           }
        };
        const tt = setTimeout(fetcha, 10000);
        return () => clearTimeout(tt);
    }, [result]);


   return (
    <CommonModal
    open={opened}
    onClose={onClose}
    title="Confirm Withdrawal Cancellation?">
      <Container
      component="form"
      onSubmit={handleSubmit}      
      sx={{
        px:2, py:1
      }}
      align='center'
      >
        <Typography sx={{fontSize:14}}>
          Are you sure you want to cancel this pending withdrawal?
        </Typography>
        <Box sx={{ py:2,px:2}}>
          <TextField
          fullWidth
          sx={styles.textFieldStyle}
          size="small"
          placeholder="Enter Password"
          id="password"
          name="password"          
          value={formInput.password}
          onFocus={
            ()=>setFormInput({
              ...formInput,
              exclaim:false
            })
          }
          onChange={e=>setFormInput({...formInput, password:e.target.value})}
          type={showPassword?'text':'password'}
          InputProps={{
            endAdornment:(
              <InputAdornment position="end"
              onClick={()=>setShowPassword(!showPassword)}>
                {
                  showPassword?
                  <VisibilityOffIcon color="secondary.light"/>
                  :
                  <VisibilityIcon color="secondary.light"/>
                }
              </InputAdornment>
            )
          }}
          />
        </Box>
        {
          Boolean(error) && 
          <MyFormHelperText> {error}</MyFormHelperText>
        }
        <Box sx={{ py:2}}>
          <MyLoadingButton
            loading={loading}
            disabled={formInput.password==''}
            label="Confirm"
            type="submit"
            sx={{mt:0}}/>
         {
         Boolean(result) &&         
          <MyFormHelperText2>{result}</MyFormHelperText2>          
        }
        </Box>
       
      </Container>
    </CommonModal>
    
   )
  
}

const styles={
  pendingContainer:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',    
    borderBottom:'1px solid #e5e5e6',
    borderTop:'1px solid #e5e5e6',
    borderColor: 'grey.joinBorder',
    mb:8,
    py:2,
  },

  
  textFieldStyle: {
        backgroundColor: 'grey.joinField',
        borderRadius: 2,

        '& input::placeholder': {
            fontSize: '13px',
        },
        [`& fieldset`]: {
            borderColor: 'grey.joinBorder',

            borderRadius: 2,
            '&.focused': {
                borderColor: 'red',
            },
        },

        fontSize: 14,
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                backgroundColor: 'white.main',
            },
            // '&.Mui-focused fieldset': {
            //     borderColor: 'green',
            // },
        },
    },
}