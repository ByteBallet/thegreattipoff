import { useRouter } from 'next/router';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Typography, Stack, SvgIcon } from '@mui/material';
import SportIcon from '@Components/Shared/SportIcon';
import sgm from "@public/images/svg/sgm-icon.svg";

const AllSportRow = (props) => {
    if (!"isComp" in props) {
        props.isComp = false
    }
    if (!"allsports" in props) {
        props.allsports = false
    }
    if (!"quicklink" in props) {
        props.quicklink = false
    }

    const router = useRouter();
    let pagelink = ""
    let sportdesc = ""
    let sportcode = ""
    let isSGM = false
    if (props.isComp) {
        sportcode = props.sportcode
        sportdesc = props.sport?.sportlabel?.replace(/\//g, '_')
        pagelink = props.sport.eventid != 0 ? `/sports/event/${props.type}/${sportdesc.split(' ').join('_')}/${props.sport.eventid}` : `/sports/${props.type}/${sportdesc.split(' ').join('_')}`
        isSGM = props.sport.sgm
    } else {
        sportcode = props.data.sportcode
        sportdesc = props.data?.sportdesc?.replace(/\//g, '_')
        pagelink = `/sports/${sportdesc?.split(' ')?.join('_')}`
        isSGM = props.data.sgm
    }

    const svgIconPath = `/images/svg/icon-${sportcode}.svg`;
    const onLink = (href) => {
        router.push({
            pathname: href + `/${sportcode}`
        });
    };
    return (
        <TableRow
            key={sportdesc}
            onClick={() => onLink(pagelink)}
            sx={{
                cursor: "pointer"
            }}
        >
            {
                props.allsports ?
                    <TableCell
                        align="left"
                        padding="none"
                        style={{ width: 40, height: 40 }}
                    >
                         <img
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 15,
                            }}
                            src={svgIconPath}
                        />

                    </TableCell> :

                    <TableCell
                        align="left"
                        padding="none"
                        size="medium"
                        style={{ width: 40 }}
                    >
                        <img
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 15,
                            }}
                            src={svgIconPath}
                        />
                    </TableCell>

            }
            <TableCell padding="none" size="medium" sx={{ maxWidth: 150 }}>
                <Typography className="data-row-tilte-text" >
                    {sportdesc?.replace(/_/g, '/')}
                </Typography>
            </TableCell>
            <TableCell padding="none" style={{ paddingLeft: '1px' }}>
                {isSGM && !props.quicklink &&
                    <SvgIcon
                        fontSize='small'
                        sx={{ width: 30, mt: 1.5 }}
                        color="grey.light"
                        component={sgm}
                        viewBox="0 0 2032.96 1048.56"
                    />
                }
            </TableCell>
            {
                !props.allsports &&
                <TableCell padding="none" align="right">
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        <KeyboardArrowRightOutlinedIcon fontSize="20" sx={{ mt: 1 }} />
                    </Stack>
                </TableCell>
            }
        </TableRow>
    );
};

export default AllSportRow;
