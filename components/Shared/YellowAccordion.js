import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from '@mui/material';

const YellowAccordion = ({ title, children, isRacingTerms }) => {
    const [expanded, setExpanded] = useState(false);
    const [summaryBgColor, setBgColor] = useState('white');
    const [summaryBgImage, setBgImage] = useState('none');

    const onClickArrow = () => {
        if (expanded) {
            setBgColor('primary.main');
            setBgImage('none');
            setTimeout(() => {
                setBgColor('white');
            }, 200);
            setExpanded(false);
            return;
        }

        setBgImage('linear-gradient(0deg, rgb(0, 0, 0), rgb(115, 110, 110))');
        setExpanded(true);
        return;
    };
    return (
        <Accordion
            TransitionProps={{ unmountOnExit: true }}
            expanded={expanded}
            onChange={onClickArrow}
            sx={{
                p: 0,
                borderRadius: 0,
                border: 0,
                my: 0,
            }}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon
                        color={expanded ? 'white' : 'primary.main'}
                    />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    px: 2,
                    my: 0,
                    bgcolor: summaryBgColor,
                    backgroundImage: summaryBgImage,
                }}
            >
                <Typography
                    color={expanded ? 'white.main' : 'black.main'}
                    fontSize={14}
                    fontWeight="bold"
                >
                    {title}
                </Typography>
            </AccordionSummary>
            {isRacingTerms ? <>
                {children}
            </> : <AccordionDetails sx={{ px: 4, py: 2 }}>
                {children}
            </AccordionDetails>}
        </Accordion>
    );
};

export default YellowAccordion;
