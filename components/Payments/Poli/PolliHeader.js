import React from 'react';

import { Container, Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function PoliHeader(props) {
    const { type = 0 } = props;
    if (type == 0) {
        return (
            <Container sx={styles.linear}>
                <Box>
                    <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>
                        POLi
                    </Typography>
                </Box>
                <Box>
                    <Image
                        src="/images/tools/POLi.png"
                        width={50}
                        height={20}
                        alt="POLi"
                    />
                </Box>
            </Container>
        );
    }
    return (
        <Container sx={styles.center}>
            <Image src="/images/tools/POLi.png" width={75} height={25} alt="POLi" />
        </Container>
    );
}

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        pt: 2,
        pb: 1,
        px: 0,
    },
    linear: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottom: 1,
        borderColor: 'grey.light',
        pt: 2,
        pb: 1,
        px: 0,
        cursor: 'pointer',
    },
};
