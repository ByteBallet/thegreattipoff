import PendingTips from '@modules/Transactions/PendingTips/PendingTips';
import { Box } from '@mui/material';
import CustomGridTitle from '@Components/Shared/CustomGridTitle';
function FeedPending() {
    let defaultFilters = {
        filter: 0,
        sortorder: 0,
        resultType: 0,
        bankingType: 0,
        resultTime: 7,
    };

    return (
        <Box>
            <Box mx={2} mt={2} mb={-2}>
                <CustomGridTitle title="Pending Tips" />
            </Box>
            <PendingTips {...defaultFilters} />
        </Box>
    );
}
export default FeedPending;
