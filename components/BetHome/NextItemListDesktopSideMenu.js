import { useCallback, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Box,
    Button,
    Container,
} from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useRouter } from 'next/router';

import { getAllRaces } from '@lib/fetcher';

import NextRacingItem from './NextRacingItem';
import { MAIN_CATEGORIES } from '../../lib/constants';
import PromotionCategoryRace from '../Promotion/PromotionCategoryRace';

const NextItemListDesktopSideMenu = ({

}) => {

    const [state, setState] = useState({
        active: MAIN_CATEGORIES.racings,
        filter: 'ALL',
        filterRace: {
            race: 'A',
            media: '1',
            period: '365',
        },
    });
    const initData = {
        hotevents: [],
    };
    const [data, setData] = useState(initData);

    const setFilterRace = (filterRace) => {
        setState({
            ...state,
            filterRace,
        });
    };
    const reloadData = useCallback(async (state2 = state, data) => {
        const active = state2.active;
        const filter =
            active === MAIN_CATEGORIES.racings
                ? state2.filterRace.race
                : state2.filter;
        const data2 = (await getAllRaces(0, filter)) || {};
        setData((data) => {
            return {
                ...data,
                hotevents: data2.all,
            };
        });

    }, []);


    useEffect(() => {
        reloadData(state, data);
    }, [state]);



    const router = useRouter();
    const onLink = () => {
        let href = state.active === MAIN_CATEGORIES.sports ? ("/sports") : ("/racing")
        router.push({
            pathname: href,
            query: state.active === MAIN_CATEGORIES.sports ? { upcoming: 1 } : {},
        });
    };


    return (
        <Box >
            <Card>
                <CardContent sx={{ py: 1, pb: 0 }}>
                    <TableContainer sx={{
                        padding: 0, margin: 0
                    }}>
                        <PromotionCategoryRace
                            filterRace={state.filterRace}
                            setFilterRace={setFilterRace}
                            isSelectedItemColorWhite

                        />

                        <Table
                            aria-label="caption table"
                            size="small"
                            className="racingTable"
                        >
                            <TableBody>
                                {state.active === MAIN_CATEGORIES.racings &&
                                    data.hotevents &&
                                    data.hotevents.length > 0 &&
                                    data.hotevents[0].RACETIMEUTC &&
                                    data.hotevents.map((row, idx) => (
                                        <NextRacingItem
                                            key={idx}
                                            race={row}
                                            reloadData={reloadData}
                                        />
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Button
                variant="text"
                onClick={() => onLink()}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    color: '#000',
                    mt: 1,
                    fontSize: 13,
                    paddingBottom: 1.5,
                    width: "100%"
                }}
            >
                View More <KeyboardArrowRightOutlinedIcon fontSize="small" />
            </Button>
        </Box>
    );
};

export default NextItemListDesktopSideMenu;
