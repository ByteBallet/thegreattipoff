import { groupByKey } from '@Components/utils/util';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/Link';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FooterCategories = ({ footer }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    let grpByCategory = footer ? groupByKey(footer, 'SUBCATEGORY') : [];

    const renderData = (key) => {
        return <React.Fragment>
            {
                grpByCategory[key]?.map((item, idx) =>
                    <React.Fragment key="idx">
                        <Grid container xs={12}>
                            <Link href={item?.PATH} key={item?.ID}>
                                <Typography sx={{ color: "footer.text", my: 0.7, cursor: "pointer" }} fontSize={13} fontWeight='bold'>
                                    {item.LABEL}
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid container xs={12} sx={{ justifyContent: "start" }}>
                            <Divider sx={{ borderColor: "footer.text", width: "80%" }} />
                        </Grid>
                    </React.Fragment>
                )}
        </React.Fragment>
    }
    const renderLabel = (key) => {
        return <Typography sx={{ color: "white.main", my: 1 }} fontWeight='bold'>
            {key}
        </Typography>
    }
    return (
        <React.Fragment>
            {
                footer?.length > 0 &&
                <Grid container spacing={0} alignItems="start" justifyContent={"space-between"} sx={{ p: 3, width: 1 }}>
                    {
                        Object.keys(grpByCategory).map((key, idx) =>
                            <Grid container xs={12} md={3} key={`F-${idx}`}>
                                <Grid container spacing={0}>
                                    <Grid container xs={12}>
                                        {isDesktop ? renderLabel(key) :
                                            <React.Fragment>
                                                <Accordion
                                                    disableGutters
                                                    square
                                                    sx={{
                                                        width: 1,
                                                        bgcolor: "inherit",
                                                        minHeight: "auto",
                                                        boxShadow: "none",
                                                        borderBottom: 1,
                                                        borderTop: idx == 0 ? 1 : 0,
                                                        borderColor: "footer.text",
                                                    }}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon sx={{ color: "white.main" }} />}
                                                        aria-controls={`panel1a-content${key}`}
                                                        id={`panel1a-${key}`}
                                                        sx={{
                                                            my: 0,
                                                            minHeight: "auto",
                                                            '& .MuiAccordionSummary-content': {
                                                                my: 0.5
                                                            }
                                                        }}
                                                    >
                                                        {renderLabel(key)}
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        {renderData(key)}
                                                    </AccordionDetails>
                                                </Accordion>
                                            </React.Fragment>
                                        }
                                    </Grid>
                                    {isDesktop && renderData(key)}
                                </Grid>
                            </Grid>
                        )
                    }
                </Grid>
            }
        </React.Fragment >
    );
};

export default FooterCategories;