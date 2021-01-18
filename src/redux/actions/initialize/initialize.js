import { initializeAPI } from "../../../API";
import { updateDefaultRequestHeaders } from "../../../API/configs/instance";
import { DEFAULT_TASKS_LIST_TODAY } from "../../../service";
import { initializeAppParts, localStorageManipulator } from "../../../utils";
import { IS_FETCHING_INIT_DATA, IS_INITIALIZED } from '../../actions_types';
import { isAuthorization } from "../authorization/authorization";
import { initializeBiography } from "../biography/biography";
import { initializeDefaultTasksLists } from "../default_tasks_lists/default_tasks_lists";
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

        const {tasks, settings, biography, personalData, defaultTasksLists} = payload;
        const todayTasks = defaultTasksLists[DEFAULT_TASKS_LIST_TODAY].tasks
        const forTasksInit = {userTasksLists: tasks, defaultTasksLists: defaultTasksLists }
        console.log('TODAY TASKS', forTasksInit)

        // dispatch( initializeTasks({userListTasks: tasks, todayTasks:todayTasks}) );
        
        dispatch( initializeTasks(forTasksInit) );
        dispatch( initializeSettings(settings) );
        dispatch( initializeBiography(biography) );
        dispatch( initializePersonalData(personalData));
        dispatch( initializeDefaultTasksLists(defaultTasksLists) )

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