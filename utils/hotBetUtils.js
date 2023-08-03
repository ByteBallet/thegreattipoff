import { FREQ_WIN_TIL_TYPE, HOT_BET_ICON_TYPE, LOCAL_STORAGE_KEY } from '@lib/constants';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

export const getIconPath = (type, colorId) => {
    switch (type) {
        case HOT_BET_ICON_TYPE.bagCash:
            return `${process.env.cdn}/images/hotbet/bag%20of%20cash-${colorId}.png`;
        case HOT_BET_ICON_TYPE.flames:
            return `${process.env.cdn}/images/hotbet/flames-${colorId}.png`;
        case HOT_BET_ICON_TYPE.target:
            return `${process.env.cdn}/images/hotbet/target%20icon-${colorId}.png`;

        default:
            return ``;
    }
};

export const getSummaryTabTitles = (data) => {
    switch (data?.STATTYPE) {
        case 'TIP':
            return {
                totalWins: `${data?.TOTALWINS} winners`,
                totalPeriods: ` from last ${data?.TOTALPERIODS} tips`,
                strikeRate: `${data?.STATVAL?.toFixed(0)}%`,
                strikeRateText: ` strike rate`,
            };
        case 'DAY':
            return {
                totalWins: `${data?.TOTALWINS} winning days`,
                totalPeriods: ` from ${data?.TOTALPERIODS}`,
                strikeRate: `${data?.STATVAL?.toFixed(0)}%`,
                strikeRateText: ` strike rate`,
            };
        case 'WEEK':
            let weekStrikeRate = '';
            if (data?.PERIOD === '12') {
                weekStrikeRate = 360;
            } else if (data?.PERIOD === '6') {
                weekStrikeRate = 180;
            } else {
                weekStrikeRate = data?.PERIOD;
            }
            return {
                totalWins: `${data?.TOTALWINS} winning weeks`,
                totalPeriods: ` from ${data?.TOTALPERIODS}`,
                strikeRate: `${data?.STATVAL?.toFixed(0)}%`,
                strikeRateText: ` strike rate`,
            };
        case 'MONTH':
            let monthStrikeRate = '';
            if (data?.PERIOD === '12') {
                monthStrikeRate = 360;
            } else if (data?.PERIOD === '6') {
                monthStrikeRate = 180;
            } else {
                monthStrikeRate = data?.PERIOD;
            }
            return {
                totalWins: `${data?.TOTALWINS} winning months`,
                totalPeriods: ` from ${data?.TOTALPERIODS}`,
                strikeRate: `${data?.STATVAL?.toFixed(0)}%`,
                strikeRateText: ` strike rate`,
            };
        default:
            return {
                totalPeriods: ``,
                totalWins: ``,
                strikeRate: ``,
                strikeRateText: ``,
            };
    }
};

export const getHBDayMenuItems = (dataArray) => {
    if (dataArray.length == 2) {
        return [dataArray[1].daylabel];
    }
    const newTabs =
        dataArray?.length > 0 &&
        dataArray.map((tab) => {
            return tab.daylabel;
        });
    return newTabs || [];
};

export const getHBDayMenuDates = (dataArray) => {
    const newTabs =
        dataArray?.length > 0 &&
        dataArray.map((tab) => {
            return tab.dayval;
        });

    return newTabs || [];
};

export const getToDate = (dateGap) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + dateGap);
    return moment(tomorrow).format('YYYY-MM-DD');
};

export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export const getProfileDetails = (data) => {
    const detailsDataArray = [
        { id: 1, label: 'State', data: data?.state },
        { id: 2, label: 'Age', data: data?.age },
        {
            id: 3,
            label: 'Tips validated since',
            data: moment(data?.validated).format('MMM Do YYYY'),
        },
        {
            id: 4,
            label: 'Number of tips published',
            data: (
                <NumberFormat
                    thousandSeparator={true}
                    value={data?.totaltips}
                    decimalSeparator="."
                    fixedDecimalScale={true}
                    displayType="text"
                />
            ),
        },
        {
            id: 5,
            label: 'Avarage winner odds',
            data: (
                <NumberFormat
                    thousandSeparator={true}
                    value={data?.avgwin}
                    decimalSeparator="."
                    decimalScale={2}
                    fixedDecimalScale={true}
                    displayType="text"
                    prefix="$"
                />
            ),
        },
        {
            id: 6,
            label: 'Highest winner odds',
            data: (
                <NumberFormat
                    thousandSeparator={true}
                    value={data?.maxwin}
                    decimalSeparator="."
                    decimalScale={2}
                    fixedDecimalScale={true}
                    displayType="text"
                    prefix="$"
                />
            ),
        },
    ];
    return detailsDataArray;
};

export const pieChartColors = {
    0: '#05BBD2',
    1: '#2070C4',
    2: '#EB80F1',
    3: '#F5C842',
    4: '#37D400',
    5: '#EB8045',
    6: '#F5C899',
    7: '#37D499',
};

export const getPieChartData = (data, totalwincount) => {
    const newArray = [];
    if (data?.length > 0) {
        data.map((item, index) => {
            newArray.push({
                id: index,
                value: (item?.WINCOUNT / totalwincount) * 100,
                color: pieChartColors[index],
                details: item?.WINRANGE,
            });
        });
    }
    return newArray;
};

export const getStakDetailsDataSet = (data) => {
    const dataSet = [
        {
            id: 1,
            label: 'Longest odds',
            data: (
                <NumberFormat
                    thousandSeparator={true}
                    value={data?.MAXWIN}
                    decimalSeparator="."
                    decimalScale={2}
                    fixedDecimalScale={true}
                    displayType="text"
                    prefix="$"
                />
            ),
        },
        // {
        //     id: 2,
        //     label: 'Shortest odds',
        //     data: (
        //         <NumberFormat
        //             thousandSeparator={true}
        //             value={12}
        //             decimalSeparator="."
        //             decimalScale={2}
        //             fixedDecimalScale={true}
        //             displayType="text"
        //             prefix="$"
        //         />
        //     ),
        // },
        {
            id: 3,
            label: 'Average odds',
            data: (
                <NumberFormat
                    thousandSeparator={true}
                    value={data?.AVGWIN}
                    decimalSeparator="."
                    decimalScale={2}
                    fixedDecimalScale={true}
                    displayType="text"
                    prefix="$"
                />
            ),
        },
        { id: 4, label: 'Strike rate', data: `${data?.WINSTRIKERATE?.toFixed(0)} %` },
    ];
    return dataSet;
};

export const getFormattedArray = (valueArray) => {
    const newData = [];
    let isStart = true;
    let totalwinners = 0;
    // Sum of  WINTIPS as totalwinners
    let totalplacingings = 0;
    //  Sum of  PLACETIPS as totalplacingings
    let grandtotaltips = 0;
    //  Sum of TOTALTIPS as grandtotaltips
    let thistotaltips = 0;
    let thiswinners = 0;
    let thisplacing = 0;
    let count = 0;
    let countRows = 0;
    valueArray?.length > 0 &&
        valueArray.map((item, index) => {
            countRows = countRows + 1;
            if (item?.WINPROFITDAY === 1) {
                totalwinners = totalwinners + item?.WINTIPS;
                totalplacingings = totalplacingings + item?.PLACETIPS;
                grandtotaltips = grandtotaltips + item?.TOTALTIPS;
                thistotaltips = item?.TOTALTIPS;
                thiswinners = item?.WINTIPS;
                thisplacing = item?.PLACETIPS;
                count = count + 1;
                isStart &&
                    newData.push({
                        id: index * 10,
                        type: FREQ_WIN_TIL_TYPE.START,
                    });
                newData.push({
                    id: (index + 0.1) * 10,
                    type: FREQ_WIN_TIL_TYPE.WIN,
                    count,
                    ...item,
                    countRows: valueArray.length + 1 - countRows,
                });
                isStart = false;
            }
            if (item?.WINPROFITDAY === 0) {
                thistotaltips = item?.TOTALTIPS;
                thiswinners = item?.WINTIPS;
                thisplacing = item?.PLACETIPS;
                if (newData?.length > 0 && newData[newData?.length - 1]?.type === FREQ_WIN_TIL_TYPE.WIN) {
                    newData.push({
                        id: (index - 0.6) * 10,
                        type: FREQ_WIN_TIL_TYPE.END,
                    });
                }
                newData.push({
                    id: index * 10,
                    type: FREQ_WIN_TIL_TYPE.LOST,
                    totalwinners,
                    totalplacingings,
                    grandtotaltips,
                    thistotaltips,
                    thiswinners,
                    thisplacing,
                    countRows: valueArray.length - countRows,
                });
                isStart = true;
                totalwinners = 0;
                totalplacingings = 0;
                grandtotaltips = 0;
                thistotaltips = 0;
                thiswinners = 0;
                thisplacing = 0;
                count = 0;
            }
        });
    if (newData?.length > 0 && newData[newData?.length - 1]?.type === FREQ_WIN_TIL_TYPE.WIN) {
        newData.push({
            id: newData[newData?.length - 1]?.id + 1,
            type: FREQ_WIN_TIL_TYPE.END,
        });
    }
    return newData;
};

export const getQuaryData = (dataList) => {
    const locations = [];
    const packages = [];
    dataList?.length > 0 &&
        dataList.map((item) => {
            item?.LOCID && locations.push(item?.LOCID);
            item?.PACKID && packages.push(item?.PACKID);
        });
    if (packages?.length > 0 && locations?.length > 0) {
        return { packages, locations };
    } else {
        return null;
    }
};

export const updateStake = (dataSet, stateUpdate, oddSrange, value) => {
    const selectedTextBox = dataSet?.length > 0 && dataSet.filter((item) => item.ODDSRANGE === oddSrange);

    const newArry = dataSet.map((item) => {
        if (item.ODDSRANGE !== oddSrange) {
            return item;
        } else {
            return {
                ID: selectedTextBox[0]?.ID,
                ODDSRANGE: selectedTextBox[0]?.ODDSRANGE,
                NBETS: selectedTextBox[0]?.NBETS,
                STAKE: value,
                HIGHVAL: item.HIGHVAL,
                LOWVAL: item.LOWVAL,
                SORTORDER: item.SORTORDER,
            };
        }
    });

    stateUpdate(newArry);
};

export const getTextBoxValue = (stake, id, bets) => {
    const value = stake.filter((i) => i?.ODDSRANGE === id)[0]?.STAKE;
    return value > 0 && bets > 0 ? value : '';
};

export const getNumberValue = (stringValue) => {
    return Number(
        String(stringValue)
            .replace('<', '')
            .replace('>', '')
            .replace('under', '')
            .replace('over', '')
            .replace('$', '')
            .replace('+', '')
            .trim() || 0
    );
};

export const setHBStructure = (
    locationDetails,
    stakeDetails,
    hotBetDetails,
    betSlipCount,
    racetype,
    packids,
    isSingle,
    totalStake,
    potentialReturnStake,
    eventid = [1, 2],
    category = ''
) => {
    try {
        const betID = moment().valueOf();
        const details =
            stakeDetails?.length > 0
                ? stakeDetails.map((stake) => {
                    return {
                        oddsLabel: stake?.ODDSRANGE,
                        bets: stake?.NBETS,
                        stake: stake?.STAKE,
                        lowval: stake?.LOWVAL,
                        highval: stake?.HIGHVAL,
                    };
                })
                : [];
        const objectId = hotBetDetails.USERID;
        const groupByKey = (array, key) => {
            return array.reduce((hash, obj) => {
                if (obj[key] === undefined) return hash;
                return Object.assign(hash, {
                    [obj[key]]: (hash[obj[key]] || []).concat(`R${obj.RACENUM}`),
                });
            }, {});
        };
        const locations = groupByKey(locationDetails, 'RACEMEET');
        const locid = locationDetails?.length ? locationDetails.map((location) => location?.LOCID) : [];

        const newHotBetItem = {
            [objectId]: {
                betID: parseInt(betID),
                userid: hotBetDetails?.USERID,
                avatar: hotBetDetails?.AVATARPATH,
                alias: hotBetDetails?.ALIAS,
                nbets: betSlipCount,
                packid: packids,
                eventId: eventid, // pending
                rtype: racetype,
                pr: 'TBD',
                stake: totalStake,
                isBonusBet: false,
                isSingle: isSingle,
                locations,
                details: details,
                locid: locid?.length > 0 ? [...new Set(locid)] : [],
                bettypeproduct: '',
                category,
            },
        };
        return newHotBetItem;
    } catch (error) {
        console.log('stakeDetails error', error);
    }
};

export const saveHotBetObjectInLocal = (
    locationDetails,
    stakeDetails,
    hotBetDetails,
    betSlipCount,
    racetype,
    packids,
    isSingle = true,
    totalStake = '',
    potentialReturnStake = ''
) => {
    try {
        const newHotBetItem = setHBStructure(
            locationDetails,
            stakeDetails,
            hotBetDetails,
            betSlipCount,
            racetype,
            packids,
            isSingle,
            totalStake,
            potentialReturnStake
        );

        const existingHotBet = localStorage.getItem(LOCAL_STORAGE_KEY.HOT_BET_DATA)
            ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.HOT_BET_DATA))
            : [];

        existingHotBet.push(newHotBetItem);

        localStorage.setItem(LOCAL_STORAGE_KEY.HOT_BET_DATA, JSON.stringify(existingHotBet));
    } catch (error) {
        console.log('stakeDetails error', error);
    }
};

export const getCategoryMenuDesc = (categoryMenu, selectedCategory) => {
    if (categoryMenu?.length > 0) {
        const newItem = categoryMenu.filter((item) => item?.cat === selectedCategory);
        const catDesc = newItem?.length > 0 ? newItem[0]?.catdesc : '';
        return catDesc;
    } else {
        return '';
    }
};

export const getDynamicHeight = (countOfRecord) => {
    if (countOfRecord >= 8) {
        return {
            marginTop: '95%',
            height: 500,
        };
    } else if (countOfRecord >= 4) {
        return {
            marginTop: '100%',
            height: 460,
        };
    } else if (countOfRecord >= 2) {
        return {
            marginTop: '135%',
            height: 320,
        };
    } else if (countOfRecord === 1) {
        return {
            marginTop: '160%',
            height: 240,
        };
    }
};
