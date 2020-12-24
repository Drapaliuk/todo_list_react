import { initializeAPI } from "../../API/initialize";
import { localStorageManipulator } from "../../utils";
import { IS_FETCHING_INIT_DATA, IS_INITIALIZED } from '../actions_types';
import { isAuthorization } from "./authorization";
import { initializeBiography } from "./biography/biography";
import { initializeSettings } from "./settings/settings";
import { initializeTasks } from "./tasks/tasks";

const isInitialized = payload => ({type: IS_INITIALIZED, payload})
const fetchingInitData = payload => ({type: IS_FETCHING_INIT_DATA, payload})


export const initialize = () => async dispatch => {
    dispatch(fetchingInitData(true))

    const token = localStorageManipulator.getToken();
    const refreshToken = localStorageManipulator.getRefreshToken();

    const response = await initializeAPI.initialize(token, refreshToken);
    const {responseCode, newToken, newRefreshToken, payload} = response.data;
    if(responseCode === 0) {
        dispatch(isAuthorization(false));
        dispatch(isInitialized(false));
        dispatch(fetchingInitData(false));
        return
    }
    localStorageManipulator.saveToken(newToken);
    localStorageManipulator.saveRefreshToken(newRefreshToken);


    const {tasks, biography, settings} = payload;

    dispatch( initializeTasks(tasks) );
    dispatch( initializeSettings(settings) );
    dispatch( initializeBiography(biography) );

    dispatch( isAuthorization(true) );
    dispatch( isInitialized(true) );

    dispatch( fetchingInitData(false) );
}


