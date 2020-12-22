export const localStorageManipulator = {
    saveToken: token => localStorage.setItem('token', token),
    saveRefreshToken: refreshToken => localStorage.setItem('refresh_token', refreshToken),
    deleteToken: () => localStorage.removeItem('token'),
    deleteRefreshToken: () => localStorage.removeItem('refresh_token'),
    getToken: () => localStorage.getItem('token'),
    getRefreshToken: () => localStorage.getItem('refresh_token'),
}