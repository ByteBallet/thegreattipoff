import React, { useCallback, useState, useEffect } from 'react';
import CommonModal from '../../Payments/Common/CommonModal';
import { proceedBankAccountAdd } from '../../../lib/deposit';
import { checkAccountData } from '@Components/utils/bankingUtil';
import AddBankAccountContent from './AddBankAccountContent';
import { Box } from '@mui/material';
import MyLoadingButton from '@Components/Payments/Common/MyLoadingButton';

export default function AddBankAccountModal(props) {
    const { clientID = '', opened = false, onClose = () => {} } = props;

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState({});
    const [formInput, setFormInput] = useState({
        clientid: clientID,
        accountname: '',
        accountnumber: '',
        bsb: '',
        bankname: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let _errors = checkAccountData(formInput);
        /**
         *  Object.keys(beterrors).map((key, idx) => {
                totalerrors = totalerrors + (beterrors[key] ? beterrors[key].length : 0)
            })
         */
        let errorCounts = 0;
        Object.keys(_errors).forEach((key, idx) => {
            errorCounts = errorCounts + (_errors[key] ? _errors[key].length : 0);
        });
        if (errorCounts > 0) {
            setErrors(_errors);
        } else {
            let bsb0 = formInput.bsb.replace(/\D/g, '');
            const _res0 = await proceedBankAccountAdd({
                ...formInput,
                bsb: bsb0,
            });
            if (_res0.error) {
                setResult({
                    status: 200,
                    msg: _res0?.data?.ERROBJ?.ERRORDESC ? _res0?.data?.ERROBJ?.ERRORDESC : 'Unable to add Bank Account',
                });
            } else {
                let _result = _res0.data;

                if (_result.success == true) {
                    setResult({
                        status: 200,
                        msg: 'Adding Bank Account Successful!',
                    });
                } else {
                    setResult({
                        status: 404,
                        msg: _res0?.data?.ERROBJ?.ERRORDESC,
                    });
                }
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        if (opened) {
            setFormInput({
                clientid: clientID,
                accountname: '',
                accountnumber: '',
                bsb: '',
                bankname: '',
            });
        }
    }, [opened]);
    // const _addBankAccount = useCallback();

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                if (result.status == 200) {
                    onClose();
                }
                setResult({});
            }
        };

        const tt = setTimeout(fetcha, 5000);
        return () => clearTimeout(tt);
    }, [result]);

    return (
        <CommonModal open={opened} onClose={onClose} title="Add Bank Account">
            <AddBankAccountContent
                formInput={formInput}
                setFormInput={setFormInput}
                handleSubmit={handleSubmit}
                errors={errors}
                setErrors={setErrors}
                result={result}
                loading={loading}
            />
        </CommonModal>
    );
}
