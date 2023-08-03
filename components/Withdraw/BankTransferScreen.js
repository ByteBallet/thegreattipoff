import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';
import WithdrawableInfoPanel from './common/WithdrawableInfoPanel';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../Context/User/UserProvider';
import { BoxDivider2 } from '../Payments/Layout/UserDepositLayout';
import BankAccountSelectPanel from './bank/BankAccountSelectPanel';
import DepositAmountPanel2 from './common/DepositAmountPanel2';
import ConfirmPasswordModal from './common/ConfirmPasswordModal';
import { MyFormHelperText2 } from '@Components/Payments/Common/MyFormHelperText';
import { fetchBankingWithdrawStatus } from '@lib/deposit';

export default function BankTransferScreen(props) {
  // return <Typography variant="h1">BankTransferScreen</Typography>;

  const router = useRouter();
  const { user } = useContext(UserContext);
  const { clientID, userID } = user;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});
  const [errors, setErrors] = useState({});

  const [showDialog, setShowDialog] = useState({
    type: 'type',
    card: {},
  });

  const [formInput, setFormInput] = useState({
  });

  const [withdrawable, setWithdrawable] = useState(0);

  const confirmUpPassword = () => {
    if (!formInput.withdrawamt) {
      setErrors({ withdrawamt: 'Minimum withdrawal amount is $10' });
      return;
    }
    setShowDialog({ type: 'confirmPassword' });
  };

  useEffect(() => {
    const fetcha = () => {
      if (result) {
        setResult(null);
      }
    };

    const tt = setTimeout(fetcha, 5000);
    return () => clearTimeout(tt);
  }, [result]);

  const _fetchWithdrawStatus = async (withdrawtype) => {
    setLoading(true);

    let _res0 = await fetchBankingWithdrawStatus({
      clientid: user.clientID,
      withdrawtype,
    });
    // console.log('fetchBankingWithdraw res=', _res0);
    if (_res0.error) {

    } else {
      let _result = _res0.data;
      // console.log('fetchBankingWithdraw-Confirmed res=', _result.ERROBJ.ERROR, _result.totalbalance);
      if (_result.ERROBJ.ERROR != 0) {
        setWithdrawable(_result);
      } else {
        setWithdrawable(_result);
      }
    }
    setLoading(false);
  };

  useEffect(() => {

    clientID && _fetchWithdrawStatus('EFT');

  }, []);

  useEffect(() => {
    if (showDialog.type == '') {
      clientID && _fetchWithdrawStatus('EFT');
    }
  }, [showDialog.type]);

  const handleAmountBlur = (amount0) => {
    let amount1 = formInput.withdrawamt;
    if (amount0) {
      amount1 = amount0;
    }

    // const isInteger = /^\d+$/;
    // const isCurrency=/^(\d+(\.\d{0,9})?|\.?\d{1,9})$/;

    let val = parseFloat(amount1);
    if (!amount1 || amount1.length == 0) {
      setErrors({
        ...errors,
        depositamount: undefined,
      });
      setResult();
      return;
    }
    if (!val) {
      setErrors({
        ...errors,
        depositamount: 'Invalid amount entered',
      });
      setResult({
        status: 404,
        msg: 'Invalid amount entered',
      });
    }
    else if (val < 10) {
      setErrors({
        ...errors,
        depositamount: 'Minimum withdrawal amount is $10',
      });
      setResult({
        status: 404,
        msg: 'Minimum withdrawal amount is $10',
      });
      return;
    }

    let amt = parseFloat(amount1).toFixed(2);
    setFormInput({
      ...formInput,
      withdrawamt: amt
    });



    // console.log('handleAmountBlur ', amt, formInput.withdrawamt);
    if (amt > withdrawable) {
      setErrors({
        ...errors,
        withdrawamt: `Amount exceeds your Withdrawable balance of ${getBalanceString(withdrawable)}`
      });
      setResult({
        status: 404,
        msg: `Amount exceeds your Withdrawable balance of ${getBalanceString(withdrawable)}`
      });
    } else {
      if (amt >= 10.0) {
        setErrors({
          ...errors,
          withdrawamt: undefined,
        });

        setResult();
      } else if (amt < 10 && amt == withdrawable) {

        setErrors({
          ...errors,
          withdrawamt: undefined,
        });
        setResult();

      } else {
        setErrors({
          ...errors,
          withdrawamt: 'Minimum withdrawal amount is $10',
        });
        setResult({
          status: 404,
          msg: 'Minimum withdrawal amount is $10'
        });
      }
    }
  }



  return (
    <>
      {
        loading ?
          <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3
          }}>
            <CircularProgress size={32} sx={{ color: "grey.joinBorder" }} />
          </Container>
          :
          <Container sx={{ py: 2, px: 0 }}>
            <WithdrawableInfoPanel
              type={3}
              withdrawable={withdrawable}
            />
            <BoxDivider2 />
            <BankAccountSelectPanel
              clientID={clientID}
              userID={userID}
              selectedAccount={formInput.selectedAccount}
              setSelectedAccount={(selectedAccount) =>
                setFormInput({ ...formInput, selectedAccount })
              }
            />
            <BoxDivider2 />
            <Box item sx={{ px: 2 }}>

              <DepositAmountPanel2
                label="Withdrawal Amount:"
                placeholder="Enter withdrawal amount"
                name="depositamount"
                handleBlur={handleAmountBlur}
                amount={formInput.withdrawamt}
                setAmount={(withdrawamt) => setFormInput({
                  ...formInput,
                  withdrawamt
                })}
              // error={errors.depositamount}                        
              />
            </Box>
            <Box
              item
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 2,
                mx: 10,
              }}
            >
              <Button
                variant="contained"
                color="success"
                type="button"
                fullWidth
                disabled={!formInput.withdrawamt || errors.withdrawamt || !withdrawable.canwithdraw}
                size="medium"
                sx={{
                  height: 40,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                onClick={() => confirmUpPassword()}
              >
                <span>
                  Withdraw
                </span>
              </Button>

            </Box>
            {
              result &&
              <Box sx={{ my: 2, mx: 4 }}>
                <MyFormHelperText2>{result}</MyFormHelperText2>
              </Box>
            }
            <ConfirmPasswordModal
              opened={showDialog.type == 'confirmPassword'}
              onClose={() => {
                setShowDialog({ type: '' });
              }}
              amount={formInput.withdrawamt}
              withdrawID={
                formInput.selectedAccount
                  ? formInput.selectedAccount.baid
                  : 0
              }
              withdrawtype="EFT"
            />
          </Container>
      }
    </>
  );
}

const getBalanceString = (balance) =>
  (balance ? balance : '0').toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
