import { Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { getSubRouteText } from '@utils/contentPage.util';
import Link from 'next/Link';
import YellowAccordion from '@Components/Shared/YellowAccordion';

const SeoPageContent = ({ content, racingTerms }) => {


    const router = useRouter()

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
            <div style={{ marginTop: '5px' }}>
                {content?.contentset?.pagesection?.map(
                    ({ SECTITLE }, index) => (
                        <Link
                            key={index}
                            href={`${router.pathname}/${getSubRouteText(SECTITLE)}`}
                        ><Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                bgcolor: "#fff",
                                padding: '10px',
                                marginBottom: '5px',
                                borderRadius: '3px',
                                cursor: 'pointer'
                            }}
                        >
                                <Typography fontSize={13} fontWeight={'600'}>{index + 1}. {SECTITLE}</Typography>
                                <KeyboardArrowRightOutlinedIcon fontSize="small" />
                            </Stack>
                        </Link>

                    )
                )}
                {racingTerms?.length > 0 && racingTerms.map(term =>
                    <YellowAccordion title={term.label.toUpperCase()} key={term.label} isRacingTerms>
                        {term.data.map(item =>
                            <Link
                                key={item}
                                href={`${router.pathname}/${getSubRouteText(item)}`}
                            ><Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{
                                    padding: '10px',
                                    marginTop: '5px',
                                    cursor: 'pointer',
                                    borderBottom:'solid',
                                    borderBottomColor:'#d4d5d7',
                                    borderBottomWidth:  '1px'
                                }}
                            >
                                    <Typography fontSize={13} fontWeight={'600'}>{item.toUpperCase().replace('-',' ')}</Typography>
                                    <KeyboardArrowRightOutlinedIcon fontSize="small" />
                                </Stack>
                            </Link>)}
                    </YellowAccordion>
                )}
            </div>
        </Grid>
    );
};

export default SeoPageContent;