import React from 'react';
// imports for getting the user session object
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/Link';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { isHotBetWidget } from '@Components/utils/util';

const LoadBrandLogo = ({ isDesktop }) => {
    const isGTO = process.env.APP_BRAND == 'gto';
    const router = useRouter();
    const [session] = useSession();
    const [path, setPath] = React.useState(router.asPath);
    const [backbtn, setBackBtn] = useState(false);

    function storePathValues() {
        const storage = globalThis?.localStorage;
        const prevpath = storage.getItem('history') ? JSON.parse(storage.getItem('history')) : [];
        const fromBack = storage.getItem('prevpath') ? storage.getItem('prevpath') : '0';
        const currentpath = globalThis.location.pathname;
        let tempArr = prevpath;
        let flag = chkBackBtn();
        setBackBtn(false);
        //Check if Back button applicable
        if (flag) {
            //check level 1
            if (process.env.level1.indexOf(currentpath) > -1) {
                storage.setItem('history', []);
            } else {
                setBackBtn(true);
                if (fromBack == '0') {
                    let count = path.indexOf('sports') > -1 ? 4 : 3;
                    //skip level 3 pages
                    (path.match(/\//g) || []).length < count && tempArr.findIndex((item) => item == path) == -1 && tempArr.push(path);
                    storage.setItem('history', JSON.stringify(tempArr));
                }
            }
        } else {
            storage.setItem('history', []);
        }
        storage.setItem('prevpath', '0');
    }
    function chkBackBtn() {
        const currentpath = globalThis.location.pathname;
        let flag = process.env.enableBackBtn.findIndex((item) => currentpath.includes(item)) > -1;
        return flag;
    }
    useEffect(() => {
        if (router.asPath.indexOf('[') == -1) {
            setPath(router.asPath);
            storePathValues();
            return () => {
                setBackBtn(false);
            };
        }
    }, [router.asPath]);

    const goToPreviousPage = () => {
        const storage = globalThis?.localStorage;
        const prevpath = storage.getItem('history') ? JSON.parse(storage.getItem('history')) : [];
        let path = prevpath && prevpath[prevpath.length - 1];
        prevpath.pop();
        storage.setItem('history', JSON.stringify(prevpath));
        storage.setItem('prevpath', '1');
        router.push(path);
    };
    let hbWidget = isHotBetWidget()
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box pl={backbtn || session ? 1 : 0} sx={{ display: 'flex' }}>
                {backbtn && !isDesktop && !hbWidget ? (
                    <ArrowBackIosNewIcon
                        fontSize="15"
                        onClick={goToPreviousPage}
                        color={process.env.APP_BRAND === 'gto' ? 'white' : 'primary'}
                    />
                ) : (
                    !hbWidget && <Link href="/">
                        {session && !isDesktop ? (
                            <img
                                src={`${process.env.cdn}/images/logo/logo-short.svg`}
                                alt={process.env.client.sitelabel}
                                height="20"
                                style={{ cursor: 'pointer' }}
                            />
                        ) : (
                            <img
                                src={`${process.env.cdn}/images/logo/logo.svg`}
                                alt={process.env.client.sitelabel}
                                className="logo"
                                style={{ cursor: 'pointer', width: isGTO ? 120 : "auto" }}
                            />
                        )}
                    </Link>
                )}
            </Box>
        </Box>
    );
};

export default LoadBrandLogo;
