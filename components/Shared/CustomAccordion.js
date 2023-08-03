import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';

const CustomAccordion = ({ title, content, expand = true }) => {
    return (
        <Accordion
            square
            sx={{ bgcolor: 'inherit' }}
            defaultExpanded={expand}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon color="primary" />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    px: 0,
                    borderBottom: 1,
                    borderColor: 'grey.dividends',
                }}
            >
                {title}
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0 }}>
                {content}
            </AccordionDetails>
        </Accordion>
    );
};

export default CustomAccordion;