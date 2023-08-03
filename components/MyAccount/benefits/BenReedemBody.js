import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Container,
    Button,
    TextField,
    Typography,
    FormGroup,
    FormHelperText,
    FormControl,
    Stack,
} from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { fetchUserBenefits } from '../../../lib/fetcher';
import { CheckOutlined } from '@mui/icons-material';
import MessageHelperText from '../../common/MessageHelperText';
import { UserContext } from '../../../Context/User/UserProvider';
import MyLoadingButton from '../../common/MyLoadingButton';
import CentNumberField from '@Components/common/CentNumberField';
import updateUserSession from '@Components/utils/updateUserSession';
import { getSession } from 'next-auth/client';

const CustomButton = (data) => {
    const { selected, onClick, children } = data;
    return (
        <Button
            onClick={onClick}
            style={
                selected
                    ? {
                        boxShadow: '1px 1px 0px rgba(0,0,0,0.5)',
                        color: '#000',
                        background: '#fcdc38',
                        fontWeight: 'bold',
                        borderRadius: '0.3rem',
                        // margin: '0 6px',
                    }
                    : {
                        border: '1px solid #999',
                        color: '#555',
                        borderRadius: '0.3rem',

                        // margin: '0 6px',
                    }
            }
            sx={{
                minWidth: '45%',
                fontWeight: 'bold',
                fontSize: 13,
            }}
        >
            <span style={{ padding: '0' }}>{children}</span>
        </Button>
    );
};

const BenReedemBody = (props) => {
    const { clientid, balance, reward, points, updateData } = props;
    const [selected, setSelected] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formInput, setFormInput] = useState({
        points: '',
        limitPoint: '',
    });

    useEffect(() => {
        setFormInput({
            ...formInput,
            limitPoint: reward.toString(),
        });
    }, [reward]);

    const [message, setMessage] = useState(null);

    const { user, updateUserDetails, addUser } = useContext(UserContext);
    const { clientID } = user;
    // let limitPoint = creditLimit;
    // let maxPoints = user.pointsbalance;

    useEffect(() => {
        const interval = setInterval(() => {
            if (message !== null) {
                setMessage(null);
                updateData(clientid);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [message]);

    useEffect(() => {

        setFormInput({
            points: '',
            limitPoint: reward.toString(),
        })
    }, [selected]);

    const updateData2 = async (selected, _points) => {
        // console.log('BenReedemBody updateData2', selected, _points);
        const data3 = await fetchUserBenefits(selected, {
            clientid: clientID,
            points: _points,
        });
        // console.log('setMessage', data3);
        // setMessage(data3);
        if (data3.error) {
        } else if (data3.ERROBJ && data3.ERROBJ.ERROR != 0) {
            setMessage({
                data: data3.ERROBJ.ERRORDESC,
                error: 1,
            });
        } else {
            if (selected == 0) {
                //updateUserDetails('pointsbalance', data3.pointsbal);
                setMessage({ data: removeSpaces(data3.successmsg), error: 0 });
                //get updated session
                updateUserSession(false).then(() => {
                    updateUserData();
                })
            } else {
                setMessage({ data: removeSpaces(data3.successmsg), error: 0 });
            }
            updateData(clientID);
        }
    };

    const updateUserData = async () => {
        const userSession = await getSession();
        userSession && addUser(userSession.user)
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (selected === 0) {
            const _points = parseInt(formInput.points);
            setLoading(true);
            if (_points > points) {
                setMessage({
                    data: 'Insufficient Reward Points available.',
                    error: 1,
                });
            } else {
                await updateData2(selected, _points);
            }
            setLoading(false);
        } else {
            const _points = parseInt(formInput.limitPoint);
            if (_points === 0 || _points === NaN) return;
            setLoading(true);
            if (_points < 100) {
                setMessage({
                    error: 1,
                    data: 'The minimum Reward Points you can claim is 100 points.',
                })
            } else {
                await updateData2(selected, _points);
            }

            setLoading(false);
        }
    };
    return (
        <Box
            sx={{
                width: 1,
                display: 'flex',
                flexDirection: 'column',
                lineHeight: '1.5',
            }}
            p={2}
            px={0}
            align="center"
            component="form"
            onSubmit={handleClick}
        >
            <Container
                align="center"
                m={0}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    p: 0,
                }}
            >
                <CustomButton
                    selected={selected === 0}
                    onClick={() => setSelected(0)}
                >
                    Redeem Points
                </CustomButton>
                <Box style={{ padding: '0.3rem' }} />
                <CustomButton
                    selected={selected === 1}
                    onClick={() => setSelected(1)}
                >
                    Auto Redeem
                </CustomButton>
            </Container>
            <Typography
                align="center"
                sx={{ padding: 0, width: '100%', letterSpacing: '0' }}
                m={0}
                mt={3}
                mb={0.6}
                fontSize={12}
            >
                {selected === 0
                    ? 'How many points would you like to redeem?'
                    : 'Set your automatic Reward Points Redemption limit'}
            </Typography>
            <CentNumberField
                placeholder={
                    selected === 0
                        ? 'Enter points..'
                        : 'Enter points redemption limit'
                }

                p={0}
                type="number"
                inputProps={{
                    sx: {
                        my: 0.3,
                        fontSize: 13,
                        padding: '12px 16px',
                        borderColor: '#e0e0e0',
                        backgroundColor: "#ffffff"
                    },
                    inputMode: 'numeric'
                }}
                InputProps={{
                    sx: {


                        // "&.Mui-focused input": {
                        //       backgroundColor: "#ffffff"                          
                        //   }
                    }
                }}

                value={selected === 0 ? formInput.points : formInput.limitPoint}
                onChange={(e) => {
                    selected === 0
                        ? setFormInput({
                            ...formInput,
                            points: e.target.value,
                        })
                        : setFormInput({
                            ...formInput,
                            limitPoint: e.target.value,
                        });
                }}

            />
            <Typography fontSize={12} align={'center'} mt={1} mb={1}>
                100 points = $1.00 Bonus Bet
            </Typography>
            <MyLoadingButton
                loading={loading}
                disabled={selected == 0 ? formInput.points.length == 0 : formInput.limitPoint.length == 0}
                type="submit"
                sx={{ mt: 1, mb: 2 }}
                label={selected === 0 ? 'Redeem' : 'Set'}
            />
            <Container align="center">
                {message && <MessagePanel message={message} />}
            </Container>
        </Box>
    );
};

const MessagePanel = (props) => {
    const { message } = props;
    console.log('MEssagePanel props=', props);
    if (!message) return <></>;
    else {
        const { error, data } = message;

        if (error == 1) {
            return <MessageHelperText error={true}>{data}</MessageHelperText>;
        } else {
            return (
                <MessageHelperText
                    error={false}
                    title={
                        <React.Fragment>
                            <CheckOutlined
                                fontSize="small"
                                color="success"
                                style={{
                                    transform: ' translateY(5px)',
                                    marginRight: '6px',
                                }}
                            />
                            Success
                        </React.Fragment>
                    }
                >
                    {data}
                </MessageHelperText>
            );
        }
    }
};
const removeSpaces = (value) => {
    return value.replace(/  +/g, ' ');
};

export default BenReedemBody;
