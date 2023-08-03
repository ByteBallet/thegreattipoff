import { getTextColor } from '@Components/utils/util';
import { Switch } from '@mui/material';
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "64px",
    height: "30px",
    padding: "0px"
  },
  switchBase: {
    color: "#d3d3d3",
    padding: "2px",
    "&$checked": {
      "& + $track": {
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  thumb: {
    color: "white",
    width: "26px",
    height: "26px",
    margin: "0px"
  },
  track: {
    borderRadius: "28px",
    backgroundColor: "#d3d3d3",
    opacity: "1",
    "&:after, &:before": {
      color: getTextColor(theme.palette.primary.main),
      fontSize: "12px",
      position: "absolute",
      top: "6px"
    },
    "&:after": {
      content: "'Yes'",
      fontSize: '12px',
      fontWeight: 'bold',
      left: "8px",
      top: '6px',
    },
    "&:before": {
      content: "''",
      right: "7px"
    }
  },
  checked: {
    color: `${theme.palette.primary.main} !important`,
    transform: "translateX(34px) !important",
    opacity: "1",
  }
}));

const CustomSwitch = (props) => {

  const classes = useStyles();

  return (
    <Switch {...props}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      name="checkBox"
      inputProps={{ "aria-label": "secondary checkbox" }}
      sx={{
        '& .MuiSwitch-switchBase': {
          '&.Mui-checked': {
            '& + .MuiSwitch-track': {
              opacity: 1,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
        },
      }}
    />

  )
}

export default CustomSwitch;