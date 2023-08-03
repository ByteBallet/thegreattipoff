import { Typography, Box, Grid, Link } from "@mui/material";
import { useContext, useState, useEffect, useCallback, useRef, memo } from "react";
import { UserContext } from "@Context/User/UserProvider";
import { fetchVerifyID } from '@lib/fetcher';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import IDVerificationPanel from '@Components/MyAccount/verifications/IDVerificationPanel';

export default function VerifyStatus({ clientID }) {
  const router = useRouter();
  const { addUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isVerified, setVerified] = useState([]);

  const _fetchIsVerified = async (clientid) => {
    setLoading(true);
    const userSession = await getSession();
    const _res0 = await fetchVerifyID({ clientid: clientid, status: 'check' });
    if (_res0.error) {
    } else {
      let _res = _res0.data;
      console.log("VerifyStatus:_res", _res);
      userSession && userSession.user && !userSession.user.verified && (addUser({
        ...userSession.user,
        verified: _res.verified,
        greenIDToken: 0
      }))
      setVerified({
        verifiedStatus: _res.verified,
        verifyStatuscode: _res.ERROBJ.ERRORCODE,
        verifyStatusdesc: _res.ERROBJ.ERRORDESC
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (clientID) {
      setLoading(true);
      console.log("VerifyStatus:useEffect:_res", clientID);
      _fetchIsVerified(clientID);
    }
  }, [clientID]);

  const handleVerifyAccount = () => {
    // alert('handleVerifyAccount');
    router.push({
      pathname: '/myaccount/verifyID',
    });
  }

  return (
    <Box sx={{ my: 0, pb: 2, mb: 5 }}>
      {!loading && <Box sx={{ px: 2 }}>
        <IDVerificationPanel
          isVerified={isVerified}
          nomsg={false}
          handleVerifyAccount={handleVerifyAccount}
          hideVerify={true}
        />
      </Box>
      }
    </Box>
  )

}

const styles = {
  mainContainer: {
    borderRadius: 4,
    mx: 2,
  },
  container: {
    padding: 16,
    // paddingHorizontal:24,
    // paddingTop: 32,
    // paddingBottom: 48,
  },
  prolog: {
    fontSize: 13,
    textAlign: 'left',
    lineHeight: '1.4',
    paddingBottom: '25',
  },
  link: {
    width: '100%',
    color: '#111',
    textDecoration: 'underline',
  }
};
