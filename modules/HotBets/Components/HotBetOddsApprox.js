import React from 'react';
import { FormControl, MenuItem, Select, Box, Typography, Stack, Avatar, Grid } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const HotBetOddsApprox = ({ oddsRange, raceid, userid, racingPageTopButton = false }) => {
    let options = oddsRange.filter((item) => (item.USERID == userid && item.RACEID == raceid))

    const RenderOptions = (item, isSingle = false) => {
        return <Stack
            direction="column"
            alignItems={racingPageTopButton ? "end" : "start"}
            justifyContent={racingPageTopButton ? "end" : "start"}
            mb={1}>
            <Typography sx={{ fontSize: 12, display: "flex", flexDirection: "row", alignItems: "center" }} fontWeight="bold">
                {item.ODDSLABEL}
                {
                    item.NTIPSDAY > 1 &&
                    <Typography fontWeight="bold" color="black.main" fontSize={10} sx={{ ml: 0.4 }}>
                        ({item.NTIPSDAY})
                    </Typography>
                }
            </Typography>
            <Typography
                component="p"
                noWrap
                sx={{ lineHeight: 1, color: "grey.hb", fontSize: 12 }}>
                approx
            </Typography>
        </Stack>
    }
    return (
        <Box sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: options && options.length > 1 ? "start" : "center",
            width: 1,
            mr: (options && options.length > 1) ? 0 : (racingPageTopButton ? 1.5 : 0)
        }}>
            {
                options && options.length > 0 &&
                <React.Fragment>
                    {
                        options.length > 1 ?
                            <FormControl
                                fullWidth
                                variant="outlined"
                                sx={{
                                    cursor: "pointer",
                                    ".MuiSelect-icon": {
                                        color: "black.main",
                                        fontSize: 20
                                    },
                                    ".MuiOutlinedInput-notchedOutline": {
                                        border: 0,
                                    },
                                    ".MuiSelect-select": {
                                        padding: " 3px 15px 3px 10px "
                                    },
                                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        border: "none",
                                        borderRadius: "5px 5px 0 0",
                                    },
                                }}>
                                <Select
                                    autoWidth
                                    value={0}
                                    className="textCapitalize "
                                    MenuProps={{
                                        transitionDuration: 0,
                                        PaperProps: {
                                            style: {
                                                minWidth: "18vh"
                                            }
                                        }
                                    }}
                                    IconComponent={KeyboardArrowDownIcon}>
                                    {options.map((item, idx) => (
                                        <MenuItem key={idx} value={idx}>
                                            {RenderOptions(item)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            :
                            <Box >
                                {RenderOptions(options[0], true)}
                            </Box>
                    }
                </React.Fragment>
            }
        </Box>
    );
};

export default HotBetOddsApprox;