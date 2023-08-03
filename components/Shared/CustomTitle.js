import React from 'react';
import { Stack, Typography } from '@mui/material';

const CustomTitle = (props) => {
    return (
        <React.Fragment>
            {
                props.logo ?
                    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ backgroundColor: 'primary.main' }} py={0.3}
                    >
                        {props.logo}
                        <Typography
                            variant="h6"
                            component="div"
                            color="primary.contrastText"
                            align="center"
                            noWrap
                            py={0.3}
                            fontSize={17}
                        >
                            {props.title}
                        </Typography>
                    </Stack>
                    :
                    <Typography
                        variant="h6"
                        component="div"
                        color="primary.contrastText"
                        py={0.3}
                        sx={{ flexGrow: 1, backgroundColor: 'primary.main' }}
                        align="center"
                        fontSize={17}
                    >
                        {props.title}
                    </Typography>
            }
        </React.Fragment>
    );
};

export default CustomTitle;