import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { getContentPagesData } from '@services/contentPages/contentPagesService';

const HeaderThree = () => {

    const [contentset, setContentset] = useState();

    const getData = async () => {
        const res = await getContentPagesData('group-1-races');
        if (res.data.contentset) {
            setContentset(res.data.contentset)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Grid item xs={12} sx={{ bgcolor: 'background.default', my: 2, mr: 2 }}>
            {contentset?.pageintro && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: contentset?.pageintro,
                    }}
                    style={{
                        color: 'black',
                        fontSize: 12,
                        backgroundColor: 'white',
                        padding: '8px 24px 24px',
                    }}
                />
            )}

        </Grid>
    );
};
export default HeaderThree;

