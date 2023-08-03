import * as React from "react";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Home from "../../styles/Home.module.css";
import { useRouter } from 'next/router';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BoxDivider from "../../components/Shared/BoxDivider";
import CustomSuccessButton from "@Components/Shared/CustomSuccessButton";
import { Box, CardActionArea } from "@mui/material";
import { UserContext } from "@Context/User/UserProvider";
import { getPromotionsUrl } from "@services/promotion/promotionService";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const PromotionDetail = ({ card, isDesktop, banners, cols }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [showDesc, setshowDesc] = React.useState(false);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded((cur) => !cur);
  };
  const selectedBanner = banners.filter((item => item.ADTYPEID == card.ID && item.TYPEOF == (isDesktop ? "desktop" : "mobile")))

  const getPromotionUrl = async () => {
    const resp = await getPromotionsUrl(user.promo, user.clientID ? user.clientID : "", card.SPORTTYPE, card.EVENTID);
    if (resp && !resp.error) {
      if (resp.data.ERROBJ && resp.data.ERROBJ.ERRORCODE == 0) {
        if (resp.data.PAGEURL && resp.data.PAGEURL.length > 0) {
          router.push({
            pathname: resp.data.PAGEURL,
          });
        }
      }
    }
  }
  const handleClick = () => {
    if (card.EVENTID != "" && card.EVENTID != null) {
      getPromotionUrl()
    } else {
      selectedBanner.length > 0 && router.push({
        pathname: selectedBanner[0].HREF,
      });
    }
  }
  let col = router.pathname == "/" ? 6 : 12
  return (
    <Grid item xs={cols ? cols : isDesktop ? col : 12} sx={{ height: 1 }}>
      <Card sx={{ height: 1 }}>
        <CardActionArea >
          <Box onClick={handleClick}>
            {
              selectedBanner.length > 0 ?
                <CardMedia
                  component="img"
                  // height="194"
                  image={`${process.env.cdn}/images/promotions/${selectedBanner[0].IMGSRC}`}
                  alt={card.NAME}
                  sx={{ objectFit: "cover" }}
                /> :
                <CardMedia
                  component="img"
                  // height="194"
                  image={`${process.env.cdn}/images/promotions/promoImg02.PNG`}
                  alt={card.NAME}
                  sx={{ objectFit: "cover" }}
                />
            }
          </Box>
        </CardActionArea>
        <CardContent>
          <Typography fontSize={14} color="black.main">
            {card.NAME}
          </Typography>
          <Typography component="p" fontSize={14} color="black.main" >
            {card.DESCRIPTION}
          </Typography>
          {/* <Typography
            component="p"
            fontSize={12}
            color="black.main"
            onClick={() => setshowDesc(!showDesc)}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center", fontWeight: "500" }}
            mt={0.5}
            fontStyle="italic">
            {!showDesc ? "Read More" : "Read less"}
            {
              !showDesc ?
                <KeyboardArrowRightIcon sx={{ transform: "rotate(6deg)", fontSize: 15 }} /> :
                <KeyboardArrowLeftIcon sx={{ transform: "rotate(6deg)", fontSize: 15 }} />
            }
          </Typography> */}
        </CardContent>
        <CardActions
          // style={{ display: "flex", justifyContent: "space-between" }}
          className={Home.latestP}
        >
          <CustomSuccessButton
            title={card.BUTTONNAME}
            handleClick={handleClick}
          />
          <span
            className={Home.tndcSize}
            onClick={handleExpandClick}
            size="small"
            style={{ cursor: "pointer" }}
          >
            Terms & Conditions
            <ExpandMore
              expand={expanded}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon sx={{ color: "black.main" }} />
            </ExpandMore>
          </span>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <BoxDivider />
          <CardContent>
            <Box
              sx={{ fontSize: 14 }}
              dangerouslySetInnerHTML={{ __html: card.TERMS }}
            />
          </CardContent>
        </Collapse>
      </Card>
    </Grid >
  );
};
