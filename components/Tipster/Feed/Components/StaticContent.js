import CustomGridTitle from '@Components/Shared/CustomGridTitle';
import { Box, Typography } from '@mui/material';

function StaticContent() {
    return (
        <Box px={2} mt={2}>
            <CustomGridTitle title="Static information heading" />
            <Box sx={{ backgroundColor: 'white.main', borderRadius: 1, px: 2, py: 1, mt: 1, lineHeight: 1 }}>
                <Typography fontSize={12}>
                    Refer below, noting this functionality is included in the Racing Sites Pages Spec. Show More prompt - if clicked, show
                    kqwehqkwehqkwjeh next 5 Feed items. If no more feed items available, don’t show Show More 2 containers for Static
                    InformationRefer below, noting this functionality is included in the Racing Sites Pages Spec. Show More prompt - if
                    clicked, show kqwehqkwehqkwjeh next 5 Feed items. If no more feed items available, don’t show Show More 2 containers for
                    Static Information
                </Typography>
            </Box>
        </Box>
    );
}

export default StaticContent;
