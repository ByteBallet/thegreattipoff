import React from 'react';
import { Collapse, Divider } from '@mui/material';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const ExpandedSalesView = ({ expanded, item }) => {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div
                style={{
                    paddingLeft: 18,
                    paddingRight: 12,
                    paddingBottom: 5,
                }}
            >
                <p className="lable-text">
                    Transaction Date:
                    <span className="value-text">
                        {moment(item?.PROCESSDATE).format(
                            'DD MMMM YYYY, hh:mm:ss A'
                        )}
                    </span>
                </p>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <p className="lable-text">
                    Gross Sale:
                    <span className="value-text">
                        <NumberFormat
                            thousandSeparator={true}
                            value={item?.GROSS || '0'}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                        />
                    </span>
                </p>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <p className="lable-text">
                    GTO Commission @ 40%:
                    <span className="value-text">
                        <NumberFormat
                            thousandSeparator={true}
                            value={item?.GTOCOMM || '0'}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                        />
                    </span>
                </p>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <p className="lable-text">
                    Transaction Fees & GST:
                    <span className="value-text">
                        <NumberFormat
                            value={(item?.FEE + item?.COMMTAX)}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                            thousandSeparator=","
                        />
                    </span>
                </p>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <p className="lable-text">
                    Net Sale:
                    <span className="value-text">
                        <NumberFormat
                            value={item?.NETTREV}
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale={true}
                            displayType="text"
                            prefix="$"
                            thousandSeparator=","
                        />
                    </span>
                </p>
                <Divider sx={{ pt: 0.8, mb: 1 }} />
                <p className="lable-text">
                    Status:
                    <span className="value-text">
                        {item?.CLOSED == 99 ? "Paid" : "Unpaid"}
                    </span>
                </p>
            </div>
        </Collapse>
    );
};

export default ExpandedSalesView;