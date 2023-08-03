import { useState } from 'react';
import { PromotionCategoryButton } from './PromotionCategoryButton';
import { Box, Stack, Typography } from '@mui/material';
import { SPORTS_CATEGORIES, MAIN_CATEGORIES } from '../../lib/constants';

const SPORT_CODES = [
    {
        value: 'ALL',
        label: 'All',
        iconVisible: false,
    },
    {
        value: 'SOCC',
        label: 'Soccer',
        icon: 'SOCC',
    },
    {
        value: 'RGLE',
        label: 'Rugy Legue',
        icon: 'RGLE',
    },
    {
        value: 'TENN',
        label: 'Tennis',
        icon: 'TENN',
    },
    {
        value: 'BOX',
        label: 'Boxing',
        icon: 'BOX',
    },
    {
        value: 'BASK',
        label: 'Basketball',
        icon: 'BASK',
    },
    {
        value: 'VOLL',
        label: 'Volleyball',
        icon: 'VOLL',
    },
];
const PromotionCategory = ({
    types = {},
    topTypes = {},
    filter,
    setFilter,
}) => {
    // const [optionBtn, setOptionBtn] = useState(SPORTS_CATEGORIES.all);
    // console.log('PromotionCategory', 'Types', types, 'TopTypes', topTypes);

    return (
        <Stack direction="row" spacing={1.2}>
            <Box
                style={{
                    borderRadius: '30px',
                    height: 40,
                    paddingTop: 5,
                    paddingBottom: 5,
                    display: 'flex',
                    marginBottom: '10px',
                }}
            >
                <PromotionCategoryButton
                    key={`sportcode--00`}
                    onClick={() => setFilter('ALL')}
                    value={'ALL'}
                    icon={'all'}
                    iconVisible={false}
                    selectedValue={filter === undefined ? '' : filter}
                    sx={{
                        paddingLeft: 0,
                        paddingRight: 0,
                        boxShadow: 'none',
                        // backgroundColor: selectedValue == value ? "#FCDF4C" : "#e0e0e0"
                    }}
                    label={'All'}
                    className="RacingTabButton"
                />
                {topTypes.map((el, idx) => (
                    // <p>{el}</p>

                    <PromotionCategoryButton
                        key={`sportcode--${idx}`}
                        onClick={() => setFilter(el.sc)}
                        value={el.sc}
                        icon={el.sc}
                        // iconVisible={el.iconVisible ? el.iconVisible : true}
                        iconVisible={true}
                        selectedValue={filter === undefined ? '' : filter}
                        sx={{
                            paddingLeft: 0,
                            paddingRight: 0,
                            boxShadow: 'none',
                            // backgroundColor: selectedValue == value ? "#FCDF4C" : "#e0e0e0"
                        }}
                        label={el.sn}
                    />
                ))}
            </Box>
        </Stack>
    );
};

export default PromotionCategory;
