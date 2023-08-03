import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton } from '@mui/material';
import LoadSearchModal from './LoadSearchModal';

const LoadSearch = () => {
    const [openSearch, setopenSearch] = useState(false);
    const handleSearch = () => {
        setopenSearch(!openSearch)
    }
    return (
        <React.Fragment>
            <IconButton
                onClick={handleSearch}
                color="white"
                aria-label="SearchIcon"
                sx={{
                    minWidth: "auto",
                    p: 0,
                    mr: 0.5
                }}>
                <SearchIcon />
            </IconButton>
            <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: 'border.divider' }}
            />
            <LoadSearchModal open={openSearch} handleSearch={handleSearch} setopenSearch={setopenSearch} />
        </React.Fragment>
    );
};

export default LoadSearch;