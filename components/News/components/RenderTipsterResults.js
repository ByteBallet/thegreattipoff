import React from 'react';
import RacingIcon from '@Components/RacingIcon';
import NumberFormat from 'react-number-format';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import DateTitle from '@modules/Transactions/Components/DateTitle';

const RenderTipsterResults = ({ results }) => {
    const renderRows = (item, currentIdx, total) => {
        let win = item?.POSITION == 1;
        let placed = item?.POSITION > 1 && item?.POSITION <= 3 && item?.BETTYPELABEL == 'Place';
        let price = win ? item?.RESULTPRICE : item?.RESULTPRICE;

        const iconImageWith = '35px';

        const getBgColor = () => {
            let bgcolor = "white.main"
            let betType = item?.BETTYPELABEL?.toLowerCase()
            if (item?.POSITION) {
                if (item?.POSITION == 1 && betType == "win") {
                    bgcolor = '#fffbef'
                } else if (betType == "win" && item?.POSITION <= 3) {
                    bgcolor = '#f2eaf9'
                } else if (item?.POSITION == 1 && betType == "place") {
                    bgcolor = '#fffbef'
                } else if (item?.POSITION <= 3 && betType == "place") {
                    bgcolor = '#f2eaf9'
                }
            }
            return bgcolor
        }

        return (
            <React.Fragment>
                <Grid
                    item
                    xs={12}
                    container
                    sx={{
                        pt: 1,
                        borderColor: '#cccccc',
                        bgcolor: getBgColor(),
                        px: 2,
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="start" sx={{ width: 1 }}>
                        <Box sx={{ width: '80%', display: 'flex' }}>
                            <Box sx={{ width: iconImageWith }}>
                                <RacingIcon racetype={item.RACETYPE ?? 'R'} />
                            </Box>
                            <Stack direction="column" spacing={0} alignItems="flex-start">
                                <Typography
                                    component="p"
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: 14,
                                        textDecoration: 'none',
                                        mt: -0.3,
                                    }}
                                    color="inherit"
                                >
                                    {item?.SELECTION}.&nbsp;{item?.FIELDNAME}
                                </Typography>
                                <Typography fontSize={14} className="textCapitalize" color={'grey.main'}>
                                    {item?.RACEMEET?.toLowerCase()}&nbsp;R{item?.RACENUM}
                                </Typography>
                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'flex-end',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography fontSize={14} fontWeight="bold">
                                <NumberFormat
                                    thousandSeparator={true}
                                    value={price ? price : '0'}
                                    decimalSeparator="."
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    displayType="text"
                                />
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction={'row'} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Box sx={{ marginLeft: iconImageWith }}>
                            <Typography fontSize={14} noWrap>
                                Tip type:{' '}
                                <Typography fontWeight={'bold'} fontSize={14} noWrap>
                                    {item?.BETTYPELABEL
                                        ? item?.BETTYPELABEL
                                        : win
                                            ? 'Win'
                                            : item?.POSITION && item?.POSITION <= 3
                                                ? 'Place'
                                                : 'No Return'}
                                </Typography>
                            </Typography>
                        </Box>

                        <Stack direction="column" alignItems={'flex-end'} justifyContent="space-between" sx={{ width: 1 }}>
                            <Typography fontSize={14} noWrap>
                                Stake:&nbsp;<b>{item?.STAKELABEL ? item?.STAKELABEL : 'Standard'}</b>
                            </Typography>
                            <Typography
                                fontSize={14}
                                className="textCapitalize"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 0.5,
                                }}
                            >
                                Result:&nbsp;
                                <Typography
                                    fontSize={14}
                                    sx={{
                                        color: win || placed ? 'success.main' : 'inherit',
                                        fontWeight: win || placed ? 'bold' : 'inherit',
                                    }}
                                >
                                    {win ? 'Win' :
                                        (item?.BETTYPE == 'w' && item?.POSITION > 1 && item?.POSITION <= 3) ? 'No Return' :
                                            (item?.POSITION > 1 && item?.POSITION <= 3) ? 'Win' : 'No Return'}
                                </Typography>
                                &nbsp;
                                {(win || placed) && (
                                    <CheckCircleIcon
                                        color="success"
                                        sx={{
                                            fontSize: 14,
                                        }}
                                    />
                                )}
                            </Typography>
                        </Stack>
                    </Stack>
                    {currentIdx < total - 1 && (
                        <Box sx={{ width: 1, pt: 1 }}>
                            <Divider />
                        </Box>
                    )}
                </Grid>
            </React.Fragment>
        );
    };

    return (
        <Box>
            {results?.length > 0 ? (
                results.map((section, idx) => (
                    <Box mt={1} key={idx}>
                        <DateTitle date={section[0].date} showTime={false} />
                        {section?.length > 0 && (
                            <Card key={idx} sx={{ width: 1 }}>
                                <CardContent sx={{ p: 0, borderRadius: 2 }}>
                                    <Grid container spacing={0}>
                                        {section.map((item, i) => {
                                            return renderRows(item, i, section.length);
                                        })}
                                    </Grid>
                                </CardContent>
                            </Card>
                        )}
                    </Box>
                ))
            ) : (
                <Box>

                </Box>
            )}
        </Box>
    );
};

export default RenderTipsterResults;