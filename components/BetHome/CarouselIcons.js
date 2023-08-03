import React from 'react';
import getIcons, { CustomIcon, getButtonIcons, Icons } from '../utils/icons';
import { useRouter } from 'next/router';
import { SvgIcon } from '@mui/material';
import {
    Box,
    Typography,
    Divider,
    Container,
    Avatar,
    Stack,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Icon,
} from '@mui/material';
import { MAIN_CATEGORIES, RACING_CAROUSEL } from '../../lib/constants';
// import CarouselData from "./CarouselData";

const raceTypes =
    process.env.client.restrictedModules.indexOf('hotbet') > -1
        ? RACING_CAROUSEL.limited
        : RACING_CAROUSEL.all;

const labelRenderer = (label) => {
    return label == 'T'
        ? 'Today'
        : label == 'Y'
            ? 'Yesterday'
            : isNaN(label)
                ? label
                : label.concat('days');
};

const createRadioIcon2 = (sporttype, svg_icon) => {
    return (
        <Radio
            sx={{
                backgroundColor: '#fff',
                margin: '5px',
                boxShadow: '1px 1px 0px rgba(0,0,0,0.1)',
            }}
            style={{ padding: sporttype == 'racing' ? '8px' : '4px' }}
            icon={svg_icon}
            checkedIcon={svg_icon}
        // icon={<CustomIcon name="GREYS" />}
        // checkedIcon={<CustomIcon name="GREYS" />}
        />
    );
};
const createRadioIcon3 = (label) => {
    return (
        <Radio
            sx={{
                backgroundColor: '#fff',
                margin: '5px',
                boxShadow: '1px 1px 0px rgba(0,0,0,0.1)',
            }}
            style={{
                width: '50px',
                height: '50px',
                margin: 'auto',
                marginTop: '5px',
                marginRight: '14px',
            }}
            icon={
                <Box>
                    <Typography color="black" fontSize={20} fontWeight={'bold'}>
                        {label}
                    </Typography>
                </Box>
            }
            checkedIcon={
                <Box>
                    <Typography color="black" fontSize={20} fontWeight={'bold'}>
                        {label}
                    </Typography>
                </Box>
            }
        />
    );
};

export const CarouselIcons2 = ({
    active,
    topTypes,
    types,
    trending,
    trendlist,
    trendingRacing
}) => {
    // console.log('CarouselIcons2', active, topTypes, types);

    const router = useRouter();
    const onLink = (link, isSports = false) => {
        let url = '';
        // if (isSports) {
        //     if (link.sn) {
        //         url = `/sports/${link.sn.split(' ').join('_')}/${link.sc}`;
        //     } else {
        //         url = `/sports/${link.sportname.split(' ').join('_')}/${link.sportcode
        //             }`;
        //     }
        // } else {
        //     url = link;
        // }
        url = link;
        router.push({
            pathname: url,
        });
    };
    if (active === MAIN_CATEGORIES.sports) {
        return (
            <Box mt={0} mb={0} h={'auto'}>
                <Container
                    disableGutters
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        px: 1,
                        justifyContent: 'center',
                    }}
                    style={{ height: '110px' }}
                >
                    <Stack
                        direction="row"
                        spacing={1.2}
                        className="carouselIcons"
                        sx={{ width: '100%' }}
                    >
                        {trending.map((el, idx) => (
                            <FormControlLabel
                                key={`topsports--${idx}`}
                                className="TopSportsIcons"
                                sx={{ mx: '0' }}
                                value={el.sn}
                                onClick={() => onLink(el?.link, true, null)}
                                control={createRadioIcon2(
                                    'sport',
                                    getButtonIcons(
                                        'svg',
                                        el.tilename,
                                        35,
                                        'sport'
                                    )
                                )}
                                label={
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            display: 'flex',
                                            textAlign: 'center',
                                            color: '#444',
                                            height: '24px',
                                            lineHeight: '1.0',
                                        }}
                                    >
                                        {el.sportname}
                                    </span>
                                }
                                labelPlacement="bottom"
                            />
                        ))}
                        {topTypes.map(
                            (el, idx) =>
                                !trendlist.includes(el.sc) && (
                                    <FormControlLabel
                                        key={`topsports--${idx}`}
                                        className="TopSportsIcons"
                                        sx={{ mx: '0' }}
                                        value={el.sn}
                                        onClick={() => onLink(el?.link, true, null)}
                                        control={createRadioIcon2(
                                            'sport',
                                            getButtonIcons(
                                                'svg',
                                                el.sc,
                                                35,
                                                'sport'
                                            )
                                        )}
                                        label={
                                            <span
                                                style={{
                                                    fontSize: '12px',
                                                    display: 'flex',
                                                    textAlign: 'center',
                                                    color: '#444',
                                                    height: '24px',
                                                    lineHeight: '1.0',
                                                }}
                                            >
                                                {el.sn}
                                            </span>
                                        }
                                        labelPlacement="bottom"
                                    />
                                )
                        )}
                        {types.map(
                            (el, idx) =>
                                !trendlist.includes(el.sc) && (
                                    <FormControlLabel
                                        key={`topsports--${idx}`}
                                        className="TopSportsIcons"
                                        sx={{ mx: '0' }}
                                        onClick={() => onLink(el?.link, true, null)}
                                        value={el.sn}
                                        control={createRadioIcon2(
                                            'sport',
                                            getButtonIcons(
                                                'svg',
                                                el.sc,
                                                35,
                                                'sport'
                                            )
                                        )}
                                        label={
                                            <span
                                                style={{
                                                    fontSize: '12px',
                                                    display: 'flex',
                                                    textAlign: 'center',
                                                    color: '#444',
                                                    height: '24px',
                                                    lineHeight: '1.0',
                                                }}
                                            >
                                                {el.sn}
                                            </span>
                                        }
                                        labelPlacement="bottom"
                                    />
                                )
                        )}
                    </Stack>
                </Container>
            </Box>
        );
    } else {
        return (
            <Box mt={0} mb={0} h={'auto'}>
                <Container
                    disableGutters
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        px: 1,
                        justifyContent: 'center',
                        height: '96px'
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1.2}
                        className="carouselIcons"
                        sx={{ width: '100%' }}
                    >
                        {(trendingRacing || []).map((el, idx) => (
                            <FormControlLabel
                                key={`raceTypes--${idx}`}
                                className="TopSportsIcons"
                                sx={{ mx: '0' }}
                                // value={el?.value}
                                onClick={() =>
                                    onLink(el?.link, false, el?.value)
                                }
                                control={createRadioIcon2(
                                    // Icons.GREYS
                                    'racing',
                                    getButtonIcons(
                                        'svg',
                                        el?.tilename,
                                        25,
                                        'racing'
                                    )
                                )}
                                label={
                                    <span
                                        style={{
                                            fontSize: 12,
                                            display: 'flex',
                                            textAlign: 'center',
                                            color: '#444',
                                            height: '24px',
                                            lineHeight: '1.0',
                                        }}
                                    >
                                        {el?.sportname}
                                    </span>
                                }
                                labelPlacement="bottom"
                            />
                        ))}
                        {(raceTypes || {}).map((el, idx) => (
                            <FormControlLabel
                                key={`raceTypes--${idx}`}
                                className="TopSportsIcons"
                                sx={{ mx: '0' }}
                                // value={el?.value}
                                onClick={() =>
                                    onLink(el?.url, false, el?.value)
                                }
                                control={createRadioIcon2(
                                    // Icons.GREYS
                                    'racing',
                                    getButtonIcons(
                                        'svg',
                                        el?.icon,
                                        25,
                                        'racing'
                                    )
                                )}
                                label={
                                    <span
                                        style={{
                                            fontSize: 12,
                                            display: 'flex',
                                            textAlign: 'center',
                                            color: '#444',
                                            height: '24px',
                                            lineHeight: '1.0',
                                        }}
                                    >
                                        {el?.label}
                                    </span>
                                }
                                labelPlacement="bottom"
                            />
                        ))}
                    </Stack>
                </Container>
                {/* <Box mt={2} /> */}
            </Box>
        );
    }
};

export const IconLisiItem = ({ iconName, firstLine, secLine, thirdLine }) => {
    return (
        <Box mt={0} mb={3} h={'auto'}>
            <Container>
                <FormControlLabel
                    key={`raceTypes--`}
                    sx={{ mx: '0' }}
                    control={createRadioIcon2(
                        'racing',
                        getButtonIcons('svg', iconName, 25, 'racing')
                    )}
                    label={
                        <span
                            style={{
                                fontSize: 12,
                                display: 'flex',
                                textAlign: 'center',
                                color: '#444',
                                height: '24px',
                                lineHeight: '1.0',
                            }}
                        >
                            {firstLine}
                            {firstLine && <br />}
                            {secLine}
                            {secLine && <br />}
                            {thirdLine}
                        </span>
                    }
                    labelPlacement="bottom"
                />
            </Container>
        </Box>
    );
};
const CarouselIcons = ({
    active,
    topTypes,
    types,
    filter,
    setFilter,
    filterRace,
    setFilterRace,
}) => {
    return <Box />;
};

export default CarouselIcons;
