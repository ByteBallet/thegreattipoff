import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import CustomCard from './CustomCard';
import NextUpMenu from '@Components/BetHome/NextUpMenu';
import QuickLinks from './QuickLinks';
import SportsAToZ from '@Components/Sports/SportsAToZ';

const DesktopLeftMenu = () => {
    const router = useRouter();
    let path = router.pathname
    return (
        <aside className='page-content-left' style={{ marginRight: 10 }}>
            <Grid container rowSpacing={1} columnSpacing={0}>
                {
                    path.includes("racing") &&
                    <Grid item xs={12}>
                        <CustomCard
                            title="Next to go"
                            content={
                                <NextUpMenu />
                            }
                        />
                    </Grid>
                }
                {
                    path.includes("sports") &&
                    <Grid item xs={12}>
                        <CustomCard
                            title="Sports A-Z"
                            content={
                                <SportsAToZ />
                            }
                        />
                    </Grid>
                }
                <Grid item xs={12}>
                    <CustomCard
                        title="Quick Links"
                        isTable={false}
                        content={
                            <QuickLinks hideData={path.includes("sports")} />
                        }
                    />
                </Grid>
            </Grid>

        </aside>
    );
};

export default DesktopLeftMenu;