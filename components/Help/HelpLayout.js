import { Grid, SvgIcon, Typography } from '@mui/material';

const IS_GTO = process.env.APP_BRAND == 'gto';

export const HelpLayout = ({ children, title }) => {
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
                {!IS_GTO && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            style={{
                                width: '45%',
                                height: '100%',
                                marginLeft: -20,
                            }}
                            src={`/images/svg/tagline.svg`}
                        />
                    </div>
                )}
                <div style={{ paddingTop: 20 }}>{children}</div>
            </div>
        </>
    );
};

function SubHeader({ title = 'Wagering Rules' }) {
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
            <Typography
                component={'span'}
                style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: IS_GTO ? 'white' : 'black',
                }}
            >
                {title}
            </Typography>
        </Grid>
    );
}
