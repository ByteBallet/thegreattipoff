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
import withdraw from '@public/images/svg/blog.svg';
import account from '@public/images/svg/my-account-icon.svg';
import cog from '@public/images/svg/cog.svg';

import television from '@public/images/svg/television-solid.svg';
import book from '@public/images/svg/book-solid.svg';

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
        { id: 1, name: 'Contact Us', link: '/contactus' },
        {
            id: 2,
            name: 'Help',
            link: 'https://support.thegreattipoff.com/support/solutions/51000198032',
        },
        { id: 3, name: 'About Us', link: '/about-us' },
        { id: 4, name: 'Terms & Conditions', link: '/terms' },
        { id: 7, name: 'Privacy Policy', link: '/privacy' },
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
            link: '/racing',
            sub: true,
            subMenu: [
                {
                    id: 11,
                    name: 'Horse Racing Tips',
                    icon: null,
                    batch: '',
                    link: '/racing/horses',
                },
                {
                    id: 12,
                    name: 'Greyhound Tips',
                    icon: null,
                    batch: '',
                    link: '/racing/greyhound',
                },
                {
                    id: 13,
                    name: 'Harness Tips',
                    icon: null,
                    batch: '',
                    link: '/racing/harness',
                },
            ],
        },
        {
            id: 2,
            name: 'Get Tips',
            icon: { svg: getTips, viewBox: '0 0 300.22 323.8' },
            batch: '',
            link: '/tipmarket/horse-racing-tips',
            sub: true,
            subMenu: [
                {
                    id: 11,
                    name: 'Horse Racing Tips',
                    icon: null,
                    batch: '',
                    link: '/horse-racing-tips',
                },
                {
                    id: 12,
                    name: 'Greyhound Tips',
                    icon: null,
                    batch: '',
                    link: '/greyhound-racing-tips',
                },
                {
                    id: 13,
                    name: 'Harness Tips',
                    icon: null,
                    batch: '',
                    link: '/harness-racing-tips',
                },
            ],
        },
        {
            id: 3,
            name: 'Free Tips',
            icon: { svg: television, viewBox: '0 0 297 297' },
            batch: 'New',
            link: '/horse-racing-tips?media=Free-Tips',
        },
        {
            id: 4,
            name: 'Tipster Results',
            icon: { svg: rankingStar, viewBox: '0 0 512 512' },
            batch: 'New',
            link: '/horse-racing-results',
            sub: true,
            subMenu: [
                {
                    id: 11,
                    name: 'Horse Racing Results',
                    icon: null,
                    batch: '',
                    link: '/horse-racing-results',
                },
                {
                    id: 12,
                    name: 'Greyhound Results',
                    icon: null,
                    batch: '',
                    link: '/greyhound-racing-results',
                },
                {
                    id: 13,
                    name: 'Harness Results',
                    icon: null,
                    batch: '',
                    link: '/harness-racing-results',
                },
            ],
        },
        {
            id: 5,
            name: 'News',
            icon: { svg: blog, viewBox: '0 0 512 512' },
            batch: 'New',
            link: '/news',
        },

        {
            id: 6,
            name: 'Competitions',
            icon: { svg: giftBox, viewBox: '0 0 28.092 28.092' },
            batch: 'New',
            link: '/competitions',
        },
        {
            id: 7,
            name: 'Blackbook',
            icon: { svg: book, viewBox: '0 0 448 512' },
            batch: 'New',
            link: '/myaccount/managealerts',
        },
    ],
};

const helpWithoutUser = {
    id: 4,
    name: 'Help',
    list: [
        { id: 1, name: 'Contact Us', link: '/contactus' },
        { id: 2, name: 'Help', link: 'https://support.thegreattipoff.com/support/solutions/51000198032' },
        { id: 3, name: 'About Us', link: '/about-us' },
        { id: 4, name: 'Terms & Conditions', link: '/terms' },
        { id: 5, name: 'Privacy Policy', link: '/privacy' },
        
    ],
};

export const MENU_DRAWER = [TippingTab, Transactions, Help];
export const MENU_DRAWER_ADMIN = [TippingTab, Transactions, AdminAccount, Help];

export const MENU_DRAWER_WITHOUT_USER = [TippingTab, helpWithoutUser];
