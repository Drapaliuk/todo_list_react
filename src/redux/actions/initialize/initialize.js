import { initializeAPI } from "../../../API";
import { updateDefaultRequestHeaders } from "../../../API/configs/instance";
import { localStorageManipulator } from "../../../utils";
import { IS_FETCHING_INIT_DATA, IS_INITIALIZED, LOST_CONNECTION, NETWORK_CONNECTION_STATUS, SERVER_INACCESSIBLE } from '../../actions_types';
import { isAuthorization } from "../authorization/authorization";
import { initializeBiography } from "../biography/biography";
import { initializePersonalData } from "../personal_data/personal_data";
import { initializeSettings } from "../settings/settings";
import { initializeTasks } from "../tasks/tasks";

export const isInitialized = payload => ({type: IS_INITIALIZED, payload})
const fetchingInitData = payload => ({type: IS_FETCHING_INIT_DATA, payload})
export const checkAccessabilityServer = () => async dispatch => {
    const {status} = await initializeAPI.checkAccessabilityServer()
    if(status === 200) {
        dispatch(serverInaccessible(false))
    }

}
export const networkConnectionStatus = status => ({type: NETWORK_CONNECTION_STATUS, payload: {status}})
export const serverInaccessible = status => ({type: SERVER_INACCESSIBLE, payload: {status}})
export const lostConnection = wasLostConnection => ({type: LOST_CONNECTION, payload: {wasLostConnection}})
export const initializeApp = () => async dispatch => {
    dispatch(fetchingInitData(true))
    try {
        var response = await initializeAPI.initialize();
        const {shouldUpdateTokens, payload} = response.data;

        if(shouldUpdateTokens) {
            const {newToken, newRefreshToken} = shouldUpdateTokens
            localStorageManipulator.saveTokens(newToken, newRefreshToken)
            updateDefaultRequestHeaders(newToken, newRefreshToken)
        }
        
        const {tasks, settings, folders, biography, personalData, defaultTasksLists} = payload;
        const forTasksInit = {userTasksLists: tasks, userTasksFolders: folders, defaultTasksLists: defaultTasksLists }
        console.log('forTasksInit', forTasksInit)
        dispatch( initializeTasks(forTasksInit) );
        dispatch( initializeSettings(settings) );
        dispatch( initializeBiography(biography) );
        dispatch( initializePersonalData(personalData));

        dispatch( isInitialized(true) );
        dispatch( isAuthorization(true) );

    } catch (error) {
        dispatch(isAuthorization(false));
        dispatch(isInitialized(false));
        
    } finally {
        dispatch(fetchingInitData(false));
    }
}