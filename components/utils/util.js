import { GET_SEARCH_TAG } from '@lib/constants';
import { getGroupDataSet } from '@utils/transactions.util';
import moment from 'moment';
import { getTrackname } from './RacingUtil';

export const IsValidEmail = (email) => {
    var filter =
        /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return filter.test(email);
};
export const validateEmail = (email) => {
    var emailReg = /^$|^.*@.*\..*$/;
    return emailReg.test(email);
};
export const validatemobile = (mobile) => {
    var mobileReg = /^[0-9]*$/;
    return mobileReg.test(mobile);
};
export const IsValidInteger = (number) => {
    var filter = /^\d+$/;
    return filter.test(number);
};
export const groupByKey = (data, key) => {
    return data.reduce((d, x) => {
        if (key == 'CATEGORY') {
            if (x[key] == 'AU' || x[key] == 'NZ') {
                d['AU'] = [...(d['AU'] || []), x];
            } else {
                d['INT'] = [...(d['INT'] || []), x];
            }
        } else {
            d[x[key]] = [...(d[x[key]] || []), x];
        }
        return d;
    }, {});
};

export const handleRDNumberSliderScroll = (
    listWrapperWidth,
    numListItemWidth,
    listRefCurrent,
    racenumbersArray,
    raceid
) => {
    const horizontalScrollableGap = 5;
    const allItemWith = numListItemWidth * racenumbersArray.length;
    const currentGap = allItemWith - listWrapperWidth;

    if (currentGap >= horizontalScrollableGap) {
        let selectedItemPlace = 0;

        racenumbersArray.map((item, index) => {
            if (item.raceid === raceid) {
                selectedItemPlace = index + 1;
            }
        });
        const itemsPerScreen = Math.floor(
            listWrapperWidth / (numListItemWidth - 2)
        );
        const middleNo = Math.floor(itemsPerScreen / 2) + 1;
        listRefCurrent.scrollLeft +=
            numListItemWidth * (selectedItemPlace - middleNo);
    }
};

export const handleDateSliderChangeProgrammatically = (
    date,
    setState,
    state
) => {
    if (date) {
        const today = new Date();
        const queryParamDate = new Date(date);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const nextDayOne = new Date(today);
        nextDayOne.setDate(nextDayOne.getDate() + 2);

        const nextDayTwo = new Date(today);
        nextDayTwo.setDate(nextDayTwo.getDate() + 3);

        if (queryParamDate.getDate() === yesterday.getDate()) {
            setState({
                ...state,
                activeTab: 0,
            });
        } else if (queryParamDate.getDate() === today.getDate()) {
            setState({
                ...state,
                activeTab: 2,
            });
        } else if (queryParamDate.getDate() === tomorrow.getDate()) {
            setState({
                ...state,
                activeTab: 3,
            });
        } else if (queryParamDate.getDate() === nextDayOne.getDate()) {
            setState({
                ...state,
                activeTab: 4,
            });
        } else if (queryParamDate.getDate() === nextDayTwo.getDate()) {
            setState({
                ...state,
                activeTab: 5,
            });
        }
    }
};

export const roundToTwo = (num) => {
    return +(Math.round(num + 'e+2') + 'e-2');
};

export const scrollToTop = (ele) => {
    if (document.getElementById(ele)) {
        document.getElementById(ele).scrollIntoView();
    }
};

const getMobileDetect = (userAgent) => {
    const isAndroid = Boolean(userAgent.match(/Android/i));
    const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    const isOpera = Boolean(userAgent.match(/Opera Mini/i));
    const isWindows = Boolean(userAgent.match(/IEMobile/i));
    const isSSR = Boolean(userAgent.match(/SSR/i));
    const isMobile = Boolean(isAndroid || isIos || isOpera || isWindows);
    const isDesktop = Boolean(!isMobile && !isSSR);
    let device = '';
    if (isDesktop) {
        device = 'desktop';
    } else if (isMobile) {
        device = isIos ? 'iOS' : 'android';
    } else {
        device = 'android';
    }
    return device;
};

export const MobileType = () => {
    const userAgent =
        typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    return getMobileDetect(userAgent);
};

export const useMobileDetect = () => {
    const userAgent =
        typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    return getMobileDetect(userAgent);
};

export const getTopOffset = () => {
    let hbWidget = process?.env?.hotbetWidget?.findIndex((item) => item == process.env.APP_BRAND) > -1
    let topOffset = 62;
    const storage = globalThis?.localStorage;
    let appBanner = storage
        ? storage.getItem('appBanner')
            ? JSON.parse(storage.getItem('appBanner'))
            : null
        : null;
    let showAppBanner = true;
    if (appBanner) {
        let datediff = moment(moment().format('YYYY-MM-DD')).diff(
            moment(appBanner.createdAt),
            'days'
        );
        if (appBanner.status == 0) {
            showAppBanner = datediff > 30 ? true : false;
        }
    }
    let Ypos =
        process.env.client.showBanner == 'true' && showAppBanner && !hbWidget
            ? topOffset
            : 0;
    return Ypos;
};

export const kFormatter = (num) => {
    return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
        : Math.sign(num) * Math.abs(num);
};

export const nFormatter = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + ' G';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\.0$/, '') + ' M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(2).replace(/\.0$/, '') + ' K';
    }
    return num;
}

export const getNewsParams = (raceType, isTrack = false, pageTitle = '') => {
    let eventtype = 'Horse Racing';
    let category = 'Punters and Tipsters';
    let tagname = 'Horse Racing Tips';
    let subcategory = '';
    if (raceType == 'G') {
        eventtype = 'Greyhound Racing';
        category = 'Greyhound';
        tagname = 'Greyhound Racing';
        subcategory = 'Tips';
    } else if (raceType == 'H') {
        eventtype = 'Harness Racing';
        category = 'Harness';
        tagname = 'Harness Racing';
        subcategory = 'Tips';
    }
    if (isTrack) {
        category = "tips-and-form-analysis"
        subcategory = "tips"
        tagname = getTrackname(pageTitle)?.replace(/-/g, ' ')
    }
    return { eventtype, category, tagname, subcategory };
};

export const getTotalbets = (tips) => {
    let totalbets = 0;
    Object.keys(tips).map((key, idx) => {
        if (key == 'hotbet' && tips[key].length > 0) {
            totalbets =
                totalbets +
                tips[key]
                    .map((tip) => Object.values(tip)[0])
                    .reduce((sum, { nbets }) => sum + +nbets, 0);
        } else if (key != 'multi') {
            totalbets = totalbets + (tips[key] ? tips[key].length : 0);
        }
    });
    return totalbets;
};

export function getTextColor(hexcolor) {
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
    }
    // If a three-character hexcode, make six-character
    if (hexcolor.length === 3) {
        hexcolor = hexcolor
            .split('')
            .map(function (hex) {
                return hex + hex;
            })
            .join('');
    }
    // Convert to RGB value
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    // Get YIQ ratio
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    // Check contrast
    return yiq >= 128 ? '#000' : '#fff';
}

export const validateStakeSettings = (low, high) => {
    let msg = '';
    let err = false;
    if (low == 0) {
        msg = 'Enter Lowest Amount';
        err = true;
    } else if (high == 0) {
        msg = 'Enter Highest Amount';
        err = true;
    } else if (low >= high && low !== 0 && high !== 0) {
        msg = `Highest stake amount must be greater than Lowest stake amount`;
        err = true;
    } else if (high > 1000 || low > 1000) {
        msg = 'Maximum stake amount is $1000';
        err = true;
    }
    return { err: err, msg: msg };
};

export const calculateStakeSettings = (low, high) => {
    let val = {
        Lowest: '',
        Lower: '',
        Standard: '',
        Higher: '',
        Highest: '',
    };
    let standard = Math.round((low + high) / 2);
    let lower = Math.round((low + standard) / 2);
    let higher = Math.round((high + standard) / 2);
    val['Lowest'] = low;
    val['Lower'] = lower;
    val['Standard'] = standard;
    val['Higher'] = higher;
    val['Highest'] = high;
    return val;
};
export const getNewsTitle = (title) => {
    let punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    let news_title = title.replace(punc_regex, '');
    news_title = news_title.replace(/ /g, '-');
    return news_title?.toLowerCase();
};

export const getTipsterAlias = (title) => {
    let alias = title
    if (title) {
        let punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
        alias = title.replace(punc_regex, '');
        alias = alias.replace(/ /g, '_');
    }
    return alias?.toLowerCase();
};

export const groupDataByParam = (dataSet, param) => {
    const newData =
        dataSet?.length > 0 &&
        dataSet.map((item) => {
            const formatedDate = moment(item[param]).format('DD MMM YYYY');
            return {
                ...item,
                date: formatedDate,
            };
        });
    const groupDataSet = getGroupDataSet(newData);
    return groupDataSet;
};

export const isHotBetWidget = () => {
    let hb = process?.env?.hotbetWidget?.findIndex((item) => item == process.env.APP_BRAND) > -1
    return hb
}

export const isClientGTO = () => {
    let chk = process.env.APP_BRAND == 'gto';
    return chk
}

export const getSearchId = (brand) => {
    return GET_SEARCH_TAG[brand]
}

export const getParentOrigin = () => {
    const locationAreDisctint = (window.location !== window.parent.location);
    const parentOrigin = ((locationAreDisctint ? document.referrer : document.location) || "").toString();

    if (parentOrigin) {
        return new URL(parentOrigin).origin;
    }

    const currentLocation = document.location;

    if (currentLocation.ancestorOrigins && currentLocation.ancestorOrigins.length) {
        return currentLocation.ancestorOrigins[0];
    }

    return "";
}

export const getStakeOptions = (stakeSettings, label = true) => {
    let obj = {}
    stakeSettings?.map((item) => {
        if (label) {
            obj[item?.LABEL + " (" + item?.STAKEMAX + ")"] = item?.STAKEMAX
        } else {
            obj[item?.LABEL] = item?.STAKEMAX
        }
    })
    return obj
}


export const getMonth = (startdate) => {
    const date = new Date(startdate);
    const month = date.toLocaleString('default', { month: 'long' });
    return month || ''
}

export const getYear = (startdate) => {
    const date = new Date(startdate);
    const year = date.getFullYear();
    return year || ''
}

export const getTagLink = (label, author) => {
    label = label?.toLowerCase()
    switch (label) {
        case 'horse racing tips': {
            return '/horse-racing-tips';
        }
        case 'free horse racing tips': {
            return '/horse-racing-tips?media=Free-Tips';
        }
        case 'harness racing tips': {
            return '/harness-racing-tips';
        }
        case 'greyhound racing tips': {
            return '/greyhound-racing-tips';
        }
        case 'horse racing results': {
            return '/horse-racing-results';
        }
        case 'harness racing results': {
            return '/harness-racing-results';
        }
        case 'greyhound racing results': {
            return '/greyhound-racing-results';
        }
        case 'davidgately': {
            return '/tipster/davidgately';
        }
        case 'markhunter': {
            return '/tipster/markhunter';
        }
        case 'mick gannon': {
            return '/tipster/mick_gannon';
        }
        case 'brad davidson': {
            return '/tipster/brad_davidson';
        }
        case 'nic ashman': {
            return '/tipster/nic_ashman';
        }
        case 'rickmorris': {
            return '/tipster/rickmorris';
        }
        case 'luke hovhanesian': {
            return '/tipster/luke_hovhanesian';
        }
        case 'cody lane': {
            return '/tipster/cody_lane';
        }
        default: {
            return '';
        }
    }
}
