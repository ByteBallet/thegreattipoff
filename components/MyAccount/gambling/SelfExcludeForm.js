import React, {
    useMemo,
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import {
    Box,
    Grid,
    Container,
    Modal,
    Button,
    IconButton,
    FormGroup,
    InputAdornment,
    FormHelperText,
    InputLabel,
    Input,
    Autocomplete,
    Switch,
    FormLabel,
    TextField,
    FormControlLabel,
    Badge,
    Typography,
    Select,
} from '@mui/material';
import {
    CancelRounded,
    Close,
    CloseOutlined,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import moment from 'moment';
import { proceedSelfSuspend } from '../../../lib/fetcher';
import { UserContext } from '../../../Context/User/UserProvider';
import MyLoadingButton from '../../common/MyLoadingButton';
import { MyFormHelperText2 } from '../../common/MyFormHelperText';
import InputTextField3 from '../../common/InputTextField3';
import DateSelect from '../../common/DateSelect';
import {signOut} from 'next-auth/client';
import { useRouter } from 'next/router';

const SelfExcludeForm = (props) => {
    const { opened, onClose, ...rest } = props;
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const prologs = [
        'If you are finding it difficult to control gambling, we encourage you to complete the form below and take an enforced break from betting with EliteBet either for a specified period or permanently.',
    ];
    const notes = [
        'PLEASE NOTE: Once a self-exclusion request has been submitted, it cannot be revoked. The accounts of self-excluded Customers remain restricted until the expiry of their respective preriods of self exclusion.',
        'You will be logged out immediately upon your submission of a self-exclusion request. If you have requested only a temporary period of self-exclusion, you will regain access to your account at 12:01 am on the date specified in the slef-exclusion request.',
        'If you have any further queries regarding a self-exclusion request, please contact our friendly EliteBet support staff on 02 9571 0050.',
    ];

    const [modalInfo, setModalInfo] = useState({
        opened: false,
        title: 'Confirm self exclusion request',
        message:
            'Are you sure you would like to self exclude yourself from EliteBet Permanatly?',
        message2:
            'You will be immediately logged out and unable to login to your account during this period.',
    });    

    const [values, setValues] = useState({
       period: 0,
        dateDOB: 0,
        monthDOB: 0,
        yearDOB: 2022,
        password: '',
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const handleSave = () => {
        limitDayString =
            values.period === '99'
                ? [
                      values.yearDOB,
                      (values.monthDOB > 9 ? '' : '0') +
                          values.monthDOB,
                      (values.dateDOB > 9 ? '' : '0') +
                          values.dateDOB,
                  ].join('-')
                : '2300-01-01';
        let newMessage =
            values.period === '99'
                ? `Are you sure you would like to self-exclude yourself from EliteBet from now until ${limitDayString}?`
                : 'Are you sure you would like to self exclude yourself from EliteBet Permanatly?';

        setModalInfo({
            ...modalInfo,
            opened: true,
            message: newMessage,
        });
    };

      const logOut = () => {

         localStorage.getItem('race_settings')
            ? localStorage.removeItem('race_settings')
            : null;
        sessionStorage.clear();
        userLogOut();
        router.push("/");
        signOut({
            redirect: false,
        });       
        
    };

    const handleSubmit = async (e) => {
        console.log('handleSubmit, values', values);
        e.preventDefault();
        setLoading(true);
        limitDayString =
            values.period === '99'
                ? [
                      values.yearDOB,
                      (values.monthDOB > 9 ? '' : '0') +
                          values.monthDOB,
                      (values.dateDOB > 9 ? '' : '0') +
                          values.dateDOB,
                  ].join('-')
                : '2300-01-01';
        let body = {
            clientid: user.clientID,
            suspenddate: limitDayString,
            password: values.password,
        };
        const _res = await proceedSelfSuspend(body);
        setModalInfo({
            ...modalInfo,
            opened: false,
        });
        console.log('proceedSelfSuspend res=', _res);

        if (_res.error) {
            setResult({
                status: 404,
                msg: _res.desc,
            });
        } else {
            let _result = _res.data;
            if (_result.suspend && _result.suspend.success) {
                setResult({
                    status: 200,
                    msg: 'Successfully set',
                });
                

            } else {
                setResult({
                    status: _result.ERROBJ.ERROR,
                    msg: _result.ERROBJ.ERRORDESC,
                });
                
            }
        }
      
        setLoading(false);
    };
   

    const { user, userLogOut } = useContext(UserContext);
    const { clientID } = user;
    let clientid = clientID;
    const [result, setResult] = useState({}); //processing result
    let limitDayString;

    const handleChange = e => {
      let name = e.target.name;
      let value = e.target.value;
      setValues({
        ...values,
        [name]:value,
      });

      if(name=='dateDOB' || name=='monthDOB' || name=='yearDOB'){
        const _errors = VALIDATE6({
           ...values,
          [name]:value,
        });
         setErrors({
          ...errors,
          date:_errors.date
        });
      }
    }

    const handleBlur = e=>{
      const _errors = VALIDATE6(values);

      setErrors({
        ...errors,
        [e.target.name]:_errors[e.target.name]
      });
      
    }

    

    useEffect(() => {
        const fetcha = () => {
            if (result) {
              if(result.status==200){
                setValues({
                    period: 0,
                    dateDOB: 0,
                    monthDOB: 0,
                    yearDOB: 2022,
                    password: '',
                });
                logOut();
              }
                //Reset the data
                
                setResult(null);
            }
        };

        const tt = setTimeout(fetcha, 4000);
        return () => clearTimeout(tt);
    }, [result]);
 

    return (
        <>
            <Box sx={{ my: 0, mx: 2, mb: 5 }}>
                <Box sx={styles.mainContainer}>
                    <Grid container spacing={2} pt={2}>
                        {prologs.map((p, idx) => (
                            <Grid item xs={12} key={idx}>
                                <Typography>
                                    <Box sx={styles.prolog}>{p}</Box>
                                </Typography>
                            </Grid>
                        ))}
                        {/* <Grid item xs={12}></Grid> */}
                    </Grid>

                    <InputTextField3
                        value={values.period}
                        id="period"
                        name="period"
                        type="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Period:"
                        placeholder="Select Period..."
                        data={[
                            { value: '99', label: 'Specify Date' },
                            { value: '98', label: 'Permanent' },
                        ]}
                    />
                    {values.period == '99' && (
                        <DateSelect
                            label="Exclude until:"
                            handleChange={handleChange}
                            handleBlur={handleBlur}                            
                            error={errors.date}
                            values={values}                            
                            type={1}
                        />
                    )}
                    {values.period != 0 && (
                        <InputTextField3
                            label={'Your Account Password'}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            required={true}
                            id="password"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={()=>setTouched({
                              ...touched,
                              password:true
                            })}
                            value={values.password}
                            error={
                                touched.password &&
                                Boolean(errors.password)
                            }
                            errormsg={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {values.password.length == 0 ? (
                                            <IconButton
                                                onClick={() =>
                                                    setValues({
                                                        ...values,
                                                        password: '',
                                                    })
                                                }
                                                sx={{ px: 0 }}
                                            >
                                                <CancelRounded fontSize="small" />
                                            </IconButton>
                                        ) : showPassword ? (
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                sx={{ px: 0 }}
                                            >
                                                <Visibility fontSize="small" />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                sx={{ px: 0 }}
                                            >
                                                <VisibilityOff fontSize="small" />
                                            </IconButton>
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                sx={{ width: 1, my: 4, mb: 2, fontWeight:'bold' }}
                                disabled={
                                   !values.period ||
                                    (values.period =='99' && (!values.yearDOB || !values.monthDOB || !values.dateDOB))||
                                    values.password==''||
                                    errors.period || 
                                    errors.date || 
                                    errors.password
                                }
                                size="large"
                                onClick={() => handleSave()}
                            >
                                Submit Self Exclusion Request
                            </Button>
                            {result && (
                                <MyFormHelperText2>{result}</MyFormHelperText2>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ py: 2,mt:0 }}>
                        {notes.map((note, idx) => (
                            <Grid item xs={12} key={idx}>
                                <Typography>
                                    <Box sx={styles.prolog}>{note}</Box>
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Modal
                    open={modalInfo.opened}
                    onClose={() =>
                        setModalInfo({ ...modalInfo, opened: false })
                    }
                >
                   
                      <Box
                          sx={{
                              width: '100%',
                              position: 'fixed',
                              bottom: 0,
                          }}
                          component="form"
                          onSubmit={handleSubmit}
                      >
                          <Grid
                              container
                              sx={{
                                  background: 'black',
                                  px: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  borderTopRightRadius:'25px',
                                  borderTopLeftRadius:'25px',
                              }}
                          >
                              <Typography sx={{ fontSize: 14, fontWeight:'bold' }}>
                                  <span style={{ color: 'white' }}>
                                      Confirm self exclusion request
                                  </span>
                              </Typography>
                              <IconButton
                                  onClick={() =>
                                      setModalInfo({
                                          ...modalInfo,
                                          opened: false,
                                      })
                                  }
                                  sx={{ px: 0 }}
                              >                                 
                                  <CloseOutlined style={{ color: 'white' }} />
                              </IconButton>
                          </Grid>
                          <Container
                              id="body"
                              style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  flexDirection: 'column',
                                  padding: '16px 20px ',
                                  backgroundColor: 'white',
                                  width: '100%',
                              }}
                          >
                              <Typography
                                  sx={{
                                      my: 2,
                                      fontSize: '0.9rem',
                                  }}
                              >
                                  {modalInfo.message}
                              </Typography>
                              <Typography
                                  sx={{
                                      my: 2,
                                      color: 'red',
                                      fontSize: '0.9rem',
                                  }}
                              >
                                  {modalInfo.message2}
                              </Typography>

                              <MyLoadingButton
                                  disabled={false}
                                  loading={loading}
                                  type="submit"                                    
                                  label="Confirm"
                                  sx={{
                                    my:2,
                                    mb:4,
                                  }}
                              />
                          </Container>
                      </Box>
                  
                </Modal>
            </Box>
        </>
    );
};

const styles = {
    mainContainer: {
        pb: 5,
    },
    prolog: {
        fontSize: 13,
        // py: 1,
        textAlign: 'left',
        lineHeight: '1.4',
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
};

const VALIDATE6 = (state) => {
    const _error = {};
    if (state.period === 0) _error.period = 'You have to select the type.';
    else if (state.period === '99') {
        if (state.monthDOB === 0 || state.dateDOB === 0) {
            // _error.date = 'Enter an exclusion date.';
        } else {
          
            let today = moment();
            let curyear = today.year();
            let curmonth = today.month() + 1;
            let curdate = today.date();
            
            console.log('curdate=', curyear, curmonth, curdate, state);
            
            if (state.yearDOB > curyear || 
            (state.yearDOB == curyear && state.monthDOB > curmonth)||
            (state.yearDOB == curyear && state.monthDOB == curmonth && state.dateDOB>=curdate)) {

            } else {
                _error.date = 'Invalid exclusion date';
            }
        }
    } else {
    }

    if (state.password === '') {
        _error.password = 'Enter current password.';
    }
    //  else if (state.password !== profile.password)
    //     _error.password = 'Current Password is incorrect.';
    // console.log('State=', state, 'error=', _error);
    
    return _error;
};
export default SelfExcludeForm;
