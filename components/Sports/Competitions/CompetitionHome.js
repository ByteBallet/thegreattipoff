import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import authAPI from '@Components/utils/authAPI';
import { UserContext } from '@Context/User/UserProvider';
import CustomTitle from '@Components/Shared/CustomTitle';
import CustomTabs from '@Components/Shared/CustomTabs';
import { Box, Stack, Tabs, CircularProgress, Grid, Typography, Button } from '@mui/material';
import CompetitionTile from './CompetitionTile'

const useStyles = makeStyles((theme) => ({
    "@keyframes blink": {
        "50%": {
            borderColor: theme.palette.white.main
        }
    },
    subMarketsGlow: {
        border: `2px ${theme.palette.primary.main} solid`,
        borderRadius: 8,
        animation: "blink 1s step-end infinite alternate",
        paddingLeft: 8
    },
    subMarkets: {
        border: `2px transparent solid`,
    }
}))

const CompetitionHome = ({ sport, comp, sc }) => {
    const classes = useStyles();
    const { user } = useContext(UserContext)
    const [matches, setmatches] = useState([]);
    const [productmenu, setproductmenu] = useState();
    const [hassubmarkets, setsubmarkets] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setactiveTab] = useState(0);
    const [render, setRender] = useState(false);
    const [animateMarket, setanimateMarkets] = useState(false);
    let products = []

    async function getRoundMatches() {
        let body = {
            sportcode: sport,
            sportgroup: comp,
            clientid: user.clientID ? user.clientID : "",
        };
        const url = `${process.env.server}/sports/GetRoundMatches`;

        const response = await authAPI(url, body, 'POST', false);
        if (!response.error) {
            if (response.data.ERROBJ.ERRORCODE == 0) {
                setmatches(response.data.roundMatch)
                setproductmenu(response.data.productmenu)
                setsubmarkets(response.data.hassubmarkets)
            }
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        getRoundMatches();
    }, []);

    useEffect(() => {
        if (render) {
            setIsLoading(true);
            getRoundMatches();
        }
    }, [render]);

    productmenu && (
        Object.keys(productmenu).map(key => {
            if (productmenu[key].status === true) {
                key.indexOf("margin") == -1 && products.push(productmenu[key].label)
            }
        }
        )
    )

    const handleTabChange = (event, newValue) => {
        setactiveTab(newValue)
    };
    return (
        <Box>
            <CustomTitle
                title={comp.replace(/_/g, ' ')}
                logo={
                    <img
                        style={{
                            width: 25,
                            height: 25
                        }}
                        src={`/images/svg/icon-${sc}.svg`}
                    />}
            />
            {isLoading && <p style={{ textAlign: 'center' }}><CircularProgress color="primary" /></p>}
            {
                !isLoading && matches.length > 0 &&
                <Box>
                    <Grid container rowSpacing={0} columnSpacing={1}>
                        <Grid container item xs={12}>
                            <Box
                                sx={{
                                    bgcolor: "text.active",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "center"
                                }}
                                p={1}>
                                <CustomTabs
                                    tabs={products.sort()}
                                    handler={handleTabChange}
                                    active={activeTab}
                                    label="Product Menu"
                                    showscrollbuttons={false}
                                />
                                {
                                    <Button onClick={() => setanimateMarkets(true)}><Typography align="right" fontSize={12} >All markets</Typography></Button>
                                }
                            </Box>
                        </Grid>
                        {
                            matches.map((match, idx) =>
                                <Grid container item xs={12} key={idx}>
                                    <CompetitionTile
                                        sport={match}
                                        key={idx}
                                        setRender={setRender}
                                        type={products[activeTab].toLowerCase()}
                                        link={`/sports/${sport}/${comp}/${match.eventid}`}
                                        styles={classes}
                                        animateMarket={animateMarket}
                                        isSGM={match.sgm && (products[activeTab].toLowerCase() == "line" || products[activeTab].toLowerCase() == "h2h" || products[activeTab].toLowerCase() == "total")}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </Box>
            }

            {matches && matches.length == 0 && !isLoading &&
                <Typography
                    component="p"
                    py={1}
                    px={2}
                    fontSize={14}
                    align="center"
                >
                    No Data Available
                </Typography>
            }
        </Box>
    );
};

export default CompetitionHome;