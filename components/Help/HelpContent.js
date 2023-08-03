import { Grid, Stack } from '@mui/material';
import YellowAccordion from '@Components/Shared/YellowAccordion';

export const HelpContent = ({ content, customStyle }) => {
    if (!content) return <></>;
    return (
        <Grid item xs={12} sx={{ bgcolor: 'background.default' }}>
            {content?.contentset?.pageintro && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: content?.contentset?.pageintro,
                    }}
                    style={{
                        color: 'black',
                        fontSize: 12,
                        backgroundColor: 'white',
                        padding: '8px 24px 24px',
                    }}
                />
            )}
            {content?.contentset?.pagesection?.map(
                ({ SECTITLE, SECSUBTITLE, SECCONTENT }, index) => (
                    <YellowAccordion title={`${index + 1}. ${SECTITLE}`} key={index}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                            sx={{ ...customStyle }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-end"
                                spacing={0}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: SECSUBTITLE,
                                    }}
                                    style={{ color: 'black', fontSize: 12 }}
                                />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: SECCONTENT,
                                    }}
                                    style={{ color: 'black', fontSize: 12 }}
                                    className="raw-html-content"
                                />
                            </Stack>
                        </Stack>
                    </YellowAccordion>
                )
            )}
        </Grid>
    );
};
