import { SvgIcon } from '@mui/material';

import horses from '@public/images/svg/horse-racing1.svg';
import harness from '@public/images/svg/harness-racing.svg';
import greys from '@public/images/svg/greys-racing.svg';

const RacingIcon = ({ racetype, width = 23, height = 26 }) => {
    return racetype == 'G' ? (
        <SvgIcon component={greys} viewBox="0 0 1633 1465" sx={{ width: width, height: height, color: 'grey.dark' }} />
    ) : racetype == 'H' ? (
        <SvgIcon component={harness} viewBox="0 0 1101 1850" sx={{ width: width, height: height, color: 'grey.dark' }} />
    ) : (
        <SvgIcon component={horses} viewBox="0 0 466.36 510.95" sx={{ width: width, height: height, color: 'grey.dark' }} />
    );
};

export default RacingIcon;
