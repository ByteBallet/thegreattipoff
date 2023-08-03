import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Divider, SvgIcon, useMediaQuery } from '@mui/material';
import horses from '@public/images/svg/horse-racing.svg';
import harness from '@public/images/svg/harness-racing.svg';
import greys from '@public/images/svg/greys-racing.svg';
import au from '@public/images/svg/aus-icon.svg';
import intl from '@public/images/svg/world-icon.svg';
import RacingNextToJump from '@Components/Racing/RacingNextToJump';
import { getTopOffset } from '@Components/utils/util';
import hotbet from '@public/images/svg/hotbet-blue.svg';
import { getTrendingHB } from '@lib/fetcher';
import { UserContext } from '@Context/User/UserProvider';
import TrendingHotBets from '@modules/HotBets/Components/TrendingHotBets';

const NextUpRacing = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext);
    let nextup_settings = {
        racetype: {
            R: true,
            G: true,
            H: true,
            count: 3,
        },
        racemeet: {
            AU: true,
            INT: true,
            count: 2,
        },
        hotbet: true,
    };
    let settingsObj = localStorage.getItem('nextup_settings') ? JSON.parse(localStorage.getItem('nextup_settings')) : nextup_settings;
    let chkHB = Object.keys(settingsObj).filter((item) => item == 'hotbet');
    //check if HB in Local storage, if not reset storage
    if (chkHB.length == 0) {
        settingsObj = nextup_settings;
    }
    const [state, setState] = useState(settingsObj);
    const [trendingHotBets, settrendingHotBet] = useState();
    state && localStorage.setItem('nextup_settings', JSON.stringify(state));
    let raceObj = {};
    let CountryObj = {};
    let hotbetObj = {};
    if (state) {
        raceObj = {
            R: {
                value: state.racetype?.R,
                svg_icon: horses,
                view_box: '0 0 466.36 510.95',
                label: 'Horses',
            },
            G: {
                value: state.racetype?.G,
                svg_icon: greys,
                view_box: '0 0 1633 1465',
                label: 'Greys',
            },
            H: {
                value: state.racetype?.H,
                svg_icon: harness,
                view_box: '0 0 1101 1850',
                label: 'Harness',
            },
        };
        CountryObj = {
            AU: {
                value: state.racemeet?.AU,
                svg_icon: au,
                view_box: '0 0 185.8 170.45',
                label: 'AU/NZ',
            },
            INT: {
                value: state.racemeet?.INT,
                svg_icon: intl,
                view_box: '0 0 208.29 208.35',
                label: 'INTL',
            },
        };
        hotbetObj = {
            value: state.hotbet,
            svg_icon: hotbet,
            view_box: '0 0 44.593 55.624',
            label: 'HOT Bets',
        };
    }

    const handleChange = (key) => (event) => {
        let isChecked = event.target.checked;
        let { count } = state[key];
        if (isChecked) {
            count++;
        } else {
            count--;
        }
        if (event.target.name == 'hotbet') {
            setState({
                ...state,
                [event.target.name]: isChecked,
            });
        } else {
            if (count > 0) {
                setState({
                    ...state,
                    [key]: {
                        ...state[key],
                        [event.target.name]: isChecked,
                        count: count,
                    },
                });
            }
        }
    };
    const getTipsterCarousel = async () => {
        const data2 = (await getTrendingHB(user?.promo)) || {};
        settrendingHotBet(data2?.hotbet);
    };

    useEffect(() => {
        getTipsterCarousel();
    }, []);

    const isGTO = process.env.APP_BRAND == 'gto';

    return (
        <Box>
            {state && (
                <Box
                    position="sticky"
                    top={getTopOffset() + 40}
                    backgroundColor="background.default"
                    sx={{
                        zIndex: 5,
                    }}
                >
                    <Box
                        px={1}
                        py={1}
                        sx={{
                            width: '100%',
                            backgroundColor: 'background.default',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <FormGroup aria-label="position" row>
                            {Object.keys(raceObj).map((key, idx) => (
                                <FormControlLabel
                                    key={`Race--${idx}`}
                                    className="RacingIcons"
                                    sx={{ mx: '0' }}
                                    value="bottom"
                                    control={
                                        <Checkbox
                                            sx={{
                                                padding: '5px',
                                            }}
                                            checked={raceObj[key].value}
                                            onChange={handleChange('racetype')}
                                            name={key}
                                            icon={
                                                <SvgIcon
                                                    color="grey.light"
                                                    component={raceObj[key].svg_icon}
                                                    viewBox={raceObj[key].view_box}
                                                    sx={{
                                                        fontSize: 35,
                                                    }}
                                                />
                                            }
                                            checkedIcon={
                                                <SvgIcon
                                                    color="primary.main"
                                                    component={raceObj[key].svg_icon}
                                                    viewBox={raceObj[key].view_box}
                                                    sx={{
                                                        fontSize: 35,
                                                    }}
                                                />
                                            }
                                        />
                                    }
                                    label={raceObj[key].label}
                                    labelPlacement="bottom"
                                />
                            ))}
                        </FormGroup>
                        {
                            !isGTO && <FormGroup row aria-label="position">
                                <FormControlLabel
                                    key={`hotbet`}
                                    className="RacingIcons"
                                    sx={{ mx: '0' }}
                                    value="bottom"
                                    control={
                                        <Checkbox
                                            sx={{
                                                padding: '5px',
                                            }}
                                            checked={hotbetObj.value}
                                            onChange={handleChange('hotbet')}
                                            name="hotbet"
                                            icon={
                                                <SvgIcon
                                                    color="grey.light"
                                                    component={hotbetObj.svg_icon}
                                                    viewBox={hotbetObj.view_box}
                                                    sx={{
                                                        fontSize: 35,
                                                    }}
                                                />
                                            }
                                            checkedIcon={
                                                <SvgIcon
                                                    component={hotbetObj.svg_icon}
                                                    viewBox={hotbetObj.view_box}
                                                    sx={{
                                                        fontSize: 35,
                                                        color: 'info.comment',
                                                    }}
                                                />
                                            }
                                        />
                                    }
                                    label={hotbetObj.label}
                                    labelPlacement="bottom"
                                />
                            </FormGroup>
                        }
                        <FormGroup row aria-label="position">
                            {Object.keys(CountryObj).map((key, idx) => (
                                <FormControlLabel
                                    key={`Country-${idx}`}
                                    className="RacingIcons"
                                    sx={{ mx: '0' }}
                                    value="bottom"
                                    control={
                                        <Checkbox
                                            sx={{
                                                padding: '5px',
                                            }}
                                            checked={CountryObj[key].value}
                                            onChange={handleChange('racemeet')}
                                            name={key}
                                            icon={
                                                <SvgIcon
                                                    color="grey.light"
                                                    component={CountryObj[key].svg_icon}
                                                    viewBox={CountryObj[key].view_box}
                                                    sx={{
                                                        fontSize: 35,
                                                    }}
                                                />
                                            }
                                            checkedIcon={
                                                <SvgIcon
                                                    color="primary.main"
                                                    component={CountryObj[key].svg_icon}
                                                    viewBox={CountryObj[key].view_box}
                                                    sx={{
                                                        fontSize: 35,
                                                    }}
                                                />
                                            }
                                        />
                                    }
                                    label={CountryObj[key].label}
                                    labelPlacement="bottom"
                                />
                            ))}
                        </FormGroup>
                    </Box>
                    <Box px={2} mb={0.5}>
                        <Divider
                            sx={{
                                borderColor: '#d0d1d2',
                                boxShadow: '0 1px #fff',
                            }}
                        />
                    </Box>
                </Box>
            )}
            {hotbetObj.value && !isDesktop && !isGTO && (
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                        pt: 2,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                        color: 'black.main',
                    }}
                >
                    <TrendingHotBets
                        manageBook={true}
                        isDesktop={isDesktop}
                        trendingHotBets={trendingHotBets}
                        getTipsterCarousel={getTipsterCarousel}
                    />
                </Box>
            )}
            <RacingNextToJump {...state} />
        </Box>
    );
};

export default NextUpRacing;
