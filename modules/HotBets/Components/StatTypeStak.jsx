import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

import { getStakDetailsDataSet } from '@utils/hotBetUtils';

import LabelDataRow from './LabelDataRow';
// import LineChart from './LineChart';

const useStyles = makeStyles((theme) => ({
    //
}));

const StatTypeStak = ({ data }) => {
    let timechart = ""
    if (data?.TIMECHARTDATAGRID) {
        timechart = data?.TIMECHARTDATAGRID
    } else {
        timechart = data?.timechartdatagrid
    }
    if (!data || data.length === 0) return <div></div>;
    const classes = useStyles();
    const [detailsDataSet, setDetailsDataSet] = useState([]);

    const getLineChartData = (data) => {
        const newData =
            data?.length > 0 &&
            data.map((item, index) => ({
                label: index + 1,
                value: item[1],
            }));
        return newData;
    };

    useEffect(() => {
        const dateSet = getStakDetailsDataSet(data?.qStats[0]);
        // getLineChartData(timechart);
        setDetailsDataSet(dateSet);
    }, []);
    return (
        <>
            <Stack
                flexDirection="row"
                justifyContent="center"
                mt={3}
                mx={2}
                alignItems="center"
            >
               {/*  <LineChart data={getLineChartData(timechart)} /> */}
            </Stack>
            <Stack my={2}>
                {detailsDataSet?.length > 0 &&
                    detailsDataSet.map((item, idx) => (
                        <LabelDataRow
                            key={idx}
                            label={item.label}
                            data={item.data}
                        />
                    ))}
            </Stack>
        </>
    );
};

export default StatTypeStak;
