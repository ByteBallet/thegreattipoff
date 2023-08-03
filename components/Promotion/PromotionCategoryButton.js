import { SvgIcon, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Image from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { getButtonIcons } from '../utils/icons';
export const PromotionCategoryButton = (props) => {
    const { onClick, value, selectedValue, icon, label, iconVisible } = props;
    // console.log('PromotionCategoryButton = ', props);
    // if (value === "Tennis") {

    // }
    return (
        <Box container flex>
            <Button
                size="medium"
                variant="contained"
                onClick={onClick}
                className="RacingTabButton"
                sx={{
                    bgcolor: (value === selectedValue) ? "primary.main" : "grey.tipBtn",
                    '&:hover': {
                        bgcolor: (value === selectedValue) ? "primary.main" : "grey.tipBtn",
                    }
                }}
            >
                {icon && iconVisible ? (
                    getButtonIcons('svg', icon, 15)
                ) : (
                    null
                )}

                <Box style={{ paddingRight: '5px' }} />
                <Typography
                    sx={{
                        lineHeight: 1,
                        whiteSpace: 'nowrap',
                        paddingRight: '8px',
                        fontSize: 14,
                    }}
                >
                    {label}
                </Typography>
            </Button>
        </Box>
    );
};
