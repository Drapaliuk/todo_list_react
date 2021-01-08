import { initializeAPI } from "../../../API";
import { updateDefaultRequestHeaders } from "../../../API/configs/instance";
import { initializeAppParts, localStorageManipulator } from "../../../utils";
import { IS_FETCHING_INIT_DATA, IS_INITIALIZED } from '../../actions_types';
import { isAuthorization } from "../authorization/authorization";

export const isInitialized = payload => ({type: IS_INITIALIZED, payload})
const fetchingInitData = payload => ({type: IS_FETCHING_INIT_DATA, payload})


export const initializeApp = () => async dispatch => {
    dispatch(fetchingInitData(true))

    try {
        const response = await initializeAPI.initializeApp();
        const {shouldUpdateTokens, payload} = response.data;

        if(shouldUpdateTokens) {
            const {newToken, newRefreshToken} = shouldUpdateTokens
            localStorageManipulator.saveTokens(newToken, newRefreshToken)
            updateDefaultRequestHeaders(newToken, newRefreshToken)
        }

        initializeAppParts(dispatch, payload)
        dispatch( fetchingInitData(false) );
    } catch (error) {
        dispatch(isAuthorization(false));
        dispatch(isInitialized(false));
        
    } finally {
        dispatch(fetchingInitData(false));
    }
}