import React from 'react';
import {
    Avatar,
    Box,
    Stack,
    Typography,
    CircularProgress,
    Grid,
    Divider,
    Card,
    CardActionArea,
    CardContent,
} from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Image from 'next/image';
import moment from 'moment';

const RenderSearchResults = ({ results, handleClick }) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent sx={{ px: 0 }}>
                    <Stack direction="column" spacing={0}>
                        {results.map((item, idx) => (
                            <Grid
                                container
                                spacing={0}
                                sx={{ px: 2, cursor: 'pointer' }}
                                key={idx}
                                onClick={() => handleClick(item)}
                            >
                                <Grid container item xs={12} spacing={1}>
                                    <Grid item xs={2} md={1.5}>
                                        {item?.type == 'Tipster' ? (
                                            <Avatar
                                                src={`${process.env.gtoImgPath}/${item?.icon}`}
                                                alt="J-image"
                                                sx={{
                                                    border: 'solid',
                                                    borderColor:
                                                        'grey.primary',
                                                    borderWidth: 3,
                                                    width: 45,
                                                    height: 45,
                                                }}
                                            />
                                        ) : (
                                            <Image
                                                src={`/images/svg/icon-${item?.icon}`}
                                                width={32}
                                                height={32}
                                                alt="J-image"
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={9} md={9.5}>
                                        <Stack
                                            direction="column"
                                            spacing={0}
                                            sx={{ width: 1 }}
                                        >
                                            <Typography
                                                className="textCapitalize"
                                                sx={{
                                                    fontWeight: '600',
                                                    fontSize: 14,
                                                }}
                                                color="info.comment"
                                            >
                                                {item?.label?.toLowerCase()}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    {item?.type == 'Tipster'
                                                        ? item?.type
                                                        : item?.subtype}
                                                    &nbsp;
                                                    {item?.type !=
                                                        'Tipster' &&
                                                        '(' +
                                                        item?.details
                                                            ?.racecountrylabel +
                                                        ')'}
                                                </Typography>
                                                {item?.type == 'Tipster' &&
                                                    item?.details
                                                        ?.mediagroup && (
                                                        <Typography
                                                            // className="textCapitalize"
                                                            fontSize={13}
                                                            sx={{
                                                                display:
                                                                    'flex',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <FiberManualRecordIcon
                                                                sx={{
                                                                    fontSize: 12,
                                                                }}
                                                            />
                                                            {
                                                                item
                                                                    ?.details
                                                                    ?.mediagroup
                                                            }
                                                        </Typography>
                                                    )}
                                            </Box>
                                            {item?.type != 'Tipster' && (
                                                <Box
                                                    sx={{
                                                        display: 'flex',

                                                        flexDirection:
                                                            'row',
                                                    }}
                                                >
                                                    <Typography
                                                        color="info.comment"
                                                        className="textCapitalize"
                                                        fontSize={13}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <FiberManualRecordIcon
                                                            sx={{
                                                                fontSize: 12,
                                                            }}
                                                            color="black"
                                                        />
                                                        {item?.details?.racemeet?.toLowerCase()}
                                                        &nbsp;
                                                        {!item?.future &&
                                                            `R${item?.details?.racenum}`}
                                                    </Typography>
                                                    <Typography
                                                        fontSize={13}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        &nbsp;
                                                        <FiberManualRecordIcon
                                                            sx={{
                                                                fontSize: 12,
                                                            }}
                                                        />
                                                        {moment
                                                            .utc(
                                                                item
                                                                    ?.details
                                                                    ?.racetimeUTC
                                                            )
                                                            .local()
                                                            .format(
                                                                !item?.future
                                                                    ? 'DD MMM YYYY HH:mm'
                                                                    : 'DD MMM YYYY'
                                                            )}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid
                                        container
                                        item
                                        xs={1}
                                        sx={{ alignItems: 'center' }}
                                    >
                                        <KeyboardArrowRightOutlinedIcon />
                                    </Grid>
                                </Grid>
                                {idx != results.length - 1 && (
                                    <Grid item xs={12}>
                                        <Divider
                                            sx={{
                                                my: 1.5,
                                            }}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default RenderSearchResults;