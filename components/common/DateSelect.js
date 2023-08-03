import { Box, Typography, Grid, Select, MenuItem } from '@mui/material';
import moment from 'moment';
// returns the current year
const CURRENT_YEAR = moment().year();

// generate an array of years, starting from current year - 18 to last 100 years
export const YEARS = [...Array(100).keys()];
for (let i = 0; i < YEARS.length; i++) {
    YEARS[i] = CURRENT_YEAR - i - 18;
}

export const YEARS2 = [...Array(20).keys()];
for (let i = 0; i < YEARS2.length; i++) {
    YEARS2[i] = CURRENT_YEAR + i;
}

const MONTHS = moment.monthsShort();

export default function DateSelect(props) {
    const { values, handleChange, handleBlur, error } = props;
    return (
        <>
            {props.label && (
                <Typography sx={{ mb: 0.5, mt: 2, fontSize: 13 }} component="p">
                    {props.label} <span style={{ color: 'red' }}>*</span>
                </Typography>
            )}
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Select
                        value={values.dateDOB}
                        size="small"
                        id="dateDOB"
                        name="dateDOB"
                        disabled={props.disabled ? props.disabled : false}
                        onChange={handleChange}
                        //onBlur={handleBlur}                       
                        sx={styles.textFieldStyle}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: '70vh',
                                },
                            },
                        }}
                        fullWidth
                    >
                        <MenuItem value={0}>
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: 'grey.secondary',
                                }}
                            >
                                DD
                            </Typography>
                        </MenuItem>
                        {[...Array(31).keys()].map((itm, idx) => (
                            <MenuItem key={`DD-${idx}`} value={itm + 1}>
                                {itm + 1}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={4}>
                    <Select
                        select
                        value={values.monthDOB}
                        size="small"
                        id="monthDOB"
                        name="monthDOB"
                        disabled={props.disabled ? props.disabled : false}
                        onChange={handleChange}
                        //onBlur={handleBlur}

                        sx={styles.textFieldStyle}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: '70vh',
                                },
                            },
                        }}
                        fullWidth
                    >
                        <MenuItem value={0}>
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: 'grey.secondary',
                                }}
                            >
                                MM
                            </Typography>
                        </MenuItem>
                        {MONTHS.map((item, idx) => (
                            <MenuItem key={`${item}-${idx}`} value={idx + 1}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={4}>
                    <Select
                        select
                        value={values.yearDOB}
                        size="small"
                        id="yearDOB"
                        name="yearDOB"
                        onChange={handleChange}
                        // onBlur={handleBlur}
                        disabled={props.disabled ? props.disabled : false}
                        sx={styles.textFieldStyle}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: '70vh',
                                },
                            },
                        }}
                        fullWidth
                    >
                        <MenuItem value={0}>
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: 'grey.secondary',
                                }}
                            >
                                YYYY
                            </Typography>
                        </MenuItem>
                        {props.type == 1
                            ? YEARS2.map((item, idx) => (
                                <MenuItem key={`${item}-${idx}`} value={item}>
                                    {item}
                                </MenuItem>
                            ))
                            : YEARS.map((item, idx) => (
                                <MenuItem key={`${item}-${idx}`} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
                {Boolean(error) && (
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                mt: 0,
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
                                {error}
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
const styles = {
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
