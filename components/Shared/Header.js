import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { AppBar, Box, Toolbar, Button, Typography, Divider, Stack, Container, IconButton } from '@mui/material';
import { useSession } from 'next-auth/client';
import { TipContext } from '@Context/Tip/TipProvider';
import { UserContext } from '@Context/User/UserProvider';
import { HEADER_MODAL } from '@lib/constants';
import { getSession } from 'next-auth/client';
import LoadBrandLogo from '../Header/LoadBrandLogo';
import LoadHeaderMenu from '../Header/LoadHeaderMenu';
import LoadBetSlip from '../BetSlip/LoadBetSlip';
import updateUserSession from '@Components/utils/updateUserSession';
import Login from '../user/Login';
import CustomDialog from '../Shared/CustomDialog.js';
import { getTopOffset, getTotalbets, isHotBetWidget, useMobileDetect } from '@Components/utils/util';
import DownloadAppBanner from './DownloadAppBanner';
import { CartContext } from '@Context/Cart/CartProvider';
import { useRouter } from 'next/router';
import { useAmp } from 'next/amp';

const Header = ({ isOpenLoginModal, handleOpenLoginModal, isDesktop, showBanner, setshowBanner }) => {
    const isAmp = useAmp()
    const isGTO = process.env.APP_BRAND == 'gto';
    const [session] = useSession();
    const [openBetSlip, setopenBetSlip] = useState(false);
    const { tips } = useContext(TipContext);
    const { cartItems } = useContext(CartContext);
    const { user, addUser } = useContext(UserContext);

    const handleClick = (event) => {
        setopenBetSlip(!openBetSlip);
        setValues({
            openAccount: false,
            openPendingTips: false,
            openBenefits: false,
        });
    };

    let totalCart = getTotalbets(cartItems);
    let totalbets = totalCart > 0 ? totalCart : getTotalbets(tips);

    const [values, setValues] = useState({
        openAccount: false,
        openPendingTips: false,
        openBenefits: false,
    });
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (prop) => (event) => {
        prop == HEADER_MODAL.ACCOUNT ||
            prop == HEADER_MODAL.BENEFITS ||
            (prop == HEADER_MODAL.PENDING_TIPS && setAnchorEl(event.currentTarget));

        setValues({
            ...values,
            [prop]: !values[prop],
        });
        if (process.env.APP_BRAND !== 'gto') {
            event.currentTarget.style.backgroundColor = !values[prop] ? 'black' : null;
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            session &&
                updateUserSession(false).then(() => {
                    session && updateData();
                });
        }, 45000);
        return () => clearInterval(interval);
    }, [session]);

    const updateData = async () => {
        const userSession = await getSession();
        if (userSession && userSession.user) {
            addUser({ ...userSession.user, newUser: user?.user?.newUser });
        }
    };

    const handleClose = () => {
        if (hbWidget) {
            parent?.postMessage('closeHBWidget', '*');
        } else {
            handleOpenLoginModal(false);
            window.scrollTo({
                top: 0,
            });
        }
    };
    let hbWidget = isHotBetWidget();

    const router = useRouter();

    const proTipsterList = ['MarkHunter', 'Mick_Gannon', 'DavidGately', 'Nic_Ashman'];

    let showAlternateHeader = false;
    let bg = 'background.header';
    if (router?.query?.sid && process.env.APP_BRAND === 'gto') {
        router?.query?.sid.forEach((item) => {
            if (proTipsterList.includes(item)) {
                bg = 'background.proTipster';
                showAlternateHeader = true;
            }
        });
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, backgroundColor: bg }} id="header">
                <AppBar
                    sx={{
                        bgcolor: bg, // 'background.proTipster', // 'background.header',
                        backgroundImage: (isDesktop && !isGTO) ? 'linear-gradient(0deg, #000, #736e6e)' : 'none',
                    }}
                >
                    {isDesktop && <Box sx={{ bgcolor: 'primary.main', height: 15 }}></Box>}
                    <Toolbar
                        variant="dense"
                        sx={{
                            justifyContent: 'space-between',
                            minHeight: (isDesktop || isAmp) ? 50 : 'auto',
                            alignItems: 'center',
                        }}
                        disableGutters
                    >
                        <Container
                            fixed
                            disableGutters
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {!isGTO && <DownloadAppBanner setshowBanner={setshowBanner} isDesktop={isDesktop} showBanner={showBanner} />}
                            <Container
                                fixed
                                disableGutters
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'nowrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <LoadBrandLogo isDesktop={isDesktop} />
                                {
                                    !isAmp &&
                                    <Stack direction="row" spacing="0.5" sx={{ minHeight: isDesktop ? 50 : 42, width: hbWidget ? 1 : 'auto' }}>
                                        <LoadHeaderMenu
                                            isOpenLoginModal={isOpenLoginModal}
                                            handleOpenLoginModal={handleOpenLoginModal}
                                            handleMenuClick={handleMenuClick}
                                            values={values}
                                            anchorEl={anchorEl}
                                            setValues={setValues}
                                        />
                                        {!hbWidget && (
                                            <React.Fragment>
                                                <Divider orientation="vertical" flexItem />
                                                <Button
                                                    color="primary"
                                                    variant="text"
                                                    onClick={handleClick}
                                                    sx={{
                                                        px: 0,
                                                        color: totalCart > 0 ? 'white.main' : 'black.main',
                                                        borderRadius: 0,
                                                        bgcolor: showAlternateHeader
                                                            ? 'black.main'
                                                            : totalCart > 0
                                                                ? 'success.main'
                                                                : 'white.main',
                                                        '&:hover': {
                                                            color: totalCart > 0 ? 'white.main' : 'black.main',
                                                            borderRadius: 0,
                                                            bgcolor: totalCart > 0 ? 'success.main' : 'white.main',
                                                        },
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: 16,
                                                            fontWeight: '700',
                                                            lineHeight: 0.7,
                                                        }}
                                                        color={showAlternateHeader ? 'white.main' : 'inherit'}
                                                        className="textAlignCoulmnCenter"
                                                    >
                                                        {totalbets}
                                                        <Typography fontSize={10} color="inherit">
                                                            {totalCart > 0 ? 'Cart' : (isGTO ? 'Tip' : 'Bet') + 'Slip'}
                                                        </Typography>
                                                    </Typography>
                                                </Button>
                                            </React.Fragment>
                                        )}
                                    </Stack>
                                }
                            </Container>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Toolbar sx={{ minHeight: isDesktop ? 50 : getTopOffset() + 42 }} disableGutters />
            </Box>

            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />

            {isOpenLoginModal && (
                <CustomDialog
                    id={'login'}
                    open={isOpenLoginModal}
                    title={'Login to your account'}
                    content={<Login onParentClose={handleClose} />}
                    fullScreen
                    showX={true}
                    onClose={handleClose}
                />
            )}
        </React.Fragment>
    );
};

export default Header;
