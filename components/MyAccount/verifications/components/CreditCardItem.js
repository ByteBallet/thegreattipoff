import {
  Box,
  Container,
  IconButton,
  MenuItem,
  Select,
  FormGroup,
  FormLabel,
  FormControl,
  Typography,
  OutlinedInput,
  TextField,
  InputAdornment,
  Button,
  Grid,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MyFormHelperText2 } from '@Components/common/MyFormHelperText'
import { SvgIcon } from '@mui/material';

import DeleteIcon from '@public/images/svg/icon-trash2.svg';
import {
  CheckCircle,
  ErrorOutlined,
  ExpandLess,
  ExpandMore,
  Info,
  KeyboardArrowDownOutlined,
} from '@mui/icons-material';
import { getButtonIcons } from '@Components/utils/icons';
import MyLoadingButton from '@Components/common/MyLoadingButton'
import { proceedCreditCardVerify } from '@lib/deposit';
import { UserContext } from '@Context/User/UserProvider';
import CreditCardVerifyMessage from '@Components/Shared/CreditCardVerifyMessage';
import CentNumberField from '@Components/common/CentNumberField';

export default function CreditCardItem(props) {
  const { card,
    removeUpCard,
    setUpdateNotice,
    setreload = () => { }
  } = props;
  const { user } = useContext(UserContext);

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [inputData, setInputData] = useState({
    credit: card.cmnum,
    cents: '',
    ccv: '',
    cardid: card.ccid
  })

  useEffect(() => {
    setInputData({
      credit: card.cmnum,
      cents: '',
      ccv: '',
      cardid: card.ccid
    })
  }, [card]);

  // console.log('CreditCardItem card=',card);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    let body = {
      clientid: user.clientID,
      username: user.alias,
      ...inputData
    };
    const res = await proceedCreditCardVerify(body);

    if (res.error) {
      setResult({
        status: 404,
        msg: '404 - Something went wrong.'
      });
    }
    else if (res?.data?.ERROBJ?.ERROR > 0) {
      setResult({
        status: 404,
        msg: res?.data?.ERROBJ?.ERRORDESC
      })
    } else {
      let _result = res.data;
      setreload && setreload(true)
      if (_result.ERROBJ && _result.ERROBJ.ERROR == 0) {

      }

    }

    setLoading(false);
  }


  const handleDeleteAction = () => {
    // console.log('handleDleeteAction');
    // alert('removebutton');
    removeUpCard(card);
  }

  useEffect(() => {
    // console.log('CreditCardFomr::useEffect, result=', result);
    const fetcha = () => {
      if (result && result.status) {
        //Reset the data                                
        setResult(null);
      }
    };

    const tt = setTimeout(fetcha, 5000);
    return () => clearTimeout(tt);
  }, [result]);

  return (
    <Container row sx={{ mb: 2, px: 0, mx: 0 }}>
      <Box sx={{ px: 0, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <CreditCardWithExpire card={card} />
        {
          card.civ == false &&
          <Button variant='contained'
            endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
            color="error"
            size="small"
            sx={{ ml: 1, px: 1, fontSize: 14 }}
            onClick={() => setExpanded(!expanded)}
          >
            Verify
          </Button>
        }
        <IconButton
          onClick={handleDeleteAction}
          sx={{ px: 0, ml: 1 }}>
          <SvgIcon
            component={DeleteIcon}
            viewBox="0 0 26 26"
            sx={{ fontSize: 18 }}
            color="black"
          />
        </IconButton>
      </Box>

      {
        expanded &&
        <Container sx={{ p: 0, py: 2 }} component="form" onSubmit={handleVerify}>
          {card && <CreditCardVerifyMessage depositdate={card.verifydate} amt={card.verifyamt} />}
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <CentNumberField
                hiddenLabel
                id="outlined_1"
                placeholder="Enter Cents..."
                sx={{ mr: 1 }}
                inputProps={{
                  style: {
                    fontSize: 14,
                    backgroundColor: 'white',
                  },
                  type: 'text',
                  inputMode: 'numeric',
                }}
                value={inputData.cents}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    cents: e.target.value,
                  })
                }
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                hiddenLabel
                id="outlined_2"
                placeholder="Enter Card CCV"
                variant="outlined"


                fullWidth
                inputProps={{
                  style: {
                    fontSize: 14,
                    backgroundColor: 'white',
                  },
                  type: 'number',
                  inputMode: 'numeric',
                }}
                value={inputData.ccv}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    ccv: e.target.value,
                  })
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12}>

              <MyLoadingButton
                loading={loading}
                disabled={inputData.cents == '' || inputData.ccv.length < 3}
                type="submit"
                label="Verify Your Card"
                size="small"
                sx={{
                  height: 40,
                  fontSize: 16,
                  fontWeight: 'normal',
                  my: 1,

                }}
              />

            </Grid>
            {
              result &&
              <MyFormHelperText2>{result}</MyFormHelperText2>

            }
          </Grid>
        </Container>
      }
    </Container>)

}


const CreditCardWithExpire = props => {
  const { card = {
    cb: '',
    ccid: 0,
    cct: '0',
    cem: 0,
    cey: 0,
    civ: false,
    cmnum: '0',
    cn: '0',
    ct: '0',
  }, } = props;

  const isError = card.civ != true
  return (
    //  < <Container sx={{
    //     ...styles.container,
    //     borderColor:card.civ==true?'grey.light':'error.main',
    //     backgroundColor:card.civ==true?'white':'error.light'
    //   }}>
    //     <Typography>
    //       {getMaskedNumber(card)}
    //     </Typography>
    //     {
    //       card.civ==true?

    //     }
    //   </Container>>

    <TextField
      color={isError ? 'success' : 'error'}
      value={getMaskedNumber(card)}
      size="small"
      sx={{
        flex: 1,
        backgroundColor: isError ? 'error.light' : 'white',
        borderColor: isError ? 'error.main' : 'text.default',
      }}
      fullWidth
      InputProps={{
        style: {

          fontSize: 14,
          px: 1,
        },
        endAdornment: (
          <InputAdornment position="end" sx={{ px: 0, mx: 0 }}>
            {
              isError ?
                <Info color="error" fontSize="small" /> :
                <CheckCircle color="success" fontSize="small" />

            }
          </InputAdornment>
        )

      }}
      inputProps={{
        disabled: 'true',
      }}
    />

  )

}

const getMaskedNumber = (card) => {
  return '**** **** **** '.concat(
    card.cmnum ? card.cmnum.substr(15) : '1234'
  );
};
