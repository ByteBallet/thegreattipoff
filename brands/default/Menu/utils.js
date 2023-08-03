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

import checkCircle from '@public/images/svg/check-circle.svg';
import rankingStar from '@public/images/svg/ranking-star.svg';

import getTips from '@public/images/svg/get-tips-icon.svg';
import shoppingCart from '@public/images/svg/cart-shopping.svg';

const Transactions = {
    id: 2,
    name: 'My Account',
    list: [
        {
            id: 1,
            name: 'Purchased Tips',
            icon: { svg: shoppingCart, viewBox: '0 0 576 512' },
            batch: '',
            link: '/tipsTransactions/purchased',
        },
        {
            id: 2,
            name: 'Earnings',
            icon: { svg: benefits, viewBox: '0 0 1972.48 1971.93' },
            batch: '',
            link: '/earnings',
        },
        {
            id: 3,
            name: 'Account Settings',
            icon: { svg: cog, viewBox: '0 0 260 260' },
            batch: '',
            link: `/myaccount`,
        },
        {
            id: 4,
            name: 'Deposit',
            // icon: { svg: form, viewBox: '0 0 54 43' },
            icon: { svg: deposit, viewBox: '0 0 1190.17 726.35' },
            batch: '',
            link: '/deposit',
        },

        {
            id: 5,
            name: 'Pending Tips',
            icon: { svg: clock, viewBox: '0 0 16 16' },
            // icon: { svg: benefits, viewBox: '0 0 1972.48 1971.93' },
            batch: '',
            link: '/transactions/pendingBets',
        },
        {
            id: 6,
            name: 'Resulted Tips',
            icon: { svg: form, viewBox: '0 0 54 43' },
            // icon: { svg: alert, viewBox: '0 0 212 212' },
            batch: '',
            link: '/transactions/resultedBets',
        },
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

const TippingTab = {
    id: 1,
    name: 'Tips',
    list: [
        {
            id: 1,
            name: 'Enter Tips',
            icon: { svg: checkCircle, viewBox: '0 0 466.36 510.95' },
            batch: '',
            link: '/nextup/racing',
        },
        {
            id: 2,
            name: 'Get Tips',
            icon: { svg: getTips, viewBox: '0 0 300.22 323.8' },
            batch: '',
            link: '/tipmarket/horse-racing-tips',
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
            name: 'Tipster Rankings',
            icon: { svg: rankingStar, viewBox: '0 0 512 512' },
            batch: 'New',
            link: '/horse-racing-results',
        },

        {
            id: 4,
            name: 'Competitions',
            icon: { svg: giftBox, viewBox: '0 0 28.092 28.092' },
            batch: 'New',
            link: '/blog',
        },
        {
            id: 4,
            name: 'News',
            icon: { svg: blog, viewBox: '0 0 512 512' },
            batch: 'New',
            link: '/news',
        },
    ],
};

const helpWithoutUser = {
    id: 4,
    name: 'Help',
    list: [
        { id: 1, name: 'Contact Us', link: '/help/contactus' },
        { id: 2, name: 'About Us', link: '/help/about-us' },
        { id: 3, name: 'Terms & Conditions', link: '/help/terms' },
        { id: 4, name: 'Privacy Policy', link: '/help/privacy' },
    ],
};

export const MENU_DRAWER = [TippingTab, Transactions, Help];
export const MENU_DRAWER_ADMIN = [TippingTab, Transactions, AdminAccount, Help];

export const MENU_DRAWER_WITHOUT_USER = [TippingTab, helpWithoutUser];
