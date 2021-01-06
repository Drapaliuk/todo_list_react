export const localStorageManipulator = {
    saveToken: token => localStorage.setItem('token', token),
    saveRefreshToken: refreshToken => localStorage.setItem('refresh_token', refreshToken),
    deleteToken: () => localStorage.removeItem('token'),
    deleteRefreshToken: () => localStorage.removeItem('refresh_token'),
    getToken: () => localStorage.getItem('token'),
    getRefreshToken: () => localStorage.getItem('refresh_token'),
    
    updateTokens: shouldUpdateTokens => {
        if(!shouldUpdateTokens) return
        const {newToken, newRefreshToken} = shouldUpdateTokens;
        localStorage.setItem('token', newToken)
        localStorage.setItem('refresh_token', newRefreshToken);
    },
    
    saveTokens: (token, refreshToken) => {
        localStorage.setItem('token', token)
        localStorage.setItem('refresh_token', refreshToken)
    },

    deleteTokens: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
    }
}