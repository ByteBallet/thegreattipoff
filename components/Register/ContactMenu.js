import { Box, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Router, useRouter } from 'next/router';

function ButtonComp(props) {
    return (
        <Box
            sx={{
                backgroundColor: 'white.main',
                p: 2,
                width: '100%',
                mr: props.r ? props.r : 0,
                borderRadius: 2,
            }}
            onClick={() => props.callback(props.type)}
        >
            <div style={styles.wrapperIcon}>
                <Box sx={styles.icon}>{props.type == 'phone' ? <PhoneIcon fontSize="medium" /> : <EmailIcon fontSize="medium" />}</Box>
            </div>
            <div style={{ ...styles.wrapperIcon, marginBottom: 0 }}>
                <Typography sx={{ fontSize: 12 }}>{props.value}</Typography>
            </div>
        </Box>
    );
}

export default function ContactMenu() {
    const showSupport = process.env.client.support.showSupportMessage === 'true';
    function callback(type) {
        if (type == 'email') window.open(`mailto:${process.env.client.support.email}?subject=Help%20Logging%20into%20my%20account&body`);
        if (type == 'phone') window.open(`tel:${process.env.client.support.phone}`);
    }

    const router = useRouter();

    // if (!showSupport) return <></>;
    return (
        <Box sx={styles.container}>
            {process.env.client.name !== 'gto' ? (
                <>
                    <ButtonComp type="phone" value={process.env.client.support.phone} callback={callback} r={1} />
                    <ButtonComp type="email" value="Email Support" callback={callback} />
                </>
            ) : (
                <>
                    <ButtonComp
                        type="email"
                        value="Contact Support"
                        callback={() => {
                            router.push({
                                pathname: 'https://thegreattipoff.com/info/contact', // TODO: Change to dynamic
                            });
                        }}
                    />
                </>
            )}
        </Box>
    );
}

const styles = {
    container: {
        display: 'flex',

        width: '100%',
        mt: 1,
        py: 2,
    },
    wrapperIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 5,
    },
    icon: {
        border: 2,

        borderRadius: 100,
        height: 50,
        width: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0.5,
        backgroundColor: 'primary.main',
        color: 'white.main',
    },
};
