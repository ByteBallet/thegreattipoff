import { UserContext } from '@Context/User/UserProvider';
import DateTitle from '@modules/Transactions/Components/DateTitle';
import { Box, Card, CardContent, Divider, Grid, Stack, ThemeProvider, Typography } from '@mui/material';
import { getResults } from '@services/tipster/tipsterService';
import { getGroupDataSet } from '@utils/transactions.util';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import RenderTipsterResults from './RenderTipsterResults';
import * as ReactDOM from 'react-dom';
import { render } from 'react-dom';
import theme from '@Components/Themes/theme';


const RenderNewsDetail = ({ innerHTML, setinnerHTML, tipsterDetails, data }) => {
    const { user } = useContext(UserContext)
    const [results, setResults] = useState([])

    const getResultsData = async () => {
        let body = {
            cat: tipsterDetails?.[1],
            racetype: tipsterDetails?.[2],
            uid: user?.userID ?? 0,
            tipsterid: tipsterDetails?.[0],
            adid: 0,
            startrec: 0,
            resulttype: tipsterDetails?.[5],
            tipster: true,
            menu: false,
            tracks: null,
            timeperiod: tipsterDetails?.[3],
            page: 'tipster',
            tipType: [tipsterDetails?.[4]],
        };
        const response = await getResults(body);
        if (response?.data?.results) {
            handleDataFormat(response?.data?.results);
        }
    }

    const handleDataFormat = (dataSet) => {
        if (dataSet?.length > 0) {
            const newData =
                dataSet.map((item) => {
                    const dateTimeValue = item?.RACEDATE;
                    const formatedDate = moment(dateTimeValue).format('DD MMM YYYY');
                    return {
                        ...item,
                        date: formatedDate,
                    };
                });
            const groupDataSet = getGroupDataSet(newData);
            setResults(groupDataSet);
        } else {
            setResults([])
        }
    };

    useEffect(() => {
        if (tipsterDetails?.length > 0) {
            getResultsData()
        }
    }, [tipsterDetails])

    useEffect(() => {
        if (results?.length > 0 && document.getElementById("generateTipsterResults")) {
            const root = document.getElementById('generateTipsterResults')
            render(<ThemeProvider theme={theme}><RenderTipsterResults results={results} /></ThemeProvider>, root);
        }
    }, [results])

    return (
        <Box className="FeatureArticle">
            <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
        </Box>
    );
};

export default RenderNewsDetail;