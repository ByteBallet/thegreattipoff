import ParentLayout from './ParentLayout';
import Header from '../Components/Header';
import UserData from '../Components/TableData';

import moment from 'moment';

function WpUpdates({ item }) {
    const { tipster, content } = item;

    return (
        <ParentLayout>
            {/* <Header avatar={tipster.AVATARPATH} showChip={'WEEKLY UPDATES'} /> */}
            <Header avatar={tipster.avatarpath} showChip={''} name={tipster.alias} mediaGroup={tipster.mediagroup} />
            <UserData content={content} />
        </ParentLayout>
    );
}

export default WpUpdates;
