import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import moment from "moment";
import { Avatar } from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/Link";
import { getNewsTitle } from "@Components/utils/util";

const VerticalCardItemDesktop = (props) => {

	const imgpath = `${process.env.cdn}/images/latestnews/thumbnail/t-${props.article.IMAGEFILENAME}`;
	let alttext = props.article.IMAGEFILENAME.replace("t-", " ");
	alttext = alttext.replace("-", " ");
	alttext = alttext.replace(".png", " ");
	alttext = alttext.replace(".jpg", " ");
	let punc_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
	let news_title = props.article.NEWSTITLE.replace(punc_regex, "");
	news_title = news_title.replace(/ /g, "-");
	const news_link = `/news/${getNewsTitle(props?.article?.NEWSTITLE)}`;

	return (
		<Link href={`/news/${getNewsTitle(props?.article?.NEWSTITLE)}`} >
			<Box sx={{ maxHeight: "auto", cursor: "pointer" }}>
				<Box height={25} pb={4}>
					{props?.index === 0 ? <Typography
						gutterBottom
						variant="subtitle2"
						sx={{ color: "primary.main", textTransform: "uppercase" }}
						underline="none"
						fontWeight="fontWeightBold" noWrap>
						{props.category}
					</Typography> : <Box />}

				</Box>
				<Avatar alt={alttext} src={imgpath}
					sx={{ width: "100%", height: "62%" }}
					variant="square"
				>
					<Avatar
						src={`${process.env.cdn}/images/latestnews/feature/Greyhound-default.jpg`}
						variant="square"
						sx={{ width: "100%", height: "100%" }}
					/>
				</Avatar>
				<Box sx={{ paddingTop: '20px' }}>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					</Box>
					<Typography variant={"subtitle1"} fontWeight="fontWeightBold" gutterBottom sx={{ lineHeight: 1.2 }}
						className="lineClamp3">
						{props.article.NEWSTITLE}
					</Typography>

					{!props.showContent && (
						<Box sx={{ display: "flex", alignItems: "center" }} mt={2}>
							<AccessTimeIcon className="font9" color="primary" />
							<Typography variant="p" className="font9" color="grey.main" sx={{ ml: 0.3 }}>
								{moment(props.article.NEWSDATE).format("DD MMM YYYY")}, {moment(props.article.NEWSTIME).format("hh:mm A")}
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Link>
	);
};

export default VerticalCardItemDesktop;
