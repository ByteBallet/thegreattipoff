import React, { useEffect, useContext, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import LazyLoad from 'react-lazy-load';

import * as fbq from '@Components/Shared/fpixel';
import * as gAdTag from '@Components/Shared/googleAdTag';
import * as gSearchTag from '@Components/Shared/googleSearchTag';

import { useRouter } from 'next/router';
import { useAmp } from 'next/amp';
import { CookiesProvider } from 'react-cookie';
import { Provider, useSession, getSession } from 'next-auth/client';
import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics';
import { TipProvider } from '@Context/Tip/TipProvider';
import { CartProvider } from '@Context/Cart/CartProvider';
import { UserProvider, UserContext } from '@Context/User/UserProvider';

const HomeBase = dynamic(() => import('HomeBase'));
const Layout = dynamic(() => import('../components/Shared/Layout'));
const NewUser = dynamic(() => import('@Components/Modals/NewUser'));
const Maintenance = dynamic(() => import('@Components/Shared/Maintenance'));
const updateUserSession = dynamic(() => import('@Components/utils/updateUserSession'));
const ErrorBoundary = dynamic(() => import('@Components/Shared/ErrorBoundary'));
const LoadingScreen = dynamic(() => import('@Components/Shared/LoadingScreen'));

function App({ Component, pageProps }) {

    const isGTO = process.env.APP_BRAND == 'gto';
    const { user, addUser } = useContext(UserContext);
    const isAmp = useAmp();
    const router = useRouter();
    const [loading, setLoading] = useState(isGTO ? false : true);
    const [session] = useSession();
    let joinDateDiff = user.joindate ? moment(moment().format('YYYY-MM-DD')).diff(moment(user.joindate), 'days') : 0;

    const shouldRenderComponent =
        session && !user.verified
            ? router.asPath.includes('deposit') && joinDateDiff > 3 ||
            router.asPath.includes('withdraw') ||
            router.asPath.includes('register')
            : !router.asPath.includes('register');
    const ComponentToRender = shouldRenderComponent ? Component : HomeBase;

    const updateData = async () => {
        const userSession = await getSession();
        if (userSession && userSession.user) {
            addUser(userSession.user);
        }
    };

    let isLoggedIn = session && session.user && session.user.alias !== '' && session.user.alias !== null;

    useEffect(() => {
        updateData();
      }, [addUser]);

    useEffect(() => {
        const updateUser = async () => {
            if (isLoggedIn) {
                try {
                    await updateUserSession(false);
                    await updateData();
                } catch (error) {
                    console.error('Error updating user session:', error);
                }
            }
        };
        updateUser();
    }, [isLoggedIn]);

    useEffect(() => {
        import('@styles/globals.css');
        import('@styles/fonts.css');
        import('@public/fonts/fontstyles.css');
        import('@styles/globals.scss');
        if (!isGTO) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, []);

    useEffect(() => {
        if (router?.query?.Referrer) {
            let affiliate = router?.query?.Referrer;
            if (affiliate) {
                localStorage.setItem('affiliate', affiliate);
            }
        }
        const handleRouteStartChange = (url, { shallow }) => {
            if (url == "/tipsTransactions/purchased" && user?.userID) {
                let cartSuccess = localStorage?.getItem(`cartSuccess${user?.userID}`)
                if (cartSuccess) {
                    localStorage.removeItem(`cartSuccess${user?.userID}`)
                }
            }
        }
        router.events.on('routeChangeStart', handleRouteStartChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteStartChange)
        }
    }, [router]);

    useEffect(() => {
        // This pageview only triggers the first time (it's important for Pixel to have real information)
        fbq.pageview();

        const handleRouteChange = (url) => {
            fbq.pageview();
            gSearchTag.googlesearchpageview(url);
            gAdTag.googlepageview(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    usePageViews();
    return (
        <React.StrictMode>
            {/* skip Splash page */}
            {!loading ||
                router.pathname === '/verifySuccess' ||
                router.pathname === '/greenid2' ||
                router.pathname.includes('formguide') ||
                router.pathname.includes('/deposit/success') ||
                isAmp ? (
                <ErrorBoundary userID={user.userID} clientID={user.clientID} alias={user.alias} path={router.pathname}>
                    {process.env.MAINTENANCE_MODE === 1 ? (
                        <Maintenance />
                    ) : (
                        <Layout>
                            {!isAmp && (
                                <React.Fragment>
                                    {process.env.client.GACode.length > 0 && <GoogleAnalytics />}
                                    {gSearchTag?.GTM_SEARCH_ID?.length > 0 && (
                                        <React.Fragment>
                                            <Script
                                                src={`https://www.googletagmanager.com/gtag/js?id=${gSearchTag.GTM_SEARCH_ID}`}
                                                strategy="afterInteractive"
                                            />
                                            <Script id="gtag-search-base" strategy="afterInteractive">
                                                {`
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());
                                        gtag('config', '${gSearchTag.GTM_SEARCH_ID}', {
                                            page_path: window.location.pathname,
                                        });
                                        `}
                                            </Script>
                                        </React.Fragment>
                                    )}
                                    {gAdTag.GTM_ID.length > 0 && (
                                        <React.Fragment>
                                            <Script
                                                nomodule 
                                                src={`https://www.googletagmanager.com/gtag/js?id=${gAdTag.GTM_ID}`}
                                                strategy="afterInteractive"
                                            />
                                            <Script id="gtag-ad-base" strategy="afterInteractive" nomodule>
                                                {`
                                            window.dataLayer = window.dataLayer || [];
                                            function gtag(){dataLayer.push(arguments);}
                                            gtag('js', new Date());
                                            gtag('config', '${gAdTag.GTM_ID}', {
                                                page_path: window.location.pathname,
                                            });
                                            `}
                                            </Script>
                                        </React.Fragment>
                                    )}
                                    {fbq.FB_PIXEL_ID.length > 0 && (
                                        <Script
                                            id="fb-pixel"
                                            nomodule
                                            strategy="afterInteractive"
                                            dangerouslySetInnerHTML={{
                                                __html: `
                                            !function(f,b,e,v,n,t,s)
                                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                                                n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
                                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                            n.queue=[];t=b.createElement(e);t.async=!0;
                                            t.src=v;s=b.getElementsByTagName(e)[0];
                                                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                                            'https://connect.facebook.net/en_US/fbevents.js');
                                            fbq('init', ${fbq.FB_PIXEL_ID});
                                            fbq('track', 'PageView');
                                            `,
                                            }}
                                        />
                                    )}
                                </React.Fragment>
                            )}
                            <LazyLoad>
                                <ComponentToRender {...pageProps} />
                            </LazyLoad>
                        </Layout>
                    )}
                </ErrorBoundary>
            ) : (
                <LoadingScreen />
            )}
        </React.StrictMode>
    );
}

function GTOApp({ Component, pageProps }) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
    }, []);
    return (
        <UserProvider>
            <CartProvider>
                <TipProvider>
                    <CookiesProvider>
                        <Provider session={pageProps.session}>
                            <App Component={Component} pageProps={pageProps} />
                            {/* <Layout>
                            <Component {...pageProps} />
                        </Layout> */}
                            <NewUser />
                        </Provider>
                    </CookiesProvider>
                </TipProvider>
            </CartProvider>
        </UserProvider>
    );
}

export default GTOApp;
