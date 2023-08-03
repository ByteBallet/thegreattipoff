import React, { useState } from 'react';
import FollowedTipsters from './FollowedTipsters';
import horses from '@public/images/svg/horse-racing.svg';
import harness from '@public/images/svg/harness-racing.svg';
import greys from '@public/images/svg/greys-racing.svg';
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    SvgIcon,
} from '@mui/material';
import BoxDivider from '@Components/Shared/BoxDivider';

const ManageRunnerFollows = () => {
    const [raceType, setraceType] = useState('runners');
    let raceObj = {
        R: {
            value: 'horse',
            svg_icon: horses,
            view_box: '0 0 466.36 510.95',
            label: 'Horses',
        },
        G: {
            value: 'greyhound',
            svg_icon: greys,
            view_box: '0 0 1633 1465',
            label: 'Greys',
        },
        H: {
            value: 'harness',
            svg_icon: harness,
            view_box: '0 0 1101 1850',
            label: 'Harness',
        },
    };
    const handleChange = (val) => (event) => {
        setraceType(val);
    };
    const isGTO = process.env.APP_BRAND == 'gto';
    return (
        <React.Fragment>
            <Box
                px={1}
                sx={{
                    width: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FormGroup aria-label="position" row>
                    {Object.keys(raceObj).map((key, idx) => (
                        <FormControlLabel
                            key={`Race--${idx}`}
                            sx={{ mx: 0.3 }}
                            value="bottom"
                            control={
                                <Checkbox
                                    sx={{
                                        padding: '4px 12px',
                                        bgcolor:
                                            raceType == raceObj[key].value ||
                                                raceType == 'runners'
                                                ? 'primary.main'
                                                : 'grey.primary',
                                        borderRadius: 10,
                                        '&:hover': {
                                            bgcolor:
                                                raceType ==
                                                    raceObj[key].value ||
                                                    raceType == 'runners'
                                                    ? 'primary.main'
                                                    : 'grey.primary',
                                        },
                                    }}
                                    checked={
                                        raceType == raceObj[key].value ||
                                        raceType == 'runners'
                                    }
                                    onChange={handleChange(raceObj[key].value)}
                                    name={key}
                                    icon={
                                        <SvgIcon
                                            color="black"
                                            component={raceObj[key].svg_icon}
                                            viewBox={raceObj[key].view_box}
                                            sx={{
                                                fontSize: 18,
                                            }}
                                        />
                                    }
                                    checkedIcon={
                                        <SvgIcon
                                            color={isGTO ? "white" : "black"}
                                            component={raceObj[key].svg_icon}
                                            viewBox={raceObj[key].view_box}
                                            sx={{
                                                fontSize: 18,
                                            }}
                                        />
                                    }
                                />
                            }
                        />
                    ))}
                </FormGroup>
            </Box>
            <BoxDivider />
            <FollowedTipsters
                label="Following"
                isRunner={true}
                raceType={raceType}
            />
        </React.Fragment>
    );
};

export default ManageRunnerFollows;
