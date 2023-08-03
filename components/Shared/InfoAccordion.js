import React from 'react';
import { Accordion, AccordionSummary, Stack, Box, Typography, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InfoAccordion = ({ title, content, icon, bgcolor = "background.comment", borderColor = "info.comment" }) => {
    return (
        <Accordion
            elevation={0}
            TransitionProps={{ unmountOnExit: true }}
            disableGutters
            square
            sx={{
                bgcolor: bgcolor,
                borderBottom: 1,
                borderColor: borderColor,
                boxShadow: "none",
                position: "inherit",
            }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    borderTop: 1,
                    borderColor: borderColor,
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        width: "100%"
                    }}>
                    <Stack direction="row" alignItems="center" sx={{ width: "75%" }}>
                        {icon}
                        <Typography color="black.main" fontSize={14} className="lineClamp" ml={1} fontWeight="bold">
                            {title}
                        </Typography>
                    </Stack>
                    <Typography fontSize={12} noWrap sx={{ width: "25%" }} align="right">Learn more</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Divider sx={{ borderColor: "#d0d1d2", boxShadow: "0 1px #fff" }} />
                <Typography color="inherit" mt={2} component="p" fontSize={12}>
                    {content}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default InfoAccordion;