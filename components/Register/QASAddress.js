import React, { useRef } from 'react';

import {
    Grid,
    Box,
    Typography,
    TextField,
    Autocomplete,
    CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import {
    STREET_TYPE,
    STREET_TYPE2,
    STATE,
    VALIDATE4,
    COUNTRIES2,
} from '../utils/register.util';

const useStyles = makeStyles({
    customTextField: {
        '& input::placeholder': {
            fontSize: '14px',
        },
    },
});

export default function QASAddress({
    formik,
    state,
    streetType,
    fontLabel,
    value,
    setValue,
    setEnterAddMan,
    details,
    setSafeValues,
    setValues,
}) {
    const state_Lw = state.map((item) => item.toLowerCase());
    const stType_Lw = streetType.map((item) => item.toLowerCase());

    const classes = useStyles();
    const ref = useRef(false);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    //const [value, setValue] = React.useState(null);
    function getStType(idx) {
        const st = streetType[idx];
        let val = st;
        if (st) {
            let v = STREET_TYPE2.find(
                (item) => item.label.toLowerCase() == st.toLowerCase()
            );
            if (v) val = v.value;
        }
        return val;
    }

    function getStateType(idx) {
        return STATE[idx];
        // const state = state[idx];
        // return state;
    }

    async function getAddressDetails(id) {
        // const url = `${process.env.server}/loqate/retrieveAddress`;
        // let data = {
        //     id: id,
        // };
        // let options = {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         XAPIGTO: process.env.APP_BRAND.toUpperCase(),
        //     },
        //     body: JSON.stringify(data),
        // };

        //console.log(options);
        try {
            let selecField = options.find((item) => item.id == id);

            // const respJ = await fetch(url, options);
            // const resp = await respJ.json();

            // if (
            //     resp.ERROBJ.ERRORCODE === 0 &&
            //     resp.addobj.status === 'SUCCESS'
            // )

            if (selecField) {
                //const payload = resp.addobj.payload[0];
                const {
                    streetType,
                    postcode,
                    state,
                    streetNumber,
                    flatUnitNumber,
                    streetName,
                    locality,
                    street,
                } = selecField;

                console.log(selecField);

                const indexOfState = state_Lw.indexOf(state.toLowerCase());
                let indexOfStType = stType_Lw.indexOf(
                    // getStType(pVal.stType)
                    streetType.toLowerCase()
                );

                if (indexOfStType === -1) {
                    // Look for street type in the mapping table
                    let v = STREET_TYPE2.find(
                        (item) =>
                            item.value.toLowerCase() == streetType.toLowerCase()
                    );
                    if (v) {
                        indexOfStType = stType_Lw.indexOf(
                            // getStType(pVal.stType)
                            v.label.toLowerCase()
                        );
                    }
                }

                let pVal = {};

                // check if state or sttype exists in the current context
                if (indexOfState == -1) {
                    formik.setFieldValue('state', state_Lw.length);
                    pVal.state = state_Lw.length;
                } else {
                    if (formik.values.country !== 'Australia') {
                        formik.setFieldValue('state', 1);
                        pVal.state = 1;
                    } else {
                        formik.setFieldValue('state', indexOfState + 1);
                        pVal.state = indexOfState;
                    }
                }

                if (indexOfStType == -1) {
                    formik.setFieldValue('stType', stType_Lw.length);
                    pVal.stType = streetType.length;
                } else {
                    formik.setFieldValue('stType', indexOfStType + 1);
                    pVal.stType = indexOfStType;
                }

                formik.setFieldValue('postcode', postcode);
                formik.setFieldValue('locality', locality);
                formik.setFieldValue('stName', streetName);
                formik.setFieldValue('stNo', streetNumber);
                formik.setFieldValue('aptNo', flatUnitNumber);

                if (details) {
                    setSafeValues((val) => {
                        return {
                            ...val,
                            postcode: postcode,
                            locality: locality,
                            stName: streetName,
                            stNo: streetNumber,
                            aptNo: flatUnitNumber,
                            stType: getStType(pVal.stType),
                            state: getStateType(pVal.state),
                        };
                    });
                    setValues((val) => {
                        return {
                            ...val,
                            postcode: postcode,
                            locality: locality,
                            stName: streetName,
                            stNo: streetNumber,
                            aptNo: flatUnitNumber,
                            stType: getStType(pVal.stType),
                            state: getStateType(pVal.state),
                        };
                    });
                }
            }
        } catch (e) {
            console.log('Error in getting address', e);
        }
    }

    async function getData(country, str) {
        ref.current = true;
        const url = `${process.env.server}/loqate/findAddress`;
        let data = {
            country: country,
            searchString: str,
        };
        let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                XAPIGTO: process.env.APP_BRAND.toUpperCase(),
            },
            body: JSON.stringify(data),
        };

        try {
            const respJ = await fetch(url, options);
            const resp = await respJ.json();
            if (
                resp.ERROBJ.ERRORCODE === 0 &&
                resp.addobj.status === 'SUCCESS'
            ) {
                const payload = resp.addobj.payload;
                const mappedPayload = payload.map((item) => {
                    return {
                        label: item.fullAddress,
                        id: item.id,
                        streetType: item.streetType,
                        postcode: item.postcode,
                        state: item.state,
                        streetNumber: item.streetNumber,
                        flatUnitNumber: item.flatUnitNumber,
                        streetName: item.streetName,
                        locality: item.locality,
                    };
                });
                if (mappedPayload.length > 0) {
                    setOpen(true);
                    setOptions([
                        ...mappedPayload,
                        { label: 'ENTER ADDRESS MANUALLY', id: '-1' },
                    ]);
                }
            }
        } catch (e) {
            console.log(e);
        }
        ref.current = false;
    }

    async function getValues(val) {
        let country = 'AU';
        if (formik.values.country === 'New Zealand') {
            country = 'NZ';
        }

        if (
            formik.values.postcode !== '' ||
            formik.values.locality !== '' ||
            formik.values.stName !== '' ||
            formik.values.stNo !== '' ||
            formik.values.aptNo !== ''
        ) {
            formik.setFieldValue('postcode', '');
            formik.setFieldValue('locality', '');
            formik.setFieldValue('stName', '');
            formik.setFieldValue('stNo', '');
            formik.setFieldValue('aptNo', '');
            formik.setFieldValue('stType', streetType.length);
            formik.setFieldValue('state', state.length);

            if (details) {
                setSafeValues((val) => {
                    return {
                        ...val,
                        postcode: '',
                        locality: '',
                        stName: '',
                        stNo: '',
                        aptNo: '',
                        stType: streetType.length,
                        state: state.length,
                    };
                });
                setValues((val) => {
                    return {
                        ...val,
                        postcode: '',
                        locality: '',
                        stName: '',
                        stNo: '',
                        aptNo: '',
                        stType: streetType.length,
                        state: state.length,
                    };
                });
            }
        }
        if (val.toString().length > 5) {
            if (!ref.current) {
                await getData(country, val);
            }
        }
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            mb: 0.5,
                            mt: 2,

                            fontSize: fontLabel,
                        }}
                        component="p"
                    >
                        Address (as it appears on your ID){' '}
                        <span style={{ color: 'red' }}>*</span>
                    </Typography>

                    <Autocomplete
                        value={value}
                        id="asynchronous-demo"
                        sx={styles.textFieldStyle}
                        open={open}
                        onClose={(e) => {
                            setOpen(false);
                        }}
                        onChange={(e, newvalue) => {
                            if (typeof newvalue === 'string') {
                                setValue({
                                    label: newvalue,
                                });
                            } else if (newvalue && newvalue.inputValue) {
                                setValue({
                                    label: newvalue.inputValue,
                                });
                            } else if (newvalue?.id && newvalue?.label) {
                                // make the other api call and select the address
                                if (newvalue.id === '-1') {
                                    // open manual address
                                    setEnterAddMan(true);
                                    return;
                                }
                                setValue(newvalue);
                                getAddressDetails(newvalue.id);
                            }
                        }}
                        onInputChange={(e) => {
                            if (e) {
                                getValues(e.target.value);
                            }
                        }}
                        size="small"
                        freeSolo
                        filterOptions={(x) => x}
                        isOptionEqualToValue={(option, value) =>
                            option.label === value.label
                        }
                        getOptionLabel={(option) => option.label}
                        options={options}
                        loading={loading}
                        renderOption={(props, option) => (
                            <Box
                                component="li"
                                sx={{
                                    borderTop: 1,
                                    borderTopColor: 'grey.light',
                                    fontSize: 14,
                                    height: '40px',
                                    color: option.id == '-1' ? 'blue' : 'black',
                                }}
                                {...props}
                            >
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Address"
                                sx={styles.textFieldStyle}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : null}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />

                    {(Boolean(formik.errors.postcode) &&
                        formik.touched.postcode) ||
                    (Boolean(formik.errors.locality) &&
                        formik.touched.locality) ||
                    (Boolean(formik.errors.stName) && formik.touched.stName) ||
                    (Boolean(formik.errors.stNo) && formik.touched.stNo) ||
                    (Boolean(formik.errors.state) && formik.touched.state) ||
                    (Boolean(formik.errors.stType) && formik.touched.stType) ||
                    (Boolean(formik.errors.country) &&
                        formik.touched.country) ? (
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 1,
                                py: 1,
                                px: 3,
                            }}
                        >
                            <Typography
                                sx={{ color: 'error.main', fontSize: 14 }}
                            >
                                Required
                            </Typography>
                        </Box>
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
}

const styles = {
    textFieldStyle: {
        backgroundColor: 'grey.joinField',
        borderRadius: 2,
        width: '100%',
        '& input': {
            fontSize: '14px',
        },
        '& input::placeholder': {
            fontSize: '13px',
        },
        [`& fieldset`]: {
            borderRadius: 2,
            borderColor: 'grey.joinBorder',
        },
        fontSize: 14,
    },

    mainContainer: {
        backgroundColor: 'white.main',
        p: 2,
        borderRadius: 2,
        mt: 2,
    },
};
