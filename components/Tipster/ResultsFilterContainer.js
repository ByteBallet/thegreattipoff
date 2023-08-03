import { UserContext } from '@Context/User/UserProvider';
import { All_CODES, RESULT_TIME_TIPSTER_PAGE, RESULT_TYPE, RESULT_TIME, TIPSTER_RESULT_TYPE, TIPSTER_TIP_TYPE } from '@lib/constants';
import CheckBoxDropdownButton from '@modules/Transactions/Components/CheckBoxDropdownButton';
import DropdownButton from '@modules/Transactions/Components/DropdownButton';
import React, { useContext, useEffect } from 'react';

const ResultsFilterContainer = ({ setFilter, setResultTime, setResultType, filter, resultTime, resultType, isUser, tipType, settipType }) => {
    const { user } = useContext(UserContext);

    const isLoggedIn = user?.userID ? true : false;

    const handleFilterOnChange = (value) => {
        setFilter(value);
    };
    const handleResultTimeOnChange = (value) => {
        setResultTime(value);
    };

    const handleResultTypeOnChange = (value) => {
        setResultType(value);
    };

    const handleTipTypeOnChange = (value) => {
        if (value?.length > 0) {
            settipType(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
        }
    };


    const FilterDropdown = () => (
        <DropdownButton disabled={!isLoggedIn} options={All_CODES} onChange={handleFilterOnChange} value={filter} />
    );

    const TimeDropdown = () => (
        <DropdownButton
            disabled={!isLoggedIn}
            options={isUser ? RESULT_TIME : RESULT_TIME_TIPSTER_PAGE}
            onChange={handleResultTimeOnChange}
            value={resultTime}
        />
    );

    const TipTypeDropdown = () => (
        <CheckBoxDropdownButton disabled={!isLoggedIn} options={TIPSTER_TIP_TYPE} onChange={handleTipTypeOnChange} value={tipType} />
    );

    const ResultTypeDropdown = () => (
        <DropdownButton disabled={!isLoggedIn} options={TIPSTER_RESULT_TYPE} onChange={handleResultTypeOnChange} value={resultType} />
    );

    useEffect(() => {
        if (!isLoggedIn) {
            if (filter !== 0) setFilter(0);
            if (resultTime !== 7) setResultTime(7);
            if (resultType !== 1) setResultType(1);
        }
    }, []);

    const renderButtonRow = () => {
        return (
            <div className="transactions-dropdown-button-wrapper">
                <FilterDropdown />
                <TimeDropdown />
                <TipTypeDropdown />
                <ResultTypeDropdown />
            </div>
        );
    };
    return <React.Fragment>{renderButtonRow()}</React.Fragment>;
};

export default ResultsFilterContainer;
