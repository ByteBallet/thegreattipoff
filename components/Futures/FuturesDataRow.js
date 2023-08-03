import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../../Context/User/UserProvider";
import { Grid, Box } from "@mui/material";

const FuturesDataRow = (props) => {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const onLink = (href) => {
        router.push({
            pathname: href,
        });
    };
    const rmeet = props.nextjump.eventname.toLowerCase().trim();
    const pagelink = "/futures/" + props.nextjump.eventname.replace(/ /g, '_') + "/" + props.nextjump.raceid;
    let local_date = moment.utc(props.nextjump.eventdate).local().format("DD MMM YY");
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            borderBottom: props.showborder ? 1 : 0,
            borderColor: 'grey.border1',
            mx: 2,
            display: 'flex',
            alignItems: "center",
            cursor: "pointer"
        }}>
            <Grid container onClick={() => onLink(pagelink)} alignItems="center" >
                <Grid item xs={8}>
                    <Stack direction="row" alignItems="center">
                        <Typography mr={0.5} fontSize={14} className="textCapitalize">
                            {rmeet}
                        </Typography>
                        <Typography color="grey.dark" fontSize={12}>
                            {props.nextjump.area}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={4} justifyContent="flex-end">
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                        <Typography align="right" fontSize={13}>{local_date}</Typography>
                        <KeyboardArrowRightOutlinedIcon fontSize="20" sx={{ mt: 1 }} />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FuturesDataRow;
