import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

import PieChart from '../../Components/PieChart';
import { getPunterProfile } from '@services/hotbets/hotbetsService';
import { getPieChartData, getProfileDetails } from '@utils/hotBetUtils';
import CircularLoader from '@Components/common/CircularLoader';
import NoDataLabal from '@Components/common/NoDataLabal';
import LabelDataRow from '../../Components/LabelDataRow';

const useStyles = makeStyles((theme) => ({
    detailsText: {
        fontSize: '14px',
        margin: '0px',
        padding: '0px',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: '15px',
        textAlign: 'left',
        margin: '0px',
        padding: '15px 0px 12px 20px',
        fontWeight: 'bold',
    },
    box: {
        width: 15,
        height: 15,
        borderRadius: 2,
        marginRight: '5px',
    },
}));

const Profile = ({ selectedType, uid, name, setbio }) => {
    const classes = useStyles();
    const [details, setDetails] = useState([]);
    const [chartData, setChartData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    //

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await getPunterProfile(selectedType, uid);
            if (response?.profile) {
                setDetails(getProfileDetails(response?.profile));
                setbio && setbio(response?.profile?.bio);
                setChartData(
                    getPieChartData(
                        response?.profile?.oddschartdata,
                        response?.profile?.totalwincount
                    )
                );
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {/* {!isLoading && details?.length === 0 && chartData?.length === 0 && (
                <NoDataLabal color="black" />
            )} */}
            {isLoading && <CircularLoader />}
            {!isLoading && (
                <>
                    <p className={classes.headerText}>
                        {`${name}'s Betting profile`}
                    </p>
                    <Box mb={1.5}>
                        {details.map((item) => (
                            <LabelDataRow
                                key={item?.id}
                                data={item?.data}
                                label={item?.label}
                            />
                        ))}
                    </Box>
                    <Stack className={classes.rowContainer}>
                        {chartData?.length > 0 && <PieChart data={chartData} />}
                        <Stack className={classes.columnContainer}>
                            {chartData?.length > 0 &&
                                chartData.map((item) => (
                                    <Stack
                                        key={item?.id}
                                        className={classes.rowContainer}
                                    >
                                        <Box
                                            sx={{
                                                background: item?.color,
                                            }}
                                            className={classes.box}
                                        />
                                        <Box sx={{ width: 80 }}>
                                            <p className={classes.detailsText}>
                                                {item?.details}
                                            </p>
                                        </Box>
                                    </Stack>
                                ))}
                        </Stack>
                    </Stack>
                </>
            )}
        </>
    );
};
export default Profile;
