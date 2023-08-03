import { useEffect, useState } from 'react';

import { Grid, Box, Typography, Button, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Component import
import Password from '../UpdateDetails/Password';
import Personal from '../UpdateDetails/Personal';
import Contact from '../UpdateDetails/Contact';
import Address from '../UpdateDetails/Address';
import AvatarUpload from '../Avatar/AvatarUpload';
import DefaultAlias from '../UpdateDetails/DefaultAlias';
// imports for getting the user session object
import { useSession } from 'next-auth/client';

// custom style for placeholder text in input
const useStyles = makeStyles({
    customTextField: {
        '& input::placeholder': {
            fontSize: '14px',
        },
    },
});

function UpdateDetails() {
    const [error, setError] = useState(false);

    const [user, setUser] = useState([]);

    // session contains the user details if loggedin, if null user not logged in
    const [session, loading] = useSession();

    const classes = useStyles();

    const fontLabel = 14;

    useEffect(() => {
        async function getUserDetails() {
            const url = `${process.env.server}/user/getUserDetail`;
            const response = await authAPI(
                url,
                { userid: session.user.userID },
                'POST',
                true
            );
            if (!response.error) {
                if (error) setError(false);
                setUser(response.data.user);
            } else {
                setError(true);
            }
        }
        if (session && session.user) {
            getUserDetails();
        }
    }, []);

    console.log(user);

    if ((!session && !loading) || error) {
        return <div>TODO: Logged out client state management here</div>;
    }

    return (
        <Box sx={{ my: 2, mx: 0 }}>
            <Grid container>
                <Grid item sx={{ mx: 2 }}>
                    <Typography sx={{ mb: 0, mt: 1 }} variant="h1">
                        Your Information
                    </Typography>
                </Grid>
                <Grid justifyContent="center" item sx={{ mx: 2 }}>
                    <Typography variant="p" textAlign="center">
                        Please provide accurate information, so you can make
                        purchases & sell tips.
                    </Typography>
                </Grid>
            </Grid>

            <AvatarUpload
                image={
                    user && user.length
                        ? `${process.env.cdn}/images/avatar/${user[0].AVATARPATH}`
                        : undefined
                }
                dimensions={{ width: 125, height: 125 }}
                showUpdate={true}
                userID={session ? session.user.userID : null}
                iconAction={false}
            />

            <DefaultAlias
                alias={user && user.length ? user[0].ALIAS : ''}
                firstName={user && user.length ? user[0].FIRSTNAME : ''}
                surName={user && user.length ? user[0].SURNAME : ''}
                dispalias={user && user.length ? user[0].DISPALIAS : 0}
                userID={session ? session.user.userID : null}
            />
            <Password
                customTextField={classes.customTextField}
                fontLabel={fontLabel}
                alias={user && user.length ? user[0].ALIAS : null}
                userID={session ? session.user.userID : null}
            />
            <Personal
                customTextField={classes.customTextField}
                fontLabel={fontLabel}
                firstName={user && user.length ? user[0].FIRSTNAME : null}
                surName={user && user.length ? user[0].SURNAME : null}
                dob={user && user.length ? user[0].DOB : null}
                userID={session ? session.user.userID : null}
            />
            <Contact
                customTextField={classes.customTextField}
                fontLabel={fontLabel}
                email={user && user.length ? user[0].EMAIL : null}
                mobile={user && user.length ? user[0].MOBILE : null}
                userID={session ? session.user.userID : null}
            />
            <Address
                customTextField={classes.customTextField}
                fontLabel={fontLabel}
                aptNo={user && user.length ? user[0].UNIT : null}
                stNo={user && user.length ? user[0].STNUMBER : null}
                stName={user && user.length ? user[0].STREET : null}
                stType={user && user.length ? user[0].STREETTYPE : null}
                suburb={user && user.length ? user[0].SUBURB : null}
                state={user && user.length ? user[0].STATE : null}
                postCode={user && user.length ? user[0].POSTCODE : null}
                country={user && user.length ? user[0].COUNTRY : null}
                userID={session ? session.user.userID : null}
            />
        </Box>
    );
}

export default UpdateDetails;
