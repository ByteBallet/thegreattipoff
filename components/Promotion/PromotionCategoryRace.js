import React from 'react';
import { PromotionCategoryButtonRace } from './PromotionCategoryButtonRace';
import { Box, Stack } from '@mui/material';

const RACE_CODES = [
    {
        value: 'R',
        label: 'Horses',
        icon: 'HORSES',
    },
    {
        value: 'G',
        label: 'Greyhounds',
        icon: 'GREYS',
    },
    {
        value: 'H',
        label: 'Harness',
        icon: 'HARNESS',
    },
];

const PromotionCategoryRace = ({ filterRace, setFilterRace, iconVisible ,isSelectedItemColorWhite}) => {

    const onFilterRaceChange = (v) => {
        setFilterRace({
            ...filterRace,
            race: v,
        });
    };

    const onFilterReset = (e) => {
        setFilterRace({
            race: 'A',
            media: '1',
            period: '365',
        });
    };

    return (
        <Stack direction="row" spacing={1.2} >
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
                    onClickFunc={onFilterReset}
                    value={'A'}
                    idx={'A'}
                    label={'All'}
                    iconVisible={false}
                    isSvg={false}
                    selectedValue={filterRace.race}
                    isSelectedItemColorWhite
                    sx={{
                        paddingLeft: '3px !important',
                        paddingRight: 0,
                        boxShadow: 'none !important',
                        minWidth: '50px !important',
                        width: 25,
                    }}
                />

                {RACE_CODES.map((el, idx) => (
                    <PromotionCategoryButtonRace
                        key={`raceTypes---${idx}`}
                        onClickFunc={onFilterRaceChange}
                        idx={el.value}
                        value={el.value}
                        icon={el.icon}
                        label={el.label}
                        iconVisible={iconVisible ? iconVisible : el.sn !== ''}
                        selectedValue={filterRace.race}
                        isSelectedItemColorWhite
                        isSvg={true}
                        style={{
                            boxShadow: 'none',
                        }}
                        isIconOnly
                    />
                ))}
            </Box>
        </Stack >
    );
};

export default PromotionCategoryRace;
