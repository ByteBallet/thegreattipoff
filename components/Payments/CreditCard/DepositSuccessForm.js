import { UserContext } from '@Context/User/UserProvider';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import UserDepositLayout from '../Layout/UserDepositLayout';
import SuccessForm from '../SuccessForm';

import { Grid, Box, Container, Typography, Button, Link, CircularProgress } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CircularLoader from '@Components/common/CircularLoader';
import { fetchCheckSuccess } from '@lib/deposit';

export const ErrorPanel = (props) => {
    return (
        <Container
            direction="row"
            align="center"
            sx={{
                backgroundColor: 'error.light',
                color: 'error',
                width: 1,
                py: 3,
                px: 0,
            }}
        >
            <Box item>
                <ErrorIcon color="error" size="large" />
            </Box>
            <Box item>
                <Typography
                    sx={{
                        color: 'error.main',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                >
                    Invalid Request.
                </Typography>
            </Box>
        </Container>
    );
};

const DepositSuccessForm = (props) => {
    const router = useRouter();

    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [err, seterr] = useState(false)
    const [state, setState] = useState({
        ID: "",
        amount: "",
        receipt: "",
    });

    async function getCardCC(query) {
        setLoading(true);
        let reqBody = {
            clientid: '',
            accesscode: query?.AccessCode,
            userid: user.userID,
            cartid: query?.cartid,
        };
        const _res = await fetchCheckSuccess(reqBody);
        if (_res.error == false) {
            setState(_res.data);
            if (_res?.data?.ERROBJ?.ERROR != "0" || _res?.data?.ERROBJ?.ERROR > 0) {
                seterr(true)
            }
        } else {
            //nothing
        }

        setLoading(false);
    }

    useEffect(() => {
        if (router?.query?.AccessCode && router?.query?.cartid && user?.userID) {
            getCardCC(router?.query);
        }
    }, [router, user?.userID]);

    useEffect(() => {
        if (err) {
            router.push("/deposit/creditcard?status=0")
        }
    }, [err])
    return (
        <React.Fragment>
            {
                router?.query?.userid && user?.userID &&
                <React.Fragment>
                    {
                        +router?.query?.userid !== user?.userID ?
                            <UserDepositLayout layout={3}>
                                <ErrorPanel />
                            </UserDepositLayout> :
                            <UserDepositLayout layout={3}>
                                {loading ? <>
                                    <CircularLoader />
                                </> : <SuccessForm {...state} />}
                            </UserDepositLayout>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default DepositSuccessForm;