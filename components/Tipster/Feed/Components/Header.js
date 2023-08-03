import AvatarUpload from '@Components/Avatar/AvatarUpload';
import { Box, Avatar, Typography, Chip } from '@mui/material';

import Title from '@Components/Tipster/Stats/StyledComponents/Title';

import CustomChip from './CustomChip';
import Link from 'next/Link';
import { getTipsterAlias } from '@Components/utils/util';

function Header({ avatar, showChip, name, mediaGroup }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: '10px',
                marginBottom: '10px',
                borderBottom: '1px solid #e5e5e6',
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                }}
            >
                {avatar && (
                    <Link href={`/tipster/${getTipsterAlias(name)}`}>
                        <Avatar
                            alt="Current User"
                            sx={{ width: 50, height: 50, cursor: "pointer" }}
                            src={`${process.env.cdn}/images/avatar/${avatar}`} />
                    </Link>
                )
                }

                <Box sx={{ marginLeft: '15px', lineHeight: 1 }}>
                    <Link href={`/tipster/${getTipsterAlias(name)}`}>
                        <Typography fontWeight={'bold'} fontSize={16} sx={{ cursor: 'pointer' }}>
                            {name || ''}
                        </Typography>
                    </Link>
                    <br />
                    {/* <Title weight={'bold'} size="medium" marginTop={'0px'}>
                    </Title> */}
                    <Typography fontSize={13}>{mediaGroup || ''}</Typography>
                    {/* TODO: Replace with this avatar when available
                    <Avatar
                    alt="Logo"
                    sx={{ width: 50, height: 20, marginTop: '5px' }}
                    src={`${process.env.cdn}/images/avatar/${avatar}`}
                /> */}
                </Box>
            </Box>
            {showChip && (
                <Box>
                    <CustomChip text={showChip} color={'white.main'} backgroundColor={'primary.main'} />
                    {/* <Chip size="small" label={showChip} color="primary" /> */}
                </Box>
            )}
        </Box>
    );
}

export default Header;
