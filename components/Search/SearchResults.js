import React from 'react';
import BoxDivider from '@Components/Shared/BoxDivider';
import {
    Avatar,
    Box,
    Stack,
    Typography,
    CircularProgress,

} from '@mui/material';
import { useRouter } from 'next/router';
import RenderSearchResults from './RenderSearchResults';

const renderNodata = (isTxt) => {
    return (
        <React.Fragment>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems={'center'}
                sx={{ mt: 4 }}
            >
                <Box
                    sx={{
                        bgcolor: 'grey.logobg',
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                    }}
                >
                    <img
                        alt={process.env.APP_BRAND}
                        src={`${process.env.cdn}/images/logo/logo-white.png`}
                        style={{ width: 100 }}
                    />
                </Box>
                <Typography component="p" fontSize={14} fontWeight="bold">
                    {isTxt ? 'No Results' : 'TRY SEARCHING FOR...'}
                </Typography>
                <Typography component="p" fontSize={12}>
                    {isTxt
                        ? "We didn't find any results unfortunately!"
                        : 'tipster names or runners'}
                </Typography>
                <Typography component="p" fontSize={12}>
                    {isTxt ? 'Please try another search' : ''}
                </Typography>
                <Box sx={{ width: 1, my: 2 }}>
                    <BoxDivider />
                </Box>
            </Stack>
        </React.Fragment>
    );
};

const SearchResults = ({
    results, searchTxt, loading, islB = false, pageLink = "" }) => {
    const router = useRouter()
    const handleClick = (item) => {
        if (islB) {
            router.replace({
                pathname: pageLink,
                query: { search: item?.link?.replace("/tipster/", "") },
            });
        } else {
            router.push(item?.link)
        }
    }
    return (
        <Box py={2} >
            {
                searchTxt.length > 0 ? (
                    loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                my: 5,
                            }}
                        >
                            <CircularProgress
                                thickness={1.5}
                                color="grey"
                                size={50}
                                sx={{ mr: 1 }}
                            />
                        </Box>
                    ) : results && results.length > 0 ? (
                        searchTxt.length > 2 ? (
                            <Box>
                                <RenderSearchResults
                                    results={results}
                                    handleClick={handleClick} />
                            </Box>
                        ) : (
                            renderNodata(false)
                        )
                    ) : (
                        renderNodata(true)
                    )
                ) : (
                    renderNodata(false)
                )
            }
        </Box >
    );
};

export default SearchResults;
