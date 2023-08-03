import { useRouter } from 'next/router';
import React from 'react';
import DesktopOtherRightMenu from './DesktopOtherRightMenu';

const DesktopRightMenu = () => {
    const router = useRouter()
    return (
        <React.Fragment>
            <DesktopOtherRightMenu />
        </React.Fragment>
    );
};

export default DesktopRightMenu;