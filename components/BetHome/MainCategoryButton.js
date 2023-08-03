import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Home from "../../styles/Home.module.css";

export const MainCategoryButton = ({
  onClickFunc,
  activeCategory,
  value,
  icon,
  activeColor,
  disabled,
  type = "racing"
}) => {
  return (
    <Button
      disabled={disabled ? disabled : false}
      size="medium"
      onClick={() => {
        onClickFunc(value);
      }}
      sx={{
        bgcolor: activeCategory == value ? activeColor : "transparent",
        fontWeight: activeCategory == value ? "bold" : "normal",
        '&:hover': {
          bgcolor: activeCategory == value ? activeColor : "transparent",
        },
      }}
      className={type == "sports" ? Home.optnSportsBtn : Home.homeoptnBtn}
    >
      {icon}
      &nbsp;&nbsp;<b><Typography
        fontSize={14}
        color={activeCategory == value ? "inherit" : type == "sports" ? "info.comment" : "inherit"}
        sx={{
          ml: value == "Racing" ? 1 : 0,
          fontWeight: activeCategory == value ? "bold" : "normal",
        }}>
        {value}</Typography></b>
    </Button>
  );
};
