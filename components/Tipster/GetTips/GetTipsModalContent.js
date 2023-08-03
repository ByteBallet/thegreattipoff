import InfoAlert from '@Components/Shared/InfoAlert';
import { TipContext } from '@Context/Tip/TipProvider';
import { UserContext } from '@Context/User/UserProvider';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { getActivePackages, getTipDays } from '@services/tipster/tipsterService';
import React, { useContext, useEffect, useState } from 'react';
import TipsterFreeTips from '../TipsterFreeTips';
import TipsterHotBets from '../TipsterHotBets';
import TipsterSaleTips from '../TipsterSaleTips';
import TipsterSubscriptions from '../TipsterSubscriptions';
import moment from 'moment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CustomIndicatorTabs from '@Components/Shared/CustomIndicatorTabs';
import BoxDivider from '@Components/Shared/BoxDivider';
import CustomALert from '@Components/Shared/CustomALert';

const GetTipsModalContent = ({
    tipster,
    selectedCategory,
    selectedType,
    selectedDate,
    handleBetSlip,
    addtoslip,
    totalBets,
    isCarousel,
    onClose,
    loadIframe,
    setloadIframe,
    defaultDay,
    defaultRType
}) => {
    const [packages, setpackages] = useState();
    const [packageDays, setpackageDays] = useState([]);
    const [packDate, setpackDate] = useState();
    const { user } = useContext(UserContext);
    const { tips, clearAll } = useContext(TipContext);

    const getTipPackages = async () => {
        let body = {
            userid: user?.userID || 0,
            tipsterid: tipster?.USERID,
            racetype: defaultRType || 'A',
            racedate: packDate,
        };
        let resp = await getActivePackages(body);
        setpackages(resp?.data?.tippackage);
    };

    const getTipPackageDays = async () => {
        let body = {
            userid: user?.userID || 0,
            tipsterid: tipster?.USERID,
            racetype: 'A',
        };
        let resp = await getTipDays(body);
        setpackageDays(resp?.data?.qGetDays);
        let pDate = moment().format('YYYY-MM-DD')
        if (defaultDay && defaultDay != '2000-01-01') {
            let selected = resp?.data?.qGetDays?.filter((item) => moment(item?.TIPDATE).format('YYYY-MM-DD') == moment(defaultDay).format('YYYY-MM-DD'))
            pDate = selected?.length > 0 ? selected?.[0]?.TIPDATE : pDate
        } else {
            pDate = resp?.data?.qGetDays?.[0]?.TIPDATE
                ? moment(resp?.data?.qGetDays?.[0]?.TIPDATE).format('YYYY-MM-DD')
                : pDate
        }
        setpackDate(
            pDate
        );
    };

    useEffect(() => {
        getTipPackageDays();
    }, []);

    useEffect(() => {
        packDate && getTipPackages();
    }, [packDate]);

    const clearTipslip = () => {
        Object.keys(tips).map((key, idx) => {
            clearAll(key);
        });
        localStorage.removeItem('betsAdded');
        localStorage.removeItem('singles');
        localStorage.removeItem('multi');
        localStorage.removeItem('bets_stake');
        localStorage.removeItem('placedbets');
        localStorage.removeItem('total_bets');
        localStorage.removeItem('bets_nostake');
        localStorage.removeItem('beterrors');
    };

    const handleTabChange = (event, newValue) => {
        setpackDate(moment(packageDays[newValue]?.TIPDATE).format('YYYY-MM-DD'));
    };
    return (
        <React.Fragment>
            <Box
                sx={{
                    height: { xs: 'auto', sm: packageDays?.length > 1 ? 550 : 'auto' },
                    overflowY: 'auto',
                    maxHeight: 600,
                }}
            >
                {packageDays?.length > 0 && (
                    <Box px={2} pt={2}>
                        <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                            <Stack direction="row" alignItems={'center'} justifyContent="start">
                                <ShoppingCartIcon color="primary" />
                                <Typography fontWeight={'bold'} fontSize={20} ml={1}>
                                    Buy Tips
                                </Typography>
                            </Stack>
                            <CustomIndicatorTabs
                                tabs={packageDays.map((item) => item?.DAYLABEL)}
                                handler={handleTabChange}
                                active={packageDays.findIndex((item) => moment(item?.TIPDATE).format('YYYY-MM-DD') == packDate)}
                                label="BuyTips Menu"
                                clsName="buyTipsMenu"
                            />
                        </Stack>
                        <Divider sx={{ borderColor: '#d0d1d2', boxShadow: '0 1px #fff', mt: 1 }} />
                    </Box>
                )}
                {packages?.buyTips?.length == 0 && packages?.freeTips?.length == 0 && packages?.subscript?.length == 0 && (
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CustomALert content={'Tips have jumped'} severity="error" warning={false} isHtml={false} />
                    </Box>
                )}
                <Stack direction="column" pb={2}>
                    <TipsterSaleTips
                        card={tipster}
                        selectedCategory={selectedCategory}
                        selectedType={selectedType}
                        selectedDate={selectedDate}
                        handleBetSlip={handleBetSlip}
                        showBuyText={true}
                        tipsterTips={packages?.buyTips}
                        onClose={onClose}
                        clearTipslip={clearTipslip}
                    />
                    <Box>
                        <TipsterFreeTips
                            card={tipster}
                            selectedCategory={selectedCategory}
                            selectedType={selectedType}
                            selectedDate={selectedDate}
                            showFreeText={true}
                            tipsterTips={packages?.freeTips}
                            onClose={onClose}
                        />
                        <TipsterSubscriptions
                            card={tipster}
                            selectedCategory={selectedCategory}
                            selectedType={selectedType}
                            selectedDate={selectedDate}
                            handleBetSlip={handleBetSlip}
                            tipsterTips={packages?.subscript}
                            onClose={onClose}
                            clearTipslip={clearTipslip}
                            defaultOpen={packages?.buyTips?.length == 0 && packages?.freeTips?.length == 0}
                        />
                    </Box>
                    <TipsterHotBets
                        card={tipster}
                        selectedCategory={selectedCategory}
                        selectedType={selectedType}
                        selectedDate={selectedDate}
                        handleBetSlip={handleBetSlip}
                        totalBets={totalBets}
                        isCarousel={isCarousel}
                        onClose={onClose}
                        setloadIframe={setloadIframe}
                        loadIframe={loadIframe}
                        defaultRType={defaultRType}
                    />
                </Stack>
            </Box>
        </React.Fragment>
    );
};

export default GetTipsModalContent;
