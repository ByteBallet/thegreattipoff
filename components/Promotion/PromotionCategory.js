import { useState } from 'react';
import { PromotionCategoryButton } from './PromotionCategoryButton';
import { Box, Stack, Tab, Typography, Tabs } from '@mui/material';
import { SPORTS_CATEGORIES, MAIN_CATEGORIES } from '../../lib/constants';
import { PromotionCategoryButtonRace } from './PromotionCategoryButtonRace';

const PromotionCategory = ({
    types = {},
    topTypes = {},
    filter,
    setFilter,
    scrollButtons = false,
    isPromo = false
}) => {

    const handleChangeTab = (newValue) => {
        if (newValue > 0) {
            setFilter(topTypes[newValue - 1].sc);
        } else {
            setFilter('ALL');
        }
    }
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
                <PromotionCategoryButtonRace
                    onClickFunc={handleChangeTab}
                    idx={0}
                    value={'ALL'}
                    label={'All'}
                    iconVisible={false}
                    isSvg={false}
                    selectedValue={filter}
                    sx={{
                        paddingLeft: '3px !important',
                        paddingRight: 0,
                        boxShadow: 'none !important',
                        minWidth: '50px !important',
                        width: 25,
                    }}
                />
                {topTypes.map((tType, idx) => (
                    <PromotionCategoryButtonRace
                        key={`sportTypes---${idx}`}
                        onClickFunc={handleChangeTab}
                        idx={idx + 1}
                        value={tType.sc}
                        icon={tType.icon ? tType.icon : tType.sc}
                        label={tType.sn}
                        iconVisible={true}
                        selectedValue={filter}
                        isSvg={true}
                        style={{
                            boxShadow: 'none',
                        }}
                        isPromo={isPromo}
                    />
                ))}
            </Box>
        </Stack>

    );
};

export default PromotionCategory;
