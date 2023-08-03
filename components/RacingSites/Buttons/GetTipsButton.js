import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LoadGetTips from '@Components/Tipster/GetTips/LoadGetTips';
import { toTitleCase } from '@utils/hotBetUtils';
import { Router, useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    //
}));

const GetTipsButton = ({ content, onParentClick }) => {
    const classes = useStyles();
    const [openGetTipsModal, setOpenGetTipsModal] = useState(false);

    const router = useRouter();
    return (
        <>
            <Button
                color="success"
                variant="contained"
                size="large"
                sx={{
                    height: '35px',
                    boxShadow: '0px 2px 0px 0px #386c01',
                    borderRadius: 1.5,
                    '&:disabled': {
                        boxShadow: '0px 2px 0px 0px #386c01',
                        backgroundColor: 'success.main',
                    },
                }}
                fullWidth
                onClick={() => {
                    content ? setOpenGetTipsModal(true) : onParentClick();
                }}
            >
                <Typography color={'white.main'} fontWeight="bold" fontSize={14} noWrap>
                    Get tips
                </Typography>
            </Button>
            {content && (
                <LoadGetTips
                    isCarousel={true}
                    open={openGetTipsModal}
                    setOpenGetTipsModal={() => {
                        setOpenGetTipsModal(false);
                    }}
                    alias={content.beststat.hotbetad[0] ? toTitleCase(content.beststat.hotbetad[0]?.ALIAS) : ''}
                    tipster={content.beststat.hotbetad[0]}
                    selectedCategory={null}
                    selectedType={''}
                    selectedDate={0}
                    // handleBetSlip={handleBetSlip}
                />
            )}
        </>
    );
};

export default GetTipsButton;
