import { BoxDivider2 } from "@Components/Payments/Layout/UserDepositLayout";
import { Typography, Box, Grid } from "@mui/material";
// import { fetchVerifyID } from '@lib/fetcher';
import { useContext, useState, useEffect, useRef, memo } from "react";
import { UserContext } from "@Context/User/UserProvider";
import Link from "next/Link";


const Page = (props) => {
  return <Box component="iframe" src={props.clientid} sx={{
    p: 2,
    width: '100%',
    height: '1080px',
    backgroundColor: 'white'
  }}
    frameBorder="0"
  />
}

const WrappedPage = memo(Page)


export default function VerifyForm(props) {

  const { user } = useContext(UserContext);
  const srcref = useRef(`/greenid2?clientid=${encodeURIComponent(user.clientID)}`);

  const prologs = [
    `Government legislation requires to verify your identify within 3 days of joining ${process.env.client.clientname}.`,
    'To ensure you can keep betting with us and withdraw any winnings, please provide your identification details below.',
  ];

  return (
    <Box sx={{ my: 0, pb: 2, mb: 5 }}>
      <Box sx={styles.mainContainer}>
        <Grid container spacing={2} pt={2}>
          {prologs.map((p, idx) => (
            <Grid item xs={12} key={idx}>
              <Typography>
                <Box sx={styles.prolog}>{p}</Box>
              </Typography>
            </Grid>
          ))}
          <Grid item xs={12} key={prologs.length}>
            <Typography sx={{ mb: 5 }}>
              <Box variant="span" sx={styles.prolog}>
                If you require assistance to verify your account, {' '}
                <Link
                  href="/help/contactus"
                  sx={styles.link}
                >
                  contact us here
                </Link>
                .
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <BoxDivider2 />
      <Box sx={{ p: 0 }}>
        {/* Box for the iframe to host the GreenID */}
        <WrappedPage clientid={srcref.current} />
      </Box>
    </Box>
  )

}

const styles = {
  mainContainer: {
    borderRadius: 4,
    mx: 2,
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
    cursor: "pointer"
  }

  // textFieldStyle: {
  //     backgroundColor: 'grey.joinField',
  //     borderRadius: 2,

  //     '& input::placeholder': {
  //         fontSize: '13px',
  //     },
  //     [`& fieldset`]: {
  //         borderColor: 'grey.joinBorder',

  //         borderRadius: 2,
  //         '&.focused': {
  //             borderColor: 'red',
  //         },
  //     },

  //     fontSize: 14,
  //     '& .MuiOutlinedInput-root': {
  //         '&.Mui-focused': {
  //             backgroundColor: 'white.main',
  //         },
  //         // '&.Mui-focused fieldset': {
  //         //     borderColor: 'green',
  //         // },
  //     },
  // },
};
