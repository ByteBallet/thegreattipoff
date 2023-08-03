import React from 'react';
import {
    FormGroup,
    TextField,
    FormControlLabel,
    Typography,
} from '@mui/material';
import MyFormHelperText from './MyFormHelperText';
import CustomSelect from '../../common/CustomSelect';
import { YEARS2, DATES, MONTHS } from '../../utils/register.util';
export default function CustomDatePicker(props) {
    const {
        label = 'Exclude Until',
        month = 0,
        year = 0,

        handleYearChanged = () => {},
        handleMonthChanged = () => {},
        labelStyle = {},
        error = '',
    } = props;
    return (
        <FormControlLabel
            sx={{
                width: 1,
                m: 0,
                alignItems: 'flex-start',
            }}
            control={
                <FormGroup
                    className={'abcd1234'}
                    sx={{
                        width: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                    }}
                    mx={0}
                    px={0}
                >
                    <CustomSelect
                        labelId="limit_date"
                        id="limit_date-select"
                        value={month}
                        data={[]}
                        name="month"
                        placeholder="Select month"
                        size="small"
                        sx={{ width: 1, fontSize: 14 }}
                        onChange={(e) => handleMonthChanged(e.target.value)}
                    >
                        {MONTHS}
                    </CustomSelect>
                    <CustomSelect
                        labelId="limit_date"
                        id="limit_date-select"
                        name="year"
                        value={year}
                        data={YEARS2}
                        placeholder="Select year"
                        size="small"
                        sx={{ width: 1, mx: 2, fontSize: 14 }}
                        onChange={(e) => handleYearChanged(e.target.value)}
                    ></CustomSelect>
                </FormGroup>
            }
            label={
                <Typography sx={{ fontSize: 14, ...labelStyle }}>
                    {label}
                </Typography>
            }
            labelPlacement="top"
        />
    );
}
