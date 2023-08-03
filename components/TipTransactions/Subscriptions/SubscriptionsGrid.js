import CustomSwitch from '@Components/common/CustomSwitch';
import { UserContext } from '@Context/User/UserProvider';
import DropdownButton from '@modules/Transactions/Components/DropdownButton';
import { Typography, Box, Stack, Avatar, FormGroup, FormControl, FormLabel } from '@mui/material';
import { manageUserSubscription } from '@services/tipTransactions/tipTransactionsService';
import Link from 'next/Link';
import React, { useEffect, useRef, useState, useContext } from 'react';
import NumberFormat from 'react-number-format';
import UpdateSubscriptionModal from './UpdateSubscriptionModal';

const SubscriptionsGrid = ({ item }) => {
    const { user } = useContext(UserContext)
    const [packDay, setpackDay] = useState(item?.PACKWEEKDAY)
    const [autoRenew, setautoRenew] = useState(item?.AUTORENEW)
    const [field, setfield] = useState("")
    const [open, setopen] = useState(false)
    const packWeekDay = useRef(item?.PACKWEEKDAY)

    const renderDaySelect = (isActive) => {
        let menu = [
            { id: 0, name: 'All tipping days' },
            { id: 7, name: "Saturday's only" }
        ];
        return <DropdownButton
            disabled={!isActive}
            options={menu}
            onChange={handleOnChange}
            value={packDay}
        />
    }

    const onClose = () => {
        setopen(false)
    }

    const handleOpen = () => {
        setopen(true)
    }

    const handleOnChange = (value) => {
        setfield("packweekday")
        handleOpen()
        packWeekDay.current = value

    }

    const handleToggle = () => {
        if (autoRenew) {
            setfield("autorenew")
            handleOpen()
        } else {
            handleUpdate()
            setautoRenew(autoRenew == 1 ? 0 : 1)
        }
    }

    const handleUpdate = () => {
        field == "packweekday" ? setpackDay(packWeekDay.current) : setautoRenew(autoRenew == 1 ? 0 : 1)
        updateSubscription(packWeekDay.current, field == "packweekday" ? autoRenew : (autoRenew == 1 ? 0 : 1))
    }

    const updateSubscription = async (val1, val2) => {
        let body = {
            userid: user?.userID,
            id: item?.ID,
            productid: item?.PRODUCTID,
            updateDay: val1,
            autoRenew: val2,
            field
        }
        const resp = await manageUserSubscription(body)
        onClose()
    }

    useEffect(() => {
        open && setopen(false)
    }, [field])


    return (
        <React.Fragment>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="start"
            >
                <Box sx={{ width: '75%' }}>
                    <Stack direction="row" spacing={0} alignItems="flex-start">
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                border: 2,
                                borderColor: "white.main",
                                mr: 0.2
                            }}
                            src={`${process.env.cdn}/images/avatar/${item?.AVATARPATH}`}
                            aria-label="recipe"
                            alt={item?.ALIAS}
                        />
                        <Stack direction="column" spacing={0} sx={{
                            width: 2 / 3
                        }}>
                            <Link href={item?.ACTIVEPACKAGE == 1 ? "/tipsTransactions/purchased" : "#"}>
                                <Typography
                                    component="p"
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: 14,
                                        textDecoration: 'none',
                                        cursor: "pointer"
                                    }}
                                    noWrap
                                    color={item?.ACTIVEPACKAGE == 1 ? "info.comment" : "inherit"}
                                >
                                    {item?.ALIAS}&nbsp;Subscription
                                </Typography>
                            </Link>
                            <Typography
                                component="p"
                                sx={{
                                    fontSize: 12,
                                    textDecoration: 'none',
                                    mt: 0.3
                                }}
                                noWrap
                                color={"inherit"}
                            >
                                {item?.TITLE}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        alignItems: 'flex-end',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: "25%"
                    }}
                >
                    <Typography fontSize={14} color="background.legs" align="right">
                        Amount:&nbsp;
                        <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                            <NumberFormat
                                value={item?.SALEPRICE}
                                decimalSeparator="."
                                decimalScale={2}
                                thousandSeparator=","
                                fixedDecimalScale={true}
                                displayType="text"
                                prefix="$"
                            />
                        </Typography>
                    </Typography>
                    <Typography fontSize={14} align="right" color={item?.ACTIVE == 1 ? "success.main" : "inherit"}>
                        <span style={{ color: "black" }}>Received:</span>&nbsp;<b>{item?.RECEIVEDQTY}&nbsp;of&nbsp;{item?.PURCHASEQTY}</b>
                    </Typography>
                </Box>
            </Stack >
            <Stack direction="row" mt={2} justifyContent="space-between" alignItems={"center"}>
                {
                    renderDaySelect(item?.ACTIVE)
                }
                <FormGroup
                    row
                    sx={{
                        py: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <FormLabel
                        component="legend"
                        sx={{
                            // ml: 1,
                            mr: 1,
                            fontSize: '14px',
                            alignSelf: 'center',
                        }}
                    >
                        Auto Renewal
                    </FormLabel>
                    <FormControl>
                        <CustomSwitch
                            disabled={item?.ACTIVE != 1}
                            name="autoRenewSub"
                            checked={autoRenew}
                            onChange={handleToggle}
                        />
                    </FormControl>
                </FormGroup>
            </Stack>
            <UpdateSubscriptionModal
                open={open}
                field={field}
                handleUpdate={handleUpdate}
                onClose={onClose}
                value={field == "packweekday" ? packWeekDay?.current : (autoRenew == 1 ? 0 : 1)}
            />
        </React.Fragment >
    );
};

export default SubscriptionsGrid;