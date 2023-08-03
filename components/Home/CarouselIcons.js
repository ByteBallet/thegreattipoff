import React from 'react';
import horses from "../../public/images/svg/horse-racing.svg";
import harness from "../../public/images/svg/harness-racing.svg";
import greys from "../../public/images/svg/greys-racing.svg";
import media from "../../public/images/svg/media-icon.svg";
import all from "../../public/images/svg/all-icon.svg";
import { SvgIcon } from "@mui/material";
import { Box, Typography, Divider, Container, Avatar, Stack, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import CarouselData from './CarouselData';

const CarouselIcons = () => {
    let carousel_settings = {
        racetype: {
            R: "R",
            G: "G",
            H: "H"
        },
        media: {
            media: "1",
            all: "0"
        },
        period: {
            T: "TD",
            Y: "YD",
            week: "WK",
            month: "1M",
            quarter: "3M",
            halfyear: "9M",
            year: "12M"

        }
    };
    let raceObj = {
        R: {
            value: carousel_settings.racetype.R,
            svg_icon: horses,
            view_box: "0 0 466.36 510.95",
            label: "Horses",
        },
        G: {
            value: carousel_settings.racetype.G,
            svg_icon: greys,
            view_box: "0 0 1633 1465",
            label: "Greys",
        },
        H: {
            value: carousel_settings.racetype.H,
            svg_icon: harness,
            view_box: "0 0 1101 1850",
            label: "Harness",
        },
    };
    let mediaObj = {
        media: {
            value: carousel_settings.media.media,
            svg_icon: media,
            view_box: "0 0 352 512",
            label: "Media",
        },
        all: {
            value: carousel_settings.media.all,
            svg_icon: all,
            view_box: "0 0 640 512",
            label: "All",
        },
    };
    let periodObj = {
        T: {
            value: carousel_settings.period.T,
            label: "T",
        },
        Y: {
            value: carousel_settings.period.Y,
            label: "Y",
        },
        week: {
            value: carousel_settings.period.week,
            label: "7",
        },
        month: {
            value: carousel_settings.period.month,
            label: "30",
        },
        quarter: {
            value: carousel_settings.period.quarter,
            label: "90",
        },
        halfyear: {
            value: carousel_settings.period.halfyear,
            label: "180",
        },
        year: {
            value: carousel_settings.period.year,
            label: "365",
        },
    };


    const [values, setValues] = React.useState({
        FrmSelectType: carousel_settings.racetype.R,
        media: carousel_settings.media.media,
        FrmSelectMarket: carousel_settings.period.T
    });

    const handleChange = (key) => (event) => {
        setValues({
            ...values,
            [key]: event.target.value,
        });
    };
    return (
        <Box mt={1} mb={0}>
            <Container sx={{ display: "flex", overflowX: "auto", pl: 1 }}>
                <Stack direction="row" spacing={1.2} className="carouselIcons">
                    <FormControl>
                        <RadioGroup row
                            aria-labelledby="racetype-radio-buttons-group-label"
                            value={values.FrmSelectType}
                            onChange={handleChange("FrmSelectType")}
                            name="radio-buttons-group"
                            sx={{ flexWrap: "nowrap" }}
                        >
                            {Object.keys(raceObj).map((key, idx) => (
                                <FormControlLabel
                                    key={`Race--${idx}`}
                                    className="RacingIcons"
                                    sx={{ mx: "0" }}
                                    value={raceObj[key].value}
                                    control={
                                        <Radio
                                            icon={<SvgIcon color="grey" component={raceObj[key].svg_icon} viewBox={raceObj[key].view_box} sx={{ fontSize: 45 }} />}
                                            checkedIcon={
                                                <SvgIcon color="primary.main" component={raceObj[key].svg_icon} viewBox={raceObj[key].view_box} sx={{ fontSize: 45 }} />
                                            }
                                        />
                                    }
                                    label={raceObj[key].label}
                                    labelPlacement="bottom"
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <Divider orientation="vertical" variant="middle" flexItem light />
                    <FormControl>
                        <RadioGroup row
                            aria-labelledby="racetype-radio-buttons-group-label"
                            value={values.media}
                            onChange={handleChange("media")}
                            name="radio-buttons-group"
                            sx={{ flexWrap: "nowrap" }}
                        >
                            {Object.keys(mediaObj).map((key, idx) => (
                                <FormControlLabel
                                    key={`Race--${idx}`}
                                    className="RacingIcons"
                                    sx={{ mx: "0" }}
                                    value={mediaObj[key].value}
                                    control={
                                        <Radio
                                            icon={<SvgIcon color="grey" component={mediaObj[key].svg_icon} viewBox={mediaObj[key].view_box} sx={{ fontSize: 45 }} />}
                                            checkedIcon={
                                                <SvgIcon color="primary.main" component={mediaObj[key].svg_icon} viewBox={mediaObj[key].view_box} sx={{ fontSize: 45 }} />
                                            }
                                        />
                                    }
                                    label={mediaObj[key].label}
                                    labelPlacement="bottom"
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <Divider orientation="vertical" variant="middle" flexItem light />
                    <FormControl>
                        <RadioGroup row
                            aria-labelledby="racetype-radio-buttons-group-label"
                            value={values.FrmSelectMarket}
                            onChange={handleChange("FrmSelectMarket")}
                            name="radio-buttons-group"
                            sx={{ flexWrap: "nowrap" }}
                        >
                            {Object.keys(periodObj).map((key, idx) => (
                                <FormControlLabel
                                    key={`Race--${idx}`}
                                    className="RacingIcons"
                                    sx={{ mx: "0" }}
                                    value={periodObj[key].value}
                                    control={
                                        <Radio
                                            icon={<Avatar className="carouselitem"><Typography color="grey.main" fontSize={20}>{periodObj[key].label}</Typography></Avatar>}
                                            checkedIcon={
                                                <Avatar className="carouselitem"><Typography color="primary.main" fontSize={20}>{periodObj[key].label}</Typography></Avatar>
                                            }
                                        />
                                    }
                                    label={periodObj[key].label == "T" ? "Today" : periodObj[key].label == "Y" ? "Yesterday" : "days"}
                                    labelPlacement="bottom"
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Container>
            <Box mt={2}>
                <CarouselData {...values} jsonResp="1" />
            </Box>
        </Box>
    );
};

export default CarouselIcons;