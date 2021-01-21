import { initializeAPI } from "../../../API";
import { updateDefaultRequestHeaders } from "../../../API/configs/instance";
import { localStorageManipulator } from "../../../utils";
import { IS_FETCHING_INIT_DATA, IS_INITIALIZED, LOST_CONNECTION, NETWORK_CONNECTION_STATUS } from '../../actions_types';
import { isAuthorization } from "../authorization/authorization";
import { initializeBiography } from "../biography/biography";
import { initializePersonalData } from "../personal_data/personal_data";
import { initializeSettings } from "../settings/settings";
import { initializeTasks } from "../tasks/tasks";

export const isInitialized = payload => ({type: IS_INITIALIZED, payload})
const fetchingInitData = payload => ({type: IS_FETCHING_INIT_DATA, payload})

export const networkConnectionStatus = status => ({type: NETWORK_CONNECTION_STATUS, payload: {status}})
export const lostConnection = isLostConnection => ({type: LOST_CONNECTION, payload: {isLostConnection}})
export const initializeApp = () => async dispatch => {
    console.log('initializeApp')
    dispatch(fetchingInitData(true))
    try {

        var response = await initializeAPI.initialize();
        const {shouldUpdateTokens, payload} = response.data;

        if(shouldUpdateTokens) {
            const {newToken, newRefreshToken} = shouldUpdateTokens
            localStorageManipulator.saveTokens(newToken, newRefreshToken)
            updateDefaultRequestHeaders(newToken, newRefreshToken)
        }

        const {tasks, settings, biography, personalData, defaultTasksLists} = payload;
        const forTasksInit = {userTasksLists: tasks, defaultTasksLists: defaultTasksLists }
        
        dispatch( initializeTasks(forTasksInit) );
        dispatch( initializeSettings(settings) );
        dispatch( initializeBiography(biography) );
        dispatch( initializePersonalData(personalData));

        dispatch( isInitialized(true) );
        dispatch( isAuthorization(true) );

    } catch (error) {
        console.log('E', error)
        dispatch(isAuthorization(false));
        dispatch(isInitialized(false));
        
    } finally {
        dispatch(fetchingInitData(false));
    }
}