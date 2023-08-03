import { Grid, Box, Typography, TextField, InputAdornment, Select, MenuItem, Divider, Switch } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ErrorIcon from '@mui/icons-material/Error';
import { TouchAppRounded } from '@mui/icons-material';

// custom style for placeholder text in input
const useStyles = makeStyles({
    customTextField: {
        '& input::placeholder': {
            fontSize: '14px',
        },
    },
});

export default function AddressFields({
    values,
    safeValues,
    setSafeValues,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleValueBlur,
    handleValueChange,
    STREET_TYPE,
    STATE,
    setTouched,
    touched,
    setOnEditItem,
    onEditItem,
    COUNTRIES,
    fontLabel = 13,
}) {
    const classes = useStyles();
    const isGTO = process.env.APP_BRAND == 'gto';
    const styles = {
        textFieldStyle: {
            backgroundColor: 'grey.joinField',
            borderRadius: 2,
            width: '100%',
            '& input::placeholder': {
                fontSize: '13px',
            },
            [`& fieldset`]: {
                borderRadius: 2,
                borderColor: 'grey.joinBorder',
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
        headingLabel: {
            mb: 0.5,
            mt: 2,

            fontSize: fontLabel,
        },
        selectBox: {
            backgroundColor: 'blue',
            '&:focus': {
                borderColor: 'red',
            },
        },
    };

    let STATE_CURR = STATE;
    if (values?.country != 0 && values?.country?.toLowerCase() !== 'au') {
        STATE_CURR = STATE_CURR.filter((item) => item === 'Other');
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography
                        sx={{
                            mb: 0.5,
                            mt: 2,

                            fontSize: fontLabel,
                        }}
                        component="p"
                    >
                        Apartment No
                    </Typography>

                    <TextField
                        size="small"
                        value={values.aptNo}
                        id="aptNo"
                        name="aptNo"
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        onFocus={(e) => {
                            setTouched({
                                ...touched,
                                aptNo: true,
                            });
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.aptNo && Boolean(errors.aptNo)}
                        fullWidth
                        sx={styles.textFieldStyle}
                        placeholder="Enter apartment no"
                        InputProps={{
                            sx: {
                                fontSize: 14,
                            },
                        }}
                    // inputProps={{
                    //   inputMode: 'numeric', type:'number'
                    // }}
                    />
                    {errors.aptNo ? (
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
                                {errors.aptNo}
                            </Typography>
                        </Box>
                    ) : null}
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={styles.headingLabel} component="p">
                        Street No {!isGTO && <span style={{ color: 'red' }}>*</span>}
                    </Typography>

                    <TextField
                        size="small"
                        value={values.stNo}
                        id="stNo"
                        name="stNo"
                        // type="tel"
                        error={touched.stNo && Boolean(errors.stNo)}
                        fullWidth
                        sx={styles.textFieldStyle}
                        placeholder="Enter street number"
                        onFocus={(e) => {
                            setTouched({
                                ...touched,
                                stNo: true,
                            });
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputProps={{
                            sx: {
                                fontSize: 14,
                            },
                            endAdornment: errors.stNo ? (
                                <InputAdornment position="end">
                                    <ErrorIcon color="error" />
                                </InputAdornment>
                            ) : null,
                        }}
                    // inputProps={{
                    //   inputMode: 'numeric', type:'number'
                    // }}
                    />
                    {errors.stNo ? (
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
                                {errors.stNo}
                            </Typography>
                        </Box>
                    ) : null}
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography sx={styles.headingLabel} component="p">
                        Street Name {!isGTO && <span style={{ color: 'red' }}>*</span>}
                    </Typography>

                    <TextField
                        size="small"
                        value={values.stName}
                        id="stName"
                        name="stName"
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        onFocus={(e) => {
                            setTouched({
                                ...touched,
                                stName: true,
                            });
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.stName && Boolean(errors.stName)}
                        fullWidth
                        sx={styles.textFieldStyle}
                        placeholder="Enter street name"
                        InputProps={{
                            sx: {
                                fontSize: 14,
                            },
                            endAdornment:
                                touched.stName && Boolean(errors.stName) ? (
                                    <InputAdornment position="end">
                                        <ErrorIcon color="error" />
                                    </InputAdornment>
                                ) : null,
                        }}
                    />
                    {errors.stName ? (
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
                                {errors.stName}
                            </Typography>
                        </Box>
                    ) : null}
                </Grid>
                <Grid item xs={4}>
                    <Typography sx={styles.headingLabel} component="p">
                        Street Type {!isGTO && <span style={{ color: 'red' }}>*</span>}
                    </Typography>

                    <Select
                        select
                        value={values.stType}
                        size="small"
                        id="stType"
                        name="stType"
                        onFocus={(e) => {
                            setTouched({
                                ...touched,
                                stType: true,
                            });
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.stType && Boolean(errors.stType)}
                        sx={styles.textFieldStyle}
                        fullWidth
                        MenuProps={{
                            style: {
                                fontSize: 14,
                            },
                            transitionDuration: 0,
                            PaperProps: {
                                style: {
                                    maxHeight: '40vh',
                                },
                            },
                        }}
                    >
                        <MenuItem value={0}>
                            <Typography fontSize={14} sx={{ color: 'grey.secondary' }}>
                                Select
                            </Typography>
                        </MenuItem>
                        {STREET_TYPE.map((item, idx) => (
                            <MenuItem key={`${item}-${idx}`} value={item.value}>
                                <Typography fontSize={14}>{item.label}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.stType ? (
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
                                {errors.stType}
                            </Typography>
                        </Box>
                    ) : null}
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={styles.headingLabel} component="p">
                        Suburb {!isGTO && <span style={{ color: 'red' }}>*</span>}
                    </Typography>

                    <TextField
                        classes={{ root: classes.customTextField }}
                        size="small"
                        value={values.locality}
                        id="locality"
                        name="locality"
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        onFocus={(e) => {
                            setTouched({
                                ...touched,
                                locality: true,
                            });
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.locality && Boolean(errors.locality)}
                        fullWidth
                        sx={styles.textFieldStyle}
                        placeholder="Enter suburb name"
                        InputProps={{
                            sx: {
                                fontSize: 14,
                            },
                            endAdornment:
                                touched.locality && Boolean(errors.locality) ? (
                                    <InputAdornment position="end">
                                        <ErrorIcon color="error" />
                                    </InputAdornment>
                                ) : null,
                        }}
                    />
                    {touched.locality && Boolean(errors.locality) ? (
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
                                {errors.locality}
                            </Typography>
                        </Box>
                    ) : null}
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography sx={styles.headingLabel} component="p">
                        State <span style={{ color: 'red' }}>*</span>
                    </Typography>

                    <Select
                        select
                        value={values.state}
                        size="small"
                        id="state"
                        name="state"
                        onFocus={() => {
                            setTouched({
                                ...touched,
                                state: true,
                            });
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.state && Boolean(errors.state)}
                        sx={styles.textFieldStyle}
                        fullWidth
                        MenuProps={{
                            sx: {
                                fontSize: 14,
                            },
                            transitionDuration: 0,
                            PaperProps: {
                                style: {
                                    maxHeight: '40vh',
                                },
                            },
                        }}
                    >
                        <MenuItem value={0}>
                            <Typography fontSize={14} sx={{ color: 'grey.secondary' }}>
                                Select
                            </Typography>
                        </MenuItem>
                        {STATE_CURR.map((item, idx) => (
                            <MenuItem key={`${item}-${idx}`} value={item}>
                                <Typography fontSize={14}>{item}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.state ? (
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 1,
                                py: 1,
                                px: 3,
                            }}
                        >
                            <Typography sx={{ color: 'error.main', fontSize: 14 }}>{errors.state}</Typography>
                        </Box>
                    ) : null}
                </Grid>

                <Grid item xs={6}>
                    <Typography sx={styles.headingLabel} component="p">
                        Postcode <span style={{ color: 'red' }}>*</span>
                    </Typography>

                    <TextField
                        size="small"
                        value={values.postcode}
                        id="postcode"
                        name="postcode"
                        type="number"
                        onFocus={(e) => {
                            setTouched({
                                ...touched,
                                postcode: true,
                            });
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.postcode && Boolean(errors.postcode)}
                        fullWidth
                        sx={styles.textFieldStyle}
                        placeholder="Enter postcode"
                        InputProps={{
                            sx: {
                                fontSize: 14,
                            },
                            endAdornment:
                                touched.postcode && Boolean(errors.postcode) ? (
                                    <InputAdornment position="end">
                                        <ErrorIcon color="error" />
                                    </InputAdornment>
                                ) : null,
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            type: 'number',
                        }}
                    />
                    {touched.postcode && Boolean(errors.postcode) ? (
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 1,
                                py: 1,
                                px: 3,
                            }}
                        >
                            <Typography sx={{ color: 'error.main', fontSize: 14 }}>{errors.postcode}</Typography>
                        </Box>
                    ) : null}
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={styles.headingLabel} component="p">
                        Country <span style={{ color: 'red' }}>*</span>
                    </Typography>

                    <Select
                        select
                        value={values.country}
                        size="small"
                        id="country"
                        name="country"
                        onFocus={(e) => {
                            setTouched({
                                ...touched,
                                country: true,
                            });
                        }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.country && Boolean(errors.country)}
                        sx={styles.textFieldStyle}
                        fullWidth
                        MenuProps={{
                            style: {
                                fontSize: 14,
                            },
                            transitionDuration: 0,
                            PaperProps: {
                                style: {
                                    maxHeight: '40vh',
                                },
                            },
                        }}
                    >
                        <MenuItem value={0}>
                            <Typography fontSize={14} sx={{ color: 'grey.secondary' }}>
                                Select
                            </Typography>
                        </MenuItem>
                        {COUNTRIES.map((item, idx) => (
                            <MenuItem key={`C-${idx}`} value={item.value}>
                                <Typography fontSize={14}>{item.label}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.country ? (
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 1,
                                py: 1,
                                px: 3,
                            }}
                        >
                            <Typography sx={{ color: 'error.main', fontSize: 14 }}>{errors.country}</Typography>
                        </Box>
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
}
