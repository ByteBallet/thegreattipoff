import React from 'react';
import { useSession } from 'next-auth/client';
import { Button, IconButton, Stack } from '@mui/material';
import Link from 'next/Link';

import LoadHeaderMenuLoggedIn from './LoadHeaderMenuLoggedIn';
import LoadSearch from '@Components/Search/LoadSearch';
import HotBetWdigetHeader from '@Components/HotbetWidget/HotBetWdigetHeader';
import { isHotBetWidget } from '@Components/utils/util';
import CloseIcon from '@mui/icons-material/Close';

const LoadHeaderMenu = (props) => {
    const {
        isOpenLoginModal,
        handleOpenLoginModal,
        values,
        handleMenuClick,
        anchorEl,
        setValues,
    } = props;
    const [session] = useSession();
    const handleOpen = () => handleOpenLoginModal(true);
    let hbWidget = isHotBetWidget()
    return (
        <>
            {session ? (
                hbWidget ?
                    <Stack direction="row" alignItems="center" justifyContent={"space-between"} sx={{ width: "90%" }}>
                        <HotBetWdigetHeader />
                        <IconButton
                            aria-label="close"
                            onClick={() => parent?.postMessage('closeHBWidget', '*')}
                            color="white"
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                bgcolor: 'black.main',
                                p: 0.5,
                                mr: 0.5
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                    : <LoadHeaderMenuLoggedIn
                        handleMenuClick={handleMenuClick}
                        values={values}
                        anchorEl={anchorEl}
                        setValues={setValues}
                    />
            ) : (
                hbWidget ?
                    <Stack direction="row" alignItems="center" justifyContent={"space-between"} sx={{ width: "90%" }}>
                        <HotBetWdigetHeader />
                        <Button
                            color="white"
                            variant="text"
                            onClick={handleOpen}
                            size="small"
                        >
                            Log In
                        </Button>
                        <IconButton
                            aria-label="close"
                            onClick={() => parent?.postMessage('closeHBWidget', '*')}
                            color="white"
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                bgcolor: 'black.main',
                                p: 0.5,
                                mr: 0.5
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Stack> :
                    <Stack direction="row" alignItems="center">
                        {!hbWidget && <LoadSearch />}
                        <Link href={hbWidget ? "/register?Referrer=GreatTipOff" : "/register"}>
                            <Button
                                color={hbWidget ? "secondary" : "primary"}
                                size="small"
                                variant="contained"
                                sx={{ py: 0.2, fontWeight: 'bold', ml: 2, cursor: "pointer" }}
                            >
                                Join
                            </Button>
                        </Link>
                        <Button
                            color="white"
                            variant="text"
                            onClick={handleOpen}
                            size="small"
                        >
                            Log In
                        </Button>
                    </Stack>
            )}
        </>
    );
};

export default LoadHeaderMenu;
