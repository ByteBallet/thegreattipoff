import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid, Box, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PurchasedTipsComments = ({ item, comments }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        comments == 1 ? (expanded == item?.ID ? setExpanded(false) : setExpanded(item?.ID)) : setExpanded(false);
    }, [comments]);

    return (
        <React.Fragment>
            {item?.COMMENT?.length > 0 && (
                <Grid item xs={12}>
                    <Accordion square sx={{ p: 0, boxShadow: 'none' }} expanded={expanded === item?.ID} onChange={handleChange(item?.ID)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{
                                px: 0,
                                minHeight: 10,
                                '& .MuiAccordionSummary-content': {
                                    w: 1,
                                    justifyContent: 'end',
                                },
                            }}
                        >
                            <Typography color="primary.main" fontSize={13} align="right" fontWeight={'bold'}>
                                Comments
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            <Box
                                sx={{
                                    width: 1,
                                    bgcolor: 'grey.sportsOdds',
                                    lineHeight: 1,
                                    p: 1,
                                    border: 1,
                                    borderColor: 'grey.light',
                                    borderRadius: 1,
                                }}
                            >
                                <Typography sx={{ fontSize: 12, color: 'grey.dark' }}>{item?.COMMENT}</Typography>
                                {/* <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={3}
                                    defaultValue={item?.COMMENT}
                                    disabled={true}
                                    sx={{
                                        width: 1,
                                        bgcolor: 'grey.sportsOdds',
                                        fontSize: 12,
                                        '& .MuiOutlinedInput-root': {
                                            p: 1,
                                        },
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: 12,
                                            lineHeight: 1.25,
                                            color: '#fff',
                                        },
                                    }}
                                    color="primary"
                                /> */}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            )}
        </React.Fragment>
    );
};

export default PurchasedTipsComments;
