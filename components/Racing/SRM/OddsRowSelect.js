import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';

import srmStore from './store/srmStore';

import { utilSRM } from './utils/srmUtils';

function ButtonOdds({ type, odds, raceid, event, fieldnum, fieldname }) {
    const tips = srmStore((state) => state.srm);
    const addTip = srmStore((state) => state.addTip);
    const updateTip = srmStore((state) => state.updateTip);
    const loading = srmStore((state) => state.loading);


    const btnGrey = 'grey.tipBtn';
    const colorIncrement = 'success.alert';
    const colorDecrement = 'error.alert';

    const [currentOdds, setCurrentOdds] = useState(odds);
    const [color, setColor] = useState(btnGrey);

    // Sets the colors for the SRM pricing updates
    useEffect(() => {
        if (odds) {
            if (currentOdds !== odds) {
                setCurrentOdds(odds);
            }
            if (currentOdds > odds) {
                setColor(colorDecrement);
                setTimeout(() => {
                    setColor(btnGrey);
                }, 2000);
            } else if (currentOdds < odds) {
                setColor(colorIncrement);
                setTimeout(() => {
                    setColor(btnGrey);
                }, 2000);
            }
        }
    }, [odds]);

    let sType = utilSRM.getSelectionType(type);
    let selected = false;
    let exists = false;

    let tip = tips.find((item) => item.id === raceid);
    if (tip) {
        exists = true;
        let currentField = tip.selections[sType].find(
            (item) => item === fieldnum
        );
        if (currentField) {
            selected = true;
        }
    }

    function buttonSelected() {
        if (loading) return;
        if (!exists) {
            tip = utilSRM.createTipObj(raceid, event.racemeet, fieldname);
            tip.selections[sType].push(fieldnum);
            tip.fieldnames[fieldnum] = fieldname;
            addTip(tip);
        } else {
            if (selected) {
                updateTip(raceid, {
                    sType,
                    fieldnum,
                    fieldname,
                    type: 'remove',
                });
            } else {
                updateTip(raceid, {
                    sType,
                    fieldnum,
                    fieldname,
                    type: 'add',
                });
            }
        }
    }

    return (
        <Box
            sx={{
                width: '25%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selected ? 'primary.main' : color,
                borderRadius: '10px',
                boxShadow: '0px 2px 0px 0px #dddddd',
                mr: '10px',
            }}
            onClick={buttonSelected}
        >
            <Box>
                <Typography
                    sx={{ color: 'black', textAlign: 'center' }}
                    component="p"
                >
                    <span style={{ fontSize: 12 }}>{type}</span>
                </Typography>
                <Typography
                    sx={{
                        color: 'black',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 13,
                    }}
                    noWrap
                    component="p"
                >
                    <NumberFormat
                        thousandSeparator={true}
                        value={currentOdds ? currentOdds : 0.0}
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType="text"
                    />
                </Typography>
            </Box>
        </Box>
    );
}

function OddsRowSelect(props) {
    const { odds, raceid, event, fieldnum, fieldname } = props;
    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'row', width: '100%', mb: 2 }}
        >
            <ButtonOdds
                type="Win"
                odds={odds?.PTOP1}
                raceid={raceid}
                event={event}
                fieldnum={fieldnum}
                fieldname={fieldname}
            />
            <ButtonOdds
                type="Top 2"
                odds={odds?.PTOP2}
                raceid={raceid}
                event={event}
                fieldnum={fieldnum}
                fieldname={fieldname}
            />
            <ButtonOdds
                type="Top 3"
                odds={odds?.PTOP3}
                raceid={raceid}
                event={event}
                fieldnum={fieldnum}
                fieldname={fieldname}
            />
            <ButtonOdds
                type="Top 4"
                odds={odds?.PTOP4}
                raceid={raceid}
                event={event}
                fieldnum={fieldnum}
                fieldname={fieldname}
            />
        </Box>
    );
}

export default OddsRowSelect;
