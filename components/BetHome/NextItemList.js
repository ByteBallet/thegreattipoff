import {
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    Container,
} from '@mui/material';
import { useState } from 'react';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import BoxDivider from '../Shared/BoxDivider';
import NextSportItem from './NextSportItem';
import NextRacingItem from './NextRacingItem';
import { MAIN_CATEGORIES } from '../../lib/constants';
import PromotionCategory from '../Promotion/PromotionCategory';
import PromotionCategoryRace from '../Promotion/PromotionCategoryRace';
import { useRouter } from 'next/router';

const NextItemList = ({
    hotevents,
    topTypes,
    types,
    active,
    filter,
    setFilter,
    filterRace,
    setFilterRace,
    reloadData,
    hideTabs = false
}) => {
    const router = useRouter();
    const onLink = () => {
        let href = active === MAIN_CATEGORIES.sports ? ("/sports") : ("/racing")
        router.push({
            pathname: href,
            query: active === MAIN_CATEGORIES.sports ? { upcoming: 1 } : {},
        });
    };
    return (
        <Box sx={{ mx: hideTabs ? 0 : 2 }}>
            <Typography
                variant="h2"
                component="p"
                fontWeight="fontWeightBold"
                my={2}
                sx={{ fontSize: 16, mt: 0, mb: 1 }}
            >
                {active === MAIN_CATEGORIES.racings
                    ? 'Next to Jump'
                    : 'Next Sports'}
            </Typography>
            <Card>
                <CardContent sx={{ py: 1, pb: 0 }}>
                    <TableContainer component={Box}>
                        {
                            !hideTabs &&
                            <Container
                                sx={{ display: 'flex', overflowX: 'auto', pl: 0 }}
                            >
                                {active === MAIN_CATEGORIES.sports ? (
                                    <PromotionCategory
                                        types={types}
                                        topTypes={topTypes}
                                        filter={filter}
                                        setFilter={setFilter}
                                        scrollButtons={false}
                                    />
                                ) : (
                                    <PromotionCategoryRace
                                        filterRace={filterRace}
                                        setFilterRace={setFilterRace}
                                    />
                                )}
                            </Container>
                        }
                        <Table
                            aria-label="caption table"
                            size="small"
                            className="racingTable"
                        >
                            <TableBody>
                                {active === MAIN_CATEGORIES.sports &&
                                    hotevents &&
                                    hotevents.length > 0 &&
                                    hotevents[0].mjs &&
                                    hotevents.map((row, idx) => (
                                        <NextSportItem
                                            data={row}
                                            idx={idx}
                                            key={idx}
                                            reloadData={reloadData}
                                        />
                                    ))}
                                {active === MAIN_CATEGORIES.racings &&
                                    hotevents &&
                                    hotevents.length > 0 &&
                                    hotevents[0].RACETIMEUTC &&
                                    hotevents.map((row, idx) => (
                                        <NextRacingItem
                                            race={row}
                                            idx={idx}
                                            key={idx}
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
                    paddingBottom: 0,
                    width: "100%"
                }}
            >
                View More <KeyboardArrowRightOutlinedIcon fontSize="small" />
            </Button>
            <BoxDivider />
        </Box>
    );
};

export default NextItemList;
