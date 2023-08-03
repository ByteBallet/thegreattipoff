// Moved to brands folder

// import React, {
//     useContext,
// } from 'react';
// import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
// import { Typography, SvgIcon, TableRow, TableCell, Badge } from '@mui/material';
// import { useRouter } from 'next/router';
// import { UserContext } from '@Context/User/UserProvider';
// import moment from 'moment';

// const Item = ({ data, handleClose }) => {
//     const router = useRouter();
//     const onLink = (href) => {
//         if (href && !chk) {
//             router.push({
//                 pathname: href,
//             });
//             handleClose();
//         }
//     };
//     const { user } = useContext(UserContext);
//     let joinDateDiff = user.joindate ? moment(moment().format('YYYY-MM-DD')).diff(moment(user.joindate), "days") : 0
//     let chk = false
//     if (data?.name == "Withdraw" && !user.verified) {
//         chk = true
//     } else if (data?.name == "Deposit" && !user.verified) {
//         chk = joinDateDiff > 3 ? true : false
//     }
//     return (
//         <TableRow sx={{ padding: 13 }} onClick={() => onLink(data?.link)}>
//             {data?.icon && (
//                 <TableCell align="left" sx={{ width: 28, paddingLeft: 3 }}>
//                     <SvgIcon
//                         sx={{ pl: 0, width: 25 }}
//                         color="grey.light"
//                         component={data?.icon.svg}
//                         viewBox={data?.icon.viewBox}
//                     />
//                 </TableCell>
//             )}
//             <TableCell sx={{ w: 150, paddingLeft: data?.icon ? 0 : 3 }}>
//                 <Typography className="tableFontsize" component="p" color={chk ? "grey.light" : "inherit"} >
//                     {!user.verified && data?.name == 'My Account' ?
//                         <Badge
//                             badgeContent="!"
//                             color="error"
//                             className="HeaderBadge"
//                             sx={{
//                                 '& .MuiBadge-badge': {
//                                     right: -8
//                                 }
//                             }}
//                         >
//                             {data?.name}
//                         </Badge>
//                         :
//                         data?.name
//                     }
//                 </Typography>
//             </TableCell>
//             <TableCell
//                 padding="none"
//                 align="right"
//                 style={{ textAlign: 'right', width: 25 }}
//             ></TableCell>
//             <TableCell align="right" padding="none">
//                 <KeyboardArrowRightOutlinedIcon
//                     fontSize="medium"
//                     sx={{ mt: 1, mr: 3, color: chk ? "grey.light" : "inherit" }}
//                 />
//             </TableCell>
//         </TableRow>
//     );
// };

// export default Item;
