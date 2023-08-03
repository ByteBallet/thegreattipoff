export default async function updateToken(refreshToken) {
    const updateURL = '/api/auth/session?update';
    try {
        const update = await fetch(updateURL, {
            method: 'GET',
            credentials: 'include',
        });
        return true;
    } catch (e) {
        console.log('There was an error updating the token');
        return false;
    }
}
