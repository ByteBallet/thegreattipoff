import React from 'react';
import AddGTOCardModal from './AddGTOCardModal';
import AddCardModal from './AddCardModal';

const AddCreditCardModal = ({ opened, onClose }) => {
    const isGTO = process.env.APP_BRAND == 'gto';
    return (
        <React.Fragment>
            {
                isGTO ?
                    <AddGTOCardModal
                        opened={opened}
                        onClose={onClose}
                    /> :
                    <AddCardModal
                        opened={opened}
                        onClose={onClose}
                    />
            }
        </React.Fragment>
    );
};

export default AddCreditCardModal;