import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import getthemeOptions from 'themeOptions';
import { isHotBetWidget } from '@Components/utils/util';

let options = getthemeOptions();

const CustomDialog = ({
    id,
    open,
    title,
    content,
    onClose,
    showActions,
    fullWidth,
    maxWidth,
    showX,
    fullScreen,
    dialogbg,
    dialogtextcolor,
    titlecolor,
    disablePortal,
    ...rest
}) => {
    let hbWidget = isHotBetWidget();
    const isDesktop = useMediaQuery('(min-width:900px)');
    // const classes = useStyles();

    return (
        <Dialog
            disablePortal={disablePortal}
            disableEscapeKeyDown
            open={open}
            onClose={onClose}
            maxWidth={isDesktop ? 'xs' : maxWidth}
            fullScreen={isDesktop ? false : fullScreen}
            fullWidth={isDesktop ? false : fullWidth}
            aria-labelledby={`${id}-dialog-yes-no-title`}
            aria-describedby={`${id}-dialog-yes-no-description`}
            id={`${id}`}
            {...rest}
            sx={{
                zIndex: (theme) => theme.zIndex.modal - 100,
                top: `env(safe-area-inset-top)`,
            }}
            PaperProps={{
                style: {
                    backgroundColor: dialogbg,
                    color: dialogtextcolor,
                },
            }}
        >
            <DialogTitle id={`${id}-dialog-yes-no-title`}>
                <Box sx={{ textAlign: 'center' }}>
                    <img src={`${process.env.cdn}/images/logo/logo.svg`} alt={process.env.client.sitelabel} height={hbWidget ? 45 : 35} />
                </Box>
                {showX ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        color="white"
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent sx={{ px: 0 }}>
                <>
                    {title != '' && (
                        <Box sx={{ backgroundColor: 'primary.main', mb: 2, py: 0.1 }}>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                fontWeight="fontWeightBold"
                                align="center"
                                color={hbWidget ? 'white.main' : 'text.dialog'}
                            >
                                {title}
                            </Typography>
                        </Box>
                    )}
                    <Box sx={{ px: 2 }}>{content}</Box>
                </>
            </DialogContent>
        </Dialog>
    );
};

CustomDialog.defaultProps = {
    showActions: false,
    maxWidth: 'md',
    fullWidth: true,
    fullScreen: false,
    dialogbg: options.colors.dialog,
    dialogtextcolor: options.colors.textcolor,
    titlecolor: options.colors.dialogtitle,
    disablePortal: true,
};

CustomDialog.propTypes = {
    id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    content: PropTypes.node,
    onClose: PropTypes.func,
    showActions: PropTypes.bool,
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
    fullWidth: PropTypes.bool,
    showX: PropTypes.bool,
    disablePortal: PropTypes.bool,
};

export default CustomDialog;
