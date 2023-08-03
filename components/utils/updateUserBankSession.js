export default async function updateUserBankSession() {
    const updateURL = '/api/auth/session?getBankAcct'
    try {
        const update = await fetch(updateURL, {
            method: 'GET',
            credentials: 'include'
        });
        return true;
    } catch (e) {
        console.log('There was an error updating the user');
        return false;
    }
}
