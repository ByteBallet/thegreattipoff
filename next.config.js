var webpack = require('webpack');
const path = require('path');

const brandName = process.env.NEXT_PUBLIC_CLIENT; // TODO: make dynamic
const brandPath = `./brands/${brandName}`;
const cdnPath = `${process.env.NEXT_PUBLIC_CDN}/${brandName}`;
const gtoImgPath = `https://thegreattipoff.com/assets/images`;

module.exports = {
    reactStrictMode: true,
    // swcMinify: true,
    env: {
        MAINTENANCE_MODE: 0,
        minHotBet: 2,
        server: process.env.NEXT_PUBLIC_SERVER, //'https://devapi.racingtipoff.com',
        sitesource: process.env.NEXT_PUBLIC_CLIENT,
        raceTimeLimit: '3',
        countdown: '5',
        APP_BRAND: brandName,
        cdn: cdnPath,
        gtoImgPath: gtoImgPath,
        enableBackBtn: [
            'racing',
            'sports',
            'greyhound',
            'harness',
            'futures',
            'myaccount',
            'deposit',
            'withdraw',
            'horses',
            'admin',
            'tipster',
            'earnings',
            'news',
            'betting-professionals',
        ],
        minPendingBets: 8,
        level1: [
            '/racing',
            '/sports',
            '/tips',
            '/horses',
            '/greyhound',
            '/harness',
            '/racing/horses',
            '/racing/greyhound',
            '/racing/harness',
            '/futures',
            '/nextup',
            '/nextup/racing',
            '/nextup/sports',
            '/admin',
            '/harness-racing-tips',
            '/horse-racing-tips',
            '/greyhound-racing-tips',
            '/betting-professionals',
        ],
        noRedirect: ['racing', 'sports', 'greyhound', 'harness', 'futures', 'horses'],
        restrictedPages: ['myaccount', 'transactions', 'deposit', 'withdraw', 'admin', 'earnings', 'tipsTransactions'],
        hotbetWidget: ['BB'],
        MIN_PACKAGE_VAL: 10,
        MAX_PACKAGE_VAL: 500,
        MIN_DEPOSIT_AMT: brandName == 'GTO' ? 10 : 5,
        client: {
            name: process.env.NEXT_PUBLIC_CLIENT,
            clientname: process.env.NEXT_PUBLIC_CLIENTNAME,
            support: {
                showSupportMessage: process.env.NEXT_PUBLIC_SHOWSUPPORTCOMP,
                email: process.env.NEXT_PUBLIC_EMAIL,
                phone: process.env.NEXT_PUBLIC_PHONE,
            },
            sitelabel: process.env.NEXT_PUBLIC_SITELABEL,
            siteweb: process.env.NEXT_PUBLIC_SITEWEB,
            enableBetting: process.env.NEXT_PUBLIC_ENABLE_BETTING,
            enableTipping: process.env.NEXT_PUBLIC_ENABLE_TIPPING,
            maxLegMultiPrice: process.env.NEXT_PUBLIC_MAX_LEG_MULTI_PRICE,
            restrictedModules: process.env.NEXT_PUBLIC_RESTRICTED_MODULES,
            GACode: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
            GATag: process.env.NEXT_PUBLIC_AD_ID,
            contact: process.env.NEXT_PUBLIC_CONTACT,
            contactFormatted: process.env.NEXT_PUBLIC_CONTACT_FORMATTED,
            iOSAppLink: process.env.NEXT_PUBLIC_IOS_APP,
            showBanner: process.env.NEXT_PUBLIC_SHOWBANNER,
            fPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
            SRM: process.env.NEXT_PUBLIC_SRM_ACTIVE,
            betLink: process.env.NEXT_PUBLIC_BET_LINK,
            hbWidgetLink: process.env.NEXT_PUBLIC_HBWIDGET_LINK,
            eway_secret: process.env.NEXT_PUBLIC_EWAYCLIENT,
        },
    },
    images: {
        domains: [
            'cdn.elitebet.com.au',
            'cdnstage.thegreattipoff.com',
            'silks.elitebet.com.au',
            'thegreattipoff.com',
            'cdn.thegreattipoff.com',
        ],
    },
    webpack(config) {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                modules: [brandPath, `./brands/default`, 'node_modules'],
            },
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        test: /\.svg$/,
                        use: ['@svgr/webpack'],
                    },
                ],
            },
        };
    },

    async redirects() {
        return [
            {
                source: '/Racing/All/Today',
                destination: '/racing',
                permanent: true,
            },
            {
                source: '/Sport/Upcoming',
                destination: '/sports',
                permanent: true,
            },
            {
                source: '/Contact',
                destination: '/contactus',
                permanent: true,
            },
            {
                source: '/help',
                destination: 'https://support.thegreattipoff.com/support/solutions/51000198032',
                permanent: true,
            },
            {
                source: '/help/contactus',
                destination: '/contactus',
                permanent: true,
            },
            {
                source: '/help/about-us',
                destination: '/about-us',
                permanent: true,
            },
            {
                source: '/help/privacy',
                destination: '/privacy',
                permanent: true,
            },
            {
                source: '/join',
                destination: '/register',
                permanent: true,
            },
            {
                source: '/appinfo',
                destination: '/help/android-download',
                permanent: true,
            },
            {
                source: '/Account/Register/:path*',
                destination: '/register',
                permanent: true,
            },
            {
                source: '/racingterms',
                destination: '/horse-racing-terms',
                permanent: true,
            },
            {
                source: '/tipmarket/horse-racing-tips',
                destination: '/horse-racing-tips',
                permanent: true,
            },
            {
                source: '/tipmarket/harness-racing-tips',
                destination: '/harness-racing-tips',
                permanent: true,
            },
            {
                source: '/tipmarket/greyhound-racing-tips',
                destination: '/greyhound-racing-tips',
                permanent: true,
            },
            {
                source: '/leaderboard/horseracing',
                destination: '/horse-racing-results',
                permanent: true,
            },
            {
                source: '/leaderboard/harnessracing',
                destination: '/harness-racing-results',
                permanent: true,
            },
            {
                source: '/leaderboard/greyhoundracing',
                destination: '/greyhound-racing-results',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/n2xxay5kjssw02qglniuccm956yaz2',
                destination: '/html/n2xxay5kjssw02qglniuccm956yaz2.html',
            },
            {
                source: '/n2xxay5kjssw02qglniuccm956yaz2.html',
                destination: '/html/n2xxay5kjssw02qglniuccm956yaz2.html',
            },
            {
                source: '/google56bea151d418b149.html',
                destination: '/html/google56bea151d418b149.html',
            },
            {
                source: '/register',
                destination: '/user/register',
            },
            {
                source: '/login',
                destination: '/racing',
            },
            {
                source: '/futures',
                destination: '/racing',
            },
            {
                source: '/racing/horses',
                destination: '/racing',
            },
            {
                source: '/racing/greyhound',
                destination: '/racing',
            },
            {
                source: '/racing/harness',
                destination: '/racing',
            },
            {
                source: '/horses/:racemeet*',
                destination: '/racing/:racemeet*',
            },
            {
                source: '/harness/:racemeet*',
                destination: '/racing/:racemeet*',
            },
            {
                source: '/greyhound/:racemeet*',
                destination: '/racing/:racemeet*',
            },
            {
                source: '/poli/cancel',
                destination: '/deposit/poli?cancel=true',
            },
            {
                source: '/poli/fail',
                destination: '/deposit/poli?fail=true',
            },
            {
                source: '/poli/success',
                destination: '/deposit/poli/success',
            },
            {
                source: '/greenid',
                destination: '/html/GreenID.html',
            },
            {
                source: '/help/iOS-download',
                destination: '/help/ios-download',
            },
            {
                source: '/free-horse-racing-tips',
                destination: '/horse-racing-tips?media=Free-Tips',
            },
            {
                source: '/horse-racing-tips',
                destination: '/tipmarket/horse-racing-tips',
            },
            {
                source: '/harness-racing-tips',
                destination: '/tipmarket/harness-racing-tips',
            },
            {
                source: '/greyhound-racing-tips',
                destination: '/tipmarket/greyhound-racing-tips',
            },
            {
                source: '/horse-racing-results',
                destination: '/leaderboard/horseracing',
            },
            {
                source: '/harness-racing-results',
                destination: '/leaderboard/harnessracing',
            },
            {
                source: '/greyhound-racing-results',
                destination: '/leaderboard/greyhoundracing',
            },
            {
                source: '/tipmarket/:racetype*',
                destination: '/leaderboard/:racetype*',
            },
            {
                source: '/tracks/horse-racing/:racelocation*',
                destination: '/leaderboard/:racelocation*',
            },
            {
                source: '/hb/register',
                destination: '/register',
            },
            {
                source: '/deposit/success/:userid/:cartid',
                destination: '/deposit/success?cartid=:cartid*',
            },
            {
                source: '/racing-tips-mark-hunter',
                destination: '/tipster/markhunter',
            },
            {
                source: '/racing-tips-david-gately',
                destination: '/tipster/davidgately',
            },
            {
                source: '/racing-tips-deane-lester',
                destination: '/tipster/deane_lester',
            },
            {
                source: '/racing-tips-brad-davidson',
                destination: '/tipster/brad_davidson',
            },
        ];
    },
};
