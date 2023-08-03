import React from 'react';

import { Stack, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';

const StatHeadingDetail = ({ adDetail, title, data }) => {
    return (
        <>
            <Stack direction="column" spacing={0} alignItems={'center'} justifyContent={'center'} className="HideTextOverflow">
                <Typography
                    noWrap
                    sx={{
                        lineHeight: 1.2,
                        fontSize: 24,
                    }}
                >
                    <b>
                        {` Turned `}

                        <NumberFormat
                            thousandSeparator={true}
                            value={adDetail?.profit?.FROMAMOUNT}
                            decimalSeparator="."
                            decimalScale={0}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                        />
                        <Typography fontWeight={'normal'} fontSize={20}>{` into `}</Typography>
                        <NumberFormat
                            thousandSeparator={true}
                            value={adDetail?.profit?.TOAMOUNT}
                            decimalSeparator="."
                            decimalScale={0}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                        />
                    </b>
                    {title.totalPeriods}
                </Typography>
                <Typography component="p" fontSize={15} align={'left'} sx={{ lineHeight: 1.4 }}>
                    over 30 days from $100 win bets
                </Typography>
            </Stack>
        </>
    );
};

export default StatHeadingDetail;
