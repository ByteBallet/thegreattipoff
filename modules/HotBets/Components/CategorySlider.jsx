import { Stack, Tab } from '@mui/material';
import Tabs from '@Components/Tabs/Tabs';
import { styled } from '@mui/material/styles';

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const CustomTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        '&:hover': {
            color: '#fbdc13',
            opacity: 1,
            backgroundColor: '#555028',
        },
        '&.Mui-selected': {
            color: '#fbdc13',
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: '#555028',
        },
    })
);

const CategorySlider = ({ categoryMenu, handleOnClickItem, isSelected }) => {
    const getSelectedIndex = () => {
        if (categoryMenu?.length > 0) {
            const selectedObject = categoryMenu.filter(
                (item) => item?.cat === isSelected
            );

            if (selectedObject?.length > 0) {
                return selectedObject[0]?.index - 1;
            } else {
                return '';
            }
        } else {
            return '';
        }
    };

    return (
        <Stack sx={{ py: 2 }}>
            <Tabs
                value={getSelectedIndex()}
                onChange={handleOnClickItem}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                TabIndicatorProps={{
                    style: {
                        display: 'none',
                    },
                }}
                className="RacingTabs"
            >
                {categoryMenu.map((item, idx) => {
                    return (
                        <CustomTab
                            label={item?.catlabel}
                            {...a11yProps(idx)}
                            key={idx}
                            sx={{
                                height: 33,
                                marginTop: 0.5,
                                color:
                                    getSelectedIndex() === idx
                                        ? '#fbdc13'
                                        : '#c9c9cb',
                                '&:hover': {
                                    color:
                                        getSelectedIndex() === idx
                                            ? '#fbdc13'
                                            : '#c9c9cb',
                                },
                                bgcolor:
                                    isSelected === item?.cat
                                        ? 'adFilter.buttonBackgroundColor.selected'
                                        : 'adFilter.buttonBackgroundColor.notSelected',
                                '&:hover': {
                                    bgcolor:
                                        isSelected === item?.cat
                                            ? 'adFilter.buttonBackgroundColor.selected'
                                            : 'adFilter.buttonBackgroundColor.notSelected',
                                },
                            }}
                        />
                    );
                })}
            </Tabs>
        </Stack>
    );
};

export default CategorySlider;
