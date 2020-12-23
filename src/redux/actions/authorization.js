import { authAPI } from "../../API"
import { localStorageManipulator } from "../../utils";
import { IS_AUTHORIZATION } from '../acctions_types';

const isAuthorization = payload => ({type: IS_AUTHORIZATION, payload})


export const login = async (login, password) => dispatch => {
    const {responseCode, token, refreshToken} = await authAPI.registration(login, password);
    if(responseCode === 0) {
        return dispatch(isAuthorization(false))
    }

    localStorageManipulator.saveAuthToken(token);
    localStorageManipulator.saveRefreshToken(refreshToken);
    return dispatch(isAuthorization(true));
}

export const refreshToken = async () => dispatch => {
    const token = localStorageManipulator.getTokens()
    const refreshToken = localStorageManipulator.getRefreshToken()
    const {responseCode, newToken, newRefreshToken} = await authAPI.refreshToken(token, refreshToken);

    if(responseCode === 0) {
        return dispatch(isAuthorization(false))
    }

    localStorageManipulator.saveAuthToken(newToken);
    localStorageManipulator.saveRefreshToken(newRefreshToken);
    return dispatch(isAuthorization(true));
}


export const checkAuth = async () => dispatch => {
    const {responseCode} = await authAPI.refreshToken(token, refreshToken);
    if(responseCode === 0) {
        return dispatch(isAuthorization(false))
    }
    
    return dispatch(isAuthorization(true))
}

export const logOut = () => {
    localStorageManipulator.deleteRefreshToken()
    localStorageManipulator.deleteToken()
    return isAuthorization(false)
}

export const registration = async (login, password) => dispatch => {
    const {responseCode, token, refreshToken} = await authAPI.registration(login, password);
    if(responseCode === 0) {
        return dispatch(isAuthorization(false))
    }
    localStorageManipulator.saveToken(token);
    localStorageManipulator.saveRefreshToken(refreshToken);
    dispatch(isAuthorization(true));
}