export default async function updateUserSession(usersetting) {
    const updateURL = (usersetting ? '/api/auth/session?usersetting' : '/api/auth/session?reset');
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
