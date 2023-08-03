import DateTitle from '@modules/Transactions/Components/DateTitle';
import { Box, Card, CardContent, Grid, Stack, Typography, Divider } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import NumberFormat from 'react-number-format';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HBSalesGrid = ({ data }) => {
    const renderRows = (item, i, totalRecs) => {
        let icon = item?.RACETYPE == "R" ? "HORS" : item?.RACETYPE == "H" ? "HARN" : "GREY"
        let bType = "Place"
        let status = item?.BETSTATUS?.toLowerCase()
        let bettype = item?.BETTYPE?.toLowerCase()
        bType = bettype?.includes("win") ? 'Win' : (bettype?.includes("place") || bettype?.includes("pc")) ? "Place" : bType
        if (status == "accepted") {
            status = "Open"
        } else if (status?.includes("return at")) {
            status = "Return"
        }
        return <React.Fragment>
            <Grid item xs={12} >
                <Grid container spacing={0}>
                    <Grid item xs={1.5}>
                        <Image
                            src={`/images/svg/icon-${icon}.svg`}
                            width={item.sport == 'Sports' ? 32 : 23}
                            height={item.sport == 'Sports' ? 32 : 23}
                            alt="J-image"
                        />
                    </Grid>
                    <Grid container item xs={5.5} flexDirection="column" alignItems={"start"}>
                        <Typography
                            component="p"
                            noWrap
                            sx={{
                                fontWeight: '600',
                                fontSize: 14,
                                textDecoration: 'none',
                                mt: -0.3,
                                width: "95%"
                            }}
                            color="inherit"
                        >
                            {item?.FIELDNUM}&nbsp;{item?.FIELDNAME}
                        </Typography>
                        <Typography
                            noWrap
                            fontSize={12}
                            className="textCapitalize"
                            color={"inherit"}
                            sx={{ width: "95%" }}
                        >
                            {item?.RACEMEET?.toLowerCase()}&nbsp;R{item?.RACENUM}
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                fontSize: 12,
                            }}
                            color="inherit"
                        >
                            Bet Type:&nbsp;<b>{item?.BETTYPE}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={5} container flexDirection="column" alignItems={"end"}>
                        <Typography
                            color={'inherit'}
                            justifyContent={'center'}
                            sx={{
                                fontSize: 14,
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Box mt={-0.5}>
                                <NumberFormat
                                    value={item?.DIVIDEND}
                                    decimalSeparator="."
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    displayType="text"
                                    prefix='$'
                                />
                            </Box>
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                fontSize: 12,
                            }}
                            color="inherit"
                        >
                            Stake:&nbsp;
                            <NumberFormat
                                value={item?.TOTALAMOUNT}
                                decimalSeparator="."
                                decimalScale={2}
                                fixedDecimalScale={true}
                                displayType="text"
                                prefix='$'
                            />
                        </Typography>
                        <Typography
                            className='textCapitalize'
                            component="p"
                            sx={{
                                fontSize: 12,
                            }}
                            color="inherit"
                            align="right"
                            noWrap
                        >
                            Earnings:&nbsp;
                            <Typography
                                fontWeight={item?.EARNAMT > 0 ? "bold" : "normal"}
                                fontSize={"inherit"}
                                color={item?.EARNAMT > 0 ? "success.main" : "inherit"}>
                                {/* {status}&nbsp; */}
                                {
                                    item?.EARNAMT > 0 ?
                                        <React.Fragment>
                                            <NumberFormat
                                                value={item?.EARNAMT}
                                                decimalSeparator="."
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                                displayType="text"
                                                prefix="$"
                                            />
                                            <CheckCircleIcon className="banking-tab-status-iconx" />
                                        </React.Fragment>
                                        : "No Return"
                                }
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {
                i < (totalRecs - 1) &&
                <Grid item xs={12}>
                    <Divider sx={{ mt: 1 }} />
                </Grid>
            }
        </React.Fragment>
    }
    return (
        <Box sx={{
            mx: 2,
            mt: 2,
        }}>
            {data?.length > 0 &&
                data.map((section, idx) => (
                    <React.Fragment key={idx}>
                        <DateTitle date={section[0].date} />
                        {section?.length > 0 &&
                            <Card
                                sx={{
                                    color: 'background.legs',
                                    bgcolor: 'white.main',
                                    mb: 2,
                                }}
                            >
                                <CardContent sx={{ p: 0 }}>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{
                                            p: 2
                                        }}
                                    >
                                        {section.map((item, i) => {
                                            return renderRows(item, i, section?.length);
                                        })
                                        }
                                    </Grid>
                                </CardContent>
                            </Card>
                        }
                    </React.Fragment>
                ))}
        </Box>
    );
};

export default HBSalesGrid;