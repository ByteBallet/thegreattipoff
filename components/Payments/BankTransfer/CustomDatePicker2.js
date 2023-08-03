import React from 'react';
import {
    Grid,
    FormControlLabel,
    FormGroup,
    Typography,
    Container,
} from '@mui/material';
import { DATES, MONTHS, YEARS2 } from '../../utils/register.util';
import CustomSelect from '../../common/CustomSelect';
import MyFormHelperText from '../Common/MyFormHelperText';

export default function CustomDatePicker2(props) {
    const { bankInfo, handleChange, error = undefined } = props;
    return (
        <>
            <FormControlLabel
                sx={{ width: 1, m: 0, alignItems: 'flex-start' }}
                control={
                    <FormGroup
                        sx={{
                            width: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            // justifyContent: 'space-between',
                            mx: 0,
                            px: 0,
                        }}
                    >
                        <CustomSelect
                            name="dateday"
                            value={bankInfo.dateday || 0}
                            data={DATES}
                            size="small"
                            placeholder="DD"
                            sx={{
                                fontSize: 14,
                                width: 1 / 4,

                                p: 0,
                                color: 'grey',
                                backgroundColor: 'grey.tipBtn',
                            }}
                            onChange={handleChange}
                        />
                        <CustomSelect
                            name="datemonth"
                            value={bankInfo.datemonth || 0}
                            placeholder="MM"
                            size="small"
                            sx={{
                                fontSize: 14,
                                width: 1 / 4,
                                p: 0,
                                mx: 2,
                                color: 'grey',
                                backgroundColor: 'grey.tipBtn',
                            }}
                            onChange={handleChange}
                        >
                            {MONTHS}
                        </CustomSelect>

                        <CustomSelect
                            name="dateyear"
                            value={bankInfo.dateyear || 0}
                            data={YEARS2}
                            size="small"
                            placeholder="YEAR"
                            sx={{
                                fontSize: 14,
                                width: 1 / 4,
                                p: 0,
                                backgroundColor: 'grey.tipBtn',
                                color: 'grey',
                            }}
                            onChange={handleChange}
                        />
                    </FormGroup>
                }
                label={
                    <Typography
                        sx={{ fontSize: 14, fontWeight: 'bold', py: 1 }}
                    >
                        Date of bank transfer
                    </Typography>
                }
                labelPlacement="top"
            />
            <Container sx={{ px: 2 }}>
                <MyFormHelperText>{error}</MyFormHelperText>
            </Container>
        </>
    );
}
