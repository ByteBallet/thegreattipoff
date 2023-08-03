import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Tooltip, Typography, Stack, IconButton, useMediaQuery, ClickAwayListener } from "@mui/material";
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const FormikRedioButton = ({ label, options, name }) => {
  const isDesktop = useMediaQuery('(min-width:900px)');
  const { handleChange, handleBlur, values, errors, touched } =
    useFormikContext();

  const [tooltipItem, settooltipItem] = React.useState();

  const handleTooltipClose = () => {
    settooltipItem()
  };

  const handleTooltipOpen = (val) => {
    tooltipItem == val ? settooltipItem() : settooltipItem(val)
  };

  return (
    <FormControl>
      <Typography variant="p">{label}</Typography>
      {touched[name] && errors[name] && (
        <p style={{ color: "red" }}>{errors[name]}</p>
      )}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name={name}
        onChange={handleChange(name)}
        value={values[name]}
      >
        {options.length > 0 &&
          options.map((option, idx) => (
            <Box flexDirection={"column"} sx={{ paddingTop: "10px" }} key={idx}>
              <Stack direction="row">
                <FormControlLabel
                  key={option.id}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  sx={{ width: "100%", marginRight: "15px" }}
                />
                {option?.info && isDesktop && (
                  <Tooltip title={
                    <Typography fontSize={14} color="white.main">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: option?.info,
                        }}
                      /></Typography>
                  }
                  >
                    <IconButton sx={{ pl: 0 }}>
                      <InfoOutlinedIcon sx={{ color: "info.comment" }} />
                    </IconButton>
                  </Tooltip>
                )}
                {option?.info && !isDesktop && (
                  <div>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={handleTooltipClose}
                      open={tooltipItem == option?.value}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title={
                        <Typography fontSize={14} color="white.main">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: option?.info,
                            }}
                          /></Typography>
                      }
                    >
                      <IconButton sx={{ pl: 0 }} onClick={() => handleTooltipOpen(option?.value)}>
                        <InfoOutlinedIcon sx={{ color: "info.comment" }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </Stack>
              {option?.message && values[name] == option?.value && (
                <p style={{ color: "red" }}>{option?.message}</p>
              )}
            </Box>
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default FormikRedioButton;
