import SOCC from '../../public/images/svg/SOCC.svg';
import TENN from '../../public/images/svg/TENN.svg';
import OLY from '../../public/images/svg/OLY.svg';
import AUS from '../../public/images/svg/AUS.svg';
import BOX from '../../public/images/svg/BOX.svg';
import GREYS from '../../public/images/svg/greys-racing.svg';
import HARNESS from '../../public/images/svg/harness-racing.svg';
import INT from '../../public/images/svg/INT.svg';
import NBA from '../../public/images/svg/nba.svg';
import CLOUDY from '../../public/images/svg/cloudy.svg';
import HORSES from '../../public/images/svg/horse-racing.svg';
import SPORTS from '../../public/images/svg/sports.svg';
import MEDIA from '../../public/images/svg/media-icon.svg';
import ALL from '../../public/images/svg/all-icon.svg';
import CLOSE from '../../public/images/svg/close.svg';
import PLUS from '../../public/images/svg/plus.svg';
import AVATAR from '../../public/images/svg/avatar.svg';
import CHAMPION from '../../public/images/svg/championcup.svg';
import CLOCK from '../../public/images/svg/clock.svg';
import CHECK from '../../public/images/svg/check.svg';
import COG from '../../public/images/svg/cog.svg';
import INFO from '../../public/images/svg/info.svg';
import LOCK from '../../public/images/svg/lock.svg';
import LOCK2 from '../../public/images/svg/lock2.svg';
import RESULT from '../../public/images/svg/result.svg';
import COPY from '../../public/images/svg/copy.svg';
import HORS from '../../public/images/svg/icon-HORS.svg';
import RGLE from '../../public/images/svg/icon-RGLE.svg';
import PROMOTION from '../../public/images/svg/icon-promotion.svg';
import BASK from '../../public/images/svg/icon-BASK.svg';
import Alertsicon1 from '@public/images/svg/alerts-icon1.svg';
import Alertsicon from '@public/images/svg/alerts-icon.svg';

import { SvgIcon } from '@mui/material';

const Icons = {
    SOCC,
    TENN,
    OLY,
    AUS,
    BOX,
    GREYS,
    HARNESS,
    INT,
    NBA,
    HORSES,
    SPORTS,
    ALL,
    MEDIA,
    CLOSE,
    PLUS,
    AVATAR,
    CHAMPION,
    CLOCK,
    RESULT,
    CHECK,
    COG,
    INFO,
    LOCK,
    LOCK2,
    COPY,
    HORS,
    RGLE,
    PROMOTION,
    BASK,
    Alertsicon1,
    Alertsicon
};
const viewBoxes = {
    RGLE: '0 0 68 68',
    HORS: '0 0 466.36 510.95',
    SOCC: '0 0 56 56',
    TENN: '0 0 55 43',
    OLY: '0 0 100.67 100.65',
    AUS: '0 0 119 119',
    BOX: '0 0 466.36 510.95',
    GREYS: '0 0 1633 1465',
    HARNESS: ' 0 0 1311 1711.18',
    INT: ' 0 0 119 119',
    NBA: ' 0 0 119 119',
    CLOUDY: ' 0 0 380 229.65',
    HORSES: ' 0 0 466.36 510.95',
    SPORTS: ' 0 0 100.67 100.65',
    MEDIA: ' 0 0 352 512',
    ALL: ' 0 0 640 512',
    CLOSE: '0 0 121.31 122.876',
    PLUS: '0 0 1280.000000 1208.000000',
    AVATAR: '0 0 46.685 46.686',
    CHAMPION: '0 0 96.631 96.631',
    CLOCK: '0 0 16 16',
    RESULT: '0 0 487.3 487.3',
    CHECK: '0 0 47 47',
    COG: '0 0 260 260',
    INFO: '0 0 512 512',
    LOCK: '0 0 71 100',
    LOCK2: '0 0 32 32',
    COPY: '0 0 512 512',
    PROMOTION: '0 0 1980.9 1733.29',
    BASK: '0 0 68 68',
    Alertsicon1: '0 0 253.88 192.26',
    Alertsicon: '0 0 253.88 192.26',
};
const getIcons = (type) => {
    if (Icons[type] === undefined) {
        // console.log('getIcons undeinfed == ', type);
        return Icons['CLOUDY'];
    }
    return Icons[type];
};
export const CustomSvgIcon = ({ name, size = 20, color = 'grey' }) => {
    return (
        <SvgIcon
            component={Icons[name]}
            viewBox={viewBoxes[name]}
            sx={{ fontSize: size ? size : 20, color: color }}
        />
    );
};

export const getButtonIcons = (
    type,
    sportcode,
    size,
    color = 'black',
    sportstype
) => {
    return (
        <object
            data={`/images/svg/icon-${sportcode}.svg`}
            type="image/svg+xml"
            width={`${size}`}
            height={`${size}`}
            alt={`Icon for ${sportstype}`}
        />
    );
};

export default getIcons;
