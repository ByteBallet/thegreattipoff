import React from 'react';
import { SvgIcon } from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

import { hotbetCatList } from '@lib/constants';

const IconGroup = ({ selectedType, handleChange, desktopMarket = false, size = 35, hidelabel = false, padding = "5px" }) => {
    let catlist = hotbetCatList
    if (desktopMarket) {
        catlist = selectedType == "R" ? hotbetCatList.filter((item) => item.value == selectedType) : hotbetCatList.filter((item) => item.value != "R")
    }
    return (
        <FormGroup aria-label="position" row>
            {catlist.map((item, idx) => {
                return (
                    <FormControlLabel
                        key={`Race--${idx}`}
                        className="RacingIcons"
                        sx={{ mx: '0' }}
                        value="bottom"
                        control={
                            <Checkbox
                                sx={{
                                    padding: padding,
                                }}
                                checked={(selectedType === item?.value)}
                                onChange={handleChange(item?.value)}
                                name={item?.label}
                                icon={
                                    <SvgIcon
                                        color="grey.light"
                                        component={item?.svg_icon}
                                        viewBox={item?.view_box}
                                        sx={{
                                            fontSize: size,
                                        }}
                                    />
                                }
                                checkedIcon={
                                    <SvgIcon
                                        color="primary.main"
                                        component={item?.svg_icon}
                                        viewBox={item?.view_box}
                                        sx={{
                                            fontSize: size,
                                        }}
                                    />
                                }
                            />
                        }
                        label={hidelabel ? null : item?.label}
                        labelPlacement="bottom"
                    />
                );
            })}
        </FormGroup>
    );
};

export default IconGroup;
