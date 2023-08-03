import React, { useContext, useState } from 'react';
import { BottomNavigation, SvgIcon } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import { Paper } from '@mui/material';
import { useRouter } from 'next/router';

import home from '@public/images/svg/home-icon.svg';
import alarm from '@public/images/svg/alarm.svg';
import menu from '@public/images/svg/menu-icon.svg';
import tipping from '@public/images/svg/tipping-icon.svg';
import gettips from '@public/images/svg/get-tips-icon.svg';
import racing from '@public/images/svg/horse-racing1.svg';
import sports from '@public/images/svg/sports-icon1.svg';
import profile from '@public/images/svg/profile.svg';
import MenuDrawer from '@Components/Menu/MenuDrawer';
import { UserContext } from '@Context/User/UserProvider';

import CustomDialog from '@Components/Shared/CustomDialog';

import Login from '@Components/user/Login';
import { getTipsterAlias } from '@Components/utils/util';

const Footer = ({ handleOpenLoginModal }) => {
    const router = useRouter();
    const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

    const { user } = useContext(UserContext);

    const loggedIn = user?.userID ? true : false;

    const activeTab =
        router.pathname.indexOf('racing') > 0 ? (process.env.APP_BRAND == 'gto' ? 2 : 1) : router.pathname.indexOf('sports') > 0 ? 2 : 0;
    const [value, setValue] = React.useState(activeTab);
    const onLink = (href) => {
        router.push(href);
    };
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLoginModalToggle = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
    };

    return (
        <footer>
            <Paper
                sx={{
                    position: 'fixed',
                    bottom: -2,
                    left: 0,
                    right: 0,
                    py: 0,
                    border: 1,
                    borderColor: 'grey.primary',
                    borderRadius: '0',
                    zIndex: 3,
                }}
                elevation={0}
                className="footerIcons"
            >
                <BottomNavigation showLabels value={value} onChange={handleTabChange} sx={{ px: 2, height: '50px' }}>
                    <BottomNavigationAction
                        label="Home"
                        icon={<SvgIcon component={home} viewBox="0 0 234.45 200.04" sx={{ width: 20, height: 20 }} />}
                        onClick={() => onLink('/')}
                        sx={{ color: 'grey.light' }}
                    />
                    {process.env.APP_BRAND == 'gto' ? (
                        <BottomNavigationAction
                            label="Get Tips"
                            icon={<SvgIcon component={gettips} viewBox="0 0 300.22 323.8" sx={{ width: 20, height: 20 }} />}
                            onClick={() => onLink('/horse-racing-tips')}
                            sx={{ color: 'grey.light' }}
                        />
                    ) : (
                        <BottomNavigationAction
                            label="Racing"
                            icon={<SvgIcon component={racing} viewBox="0 0 466.36 510.95" sx={{ width: 20, height: 20 }} />}
                            onClick={() => onLink('/racing')}
                            sx={{ color: 'grey.light' }}
                        />
                    )}
                    {process.env.APP_BRAND == 'gto' ? (
                        <BottomNavigationAction
                            label="Tipping"
                            icon={<SvgIcon component={tipping} viewBox="0 0 512 512" sx={{ width: 20, height: 20 }} />}
                            onClick={() => onLink('/racing')}
                            sx={{ color: 'grey.light' }}
                        />
                    ) : (
                        <BottomNavigationAction
                            label="Sport"
                            icon={<SvgIcon component={sports} viewBox="0 0 100.67 100.65" sx={{ width: 20, height: 20 }} />}
                            onClick={() => onLink('/sports')}
                            sx={{ color: 'grey.light' }}
                        />
                    )}
                    {process.env.APP_BRAND == 'gto' ? (
                        <BottomNavigationAction
                            label="Profile"
                            icon={<SvgIcon component={profile} viewBox="0 0 448 512" sx={{ width: 20, height: 20 }} />}
                            onClick={() => {
                                if (loggedIn) {
                                    onLink(`/tipster/${getTipsterAlias(user.alias)}`);
                                } else {
                                    setIsOpenLoginModal(true);
                                }
                            }}
                            sx={{ color: 'grey.light' }}
                        />
                    ) : (
                        <BottomNavigationAction
                            label="Next up"
                            icon={<SvgIcon component={alarm} viewBox="0 0 512 512" sx={{ width: 20, height: 20 }} />}
                            onClick={() => onLink('/nextup')}
                            sx={{ color: 'grey.light' }}
                        />
                    )}
                    <BottomNavigationAction
                        label="Menu"
                        icon={<SvgIcon component={menu} viewBox="0 0 384.24 298.17" sx={{ width: 20, height: 20 }} />}
                        onClick={() => setMenuDrawerOpen(true)}
                        sx={{ color: 'grey.light' }}
                    />
                </BottomNavigation>
            </Paper>
            {menuDrawerOpen && (
                <MenuDrawer open={menuDrawerOpen} setopenBetSlip={setMenuDrawerOpen} handleOpenLoginModal={handleOpenLoginModal} />
            )}

            <CustomDialog
                id={'login'}
                open={isOpenLoginModal}
                title={'Login to your account'}
                content={<Login onParentClose={handleLoginModalToggle} />}
                fullScreen
                showX
                onClose={handleLoginModalToggle}
            />
        </footer>
    );
};

export default Footer;
