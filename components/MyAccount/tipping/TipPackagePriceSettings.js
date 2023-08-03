import React, { useState, useContext, useEffect, useRef } from 'react';
import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NumberFormat from 'react-number-format';
import { UserContext } from '@Context/User/UserProvider';
import { getUserPricing } from '@services/user/userService';
import MyLoadingButton from '@Components/common/MyLoadingButton';
import { MyFormHelperText2 } from '@Components/common/MyFormHelperText';

const TipPackagePriceSettings = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const { user } = useContext(UserContext);
    const pkgRef = useRef(10);
    const subRef = useRef(10);
    const [input, setinput] = useState({
        Pkg: 10,
        Sub: 0,
    });
    let pricing = [
        {
            id: 'Pkg',
            label: 'Default Tip Package Price',
            subLabel: '',
            editable: true,
        },
        {
            id: 'Sub',
            label: 'Default Subscription Price',
            subLabel: 'Subscription = 4 * Tip Package',
            editable: false,
        },
    ];
    const getPricing = async () => {
        const resp = await getUserPricing({ userid: user?.userID, update: false });
        if (resp?.data?.user?.length > 0) {
            let pp = resp?.data?.user?.[0]?.DEFAULTPRICE;
            let sp = 0;
            if (!isNaN(+pp)) {
                sp = pp * 4 * 0.75;
            }
            setinput({
                Pkg: pp,
                Sub: sp,
            });
            pkgRef.current = pp;
            subRef.current = sp;
        }
    };

    const handleError = () => {
        if (input['Pkg'] < process?.env?.MIN_PACKAGE_VAL || input['Sub'] < process?.env?.MIN_PACKAGE_VAL) {
            setError({
                status: 404,
                type: 'error',
                msg: `Minimum amount is $${process?.env?.MIN_PACKAGE_VAL}.00`,
            });
        }
    };

    useEffect(() => {
        getPricing();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const resp = await getUserPricing({ userid: user?.userID, update: true, ...input });
        if (resp.error) {
            setError({
                status: 404,
                type: 'error',
                msg: `Minimum amount is $${process?.env?.MIN_PACKAGE_VAL}`,
            });
        } else {
            resp?.data.ERROBJ.ERRORCODE == 0 &&
                setError({
                    status: 200,
                    type: 'success',
                    msg: `Default Pricing Saved`,
                });
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetcha = () => {
            if (error) {
                if (error.status === 200) {
                    pkgRef.current = input['Pkg'];
                    subRef.current = input['Sub'];
                }
                setError(null);
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [error]);

    const MAX_VAL = 999;
    const withValueLimit = ({ floatValue }) => floatValue <= MAX_VAL;

    return (
        <Box p={2} component="form" onSubmit={handleSubmit}>
            {pricing.map((item, idx) => (
                <Grid container key={idx} sx={{ my: 2, alignItems: 'center' }}>
                    <Grid container item xs={8}>
                        <Typography component="p" sx={{ display: 'flex', flexDirection: 'column' }}>
                            {item.label}
                            {item.subLabel.length > 0 && <small>{item.subLabel}</small>}
                        </Typography>
                    </Grid>
                    <Grid container item xs={4} justifyContent="end">
                        {item.editable ? (
                            <NumberFormat
                                className={classes.customTextField}
                                value={input[item?.id]}
                                prefix="$"
                                decimalScale={0}
                                fixedDecimalScale={true}
                                customInput={TextField}
                                onBlur={handleError}
                                isAllowed={withValueLimit}
                                onValueChange={(values) => {
                                    if (item.editable && values?.floatValue <= 999) {
                                        let pp = +values?.floatValue || 0;
                                        let ss = pp * 4 * 0.75;
                                        setinput({
                                            Pkg: pp,
                                            Sub: ss,
                                        });
                                    }
                                }}
                            />
                        ) : (
                            <Box
                                className={classes.customField}
                                sx={{ width: '100%', padding: '6px', border: 1, borderWidth: 1, borderColor: 'background.default' }}
                            >
                                <Typography sx={{ textAlign: 'end', display: 'flex', justifyContent: 'flex-end' }} fontSize={14}>
                                    ${input[item?.id]}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            ))}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MyLoadingButton
                        loading={loading}
                        disabled={(pkgRef.current == input['Pkg'] && subRef.current == input['Sub']) || Boolean(error?.status == 404)}
                        label="Save"
                        type="submit"
                    />
                    {error && <MyFormHelperText2>{error}</MyFormHelperText2>}
                </Grid>
            </Grid>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    customField: {
        backgroundColor: theme.palette.background.default,
        color: 'black',
        borderRadius: 4,

        ml: 1,
    },
    customTextField: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 4,
        border: 1,
        ml: 1,
        '& .MuiOutlinedInput-input': {
            color: 'black',
            fontSize: 14,
            padding: '6px',
            textAlign: 'right',
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
    },
    icon: {
        color: theme.palette.primary.main,
    },
}));

export default TipPackagePriceSettings;
