import React from 'react';
import { Grid, Typography } from '@mui/material';
import CompetitionTile from '../Competitions/CompetitionTile';

const TrendingMarketDetails = ({ match, status, addTipToBetSlip, parentSGM, view, betsLocal }) => {
    let products = []
    match.productmenu && (
        Object.keys(match.productmenu).sort().map(key => {
            let details = {
                label: match.productmenu[key].label,
                type: key
            }
            if (match.productmenu[key].status === true) {
                if (view == "sgm" && !key.includes("margin") && !key.includes("draw")) {
                    products.push(details)
                } else if (view == "all") {
                    products.push(details)
                }
            }
        }
        )
    )
    return (
        <Grid container spacing={0}>
            {
                products.map((item, idx) =>
                    <React.Fragment key={idx}>
                        <Grid container item xs={12}>
                            <Typography fontSize={13} px={2} component="p" mt={idx == 0 ? 1 : 0}>{item.label == "H2H" ? "Head To Head" : item.label}</Typography>
                        </Grid>
                        <Grid container item xs={12}>
                            <CompetitionTile
                                sport={match}
                                setRender={null}
                                type={item.type.toLowerCase()}
                                link={null}
                                hideDetails={true}
                                isSGM={view == "sgm" ? true : (parentSGM && (item.type.toLowerCase() == "line" || item.type.toLowerCase() == "h2h" || item.type.toLowerCase() == "total"))}
                                status={status}
                                addTipToBetSlip={addTipToBetSlip}
                                hideLogo={true}
                                view={view}
                                frmMarket={true}
                                betsLocal={betsLocal}
                            />
                        </Grid>
                    </React.Fragment>
                )
            }
            {
                match.draw && view == "all" && (match.sportcode == "RGLE" || match.sportcode == "AFL" || match.sportcode == "RGUN") &&
                <React.Fragment>
                    <Grid container item xs={12}>
                        <Typography fontSize={13} px={2} component="p">Draw</Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <CompetitionTile
                            sport={match}
                            setRender={null}
                            type={"draw"}
                            link={null}
                            hideDetails={true}
                            isSGM={parentSGM}
                            status={status}
                            addTipToBetSlip={addTipToBetSlip}
                            hideLogo={true}
                            view={view}
                            frmMarket={true}
                            betsLocal={betsLocal}
                        />
                    </Grid>
                </React.Fragment>
            }
        </Grid>
    );
};

export default TrendingMarketDetails;