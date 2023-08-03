import React from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

const FooterAppDownload = (props) => {
    const router = useRouter();
    const onLink = () => {
        router.push({
            pathname: "/help/android-download",
        });
        if (props.handleClose) {
            props.handleClose();
        }
    };
    return (
        <Stack direction="column">
            <a href={process.env.client.iOSAppLink} target="_blank" rel="noreferrer">
                <img src="/images/footer/iOS_App.png" />
            </a>
            <img src="/images/footer/android_App.png" style={{ cursor: "pointer" }} onClick={onLink} />
        </Stack>
    );
};

export default FooterAppDownload;