import React from 'react';
import RaceField from './RaceField';
import RaceTipField from './RaceTipField';

const RenderRaceField = (props) => {
    return (
        <React.Fragment>
            {
                process.env.APP_BRAND == 'gto' ?
                    <RaceTipField {...props} />
                    :
                    <RaceField {...props} />
            }
        </React.Fragment>
    );
};

export default RenderRaceField;