import * as React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export default function SpeedMap({ raceSpeedMaps, fieldnum }) {
    let selected = raceSpeedMaps.filter((item) => item.FIELDNUM == fieldnum);
    let val = selected.length > 0 ? selected[0].VALUE : 0;
    let dividers = 80 / 6;
    let d = new Array(Math.max(Math.floor(dividers), 0)).fill(0);

    const isGTO = process.env.APP_BRAND == 'gto';

    return (
        <React.Fragment>
            {selected.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                    <Box
                        sx={{
                            width: val <= 0 ? '20%' : val + '%',
                            display: 'flex',
                            maxWidth: '80%',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            className={
                                isGTO
                                    ? `AnimateSpeedMap SpeedMapBarGTO ${
                                          val <= 0 && 'NoDataBar'
                                      }`
                                    : `AnimateSpeedMap SpeedMapBar ${
                                          val <= 0 && 'NoDataBar'
                                      }`
                            }
                            sx={{
                                borderTopLeftRadius: 6,
                                borderBottomLeftRadius: 6,
                                height: '16px',
                                width: '100%',
                                color: 'white.main',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    overflow: 'hidden',
                                }}
                            >
                                {[...Array(80)].map((e, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            height: '16px',
                                            width: 3,
                                            bgcolor: 'white.main',
                                            transform: 'skewX(-30deg)',
                                            mr: 0.5,
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexShrink: 0,
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Typography
                        variant="body2"
                        color="secondary.main"
                        fontWeight="bold"
                        fontStyle="italic"
                        ml={1}
                        noWrap
                    >
                        {selected[0].LABELS.join(' / ')}
                    </Typography>
                </Box>
            )}
        </React.Fragment>
    );
}
