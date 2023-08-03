import React, { useState, useEffect } from 'react';
import {
    All_RACING_CODES,
    COMMENTS_CODES,
    RESULT_TIME,
    SUB_STATUS,
    TIPTRANSACTIONS_ROUTE_TYPE,
    TIPTRANSACTIONS_ROUTE_VALUE,
    TIPTRANSACTIONS_TABS,
    TRANS_DATE,
    TRANS_TYPE,
} from '@lib/constants';
import { useRouter } from 'next/router';
import { Box, Divider } from '@mui/material';
import TopTabs from '@Components/TopTabs/TopTabs';
import DropdownButton from '@modules/Transactions/Components/DropdownButton';
import PurchasedTips from './Purchased/PurchasedTips';
import Subscriptions from './Subscriptions/Subscriptions';
import TipTransactions from './Transactions/TipTransactions';

const TipTransactionsHome = ({ type }) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(TIPTRANSACTIONS_ROUTE_TYPE[type]);
    const [raceType, setraceType] = useState('A');
    const [comments, setcomments] = useState(1);
    const [resultTime, setResultTime] = useState(7);
    const [subStatus, setsubStatus] = useState(99);
    const [transDate, settransDate] = useState(30);
    const [transType, settransType] = useState('A');

    useEffect(() => {
        setActiveTab(TIPTRANSACTIONS_ROUTE_TYPE[router.query?.type]);
    }, [router.query]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        router.push(TIPTRANSACTIONS_ROUTE_VALUE[newValue]);
    };

    const handleRaceTypeOnChange = (value) => {
        setraceType(value);
    };

    const handleCommentsOnChange = (value) => {
        setcomments(value);
    };

    const handleResultTimeOnChange = (value) => {
        setResultTime(value);
    };

    const handleSubOnChange = (value) => {
        setsubStatus(value);
    };

    const handleTransDateOnChange = (value) => {
        settransDate(value);
    };

    const handleTransTypeOnChange = (value) => {
        settransType(value);
    };

    const RaceDropdown = () => <DropdownButton options={All_RACING_CODES} onChange={handleRaceTypeOnChange} value={raceType} />;

    const ShowComments = () => <DropdownButton options={COMMENTS_CODES} onChange={handleCommentsOnChange} value={comments} />;

    const TimeDropdown = () => <DropdownButton options={RESULT_TIME} onChange={handleResultTimeOnChange} value={resultTime} />;

    const SubDropdown = () => <DropdownButton options={SUB_STATUS} onChange={handleSubOnChange} value={subStatus} />;

    const TransDateDropdown = () => <DropdownButton options={TRANS_DATE} onChange={handleTransDateOnChange} value={transDate} />;

    const TransTypeDropdown = () => <DropdownButton options={TRANS_TYPE} onChange={handleTransTypeOnChange} value={transType} />;

    const renderButtonRow = () => {
        switch (activeTab) {
            case TIPTRANSACTIONS_ROUTE_TYPE.purchased:
                return (
                    <div className="transactions-dropdown-button-wrapper">
                        <ShowComments />
                        <TimeDropdown />
                        <RaceDropdown />
                    </div>
                );
            case TIPTRANSACTIONS_ROUTE_TYPE.free:
                return (
                    <div className="transactions-dropdown-button-wrapper">
                        <RaceDropdown />
                    </div>
                );
            case TIPTRANSACTIONS_ROUTE_TYPE.subscriptions:
                return (
                    <div className="transactions-dropdown-button-wrapper">
                        <SubDropdown />
                    </div>
                );
            case TIPTRANSACTIONS_ROUTE_TYPE.transactions:
                return (
                    <div className="transactions-dropdown-button-wrapper">
                        <TransDateDropdown />
                        <TransTypeDropdown />
                    </div>
                );
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case TIPTRANSACTIONS_ROUTE_TYPE.purchased:
                return <PurchasedTips comments={comments} resultTime={resultTime} raceType={raceType} activeTab={activeTab} />;
            case TIPTRANSACTIONS_ROUTE_TYPE.free:
                return <PurchasedTips resultTime={0} raceType={raceType} activeTab={activeTab} isFree={true} />;
            case TIPTRANSACTIONS_ROUTE_TYPE.subscriptions:
                return <Subscriptions subStatus={subStatus} />;
            case TIPTRANSACTIONS_ROUTE_TYPE.transactions:
                return <TipTransactions transDate={transDate} transType={transType} activeTab={activeTab} />;
        }
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'text.active',
                }}
                p={1}
            >
                <TopTabs tabs={TIPTRANSACTIONS_TABS} handler={handleTabChange} active={activeTab} />
                <Divider sx={{ mt: 1, mx: 1 }} />
            </Box>

            {renderButtonRow()}
            {renderContent()}
        </React.Fragment>
    );
};

export default TipTransactionsHome;
