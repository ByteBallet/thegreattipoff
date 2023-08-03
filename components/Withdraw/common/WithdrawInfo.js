import React from 'react';
import { Stack, Typography, Box } from '@mui/material';

const WithdrawInfo = ({ type = 1 }) => {
    return (
        <React.Fragment>
            {
                process.env.APP_BRAND == 'eb' ?
                    type == 3 ?
                        <Stack item sx={{ display: 'flex', justifyContent: 'center', px: 5, py: 2 }} spacing={1}>
                            <Typography fontSize={12}>
                                PLEASE NOTE: Elitebet uses Osko Fast Pay when transferring money to you from your Elitebet Customer Account so that you receive your money as soon as possible.
                            </Typography>
                            <Typography fontSize={12}>
                                Bank withdrawals are ordinarily processed twice daily.
                            </Typography>
                            <Typography fontSize={12}>
                                In compliance with Anti-Money Laundering legislation, we only permit turned over funds to be withdrawn.
                            </Typography>
                        </Stack> :
                        <Stack item sx={{ display: 'flex', justifyContent: 'center', px: 5, py: 2 }} spacing={1}>
                            <Typography fontSize={12}>
                                Your bank may take 2 to 5 Business Days to process a credit card withdrawal and for the funds to reach your bank account.
                            </Typography>
                            <Typography fontSize={12}>
                                We will need to verify your credit card before you will be able to use this withdrawal method. In order to verify your credit card, we require a copy of the front and back of the card to be sent to <a href="mailto:admin@elitebet.com.au" style={{ cursor: "pointer" }}>admin@elitebet.com.au</a>. When sending a copy of the card, the middle 8 digits of the credit card may be redacted for security purposes.
                            </Typography>
                            <Typography fontSize={12}>
                                In compliance with Anti-Money Laundering legislation, we only permit turned over funds to be withdrawn.
                            </Typography>
                        </Stack>
                    :
                    <Box sx={{ display: 'flex', justifyContent: 'center', px: 5, py: 2 }}>
                        <Typography fontSize={12}>
                            PLEASE NOTE: Funds can take up to 3 working days to clear.
                        </Typography>
                    </Box>
            }
        </React.Fragment>
    );
};

export default WithdrawInfo;