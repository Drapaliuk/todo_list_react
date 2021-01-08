import { authAPI } from "../../../API"
import { updateDefaultRequestHeaders } from "../../../API/configs/instance";
import { localStorageManipulator } from "../../../utils";
import { IS_AUTHORIZATION, SET_AUTH_ERROR, IS_FETCHING_CHECK_AUTH, RESET_AUTH } from '../../actions_types';
import { initializeApp, isInitialized } from "../initialize/initialize";

export const isAuthorization = payload => {
    console.log('is authorization', payload)
    return {type: IS_AUTHORIZATION, payload}
}
const authReset = () => ({type: RESET_AUTH})
const fetchingCheckAuth = payload => ({type: IS_FETCHING_CHECK_AUTH, payload})
const setAuthError = payload => ({type: SET_AUTH_ERROR, payload})

export const login = (authData) => async dispatch => {
    dispatch(fetchingCheckAuth(true))
    try {
        const {token, refreshToken} = (await authAPI.login(authData)).data;
        localStorageManipulator.saveTokens(token, refreshToken);

        updateDefaultRequestHeaders(token, refreshToken);
        dispatch(initializeApp())
        dispatch(setAuthError(''))


    } catch ({response}) {
        dispatch(setAuthError(response.data.error))
    } finally {
        dispatch(fetchingCheckAuth(false));
    }
}

export const logOut = () => {
    localStorageManipulator.deleteTokens()
    return authReset()
}

export const registration = (login, password) => async dispatch => {
    dispatch(fetchingCheckAuth(true))
    try {
        const {token, refreshToken} = (await authAPI.registration(login, password)).data;

        localStorageManipulator.saveTokens(token, refreshToken)
        updateDefaultRequestHeaders(token, refreshToken);
        dispatch(initializeApp())

        dispatch(setAuthError(''));

    } catch ({response}) {
        dispatch(isAuthorization(false));
        dispatch(setAuthError(response?.data.error));
    } finally {
        dispatch(fetchingCheckAuth(false));
    }
}

