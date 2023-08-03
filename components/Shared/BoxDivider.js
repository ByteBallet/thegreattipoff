import { Box, Divider } from "@mui/material";

const BoxDivider = ({ mt }) => {
    return (
        <Box mb={2} mt={mt || 2}>
            <Divider sx={{ borderColor: "#d0d1d2", boxShadow: "0 1px #fff" }} />
        </Box>
    );
};

export default BoxDivider;