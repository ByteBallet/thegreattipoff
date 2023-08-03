import React, { useContext, useEffect, useState } from 'react';


import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { styled } from '@mui/material/styles';


const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(1, 1, 1, 0.80)',
        maxWidth: 220,
    },
}));

export default HtmlTooltip