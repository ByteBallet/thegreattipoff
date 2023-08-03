// import { replace } from 'lodash';

export const getDateTimeValue = (value) => {
    const newValue = value.replace('/Date(', '').replace(')/', '').split('+');
    const utcTime = Number(newValue[0]);
    const TimeZone = Number(newValue[1]);
    const d = new Date(utcTime);
    return utcTime;
};

export const getGroupDataSet = (dataArray) => {
    const groupByDate = dataArray.reduce((group, item) => {
        const { date } = item;
        group[date] = group[date] ?? [];
        group[date].push(item);
        return group;
    }, {});
    return Object.values(groupByDate);
};

export {
    unstable_detectScrollType as detectScrollType,
    unstable_getNormalizedScrollLeft as getNormalizedScrollLeft,
} from '@mui/utils';

export const getIconName = (iconName) => {
    switch (iconName) {
        case 'HORS': {
            return '/images/svg/horse-racing.svg';
        }
        case 'HARN': {
            return '/images/svg/harness-racing.svg';
        }
        case 'GREY': {
            return '/images/svg/greys-racing.svg';
        }
        default:
            return '/images/svg/icon-HORSES.svg';
    }
};

export const getIconNameForMulti = (iconName) => {
    switch (iconName) {
        case 'Racing': {
            return '/images/svg/horse-racing.svg';
        }
        case 'Sports': {
            return '/images/icon/sports.png';
        }

        default:
            return '/images/svg/icon-HORSES.svg';
    }
};

export const getNumberWithDecimalplace = (value) => {
    return Number.isInteger(value) ? value + '.00' : value;
};

export const getFormatDollerValue = (value) => {
    if (value < 0) {
        return `-$${getNumberWithDecimalplace(value * -1)}`
    }
    return `$${getNumberWithDecimalplace(value)}`
};
