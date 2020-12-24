import { authAPI } from "../../API"
import { localStorageManipulator } from "../../utils";
import { IS_AUTHORIZATION } from '../actions_types';
import { IS_FETCHING_CHECK_AUTH } from "../actions_types/authorization";

export const isAuthorization = payload => ({type: IS_AUTHORIZATION, payload})
const fetchingCheckAuth = payload => ({type: IS_FETCHING_CHECK_AUTH, payload})

export const login = (login, password) => async dispatch => {
    dispatch(fetchingCheckAuth(true))
    const {responseCode, token, refreshToken} = await authAPI.registration(login, password);

    if(responseCode === 0) {
        return dispatch(isAuthorization(false))
    }

    localStorageManipulator.saveAuthToken(token);
    localStorageManipulator.saveRefreshToken(refreshToken);
    dispatch(isAuthorization(true));
    return dispatch(fetchingCheckAuth(false))

}

export const refreshToken = () => async dispatch => {
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


export const checkAuth = () => async dispatch => {
    dispatch(fetchingCheckAuth(true))
    const token = localStorageManipulator.getToken()
    const {responseCode} = await authAPI.checkAuth(token);
    if(responseCode === 0) {
        return dispatch(isAuthorization(false))
    }
    
    dispatch(isAuthorization(true))
    return dispatch(fetchingCheckAuth(false))
}

export const logOut = () => {
    localStorageManipulator.deleteRefreshToken()
    localStorageManipulator.deleteToken()
    return isAuthorization(false)
}

export const registration = (login, password) => async dispatch => {
    dispatch(fetchingCheckAuth(true))

    const response = await authAPI.registration(login, password);
    const {responseCode, token, refreshToken} = response.data

    if(responseCode === 0) {
        return dispatch(isAuthorization(false))
    }
    localStorageManipulator.saveToken(token);
    localStorageManipulator.saveRefreshToken(refreshToken);

    dispatch(isAuthorization(true));
    return dispatch(fetchingCheckAuth(false))
}