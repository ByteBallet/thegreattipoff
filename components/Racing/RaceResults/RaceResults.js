import React from 'react';
import NumberFormat from 'react-number-format';
import Image from "next/image";
import { useState } from 'react';
import ShowDividends from './ShowDividends';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Typography, Avatar, Stack, Collapse, IconButton, Grid, useMediaQuery } from '@mui/material';
import BlackBookButton from '../BlackBookButton';

const RaceResults = (props) => {
    const [hideImage, setHideImage] = useState(false);
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [field, setField] = useState(0);
    const showDividends = (code) => (event) => {
        if (field === code) {
            setField(0);
        } else {
            setField(code);
        }
    }
    return (
        <Box py={1} px={0}>
            <Grid container spacing={0}>
                {props.data.qResults.map((race, index) => (
                    <Grid
                        key={index}
                        container
                        rowSpacing={1}
                        columnSpacing={1}
                        sx={{ borderBottom: field === race.ACTUALCODE ? 0 : index != props.data.qResults.length - 1 ? 1 : 0, pt: 1, borderColor: "grey.primary" }}
                    >
                        <Grid container item xs>
                            <Box className="textAlignCoulmnCenter" mr={1.5}>
                                <Box>
                                    <img src={hideImage ? `${process.env.cdn}/images/silkdefault.png` :
                                        (race.RACETYPE == "G" ? `${process.env.cdn}/images/greyhound/Grey-${race.FIELDNUM}.png`
                                            : `${process.env.cdn}/images/silks/jockey-silk-${race.RACEID}-${race.ACTUALCODE}.png`)
                                    }
                                        width="23px" height="26px" alt="J-image" onError={() => {
                                            setHideImage(true);
                                        }} />
                                </Box>
                                <Avatar variant="rounded" sx={{ bgcolor: "text.default", width: 30, height: 20, mb: hideImage ? 0 : 1 }}>
                                    <Typography fontSize={12} fontWeight="bold" color="text.active">{race.POSITION}{race.POSITION == "1" ? "st" : race.POSITION == "2" ? "nd" : race.POSITION == "3" ? "rd" : "th"}</Typography>
                                </Avatar>
                            </Box>
                            <Stack spacing={0}>
                                <Typography sx={{ fontWeight: "600", fontSize: 13 }} noWrap>
                                    {race.FIELDNUM}. {race.FIELDNAME} {race.EVENT && race.RACETYPE === "R" ? `(${race.BARRIER})` : null}
                                </Typography>
                                {race.JOCKEY &&
                                    <Typography color="grey.dark" fontSize={12}>
                                        {race.racetype === "H" ? "D" : race.racetype === "G" ? "T" : "J"}: {race.JOCKEY}{race.JOCKEYAPPRENTICE == 1 && `(a${race.JOCKEYALLOWANCE})`}</Typography>
                                }
                                {race.TRAINER &&
                                    <Typography color="grey.dark" fontSize={12}> T: {race.TRAINER}</Typography>
                                }
                            </Stack>
                        </Grid>
                        {
                            race.POSITION < 4 &&
                            <>
                                <Grid item xs={1.5} container justifyContent="center">
                                    <>{race.POSITION == 1 &&
                                        <Stack spacing={0} direction="column">
                                            <Typography
                                                color="grey.dark"
                                                sx={{ lineHeight: "0.8" }}
                                                fontSize={13}
                                                align="center"
                                                className='textCapitalize'
                                            >{props.data.winlabel}</Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight: "600" }} align="center">
                                                <NumberFormat
                                                    value={race.PRICEWIN}
                                                    decimalSeparator="."
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    displayType="text" />
                                            </Typography>
                                        </Stack>
                                    }
                                    </>
                                </Grid>
                                <Grid item xs={1.5} container justifyContent="center">
                                    <Stack spacing={0} alignItems="center">
                                        <Typography
                                            color="grey.dark"
                                            sx={{ lineHeight: "0.8" }}
                                            fontSize={13}
                                            align="center"
                                            className='textCapitalize'>
                                            {props.data.placelabel}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight: "600" }} align="right">
                                            {
                                                race.PRICEPLACE == 0 ?
                                                    race.POSITION == 2 ? "NSD" : race.POSITION == 3 ? "NTD" : "ND" :
                                                    <NumberFormat
                                                        value={race.PRICEPLACE}
                                                        decimalSeparator="."
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        displayType="text" />
                                            }
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={1.5}>
                                    {race.PRICEPLACE != 0 &&
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={showDividends(race.ACTUALCODE)}
                                            sx={{ p: 0, ml: 1 }}
                                        >
                                            {field === race.ACTUALCODE ? (
                                                <KeyboardArrowUpIcon />
                                            ) : (
                                                <KeyboardArrowDownIcon />
                                            )
                                            }
                                        </IconButton>
                                    }
                                </Grid>
                                <Grid item xs={12}
                                    sx={{
                                        borderTop: field === race.ACTUALCODE ? 1 : 0, borderColor: "grey.primary", py: field === race.ACTUALCODE ? 1 : 0,
                                        backgroundImage: field === race.ACTUALCODE ? "linear-gradient(180deg, #fff, #F1F2F4)" : "none",
                                        pl: "0px !important"
                                    }}>
                                    <Collapse in={field === race.ACTUALCODE} timeout="auto" unmountOnExit>
                                        <ShowDividends race={race} field={field} />
                                    </Collapse>
                                </Grid>
                            </>
                        }
                        <Grid container item xs={12} sx={{marginRight:isDesktop ? 10 : 0}} justifyContent="flex-end">
                            <BlackBookButton follow={race?.FOLLOWING} runner={race?.FIELDNAME} actualcode={race?.ACTUALCODE} rtype={race?.RACETYPE} />
                        </Grid>
                    </Grid>
                ))}
                {
                    props.data.qResults.length <= 2 &&
                    <Grid item xs={12}
                        sx={{
                            borderTop: 1,
                            borderColor: "grey.primary",
                        }}>
                        <Typography fontSize={13} fontWeight="bold" align="center">No other runners</Typography>
                    </Grid>
                }
            </Grid>
        </Box >
    );
};

export default RaceResults;