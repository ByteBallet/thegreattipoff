import { Box, IconButton, Stack, Typography, Snackbar, SnackbarContent } from '@mui/material';
import {
    FacebookShareButton,
    EmailShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    EmailIcon,
    WhatsappIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'react-share';

// import TelegramIcon from '@mui/icons-material/Telegram';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareIcon from '@mui/icons-material/Share';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NumberFormat from 'react-number-format';

import Twitter_Square from '@public/images/svg/square-twitter.svg';
import Facebook_Square from '@public/images/svg/square-facebook.svg';
import Whatsapp_Square from '@public/images/svg/square-whatsapp.svg';
import Telegram_Square from '@public/images/svg/telegram.svg';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';

import CustomALert from '@Components/Shared/CustomALert';

const iconSize = 60;
const bRadius = 10;
const round = false;

function Share({
    shareUrl,
    showText = true,
    bg = 'light',
    heading = 'Get my tips at theGreatTipoff now',
    headingAlt = 'Get my tips at theGreatTipoff now',
    shareHeading = 'Share your link to earn more from your tips',
}) {
    const title = heading;

    const [isCopied, setIsCopied] = useState(false);
    const [value, setValue] = useState('');

    const onCopyText = () => {
        setIsCopied(true);
        setValue(shareUrl);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };

    function View({ IconComponent, text, color }) {
        return (
            <Stack direction="column">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '45px',
                        width: '45px',
                    }}
                >
                    {/* <IconComponent sx={{ fontSize: 45, color: color }} /> */}
                    <IconComponent size={45} round={round} color={color} borderRadius={bRadius} sx={{ fontSize: 45 }} />
                </Box>
                <Typography textAlign={'center'} fontSize={12} color="grey.dark" mt={1}>
                    {text}
                </Typography>
            </Stack>
        );
    }

    function ViewImage({ imagePath, text }) {
        return (
            <Stack direction="column" alignItems={'center'} justifyContent={'center'}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '45px',
                        width: '45px',
                    }}
                >
                    {/* <IconComponent sx={{ fontSize: 45, color: color }} /> */}
                    <img
                        style={{
                            width: 45,
                            height: 45,
                        }}
                        src={imagePath}
                    />
                </Box>
                <Typography textAlign={'center'} fontSize={12} color={bg == 'dark' ? 'white.main' : 'grey.dark'} mt={1}>
                    {text}
                </Typography>
            </Stack>
        );
    }
    return (
        <Box py={1}>
            {showText && (
                <Stack direction="row" justifyContent={'center'} alignItems="center">
                    <Typography fontSize={16} py={1} color={bg == 'light' ? 'black.main' : 'white.main'}>
                        {shareHeading}
                    </Typography>
                </Stack>
            )}
            <Stack
                direction={'row'}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    backgroundColor: bg == 'light' ? 'white.main' : 'background.legs',
                    py: 2,
                    borderRadius: 1,
                }}
            >
                <CopyToClipboard text={shareUrl} onCopy={onCopyText}>
                    {/* <EmailIcon size={iconSize} round={round} borderRadius={bRadius} /> */}
                    {/* <View IconComponent={ShareIcon} text={'Copy'} color={'#657786'} /> */}
                    <Stack direction="column">
                        <IconButton
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '45px',
                                width: '45px',
                            }}
                        >
                            {/* <IconComponent sx={{ fontSize: 45, color: color }} /> */}
                            {/* <ShareIcon size={iconSize} round={round} borderRadius={bRadius} sx={{ fontSize: 45 }} /> */}
                            <img
                                style={{
                                    width: 45,
                                    height: 45,
                                }}
                                src={`/images/social/Copy-Icon.png`}
                            />
                        </IconButton>
                        <Typography textAlign={'center'} fontSize={12} color={bg == 'dark' ? 'white.main' : 'grey.dark'} mt={1}>
                            Copy
                        </Typography>
                    </Stack>
                </CopyToClipboard>

                <FacebookMessengerShareButton quote={title} url={shareUrl} appId="153035831473449">
                    {/* <View IconComponent={FacebookIcon} text={'Facebook'} color={'#4267B2'} /> */}
                    <ViewImage imagePath={`/images/social/Messenger-Icon.png`} text={'Messenger'} />
                </FacebookMessengerShareButton>

                <TwitterShareButton title={title} url={shareUrl}>
                    {/* <View IconComponent={TwitterIcon} text={'Twitter'} color={'#1DA1F2'} /> */}
                    {/* <TwitterIcon size={iconSize} round={round} borderRadius={bRadius} /> */}
                    <ViewImage imagePath={`/images/social/Twitter-Icon.png`} text={'Twitter'} />
                </TwitterShareButton>

                <WhatsappShareButton title={headingAlt} url={shareUrl}>
                    {/* <View IconComponent={WhatsappIcon} text={'WhatsApp'} color={'#25D366'} /> */}
                    {/* <WhatsappIcon size={iconSize} round={round} borderRadius={bRadius} /> */}
                    <ViewImage imagePath={`/images/social/WhatsApp-icon.png`} text={'WhatsApp'} />
                </WhatsappShareButton>

                <TelegramShareButton title={headingAlt} url={shareUrl}>
                    {/* <View IconComponent={TelegramIcon} text={'Telegram'} color={'#2AABEE'} /> */}
                    {/* <WhatsappIcon size={iconSize} round={round} borderRadius={bRadius} /> */}
                    <ViewImage imagePath={`/images/social/Telegram-Icon.png`} text={'Telegram'} />
                </TelegramShareButton>
            </Stack>

            <Box>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={isCopied}
                    autoHideDuration={5000}
                    onClose={() => setIsCopied(false)}
                    sx={{ bottom: { xs: 60, sm: 0 } }}
                    onClick={() => setIsCopied(false)}
                >
                    <SnackbarContent
                        sx={{
                            bgcolor: `success.alert`,
                            width: '100%',
                            border: 1.5,
                            borderColor: `success.alerttext`,
                            color: `success.alerttext`,
                        }}
                        message={
                            <Stack direction="column" justifyContent="center" alignItems="center" sx={{ py: 1 }}>
                                <Typography
                                    color="inherit"
                                    fontSize={13}
                                    fontWeight="bold"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckCircleIcon sx={{ color: `success.alerttext`, mr: 0.5 }} fontSize="small" />
                                    Link Copied
                                </Typography>
                            </Stack>
                        }
                    />
                </Snackbar>
            </Box>
        </Box>
    );
}

export default Share;
