import React from 'react';
import { Alert, Box, AlertTitle } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const CustomALert = ({ severity, content, warning, isHtml }) => {
    return (
        <Alert
            severity={severity}
            icon={warning ? (severity == "success" ?
                <CheckCircleIcon sx={{ color: `${severity}.alerttext` }} /> :
                severity == "error" ? <ErrorIcon sx={{ color: `${severity}.alerttext` }} /> : false) : false
            }
            sx={{
                bgcolor: `${severity}.alert`,
                width: "100%",
                border: 1.5,
                borderColor: `${severity}.alerttext`,
                alignItems: "center"
            }}
        >
            <AlertTitle
                sx={{
                    color: `${severity}.alerttext`,
                    display: "flex",
                    alignItems: "end",
                    fontSize: 12,
                    my: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                }}>
                {isHtml ?
                    <Box
                        dangerouslySetInnerHTML={{ __html: content }}
                    /> :
                    content}

            </AlertTitle>
        </Alert>
    );
};

export default CustomALert;