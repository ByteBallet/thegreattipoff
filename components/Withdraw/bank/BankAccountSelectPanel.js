import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { fetchBankAccounts } from '../../../lib/deposit';
import { getButtonIcons } from '../../utils/icons';
import AddBankAccountModal from './AddBankAccountModal';
import BankAccountSelect from './BankAccountSelect';

export default function BankAccountSelectPanel(props) {
    const {
        clientID = '',
        userID = '',
        selectedAccount,
        setSelectedAccount = () => { },
    } = props;

    const [accounts, setAccounts] = useState([]);
    const [dialogInfo, setDialogInfo] = useState({
        type: '',
    });

    const _fetchBankAccounts = async (clientid) => {
        let body = {
            userid: userID,
            clientid: clientid
        }
        let _res0 = await fetchBankAccounts(body);

        if (_res0.error) {
            setAccounts([]);
        } else {
            let _result = _res0.data;
            if (_result.ERROBJ.ERROR != 0) {
                setAccounts([]);
            } else {
                if (_result.accts.length > 0) {
                    setAccounts(_result.accts);
                    setSelectedAccount(_result.accts[0]);
                } else {
                    // let testdata = [
                    //     {
                    //         baid: 199,
                    //         bnm: 'ANZ',
                    //         bsb: '123-456',
                    //         num: '123456789',
                    //         anm: 'Sebastian Powel',
                    //     },
                    // ];
                    // setAccounts([
                    //     {
                    //         bnm: 'ANZ',
                    //         bsb: '012-345',
                    //         anm: 'Ted Testing',
                    //         baid: 198,
                    //         num: '***8441',
                    //     },
                    //     // {
                    //     //     bnm: 'Dummy',
                    //     //     bsb: '567-890',
                    //     //     anm: 'Ted Testing',
                    //     //     baid: 7002,
                    //     //     num: '***6777',
                    //     // },
                    // ]);
                    // setSelectedAccount(testdata[0]);
                    setSelectedAccount({});
                    setAccounts([]);
                    // setSelectedAccount(null);
                }
            }
        }
    };

    useEffect(() => {
        if (clientID) _fetchBankAccounts(clientID);
    }, [dialogInfo.type]);

    useEffect(() => {
        _fetchBankAccounts(clientID);
    }, [clientID]);

    let text =
        accounts.length > 0
            ? 'Select Bank Account '
            : 'Add Bank Account Details:';
    return (
        <>
            <Box item sx={{ px: 2 }}>
                <BankTransferHeader text={text} />
                {
                    accounts.length > 0 &&
                    <BankAccountSelect
                        selectedAccount={selectedAccount}
                        setSelectedAccount={setSelectedAccount}
                        accounts={accounts}
                    />
                }

                <Box item sx={styles.addCardContainer}>
                    <Button
                        variant="contained"
                        onClick={() => setDialogInfo({ type: 'add' })}
                        color="black"
                        sx={styles.addCard}
                        startIcon={getButtonIcons('svg', 'PLUS', 8, 'white')}
                    >
                        <span style={{ color: 'white' }}>
                            Add Account</span>
                    </Button>
                </Box>
            </Box>
            <AddBankAccountModal
                clientID={clientID}
                opened={dialogInfo.type == 'add'}
                onClose={() => setDialogInfo({ type: '' })}
            />
        </>
    );
}

const BankTransferHeader = (props) => {
    const { text = 'Add Bank Account Details:' } = props;
    return (
        <Box sx={styles.linear}>
            <Box>
                <Typography sx={styles.title}>{text}</Typography>
            </Box>
            <Box>
                <Image
                    src="/images/tools/Bank.png"
                    width={20}
                    height={20}
                    alt="Bank"
                />
            </Box>
        </Box>
    );
};

const styles = {
    linear: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: '100%',
        borderBottom: 1,
        borderColor: 'grey.light',
        pt: 3,
        pb: 1,
        mb: 2,
        cursor: 'pointer',
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 'bold',
    },
    addCard: {
        width: 3 / 5,
        color: 'black',

        py: 1,
        fontSize: 14,
        fontWeight: 'bold',
    },
    addCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        mb: 4,
    },
};
