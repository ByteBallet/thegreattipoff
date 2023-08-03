import React from 'react';
import {
    Stack,
    Typography,
    Modal,
    Divider,
    Drawer,
    useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import CheckIcon from '@mui/icons-material/Check';

import CircularLoader from '@Components/common/CircularLoader';
import NoDataLabal from '@Components/common/NoDataLabal';
import { getDynamicHeight } from '@utils/hotBetUtils';

const useStyles = makeStyles((theme) => ({
    rowContainer: {
        background: theme.palette.background.default,
        paddingLeft: '15px',
        paddingRight: '15px',
        margin: '5px',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30px',
        maxWidth: '250px',
    },
    nameText: {
        fontSize: theme.typography.hotbet.subTitle,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    overflowY: 'auto',
    maxHeight: 700,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
};

const TipLocationModal = ({
    isModalOpen,
    onClose,
    data,
    isloading,
    handelSelectLocation,
    hideDeSelect = false,
    showSelect = false
}) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const classes = useStyles();
    const countOfRecord = data?.length;

    const handeleDoine = () => {
        onClose();
    };
    const renderSelect = (selected) => {
        if (selected == 1 && hideDeSelect) {
            return ''
        } else {
            return <Stack
                className={classes.rowContainer}
                sx={{
                    cursor: 'pointer',
                }}
                onClick={() => {
                    if (selected === 1) {
                        handelSelectLocation(0);
                    } else {
                        handelSelectLocation(1);
                    }
                }}
            >
                <Typography className={classes.nameText}>
                    {
                        selected === 1 ? 'Deselect all' :
                            'Select all'
                    }
                </Typography>
            </Stack>
        }
    }

    const getContent = () => {
        return (
            <Box
                sx={{
                    px: 2,
                    pt: 2.5,
                    overflowY: 'auto',
                }}
            >
                {isloading && <CircularLoader />}
                {!isloading && !data?.length > 0 && <NoDataLabal />}
                {!isloading && data?.length > 0 && (
                    <>
                        <Stack
                            sx={{
                                paddingBottom: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                justifyItems: 'center',
                            }}
                        >
                            <Typography fontSize={13} fontWeight={'600'}>
                                {data[0]?.RACEMEET}
                            </Typography>
                            <Typography fontSize={12}>
                                {moment(data[0]?.RACEDATE).format(
                                    'DD MMM YYYY'
                                )}
                            </Typography>
                        </Stack>
                        <Divider sx={{ mb: 1 }} />
                        <Box sx={{ mb: 1 }}>
                            <Typography fontSize={12}>
                                Tips available for:
                            </Typography>
                        </Box>
                        {data?.length > 0 &&
                            data.map((item) => (
                                <Stack
                                    key={item?.RACEID}
                                    flexDirection={'row'}
                                    justifyContent={'flex-start'}
                                    justifyItems={'center'}
                                >
                                    {item?.USERSELECTED === 1 && (
                                        <CheckIcon
                                            color="success"
                                            fontSize="30px"
                                            fontWeight="600"
                                            style={{ marginRight: 10 }}
                                        />
                                    )}
                                    {countOfRecord !== 1 ? (
                                        <>
                                            <Typography
                                                fontSize={12}
                                                fontWeight={'600'}
                                                sx={{ width: '10%' }}
                                            >
                                                {`R${item?.RACENUM} - `}
                                            </Typography>

                                            <Typography
                                                fontSize={11}
                                                sx={{ width: '15%' }}
                                                noWrap
                                            >
                                                {item?.RACEDISTANCE}
                                            </Typography>
                                            <Typography fontSize={11} noWrap>
                                                {item?.EVENT}
                                            </Typography>
                                            <Typography fontSize={11} noWrap>
                                                {item?.RACECLASS}
                                            </Typography>
                                        </>
                                    ) : (
                                        <Typography
                                            fontSize={12}
                                            fontWeight={'600'}
                                        >
                                            {item?.COMMENT}
                                        </Typography>
                                    )}
                                </Stack>
                            ))}
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Stack
                            sx={{
                                paddingBottom: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                justifyItems: 'center',
                            }}
                        >
                            {(countOfRecord !== 1 || showSelect) && (
                                renderSelect(data[0]?.USERSELECTED)
                            )}
                            <Stack
                                className={classes.rowContainer}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    handeleDoine();
                                }}
                            >
                                <Typography className={classes.nameText}>
                                    Done
                                </Typography>
                            </Stack>
                        </Stack>
                    </>
                )
                }
            </Box >
        );
    };
    return (
        <React.Fragment>
            {isDesktop ? (
                <Modal
                    open={isModalOpen}
                    onClose={onClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box sx={{ bgcolor: 'white.main' }}>{getContent()}</Box>
                    </Box>
                </Modal>
            ) : (
                <Drawer
                    anchor="bottom"
                    open={isModalOpen}
                    onClose={onClose}
                    PaperProps={{
                        sx: {
                            border: 0,
                            position: { sm: 'absolute' },
                            mx: 1.5,
                            bgcolor: 'background.paper',
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        },
                    }}
                >
                    {getContent()}
                </Drawer>
            )}
        </React.Fragment>
    );
};

export default TipLocationModal;
