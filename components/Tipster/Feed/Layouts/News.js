import ParentLayout from './ParentLayout';
import Header from '../Components/Header';
import { Box, Chip, Typography, Avatar, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getNewsTitle } from '@Components/utils/util';
import CustomChip from '../Components/CustomChip';

const punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
function Info({ heading, body, image, isUser }) {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const router = useRouter();
    function readMoreNews() {
        let news_title = body[0].replace(punc_regex, '');
        router.push(`/news/${getNewsTitle(body?.[0])}`);
    }

    return (
        <Box sx={{ marginBottom: '20px' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '10px',
                    lineHeight: 1,
                }}
            >
                {/* <Chip size="small" label="NEWS" color="primary" /> */}
                {!isUser && <CustomChip text="NEWS" color="white.main" backgroundColor={'primary.main'} />}
                <div>
                    <Typography
                        onClick={readMoreNews}
                        fontSize={14}
                        sx={{
                            display: 'flex',
                            fontWeight: "bold",
                            alignItems: 'center',
                            cursor: "pointer",
                            ml: 0.7,
                            mb: 1
                        }}
                    >
                        {heading}
                    </Typography>
                </div>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Box sx={{ height: '90px', cursor: "pointer", width: { xs: "45%", md: "20%" } }} onClick={readMoreNews}>
                    <Image
                        src={`${process.env.cdn}/images/latestnews/feature/${image}`}
                        alt="Twitter"
                        width={150}
                        height={100}
                    />
                </Box>

                <Box sx={{ width: { xs: "55%", md: "80%" }, lineHeight: 0.25, height: '90px', mt: -1 }}>
                    {/* <Typography
                        fontSize={13}
                        fontWeight="bold"
                        sx={{
                            display: 'flex',
                            marginLeft: '10px',
                            alignItems: 'center',
                        }}
                        className='lineClamp'
                    >
                        {body[0]}
                    </Typography> */}
                    <Box sx={{ marginLeft: '10px' }}>
                        <Typography fontSize={14} className='lineClamp4'>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: body[1] + "...",
                                }}
                            />
                        </Typography>
                        <Stack direction={'row'} mt={-0.5} justifyContent="flex-end">
                            <Typography fontSize={11} color="primary.main" fontWeight={'bold'} onClick={readMoreNews} mt={1}
                                sx={{ cursor: "pointer" }}>
                                Read More
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function News({ item, isUser }) {
    const { tipster, content } = item;
    const isDesktop = useMediaQuery('(min-width:900px)');
    let newsIntro = '';
    let length = 261;

    const newsTitleSplit = content?.newstitle.split(' ') ?? [];

    if (Array.isArray(newsTitleSplit)) {
        length = length - newsTitleSplit.length;
    }

    if (typeof content.newsintro === 'string') {
        newsIntro = isDesktop ? content?.newsintro : content?.newsintro.slice(0, length);
    }
    const TextBody = [content?.newstitle, newsIntro];

    return (
        <ParentLayout>
            <Box sx={{ lineHeight: 1 }}>
                {isUser &&
                    <Header avatar={tipster.avatarpath} showChip={'NEWS'} name={tipster.alias} mediaGroup={tipster.mediagroup} />
                }
                <Info heading={content?.newstitle ?? ''} body={TextBody} image={content?.newsimage} isUser={isUser} />
            </Box>
        </ParentLayout>
    );
}

export default News;
