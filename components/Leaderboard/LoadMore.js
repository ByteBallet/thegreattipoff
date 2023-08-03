const { Box, Button, CircularProgress } = require('@mui/material');
import { UserContext } from '@Context/User/UserProvider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useState } from 'react';

import CustomDialog from '@Components/Shared/CustomDialog';
import Login from '@Components/user/Login';

function LoadMore({ callback, loading, }) {

    const { user } = useContext(UserContext)
    const [login, setLogin] = useState(false);
    const showMoreLogin = user?.userID ? false : true

    const handleOpenLogin = () => setLogin(true)
    const handleCloseLogin = () => { setLogin(false); }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
                disabled={loading}
                onClick={showMoreLogin ? handleOpenLogin : callback} color="black">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {showMoreLogin && "Login to "}Show More <ExpandMoreIcon color="black" />
                    </>
                )}
            </Button>

            <CustomDialog
                id={"login"}
                open={login}
                title={"Login to your account"}
                content={<Login onParentClose={handleCloseLogin} skipRoute={true} />}
                fullScreen
                showX
                onClose={handleCloseLogin}
                disablePortal={false}
            />
        </Box>
    );
}

export default LoadMore;
