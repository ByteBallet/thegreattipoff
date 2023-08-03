import React from 'react';
import { useEffect, createContext } from 'react';
import { SvgIcon } from '@mui/material';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
} from '@mui/material';
import { useRouter } from 'next/router';

import horses from '@public/images/svg/horse-racing.svg';
import harness from '@public/images/svg/harness-racing.svg';
import greys from '@public/images/svg/greys-racing.svg';
import au from '@public/images/svg/aus-icon.svg';
import intl from '@public/images/svg/world-icon.svg';
import hotbet from '@public/images/svg/hotbet-blue.svg';

import RacingNextToJump from './RacingNextToJump';
import RacingData from './RacingData';
import CustomTabs from '../Shared/CustomTabs';
import CustomTabPanel from '../Shared/CustomTabPanel';
import { getTopOffset, handleDateSliderChangeProgrammatically } from '../utils/util';
import JockeyChallenge from '../JockeyChallenge/JockeyChallenge';
import Futures from '../Futures/Futures';
import CustomTitle from '@Components/Shared/CustomTitle';
import ResultsSubMenu from './ResultsSubMenu';

const RacingHome = ({ tabs, date, activeSubMenu, handleSubMenuChange, raceType }) => {
    const router = useRouter();
    let reset = false;
    let racingtabs = [];
    let racedates = [];
    //populate labels from API
    tabs.map((tab, idx) => {
        racingtabs.push(tab.MENULABEL);
        racedates.push(tab.MENUDATE);
    });
    let active_tab = racingtabs.indexOf('Today');
    if (router.query && Object.keys(router.query).length > 0) {
        Object.keys(router.query).indexOf('nextup') > -1 &&
            (active_tab = racingtabs.indexOf('Next to Jump')) &&
            (reset = true);
        Object.keys(router.query).indexOf('jockey') > -1 &&
            (active_tab = racingtabs.indexOf('Jockey Challenge')) &&
            (reset = true);
    }
    if (router.asPath.includes("futures")) {
        active_tab = racingtabs.indexOf('Futures')
        reset = true
    }
    if (raceType == "H" || raceType == "G" || raceType == "R") {
        reset = true
    }
    //racingtabs.push("JockeyChallenge")
    let race_settings = {
        racetype: {
            R: (raceType == "A" || raceType == "R") ? true : false,
            G: (raceType == "A" || raceType == "G") ? true : false,
            H: (raceType == "A" || raceType == "H") ? true : false,
            count: 3,
        },
        racemeet: {
            AU: true,
            INT: true,
            count: 2,
        },
        activeTab: active_tab,
        hotbet: true,
    };

    const [state, setState] = React.useState();

    state && localStorage.setItem('race_settings', JSON.stringify(state));

    useEffect(() => {
        let settingsObj =
            reset
                ? race_settings
                : localStorage.getItem('race_settings')
                    ? JSON.parse(localStorage.getItem('race_settings'))
                    : race_settings;
        //reset to Today when Jockey/Future unavailable
        if (settingsObj.activeTab + 1 > racingtabs.length) {
            settingsObj.activeTab = racingtabs.indexOf('Today');
        }
        setState(settingsObj);
    }, [router]);

    useEffect(() => {
        if (router.query?.date) {
            handleDateSliderChangeProgrammatically(
                router.query?.date,
                setState,
                state
            );
        }
    }, [router.query?.date]);

    const handleChange = (key) => (event) => {
        let isChecked = event.target.checked;
        let { count } = state[key];
        if (isChecked) {
            count++;
        } else {
            count--;
        }
        if (event.target.name == "hotbet") {
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

    const handleTabChange = (event, newValue) => {
        setState({
            ...state,
            activeTab: newValue,
        });
    };
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
        }
    }

    const getFilterIcons = () => {
        return <React.Fragment>
            {racingtabs[state.activeTab] &&
                racingtabs[state.activeTab].indexOf('Jockey') == -1 && (
                    <Box
                        position="sticky"
                        top={(getTopOffset() + 40)}
                        backgroundColor="background.default"
                        sx={{
                            zIndex: 5,
                        }}
                    >
                        <Box
                            px={1}
                            pt={1}
                            sx={{
                                width: '100%',
                                backgroundColor: 'background.default',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <FormGroup aria-label="position" row>
                                {Object.keys(raceObj).map(
                                    (key, idx) => (
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
                                                    checked={
                                                        raceObj[key]
                                                            .value
                                                    }
                                                    onChange={handleChange(
                                                        'racetype'
                                                    )}
                                                    name={key}
                                                    icon={
                                                        <SvgIcon
                                                            color="grey.light"
                                                            component={
                                                                raceObj[
                                                                    key
                                                                ]
                                                                    .svg_icon
                                                            }
                                                            viewBox={
                                                                raceObj[
                                                                    key
                                                                ]
                                                                    .view_box
                                                            }
                                                            sx={{
                                                                fontSize: 35,
                                                            }}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <SvgIcon
                                                            color="primary.main"
                                                            component={
                                                                raceObj[
                                                                    key
                                                                ]
                                                                    .svg_icon
                                                            }
                                                            viewBox={
                                                                raceObj[
                                                                    key
                                                                ]
                                                                    .view_box
                                                            }
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
                                    )
                                )}
                            </FormGroup>
                            {racingtabs[state.activeTab] &&
                                racingtabs[state.activeTab].indexOf('Futures') == -1 &&
                                racingtabs[state.activeTab].indexOf('Result') == -1 &&
                                racingtabs[state.activeTab].indexOf('Next') == -1 &&
                                process.env.client.restrictedModules.indexOf("hotbet") == -1 && (
                                    <FormGroup
                                        row
                                        aria-label="position"
                                    >
                                        <FormControlLabel
                                            key={`hotbet`}
                                            className="RacingIcons"
                                            sx={{ mx: '0' }}
                                            value="bottom"
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        padding:
                                                            '5px',
                                                    }}
                                                    checked={
                                                        hotbetObj.value
                                                    }
                                                    onChange={handleChange(
                                                        'hotbet'
                                                    )}
                                                    name="hotbet"
                                                    icon={
                                                        <SvgIcon
                                                            color="grey.light"
                                                            component={
                                                                hotbetObj.svg_icon
                                                            }
                                                            viewBox={
                                                                hotbetObj.view_box
                                                            }
                                                            sx={{
                                                                fontSize: 35,
                                                            }}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <SvgIcon
                                                            component={
                                                                hotbetObj.svg_icon
                                                            }
                                                            viewBox={
                                                                hotbetObj.view_box
                                                            }
                                                            sx={{
                                                                fontSize: 35, color: "info.comment"
                                                            }}
                                                        />
                                                    }
                                                />
                                            }
                                            label={
                                                hotbetObj.label
                                            }
                                            labelPlacement="bottom"
                                        />
                                    </FormGroup>
                                )
                            }
                            {racingtabs[state.activeTab] &&
                                racingtabs[state.activeTab].indexOf(
                                    'Futures'
                                ) == -1 && (
                                    <FormGroup
                                        row
                                        aria-label="position"
                                    >
                                        {Object.keys(CountryObj).map(
                                            (key, idx) => (
                                                <FormControlLabel
                                                    key={`Country-${idx}`}
                                                    className="RacingIcons"
                                                    sx={{ mx: '0' }}
                                                    value="bottom"
                                                    control={
                                                        <Checkbox
                                                            sx={{
                                                                padding:
                                                                    '5px',
                                                            }}
                                                            checked={
                                                                CountryObj[
                                                                    key
                                                                ].value
                                                            }
                                                            onChange={handleChange(
                                                                'racemeet'
                                                            )}
                                                            name={key}
                                                            icon={
                                                                <SvgIcon
                                                                    color="grey.light"
                                                                    component={
                                                                        CountryObj[
                                                                            key
                                                                        ]
                                                                            .svg_icon
                                                                    }
                                                                    viewBox={
                                                                        CountryObj[
                                                                            key
                                                                        ]
                                                                            .view_box
                                                                    }
                                                                    sx={{
                                                                        fontSize: 35,
                                                                    }}
                                                                />
                                                            }
                                                            checkedIcon={
                                                                <SvgIcon
                                                                    color="primary.main"
                                                                    component={
                                                                        CountryObj[
                                                                            key
                                                                        ]
                                                                            .svg_icon
                                                                    }
                                                                    viewBox={
                                                                        CountryObj[
                                                                            key
                                                                        ]
                                                                            .view_box
                                                                    }
                                                                    sx={{
                                                                        fontSize: 35,
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                    }
                                                    label={
                                                        CountryObj[key]
                                                            .label
                                                    }
                                                    labelPlacement="bottom"
                                                />
                                            )
                                        )}
                                    </FormGroup>
                                )}
                        </Box>
                        <Box px={2} mt={1} mb={0.5}>
                            <Divider
                                sx={{
                                    borderColor: '#d0d1d2',
                                    boxShadow: '0 1px #fff',
                                }}
                            />
                        </Box>
                    </Box>
                )}
        </React.Fragment>
    }
    return (
        <>
            {state && (
                <Box>
                    <CustomTitle title="Racing" />
                    <Box
                        sx={{ width: '100%', backgroundColor: 'text.active' }}
                        py={1}
                    >
                        <CustomTabs
                            tabs={racingtabs}
                            handler={handleTabChange}
                            active={state.activeTab}
                            label="Race Day"
                            showscrollbuttons={true}
                        />
                    </Box>
                    {
                        racingtabs[state.activeTab] &&
                        racingtabs[state.activeTab].indexOf('Result') > -1 &&

                        <ResultsSubMenu
                            {...state}
                            racedate={racedates[state.activeTab]}
                            activeSubMenu={activeSubMenu}
                            handleSubMenuChange={handleSubMenuChange}
                            getFilterIcons={getFilterIcons}
                        />
                    }
                    {
                        racingtabs[state.activeTab] &&
                        racingtabs[state.activeTab].indexOf('Result') == -1 &&
                        <React.Fragment>
                            {getFilterIcons()}
                            {racingtabs.map((item, idx) =>
                                idx == 1 ? (
                                    <CustomTabPanel
                                        value={state.activeTab}
                                        index={idx}
                                        key={idx}
                                        content={
                                            <RacingNextToJump {...state} key={item} />
                                        }
                                    />
                                ) : item == 'Futures' ? (
                                    <CustomTabPanel
                                        value={state.activeTab}
                                        index={idx}
                                        key={idx}
                                        content={<Futures {...state} key={item} />}
                                    />
                                ) : item.indexOf('Jockey') > -1 ? (
                                    <CustomTabPanel
                                        value={state.activeTab}
                                        index={idx}
                                        key={idx}
                                        content={
                                            <JockeyChallenge
                                                {...state}
                                                key={item}
                                                track={
                                                    router.query.jockey
                                                        ? router.query.jockey
                                                        : false
                                                }
                                            />
                                        }
                                    />
                                ) : (
                                    <CustomTabPanel
                                        value={state.activeTab}
                                        index={idx}
                                        key={idx}
                                        content={
                                            <RacingData
                                                {...state}
                                                key={item}
                                                racedate={racedates[idx]}
                                                activeSubMenu={activeSubMenu}
                                            />
                                        }
                                    />
                                )
                            )}

                        </React.Fragment>
                    }
                </Box>
            )}
        </>
    );
};

export default RacingHome;
