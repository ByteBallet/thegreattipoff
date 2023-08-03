import updateToken from './updateToken';
import { getSession } from 'next-auth/client';
import { signOut } from 'next-auth/client';
import sendAlert from '@services/Shared/sendAlert';
import { MobileType } from '@Components/utils/util';
import { useSession } from 'next-auth/client';
import { UserContext } from '@Context/User/UserProvider';
import { useContext } from 'react';

const logOut = () => {
    localStorage.getItem('race_settings') ? localStorage.removeItem('race_settings') : null;
    sessionStorage.clear();
    signOut({
        redirect: false,
    });
};

export default async function authAPI(url, body = {}, method, auth = false) {
    const isGTO = process.env.APP_BRAND == 'gto';
    try {
        let count = 0;
        let device = MobileType() === 'desktop' ? 'desktop' : 'mobile';
        if (auth) {
            const updatedSession = await getSession();
        }
        let options = {
            method: method,
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                XAPIGTO: process.env.APP_BRAND.toUpperCase(),
                Device: device,
            },
        };
        if (method === 'POST') {
            options.body = JSON.stringify(body);
        }
        do {
            try {
                count++;
                if (auth) {
                    const updatedSession = await getSession();
                    if (!updatedSession && !updatedSession.user) {
                        return { error: true, desc: 'Unauthorized request' };
                    }
                    options.headers.Authorization = updatedSession.user.accesstoken;
                }
                const responseJson = await (await fetch(url, options)).json();

                if (responseJson.ERROBJ?.ERRORCODE === 1) {
                    return { error: true, desc: responseJson.ERROBJ.ERRORDESC };
                } else if (responseJson.ERROBJ?.ERRORCODE === 403) {
                    if (count === 5) {
                        return {
                            error: true,
                            desc: responseJson.ERROBJ.ERRORDESC,
                        };
                    }
                    const update = await updateToken();
                    if (!update) {
                        return {
                            error: true,
                            desc: 'Unauthorized request',
                        };
                    } else {
                        continue;
                    }
                } else if (responseJson.ERROBJ?.ERRORCODE === 802) {
                    if (auth) {
                        logOut();
                    }
                    return { error: true, desc: responseJson.ERROBJ.ERRORDESC };
                } else if (responseJson.ERROBJ?.ERRORCODE > 0 && isGTO) {
                    return { error: true, desc: responseJson.ERROBJ.ERRORDESC, data: responseJson };
                }
                else {
                    return { error: false, data: responseJson };
                }
            } catch (e) {
                if (url.indexOf('getRacePrices') == -1) {
                    sendAlert('', 0, '', 'url - ' + url.split('/').pop() + ' payload -' + JSON.stringify(body), '404 FAIL', 1);
                }
                return {
                    error: true,
                    desc: 'Oops unexpected error. Please try again.',
                    e,
                };
            }
        } while (count < 5);
    } catch (error) {
        return {
            error: true,
            desc: 'Oops unexpected error. Please try again.',
            error,
        };
    }
}
