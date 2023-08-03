import React from 'react';
import { Stack, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from 'next/Link';
import { useMobileDetect } from '@Components/utils/util';
import moment from 'moment';

const DownloadAppBanner = ({ setshowBanner, isDesktop, showBanner }) => {
    let device = useMobileDetect();

    const isGTO = process.env.APP_BRAND === 'gto';

    if (isGTO) {
        // TODO: Show custom app banner for gto
        return null;
    }

    const handleBanner = () => {
        localStorage.setItem(
            'appBanner',
            JSON.stringify({
                status: 0,
                createdAt: moment().format('YYYY-MM-DD'),
            })
        );
        setshowBanner(false);
    };
    return (
        <React.Fragment>
            {!isDesktop && showBanner && process.env.client.showBanner == 'true' ? (
                <Stack
                    sx={{
                        bgcolor: 'white.main',
                        px: 1,
                        width: 1,
                        height: '67px',
                    }}
                    direction="row"
                    alignItems="start"
                    justifyContent="space-between"
                >
                    <IconButton
                        onClick={handleBanner}
                        aria-label="close"
                        sx={{
                            color: 'black.main',
                            fontSize: 25,
                            p: 0,
                        }}
                    >
                        <CancelIcon sx={{ mt: 1 }} fontSize="20" />
                    </IconButton>
                    {device == 'iOS' ? (
                        <a href={process.env.client.iOSAppLink} target="_blank" rel="noreferrer">
                            <img
                                src={`/images/tools/app-download.png`}
                                alt={process.env.client.sitelabel}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </a>
                    ) : (
                        <Link href={'/help/android-download'}>
                            <img
                                src={`/images/tools/app-download.png`}
                                alt={process.env.client.sitelabel}
                                style={{
                                    width: '90%',
                                    height: '100%',
                                    cursor: "pointer"
                                }}
                            />
                        </Link>
                    )}
                </Stack>
            ) : null}
        </React.Fragment>
    );
};

export default DownloadAppBanner;
