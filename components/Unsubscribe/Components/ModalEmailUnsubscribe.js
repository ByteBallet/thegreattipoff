import { Box, Typography, Button } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

import { useRouter } from 'next/router';

function ModalEmailUnsubscribe({ alertObj, UnsubscribeFunc }) {
    const [blackBookEmails, setBlackBookEmails] = useState(true);
    const [allEmails, setAllEmails] = useState(false);

    const router = useRouter();

    const handleChange = (value) => {
        console.log(value);
    };
    return (
        <Box
            sx={{
                backgroundColor: 'white.main',
                width: '80%',
                borderRadius: '10px',
                padding: 2,
            }}
        >
            {alertObj ? (
                <>
                    <Typography
                        component="p"
                        fontWeight="fontWeightBold"
                        py={1}
                        px={2}
                        sx={{ textAlign: 'center' }}
                        fontSize={18}
                    >
                        You will be unsubscribed from the following:
                    </Typography>

                    <div>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        checked={blackBookEmails}
                                        onChange={() =>
                                            setBlackBookEmails(!blackBookEmails)
                                        }
                                        color="black"
                                    />
                                }
                                label={`Blackbook emails for ${alertObj?.followlabel}`}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={allEmails}
                                        onChange={() =>
                                            setAllEmails(!allEmails)
                                        }
                                        color="black"
                                    />
                                }
                                label="All Blackbook emails"
                            />
                        </FormGroup>
                    </div>
                </>
            ) : (
                <Typography
                    component="p"
                    fontWeight="fontWeightBold"
                    py={1}
                    px={2}
                    sx={{ textAlign: 'center' }}
                    fontSize={18}
                >
                    The Tipster or Runner could not be found.
                </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ width: '70%' }}
                    disabled={blackBookEmails || allEmails ? false : true}
                    onClick={() => {
                        alertObj
                            ? UnsubscribeFunc(blackBookEmails, allEmails)
                            : router.push('/');
                    }}
                >
                    {alertObj ? 'Unsubscribe' : 'Close'}
                </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography
                    component="p"
                    sx={{ textAlign: 'center' }}
                    fontSize={14}
                >
                    To unsubscribe from all marketing please login and update
                    the marketing communication setting under My Account → User
                    Settings
                </Typography>
            </Box>
        </Box>
    );
}

export default ModalEmailUnsubscribe;
