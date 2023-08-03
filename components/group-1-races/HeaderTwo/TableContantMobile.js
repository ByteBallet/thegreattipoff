import { Box, Typography, Stack } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Link from 'next/Link';

const TableContantMobile = ({ data }) => {
    return (
        <> <Link href={data.URL}>
            <Stack sx={{
                backgroundColor: '#fff',
                height: '60px', flexDirection: 'row',
                borderBottom: '1px solid #d4d5d7',
                paddingTop: '10px'
            }}>
                <Box
                    align="center"
                    padding="none"
                    sx={{
                        width: 80,
                        textAlign: 'left',
                        paddingLeft: '15px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        fontSize: '13px'
                    }}
                >
                    {data.MONTH}
                </Box>
                <Box align="center" padding="none" sx={{
                    width: 80,
                    textAlign: 'left',
                    paddingLeft: '15px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    fontSize: '13px'
                }}>{data.TRACK}</Box>
                <Box align="center" padding="none" sx={{
                    width: 260,
                    textAlign: 'left',
                    paddingLeft: '10px'
                }} >
                    <Stack direction={'column'}>
                        <Typography fontWeight={'700'} fontSize={13}>{data.EVENTDESC}<br /></Typography>
                        <Stack direction={'row'} >
                            <Box sx={{
                                width: 75,
                                fontSize: '13px'
                            }}>{data.PRIZEMONEY}</Box>
                            <Box sx={{
                                width: 75,
                                fontSize: '13px'
                            }}>{data.DISTANCE}</Box>
                            <Box sx={{
                                width: 60,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                fontSize: '13px'
                            }}><Typography sx={{ whiteSpace: 'nowrap' }} fontSize={13}>{data.CONDITIONS}</Typography></Box>
                            <Box sx={{
                                fontWeight: 700,
                                paddingLeft: '5px',
                                paddingRight: '5px',
                                width: '20%'
                            }}>
                                <KeyboardArrowRightOutlinedIcon fontSize="small" />
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Link>
        </>
    )
};
export default TableContantMobile;


