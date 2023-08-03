import authAPI from '@Components/utils/authAPI';

export default async function sendAlert(username, userid, clientid, desc, entrytype, alert = 0) {
    const url = `${process.env.server}/general/bookielogentry`;
    const body = {
        username: username,
        userid: userid,
        clientid: clientid,
        logentry: desc,
        entrytype: entrytype,
        alert: alert,
        device: 'web',
    };

    console.log('Sending alert', desc);
    // const response = await authAPI(url, body, "POST", false);
}
