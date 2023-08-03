import { Grid } from '@mui/material';

const PageContentLayout = ({ children, title }) => {


    const SubHeader = ({ title = 'Wagering Rules' }) => {
        return (
            <Grid
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'primary.main',
                    paddingTop: 2,
                    paddingBottom: 8,
                }}
            >
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: 18,
                        color:'#fff'
                    }}
                >
                    {title}
                </span>
            </Grid>
        );
    }

    return (
        <>
            <SubHeader title={title} />
            <div
                style={{
                    position: 'relative',
                    top: -70,
                    height: 'auto',
                    backgroundColor: 'white',
                    borderRadius: 6,
                    margin: 16,
                    marginBottom: 80,
                    paddingTop: 16,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    {/* <img
                        style={{
                            width: '45%',
                            height: '100%',
                            marginLeft: -20,
                        }}
                        src={`/images/svg/tagline.svg`}
                    /> */}
                </div>
                <div style={{ paddingTop: 20 }}>{children}</div>
            </div>
        </>
    );
};


export default PageContentLayout;