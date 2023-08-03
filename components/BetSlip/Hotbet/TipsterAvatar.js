import React from 'react';
import { Avatar } from '@mui/material';

const TipsterAvatar = ({ avatar, alias, borderColor, cndPath }) => {
    return (
        <Avatar
            sx={{
                width: 45,
                height: 45,
                border: 'solid',
                borderColor: borderColor || "grey.primary",
                borderWidth: 3,
            }}
            alt={alias}
            src={cndPath || `${process.env.gtoImgPath}/avatar/${avatar}`}
        ></Avatar>
    );
};

export default TipsterAvatar;