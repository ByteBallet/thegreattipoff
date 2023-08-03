import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Alert, Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import TopTabs from '@Components/TopTabs/TopTabs';
import { EARNINGS_ROUTE_TYPE, EARNINGS_TABS, STATUS_OPTIONS } from '@lib/constants';
import EarningsSummary from './EarningsSummary';
import EarningsTipSales from './EarningsTipSales';
import HotbetEarnings from './HotbetEarnings';
import InfoIcon from '@mui/icons-material/Info';
import InfoAccordion from '@Components/Shared/InfoAccordion';
import { UserContext } from '@Context/User/UserProvider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/Link';
import { MONTH_OPTIONS } from '@lib/constants';
import DropdownButton from '@modules/Transactions/Components/DropdownButton';
import { getBankDetails } from '@services/tipster/tipsterService';
import CustomALert from '@Components/Shared/CustomALert';

const EarningsHome = ({ type }) => {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [month, setmonth] = useState('M');
    const [acct, setacct] = useState(false);
    const [status, setstatus] = useState(0);
    const [activeTab, setActiveTab] = useState(EARNINGS_ROUTE_TYPE.summary);

    const [loading, setloading] = useState(true);

    useEffect(() => {
        setmonth('M');
        setstatus(0);
    }, [activeTab]);

    const handleMonthOnChange = (value) => {
        setmonth(value);
    };

    const handleStatusOnChange = (value) => {
        setstatus(value);
    };

    const renderContent = () => {
        switch (activeTab) {
            case EARNINGS_ROUTE_TYPE.summary:
                return <EarningsSummary month={month} />;
            case EARNINGS_ROUTE_TYPE.tipSales:
                return <EarningsTipSales month={month} status={status} />;
            case EARNINGS_ROUTE_TYPE.hotbet:
                return <HotbetEarnings month={month} status={status} />;
        }
    };

    const MonthDropdown = () => <DropdownButton options={MONTH_OPTIONS} onChange={handleMonthOnChange} value={month} />;

    const StatusDropdown = () => <DropdownButton options={STATUS_OPTIONS} onChange={handleStatusOnChange} value={status} />;

    const renderButtonRow = () => {
        switch (activeTab) {
            case EARNINGS_ROUTE_TYPE.summary:
                return (
                    <div className="transactions-dropdown-button-wrapper">
                        <MonthDropdown />
                    </div>
                );
            case EARNINGS_ROUTE_TYPE.tipSales:
                return (
                    <div className="transactions-dropdown-button-wrapper">
                        <MonthDropdown />
                        <StatusDropdown />
                    </div>
                );
            case EARNINGS_ROUTE_TYPE.hotbet:
                return (
                    <div className="transactions-dropdown-button-wrapper">
                        <MonthDropdown />
                        <StatusDropdown />
                    </div>
                );
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const renderAccordionContent = () => {
        return (
            <Stack direction="column" spacing={1.5}>
                <Typography fontSize={12}>
                    Sales for Tips and HOT bets are paid into your nominated bank account by the 15th of the month when your total Net Sale
                    amount reaches $50.
                </Typography>
                <Typography fontSize={12}>Unpaid status = Sale Proceeds are yet to be paid</Typography>
                <Typography fontSize={12}>Paid status = Sale Proceeds have been paid</Typography>
            </Stack>
        );
    };
    const renderAddBank = () => {
        return (
            <Box mb={2} sx={{ cursor: "pointer", mx: "auto" }} className='fullWidthAlert'>
                <CustomALert content={
                    <Link href="/myaccount/mydetails">
                        <Typography color="inherit" fontSize={"inherit"} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 1 }}>
                            Add your bank account details here to get paid
                            <KeyboardArrowRightIcon sx={{ fontSize: 20 }} />
                        </Typography>
                    </Link>
                } severity="error" warning={true} isHtml={false} />
            </Box >
        );
    };
    const getBankAcctDetails = async () => {
        let body = {
            userid: user?.userID,
        };
        setloading(true);
        try {
            const resp = await getBankDetails(body);
            if (!resp?.error && resp?.data?.ERROBJ?.ERRORCODE == 0) {
                setacct(resp?.data?.hasbank);
            }
        } catch (e) {
            console.log('ERROR');
        } finally {
            setloading(false);
        }
    };
    useEffect(() => {
        user && user?.userID && getBankAcctDetails();
    }, []);

    let hasAcc = acct;

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'text.active',
                }}
                py={1}
            >
                <TopTabs tabs={EARNINGS_TABS} handler={handleTabChange} active={activeTab} />
                <Divider sx={{ mt: 1, mx: 3 }} />
            </Box>
            {renderButtonRow()}
            {!loading && (
                <Box sx={{ bgcolor: 'background.default', py: 2 }}>
                    {user?.totalEarnings > 0 ? (
                        hasAcc ? (
                            <InfoAccordion
                                title={'When are you paid for sales?'}
                                content={renderAccordionContent()}
                                icon={<InfoIcon sx={{ color: 'success.main' }} />}
                                bgcolor={'background.comment1'}
                                borderColor={'success.main'}
                            />
                        ) : (
                            renderAddBank()
                        )
                    ) : null}
                    {renderContent()}
                </Box>
            )}
        </>
    );
};

export default EarningsHome;
