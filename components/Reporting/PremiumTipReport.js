import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import { Avatar, Box, Typography, Divider, Container, useMediaQuery } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import PremiumReportBestBets from './PremiumReportBestBets';
import PremiumReportHearder from './PremiumReportHearder';
import PremiumReportPackages from './PremiumReportPackages';
import PremiumReportParlays from './PremiumReportParlays';
import PremiumReportRaceMeet from './PremiumReportRaceMeet';
import PremiumReportStaking from './PremiumReportStaking';
import CustomSuccessButton from '@Components/Shared/CustomSuccessButton';

const PremiumTipReport = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { user } = useContext(UserContext)
    const [report, setreport] = useState()
    const [showReport, setshowReport] = useState(false)
    const router = useRouter();
    const getReport = async () => {
        const url = `${process.env.server}/earnings/getPremiumTipReport`;
        let body = {
            userid: user?.userID,
            code: router?.query?.premiumTips?.[1]
        }
        try {
            const response = await authAPI(
                url,
                body,
                'POST',
                false
            );
            if (!response?.error && response?.data?.ERROBJ?.ERRORCODE == 0) {
                setreport(response?.data?.REPORT)
            }
        } catch (error) {
            console.log('error---', error);
        }
    }
    const renderAvatar = (w = 200, h = 200) => {
        return <Box
            sx={{
                backgroundImage: `url(${process.env.cdn}/images/racecontent/curve-v2.png)`,
                backgroundSize: "cover",
                mt: { xs: 10, md: 10 },
                mb: { xs: 3, md: 0 },
                '@media print': {
                    backgroundImage: `url(${process.env.cdn}/images/racecontent/curve-v2.png)`,
                    backgroundSize: "cover",
                    WebkitPrintColorAdjust: "exact"
                }
            }}>
            <Avatar
                src={`${process.env.cdn}/images/racecontent/reportavatar/${report?.qUser?.[0].ALIAS}-Profile.png`}
                sx={{ width: w, height: h, ml: 2, border: 4, borderColor: "white.main" }}
            />
        </Box>
    }
    const renderTitle = (title) => {
        return <Box sx={{ textAlign: "center" }}>
            <Typography
                color="white.main" fontSize={26} fontWeight="bold"
                align="center"
                sx={{
                    p: 1.5,
                    bgcolor: "background.legs",
                    position: "relative",
                    top: { xs: 0, sm: -70 },
                    '@media print': {
                        bgcolor: "background.legs",
                        WebkitPrintColorAdjust: "exact"
                    }
                }}>
                {title}
            </Typography>
        </Box>
    }
    const renderRacemeet = (title, state) => {
        return <Divider textAlign="left"
            sx={{
                my: 2,
                '&:before': {
                    border: 0,
                    width: 0
                },
                '&:after': {
                    borderColor: "primary.main",
                    borderWidth: 2,
                }
            }}
        >
            <Typography
                className='ReportRaceTitle'
                component={"p"}
                color="primary.main"
                fontSize={20}
                fontWeight="bold"
                align="center">
                {title}&nbsp;{state ? "(" + state + ")" : null}
            </Typography>
        </Divider>
    }
    useEffect(() => {
        getReport()
        return () => {
            setshowReport(false)
        }
    }, [])

    const handleBtnClick = () => {
        setshowReport(true)
    }
    return (
        <Box py={2} sx={{ position: "relative", bgcolor: "white.main" }}>
            {
                report &&
                <Container disableGutters>
                    <PremiumReportHearder report={report} isDesktop={isDesktop} />
                    {
                        !showReport &&
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} my={5}>
                            <CustomSuccessButton fullwidth={true}
                                title={`Show ${report?.qUser?.[0].FIRSTNAME} ${report?.qUser?.[0].SURNAME}'s Premium Package`}
                                handleClick={handleBtnClick}
                                rounded={false} />
                        </Box>
                    }
                    {
                        showReport &&
                        <Box py={2}>
                            <PremiumReportPackages
                                report={report}
                                renderTitle={renderTitle}
                                renderAvatar={renderAvatar}
                                renderRacemeet={renderRacemeet}
                                isDesktop={isDesktop} />
                            <PremiumReportBestBets
                                report={report}
                                renderTitle={renderTitle}
                                renderAvatar={renderAvatar}
                                renderRacemeet={renderRacemeet}
                                isDesktop={isDesktop} />
                            <PremiumReportParlays
                                report={report}
                                renderTitle={renderTitle}
                                renderAvatar={renderAvatar}
                                renderRacemeet={renderRacemeet} />
                            <PremiumReportStaking
                                report={report}
                                renderTitle={renderTitle}
                                renderAvatar={renderAvatar}
                                renderRacemeet={renderRacemeet} />
                            <PremiumReportRaceMeet
                                report={report}
                                renderTitle={renderTitle}
                                renderAvatar={renderAvatar}
                                renderRacemeet={renderRacemeet}
                                isDesktop={isDesktop} />
                            <Typography component={"p"} fontSize={14} align="center">
                                * Fixed Odds available at {moment().format("h:mm A dddd")}
                            </Typography>
                        </Box>
                    }
                </Container>
            }
        </Box>
    );
};

export default PremiumTipReport;