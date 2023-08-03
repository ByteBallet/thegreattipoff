import InfoAlert from '@Components/Shared/InfoAlert';
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
    Button,
} from '@mui/material';
import { useState } from 'react';

export default function GWDpLimit({
    formik,
    fontLabel,
    showDeposit,
    setShowDeposit,
    uid = 0
}) {
    const [showCode, setShowCode] = useState(false);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} mb={2}>
                    <Box sx={{ py: 2 }}>
                        <Divider />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            sx={{
                                mb: 0.5,
                                fontSize: fontLabel,
                            }}
                            fontSize={fontLabel}
                        >
                            Have a code? (optional)
                        </Typography>

                        <Typography
                            sx={{
                                mb: 0.5,
                                fontSize: fontLabel,
                                textDecoration: 'underline',
                                fontWeight: 'bold',
                                cursor: "pointer"
                            }}
                            onClick={() => setShowCode(!showCode)}
                        >
                            Enter code
                        </Typography>
                    </Box>
                    {showCode ? (
                        <Box>
                            <TextField
                                sx={styles.textFieldStyle}
                                size="small"
                                value={formik.values.promoCode}
                                id="promoCode"
                                name="promoCode"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.promoCode &&
                                    Boolean(formik.errors.promoCode)
                                }
                                fullWidth
                                placeholder="Enter Code"
                            />
                        </Box>
                    ) : null}
                    <Box sx={{ pt: 2 }}>
                        <Divider />
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography fontSize={fontLabel}>
                        Deposit Limit <span style={{ color: 'red' }}>*</span>
                    </Typography>
                </Grid>
                {
                    uid != 0 &&
                    <Grid item xs={12}>
                        <InfoAlert content="No Deposit Limit." />
                    </Grid>
                }
                <Grid item xs={6}>
                    <Box
                        sx={{
                            cursor: "pointer",
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            borderRadius: 2,
                            border: 1,
                            borderColor: 'grey.light',
                            backgroundColor:
                                showDeposit == null
                                    ? 'grey.tipBtn'
                                    : showDeposit
                                        ? 'primary.main'
                                        : 'grey.tipBtn',
                            py: 1.5,
                            '&.hover': {
                                backgroundColor: 'red !important',
                            },
                        }}
                        onClick={() => {
                            setShowDeposit(!showDeposit);
                            formik.setFieldValue('depositLimit', true);
                        }}
                    >
                        <Typography
                            fontWeight={
                                showDeposit == null
                                    ? 'grey.tipBtn'
                                    : showDeposit
                                        ? 'bold'
                                        : 'normal'
                            }
                            fontSize={12}
                        >
                            Set Deposit Limit
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        variant="contained"
                        sx={{
                            cursor: "pointer",
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: 2,
                            width: '100%',
                            border: 1,
                            borderColor: 'grey.light',
                            backgroundColor:
                                showDeposit == null
                                    ? 'grey.tipBtn'
                                    : !showDeposit
                                        ? 'primary.main'
                                        : 'grey.tipBtn',
                            py: 1.5,
                        }}
                        onClick={() => {
                            setShowDeposit(false);
                            formik.setFieldValue('depositLimit', false);
                        }}
                    >
                        <Typography
                            fontWeight={
                                showDeposit == null
                                    ? 'grey.tipBtn'
                                    : !showDeposit
                                        ? 'bold'
                                        : 'normal'
                            }
                            fontSize={12}
                        >
                            No Deposit Limit
                        </Typography>
                    </Box>
                </Grid>
                {formik.touched.depositLimit &&
                    Boolean(formik.errors.depositLimit) ? (
                    <Grid item xs={12} mb={2}>
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
                                {formik.errors.depositLimit}
                            </Typography>
                        </Box>
                    </Grid>
                ) : null}
            </Grid>
            {!showDeposit ? null : (
                <>
                    <Typography
                        sx={{
                            mb: 1,
                            mt: 3,
                            fontWeight: 'bold',
                            fontSize: fontLabel,
                        }}
                        component="p"
                    >
                        Set the limit you wish to place on your deposits
                    </Typography>
                    <Grid container spacing={2}>
                        <>
                            <Grid item xs={6}>
                                <TextField
                                    sx={styles.textFieldStyle}
                                    size="small"
                                    value={formik.values.depositAmount}
                                    id="depositAmount"
                                    name="depositAmount"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.depositAmount &&
                                        Boolean(formik.errors.depositAmount)
                                    }
                                    fullWidth
                                    type="tel"
                                    placeholder="Enter limit"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                $
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {formik.touched.depositAmount &&
                                    Boolean(formik.errors.depositAmount) ? (
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
                                            {formik.errors.depositAmount}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    value={formik.values.depositPeriod}
                                    size="small"
                                    id="depositPeriod"
                                    name="depositPeriod"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.depositPeriod &&
                                        Boolean(formik.errors.depositPeriod)
                                    }
                                    sx={styles.textFieldStyle}
                                    fullWidth
                                    MenuProps={{
                                        transitionDuration: 0
                                    }}
                                >
                                    <MenuItem value={0}>
                                        <Typography
                                            color="grey.light"
                                            fontSize={13}
                                        >
                                            Select Period
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={30}>
                                        <Typography>Monthly</Typography>
                                    </MenuItem>
                                    <MenuItem value={14}>
                                        <Typography>Fortnightly</Typography>
                                    </MenuItem>
                                    <MenuItem value={7}>
                                        <Typography>Weekly</Typography>
                                    </MenuItem>
                                    <MenuItem value={1}>
                                        <Typography>Daily</Typography>
                                    </MenuItem>
                                </Select>
                                {formik.touched.depositPeriod &&
                                    Boolean(formik.errors.depositPeriod) ? (
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
                                            {formik.errors.depositPeriod}
                                        </Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                        </>
                    </Grid>
                </>
            )}
        </>
    );
}

const styles = {
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
            // '&.Mui-focused fieldset': {
            //     borderColor: 'green',
            // },
        },
    },

    mainContainer: {
        backgroundColor: 'white.main',
        p: 2,
        borderRadius: 2,
        mt: 2,
    },
};
