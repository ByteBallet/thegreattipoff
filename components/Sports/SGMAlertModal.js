import React from 'react';
import { useContext } from 'react';
import { Modal, Box, Typography, Stack, Container, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { TipContext } from '@Context/Tip/TipProvider';

const SGMAlertModal = ({ sgmAlert, setsgmAlert, setBetsLocal }) => {
    const { tips, clearAllTips } = useContext(TipContext);

    let msg = <Stack direction="column" alignItems="center" justifyContent="center"
        sx={{
            width: "100%",
            lineHeight: 1.2
        }}
    >
        <Typography component="p" fontWeight="bold" fontSize={14} color="inherit" > You have selections in your BetSlip</Typography>
        <Typography component="p" fontSize={12} color="inherit" mt={1}>Clear BetSlip to build a Same Game Multi</Typography>
        <Typography component="p" fontSize={12} color="inherit">OR</Typography>
        <Typography component="p" fontSize={12} color="inherit">Add new selections for a combined Multi</Typography>
    </Stack >

    const clearBetsStorage = (reset = false) => {
        //clear storage
        localStorage.removeItem("bets_stake")
        localStorage.removeItem("placedbets")
        localStorage.removeItem("total_bets")
        localStorage.removeItem("multi")
        localStorage.removeItem("bets_nostake")
        localStorage.removeItem("beterrors")
        localStorage.removeItem("count")
        localStorage.removeItem("SGM")
    }

    const clearBetSlip = (event) => {
        Object.keys(tips).map((key, idx) => {
            clearAllTips(key);
        })
        localStorage.removeItem("betsAdded");
        localStorage.removeItem("singles")
        clearBetsStorage()
        handleClose()
    };

    const handleClose = () => {
        setsgmAlert(false)
        // localStorage.removeItem("SGM")
        setBetsLocal([])
    }

    return (
        <Modal
            open={sgmAlert}
            onClose={handleClose}
            disableEscapeKeyDown
            disablePortal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                top: "35%",
                mx: 3
            }}
        >
            <Stack direction="column"
                sx={{
                    bgcolor: "background.comment",
                    color: "info.comment",
                    borderColor: "info.comment",
                    border: 2,
                    p: 2,
                    borderRadius: 3
                }}>
                <Stack direction="row" alignItems="start" justifyContent="center">
                    <InfoIcon sx={{ color: "info.comment" }} />
                    {msg}
                </Stack>
                <Stack spacing={0} direction="row" sx={{ mt: 2 }} justifyContent="space-between">
                    <Button
                        onClick={clearBetSlip}
                        variant="contained"
                        sx={{
                            bgcolor: "info.comment",
                            color: "white.main",
                            width: "47%",
                            border: 1,
                            borderColor: "info.border"
                        }}>
                        Clear BetSlip
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            bgcolor: "info.comment",
                            color: "white.main",
                            width: "47%",
                            border: 1,
                            borderColor: "info.border"
                        }}>
                        Add to Multi
                    </Button>
                </Stack>
            </Stack>
        </Modal >
    );
};

export default SGMAlertModal;