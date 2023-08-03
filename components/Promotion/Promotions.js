import * as React from "react";
import { Box, Typography, Alert } from "@mui/material";

import Button from "@mui/material/Button";
import BoxDivider from "../Shared/BoxDivider";
import { PromotionDetail } from "./PromotionDetail";
import Grid from "@mui/material/Grid";

export const Promotions = ({ filter, isDesktop = false, promotionDetails }) => {
  let filtered = (filter === undefined || filter === "" || filter === "ALL") ? promotionDetails.promoset : (promotionDetails.promoset.filter((row) => row.PROMOCATEGORY.split(",").indexOf(filter) > -1));
  //let filtered = promotionDetails.promoset
  return (
    <Box sx={{ mx: isDesktop ? 0 : 2, my: 2 }}>
      <Grid container spacing={isDesktop ? 2 : 0}>
        {filtered.length > 0 ?
          filtered.map((card, idx) =>
            <React.Fragment key={idx}>
              <Grid item xs={isDesktop ? 6 : 12} >
                <PromotionDetail key={idx} card={card} isDesktop={isDesktop} banners={promotionDetails.bannerset} />
              </Grid>
              {
                idx < filtered.length - 1 && !isDesktop &&
                <Grid item xs={12} >
                  <BoxDivider />
                </Grid>
              }
            </React.Fragment>
          )
          : <Typography mt={1} ml={2}>
            <Alert sx={{ display: 'flex' }} severity="warning">No promotions exist for this category</Alert>
          </Typography>
        }
      </Grid>


    </Box>
  );
};


