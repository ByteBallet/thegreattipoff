import {
    FormGroup,
    FormControlLabel,
    Select,
    TextField,
    Typography,
    Autocomplete,
    Grid,
    Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { STREET_TYPE, STATE, COUNTRIES } from '../../utils/register.util';
import NumericField from '../../common/NumericField';
const useStyles = makeStyles({
    formGroup2: {
        textAlign: 'left',
        marginBottom: '8px',
        display: 'flex',
        // flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const AddressPanel = (props) => {
    const { value, setValue, doValidate, error, ...rest } = props;

    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormControlLabel
                    sx={{
                        alignItems: 'flex-start',
                        ml: 0,
                    }}
                    control={
                        <TextField
                            hiddenLabel
                            id="apartment_no"
                            placeholder="Enter Apartment Number"
                            variant="outlined"
                            size="small"
                            value={value.aptNo}
                        />
                    }
                    label={
                        <Typography sx={{ pl: 1, p: 0, fontSize: '0.9rem' }}>
                            Apartment No
                        </Typography>
                    }
                    labelPlacement="top"
                />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    sx={{
                        mr: 0,
                        alignItems: 'flex-start',
                    }}
                    control={
                        <TextField
                            hiddenLabel
                            id="street_no"
                            placeholder="Enter Street Number"
                            variant="outlined"
                            size="small"
                            value={value.stNo}
                        />
                    }
                    label={
                        <Typography sx={{ pl: 1, p: 0, fontSize: '0.9rem' }}>
                            Street No
                            <span
                                style={{
                                    marginLeft: '4px',
                                    color: 'darkmagenta',
                                    fontWeight: 'bold',
                                }}
                            >
                                *
                            </span>
                        </Typography>
                    }
                    labelPlacement="top"
                />
            </Grid>
            <Grid item xs={7}>
                <FormControlLabel
                    sx={{
                        ml: 0,
                        mr: 0,
                        width: 1,
                        alignItems: 'flex-start',
                    }}
                    align="left"
                    control={
                        <TextField
                            hiddenLabel
                            fullWidth
                            id="street_name"
                            sx={{ width: 1 }}
                            placeholder="Enter Street Name"
                            variant="outlined"
                            size="small"
                            value={value.stName}
                        />
                    }
                    label={
                        <Typography sx={{ pl: 0, p: 0, fontSize: '0.9rem' }}>
                            Street Name
                            <span
                                style={{
                                    marginLeft: '4px',
                                    color: 'darkmagenta',
                                    fontWeight: 'bold',
                                }}
                            >
                                *
                            </span>
                        </Typography>
                    }
                    labelPlacement="top"
                />
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel
                    sx={{
                        ml: 0,
                        mr: 0,
                        alignItems: 'flex-start',
                    }}
                    control={
                        <Autocomplete
                            id="street_type-autocomplete"
                            autoComplete
                            fullWidth
                            size="small"
                            options={STREET_TYPE}
                            sx={{ minWidth: 130 }}
                            value={value.stType}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    hiddenLabel
                                    placeholder="Select"
                                    variant="outlined"
                                />
                            )}
                        />
                    }
                    label={
                        <Typography sx={{ pl: 1, p: 0, fontSize: '0.9rem' }}>
                            Street Type
                            <span
                                style={{
                                    marginLeft: '4px',
                                    color: 'darkmagenta',
                                    fontWeight: 'bold',
                                }}
                            >
                                *
                            </span>
                        </Typography>
                    }
                    labelPlacement="top"
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    sx={{
                        width: 1,
                        mr: 0,
                        ml: 0,
                        alignItems: 'flex-start',
                    }}
                    control={
                        <TextField
                            fullWidth
                            hiddenLabel
                            id="locality"
                            name="locality"
                            placeholder="Enter Suburb"
                            variant="outlined"
                            size="small"
                            value={value.locality}
                        />
                    }
                    label={
                        <Typography sx={{ pl: 1, p: 0, fontSize: '0.9rem' }}>
                            Suburb
                            <span
                                style={{
                                    marginLeft: '4px',
                                    color: 'darkmagenta',
                                    fontWeight: 'bold',
                                }}
                            >
                                *
                            </span>
                        </Typography>
                    }
                    labelPlacement="top"
                />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    sx={{
                        width: 1,
                        mx: 0,
                        alignItems: 'flex-start',
                    }}
                    control={
                        <Autocomplete
                            fullWidth
                            id="street_type-autocomplete"
                            autoComplete
                            size="small"
                            options={STATE}
                            sx={{ minWidth: 100 }}
                            value={value.state}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    hiddenLabel
                                    placeholder="Select"
                                    variant="outlined"
                                />
                            )}
                        />
                    }
                    label={
                        <Typography sx={{ pl: 1, p: 0, fontSize: '0.9rem' }}>
                            State
                            <span
                                style={{
                                    marginLeft: '4px',
                                    color: 'darkmagenta',
                                    fontWeight: 'bold',
                                }}
                            >
                                *
                            </span>
                        </Typography>
                    }
                    labelPlacement="top"
                />
            </Grid>
            <Grid item xs={6}>
                <FormControlLabel
                    sx={{
                        width: 1,
                        mx: 0,
                        alignItems: 'flex-start',
                    }}
                    control={
                        <TextField
                            hiddenLabel
                            fullWidth
                            id="street_name"
                            placeholder="Enter Postcode"
                            variant="outlined"
                            size="small"
                            value={value.postcode}
                        />
                    }
                    label={
                        <Typography sx={{ pl: 1, p: 0, fontSize: '0.9rem' }}>
                            Postcode
                            <span
                                style={{
                                    marginLeft: '4px',
                                    color: 'darkmagenta',
                                    fontWeight: 'bold',
                                }}
                            >
                                *
                            </span>
                        </Typography>
                    }
                    labelPlacement="top"
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    sx={{
                        width: 1,
                        mx: 0,
                        alignItems: 'flex-start',
                    }}
                    control={
                        <Autocomplete
                            fullWidth
                            id="countries-autocomplete"
                            autoComplete
                            size="small"
                            options={COUNTRIES}
                            sx={{ minWidth: 100 }}
                            value={value.country}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    hiddenLabel
                                    placeholder="Select"
                                    value="Australia"
                                    variant="outlined"
                                />
                            )}
                        />
                    }
                    label={
                        <Typography sx={{ pl: 1, p: 0, fontSize: '0.9rem' }}>
                            Country
                            <span
                                style={{
                                    marginLeft: '4px',
                                    color: 'darkmagenta',
                                    fontWeight: 'bold',
                                }}
                            >
                                *
                            </span>
                        </Typography>
                    }
                    labelPlacement="top"
                />
            </Grid>
        </Grid>
    );
};
export default AddressPanel;
