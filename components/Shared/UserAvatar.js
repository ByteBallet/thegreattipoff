import { useContext } from 'react';
import { Grid } from '@mui/material';
import AvatarUpload from '@Components/Avatar/AvatarUpload';
import { UserContext } from '@Context/User/UserProvider';

function UserAvatar({ dimensions }) {
    const { user } = useContext(UserContext);
    return (
        <AvatarUpload
            image={`${process.env.cdn}/images/avatar/ManFace14.jpg`}
            dimensions={dimensions}
            showUpdate={false}
            userID={user?.userID}
            avatarPos="AvatarUploadPos"
            iconAction={true}
        />
    );
}

export default UserAvatar;

/**
 * <UserAvatar dimensions={{ width: 50, height: 50 }} />
 */
