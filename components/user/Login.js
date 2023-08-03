import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { signIn } from 'next-auth/client';
import {
    Card,
    Typography,
    Box,
    TextField,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    CardContent,
    Stack,
    Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import { makeStyles } from '@mui/styles';
import CheckIcon from '@mui/icons-material/Check';
import { UserContext } from '@Context/User/UserProvider';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';
import { isHotBetWidget } from '@Components/utils/util';

const CustomDialog = dynamic(() => import('../Shared/CustomDialog'));
const RecoverAccount = dynamic(() => import('./ForgotDetails/RecoverAccount'));
const gbSettings = dynamic(() => import('@stores/gbSettings'));

const useStyles = makeStyles({
    customTextField: {
        '& input::placeholder': {
            fontSize: '14px',
        },
    },
    label: {
        '@media (max-width:380px)': {
            fontSize: '14px',
        },
    },
});

const Login = (props) => {
    let hbWidget = isHotBetWidget();
    const joinLink = hbWidget ? '/register?Referrer=GreatTipOff' : '/register';
    const { user, addUser } = useContext(UserContext);
    // custom style for placeholder text in input

    if (!'isBetSlip' in props) {
        props.isBetSlip = false;
    }
    if (!'skipRoute' in props) {
        props.skipRoute = false;
    }

    const classes = useStyles();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [openResetModal, setOpenResetModal] = React.useState(false);
    const handleResetModalOpen = (e) => {
        setOpenResetModal(true);
    };
    const handleResetModalClose = (e) => {
        setOpenResetModal(false);
        props?.onParentClose();
    };
    const [values, setValues] = React.useState({
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        password: '',
        showPassword: false,
        rememberme: localStorage.getItem('username') ? true : false,
    });
    const [errLogin, seterrLogin] = React.useState(0);
    const [errPswd, seterrPswd] = React.useState(0);
    const [errdesc, seterrdesc] = React.useState('');

    const updateGbStore = gbSettings((store) => store.updateGbStore);

    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: prop != 'rememberme' ? event.target.value : event.target.checked,
        });
        seterrdesc('');
    };

    values.rememberme ? localStorage.setItem('username', values.username) : localStorage.removeItem('username');

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (values.username.length > 0 && values.password.length > 0) {
            // pass the user email and password to singin function from next-auth
            const result = await signIn('credentials', {
                redirect: false,
                username: values.username,
                password: values.password,
            });

            const userSession = await getSession();

            // CHANGES: UPDATE THE USER CONTEXT BASED ON THESE VALUES

            if (result && !result.error && userSession) {
                addUser(userSession.user);
                let path =
                    process.env.APP_BRAND == 'eb'
                        ? userSession.user.gtoPage.replace('thegreattipoff.com', '')
                        : '';
                const homeUrl = (props.isBetSlip || hbWidget) ? 'betslip' : props.page ? props.page : path;
                handleClick(e, props?.skipRoute ? router?.asPath : homeUrl);

                if (userSession?.user?.incomplete && userSession?.user?.incomplete == 1) {
                    setTimeout(() => {
                        updateGbStore({
                            key: 'showUserDetailsPrompt',
                            value: true,
                        });
                    }, 5000);
                }
            } else if (result) {
                result.error && seterrdesc(result.error.replace('Error:', ''));
            }
        } else {
            values.username.length == 0 && seterrLogin(1);
            values.password.length == 0 && seterrPswd(1);
        }
        setLoading(false);
    };

    const handleClick = (e, path) => {
        e.preventDefault();
        if (path) {
            if (path == 'betslip') {
                //setopenBetSlip(true);
                if (router.pathname.indexOf('register') > -1) {
                    router.push('/', undefined, { shallow: true });
                }
            } else {
                router.pathname.indexOf('register') > -1 && (path = '/');
                //close betslip if clicked on join
                if (props.isBetSlip) {
                    props.onBetSlipClose();
                }
                router.push(path, undefined, { shallow: true });
            }
        }
        handleResetModalClose();
    };

    const [openBetSlip, setopenBetSlip] = React.useState(false);

    return (
        <Box>
            <Card component="form" onSubmit={loginUser} sx={{ bgcolor: 'background.dialogcontent' }}>
                <CardContent>
                    <Typography variant="subtitle1" component="p" mt={2} color="black.main" fontSize={14}>
                        Username
                    </Typography>
                    <FormControl variant="outlined" sx={{ my: 0.5, bgcolor: 'background.form' }} fullWidth>
                        <TextField
                            fullWidth
                            classes={{ root: classes.customTextField }}
                            size="small"
                            sx={{ backgroundColor: 'background.form' }}
                            placeholder={
                                process.env.APP_BRAND == 'gto' ? 'Enter your username, email or mobile...' : 'Enter your username...'
                            }
                            id="loginID"
                            name="loginID"
                            autoFocus
                            hiddenLabel
                            value={values.username}
                            onFocus={(e) => seterrLogin(0)}
                            onChange={handleChange('username')}
                            error={errLogin != 0}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="black" />
                                    </InputAdornment>
                                ),
                                endAdornment:
                                    errLogin != 0 ? (
                                        <InputAdornment position="end">
                                            <ErrorIcon color="error" />
                                        </InputAdornment>
                                    ) : null,
                            }}
                            variant="outlined"
                        />
                    </FormControl>
                    {errLogin != 0 && (
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 1,
                                py: 1,
                                px: 3,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'error.main',
                                    fontSize: 14,
                                }}
                            >
                                Username is required
                            </Typography>
                        </Box>
                    )}
                    <Typography variant="subtitle1" component="p" mt={2} color="black.main" fontSize={14}>
                        Password
                    </Typography>
                    <FormControl variant="outlined" sx={{ my: 0.5, bgcolor: 'background.form' }} fullWidth>
                        <OutlinedInput
                            onFocus={(e) => seterrPswd(0)}
                            fullWidth
                            sx={{ backgroundColor: 'background.form' }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            id="password"
                            name="password"
                            error={errPswd != 0}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            placeholder="Enter your password..."
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon color="black" />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    {errPswd != 0 ? (
                                        <ErrorIcon color="error" />
                                    ) : (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {errPswd != 0 && (
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 1,
                                py: 1,
                                px: 3,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'error.main',
                                    fontSize: 14,
                                }}
                            >
                                Password is required
                            </Typography>
                        </Box>
                    )}
                    {errdesc != '' && (
                        <Box sx={{ backgroundColor: 'error.light', mt: 1, py: 1, px: 3 }}>
                            <Typography sx={{ color: 'error.main' }} fontSize={14}>
                                <div dangerouslySetInnerHTML={{ __html: errdesc }} />
                            </Typography>
                        </Box>
                    )}
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }} mt={1}>
                        <FormControl>
                            <FormControlLabel
                                value="1"
                                control={
                                    <Checkbox
                                        checked={values.rememberme}
                                        onChange={handleChange('rememberme')}
                                        checkedIcon={<CheckIcon className="successCheckbox" />}
                                        icon={<CheckBoxOutlineBlankRoundedIcon color="white" className="successCheckbox" />}
                                        color="success"
                                        sx={{ pr: 1 }}
                                    />
                                }
                                label="Remember me"
                                labelPlacement="end"
                                classes={{
                                    label: classes.label,
                                }}
                                componentsProps={{
                                    typography: {
                                        color: 'black.main',
                                    },
                                }}
                            />
                        </FormControl>
                        <Button
                            color="inherit"
                            variant="text"
                            sx={{ textDecoration: 'underline', fontSize: '14px' }}
                            onClick={handleResetModalOpen}
                        >
                            Forgot your details
                        </Button>
                        <CustomDialog
                            id={'forgotpassword'}
                            open={openResetModal}
                            title={'Recover your login details'}
                            content={<RecoverAccount onParentClose={handleResetModalClose} />}
                            fullScreen
                            showX={true}
                            onClose={handleResetModalClose}
                        />
                        {/* <CustomDialog
    return (
        <Box>
            <Card component="form" onSubmit={loginUser} sx={{ bgcolor: 'background.dialogcontent' }}>
                <CardContent>
                    <Typography variant="subtitle1" component="p" mt={2} color="text.dialog" fontSize={14}>
                        Username
                    </Typography>
                    <FormControl variant="outlined" sx={{ my: 0.5, bgcolor: 'background.form' }} fullWidth>
                        <TextField
                            fullWidth
                            classes={{ root: classes.customTextField }}
                            size="small"
                            sx={{ backgroundColor: 'background.form' }}
                            placeholder={
                                process.env.APP_BRAND == 'gto' ? 'Enter your username, email or mobile...' : 'Enter your username...'
                            }
                            id="loginID"
                            name="loginID"
                            autoFocus
                            hiddenLabel
                            value={values.username}
                            onFocus={(e) => seterrLogin(0)}
                            onChange={handleChange('username')}
                            error={errLogin != 0}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="black" />
                                    </InputAdornment>
                                ),
                                endAdornment:
                                    errLogin != 0 ? (
                                        <InputAdornment position="end">
                                            <ErrorIcon color="error" />
                                        </InputAdornment>
                                    ) : null,
                            }}
                            variant="outlined"
                        />
                    </FormControl>
                    {errLogin != 0 && (
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 1,
                                py: 1,
                                px: 3,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'error.main',
                                    fontSize: 14,
                                }}
                            >
                                Username is required
                            </Typography>
                        </Box>
                    )}
                    <Typography variant="subtitle1" component="p" mt={2} color="text.dialog" fontSize={14}>
                        Password
                    </Typography>
                    <FormControl variant="outlined" sx={{ my: 0.5, bgcolor: 'background.form' }} fullWidth>
                        <OutlinedInput
                            onFocus={(e) => seterrPswd(0)}
                            fullWidth
                            sx={{ backgroundColor: 'background.form' }}
                            classes={{ root: classes.customTextField }}
                            size="small"
                            id="password"
                            name="password"
                            error={errPswd != 0}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            placeholder="Enter your password..."
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon color="black" />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    {errPswd != 0 ? (
                                        <ErrorIcon color="error" />
                                    ) : (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {errPswd != 0 && (
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 1,
                                py: 1,
                                px: 3,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'error.main',
                                    fontSize: 14,
                                }}
                            >
                                Password is required
                            </Typography>
                        </Box>
                    )}
                    {errdesc != '' && (
                        <Box sx={{ backgroundColor: 'error.light', mt: 1, py: 1, px: 3 }}>
                            <Typography sx={{ color: 'error.main' }} fontSize={14}>
                                <div dangerouslySetInnerHTML={{ __html: errdesc }} />
                            </Typography>
                        </Box>
                    )}
                    <Stack direction="row" sx={{ justifyContent: 'space-between' }} mt={1}>
                        <FormControl>
                            <FormControlLabel
                                value="1"
                                control={
                                    <Checkbox
                                        checked={values.rememberme}
                                        onChange={handleChange('rememberme')}
                                        checkedIcon={<CheckIcon className="successCheckbox" />}
                                        icon={<CheckBoxOutlineBlankRoundedIcon color="white" className="successCheckbox" />}
                                        color="success"
                                        sx={{ pr: 1 }}
                                    />
                                }
                                label="Remember me"
                                labelPlacement="end"
                                classes={{
                                    label: classes.label,
                                }}
                                componentsProps={{
                                    typography: {
                                        color: 'black.main',
                                    },
                                }}
                            />
                        </FormControl>
                        <Button
                            color="inherit"
                            variant="text"
                            sx={{ textDecoration: 'underline', fontSize: '14px' }}
                            onClick={handleResetModalOpen}
                        >
                            Forgot your details
                        </Button>
                        <CustomDialog
                            id={'forgotpassword'}
                            open={openResetModal}
                            title={'Recover your login details'}
                            content={<RecoverAccount onParentClose={handleResetModalClose} />}
                            fullScreen
                            showX={hbWidget ? false : true}
                            onClose={handleResetModalClose}
                        />
                        {/* <CustomDialog
							id={"forgotpassword"}
							open={openResetModal}
							title={"Forgot your login?"}
							content={<FindAccount onParentClose={handleResetModalClose} />}
							fullScreen
							showX
							onClose={handleResetModalClose}
						/> */}
                    </Stack>
                    <LoadingButton
                        loading={loading}
                        loadingIndicator={
                            <Typography color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                                <CircularProgress color="inherit" size={16} sx={{ mr: 1 }} /> Please wait...
                            </Typography>
                        }
                        color="success"
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{
                            mt: 3,
                            mb: 2,
                            fontSize: 18,
                            fontWeight: 'bold',
                            py: 0,
                            height: 42,
                            boxShadow: '0px 2px 0px 0px #386c01',
                        }}
                        type="submit"
                    >
                        Log In
                    </LoadingButton>
                </CardContent>
            </Card>
            <Typography variant="p" component="p" mt={5} mb={2} align="center" color="text.active">
                Don{"'"}t have an account yet?
            </Typography>
            <Box px={1.5}>
                <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    color={process.env.APP_BRAND == 'gto' ? 'white' : 'primary'}
                    sx={{ fontWeight: '700', py: 0, fontSize: 18, border: 2 }}
                    onClick={(e) => handleClick(e, joinLink)}
                >
                    Join Now
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
