import React, {
    useMemo,
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import {
    Box,
    Container,
    Modal,
    Button,
    IconButton,
    FormGroup,
    InputAdornment,
    FormHelperText,
    InputLabel,
    Input,
    Switch,
    FormLabel,
    TextField,
    FormControlLabel,
    Badge,
    Typography,
} from '@mui/material';
import { CheckOutlined, CloseOutlined } from '@mui/icons-material';
import BoxDivider from '../../Shared/BoxDivider';
import { makeStyles } from '@mui/styles';
import { getButtonIcons } from '../../utils/icons';

import { fetchDepositLimit, proceedDepositLimit } from '../../../lib/fetcher';
import MessageHelperText from '../../common/MessageHelperText';
import moment from 'moment';
import { UserContext } from '../../../Context/User/UserProvider';
const definedLabels = {
    1: 'Daily',
    7: 'Weekly',
    14: 'Fortnightly',
    30: 'Monthly',
};
const definedButtonLabels = {
    1: 'Edit Daily Limit',
    7: 'Edit Weekly Limit',
    14: 'Edit Fortn. Limit',
    30: 'Edit Monthly Limit',
};
const definedKeys = {
    1: 'DailyLimit',
    7: 'WeeklyLimit',
    14: 'FortnightLimit',
    30: 'MonthLimit',
};

const pending2String = (pending) => {
    const date = moment(pending.DATEAPPLIED).format('DD MMM YYYY');
    return `$${pending.LIMIT} effective ${date}`;
};

const DepositLimitForm = (props) => {
    const { opened, onClose, ...rest } = props;

    const useStyles = makeStyles((theme) => ({
        formGroup4: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            padding: '0 16px',
            transition: '.3s all ease-in-out',
        },
        hiddenGroup4: {
            visibility: 'hidden',
            opacity: '0',
            height: 0,
            padding: '8px',
            transition: '.3s all ease-in-out',
        },

        formGroup5: {
            display: 'flex',
            justifyContent: 'space-between',
            overflowX: 'auto',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            padding: '16px',
            backgroundColor: '#e3e3e3',
            width: 'inherit',
        },

        wrapper3: {
            margin: '0',
            padding: '16px 0',
        },
        prolog: {
            padding: '8px 0',
            textAlign: 'left',
            margin: 0,
            fontSize: '0.9rem',
        },
        note: {
            width: '100%',
            padding: '8px 0',
            textAlign: 'left',
            margin: 0,
            fontSize: '0.85rem',
        },
        optionButton1Selected: {
            width: '30%',
            minWidth: '100px',
            height: '36px',
            borderRadius: '18px',
            color: 'black',
            backgroundColor: '#fcdc38',
            fontSize: '0.9rem',
            margin: '0 10px',
            boxShadow: 'none',
        },
        optionButton1: {
            width: '30%',
            minWidth: '100px',
            height: '36px',
            borderRadius: '18px',
            color: 'black',
            backgroundColor: '#d3d3d3',
            fontSize: '0.9rem',
            margin: '0 10px',
            boxShadow: 'none',
        },
        optionButton2Selected: {
            width: '48%',
            height: '42px',
            color: 'black',
            backgroundColor: '#fcdc38',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            margin: '0',
            padding: '6px 0',
            boxShadow:
                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        },
        optionButton2: {
            width: '48%',
            height: '42px',
            padding: '6px 0',
            color: 'black',
            backgroundColor: '#d3d3d3',
            fontSize: '0.9rem',
            boxShadow:
                '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',

            margin: '0',
        },
        badge2: {
            padding: 0,
            color: 'white',
            backgroundColor: 'black',
            marginLeft: 'auto',
            top: '-8px',
            '& .MuiBadge-badge': {
                padding: '0',
                minWidth: 'unset',
                height: '16px',
                transform: 'unset',
                '& svg': {
                    fontSize: '0.9rem',
                },
            },
        },
    }));

    const prologs = [
        'At EliteBet, we allow you to limit the amount you can deposit into your account, with a range from 24 hours to 30 days.',
        "A deposit limit can help you control the amount you spend on gambling and ensure that the punt doesn't become a problem for you.",
    ];

    const notes = [
        'PLEASE NOTE: If you have more than one Deposit Limit in place, each of those Deposit Limits will operate simultaneously.',
        'All Deposit Limit change requests will take effect at 12:01 am on the date specified in the Pending Deposit Limit change requests section above.',
    ];

    const classes = useStyles();
    const { user } = useContext(UserContext);
    const { clientID } = user;
    const [result, setResult] = useState({}); //processing result
    let clientid = clientID;
    const [modalInfo, setModalInfo] = useState({
        opened: false,
        message: 'You are a fresh man.',
        handleClick: () => {},
    });
    const [depositLimit, setDepositLimit] = useState({
        currentPeriod: 1,
        editSelected: false,
        userDepositInput: '',
        DailyLimit: 1000.0,
        MonthLimit: 0,
        currDepDays: 1,
        WeeklyLimit: 0,
        OptedOutLimit: false,
        FortnightLimit: 0,
        currDepLimit: 1000.0,
        pend: [
            {
                limit: 600,
                period: 14,
                dateapplied: '2022-10-01',
            },
        ],
        trans: [
            {
                tid: 21152,
                tnm: 21152,
                td: 'EFT Deposit',
                amt: 5,
                aprv: '/Date(1592488799000+1000)/',
                exp: '/Date(1592575199000+1000)/',
            },
        ],
    });

    const loadDepositeLimitData = useCallback(async (userid) => {
        const _depositLimit = await fetchDepositLimit({
            clientid: userid,
        });
        console.log('updateDepositLimit from DepositLimitForm', _depositLimit);
        if (_depositLimit.depositlimit) {
            const newDepo = _depositLimit.depositlimit;
            console.log('new DepositLimit ... ', newDepo);
            setDepositLimit({ ...depositLimit, ...newDepo });
        }
    }, []);

    useEffect(() => {
        loadDepositeLimitData(clientid);
    }, []);

    const updateCurrentPeriod = (period) => {
        setDepositLimit({
            ...depositLimit,
            currentPeriod: period,
            currentAction: 0,
            userDepositInput: '',
            editSelected: false,
        });
    };

    const updateUserDepositInput = (e) => {
        setDepositLimit({ ...depositLimit, userDepositInput: e.target.value });
    };

    const updateDepositLimitData = useCallback(
        async (data, action) => {
            /**const body = JSON.stringify({
        clientid: clientid,
        depositlimit: depositlimit,
        period: period,
    }); */
            console.log('updateDepositLimitData', data);
            if (action === 1) {
                //reset limit option
                let res0 = await proceedDepositLimit({
                    clientid,
                    depositlimit: '9999999999999',
                    period: '99',
                });
                console.log('Result From setdepositlimit', res0);
                let res = res0.depositlimit;
                if (res.success) {
                    setResult({ error: !res.success, message: res.message });
                } else {
                    setResult({
                        error: true,
                        message: res.message || 'Unknown Error',
                    });
                }
                loadDepositeLimitData(clientid);
            } else if (action === 2) {
                //update limit
                let res0 = await proceedDepositLimit({
                    clientid,
                    depositlimit: data.userDepositInput,
                    period: data.currentPeriod,
                });
                console.log('Result From setdepositlimit', res0);
                let res = res0.depositlimit;
                if (res.success) {
                    setResult({ error: !res.success, message: res.message });
                } else {
                    setResult({
                        error: true,
                        message: res.message || 'Unknown Error',
                    });
                }
                loadDepositeLimitData(clientid);
            }
        },
        [clientid]
    );

    useEffect(() => {
        const fetcha = () => {
            if (result) {
                setResult(null);
            }
        };

        const tt = setTimeout(fetcha, 4000);
        return () => clearTimeout(tt);
    }, [result]);

    let currentLimit =
        depositLimit.currentPeriod === 1
            ? depositLimit.DailyLimit
            : depositLimit.currentPeriod === 7
            ? depositLimit.WeeklyLimit
            : depositLimit.currentPeriod === 14
            ? depositLimit.FortnightLimit
            : depositLimit.currentPeriod === 30
            ? depositLimit.MonthLimit
            : 0;

    // let pendingLimits = depositLimit.pend.filter((pend) => pend.LIMIT < 999999);
    let pendingLimits = depositLimit.pend.filter(
        (pend) =>
            pend.PERIOD === depositLimit.currentPeriod &&
            pend.LIMIT < 999999999999
    );
    // console.log('Pending Filters:', depositLimit.pend, depositLimit.currentPeriod);

    const handleDeleteAction = () => {
        if (pendingLimits.length > 0)
            setModalInfo({
                ...modalInfo,
                opened: true,
                message:
                    'Your existing Deposit Limit/s for all periods will be removed effective {exactly 7 days from the day user has requested the change } ',
                handleClick: () => updateDepositLimitData(depositLimit, 1),
            });
    };

    const handleSaveAction = () => {
        setModalInfo({
            ...modalInfo,
            opened: true,
            message: `You will be able to deposit up to ${
                depositLimit.userDepositInput
            } ${definedLabels[depositLimit.currentPeriod]}.`,
            handleClick: () => updateDepositLimitData(depositLimit, 2),
        });
    };
    // const delimitAssigned = depositLimit.MonthLimit > 0 ? 30 : depositLimit.FortnightLimit > 0 ? 14 : depositLimit.WeeklyLimit > 0 ? 7 : depositLimit.DailyLimit > 0 ? 1 : 0;

    return (
        <form {...rest}>
            <Container direction="row" className={classes.wrapper3}>
                <FormGroup className={classes.formGroup4}>
                    <Typography sx={{ fontSize: '1rem' }}>
                        {prologs.map((p, i) => (
                            <Box key={`prolog_${i}`} className={classes.prolog}>
                                {p}
                            </Box>
                        ))}
                    </Typography>
                </FormGroup>
                <FormGroup className={classes.formGroup5}>
                    <Button
                        variant="contained"
                        className={
                            depositLimit.currentPeriod === 1
                                ? classes.optionButton1Selected
                                : classes.optionButton1
                        }
                        onClick={() => updateCurrentPeriod(1)}
                    >
                        Daily
                        {depositLimit.DailyLimit > 0 ? (
                            <Badge
                                badgeContent={<CheckOutlined size="small" />}
                                color="black"
                                className={classes.badge2}
                            ></Badge>
                        ) : (
                            void 0
                        )}
                    </Button>
                    <Button
                        variant="contained"
                        className={
                            depositLimit.currentPeriod === 7
                                ? classes.optionButton1Selected
                                : classes.optionButton1
                        }
                        onClick={() => updateCurrentPeriod(7)}
                    >
                        Weekly
                        {depositLimit.WeeklyLimit > 0 ? (
                            <Badge
                                badgeContent={<CheckOutlined size="small" />}
                                color="black"
                                className={classes.badge2}
                            ></Badge>
                        ) : (
                            void 0
                        )}
                    </Button>
                    <Button
                        variant="contained"
                        className={
                            depositLimit.currentPeriod === 14
                                ? classes.optionButton1Selected
                                : classes.optionButton1
                        }
                        onClick={() => updateCurrentPeriod(14)}
                    >
                        Fortnightly
                        {depositLimit.FortnightLimit > 0 ? (
                            <Badge
                                badgeContent={<CheckOutlined size="small" />}
                                color="black"
                                className={classes.badge2}
                            ></Badge>
                        ) : (
                            void 0
                        )}
                    </Button>
                    <Button
                        variant="contained"
                        className={
                            depositLimit.currentPeriod === 30
                                ? classes.optionButton1Selected
                                : classes.optionButton1
                        }
                        onClick={() => updateCurrentPeriod(30)}
                    >
                        Monthly
                        {depositLimit.MonthLimit > 0 ? (
                            <Badge
                                badgeContent={<CheckOutlined size="small" />}
                                color="black"
                                className={classes.badge2}
                            ></Badge>
                        ) : (
                            void 0
                        )}
                    </Button>
                </FormGroup>
                <FormGroup className={classes.formGroup4} sx={{ py: 2, mt: 2 }}>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                        {`Current ${
                            definedLabels[depositLimit.currentPeriod]
                        } Limit:`}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem' }}>
                        {currentLimit === 0 ? 'None' : currentLimit}
                    </Typography>
                </FormGroup>
                <BoxDivider />
                {pendingLimits.map((pending, i) => (
                    <React.Fragment key={'pending' + i}>
                        <FormGroup className={classes.formGroup4} mt={4}>
                            <Typography sx={{ fontSize: '0.9rem' }}>
                                {/* {`Pending ${definedLabels[depositLimit.currentPeriod]} Limit`} */}
                                {`Pending ${
                                    definedLabels[pending.PERIOD]
                                } Limit`}
                            </Typography>
                            <Typography sx={{ fontSize: '0.9rem' }}>
                                {pending2String(pending)}
                            </Typography>
                        </FormGroup>
                        <FormGroup className={classes.formGroup4} mt={4}>
                            <BoxDivider />
                        </FormGroup>
                    </React.Fragment>
                ))}

                <FormGroup className={classes.formGroup4}>
                    <Button
                        variant="contained"
                        className={
                            depositLimit.editSelected
                                ? classes.optionButton2Selected
                                : classes.optionButton2
                        }
                        onClick={() =>
                            setDepositLimit({
                                ...depositLimit,
                                editSelected: true,
                            })
                        }
                    >
                        {definedButtonLabels[depositLimit.currentPeriod]}
                    </Button>
                    <Button
                        variant="contained"
                        //  className={classes.optionButton2}
                        color="success"
                        disabled={pendingLimits.length === 0}
                        onClick={handleDeleteAction}
                    >
                        Remove All Limit
                    </Button>
                </FormGroup>
                <FormGroup
                    className={
                        depositLimit.editSelected
                            ? classes.formGroup4
                            : classes.hiddenGroup4
                    }
                >
                    <FormControlLabel
                        sx={{
                            mt: 4,
                            mb: 2,
                            ml: 0,
                            mr: 1,
                            alignItems: 'flex-start',
                            width: 1,
                        }}
                        control={
                            <TextField
                                type="number"
                                hiddenLabel
                                id="deposit_limit-amount"
                                placeholder="Deposit limit amount..."
                                variant="outlined"
                                size="small"
                                sx={{
                                    mt: 1,
                                    width: 1,
                                    fontSize: '0.9rem',
                                }}
                                value={depositLimit.userDepositInput}
                                onChange={(e) => updateUserDepositInput(e)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {getButtonIcons(
                                                'svg',
                                                'DOLLAR',
                                                18
                                            )}
                                        </InputAdornment>
                                    ),
                                    inputMode: 'numeric'
                                }}
                            />
                        }
                        label={
                            <Typography sx={{ fontSize: '0.9rem' }}>
                                Set the limit you wish to place on your
                                deposits:
                            </Typography>
                        }
                        labelPlacement="top"
                    />
                </FormGroup>
                <FormGroup
                    className={
                        depositLimit.editSelected
                            ? classes.formGroup4
                            : classes.hiddenGroup4
                    }
                >
                    <Button
                        size="medium"
                        variant="contained"
                        onClick={handleSaveAction}
                        // disabled={!(depositLimit.currentAction === 2 || (depositLimit.currentAction === 1 && depositLimit.userDepositInput > 0))}
                        disabled={depositLimit.userDepositInput === ''}
                        color="success"
                        sx={{
                            width: 1,
                            color: 'white',
                            // backgroundColor: '#e3e3e3',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            my: 2,
                        }}
                    >
                        Save
                    </Button>
                </FormGroup>

                <FormGroup className={classes.formGroup4}>
                    <MessageHelperText error={result?.error || false}>
                        {result?.message || ''}
                    </MessageHelperText>
                </FormGroup>
                <FormGroup className={classes.formGroup4}>
                    <Typography sx={{ fontSize: '0.9rem', mb: 4, mt: 4 }}>
                        {notes.map((p, i) => (
                            <Box key={`prolog_${i}`} className={classes.prolog}>
                                {p}
                            </Box>
                        ))}
                    </Typography>
                </FormGroup>
            </Container>

            <Modal
                className="alexander"
                anchor="top"
                open={modalInfo.opened}
                onClose={() => setModalInfo({ ...modalInfo, opened: false })}
            >
                <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
                    <Container
                        id="header"
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            style={{
                                color: 'white',
                                alignSelf: 'center',
                                fontSize: '0.9rem',
                            }}
                        >
                            Confirm Deposit Limit
                        </Typography>
                        <IconButton
                            onClick={() =>
                                setModalInfo({ ...modalInfo, opened: false })
                            }
                        >
                            <CloseOutlined style={{ color: 'white' }} />
                        </IconButton>
                    </Container>
                    <Container
                        id="body"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            padding: '16px 20px ',
                            backgroundColor: 'white',
                            width: '100%',
                        }}
                    >
                        <Typography
                            sx={{
                                my: 2,
                                fontSize: '0.9rem',
                            }}
                        >
                            {modalInfo.message}
                        </Typography>
                        <Button
                            sx={{ width: '100%' }}
                            color="success"
                            variant="contained"
                            onClick={() => {
                                if (modalInfo.handleClick) {
                                    modalInfo.handleClick();
                                }
                                setModalInfo({ ...modalInfo, opened: false });
                            }}
                        >
                            Confirm
                        </Button>
                    </Container>
                </Box>
            </Modal>
        </form>
    );
};

export default DepositLimitForm;
