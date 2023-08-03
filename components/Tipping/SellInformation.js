import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
    Divider,
    IconButton,
    Box,
    TextField,
    CircularProgress,
    Snackbar,
    Alert,
    SnackbarContent,
} from '@mui/material';
import NumberFormat from 'react-number-format';
import CreateIcon from '@mui/icons-material/Create';
import { makeStyles } from '@mui/styles';
import { UserContext } from '@Context/User/UserProvider';
import moment from 'moment';
import usePackageDefaults from './usePackageDefaults';
import { TIP_PACK_API } from './api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SellInformation = ({ singles }) => {
    const { user } = useContext(UserContext);

    const [open, setOpen] = useState(false);
    let chkComments = singles?.filter((item) => item?.comments?.length > 0)?.length > 0;
    //to be updated with actual user standard stake

    let chkStake =
        singles?.filter((item) => item?.stake?.length > 0 && (item?.stake?.length > 100 || item?.stake?.length < 100))?.length > 0;

    let options = [
        {
            id: 'name',
            label: 'Tip Package Name:',
            apiLabel: 'packagetitle',
            type: 'text',
            editable: false,
            accordin: false,
            hidden: true
        },
        {
            id: 'desc',
            label: 'Tip Package Description:',
            apiLabel: 'packagedescript',
            type: 'text',
            editable: false,
            accordin: true,
            hidden: true
        },
        {
            id: 'sale',
            label: 'Selling for',
            apiLabel: 'packageprice',
            type: 'numeric',
            editable: true,
            accordin: false,
            hidden: false
        },
        {
            id: 'sub',
            label: 'Subscription of 4 packages',
            apiLabel: 'subscriptprice',
            type: 'numeric',
            editable: false,
            accordin: false,
            hidden: false
        },
    ];
    let initdata = {
        name: user?.alias + "'s " + moment().format('dddd') + ' Tip Package ' + moment().format('DD/MM/YY'),
        desc: '',
        sale: 0,
        sub: 0,
        packid: -1,
    };

    const classes = useStyles();
    const [active, setactive] = useState();
    const [values, setvalues] = useState(initdata);
    const [accordin, setAccordin] = useState({
        name: false,
        desc: false,
        sale: false,
        sub: false,
    });

    const packageDefaults = usePackageDefaults(setvalues);

    const withValueLimit = (inputObj) => {
        const { value } = inputObj;
        if (value <= process?.env?.MAX_PACKAGE_VAL) return true;
        return false;
    };
    const editField = (item) => {
        setactive(item);
    };
    const handleFocus = () => { };

    const handleUpdate = async (value) => {
        if (values?.packid !== -1) {
            const body = {
                userid: user.userID,
                packid: values.packid,
            };

            body[value.apiLabel] = values[value.id];
            const resp = await TIP_PACK_API.updatePackageDefaults(body);
            if (!resp.error && resp?.data?.STATUS == 'Success') {
                setOpen(true);
                setTimeout(() => setOpen(false), 3000);
            }
        }
    };

    const handleValues = (prop, val) => {
        setvalues({
            ...values,
            [prop]: val,
        });
    };

    if (packageDefaults.status.loading) {
        return (
            <Stack sx={{ alignItems: 'center', mt: 1 }}>
                <CircularProgress color="white" />
            </Stack>
        );
    }

    return (
        <React.Fragment>
            <Card
                sx={{
                    bgcolor: 'background.legs',
                    my: 4,
                }}
            >
                <CardContent>
                    <Grid container spacing={1.3}>
                        {options?.filter(item => !item.hidden).map((item, idx) => (
                            <React.Fragment key={idx}>
                                <Grid item xs={12}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography
                                            fontSize={13}
                                            color="white.main"
                                            sx={{ display: 'flex', alignItems: 'center', width: '85%' }}
                                            noWrap
                                        >
                                            {item?.label}&nbsp;
                                            {!accordin[item.id] && (
                                                <b>
                                                    {item?.type == 'text' ? (
                                                        active == item?.id ? (
                                                            <TextField
                                                                size="small"
                                                                id={item?.id}
                                                                className={active == item?.id ? classes.customTextField : null}
                                                                hiddenLabel
                                                                placeholder={item?.label}
                                                                multiline
                                                                value={values[item?.id]}
                                                                onBlur={() => handleUpdate(item)}
                                                                onChange={(event) => handleValues(item?.id, event.target.value)}
                                                                maxRows={2}
                                                            />
                                                        ) : (
                                                            values[item?.id]
                                                        )
                                                    ) : (
                                                        <NumberFormat
                                                            className={active == item?.id ? classes.customTextField : null}
                                                            value={values[item?.id]}
                                                            prefix="$"
                                                            decimalScale={0}
                                                            customInput={TextField}
                                                            isAllowed={withValueLimit}
                                                            displayType={active == item?.id ? null : 'text'}
                                                            onFocus={handleFocus}
                                                            onBlur={() => handleUpdate(item)}
                                                            onValueChange={(values) => handleValues(item?.id, values.floatValue)}
                                                        />
                                                    )}
                                                </b>
                                            )}
                                        </Typography>
                                        {item.editable && (
                                            <IconButton color="primary" sx={{ p: 0 }} onClick={() => editField(item?.id)}>
                                                <CreateIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                        {item.accordin && (
                                            <IconButton
                                                color="primary"
                                                sx={{ p: 0 }}
                                                onClick={() =>
                                                    setAccordin({
                                                        ...accordin,
                                                        [item?.id]: !accordin[item.id],
                                                    })
                                                }
                                            >
                                                {accordin[item?.id] ? (
                                                    <ExpandLessIcon fontSize="medium" />
                                                ) : (
                                                    <ExpandMoreIcon fontSize="medium" />
                                                )}
                                            </IconButton>
                                        )}
                                    </Stack>
                                    {item.accordin && accordin[item?.id] && (
                                        <Stack>
                                            <Typography
                                                fontSize={13}
                                                color="white.main"
                                                sx={{ display: 'flex', alignItems: 'center', width: '85%' }}
                                            >
                                                {values[item?.id]}
                                            </Typography>
                                        </Stack>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider sx={{ borderColor: 'grey.dividends' }} />
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
            <Box sx={{ my: 2 }}>
                <Divider sx={{ borderColor: 'grey.dividends' }} />
            </Box>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message="Note archived">
                <SnackbarContent
                    sx={{
                        bgcolor: `success.alert`,
                        width: '100%',
                        border: 1.5,
                        borderColor: `success.alerttext`,
                        color: `success.alerttext`,
                    }}
                    message={
                        <Stack direction="column" justifyContent="center" alignItems="center" sx={{ py: 1 }}>
                            <Typography
                                color="inherit"
                                fontSize={13}
                                fontWeight="bold"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <CheckCircleIcon sx={{ color: `success.alerttext`, mr: 0.5 }} fontSize="small" />
                                Update Successful!
                            </Typography>
                        </Stack>
                    }
                />
            </Snackbar>
        </React.Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    customTextField: {
        backgroundColor: theme.palette.grey.dividends,
        color: 'white',
        borderRadius: 4,
        ml: 1,
        borderColor: 'transparent',
        '& .MuiOutlinedInput-input': {
            color: 'white',
            fontSize: 14,
            padding: '6px',
            '&:focus': {
                color: 'black',
            },
        },
        '& .Mui-focused': {
            color: 'black',
            backgroundColor: 'white',
        },
        '& .MuiFormHelperText-root': {
            textAlign: 'right',
            color: theme.palette.grey.main,
            backgroundColor: theme.palette.background.legs,
            m: 0,
            pt: 1,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 0,
        },
    },
    icon: {
        color: theme.palette.primary.main,
    },
}));

export default SellInformation;
