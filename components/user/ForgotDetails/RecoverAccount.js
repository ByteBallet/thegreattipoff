import React from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import dynamic from 'next/dynamic';

const RecoverUserAccount = dynamic(() => import('./RecoverUserAccount'));
const RecoverBBAccount = dynamic(() => import('./RecoverBBAccount'));

// returns the current year
const CURRENT_YEAR = moment().year() - 18;

// generate an array of years, starting from current year - 18 to last 100 years
export const YEARS = [...Array(100).keys()];
for (let i = 0; i < YEARS.length; i++) {
    YEARS[i] = CURRENT_YEAR - i;
}

const fontLabel = 14;
const styles = {
    textFieldStyle: {
        backgroundColor: 'grey.joinField',
        borderRadius: 2,

        '& input::placeholder': {
            fontSize: '14px',
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

    mainContainer: {
        backgroundColor: 'white.main',
        p: 2,
        borderRadius: 2,
        mt: 2,
    },
};

const RecoverAccount = ({ onParentClose }) => {
    let isBB = process.env.APP_BRAND == 'BB'
    return (
        <Box>
            {
                isBB ?
                    <RecoverBBAccount onParentClose={onParentClose} /> :
                    <RecoverUserAccount onParentClose={onParentClose} />
            }
        </Box >
    );
};

export default RecoverAccount;