import { initializeAPI } from "../../../API";
import { updateDefaultRequestHeaders } from "../../../API/configs/instance";
import { initializeAppParts, localStorageManipulator } from "../../../utils";
import { IS_FETCHING_INIT_DATA, IS_INITIALIZED } from '../../actions_types';
import { isAuthorization } from "../authorization/authorization";
import { initializeBiography } from "../biography/biography";
import { initializePersonalData } from "../personal_data/personal_data";
import { initializeSettings } from "../settings/settings";
import { initializeTasks } from "../tasks/tasks";

export const isInitialized = payload => ({type: IS_INITIALIZED, payload})
const fetchingInitData = payload => ({type: IS_FETCHING_INIT_DATA, payload})


export const initializeApp = () => async dispatch => {
    dispatch(fetchingInitData(true))
    try {
        const response = await initializeAPI.initialize();
        const {shouldUpdateTokens, payload} = response.data;

        if(shouldUpdateTokens) {
            const {newToken, newRefreshToken} = shouldUpdateTokens
            localStorageManipulator.saveTokens(newToken, newRefreshToken)
            updateDefaultRequestHeaders(newToken, newRefreshToken)
        }

        const {tasks, settings, biography, personalData} = payload;
        dispatch( initializeTasks(tasks) );
        dispatch( initializeSettings(settings) );
        dispatch( initializeBiography(biography) );
        dispatch( initializePersonalData(personalData));

        dispatch( isInitialized(true) );
        dispatch( isAuthorization(true) );

    } catch (error) {
        dispatch(isAuthorization(false));
        dispatch(isInitialized(false));
        
    } finally {
        console.log('finally')
        dispatch(fetchingInitData(false));
    }
}