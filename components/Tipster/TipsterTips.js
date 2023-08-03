import React, { useEffect, useReducer, useContext, useState } from 'react';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';
import CustomIndicatorTabs from '@Components/Shared/CustomIndicatorTabs';
import CustomTabs from '@Components/Shared/CustomTabs';
import { UserContext } from '@Context/User/UserProvider';
import { Box, Grid, Divider } from '@mui/material';
import { getHBTipster } from '@services/hotbets/hotbetsService';
import { getCategoryMenuDesc, getHBDayMenuDates, getHBDayMenuItems, getToDate } from '@utils/hotBetUtils';
import moment from 'moment';
import TipsterBetDetails from './TipsterBetDetails';
import TipsterFreeTips from './TipsterFreeTips';
import TipsterSaleTips from './TipsterSaleTips';
import NoTipsComponent from './NoTipsComponent';

const TipsterTips = ({ selectedType, tipster, selectedCat, settipsLoaded }) => {
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    let activeTab = selectedType;
    let activeDate = moment().format('YYYY-MM-DD');
    const initialState = {
        HBCategoryMenu: [],
        HBMarket: [],
        HBDayMenu: [],
        isLoading: true,
        isLoadingList: true,
        selectedRType: activeTab,
        selectedDate: null,
        selectedCategory: '',
        fromDate: activeDate,
        HBDayMenuData: [],
        catDesc: '',
    };

    const reducer = (state, action) => {
        const newState = {
            ...state,
            ...action.payload,
        };
        switch (action.type) {
            case 'update':
                return newState;
            case 'reset':
                return initialState;
            default:
                throw new Error();
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        HBCategoryMenu,
        HBMarket,
        HBDayMenu,
        isLoading,
        isLoadingList,
        selectedRType,
        selectedDate,
        selectedCategory,
        fromDate,
        HBDayMenuData,
        catDesc,
    } = state;

    const [openBetSlip, setopenBetSlip] = useState(false);

    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    const handleValueUpdates = (value) => {
        dispatch({
            type: 'update',
            payload: value,
        });
    };

    const getHBTipMarketData = async (init = false) => {
        try {
            setLoading(true);
            const response = await getHBTipster(
                user?.userID,
                tipster?.ALIAS,
                tipster?.USERID,
                selectedRType,
                selectedDate === 0 ? getToDate(0) : fromDate,
                selectedDate === 0 ? getToDate(5) : fromDate,
                selectedCategory == 'Nil' ? '' : selectedCategory,
                init
            );
            if (response && !response.error) {
                let selected = selectedCategory;
                if (selected != '') {
                    let menuExists =
                        response?.data?.HBCategoryMenu.filter((item) => item.cat == selectedCategory).length > 0 ? true : false;
                    if (!menuExists && response?.data?.HBCategoryMenu.length > 0 && response?.data?.HBCategoryMenu) {
                        selected = response?.data?.HBCategoryMenu[0].cat;
                    }
                } else {
                    selected =
                        response?.data?.HBCategoryMenu && response?.data?.HBCategoryMenu.length > 0
                            ? response?.data?.HBCategoryMenu[0].cat
                            : '';
                }
                let selected_date = '';
                if (init) {
                    selected_date =
                        getHBDayMenuDates(response?.data?.HBDayMenu).indexOf(fromDate) > -1
                            ? getHBDayMenuDates(response?.data?.HBDayMenu).indexOf(fromDate)
                            : 0;
                } else {
                    selected_date = getHBDayMenuDates(response?.data?.HBDayMenu).indexOf(fromDate) > -1 ? selectedDate : 0;
                }

                handleValueUpdates({
                    HBCategoryMenu: response?.data?.HBCategoryMenu,
                    HBMarket: response?.data?.HBMarket,
                    HBDayMenu: getHBDayMenuItems(response?.data?.HBDayMenu),
                    HBDayMenuData: response?.data?.HBDayMenu,
                    isLoading: false,
                    isLoadingList: false,
                    selectedCategory: selected,
                    selectedDate: selected_date,
                    catDesc: getCategoryMenuDesc(response?.data?.HBCategoryMenu, selected),
                });
            } else {
                handleValueUpdates({ isLoading: false, isLoadingList: false });
            }
        } catch (error) {
        } finally {
            handleValueUpdates({ isLoading: false, isLoadingList: false });
            setLoading(false);
            if (settipsLoaded) {
                setTimeout(() => {
                    settipsLoaded(true)
                }, 2000);
            }
        }
    };

    useEffect(() => {
        handleValueUpdates({ selectedRType: selectedType });
    }, [selectedType])


    useEffect(() => {
        handleValueUpdates({ isLoading: true });
        getHBTipMarketData(true);
    }, []);

    useEffect(() => {
        handleValueUpdates({ isLoadingList: true });
        HBDayMenuData?.length > 0 && getHBTipMarketData();
        const catDesc = getCategoryMenuDesc(HBCategoryMenu, selectedCategory);
        handleValueUpdates({ catDesc });
    }, [selectedRType]);

    useEffect(() => {
        handleValueUpdates({ isLoadingList: true });
        HBDayMenuData?.length > 0 && getHBTipMarketData();
    }, [fromDate, selectedDate]);

    const handleOnClickDateTab = (event, newValue) => {
        let fromDate = '';
        if (newValue === 0) {
            fromDate = getToDate(0);
        } else {
            fromDate = HBDayMenuData[newValue]?.dayval;
        }
        handleValueUpdates({
            selectedDate: newValue,
            fromDate,
        });
    };

    if (!HBMarket?.hbtipsummary) return <></>;

    if (HBMarket?.hbtipsummary?.length <= 0) {
        return (
            <Box mt={2}>
                <NoTipsComponent name={HBMarket?.hotbetad[0].ALIAS} />
            </Box>
        );
    }
    return (
        <Box>
            {/* {HBDayMenu && (
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: 'red',
                        // backgroundColor: 'text.active',
                    }}
                >
                    <CustomIndicatorTabs
                        tabs={HBDayMenu}
                        handler={handleOnClickDateTab}
                        active={HBDayMenu.length == 1 ? 0 : selectedDate}
                        label="Tipster Menu"
                        clsName="LbSubMenu"
                    />
                </Box>
            )} */}

            <Box sx={{ pb: 2, bgcolor: 'white.main' }}>
                {HBMarket?.hotbetad?.length > 0 &&
                    HBMarket?.hotbetad && HBMarket?.hbtipsummary &&
                    HBMarket?.hotbetad.map((card, index) => (
                        <React.Fragment key={index}>
                            {HBMarket?.hbtipsummary?.length > 0 && (
                                <TipsterBetDetails
                                    card={card}
                                    index={index}
                                    key={index}
                                    summary={HBMarket?.hbtipsummary}
                                    hotBetAdDetail={HBMarket?.hotbetaddetail || []}
                                    selectedCategory={selectedCategory}
                                    selectedType={selectedType}
                                    showGetTips={true}
                                    selectedDate={selectedDate === 0 ? null : fromDate}
                                />
                            )}

                            {/* Showing in a modal based on new designs <Box sx={{ marginTop: '50px' }}>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <TipsterFreeTips
                                    card={card}
                                    selectedCategory={selectedCategory}
                                    selectedRType={selectedRType}
                                    selectedDate={selectedDate === 0 ? null : fromDate}
                                />
                            </Box>
                            <TipsterSaleTips
                                card={card}
                                selectedCategory={selectedCategory}
                                selectedRType={selectedRType}
                                selectedDate={selectedDate === 0 ? null : fromDate}
                                handleBetSlip={handleBetSlip}
                            /> */}
                        </React.Fragment>
                    ))}
            </Box>
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} isCart={true} />
        </Box>
    );
};

export default TipsterTips;
