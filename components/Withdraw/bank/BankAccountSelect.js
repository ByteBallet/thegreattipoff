import {

    ExpandCircleDown,
    KeyboardArrowDownOutlined,
} from '@mui/icons-material';
import { Box, FormGroup, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';

export default function BankAccountSelect(props) {
    const {
        selectedAccount = {},
        setSelectedAccount = () => { },
        accounts = {},
    } = props;


    return (
        <Box sx={{ pt: 3 }}>
            {/* <Typography variant="h1">BankAccountSelect</Typography> */}
            {
                accounts.length == 1 ?
                    <Box sx={{
                        px: 0.5, py: 0.5,
                        borderColor: 'primary.main',
                        borderRadius: 2,
                        borderStyle: 'solid',
                        borderWidth: 2,
                    }}>
                        <SelectedRenderer account={selectedAccount} type={2} />
                    </Box>
                    :
                    <Select
                        IconComponent={
                            ExpandCircleDown
                        }
                        value={selectedAccount}
                        variant="outlined"
                        color="primary"
                        renderValue={(value) => <SelectedRenderer account={value} />}
                        className="Mui-focused"
                        fullWidth
                        inputProps={{
                            sx: {
                                padding: '6px 8px !important',
                            },
                        }}
                        onChange={(e) => setSelectedAccount(e.target.value)}
                    >
                        {accounts.map((account, idx) => (
                            <MenuItem
                                key={idx}
                                value={account}
                                sx={{ width: 1, fontSize: 14, lineHeight: 1, p: 0 }}
                            >
                                <SelectedRenderer account={account} />
                            </MenuItem>
                        ))}
                    </Select>
            }
        </Box>
    );
}

const getMaskedBSB = (bsb = '-') => {
    return '*** '.concat(Boolean(bsb) && bsb.length > 4 ? bsb.substr(bsb.length - 3) : '000');
};
const getMaskedAccountNumber = (num) => {
    // if (num.startsWith('*')) {
    //     return num;
    // }
    return '**** **** '.concat(Boolean(num) && num.length > 3 ? num.substr(num.length - 4) : '0000');
};
const SelectedRenderer = (props) => {
    const {
        account = {
            bnm: '',
            bsb: '',
            anm: '',
            baid: 0,
            num: '',
        },
        type = 1,
    } = props;
    console.log('SelectedRenderer props= ', props);

    if (type != 1) {
        return (
            //  <FormGroup
            //     variant="outlined"         
            //     color="primary"            
            //     className="Mui-focused"
            //   >
            <Box
                fullWidth
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}

            >
                <Box sx={{ px: 1 }}>
                    <Typography variant="p" sx={{ fontSize: 14 }}>
                        {account.bnm} Bank
                    </Typography>
                    <Box item sx={{ p: 0 }}>
                        {/* <Typography variant="span" sx={{ fontSize: 14 }}>
                        BSB: {getMaskedBSB(account.bsb)}
                    </Typography> */}
                        <Typography variant="span" sx={{ fontSize: 14 }} mx={1}>
                            Acc: {getMaskedAccountNumber(account.num)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            // </FormGroup>
        );
    } else {
        return (
            <Box
                fullWidth
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ px: 1 }}>
                    <Typography variant="p" sx={{ fontSize: 14 }}>
                        {account.bnm} Bank
                    </Typography>
                    <Box item sx={{ p: 0 }}>
                        {/* <Typography variant="span" sx={{ fontSize: 14 }}>
                        BSB: {getMaskedBSB(account.bsb)}
                    </Typography> */}
                        <Typography variant="span" sx={{ fontSize: 14 }} mx={1}>
                            Acc: {getMaskedAccountNumber(account.num)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }


    // return (
    //     <Box
    //         fullWidth
    //         sx={{
    //             display: 'flex',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             pr: 1,
    //         }}
    //     >
    //         <Box sx={{ m: 0, p: 0, px: 1 }}>
    //             <Typography variant="p" sx={{ fontSize: 14 }}>
    //                 {account.bnm} Bank
    //             </Typography>
    //             <Box item sx={{ m: 0, p: 0 }}>
    //                 <Typography variant="span" sx={{ fontSize: 14 }}>
    //                     BSB: {getMaskedBSB(account.bsb)}
    //                 </Typography>
    //                 <Typography variant="span" sx={{ fontSize: 14 }} mx={1}>
    //                     Acc: {getMaskedAccountNumber(account.num)}
    //                 </Typography>
    //             </Box>
    //         </Box>
    //         <CheckCircle
    //             size="small"
    //             sx={{ fontSize: '120%', color: 'grey.light' }}
    //         />
    //     </Box>
    // );
};
