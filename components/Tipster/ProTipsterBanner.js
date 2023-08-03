import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import LoadGetTips from './GetTips/LoadGetTips';

import CheckIcon from '@mui/icons-material/Check';
import LoadBetSlip from '@Components/BetSlip/LoadBetSlip';

const banner_data = ['Tips', 'Comments', 'Speed Maps'];

const ProTipsterBanner = (props) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [openGetTipsModal, setOpenGetTipsModal] = useState(false);
    const [openBetSlip, setopenBetSlip] = useState(false);
    let bg_imgsrc = isDesktop ? `/images/gto/pro-tipsters-stats-desktop.jpg` : `/images/gto/pro-tipsters-stats-mobile.png`;
    const hancleClick = () => {
        setOpenGetTipsModal(true);
    };

    const packData = props?.data?.PACKINCLUSION ?? banner_data;
    const handleBetSlip = (event) => {
        setopenBetSlip(true);
    };

    return (
        <React.Fragment>
            <Box sx={{ backgroundColor: '#0e141a', width: 1 }}>
                <Box
                    sx={{
                        background: `url(${bg_imgsrc}) no-repeat`,
                        width: 1,
                        height: '120px',
                        backgroundSize: isDesktop ? '100% 100%' : 'contain',
                        display: 'flex',
                    }}
                >
                    {isDesktop ? (
                        <Stack
                            direction="row"
                            justifyContent={'space-between'}
                            sx={{ width: '70%', pt: 1, lineHeight: 1 }}
                            alignItems="center"
                            pl={5}
                        >
                            <Stack ml={5}>
                                <Box>
                                    <Typography
                                        textAlign={'center'}
                                        color="yellow.secondary"
                                        fontWeight="bold"
                                        fontSize={24}
                                        component={'p'}
                                    >
                                        {props?.data?.ALIAS}&apos;s <br />
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        textAlign={'center'}
                                        color="white.main"
                                        fontWeight="bold"
                                        fontSize={26}
                                        pt={0}
                                        mt={-1}
                                        mb={1}
                                    >
                                        Premium Package
                                    </Typography>
                                </Box>
                            </Stack>

                            <Button
                                color="yellow"
                                sx={{
                                    background: 'linear-gradient(  rgba(245,221,146,1) 0%, rgba(221,178,55,1) 70%)',
                                    border: 2,
                                    borderRadius: '10px',
                                    borderColor: 'yellow.main',
                                    width: '180px',
                                    fontWeight: 'bold',
                                }}
                                variant="contained"
                                onClick={hancleClick}
                            >
                                Get Tips
                            </Button>
                        </Stack>
                    ) : (
                        <Stack sx={{ width: '60%', pt: 1, lineHeight: 1 }} alignItems="center">
                            <Typography color="yellow.secondary" fontWeight="bold" fontSize={19} component={'p'}>
                                {props?.data?.ALIAS}&apos;s <br />
                            </Typography>
                            <Typography color="white.main" fontWeight="bold" fontSize={20} pt={0} mt={-1} mb={1}>
                                Premium Package
                            </Typography>

                            <Button
                                color="yellow"
                                sx={{
                                    background: 'linear-gradient(  rgba(245,221,146,1) 0%, rgba(221,178,55,1) 70%)',
                                    border: 2,
                                    borderRadius: '10px',
                                    borderColor: 'yellow.main',
                                    width: '120px',
                                    fontWeight: 'bold',
                                }}
                                variant="contained"
                                onClick={hancleClick}
                            >
                                Get Tips
                            </Button>
                        </Stack>
                    )}

                    <Stack sx={{ width: '40%', pt: 1, lineHeight: 1 }} alignItems="flex-end" justifyContent={'flex-end'} pr={3} mb={2}>
                        {packData.map((item) => (
                            <Stack direction="row" key={item} alignItems={'center'}>
                                <CheckIcon sx={{ color: 'rgba(221,178,55,1)', fontSize: 16 }} />
                                <Typography color="white.main" fontWeight="bold" fontSize={14} pt={0} ml={0.5}>
                                    {item}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Box>
            <LoadGetTips
                open={openGetTipsModal}
                setOpenGetTipsModal={setOpenGetTipsModal}
                alias={props?.data?.ALIAS}
                tipster={props?.data}
                selectedCategory={null}
                selectedType={props?.data?.RACETYPE}
                selectedDate={0}
                handleBetSlip={handleBetSlip}
            />
            <LoadBetSlip open={openBetSlip} setopenBetSlip={setopenBetSlip} />
        </React.Fragment>
    );
};

export default ProTipsterBanner;
