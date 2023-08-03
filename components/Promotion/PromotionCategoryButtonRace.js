import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CustomSvgIcon, getButtonIcons } from '../utils/icons';

export const PromotionCategoryButtonRace = (props) => {
    const {
        onClickFunc,
        value,
        selectedValue,
        icon,
        label,
        iconVisible,
        isSvg,
        idx,
        isPromo = false,
        isIconOnly = false,
        isSelectedItemColorWhite = false
    } = props;

    const handleChange = () => {
        onClickFunc(idx)
    }

    const getColor = () => {
        if (isSelectedItemColorWhite) {
            return (value === selectedValue) ? "#fff" : "black.main"
        }
        else {
            return 'black.main'

        }
    }

    return (
        <Box container flex>
            {isIconOnly ?
                <Stack
                    onClick={handleChange}
                    sx={{
                        bgcolor: (value === selectedValue) ? "primary.main" : "grey.border1",
                        '&:hover': {
                            bgcolor: (value === selectedValue) ? "primary.main" : "grey.border1",
                        }, width: '30px', height: '30px', marginX: '3px', borderRadius: 30, justifyContent: 'center', flexDirection: 'row', alignContent: 'center', alignItems: 'center'
                    }}
                >
                    <CustomSvgIcon name={icon} size={15} color={getColor()} />

                </Stack>

                : <Button
                    size="medium"
                    variant="contained"
                    onClick={handleChange}
                    className="RacingTabButton"
                    sx={{
                        bgcolor: (value === selectedValue) ? "primary.main" : "grey.border1",
                        '&:hover': {
                            bgcolor: (value === selectedValue) ? "primary.main" : "grey.border1",
                        }
                    }}
                >
                    {iconVisible && isSvg ? (
                        isPromo ? <CustomSvgIcon name={icon} size={15} color={getColor()} /> : getButtonIcons('svg', icon.toUpperCase(), 15)
                    ) : (
                        null
                    )}
                    <Box style={{ paddingRight: '8px' }} />

                    <Typography
                        sx={{
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            paddingRight: '8px',
                            fontSize: 14,
                            color: getColor()

                        }}
                    >
                        {label}
                    </Typography>
                </Button>}
        </Box>
    );
};
