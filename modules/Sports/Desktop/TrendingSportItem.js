import { useRouter } from 'next/router';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Typography, Stack } from '@mui/material';

const TrendingSportItem = ({ data, hideArrow = false, showBorder = true }) => {
    const router = useRouter();

    const onLink = (href, sporttype) => {
        let pageurl = sporttype == "sports" ? (href + `/${data.sportcode}`) : href
        router.push({
            pathname: href
        });
    };
    let svgIconPath = `/images/svg/icon-${data.sportcode}.svg`;
    let urlLink = '';
    let label = data.eventlabel
    if (data.eventid == "") {
        urlLink = `/sports/${data.sport}/${data.sportgroup}`
    } else if (data.futureevent == 1 && data.eventid != "") {
        urlLink = `/sports/event/${data.sport}/${data.sportgroup}/${data.eventid}`
    } else {
        urlLink = `/sports/${data.sport}/${data.sportgroup}/${data.eventid}`
    }
    return (
        <TableRow
            key={label}
            onClick={() => onLink(data?.link, data?.sporttype)}
            sx={{
                cursor: "pointer"
            }}>
            <TableCell
                align="left"
                padding="none"
                size="medium"
                style={{ width: 40, height: 40 }}
                sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.border1" }}
            >
                <img
                    style={{
                        width: data.sportcode == "RGLE" ? 25 : (data?.sporttype == "sports" ? 30 : 25),
                        height: data?.sporttype == "sports" ? 30 : 20,
                        marginRight: 15,
                    }}
                    src={svgIconPath}
                />
            </TableCell>
            <TableCell padding="none" size="medium" sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.border1" }}>
                <Typography className="data-row-tilte-text lineClamp" component="p"> {label}</Typography>
            </TableCell>
            {
                !hideArrow &&
                <TableCell padding="none" size="medium" align="right"
                    sx={{ borderBottom: showBorder ? 1 : 0, borderColor: "grey.border1" }}>
                    <KeyboardArrowRightOutlinedIcon fontSize="20" sx={{ mt: 0.5 }} />
                </TableCell>
            }
        </TableRow>
    );
};

export default TrendingSportItem;
