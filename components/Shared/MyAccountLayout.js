import * as React from 'react';
import { Box, Container, SvgIcon, Typography } from '@mui/material';
import alert from '@public/images/svg/alerts-icon.svg';
import { getTextColor } from '@Components/utils/util';
import { useTheme } from '@mui/styles';

export const matchTable = {
    '/myaccount': {
        url: '/myaccount',
        title: 'My Account',
        subtitle: '',
    },
    '/myaccount/index': {
        url: '/myaccount/index',
        title: 'My Account',
        subtitle: '',
    },
    '/myaccount/mydetails': {
        url: '/myaccount/mydetails',
        title: 'My Account',
        subtitle: 'My Details',
    },
    '/myaccount/password': {
        url: '/myaccount/password',
        title: 'My Account',
        subtitle: 'Change Password',
    },
    '/myaccount/usersettings': {
        url: '/myaccount/usersettings',
        title: 'My Account',
        subtitle: 'User Settings',
    },
    '/myaccount/verifications': {
        url: '/myaccount/verifications',
        title: 'My Account',
        subtitle: 'Verification',
    },
    '/myaccount/benefits': {
        url: '/myaccount/benefits',
        title: 'My Account',
        subtitle: 'Benefits & Rewards',
    },
    '/myaccount/gambling': {
        url: '/myaccount/gambling',
        title: 'My Account',
        subtitle: 'Responsive Gambling',
    },
    '/myaccount/gambling/index': {
        url: '/myaccount/gambling/index',
        title: 'My Account',
        subtitle: 'Responsive Gambling',
    },
    '/myaccount/gambling/depositlimit': {
        url: '/myaccount/gambling/depositlimit',
        title: 'My Account',
        subtitle: 'Deposit Limit',
    },
    '/myaccount/gambling/selfexclude': {
        url: '/myaccount/gambling/selfexclude',
        title: 'My Account',
        subtitle: 'Self Exclude',
    },
    '/myaccount/promotion': {
        url: '/myaccount/promotion',
        title: '',
        subtitle: '',
    },
    '/myaccount/verifyID': {
        url: '/myaccount/verifyID',
        title: 'My Account',
        subtitle: 'Verify your identity',
    },
    '/myaccount/verifySuccess': {
        url: '/myaccount/verifySuccess',
        title: 'My Account',
        subtitle: 'Verify your identity',
    },
    '/myaccount/managealerts': {
        url: '/myaccount/managealerts',
        subtitle: 'Blackbook & Follows',
        title: 'My Account',
    },
    '/myaccount/tipping': {
        url: '/myaccount/tipping',
        subtitle: 'Tipping Settings',
        title: 'My Account',
    },
    '/myaccount/tipping/pricing': {
        url: '/myaccount/tipping/pricing',
        subtitle: 'Tip Package Pricing',
        title: 'My Account',
    },
    '/myaccount/tipping/staking': {
        url: '/myaccount/tipping/staking',
        subtitle: 'Staking Settings',
        title: 'My Account',
    },
};

// const useStyles0 = makeStyles({
//   header: {
//     backgroundColor: '#fcdc38',
//     display: 'flex',
//     fontSize: '1.2rem',
//     fontWeight: 'bold',
//     display: 'flex',
//     justifyContent: 'center',
//     paddingTop: '16px',
//     paddingBottom: '72px',
//   },
//   container: {
//     transform: 'translateY(-60px)',
//     backgroundColor: 'white',
//     margin: '0 16px',
//     width: 'auto',
//     borderRadius: '0.5rem',
//     paddingLeft: '0',
//     paddingRight: '0',
//   },
//   subtitle: {
//     display: 'flex',
//     justifyContent: 'center',
//     padding: '30px 0',
//   },
//   body: {
//     padding: 0,
//     margin: 0,
//     width: '100%',
//   }
// });
const MyAccountLayout = ({ pathname, children }) => {
    let info = matchTable[pathname];
    // const classes = useStyles0();
    const theme = useTheme()
    return (
        <Box id="myaccount_box"
            sx={{
                // height: 'inherit',
                // overflowY: "scroll",
            }}>
            <Container
                id="header"
                align="center"
                display="flex"
                sx={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    alignItems: "center",
                    bgcolor: 'primary.main',
                    pt: 2,
                    pb: 8,
                    color: getTextColor(theme.palette.primary.main)
                }}
            >
                {pathname.indexOf("managealerts") > -1 &&
                    <SvgIcon
                        fontSize='12'
                        sx={{ pl: 0, width: 25, mr: 0.5 }}
                        color="grey.light"
                        component={alert}
                        viewBox={'0 0 212 212'}
                    />}  {info.title}
            </Container>
            <Container
                sx={{
                    backgroundColor: '#e3e3e3',
                    height: '100%',
                }}
            ></Container>
            <Box
                id="container"
                sx={{
                    mx: 2,
                    px: 0,
                    my: 0,
                }}
                style={{
                    backgroundColor: 'white',
                    borderRadius: 6,
                    transform: 'translateY(-50px)',
                }}
            >
                {info.subtitle ? (
                    <Box
                        display="flex"
                        align="center"
                        sx={{
                            pt: 3,
                            pb: 1,
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: 15,
                        }}
                    >
                        {info.subtitle}
                    </Box>
                ) : (
                    void 0
                )}
                <Box sx={{ m: 0, p: 0, width: 1 }}>{children}</Box>
            </Box>
        </Box>
    );
};
export default MyAccountLayout;
