import React from 'react';
import { useContext } from 'react';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { useSession } from 'next-auth/client';
import { UserContext } from '@Context/User/UserProvider';
import InfoAccordion from './InfoAccordion';

const SpecialsAccordion = ({ title, content, eventId = "" }) => {
    const [session] = useSession();
    const { user } = useContext(UserContext);
    return (
        <React.Fragment>
            {
                session && user && user.mbsused && user.mbsused.filter((item) => item == eventId).length == 0 &&
                <InfoAccordion
                    title={title}
                    content={content}
                    icon={<CurrencyExchangeOutlinedIcon sx={{ color: "info.comment" }} />}
                    bgcolor={"background.comment"}
                    borderColor={"info.comment"}
                />
            }

        </React.Fragment >
    );
};

export default SpecialsAccordion;