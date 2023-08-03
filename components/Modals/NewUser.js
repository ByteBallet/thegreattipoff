import React, { useEffect, useState, useContext } from 'react';

import { Modal, Box, Button, Typography } from '@mui/material';
import GetDetailsPrompt from '@Components/user/GetDetailsPrompt';

import gbSettings from '@stores/gbSettings';

function NewUser() {
    const [showModal, setShowModal] = useState(false);
    const showUserDetailsPrompt = gbSettings((store) => store.showUserDetailsPrompt);
    useEffect(() => {
        if (showUserDetailsPrompt && !showModal) {
            setShowModal(true);
        }
    }, [showUserDetailsPrompt]);

    return (
        <Box>
            {/* <Button onClick={() => setShowModal(true)}>Open</Button> */}

            <Modal
                open={showModal}
                // onClose={() => setShowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ py: 1.5, backgroundColor: '#581663', borderRadius: '5px 5px 0 0' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                            Complete your details
                        </Typography>
                    </Box>
                    <GetDetailsPrompt onClick={() => setShowModal(false)} />
                </Box>
            </Modal>
        </Box>
    );
}

export default NewUser;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
};
