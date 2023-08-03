import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from "@mui/styles";
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { CancelRounded } from '@mui/icons-material';
import authAPI from '@Components/utils/authAPI';
import SearchResults from '@Components/Search/SearchResults';

const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: "14px",
        },
    }
});

const LoadLBSearch = ({ pageLink = "" }) => {
    const router = useRouter()
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:900px)');
    const [results, setresults] = useState();
    const [searchTxt, setsearchTxt] = useState("");
    const [loading, setloading] = useState(false);
    const searchRef = useRef();
    const typingTimer = useRef(null);

    useEffect(() => {
        return () => {
            reset()
        }
    }, []);

    useEffect(() => {
        reset()
    }, [router]);

    const reset = () => {
        clearTimeout(typingTimer.current);
        setresults()
        setsearchTxt("")
    }

    const handleChange = (e) => {
        clearTimeout(typingTimer.current);
        let val = e.target.value
        searchRef.current.value = val
        typingTimer.current = setTimeout(() => {
            setsearchTxt(searchRef.current.value)
            if (searchRef.current.value.length > 2) {
                setloading(true)
                getSearchResults()
            }
        }, 300);
    }
    const getSearchResults = async () => {
        let body = {
            searchval: searchRef.current.value,
            isLB: true
        };
        const url = `${process.env.server}/info/findEntity`;

        const response = await authAPI(url, body, 'POST', false);
        if (!response.error) {
            if (response.data.ERROBJ.ERRORCODE == 0) {
                setresults(response.data.searchresult)
            }
        }
        setloading(false)
    }

    useEffect(() => {
        searchRef?.current && (searchRef.current.value = searchTxt)
    }, [searchTxt]);

    return (
        <React.Fragment>
            <Box sx={{ position: "relative" }}>
                <TextField
                    color="white"
                    sx={{
                        borderRadius: 2,
                        bgcolor: "white.main",
                        border: 0,
                        [`& fieldset`]: {
                            border: 0,
                        },
                    }}
                    classes={{ root: classes.customTextField }}
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="Enter the name of your favourite tipster"
                    inputRef={searchRef}
                    onChange={handleChange}
                    onBlur={() => {
                        setTimeout(() => {
                            if (searchRef.current && Array.from(searchRef.current.parentElement.classList).indexOf("Mui-focused") == -1) {
                                clearTimeout(typingTimer.current);
                            }
                        }, 100);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="black" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                {
                                    searchTxt.length > 0 &&
                                    <CancelRounded
                                        fontSize='small'
                                        color="grey"
                                        sx={{ p: 0, cursor: "pointer" }}
                                        onClick={() => setsearchTxt("")}
                                    />
                                }
                            </InputAdornment>
                        ),
                        type: 'text',
                    }}
                />
                {
                    searchTxt?.length > 0 &&
                    <Box sx={{
                        position: "absolute",
                        top: 50,
                        bgcolor: "background.default",
                        px: 1,
                        pb: 1,
                        zIndex: 99,
                        width: 1,
                        maxHeight: 300,
                        overflowY: "auto"
                    }}>
                        <SearchResults results={results} setresults={setresults} searchTxt={searchTxt} loading={loading} islB={true} pageLink={pageLink} />
                    </Box>
                }
            </Box>
        </React.Fragment>
    );
};

export default LoadLBSearch;