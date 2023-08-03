import React from 'react';
import CommonModal from '@Components/Payments/Common/CommonModal';
import { Card, CardContent, Typography } from '@mui/material';
import CustomSuccessButton from '@Components/Shared/CustomSuccessButton';

const UpdateSubscriptionModal = ({ open, field, handleUpdate, onClose, value }) => {
    return (
        <CommonModal
            open={open}
            onClose={onClose}
            title="Change Subscription Settings?"
        >
            <Card
                sx={{ backgroundColor: 'white', m: 0, pb: 4 }}
            >
                <CardContent>
                    <Typography component={"p"} align="center" fontSize={14} mb={2}>
                        {
                            field == "packweekday" ?
                                `Are you sure you want to change your Subscription setting to ${value == 0 ? 'All tipping days' : "Saturday's only"}?` :
                                `Are you sure you want to turn Auto-Renewal off for this subscription? Once the current subscription period ends, you will no longer receive tip packages from this tipster`
                        }
                    </Typography>
                    <CustomSuccessButton
                        fullwidth={true}
                        title={"Confirm"}
                        handleClick={handleUpdate}
                        rounded={false}
                    />
                </CardContent>
            </Card>
        </CommonModal>
    );
};

export default UpdateSubscriptionModal;