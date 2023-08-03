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
    Tabs,
    Tab,
} from '@mui/material';
import {
    CheckCircle,
    CheckOutlined,
    Close,
    CloseOutlined,
} from '@mui/icons-material';
import BoxDivider from '../../Shared/BoxDivider';
import { makeStyles } from '@mui/styles';
import { getButtonIcons } from '../../utils/icons';

import { fetchDepositLimit, proceedDepositLimit } from '../../../lib/fetcher';
import MessageHelperText from '../../common/MessageHelperText';
import moment from 'moment';
import { UserContext } from '../../../Context/User/UserProvider';
import { MyFormHelperText2 } from '../../common/MyFormHelperText';
import NumberFormat from 'react-number-format';
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

const getCurrencyFormat = (num) => {
    return (
        '$' +
        parseFloat(num)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
};
const pending2String = (pending) => {
    const date = moment(pending.DATEAPPLIED).format('DD MMM YYYY');
    if (pending.LIMIT > 999999999) {
        return `None effective ${date}`;
    } else {
        return `$${pending.LIMIT} effective ${date}`;
    }
};

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
        left: '3px',
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

const DepositLimitForm = (props) => {
    const { opened, onClose, ...rest } = props;


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
    const [removable, setRemovable] = useState(false);

    const [modalInfo, setModalInfo] = useState({
        opened: false,
        message: 'You are a fresh man.',
        handleClick: () => { },
    });
    const [selectedTab, setSelectedTab] = useState(0);
    const [depositLimit, setDepositLimit] = useState({
        currentPeriod: 1,
        editSelected: false,
        userDepositInput: '',
        DailyLimit: 0,
        MonthLimit: 0,
        currDepDays: 1,
        WeeklyLimit: 0,
        OptedOutLimit: false,
        FortnightLimit: 0,
        currDepLimit: 0,
        pend: [
            // {
            //     limit: 600,
            //     period: 14,
            //     dateapplied: '2022-10-01',
            // },
        ],
        trans: [
            // {
            //     tid: 21152,
            //     tnm: 21152,
            //     td: 'EFT Deposit',
            //     amt: 5,
            //     aprv: '/Date(1592488799000+1000)/',
            //     exp: '/Date(1592575199000+1000)/',
            // },
        ],
    });

    const loadDepositeLimitData = async (userid) => {
        const _depositLimit = await fetchDepositLimit({
            clientid: userid,
        });
        if (_depositLimit.depositlimit) {
            const newDepo = _depositLimit.depositlimit;
            let idx = [1, 7, 14, 30];
            setDepositLimit({
                ...depositLimit,
                ...newDepo,
                currentPeriod: idx[selectedTab],
            });
            checkRemovable(newDepo);

        }
    };



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

    const updateDepositLimitData =
        async (data, action) => {
            /**const body = JSON.stringify({
        clientid: clientid,
        depositlimit: depositlimit,
        period: period,
    }); */

            if (action === 1) {
                //reset limit option
                let res0 = await proceedDepositLimit({
                    clientid,
                    depositlimit: '9999999999999',
                    period: '99',
                });
                let res = res0.depositlimit;
                if (res.success) {
                    setResult({ status: 200, msg: res.message });
                } else {
                    setResult({
                        status: 404,
                        msg: res.message || 'Unknown Error',
                    });
                }
                loadDepositeLimitData(clientid);
                // console.log(
                //     '555 updateDepsoitLimitData deposit',
                //     selectedTab,
                //     depositLimit.currentPeriod
                // );
                let idx = [1, 7, 14, 30];
                // updateCurrentPeriod(idx[selectedTab]);
            } else if (action === 2) {
                //update limit
                let res0 = await proceedDepositLimit({
                    clientid,
                    depositlimit: data.userDepositInput,
                    period: data.currentPeriod,
                });
                let res = res0.depositlimit;
                if (res.success) {
                    setResult({ status: 200, msg: res.message });
                } else {
                    setResult({
                        status: 404,
                        msg: res.message || 'Unknown Error',
                    });
                }
                loadDepositeLimitData(clientid);
                // console.log(
                //     '555 updateDepsoitLimitData deposit',
                //     selectedTab,
                //     depositLimit.currentPeriod
                // );
                // let idx = [1, 7, 14, 30];
                // updateCurrentPeriod(idx[selectedTab]);
            }
        };
    //     [selectedTab, clientid]
    // );

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
        (pend) => pend.PERIOD === depositLimit.currentPeriod
        //&& pend.LIMIT < 999999999
    );

    const checkRemovable = (depo) => {

        let count = 0;
        if (depo.DailyLimit > 0) count++;
        if (depo.WeeklyLimit > 0) count++;
        if (depo.FortnightLimit > 0) count++;
        if (depo.MonthLimit > 0) count++;

        depo.pend.forEach((pending, idx) => {
            if (pending.LIMIT < 999999999) {

            } else {
                count--;
            }
        })
        setRemovable(count > 0);
    }

    const handleDeleteAction = () => {
        // if (pendingLimits.length > 0)
        {
            // // let date = moment(pendingLimits[0].DATEAPPLIED);
            // let dateString = moment(pendingLimits[0].DATEAPPLIED).format(
            //     'DD MMM YYYY'
            // );
            let dateString = moment().add(7, 'days').format('DD MMM YYYY');
            setModalInfo({
                ...modalInfo,
                title: 'Confirm Deposit Limit',
                opened: true,
                message: `Your existing Deposit Limit/s for all periods will be removed effective on ${dateString}`,
                handleClick: () => updateDepositLimitData(depositLimit, 1),
            });
        }
    };

    const handleSaveAction = () => {
        setModalInfo({
            ...modalInfo,
            opened: true,
            title: 'Confirm Deposit Limit',
            message: `You will be able to deposit up to ${getCurrencyFormat(
                depositLimit.userDepositInput
            )} ${definedLabels[depositLimit.currentPeriod]}.`,
            handleClick: () => {
                updateDepositLimitData(depositLimit, 2);
            },
        });
    };
    // const delimitAssigned = depositLimit.MonthLimit > 0 ? 30 : depositLimit.FortnightLimit > 0 ? 14 : depositLimit.WeeklyLimit > 0 ? 7 : depositLimit.DailyLimit > 0 ? 1 : 0;
    useEffect(() => {
        let idx = [1, 7, 14, 30];
        updateCurrentPeriod(idx[selectedTab]);
    }, [selectedTab]);

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

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
                <Box sx={{ width: '100%', backgroundColor: '#f2f2f2' }} py={1}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleChangeTab}
                        variant="scrollable"
                        scrollButtons={true}
                        allowScrollButtonsMobile={true}
                        aria-label="aria-label"
                        TabIndicatorProps={{
                            style: {
                                display: 'none',
                            },
                        }}
                        className="RacingTabs"
                    >
                        <Tab
                            label="Daily"
                            id={1}
                            aria-controls={`tabpanel`}
                            key={1}
                            icon={
                                depositLimit.DailyLimit > 0 ? (
                                    <CheckCircle fontSize="small" />
                                ) : (
                                    void 0
                                )
                            }
                        />

                        <Tab
                            label="Weekly"
                            id={7}
                            aria-controls={`tabpanel`}
                            key={2}
                            icon={
                                depositLimit.WeeklyLimit > 0 ? (
                                    <CheckCircle fontSize="small" />
                                ) : (
                                    void 0
                                )
                            }
                        />
                        <Tab
                            label="Fortnightly"
                            id={14}
                            aria-controls={`tabpanel`}
                            key={3}
                            icon={
                                depositLimit.FortnightLimit > 0 ? (
                                    <CheckCircle fontSize="small" />
                                ) : (
                                    void 0
                                )
                            }
                        />
                        <Tab
                            label="Monthly"
                            id={30}
                            aria-controls={`tabpanel`}
                            key={4}
                            icon={
                                depositLimit.MonthLimit > 0 ? (
                                    <CheckCircle fontSize="small" />
                                ) : (
                                    void 0
                                )
                            }
                        />
                    </Tabs>
                </Box>

                <FormGroup className={classes.formGroup4} sx={{ py: 2, mt: 2 }}>
                    <Typography sx={{ fontSize: 13 }}>
                        {` Current ${definedLabels[depositLimit.currentPeriod]
                            } Limit:`}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }}>
                        {currentLimit === 0 ? 'None' :
                            <NumberFormat
                                thousandSeparator={true}
                                value={currentLimit ? currentLimit : '0'}
                                decimalSeparator="."
                                decimalScale={2}
                                fixedDecimalScale={true}
                                displayType="text"
                                prefix="$"
                            />}
                    </Typography>
                </FormGroup>
                <BoxDivider />
                {pendingLimits.map((pending, i) => (
                    <React.Fragment key={'pending' + i}>
                        <FormGroup className={classes.formGroup4} mt={4}>
                            <Typography sx={{ fontSize: 13 }}>
                                {/* {`Pending ${definedLabels[depositLimit.currentPeriod]} Limit`} */}
                                {`Pending ${definedLabels[pending.PERIOD]
                                    } Limit`}
                            </Typography>
                            <Typography sx={{ fontSize: 13 }}>
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
                    {
                        // allPendingLimits.length > 0 && 
                        removable == true &&
                        (
                            <Button
                                variant="contained"
                                color="grey"
                                //  className={classes.optionButton2}
                                className={classes.optionButton2}
                                // disabled={pendingLimits.length === 0}
                                onClick={handleDeleteAction}
                            >
                                Remove All Limits
                            </Button>
                        )}
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
                                }}
                                value={depositLimit.userDepositInput}
                                onChange={(e) => updateUserDepositInput(e)}
                                InputProps={{
                                    sx: {
                                        fontSize: 14,
                                        backgroundColor: '#F0F1F3',
                                        "&.Mui-focused input": {
                                            backgroundColor: "#ffffff"
                                        }
                                    },
                                    inputMode: 'numeric',
                                    startAdornment: (
                                        <Box sx={{ pr: 1 }}>
                                            <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>$</Typography>
                                        </Box>
                                    ),
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
                            fontSize: 18,
                            my: 2,
                        }}
                    >
                        Save
                    </Button>
                </FormGroup>

                <FormGroup className={classes.formGroup4}>
                    {result && <MyFormHelperText2>{result}</MyFormHelperText2>}
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
                            borderTopLeftRadius: '25px',
                            borderTopRightRadius: '25px',
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
                            paddingBottom: '24px',
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
                            sx={{ width: '100%', fontSize: 18, fontWeight: '600', }}
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
