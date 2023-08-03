import React from 'react';
import Link from 'next/Link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { Card, CardContent, Typography, Box, Grid, Stack } from '@mui/material';
import { HOME_TIPPING_MENU, HOME_TOOLS_MENU } from '@lib/constants';
import { UserContext } from '@Context/User/UserProvider';
import { useContext, useState } from 'react';
import LazyLoad from 'react-lazy-load';

const Login = dynamic(() => import('@Components/user/Login'));
const CustomDialog = dynamic(() => import('@Components/Shared/CustomDialog'));

const Products = ({ title, showText, isDesktop, isBetting = false }) => {
    const [login, setLogin] = useState(false);
    const { user } = useContext(UserContext);
    const menu = title.indexOf('Tipping') > -1 ? HOME_TIPPING_MENU : HOME_TOOLS_MENU;
    const handleOpenLogin = () => setLogin(true);
    const handleCloseLogin = () => {
        setLogin(false);
    };

    const Title = () => {
        return (
            <Stack direction={'row'} paddingX={isDesktop ? 2.5 : 0} sx={{ pb: { xs: 1, md: 0 }, pt: { xs: 0, md: 1.5 } }}>
                {isDesktop && !isBetting ? (
                    <>
                        <Typography fontSize={16} component="p" fontWeight="fontWeightBold">
                            {title}
                        </Typography>
                        <Typography variant="p" component="div">
                            {' '}
                            - Earn{' '}
                            <Typography variant="p" component="span" color="primary">
                                $${' '}
                            </Typography>
                            3 ways
                        </Typography>
                    </>
                ) : (
                    <Typography fontSize={16} component="p" fontWeight="fontWeightBold" mt={title.indexOf('Tipping') > -1 ? 2 : 0}>
                        {title}
                    </Typography>
                )}
            </Stack>
        );
    };
    return (
        <React.Fragment>
            <Box>
                <Title />
                <Card>
                    <CardContent>
                        {!isDesktop && showText && (
                            <Typography variant="h2" component="div" fontWeight="fontWeightBold" mb={2}>
                                Earn{' '}
                                <Typography variant="h2" component="span" fontWeight="fontWeightBold" color="primary">
                                    $$
                                </Typography>{' '}
                                3 ways
                            </Typography>
                        )}
                        <Grid container gap={1} sx={{ mb: 2 }}>
                            {menu.map((item, idx) => (
                                <Grid item xs={12} key={idx} sx={{ cursor: 'pointer' }}>
                                    {item?.restricted ? (
                                        user?.userID ? (
                                            <Link href={item?.to}>
                                                <Image
                                                    src={`/images/tools/${item?.icon}.png`}
                                                    width="100%"
                                                    height="20%"
                                                    layout="responsive"
                                                    alt={item?.icon}
                                                />
                                            </Link>
                                        ) : (
                                            <Box onClick={handleOpenLogin}>
                                                <Image
                                                    src={`/images/tools/${item?.icon}.png`}
                                                    width="100%"
                                                    height="20%"
                                                    layout="responsive"
                                                    alt={item?.icon}
                                                />
                                            </Box>
                                        )
                                    ) : (
                                        <Link href={item?.to}>
                                            <Image src={`/images/tools/${item?.icon}.png`} width="100%" height="20%" layout="responsive" alt={item?.icon} />
                                        </Link>
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
            <LazyLoad>
                <CustomDialog
                    id={'login'}
                    open={login}
                    title={'Join or sign in to get alerts when a tipster posts their tips'}
                    content={<Login onParentClose={handleCloseLogin} />}
                    fullScreen
                    showX
                    onClose={handleCloseLogin}
                    disablePortal={false}
                />
            </LazyLoad>
        </React.Fragment>
    );
};

export default Products;
