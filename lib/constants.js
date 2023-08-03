import horses from '@public/images/svg/horse-racing.svg';
import alert from '@public/images/svg/alerts-icon.svg';
import clock from '@public/images/svg/clock.svg';
import hotbet from '@public/images/svg/hotbet.svg';
import form from '@public/images/svg/form.svg';
import giftBox from '@public/images/svg/gift-box-with-a-ribbon-svgrepo-com.svg';
import blog from '@public/images/svg/blog.svg';
import football from '@public/images/svg/sports-icon.svg';
import benefits from '@public/images/svg/benefits-rewards-icon.svg';
import deposit from '@public/images/svg/deposit-icon.svg';
import withdraw from '@public/images/svg/withdraw-icon.svg';
import account from '@public/images/svg/my-account-icon.svg';
import cog from '@public/images/svg/cog.svg';
import banking from '@public/images/svg/banking.svg';
import addPromo from '@public/images/svg/icon-EDIT.svg';
import home from '@public/images/svg/home-icon.svg';
import racing from '@public/images/svg/horse-racing1.svg';
import sports from '@public/images/svg/sports-icon1.svg';
import harness from '@public/images/svg/harness-racing.svg';
import greys from '@public/images/svg/greys-racing.svg';
import help from '@public/images/svg/help.svg';
import book from '@public/images/svg/book-solid.svg';

import television from '@public/images/svg/television-solid.svg';
import shoppingCart from '@public/images/svg/cart-shopping.svg';

export const MAIN_CATEGORIES = {
    racings: 'Racing',
    sports: 'Sports',
    promo: 'Promotions',
};

export const SPORTS_CATEGORIES = {
    all: 'All',
    Soccer: 'Soccer',
    Basketball: 'Basketball',
    Tennis: 'Tennis',
    Swimming: 'Swimming',
    Volleyball: 'Volleyball',
};

export const RACING_CATEGORIES = {
    all: 'All',
    horses: 'Horses',
    hounds: 'Hounds',
    harness: 'Harness',
    hong: 'Hong',
    nine: 'Nine',
};

export const RACING_CAROUSEL = {
    all: [
        {
            value: 'R',
            label: 'Horses',
            icon: 'HORSES',
            url: `/racing/horses`,
        },
        {
            value: 'G',
            label: 'Greyhounds',
            icon: 'GREYS',
            url: '/racing/greyhound',
        },
        {
            value: 'H',
            label: 'Harness',
            icon: 'HARNESS',
            url: '/racing/harness',
        },
        // {
        //     value: 'S',
        //     label: 'Beat Elite',
        //     icon: 'BrandmarkBlack',
        //     url: '/',
        // },
        {
            value: 'HO',
            label: 'HOT Bets',
            icon: 'hotbet-blue',
            url: '/hotbets',
        },
        {
            value: 'FE',
            label: 'Futures & Extras',
            icon: 'HORSES',
            url: '/futures',
        },
    ],
    limited: [
        {
            value: 'R',
            label: 'Horses',
            icon: 'HORSES',
            url: `/racing/horses`,
        },
        {
            value: 'G',
            label: 'Greyhounds',
            icon: 'GREYS',
            url: '/racing/greyhound',
        },
        {
            value: 'H',
            label: 'Harness',
            icon: 'HARNESS',
            url: '/racing/harness',
        },
        // {
        //     value: 'S',
        //     label: 'Beat Elite',
        //     icon: 'BrandmarkBlack',
        //     url: '/',
        // },
        {
            value: 'FE',
            label: 'Futures & Extras',
            icon: 'HORSES',
            url: '/futures',
        },
    ],
};

export const USER_GROUP = {
    public: 'public',
    accountHolder: 'accountHolder',
    allaccount: 'allaccount',
};

export const PROMOTIONS = {
    Placement: [
        { id: 0, value: 'home', label: 'Home' },
        // { id: 1, value: 'racingHome', label: 'Racing home' },
    ],

    UserGroup: [
        {
            id: 0,
            value: 'accountHolder',
            label: 'Account Holders only',
            message: '',
            info: 'Account holders who are logged in AND <b>are eligible for promos</b>',
        },
        {
            id: 1,
            value: 'public',
            label: 'Public only',
            message: 'requires approval to go live',
            info: 'Users who are logged out i.e. <b>anyone who visits EliteBet</b>',
        },
        {
            id: 2,
            value: 'allaccount',
            label: 'All Account Holders & Public',
            message: 'requires approval to go live',
            info: 'all Account Holders regardless of eligibility to promos AND anyone who is logged out',
        },
    ],
};

export const BUTTON_NAME = [
    { id: 'None', name: 'None (Default selected)' },
    { id: 'Bet Now', name: 'Bet Now' },
    { id: 'Deposit Now', name: 'Deposit Now' },
    { id: 'Other', name: 'Other' },
];

export const SAVE_PROMPTION_RESPONSE = {
    FAIL: 'fail',
    SUCCESS: 'success',
};

export const PROMOTION_MENU_LEVEL_ONE = {
    PRE_START: 'Pre-Start',
    LIVE: 'Live',
    INACTIVE: 'Inactive',
};

export const MENU_TYPE = {
    Scheduled: 'Scheduled',
    AwaitingApproval: 'Awaiting Approval',
    public: 'public',
    AccountHolders: 'accountHolder',
    Expired: 'Expired',
    Archived: 'Archived',
    Stopped: 'Stopped',
};

export const PROMOTIONS_STATUS = {
    ARCHIVE: 'archive',
    DELETE: 'delete',
    DEACTIVATE: 'deactivate',
    REMOVE: 'remove',
};

export const imageUrlPrefix = 'https://cdnstage.thegreattipoff.com/eb/images/promotions';

export const POPUP_BUTTON = {
    ARCHIVE: 'ARCHIVE',
    DEACTIVATE: 'DEACTIVATE',
    REMOVE: 'REMOVE',
    RE_NOTIFY: 'RE_NOTIFY',
};

export const API_STATUS = {
    fail: 'fail',
    success: 'success',
};

export const APPROVE_STATUS = {
    approved: 'approved',
    rejected: 'rejected',
};

export const REVIEW_ITEMS = {
    terms: 'terms',
    mobile: 'mobilead',
    desktop: 'desktopad',
    splash: 'splashad',
};

const BettingWithUser = {
    id: 1,
    name: 'Betting',
    list: [
        {
            id: 1,
            name: 'Next up Racing',
            icon: { svg: horses, viewBox: '0 0 466.36 510.95' },
            batch: '',
            link: '/nextup/racing',
        },
        {
            id: 2,
            name: 'Next up Sports',
            icon: { svg: football, viewBox: '0 0 100.67 100.65' },
            batch: '',
            link: '/nextup/sports',
        },
        {
            id: 3,
            name: 'HOT Bet',
            icon: { svg: hotbet, viewBox: '0 0 44.593 55.624' },
            batch: 'New',
            link: '/hotbets',
        },
        {
            id: 4,
            name: 'Promotions',
            icon: { svg: giftBox, viewBox: '0 0 28.092 28.092' },
            batch: '',
            link: '/promotions',
        },
        {
            id: 5,
            name: 'Blog',
            icon: { svg: blog, viewBox: '0 0 512 512' },
            batch: '',
            link: '/blog',
        },
    ],
    limited: [
        {
            id: 1,
            name: 'Next up Racing',
            icon: { svg: horses, viewBox: '0 0 466.36 510.95' },
            batch: '',
            link: '/nextup/racing',
        },
        {
            id: 2,
            name: 'Next up Sports',
            icon: { svg: football, viewBox: '0 0 100.67 100.65' },
            batch: '',
            link: '/nextup/sports',
        },
        {
            id: 3,
            name: 'Promotions',
            icon: { svg: giftBox, viewBox: '0 0 28.092 28.092' },
            batch: '',
            link: '/promotions',
        },
    ],
};

const Transactions = {
    id: 2,
    name: 'My Account',
    list: [
        {
            id: 1,
            name: 'Deposit',
            icon: { svg: deposit, viewBox: '0 0 1190.17 726.35' },
            batch: '',
            link: '/deposit',
        },
        {
            id: 2,
            name: 'Withdraw',
            icon: { svg: withdraw, viewBox: '0 0 618.35 693' },
            batch: '',
            link: '/withdraw',
        },
        {
            id: 3,
            name: 'Pending Bets',
            icon: { svg: clock, viewBox: '0 0 16 16' },
            batch: '',
            link: `/transactions/pendingBets`,
        },
        {
            id: 4,
            name: 'Resulted Bets',
            icon: { svg: form, viewBox: '0 0 54 43' },
            batch: '',
            link: '/transactions/resultedBets',
        },

        {
            id: 5,
            name: 'Benefits & Rewards',
            icon: { svg: benefits, viewBox: '0 0 1972.48 1971.93' },
            batch: '',
            link: '/myaccount/benefits',
        },
        {
            id: 6,
            name: 'Blackbook & Follows',
            icon: { svg: alert, viewBox: '0 0 212 212' },
            batch: '',
            link: '/myaccount/managealerts',
        },
        {
            id: 7,
            name: 'Banking',
            icon: { svg: banking, viewBox: '0 0 512 512' },
            batch: '',
            link: '/transactions/banking',
        },
    ],
};

const Account = {
    id: 3,
    name: 'Account Details',
    list: [
        {
            id: 1,
            name: 'My Account',
            icon: { svg: account, viewBox: '0 0 1816.76 1981.92' },
            batch: '',
            link: '/myaccount',
        },
        // {
        //     id: 2,
        //     name: 'Alerts',
        //     icon: { svg: alert, viewBox: '0 0 212 212' },
        //     batch: '',
        //     link: '/alerts',
        // },
    ],
};

const AdminAccount = {
    id: 3,
    name: 'Account',
    list: [
        {
            id: 1,
            name: 'My Account',
            icon: { svg: account, viewBox: '0 0 1816.76 1981.92' },
            batch: '',
            link: '/myaccount',
        },
        {
            id: 1,
            name: 'Promotions Management',
            icon: { svg: account, viewBox: '0 0 1816.76 1981.92' },
            batch: '',
            link: '/myaccount/promotion',
        },
        // {
        //     id: 2,
        //     name: 'Alerts',
        //     icon: { svg: alert, viewBox: '0 0 212 212' },
        //     batch: '',
        //     link: '/alerts',
        // },
    ],
};

const Help = {
    id: 4,
    name: 'Help',
    list: [
        { id: 1, name: 'Contact Us', link: '/help/contactus' },
        {
            id: 2,
            name: 'Responsible Gambling Policy',
            link: '/help/responsible-gambling',
        },
        { id: 3, name: 'About Us', link: '/help/about-us' },
        { id: 4, name: 'Terms & Conditions', link: '/help/terms' },
        { id: 5, name: 'Wagering Rules', link: '/help/rules' },
        { id: 6, name: 'FAQ', link: '/help/faq' },
        { id: 7, name: 'Privacy Policy', link: '/help/privacy' },
    ],
};

const BettingWithoutUser = {
    id: 1,
    name: 'Betting',
    list: [
        {
            id: 1,
            name: 'Next up Racing',
            icon: { svg: horses, viewBox: '0 0 466.36 510.95' },
            batch: '',
            link: '/nextup/racing',
        },
        {
            id: 2,
            name: 'Next up Sports',
            icon: { svg: football, viewBox: '0 0 100.67 100.65' },
            batch: '',
            link: '/nextup/sports',
        },
        {
            id: 3,
            name: 'HOT Bet',
            icon: { svg: hotbet, viewBox: '0 0 44.593 55.624' },
            batch: 'New',
            link: '/hotbets',
        },
        {
            id: 4,
            name: 'Blog',
            icon: { svg: blog, viewBox: '0 0 512 512' },
            batch: 'New',
            link: '/blog',
        },
    ],
    limited: [
        {
            id: 1,
            name: 'Next up Racing',
            icon: { svg: horses, viewBox: '0 0 466.36 510.95' },
            batch: '',
            link: '/nextup/racing',
        },
        {
            id: 2,
            name: 'Next up Sports',
            icon: { svg: football, viewBox: '0 0 100.67 100.65' },
            batch: '',
            link: '/nextup/sports',
        },
    ],
};

const helpWithoutUser = {
    id: 4,
    name: 'Help',
    list: [
        { id: 1, name: 'Contact Us', link: '/help/contactus' },
        {
            id: 2,
            name: 'Responsible Gambling Policy',
            link: '/help/responsible-gambling',
        },
        { id: 3, name: 'About Us', link: '/help/about-us' },
        { id: 4, name: 'Terms & Conditions', link: '/help/terms' },
        { id: 5, name: 'Wagering Rules', link: '/help/rules' },
        { id: 6, name: 'FAQ', link: '/help/faq' },
        { id: 7, name: 'Privacy Policy', link: '/help/privacy' },
    ],
};

export const MENU_DRAWER = [BettingWithUser, Transactions, Account, Help];
export const MENU_DRAWER_ADMIN = [BettingWithUser, Transactions, AdminAccount, Help];

export const MENU_DRAWER_WITHOUT_USER = [BettingWithoutUser, helpWithoutUser];

export const PROMOTION_MANAGE_MENU = [
    {
        id: 1,
        name: 'Enter a promo',
        icon: { svg: addPromo, viewBox: '10 25 50 10' },
        batch: '',
        link: '/admin/promotion/add',
    },
    {
        id: 2,
        name: 'Manage a promo',
        icon: { svg: cog, viewBox: '0 0 260 260' },
        batch: '',
        link: '/admin/promotion',
    },
    {
        id: 3,
        name: 'Enter Trending Links',
        icon: { svg: addPromo, viewBox: '10 25 50 10' },
        batch: '',
        link: '/admin/trending-link/add',
    },
    {
        id: 4,
        name: 'Manage Trending Links',
        icon: { svg: cog, viewBox: '0 0 260 260' },
        batch: '',
        link: '/admin/trending-link',
    },
];

export const PROMOTION_LIMITED_MANAGE_MENU = [
    {
        id: 3,
        name: 'Enter Trending Links',
        icon: { svg: addPromo, viewBox: '10 25 50 10' },
        batch: '',
        link: '/admin/trending-link/add',
    },
    {
        id: 4,
        name: 'Manage Trending Links',
        icon: { svg: cog, viewBox: '0 0 260 260' },
        batch: '',
        link: '/admin/trending-link',
    },
];

export const SPORTS_MENU_TABS = ['Trending', 'All Sports', 'Upcoming'];

export const SPORTS_MENU_TAB = {
    TRENDING: 0,
    ALL_SPORTS: 1,
    UPCOMING: 2,
};

export const TRENDING_TAB_TYPE = {
    TRENDING_SPORT: 'TRENDING_SPORT',
    POPULAR: 'Popular',
    OTHERS: 'Other Sports',
};

export const TRANSACTIONS_TABS = ['Pending Bets', 'Resulted Bets', 'Banking'];

export const TIPTRANSACTIONS_TABS = ['Purchased Tips', 'Free Tips', 'Subscriptions', 'Transactions'];

export const TRANSACTIONS_GTO_TABS = ['Pending Tips', 'Resulted Tips'];

export const EARNINGS_TABS = ['Summary', 'Tip Sales', 'HOT Bets'];

export const TRANSACTIONS_TAB_TYPE = {
    PENDING_BETS: 0,
    RESULTED_BETS: 1,
    BANKING: 2,
};

export const HEADER_MODAL = {
    ACCOUNT: 'openAccount',
    BENEFITS: 'openBenefits',
    PENDING_TIPS: 'openPendingTips',
};

export const All_CODES =
    process.env.APP_BRAND == 'gto'
        ? [
            { id: 0, name: 'All Codes' },
            { id: 1, name: 'Horses' },
            { id: 2, name: 'Greyhounds' },
            { id: 3, name: 'Harness' },
        ]
        : [
            { id: 0, name: 'All Codes' },
            { id: 1, name: 'Racing' },
            { id: 2, name: 'Sport' },
        ];

export const All_RACING_CODES = [
    { id: 'A', name: 'All Codes' },
    { id: 'R', name: 'Horses' },
    { id: 'G', name: 'Greyhounds' },
    { id: 'H', name: 'Harness' },
];

export const COMMENTS_CODES = [
    { id: 1, name: 'Show all Comments' },
    { id: 0, name: 'Hide all Comments' },
];

export const All_CODES_DICTIONARY = {
    0: 'all',
    1: 'racing',
    2: 'sport',
};

export const NEXT_UP = [
    { id: 0, name: 'Next Up', value: 'nextup' },
    { id: 1, name: 'Date Placed', value: 'dateplaced' },
];

export const MONTH_OPTIONS = [
    { id: 'M', name: 'Month to Date' },
    { id: 'LM', name: 'Last Month' },
    { id: 'Y', name: 'Year to Date' },
    { id: 'YD', name: 'Last Year' },
    { id: 'MY', name: 'Last 12 Months' },
];

export const STATUS_OPTIONS = [
    { id: 0, name: 'All Status' },
    { id: 1, name: 'Unpaid' },
    { id: 99, name: 'Paid' },
];

export const NEXT_UPS_DICTIONARY = {
    0: 'nextup',
    1: 'dateplaced',
};

export const EARNINGS_ROUTE_TYPE = {
    summary: 0,
    tipSales: 1,
    hotbet: 2,
};

export const TRANSACTIONS_ROUTE_TYPE = {
    pendingBets: 0,
    resultedBets: 1,
    banking: 2,
};

export const TIPTRANSACTIONS_ROUTE_TYPE = {
    purchased: 0,
    free: 1,
    subscriptions: 2,
    transactions: 3,
};

export const TRANSACTIONS_ROUTE_VALUE = {
    0: 'pendingBets',
    1: 'resultedBets',
    2: 'banking',
};

export const TIPTRANSACTIONS_ROUTE_VALUE = {
    0: 'purchased',
    1: 'free',
    2: 'subscriptions',
    3: 'transactions',
};

export const RESULT_TIME = [
    { id: 7, name: 'Last 7 days' },
    { id: 30, name: 'Last 30 days' },
    { id: 180, name: 'Last 6 months' },
    { id: 365, name: 'Last 12 months' },
    { id: 0, name: 'All Time' },
];

export const RESULT_TIME_TIPSTER_PAGE = [
    { id: 7, name: 'Last 7 days' },
    { id: 30, name: 'Last 30 days' },
];

export const SUB_STATUS = [
    { id: 99, name: 'All Subscriptions' },
    { id: 1, name: 'Active Subscriptions' },
    { id: 0, name: 'Closed Subscriptions' },
];

export const TRANS_TYPE = [
    { id: 'A', name: 'All Transactions' },
    { id: 'DEP', name: 'Deposits' },
    { id: 'PUR', name: 'Purchased Tips' },
];

export const TRANS_DATE = [
    { id: 30, name: 'This Month' },
    { id: 60, name: 'Last Month' },
    { id: 180, name: 'Last 6 months' },
    { id: 365, name: 'Last 12 months' },
    { id: 0, name: 'All Time' },
];

export const RESULT_TYPE =
    process.env.APP_BRAND === 'gto'
        ? [
            { id: 0, name: 'All Results' },
            { id: 1, name: 'Win' },
            { id: 2, name: 'Place' },
        ]
        : [
            { id: 0, name: 'All Resulted' },
            { id: 1, name: 'Win' },
            { id: 2, name: 'Loss' },
            { id: 3, name: 'Cancelled' },
            { id: 4, name: 'All Trans' },
        ];

export const TIPSTER_RESULT_TYPE =
    [
        { id: 0, name: 'All Results' },
        { id: 1, name: 'Winners' },
        { id: 2, name: 'Placed' },
    ]

export const TIPSTER_TIP_TYPE =
    [
        { id: 0, name: 'Win' },
        { id: 1, name: 'Place' },
    ]

export const RESULT_TYPE_DICTIONARY = {
    0: 'resulted',
    1: 'Win',
    2: 'Loss',
    3: 'Cancelled',
    4: 'All',
};

export const BANKING_TYPE = [
    { id: 0, name: 'All Banking' },
    { id: 1, name: 'Deposits' },
    { id: 2, name: 'Withdrawals' },
];

export const BANKING_TYPE_DICTIONARY = {
    0: 'all',
    1: 'deposit',
    2: 'withdraw',
};

export const TRANSACTION_FILTER = {
    all: 0,
    racing: 1,
    sport: 2,
};

export const RACETYPE_FILTER = {
    'R': 1,
    'G': 2,
    'H': 3,
};

export const ebGradient = {
    0: {
        rightGradient: '#fdeb7d',
        leftGradient: '#fff7c8',
    },
    1: {
        rightGradient: ' #fed99e',
        leftGradient: '#feeeda',
    },
    2: {
        rightGradient: '#dff0fa',
        leftGradient: '#f3f8fc',
    },
    3: {
        rightGradient: '#540C5F',
        leftGradient: '#752487',
    },
};

export const HOT_BET_ICON_TYPE = {
    flames: 'flames',
    bagCash: 'bagCash',
    target: 'target',
};

export const HOME_MENU = [
    {
        id: 1,
        name: 'Home',
        icon: { svg: home, viewBox: '0 0 234.45 200.04' },
        link: '/',
        path: 'home',
    },
    {
        id: 2,
        name: 'Racing',
        icon: { svg: racing, viewBox: '0 0 466.36 510.95' },
        link: '/racing',
        path: 'racing',
    },
    {
        id: 3,
        name: 'Sports',
        icon: { svg: sports, viewBox: '0 0 100.67 100.65' },
        link: '/sports',
        path: 'sports',
    },
    {
        id: 4,
        name: 'HOT Bets',
        icon: { svg: hotbet, viewBox: '0 0 44.593 55.624' },
        link: '/hotbets',
        path: 'hotbets',
    },
    {
        id: 5,
        name: 'Promotions',
        icon: { svg: giftBox, viewBox: '0 0 28.092 28.092' },
        link: '/promotions',
        path: 'promotions',
    },
    {
        id: 6,
        name: 'Blog',
        icon: { svg: blog, viewBox: '0 0 512 512' },
        link: '/blog',
        path: 'blog',
    },
    {
        id: 7,
        name: 'My Account',
        icon: { svg: account, viewBox: '0 0 1816.76 1981.92' },
        link: '/myaccount',
        path: 'myaccount',
    },
    {
        id: 8,
        name: 'Help',
        icon: { svg: help, viewBox: '0 0 512 512' },
        link: '/help/contactus',
        path: 'help',
    },
];

export const GTO_HOME_MENU = [
    {
        id: 1,
        name: 'Home',
        icon: { svg: '' },
        link: '/',
        path: 'home',
        options: [
            {
                label: 'About Us',
                link: '/about-us',
            },
            {
                label: 'Help',
                link: 'https://support.thegreattipoff.com/support/solutions/51000198032',
                target: "blank"
            },
            {
                label: 'Contact Us',
                link: '/contactus',
            },
        ],
    },
    {
        id: 2,
        name: 'Enter Tips',
        icon: { svg: '' },
        link: '/racing',
        path: '/racing',
        options: [
            {
                label: 'Horse Racing Tips',
                link: '/racing/horses',
            },
            {
                label: 'Greyhound Tips',
                link: '/racing/greyhound',
            },
            {
                label: 'Harness Tips',
                link: '/racing/harness',
            },
        ],
    },
    {
        id: 3,
        name: 'Get Tips',
        icon: { svg: '' },
        link: '/horse-racing-tips',
        path: 'racing-tips',
        options: [
            {
                label: 'Horse Racing Tips',
                link: '/horse-racing-tips',
            },
            {
                label: 'Greyhound Tips',
                link: '/greyhound-racing-tips',
            },
            {
                label: 'Harness Tips',
                link: '/harness-racing-tips',
            },
        ],
    },
    {
        id: 4,
        name: 'Free Tips',
        icon: { svg: '' },
        link: '/horse-racing-tips?media=Free-Tips',
        path: '/horse-racing-tips?media=Free-Tips',
    },
    {
        id: 5,
        name: 'Tipster Results',
        icon: { svg: '' },
        link: '/horse-racing-results',
        path: 'racing-results',
        options: [
            {
                label: 'Horse Racing Results',
                link: '/horse-racing-results',
            },
            {
                label: 'Greyhound Results',
                link: '/greyhound-racing-results',
            },
            {
                label: 'Harness Results',
                link: '/harness-racing-results',
            },
        ],
    },
    {
        id: 6,
        name: 'News',
        icon: { svg: '' },
        link: '/news',
        path: 'news',
        options: [
            {
                label: 'Racing News',
                link: '/news',
            },
            {
                label: 'Sky Racing Tips',
                link: '/racing-sites/sky-racing',
            },
            {
                label: 'Racing.com Tips',
                link: '/racing-sites/racing-com',
            },
            {
                label: 'Telegraph Tips',
                link: '/racing-sites/telegraph-racing',
            },
            {
                label: 'SEN Track Tips',
                link: '/racing-sites/sen',
            },
        ],
    },
    {
        id: 7,
        name: 'Competitions',
        icon: { svg: '' },
        link: '/competitions',
        path: 'competitions',
    },
    {
        id: 8,
        name: 'Blackbook',
        icon: { svg: '' },
        link: '/myaccount/managealerts',
        path: 'managealerts',
    },
];

export const NEXTUP_HOME_MENU = [
    {
        id: 1,
        name: 'Horses',
        link: '/racing/horses',
        filter: '',
    },
    {
        id: 2,
        name: 'Sports',
        link: '/sports',
        filter: '',
    },
    {
        id: 3,
        name: 'Greys',
        link: '/racing/greyhound',
        filter: 'Harness',
    },
    {
        id: 4,
        name: 'Harness',
        link: '/racing/harness',
        filter: 'Greys',
    },
];

export const hotbetCatList = [
    {
        value: 'R',
        svg_icon: horses,
        view_box: '0 0 466.36 510.95',
        label: 'Horses',
        link: '/racing/horses',
    },
    {
        value: 'G',
        svg_icon: greys,
        view_box: '0 0 1633 1465',
        label: 'Greys',
        link: '/racing/greyhound',
    },
    {
        value: 'H',
        svg_icon: harness,
        view_box: '0 0 1101 1850',
        label: 'Harness',
        link: '/racing/harness',
    },
];

export const hbStatsTabs = [
    { id: 1, name: 'Detailed Stats' },
    { id: 2, name: 'Recent Winners' },
    { id: 3, name: 'Profile' },
];

export const HB_STATS_TABS = {
    DETAILD_STATS: 1,
    RECENT_WINNERS: 2,
    PROFILE: 3,
};

export const HOTBET_CATEGORY = {
    FRE_WIN: 'FreqWin',
    ODDS: 'Odds',
};

export const STAT_TYPE = {
    STRK: 'STRK',
    STAT: 'STAT',
    FREQ_WIN: 'FreqWin',
};

export const FREQ_WIN_TIL_TYPE = {
    WIN: 'WIN',
    LOST: 'LOST',
    START: 'START',
    END: 'END',
};

export const LOCAL_STORAGE_KEY = {
    HOT_BET_DATA: 'hot_bet_data_set',
    RACE_TOP_HOT_BET_BUTTON: 'RACE_TOP_HOT_BET_BUTTON',
    RACE_BOTTOM_HOT_BET_BUTTON: 'RACE_BOTTOM_HOT_BET_BUTTON',
};

export const SELECT_HOT_BET = 3;

export const HOT_BET_ODD_FILTER = {
    min: 1,
    max: 30,
    initialStart: 1,
    initialEnd: 30,
    initialGTOStart: 3,
    initialGTOEnd: 10,
};
export const WAGERING_IMAGES = [
    {
        file: 'icon_NSWRacing.png',
        label: 'Racing NSW',
    },
    {
        file: 'icon_QLDRacing.png',
        label: 'Racing Queensland',
    },
    {
        file: 'icon_VICRacing.png',
        label: 'VIC Racing',
    },
    {
        file: 'icon_WARacing.png',
        label: 'WA Racing',
    },
    {
        file: 'icon_afl.svg',
        label: 'AFL',
    },
    {
        file: 'icon_nrl.svg',
        label: 'NRL',
    },
    {
        file: 'icon_baskaus.svg',
        label: 'Basketball Australia',
    },
];

export const BANKING_IMAGES = [
    {
        file: 'icon_visa.svg',
        label: 'VISA',
    },
    {
        file: 'icon_mastercard.svg',
        label: 'Mastercard',
    },
    {
        file: 'icon_poli.svg',
        label: 'POLi',
    },
];

export const FOOTER_LINKS = [
    {
        label: 'About Us',
        link: '/about-us',
    },
    {
        label: 'Contact Us',
        link: '/contactus',
    },
    {
        label: 'Terms & Conditions',
        link: '/terms',
    },
    {
        label: 'Wagering Rules',
        link: '/help/rules',
    },
    {
        label: 'FAQ',
        link: '/help/faq',
    },
    {
        label: 'Privacy Policy',
        link: '/privacy',
    },
    {
        label: 'Responsible Gambling Policy',
        link: '/help/responsible-gambling',
    },
    {
        label: 'SA Code of Practice',
        link: 'https://www.cbs.sa.gov.au/resources/gambling-codes-practice-notice-2013',
    },
];

export const FOOTER_LINKS_SOCIL_MEDIA = [
    {
        label: 'Twitter',
        src: '/images/social/Twitter-Icon.png',
        link: 'https://twitter.com/theGreatTipOff',
    },
    {
        label: 'Facebook',
        src: '/images/social/Facebook-Icon.png',
        link: 'https://www.facebook.com/theGreatTipOff',
    },
    {
        label: 'Instagram',
        src: '/images/social/Instagram-Icon.png',
        link: 'https://www.instagram.com/thegreattipoff',
    },
    {
        label: 'YouTube',
        src: '/images/social/Youtube-Icon.png',
        link: 'https://www.youtube.com/channel/UCnKPt7E0rigJY5r9saxdGww',
    },
    {
        label: 'TikTok',
        src: '/images/social/Tiktok-Icon.png',
        link: 'https://www.tiktok.com/@greattipoff',
    },
];

export const BETSLIP_KEYS = {
    BET_SLIP: [
        { key: 'singles', label: 'Singles' },
        { key: 'exotics', label: 'Exotics' },
        { key: 'sgm', label: 'Same Game Multi' },
        { key: 'srm', label: 'Same Race Multi' },
        { key: 'multi', label: 'Standard Multi' },
    ],
    HOT_BET_SLIP: [
        { key: 'singles', label: 'Singles' },
        { key: 'exotics', label: 'Exotics' },
        { key: 'sgm', label: 'Same Game Multi' },
        { key: 'srm', label: 'Same Race Multi' },
        { key: 'hotbet', label: 'HOT Bets' },
        { key: 'multi', label: 'Standard Multi' },
    ],
};

export const CART_KEYS = [{ key: 'packages', label: 'Tip Packages' }];

export const ACTION_TYPE = {
    ACTIVE: 'active',
    ARCHIVE: 'archive',
    FEATUREDEVENT: 'featuredevent',
};

export const TOP_BUTTON_TYPE = {
    LINK: 'link',
    TILE: 'tile',
};

export const ACCOUNT_TIPS_MENU = [
    {
        id: 1,
        name: 'Buy Tips',
        link: '/horse-racing-tips',
    },
    {
        id: 2,
        name: 'Enter Tips',
        link: '/racing',
    },
];

export const MYACCOUNT_MENU = [
    { icon: 'result', label: 'My Details', to: '/myaccount/mydetails' },
    { icon: 'lock', label: 'Password', to: '/myaccount/password' },
    { icon: 'cog', label: 'User Settings', to: '/myaccount/usersettings' },
    {
        icon: 'check',
        label: 'Verification',
        to: '/myaccount/verifications',
    },
    {
        icon: 'championcup',
        label: 'Benefits & Rewards',
        to: '/myaccount/benefits',
    },
    {
        icon: 'info',
        label: 'Responsible Gambling',
        to: '/myaccount/gambling',
    },
    {
        icon: 'alerts-icon1',
        label: 'Blackbook & Follows',
        to: '/myaccount/managealerts',
    },
];

export const MYACCOUNT_GTO_MENU = [
    { icon: 'result', label: 'My Details', to: '/myaccount/mydetails' },
    { icon: 'lock', label: 'Password', to: '/myaccount/password' },
    { icon: 'cog', label: 'User Settings', to: '/myaccount/usersettings' },
    {
        icon: 'check',
        label: 'Verification',
        to: '/myaccount/verifications',
    },
    {
        icon: 'cog',
        label: 'Tipping Settings',
        to: '/myaccount/tipping',
    },
    {
        icon: 'alerts-icon1',
        label: 'Blackbook & Follows',
        to: '/myaccount/managealerts',
    },
];

export const MYACCOUNT_GTO_CARD_MENU = [
    {
        label: 'My Profile',
        icon: { svg: account, viewBox: '0 0 1816.76 1981.92' },
        link: '/profile/',
    },
    {
        label: 'Deposit',
        icon: { svg: deposit, viewBox: '0 0 1190.17 726.35' },
        link: '/deposit',
    },
    {
        label: 'Earnings',
        icon: { svg: benefits, viewBox: '0 0 1972.48 1971.93' },
        batch: '',
        link: '/earnings',
    },
    {
        label: 'Purchased Tips',
        icon: { svg: shoppingCart, viewBox: '0 0 576 512' },
        link: '/tipsTransactions/purchased',
    },
    {
        label: 'Pending Tips',
        icon: { svg: clock, viewBox: '0 0 16 16' },
        batch: '',
        link: '/transactions/pendingBets',
    },
    {
        label: 'Free Tips',
        icon: { svg: television, viewBox: '0 0 297 297' },
        batch: '',
        link: '/horse-racing-tips?media=Free-Tips',
    },
    {
        label: 'Resulted Tips',
        icon: { svg: form, viewBox: '0 0 54 43' },
        batch: '',
        link: '/transactions/resultedBets',
    },
    {
        label: 'Account Settings',
        icon: { svg: cog, viewBox: '0 0 260 260' },
        batch: '',
        link: `/myaccount`,
    },
];

export const HOME_TIPPING_MENU = [
    {
        label: 'selltips',
        to: '/tip&earn?type=0',
        icon: 'selltips',
    },
    {
        label: 'hotbet',
        to: '/tip&earn?type=1',
        icon: 'hotbet',
    },
    {
        label: 'comps',
        to: '/tip&earn?type=2',
        icon: 'comps',
    },
];

export const HOME_TOOLS_MENU = [
    {
        label: 'Form Guide',
        to: '/racing',
        icon: 'formguide',
    },
    {
        label: 'Leaderboard',
        to: '/horse-racing-results',
        icon: 'leaderboard',
    },
    {
        label: 'Alerts',
        to: '/myaccount/managealerts',
        icon: 'alerts',
        restricted: true,
    },
];

export const STATS_TABS = ['Cash Profit', 'POT', 'Strike Rate', 'Streaks'];

export const GET_SEARCH_TAG = {
    EB: 'AW-10834694479',
    GTO: '',
    BB: '',
};

export const TIPSTER_ROUTE_VALUE = [
    {
        label: 'Tips',
        route: 'tips',
    },
    {
        label: 'Feed',
        route: '',
    },

    {
        label: 'Profile',
        route: 'profile',
    },
    {
        label: 'Stats',
        route: 'stats',
    },
    {
        label: 'Results',
        route: 'results',
    },
    {
        label: 'News',
        route: 'news',
    },
    {
        label: 'Strategy',
        route: 'strategy',
    },
    {
        label: 'Leaderboard',
        route: 'leaderboard',
    },
    {
        label: 'Earn',
        route: 'earn',
    },
];

export const LB_ACTIVE_TAB_VALUES = ['WINPROFIT', 'POT', 'WINSTRIKERATE', 'STREAK'];
