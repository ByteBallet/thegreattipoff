import { getGroupOne } from '@services/group/group.service';
import { useEffect, useState } from 'react';
import { groupBy, map } from 'lodash';
import { useMediaQuery } from '@mui/material';

import CircularLoader from '@Components/common/CircularLoader';
import NoDataLabal from '@Components/common/NoDataLabal';
import HeaderTwoSection from './HeaderTwoSection';

const HeaderTwo = () => {

    const isDesktop = useMediaQuery('(min-width:900px)');
    const [headerTwo, setHeaderTwo] = useState([]);
    const [loading, setLoading] = useState(true);

    const getGroupOneData = async () => {
        try {
            setLoading(true);
            const res = await getGroupOne();
            const data = res.groupone?.length > 0 ? res.groupone : []
            const groupedData = groupBy(data, 'CARNIVAL');
            const headerTwoData = map(groupedData, (value, key) => {
                return { title: key, data: value };
            });
            setHeaderTwo(headerTwoData)
        } catch (error) {
            console.log("error", error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getGroupOneData();
    }, [])

    const Content = () => (
        <div style={{ marginRight: isDesktop ? '20px' : 0 }}>
            {headerTwo.length > 0 && headerTwo.map((section, i) => {
                return (<HeaderTwoSection key={i} item={section}  />)
            }
            )}
        </div>)


    return (
        <>
            {loading && <CircularLoader />}
            {!loading && !headerTwo && <NoDataLabal text='No Data' color='#000' />}
            {<Content />}
        </>
    );
};
export default HeaderTwo;


