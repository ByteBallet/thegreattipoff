import React, { useEffect, useRef, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Dialog, DialogContent, DialogTitle, IconButton, InputAdornment, Slide, TextField, useMediaQuery } from '@mui/material';
import SearchResults from './SearchResults';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";
import { CancelRounded } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import authAPI from '@Components/utils/authAPI';
import { useRouter } from 'next/router';
import { getTextColor } from '@Components/utils/util';
import { useTheme } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    customTextField: {
        "& input::placeholder": {
            fontSize: "14px",
        },
    }
});

const LoadSearchModal = ({ handleSearch, open, setopenSearch }) => {
    const theme = useTheme();
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
        !open && reset()
    }, [open]);

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
            searchval: searchRef.current.value
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

    useEffect(() => {
        open && setopenSearch(false)
        return () => {
            reset()
        }
    }, [router])


    return (
        <Dialog
            open={open}
            onClose={handleSearch}
            disablePortal={false}
            TransitionComponent={Transition}
            fullScreen={!isDesktop}
            fullWidth
            aria-labelledby="serach-dialog-title"
            aria-describedby="search-dialog-description"
            sx={{
                zIndex: (theme) => theme.zIndex.modal - 100,
            }}
            BackdropProps={{
                sx: {
                    transform: { sm: 'translateY(65px)' },
                },
            }}
            PaperProps={{
                sx: {
                    minHeight: { md: 500 },
                    maxHeight: { md: 500 }
                }
            }}
        >
            <DialogTitle
                id="search-dialog-title"
                sx={{
                    bgcolor: "primary.main",
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    px: 1.5
                }}>
                {!isDesktop &&
                    <IconButton
                        aria-label="close"
                        onClick={handleSearch}
                        sx={{
                            wdith: "20%",
                            pl: 0,
                            cursor: "pointer",
                            color: getTextColor(theme.palette.primary.main),
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                }
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
                    placeholder="Search for tipster names or runners..."
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
                {isDesktop &&
                    <IconButton
                        aria-label="close"
                        onClick={handleSearch}
                        sx={{
                            color: getTextColor(theme.palette.primary.main)
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            </DialogTitle>
            <DialogContent sx={{ bgcolor: "background.default", px: 2 }}>
                <SearchResults results={results} setresults={setresults} searchTxt={searchTxt} loading={loading} />
            </DialogContent>
        </Dialog>
    );
};

export default LoadSearchModal;