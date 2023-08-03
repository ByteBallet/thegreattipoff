import { Box, Fade, Snackbar, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from '@mui/material';
import React, { useContext, useState } from 'react';
import TipsterSubscriptionRow from './TipsterSubscriptionRow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const TipsterSubscriptions = ({ handleBetSlip, clearTipslip, tipsterTips, onClose, defaultOpen = false }) => {
    const [open, setopen] = useState(false)
    const handleClose = () => {
        setopen(false)
    }
    return (
        <React.Fragment>
            {
                tipsterTips && tipsterTips.length > 0 &&
                <Accordion square
                    component={"Box"}
                    sx={{
                        boxShadow: "none"
                    }}
                    defaultExpanded={defaultOpen}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: "black.main" }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                            justifyContent: "start",
                            '& .MuiAccordionSummary-content': {
                                flexGrow: 0
                            }
                        }}
                    >
                        {
                            tipsterTips?.length == 1 ?
                                <Typography fontWeight={"bold"}>
                                    Subscribe to {tipsterTips?.[0]?.SALELEN} day package
                                </Typography> :
                                <Typography fontWeight={"bold"}>
                                    Subscribe to package{tipsterTips.length > 1 && "s"}
                                </Typography>
                        }
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            {tipsterTips?.map((tip, idx) =>
                                <Grid item xs={12} container key={idx}>
                                    <TipsterSubscriptionRow
                                        key={idx}
                                        tip={tip}
                                        handleClose={handleClose}
                                        setopen={setopen}
                                        handleBetSlip={handleBetSlip}
                                        clearTipslip={clearTipslip}
                                        open={open}
                                        onClose={onClose}
                                        tipsterTips={tipsterTips}
                                        showText={tipsterTips?.length > 1}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </AccordionDetails>
                </Accordion>


            }
        </React.Fragment >
    );
};

export default TipsterSubscriptions;