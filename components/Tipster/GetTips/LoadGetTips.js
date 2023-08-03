import CommonModal from '@Components/Payments/Common/CommonModal';
import { Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GetTipsModalContent from './GetTipsModalContent';
import CloseIcon from '@mui/icons-material/Close';

const LoadGetTips = ({
    isCarousel = false,
    open,
    setOpenGetTipsModal,
    alias = '',
    tipster = {},
    selectedCategory = '',
    selectedType = '',
    selectedDate = 0,
    handleBetSlip,
    totalBets = 0,
    isShare = false,
    defaultDay,
    defaultRType = 'A'
}) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [loadIframe, setloadIframe] = useState();
    const onClose = () => {
        setOpenGetTipsModal(false);
    };

    const handleClose = (event, reason) => {
        if (reason && reason == 'backdropClick') return;
        setloadIframe();
    };

    function handleMessage(event) {
        var messageFromSender = event?.data;
        if (messageFromSender == 'closeHBWidget') {
            handleClose();
        }
    }

    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const renderContent = () => {
        return (
            <GetTipsModalContent
                tipster={tipster}
                selectedCategory={selectedCategory}
                selectedType={selectedType}
                selectedDate={selectedDate}
                handleBetSlip={handleBetSlip}
                totalBets={totalBets}
                isCarousel={isCarousel}
                onClose={onClose}
                setloadIframe={setloadIframe}
                loadIframe={loadIframe}
                defaultDay={defaultDay}
                defaultRType={defaultRType}
            />
        );
    };

    return (
        <React.Fragment>
            {open &&
                (isShare ? (
                    renderContent()
                ) : (
                    <CommonModal open={open} onClose={onClose} title={`Get ${alias}'s Tips`}>
                        {renderContent()}
                    </CommonModal>
                ))}

            {loadIframe && (
                <Dialog
                    disableEscapeKeyDown
                    disablePortal={true}
                    open={loadIframe != ''}
                    fullScreen={!isDesktop}
                    fullWidth
                    onClose={handleClose}
                    sx={{
                        zIndex: (theme) => theme.zIndex.modal - 100,
                        top: {
                            xs: 0,
                            sm: 34,
                        },
                        right: { sm: 0 },
                        left: { sm: 'auto' },
                        height: '100%',
                    }}
                    BackdropProps={{
                        sx: {
                            transform: { sm: 'translateY(65px)' },
                        },
                    }}
                    PaperProps={{
                        sx: {
                            minHeight: { sm: 'calc(100vh - 65px)' },
                            maxHeight: { sm: 'calc(100vh - 65px)' },
                            minWidth: { sm: 380 },
                            maxWidth: { sm: 380 },
                        },
                    }}
                >
                    <DialogContent sx={{ p: 0 }}>
                        <iframe
                            name="hotbetwidgetFrame"
                            id="hotbetwidgetFrame"
                            width="100%"
                            height="100%"
                            src={`${process?.env?.client?.hbWidgetLink}/hb/betslip/${loadIframe}`}
                            style={{ display: 'block', width: '100%', height: '90vh' }}
                        />
                        {/* <Button
                            variant="contained"
                            size="large"
                            color="success"
                            onClick={onClose}
                            sx={{ mx: 2, width: 1 }}
                        >
                            <Typography color="white.main" fontWeight="bold" noWrap>
                                Done
                            </Typography>
                        </Button> */}
                    </DialogContent>
                </Dialog>
            )}
        </React.Fragment>
    );
};

export default LoadGetTips;
