import { UserContext } from '@Context/User/UserProvider';
import { Box, Button, Typography } from '@mui/material';
import { useContext, useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import CheckIcon from '@mui/icons-material/Check';

function Share() {
    const [isCopied, setIsCopied] = useState(false);
    const { user } = useContext(UserContext);
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };

    return (
        <Box sx={{ p: 2 }}>
            <CopyToClipboard
                text={`https://${process.env.client.siteweb}/tipster/${user?.alias?.replaceAll(' ', '_')}`}
                onCopy={onCopyText}
            >
                <Button fullWidth variant="contained" color="success">
                    <Typography sx={{ fontWeight: 'bold', fontSize: 16, color: 'white.main' }}>
                        {isCopied ? (
                            <Typography color="white.main" fontSize="12" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                                Copied
                                <CheckIcon color="white" />
                            </Typography>
                        ) : (
                            <Typography color="white.main" fontSize="14" fontWeight="bold">
                                Share
                            </Typography>
                        )}
                    </Typography>
                </Button>
            </CopyToClipboard>
        </Box>
    );
}

export default Share;
