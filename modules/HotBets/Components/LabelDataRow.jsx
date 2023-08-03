import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    // data row styles
    dataRowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: 'solid',
        borderBottomWidth: 1.25,
        borderBottomColor: theme.palette.border.secondary,
        margin: ' 0px 20px 0px 20px ',
    },
    labelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    labelText: {
        fontSize: '13px',
        paddingLeft: '5px',
    },
    dataWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '30%',
    },
    dataText: {
        fontSize: '13px',
        fontWeight: 'bold',
    },
}));

const LabelDataRow = ({ label, data }) => {
    const classes = useStyles();
    let show = (label && label.toLowerCase() == "age") ? (data > 0 ? true : false) : true
    return (
        <React.Fragment>
            {
                show &&
                <Stack className={classes.dataRowWrapper}>
                    <Stack className={classes.labelWrapper}>
                        <Box>
                            <Typography className={classes.labelText}>
                                {label}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack className={classes.dataWrapper}>
                        <Box>
                            <Typography className={classes.dataText} noWrap>{data}</Typography>
                        </Box>
                    </Stack>
                </Stack>
            }
        </React.Fragment>

    );
};
export default LabelDataRow;
