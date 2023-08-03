import React, { useState, useEffect, useContext, useId } from 'react';
import {
    Drawer,
    Button,
    Grid,
    Typography,
    Stack,
    Box,
    IconButton,
    SvgIcon,
    Divider,
    AppBar,
    Toolbar,
    CircularProgress,
    useMediaQuery,
} from '@mui/material';
import NumberFormat from 'react-number-format';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Trash from '../../../public/images/svg/trash.svg';
import BetSlipSingleLegs from '@Components/BetSlip/BetSlipSingleLegs';
import { useSession } from 'next-auth/client';
import srmStore from './store/srmStore';
import { utilSRM } from './utils/srmUtils';
import { TipContext } from '@Context/Tip/TipProvider';
import { returnMultiObj } from './getMultiObj';

const Leg = ({ item, type, raceid, fieldnum, fieldname }) => {
    const updateTip = srmStore((state) => state.updateTip);

    function deleteFunction() {
        let sType = utilSRM.getSelectionType(type);

        updateTip(raceid, {
            sType,
            fieldnum: item,
            fieldname,
            type: 'remove',
        });
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    pb: 0.5,
                }}
            >
                <Box>
                    <div>
                        <Typography color="white.main" fontSize={12}>
                            {item}. {fieldname}
                        </Typography>
                    </div>
                    <Typography color="grey.main" fontSize={12}>
                        {type}
                    </Typography>
                </Box>
                <Box sx={{ mr: 1 }}>
                    <IconButton
                        color="primary"
                        aria-label="delete"
                        sx={{ px: 0 }}
                        onClick={deleteFunction}
                    >
                        <SvgIcon
                            component={Trash}
                            viewBox="0 0 448 512"
                            fontSize="small"
                        />
                    </IconButton>
                </Box>
            </Box>
            <Grid item xs={12}>
                <Divider sx={{ borderColor: 'grey.border' }} />
            </Grid>
        </Box>
    );
};

const SRMLegs = ({
    winners,
    topTwo,
    topThree,
    topFour,
    raceid,
    fieldnum,
    fieldnames,
}) => {
    return (
        <Box>
            {winners.map((item, index) => (
                <Leg
                    key={`win-${index}`}
                    item={item}
                    type="Winner"
                    raceid={raceid}
                    fieldnum={fieldnum}
                    fieldname={fieldnames[item]}
                />
            ))}
            {topTwo.map((item, index) => (
                <Leg
                    key={`topTwo-${index}`}
                    item={item}
                    type="Top 2"
                    raceid={raceid}
                    fieldnum={fieldnum}
                    fieldname={fieldnames[item]}
                />
            ))}
            {topThree.map((item, index) => (
                <Leg
                    key={`topThree-${index}`}
                    item={item}
                    type="Top 3"
                    raceid={raceid}
                    fieldnum={fieldnum}
                    fieldname={fieldnames[item]}
                />
            ))}
            {topFour.map((item, index) => (
                <Leg
                    key={`topFour-${index}`}
                    item={item}
                    type="Top 4"
                    raceid={raceid}
                    fieldnum={fieldnum}
                    fieldname={fieldnames[item]}
                />
            ))}
        </Box>
    );
};

const SRMSummaryBar = ({ raceid }) => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    const { addTip } = useContext(TipContext);
    const srmBets = srmStore((state) => state.srm);
    const deleteAll = srmStore(state => state.deleteAll)

    const [expand, setExpand] = useState(false);
    const [loading, setLoading] = useState(false);
    const [session] = useSession();

    const showSelections = () => {
        setExpand(!expand);
    };

    let srmLegs = 0;
    let srmBetsAvailable = false;
    const currentBet = srmBets.find((item) => item.id === raceid);

    let winners = [];
    let topTwo = [];
    let topThree = [];
    let topFour = [];

    let fieldnames = {};

    if (currentBet) {
        srmBetsAvailable = true;
        Object.keys(currentBet.selections).forEach((key) => {
            srmLegs += currentBet.selections[key].length;
        });
        winners = currentBet.selections['winner'];
        topTwo = currentBet.selections['topTwo'];
        topThree = currentBet.selections['topThree'];
        topFour = currentBet.selections['topFour'];

        fieldnames = currentBet.fieldnames;
    }

    function removeAll(){
        deleteAll(currentBet.id)
    }

    function addSRMBetSlip() {
        const tipID = Date.now();
        let tip = { ...currentBet };
        tip.raceid = raceid;
        tip.id = tipID;

        const tipObj = returnMultiObj(tip);

        if (tipObj && tipObj !== null) {
            // Add to Tip Context as an srm entry
            addTip({ key: 'srm', tip: tipObj });
            // TODO: Remove from local context after adding to betslip
            deleteAll(raceid)
        }
    }

    const renderOdds = () => {
        return (
            <React.Fragment>
                <Grid
                    container
                    sx={{ bgcolor: 'black.main' }}
                    px={1.2}
                    spacing={0}
                    p={1}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs container alignItems="center">
                        {srmLegs > 0 && (
                            <Typography color="white.main" fontSize={12}>
                                {srmLegs} {srmLegs > 0 && 'leg'}
                                {srmLegs > 1 && 's'}
                            </Typography>
                        )}
                        {srmLegs > 0 && !expand && (
                            <IconButton
                                aria-label="showSelections"
                                onClick={showSelections}
                                sx={{ p: 0 }}
                            >
                                <KeyboardArrowUpIcon
                                    color="primary"
                                    fontSize="small"
                                />
                            </IconButton>
                        )}
                    </Grid>
                    <Grid item xs>
                        <Stack direction="row" alignItems="flex-end">
                            <Typography
                                color="grey.joinBorder"
                                fontSize={12}
                                mr={0.5}
                            >
                                Odds:
                            </Typography>
                            {loading ? (
                                <CircularProgress
                                    size={20}
                                    sx={{ color: 'grey.joinBorder' }}
                                />
                            ) : (
                                <Typography
                                    fontSize={12}
                                    color="white.main"
                                    fontWeight="bold"
                                >
                                    <NumberFormat
                                        thousandSeparator={true}
                                        value={10}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        displayType="text"
                                    />
                                </Typography>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={4.7}>
                        <Button
                            onClick={addSRMBetSlip}
                            color="success"
                            variant="contained"
                            size="small"
                            sx={{
                                width: '100%',
                                height: 40,
                                fontWeight: 'bold',
                                '&.Mui-disabled': {
                                    backgroundColor: 'border.divider',
                                    color: 'grey.main',
                                },
                            }}
                            disabled={srmLegs > 1 ? false : true}
                        >
                            Add to Slip
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    };

    const renderContent = () => {
        return (
            <React.Fragment>
                {expand && (
                    <Grid
                        container
                        sx={{ bgcolor: 'black.main' }}
                        px={1.2}
                        spacing={0}
                        p={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid
                            container
                            item
                            xs={12}
                            alignItems="center"
                            sx={{ pb: { xs: 6, sm: 1 } }}
                        >
                            <Grid item xs={12} container>
                                <Box
                                    onClick={showSelections}
                                    sx={{
                                        width: '80%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <KeyboardArrowDownIcon
                                        color="primary"
                                        fontSize="large"
                                    />
                                </Box>

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={0}
                                    onClick={removeAll}
                                >
                                    <Typography
                                        color="grey.joinBorder"
                                        fontSize={12}
                                        mr={0.5}
                                    >
                                        Clear all
                                    </Typography>
                                    <IconButton
                                        color="primary"
                                        aria-label="delete"
                                        sx={{ px: 0 }}
                                        onClick={() => {}}
                                    >
                                        <SvgIcon
                                            component={Trash}
                                            viewBox="0 0 448 512"
                                            fontSize="small"
                                        />
                                    </IconButton>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <SRMLegs
                                    winners={winners}
                                    topTwo={topTwo}
                                    topThree={topThree}
                                    topFour={topFour}
                                    raceid={raceid}
                                    fieldnames={fieldnames}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={{ borderColor: 'grey.border' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                )}

                {isDesktop ? (
                    <Box sx={{ position: 'sticky', bottom: 0 }}>
                        {renderOdds()}
                    </Box>
                ) : (
                    <AppBar
                        position="fixed"
                        color="primary"
                        sx={{ top: 'auto', bottom: 0 }}
                    >
                        <Toolbar disableGutters>{renderOdds()}</Toolbar>
                    </AppBar>
                )}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {isDesktop ? (
                <Box sx={{ position: 'sticky', bottom: 0, mt: 7 }}>
                    {renderContent()}
                </Box>
            ) : (
                <Drawer
                    anchor="bottom"
                    hideBackdrop={true}
                    variant="persistent"
                    open={true}
                    PaperProps={{
                        style: {
                            zIndex: 10,
                            maxHeight: '80%',
                        },
                    }}
                >
                    {renderContent()}
                </Drawer>
            )}
        </React.Fragment>
    );
};

export default SRMSummaryBar;
