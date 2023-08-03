import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import CommonModal from '../../Payments/Common/CommonModal';
import { Container, Box, FormControlLabel, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import AccountNameField from './AccountNameField';
import BSBNumberField from './BSBNumberField';
import AccountNumberField from './AccountNumberField';
import MyFormHelperText from '../../Payments/Common/MyFormHelperText';
import { MyFormHelperText2 } from '../../Payments/Common/MyFormHelperText';
import { checkAccountData } from '@Components/utils/bankingUtil';
import MyLoadingButton from '@Components/Payments/Common/MyLoadingButton';

const AddBankAccountContent = ({
    formInput,
    handleSubmit,
    setFormInput,
    setErrors,
    errors,
    result,
    fromAcc = false,
    edit = false,
    loading = false,
    country,
    setModified,
}) => {
    const showSwfitCode = country === 'AU' ? false : true;
    const handleBlur = (e) => {
        setModified(true);
        const _err = checkAccountData(formInput);
        let error_obj = {
            ...errors,
            [e.target.name]: _err[e.target.name],
        };
        if (_err.empty) {
            error_obj = {
                ...errors,
                accountname: '',
                accountnumber: '',
                bsb: '',
                bankname: '',
                swiftcode: '',
            };
        }
        // if (e.target.value.length == 0 && !edit) {
        //     setErrors(error_obj);
        //     return;
        // }
        setErrors(error_obj);
    };

    const handleChange = (e) => {
        setModified(true);
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
        const _err = checkAccountData(formInput);
        let error_obj = {
            ...errors,
            [e.target.name]: _err[e.target.name],
        };
        if (_err.empty) {
            error_obj = {
                ...errors,
                accountname: '',
                accountnumber: '',
                bsb: '',
                bankname: '',
                swiftcode: '',
            };
        }
        // if (e.target.value.length == 0 && !edit) {
        //     setErrors(error_obj);
        //     return;
        // }
        setErrors(error_obj);
    };
    return (
        <Container component="form" onSubmit={handleSubmit} disableGutters={fromAcc ? true : false}>
            {!fromAcc ? (
                <Box item sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <Image src="/images/tools/Bank.png" width={20} height={20} alt="Bank" />
                </Box>
            ) : (
                <Typography fontWeight={'bold'} align="center" sx={{ mt: 3, mb: 2 }} component="p">
                    {edit ? 'Edit' : 'Add'}&nbsp;Bank Account
                </Typography>
            )}
            <FormControlLabel
                sx={{ m: 0, alignItems: 'flex-start', width: 1, mt: 0 }}
                control={
                    <TextField
                        fullWidth
                        size="small"
                        name="bankname"
                        value={formInput.bankname}
                        placeholder="Bank name"
                        InputProps={{
                            style: {
                                fontSize: 14,
                            },
                        }}
                        onBlur={(e) => handleBlur(e)}
                        onChange={(e) => handleChange(e)}
                    />
                }
                label={<Typography fontSize={14}>Bank name:</Typography>}
                labelPlacement="top"
            />
            <MyFormHelperText>{errors.bankname}</MyFormHelperText>

            <FormControlLabel
                fullWidth
                sx={{ m: 0, alignItems: 'flex-start', width: 1, mt: 2 }}
                control={
                    <AccountNameField
                        fullWidth
                        size="small"
                        id="accountname"
                        name="accountname"
                        placeholder="Account name"
                        value={formInput.accountname}
                        InputProps={{
                            style: {
                                fontSize: 14,
                            },
                        }}
                        onBlur={(e) => handleBlur(e)}
                        onChange={(e) => handleChange(e)}
                    />
                }
                label={<Typography fontSize={14}>Account Name:</Typography>}
                labelPlacement="top"
            />
            <MyFormHelperText>{errors.accountname}</MyFormHelperText>
            <FormControlLabel
                fullWidth
                sx={{
                    m: 0,
                    alignItems: 'flex-start',
                    width: 1,
                    mt: 2,
                    fontSize: 14,
                }}
                control={
                    <AccountNumberField
                        fullWidth
                        size="small"
                        name="bsb"
                        value={formInput.bsb}
                        placeholder="BSB number"
                        InputProps={{
                            style: {
                                fontSize: 14,
                            },
                        }}
                        onBlur={(e) => handleBlur(e)}
                        onChange={(e) => handleChange(e)}
                    />
                }
                label={<Typography fontSize={14}>BSB Number:</Typography>}
                labelPlacement="top"
            />
            <MyFormHelperText>{errors.bsb}</MyFormHelperText>

            <FormControlLabel
                fullWidth
                sx={{
                    m: 0,
                    alignItems: 'flex-start',
                    width: 1,
                    mt: 2,
                    fontSize: 14,
                }}
                control={
                    <AccountNumberField
                        fullWidth
                        size="small"
                        name="accountnumber"
                        value={formInput.accountnumber}
                        placeholder="Account number"
                        InputProps={{
                            style: {
                                fontSize: 14,
                            },
                        }}
                        onBlur={(e) => handleBlur(e)}
                        onChange={(e) => handleChange(e)}
                    />
                }
                label={<Typography fontSize={14}>Account Number:</Typography>}
                labelPlacement="top"
            />
            <MyFormHelperText>{errors.accountnumber}</MyFormHelperText>

            {showSwfitCode && (
                <>
                    <FormControlLabel
                        fullWidth
                        sx={{
                            m: 0,
                            alignItems: 'flex-start',
                            width: 1,
                            mt: 2,
                            fontSize: 14,
                        }}
                        control={
                            <TextField
                                fullWidth
                                size="small"
                                name="swiftcode"
                                value={formInput.swiftcode}
                                placeholder="Swift Code"
                                InputProps={{
                                    style: {
                                        fontSize: 14,
                                    },
                                }}
                                onBlur={(e) => handleBlur(e)}
                                onChange={(e) => handleChange(e)}
                            />
                        }
                        label={<Typography fontSize={14}>Swift Code:</Typography>}
                        labelPlacement="top"
                    />
                    <MyFormHelperText>{errors.swiftcode}</MyFormHelperText>
                </>
            )}
            {!fromAcc && (
                <Box sx={{ width: 1, px: 6, pt: 4, pb: 0 }}>
                    <MyLoadingButton
                        loading={loading}
                        disabled={
                            errors.bankname ||
                            errors.accountname ||
                            errors.bsb ||
                            errors.accountnumber ||
                            formInput.bankname == '' ||
                            formInput.accountname == '' ||
                            formInput.bsb == '' ||
                            formInput.accountnumber == ''
                        }
                        label="Add Bank Account"
                        type="submit"
                        size="small"
                    />
                </Box>
            )}

            {result && (
                <Box sx={{ py: 2, pb: 4 }}>
                    <MyFormHelperText2>{result}</MyFormHelperText2>
                </Box>
            )}
        </Container>
    );
};

export default AddBankAccountContent;
