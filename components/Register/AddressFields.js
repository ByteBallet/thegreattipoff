import {
    Grid,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    Divider,
    Switch,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ErrorIcon from '@mui/icons-material/Error';

import CustomSwitch from '@Components/common/CustomSwitch';
// custom style for placeholder text in input
const useStyles = makeStyles({
    customTextField: {
        '& input::placeholder': {
            fontSize: '14px',
        },
    },
});

export default function AddressFields({
    formik,
    client,
    buyTips,
    setBuyTips,
    STREET_TYPE,
    STATE,
    COUNTRIES,
    fontLabel,
}) {
    const classes = useStyles();

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

    if (formik.values.country.toLowerCase() !== 'australia') {
        STATE_CURR = STATE_CURR.filter((item) => item === 'Other');
    }
    return (
        <>
            {client == 'gto' ? (
                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 12,
                            }}
                            component="p"
                        >
                            Do you want to buy tips & be eligible for prizes?
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <CustomSwitch
                            name="buyTips"
                            checked={buyTips}
                            onChange={() => setBuyTips(!buyTips)}
                        />
                        {/* <Switch
                            checked={buyTips}
                            onChange={() => setBuyTips(!buyTips)}
                        /> */}
                    </Box>
                </Box>
            ) : null}

            {buyTips ? (
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
                                value={formik.values.aptNo}
                                id="aptNo"
                                name="aptNo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.aptNo &&
                                    Boolean(formik.errors.aptNo)
                                }
                                fullWidth
                                sx={styles.textFieldStyle}
                                placeholder="Enter apartment no"
                            />
                            {formik.touched.aptNo &&
                            Boolean(formik.errors.aptNo) ? (
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
                                        {formik.errors.aptNo}
                                    </Typography>
                                </Box>
                            ) : null}
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={styles.headingLabel} component="p">
                                Street No{' '}
                                <span style={{ color: 'red' }}>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                value={formik.values.stNo}
                                id="stNo"
                                name="stNo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.stNo &&
                                    Boolean(formik.errors.stNo)
                                }
                                fullWidth
                                sx={styles.textFieldStyle}
                                placeholder="Enter street number"
                                InputProps={{
                                    endAdornment:
                                        formik.touched.stNo &&
                                        Boolean(formik.errors.stNo) ? (
                                            <InputAdornment position="end">
                                                <ErrorIcon color="error" />
                                            </InputAdornment>
                                        ) : null,
                                }}
                            />
                            {formik.touched.stNo &&
                            Boolean(formik.errors.stNo) ? (
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
                                        {formik.errors.stNo}
                                    </Typography>
                                </Box>
                            ) : null}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography sx={styles.headingLabel} component="p">
                                Street Name{' '}
                                <span style={{ color: 'red' }}>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                value={formik.values.stName}
                                id="stName"
                                name="stName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.stName &&
                                    Boolean(formik.errors.stName)
                                }
                                fullWidth
                                sx={styles.textFieldStyle}
                                placeholder="Enter street name"
                                InputProps={{
                                    endAdornment:
                                        formik.touched.stName &&
                                        Boolean(formik.errors.stName) ? (
                                            <InputAdornment position="end">
                                                <ErrorIcon color="error" />
                                            </InputAdornment>
                                        ) : null,
                                }}
                            />
                            {formik.touched.stName &&
                            Boolean(formik.errors.stName) ? (
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
                                        {formik.errors.stName}
                                    </Typography>
                                </Box>
                            ) : null}
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={styles.headingLabel} component="p">
                                Street Type{' '}
                                <span style={{ color: 'red' }}>*</span>
                            </Typography>

                            <Select
                                select
                                value={formik.values.stType}
                                size="small"
                                id="stType"
                                name="stType"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.stType &&
                                    Boolean(formik.errors.stType)
                                }
                                sx={styles.textFieldStyle}
                                fullWidth
                                MenuProps={{
                                    transitionDuration: 0,
                                    PaperProps: {
                                        style: {
                                            maxHeight: '40vh',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value={0}>
                                    <Typography fontSize={14}>
                                        Select
                                    </Typography>
                                </MenuItem>
                                {STREET_TYPE.map((item, idx) => (
                                    <MenuItem
                                        key={`${item}-${idx}`}
                                        value={idx + 1}
                                    >
                                        <Typography fontSize={14}>
                                            {item}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.stType &&
                            Boolean(formik.errors.stType) ? (
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
                                        {formik.errors.stType}
                                    </Typography>
                                </Box>
                            ) : null}
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography sx={styles.headingLabel} component="p">
                                Suburb <span style={{ color: 'red' }}>*</span>
                            </Typography>

                            <TextField
                                classes={{ root: classes.customTextField }}
                                size="small"
                                value={formik.values.locality}
                                id="locality"
                                name="locality"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.locality &&
                                    Boolean(formik.errors.locality)
                                }
                                fullWidth
                                sx={styles.textFieldStyle}
                                placeholder="Enter suburb name"
                                InputProps={{
                                    endAdornment:
                                        formik.touched.locality &&
                                        Boolean(formik.errors.locality) ? (
                                            <InputAdornment position="end">
                                                <ErrorIcon color="error" />
                                            </InputAdornment>
                                        ) : null,
                                }}
                            />
                            {formik.touched.locality &&
                            Boolean(formik.errors.locality) ? (
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
                                        {formik.errors.locality}
                                    </Typography>
                                </Box>
                            ) : null}
                        </Grid>
                    </Grid>
                </>
            ) : null}
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography sx={styles.headingLabel} component="p">
                        State <span style={{ color: 'red' }}>*</span>
                    </Typography>

                    <Select
                        select
                        value={formik.values.state}
                        size="small"
                        id="state"
                        name="state"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.state && Boolean(formik.errors.state)
                        }
                        sx={styles.textFieldStyle}
                        fullWidth
                        MenuProps={{
                            transitionDuration: 0,
                            PaperProps: {
                                style: {
                                    maxHeight: '40vh',
                                },
                            },
                        }}
                    >
                        <MenuItem value={0}>
                            <Typography fontSize={14}>Select</Typography>
                        </MenuItem>
                        {STATE_CURR.map((item, idx) => (
                            <MenuItem key={`${item}-${idx}`} value={idx + 1}>
                                <Typography fontSize={14}>{item}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.state && Boolean(formik.errors.state) ? (
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
                                {formik.errors.state}
                            </Typography>
                        </Box>
                    ) : null}
                </Grid>

                <Grid item xs={6}>
                    <Typography sx={styles.headingLabel} component="p">
                        Postcode <span style={{ color: 'red' }}>*</span>
                    </Typography>

                    <TextField
                        size="small"
                        value={formik.values.postcode}
                        id="postcode"
                        name="postcode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.postcode &&
                            Boolean(formik.errors.postcode)
                        }
                        fullWidth
                        sx={styles.textFieldStyle}
                        placeholder="Enter postcode"
                        InputProps={{
                            endAdornment:
                                formik.touched.postcode &&
                                Boolean(formik.errors.postcode) ? (
                                    <InputAdornment position="end">
                                        <ErrorIcon color="error" />
                                    </InputAdornment>
                                ) : null,
                        }}
                    />
                    {formik.touched.postcode &&
                    Boolean(formik.errors.postcode) ? (
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
                                {formik.errors.postcode}
                            </Typography>
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
                        value={formik.values.country}
                        size="small"
                        id="country"
                        name="country"
                        onChange={(e) => {
                            formik.handleChange(e);
                            if (e.target.value !== 'Australia') {
                                formik.setFieldValue('state', STATE.length);
                            }
                        }}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.country &&
                            Boolean(formik.errors.country)
                        }
                        sx={styles.textFieldStyle}
                        fullWidth
                        MenuProps={{
                            transitionDuration: 0,
                            PaperProps: {
                                style: {
                                    maxHeight: '40vh',
                                },
                            },
                        }}
                    >
                        {COUNTRIES.map((item, idx) => (
                            <MenuItem key={`C-${idx}`} value={item}>
                                <Typography fontSize={14}>{item}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.country &&
                    Boolean(formik.errors.country) ? (
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
                                {formik.errors.country}
                            </Typography>
                        </Box>
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
}
