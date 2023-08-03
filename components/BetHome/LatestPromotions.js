import React from 'react';
import { useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Box, Container, Stack, useMediaQuery } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import BoxDivider from '../Shared/BoxDivider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Home from '../../styles/Home.module.css';

import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { useSession } from 'next-auth/client';
import IconButton from '@mui/material/IconButton';
import { useRouter } from "next/router";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { PromotionDetail } from '@Components/Promotion/PromotionDetail';
import { UserContext } from '@Context/User/UserProvider';
import { getPromotions } from '@services/promotion/promotionService';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Promotions = ({ isLoggedIn }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [expanded, setExpanded] = React.useState(false);
    const [index, setIndex] = React.useState('');
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [promotionDetails, setpromotionDetails] = React.useState();
    const [session] = useSession();
    const handleExpandClick = (idx) => {
        setExpanded(!expanded);
        setIndex(idx);
    };

    const onLink = (href) => {
        router.push({
            pathname: href,
        });
    };
    useEffect(() => {
        const getPromotion = async () => {
            const resp = await getPromotions(user.promo, user.clientID ? user.clientID : "", "home");
            if (resp && !resp.error) {
                if (resp.data.ERROBJ && resp.data.ERROBJ.ERRORCODE == 0) {
                    setpromotionDetails(resp.data.PROMOTIONS)
                }
            }
        }
        getPromotion()
    }, [isLoggedIn])
    return (
        <React.Fragment>
            {
                !isLoggedIn && !isDesktop &&
                <Box m={2}>
                    <Typography >
                        <Alert sx={{ display: 'flex' }} severity="warning">Please login to see the latest promotions</Alert>
                    </Typography>
                </Box>
            }
            {
                promotionDetails && promotionDetails.promoset && promotionDetails.promoset.length > 0 &&
                <Box sx={{ mx: isDesktop ? 0 : 2 }}>
                    {
                        isDesktop ?
                            <Stack direction="row" alignItems="center" justifyContent="space-between"
                                sx={{
                                    bgcolor: "black.main",
                                    borderTopLeftRadius: 6,
                                    borderTopRightRadius: 6,
                                    mb: 1,
                                    borderTop: 1
                                }}>
                                <Typography
                                    variant="h2"
                                    component="p"
                                    fontWeight="fontWeightBold"
                                    color="white.main"
                                    sx={{ fontSize: 14, px: 2 }}
                                >
                                    Promotions
                                </Typography>
                                <Button
                                    variant="text"
                                    onClick={() => onLink("/promotions")}
                                    color="white"
                                    sx={{
                                        fontSize: 12
                                    }}>
                                    more < KeyboardArrowRightOutlinedIcon />
                                </Button>
                            </Stack>
                            :

                            <Typography
                                variant="h2"
                                component="p"
                                fontWeight="fontWeightBold"
                                my={2}
                                sx={{ fontSize: 16, mt: 0, mb: 1 }}
                            >
                                Latest Promotions
                            </Typography>
                    }
                    {
                        promotionDetails && promotionDetails.promoset && promotionDetails.promoset.length > 0 &&
                        <Box>
                            <Grid container spacing={2}>
                                {promotionDetails.promoset.length > 0 ?
                                    promotionDetails.promoset.map((card, idx) =>
                                        <React.Fragment key={idx}>
                                            <Grid item xs={isDesktop ? 6 : 12} >
                                                <PromotionDetail key={idx} card={card} isDesktop={isDesktop} banners={promotionDetails.bannerset} cols={12} />
                                            </Grid>
                                        </React.Fragment>
                                    )
                                    : null
                                }
                            </Grid>
                        </Box>
                    }
                    {
                        !isDesktop &&
                        <React.Fragment>
                            <Button
                                variant="text"
                                onClick={() => onLink("/promotions")}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    color: '#000',
                                    fontSize: 13,
                                    mt: 1,
                                    width: "100%"
                                }}
                            >
                                View More <KeyboardArrowRightOutlinedIcon fontSize="small" />
                            </Button>
                            <BoxDivider />
                        </React.Fragment>
                    }
                </Box>
            }
        </React.Fragment>

    );
};

export default Promotions;


