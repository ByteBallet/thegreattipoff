import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '@Context/User/UserProvider';
import authAPI from '@Components/utils/authAPI';

function usePackageDefaults(setvalues) {
    const { user } = useContext(UserContext);
    const [status, setStatus] = useState({
        error: false,
        loading: false,
    });

    const cachedGetDetails = useCallback(async function getDetails() {
        const url = `${process.env.server}/tippackage/getPackageDefaults`;
        setStatus({
            loading: true,
            error: false,
        });
        try {
            const response = await authAPI(url, { userid: user.userID }, 'POST', true);
            if (!response.error) {
                const data = response.data;
                setvalues((value) => ({
                    ...value,
                    name: data.currentpackage[0]?.TITLE ?? '😄',
                    desc: data.currentpackage[0]?.DESCRIPT ?? '😄',
                    sale: data.pricedefaults?.packageprice ?? 5000,
                    sub: data.pricedefaults?.subscriptprice ?? 5000,
                    packid: data.currentpackage[0]?.PACKID ?? '😄',
                }));
            }
        } catch (err) {
            console.log('Error in usePackage Hook', err);
            setStatus({
                loading: false,
                error: true,
            });
        } finally {
            setStatus({
                loading: false,
                error: false,
            });
        }
    }, []);

    useEffect(() => {
        cachedGetDetails();
    }, []);

    return { status };
}

export default usePackageDefaults;
