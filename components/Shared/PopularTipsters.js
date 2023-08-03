import { UserContext } from '@Context/User/UserProvider';
import { Avatar, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { getPopularTipsters } from '@services/Home/homeService';
import React, { useEffect, useContext, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/Link';
import { getTipsterAlias } from '@Components/utils/util';

const PopularTipsters = () => {
    const { user } = useContext(UserContext)
    const [tipsters, settipsters] = useState([])
    useEffect(() => {
        const getTipsters = async () => {
            const resp = await getPopularTipsters({ userid: user?.userID })
            settipsters(resp?.data?.popular)
        }
        getTipsters()
    }, [])

    return (
        <Card>
            <CardContent style={{ paddingBottom: 10 }}>
                <Grid container rowSpacing={1} columnSpacing={0}>
                    {
                        tipsters?.length > 0 &&
                        tipsters?.map((row, idx) =>
                            <Link key={idx} href={`/tipster/${getTipsterAlias(row?.ALIAS)}`}>
                                <Grid container xs={12} key={idx} sx={{ cursor: "pointer" }}>
                                    <Grid container xs={2.5}>
                                        <Avatar
                                            sx={{
                                                width: 45,
                                                height: 45,
                                            }}
                                            src={`${process.env.gtoImgPath}/avatar/${row?.AVATARPATH}`}
                                            alt={process.env.gtoImgPath}
                                        ></Avatar>
                                    </Grid>
                                    <Grid container xs={8.5} sx={{ pl: 1 }}>
                                        <Typography
                                            component={'p'}
                                            className="textCapitalize"
                                            color="inherit"
                                            sx={{
                                                fontSize: 14,
                                                fontWeight: 700,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {(row?.dispname == 0 ? row?.ALIAS?.toLowerCase() : row?.FIRSTNAME?.toLowerCase() + ' ' + row?.SURNAME?.toLowerCase())}
                                        </Typography>
                                        <Typography
                                            className="lineClamp"
                                            component="p"
                                            sx={{
                                                fontSize: 12,
                                                wordBreak: 'break-word',
                                            }}
                                            color="grey.main"
                                        >
                                            {row?.TIPFREQUENCY}
                                        </Typography>
                                    </Grid>
                                    <Grid container xs={1} alignItems={"center"} justifyContent={"end"}>
                                        <KeyboardArrowRightIcon />
                                    </Grid>
                                    {
                                        idx != (tipsters?.length - 1) &&
                                        <Grid container xs={12}>
                                            <Divider sx={{ borderColor: "#d0d1d2", boxShadow: "0 1px #fff", my: 1, width: 1 }} />
                                        </Grid>
                                    }
                                </Grid>
                            </Link>
                        )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PopularTipsters;