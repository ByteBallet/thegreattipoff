import React from 'react';
import IcomoonReact from 'icomoon-react';
import iconSet from '@utils/selection.json';

const SportIcon = (props) => {
    const { color, size = "100%", icon, className = "" } = props;
    return (
        <IcomoonReact
            className={className}
            iconSet={iconSet}
            color={color}
            size={size}
            icon={icon}
        />
    );
};
export default SportIcon;