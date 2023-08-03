import { Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

const CreditCardVerifyMessage = ({ depositdate, amt }) => {
    return (
        <React.Fragment>
            <Typography fontSize={14} fontWeight="bold" mt={1} component="p">Verify you are the owner of this card</Typography>
            <ol>
                <li>
                    {
                        depositdate ?

                            <Typography fontSize={14} component="p">
                                Check your card statement around <b>{moment(depositdate).format("DD MMM YYYY")}</b> for your first deposit
                            </Typography> :

                            <Typography fontSize={14} component="p">
                                Check your card statement for your
                                first deposit to EliteBet.
                            </Typography>

                    }
                </li>
                <li>
                    {
                        amt ?

                            <Typography fontSize={14} my={2} component="p">
                                You will see a <b>${amt}.XX</b> deposit to EliteBet.
                            </Typography> :
                            <Stack>
                                <Typography fontSize={14} mt={2} component="p">
                                    We added some cents to the deposit.
                                </Typography>
                                <Typography fontSize={14} color="error.alerttext" my={1}>
                                    e.g. if you deposited $200.XX you will see a
                                    deposit of $200.XX where XX is the
                                    number of cents.
                                </Typography>
                            </Stack>
                    }
                </li>
                <li>
                    <Stack>
                        <Typography fontSize={14} component="p">
                            Enter the additional cents <b>XX</b> showing on your card statement along with your CCV.
                        </Typography>
                        {
                            amt ?
                                <Typography fontSize={14} color="error.alerttext" mt={2}>
                                    e.g. if the amount is ${amt}.27 enter <b>27</b>
                                </Typography> : null
                        }
                        <Typography fontSize={14} fontWeight="bold" color="error.alerttext" mt={2}>
                            For assistance call {process.env.client.contactFormatted}
                        </Typography>
                    </Stack>
                </li>
            </ol>
        </React.Fragment>
    );
};

export default CreditCardVerifyMessage;