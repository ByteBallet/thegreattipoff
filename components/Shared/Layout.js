import React from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazy-load';
import theme from '../Themes/theme';
import { useAmp } from 'next/amp';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/client';
import { useContext, useEffect, useState } from 'react';
import { ErrorOutlined } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery, Container, Stack, Box, Typography } from '@mui/material';
import { UserContext } from '@Context/User/UserProvider';
import { getTopOffset, isHotBetWidget } from '@Components/utils/util';

const Footer = dynamic(() => import('./Footer'));
const Header = dynamic(() => import('./Header'));
const Seo = dynamic(() => import('./Seo'));
const MyAccountLayout = dynamic(() => import('./MyAccountLayout'));
const DesktopMenuBar = dynamic(() => import('./DesktopMenuBar'));
const DesktopLeftMenu = dynamic(() => import('./DesktopLeftMenu'));
const MessageHelperText = dynamic(() => import('@Components/common/MessageHelperText'));
const FooterDesktop = dynamic(() => import('./FooterDesktop'));
const FooterMobile = dynamic(() => import('./FooterMobile'));
const DesktopRightMenu = dynamic(() => import('./DesktopRightMenu'));
const GtoFooter = dynamic(() => import('./GtoFooter'));

const Layout = React.memo(({ children }) => {
    const isAmp = useAmp();
    const isGTO = process.env.APP_BRAND == 'gto';
    let hbWidget = isHotBetWidget();
    let showFooter = hbWidget || isAmp ? false : true;
    const [session] = useSession();
    const { user, addUser } = useContext(UserContext);
    const [openLoginModal, setOpenLoginModal] = useState(false);

    const { pathname, query } = useRouter();
    const isDesktop = useMediaQuery('(min-width:900px)');

    const storage = globalThis?.localStorage;
    let appBanner = storage ? (storage.getItem('appBanner') ? JSON.parse(storage.getItem('appBanner')) : null) : null;
    let showAppBanner = process.env.APP_BRAND === 'eb' ? true : false;
    if (appBanner) {
        let datediff = moment(moment().format('YYYY-MM-DD')).diff(moment(appBanner.createdAt), 'days');
        if (appBanner.status == 0) {
            showAppBanner = datediff > 30 ? true : false;
        }
    }

    const clsDesktopMain = isGTO ? (pathname == '/' ? 'page' : 'page310') : 'page';
    const [showBanner, setshowBanner] = useState(showAppBanner);

    useEffect(() => {
        async function getUserdata() {
            const userSession = await getSession();
            if (userSession && userSession.user && userSession.user.alias !== '' && userSession.user.alias !== null) {
                addUser(userSession.user);
            }
        }

        getUserdata();
    }, []);

    if (isAmp) {
        return (
            <main>{children}</main>
        );
    }

    if (
        pathname === '/greenid2' ||
        pathname === '/verifySuccess' ||
        Object.keys(query).includes('noheader') ||
        pathname.includes('formguide')
    ) {
        return (
            <ThemeProvider theme={theme}>
                <style>{'body { background-color: white; }'}</style>
                <CssBaseline />
                <Seo theme={theme} />
                <StyledEngineProvider injectFirst>
                    <main>{children}</main>
                </StyledEngineProvider>
            </ThemeProvider>
        );
    }
    const getcontent = () => {
        return (
            <Box pb={isDesktop ? 0 : 10} className={isDesktop ? clsDesktopMain : null} key={showBanner}>
                {pathname.startsWith('/myaccount') && session ? (
                    <MyAccountLayout pathname={pathname}>{children}</MyAccountLayout>
                ) : (
                    children
                )}
                {isDesktop && showFooter && pathname === '/' && process.env.APP_BRAND !== 'gto' && (
                    <LazyLoad>
                        <FooterDesktop />
                    </LazyLoad>
                )}
                {!isDesktop && pathname == '/' && showFooter && (process.env.APP_BRAND !== 'gto' ? (<LazyLoad><FooterMobile /></LazyLoad>) : (<LazyLoad><GtoFooter /></LazyLoad>))}
            </Box>
        );
    };
    const messages = {
        success: 'Your identification has been verified.',
        error: 'Your account is not verified. \r\n You must complete verification in order to bet. ',
    };

    let joinDateDiff = user.joindate ? moment(moment().format('YYYY-MM-DD')).diff(moment(user.joindate), 'days') : 0;

    const RenderContent = () => {
        if (isDesktop) {
            if (pathname === '/competitions') {
                return (
                    <Stack direction="row">
                        <Box pb={isDesktop ? 0 : 10} key={showBanner} sx={{ width: 1 }}>
                            {children}
                        </Box>
                    </Stack>
                );
            } else if ((pathname === '/' || pathname === '/group-1-races') && process.env.APP_BRAND === 'gto') {
                return (
                    <Stack direction="row">
                        {getcontent()}
                        <DesktopRightMenu />
                    </Stack>
                );
            } else {
                return (
                    <Stack direction="row">
                        {!isGTO && (<LazyLoad><DesktopLeftMenu /></LazyLoad>)}
                        {getcontent()}
                        {isGTO && (<LazyLoad><DesktopOtherRightMenu /></LazyLoad>)}
                    </Stack>
                );
            }
        } else {
            return getcontent();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Seo theme={theme} />
            <Header
                isOpenLoginModal={openLoginModal}
                handleOpenLoginModal={setOpenLoginModal}
                isDesktop={isDesktop}
                setshowBanner={setshowBanner}
                showBanner={showBanner}
            />
            {isDesktop && (<LazyLoad><DesktopMenuBar /></LazyLoad>)}
            {session && !user.verified && joinDateDiff > 3 && (
                <Box
                    position="sticky"
                    top={isDesktop ? 90 : getTopOffset() + 40}
                    sx={{
                        zIndex: 100,
                    }}
                >
                    <MessageHelperText error={true}>
                        <ErrorOutlined
                            fontSize="small"
                            color="error"
                            sx={{
                                transform: ' translateY(5px)',
                                marginRight: '6px',
                            }}
                        />
                        <Typography fontSize={13} sx={{ color: 'error.main' }}>
                            {messages.error}
                        </Typography>
                    </MessageHelperText>
                </Box>
            )}
            <StyledEngineProvider injectFirst>
                <main>
                    <Container fixed disableGutters>
                        {RenderContent()}
                    </Container>
                </main>
            </StyledEngineProvider>
            {isDesktop && process.env.APP_BRAND === 'gto' && showFooter && (
                <LazyLoad>
                    <GtoFooter />
                </LazyLoad>
            )}
            {!isDesktop && showFooter &&(
                <LazyLoad>
                    <Footer handleOpenLoginModal={setOpenLoginModal} />
                </LazyLoad>
            )}
        </ThemeProvider>
    );
});

export default Layout;
