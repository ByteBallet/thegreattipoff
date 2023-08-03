import React from 'react';
import { Box, FormHelperText, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
const MessageHelperText = (props) => {
    const { error, title, type = 1, children, ...rest } = props;
    // if (error) {

    // } else {

    // }

    // <FormHelperText
    //   error={!isVerified}
    //   className={isVerified ? classes.successPanel : classes.errorPanel}
    //   sx={{
    //     color: isVerified ? 'success' : 'error'
    //   }}
    // >
    //   {isVerified ?
    //     <React.Fragment>
    //       {getButtonIcons("svg", "CHECK2", 18, 'rgb(0,128,0)')}
    //       <span>{messages.success}</span>
    //     </React.Fragment>
    //     :
    //     <React.Fragment >
    //       <ErrorOutlined fontSize="small" color="error" className={classes.iconTag} /><span>{messages.error}</span>
    //     </React.Fragment>
    //   }
    // </FormHelperText>

    return (
        <FormHelperText
            error={error}
            sx={{
                my: 1,
                mx: 0,
                py: 1,
                px: 1,
                width: '100%',
                backgroundColor: error ? '#fce3e6' : '#e7f4da',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                // alignItems: 'center',
                flexWrap: 'nowrap',
                visibility: !children && !title ? 'hidden' : 'visible',
            }}
        >
            {type == 2 &&
                (error ? (
                    <ErrorIcon
                        color="error"
                        size="small"
                        sx={{ fontSize: 20, mr: 1 }}
                    />
                ) : (
                    <Check
                        color="success"
                        size="small"
                        sx={{
                            fontSize: 20,
                            stroke: '#59ab01',
                            strokeWidth: 3,
                            mr: 1,
                        }}
                    />
                ))}
            {children ? (
                <Typography
                    fontSize={12}
                    style={{
                        color: error ? '#ff0000' : '#54aa01',
                        whiteSpace: 'pre-wrap',
                        textAlign: ' center',
                        alignItems: 'center',
                    }}
                >
                    {children}
                </Typography>
            ) : (
                void 0
            )}
        </FormHelperText>
    );
};

const MyFormHelperText = (props) => {
    const { children, ...rest } = props;
    // console.log('MyFormHelperText children=', children);
    const isError = children !== undefined && children != '';
    if (isError)
        return (
            <MessageHelperText error={isError}>
                {children || ''}
            </MessageHelperText>
        );
    else return <></>;
};

const TitledHelperText = (props) => {
    const {
        msg = 'Your card details have been updated.',
        title = 'success!',
        error = false,
        ...rest
    } = props;
    return (
        <Box
            sx={{
                width: 1,
                backgroundColor: error ? 'error.light' : 'success.light',
                my: 0.5,
                p: 1,
            }}
            align="center"
            {...rest}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {error ? (
                    <ErrorIcon
                        color="error"
                        size="small"
                        sx={{ fontSize: 20 }}
                    />
                ) : (
                    <Check
                        color="success"
                        size="small"
                        sx={{ fontSize: 20, stroke: '#59ab01', strokeWidth: 3 }}
                    />
                )}
                <Typography
                    sx={{
                        fontSize: 13,
                        color: error ? 'error.main' : 'success.main',
                    }}
                >
                    {title}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography
                    sx={{
                        fontSize: 13,
                        color: error ? 'error.main' : 'success.main',
                    }}
                >
                    {msg}
                </Typography>
            </Box>
        </Box>
    );
};
export const MyFormHelperText3 = (props) => {
    const { children, ...rest } = props;
    const isError = children.status === 200 ? false : true;
    const msg = children.msg;
    const title = isError ? 'Failure!' : 'Success!';
    return (
        <TitledHelperText error={isError} msg={msg} title={title} {...rest} />
    );
};
export const MyFormHelperText2 = (props) => {
    const { children, ...rest } = props;
    const isError = children.status === 200 ? false : true;
    const msg = children.msg;
    return msg ? (
        <MessageHelperText align="center" error={isError} type={2}>
            {msg}
        </MessageHelperText>
    ) : (
        <></>
    );
};

export default MyFormHelperText;
