import { authAPI } from "../../API";
import { initializeAPI } from "../../API/initialize";
import { localStorageManipulator } from "../../utils";
import { IS_FETCHING_INIT_DATA, IS_INITIALIZED } from '../actions_types';
import { isAuthorization } from "./authorization";
import { initializeBiography } from "./biography/biography";
import { initializePersonalData } from "./personal_data/personal_data";
import { initializeSettings } from "./settings/settings";
import { initializeTasks } from "./tasks/tasks";

export const isInitialized = payload => ({type: IS_INITIALIZED, payload})
const fetchingInitData = payload => ({type: IS_FETCHING_INIT_DATA, payload})


export const initialize = () => async dispatch => {
    dispatch(fetchingInitData(true))

    const token = localStorageManipulator.getToken();
    const refreshToken = localStorageManipulator.getRefreshToken();

    const response = await initializeAPI.initialize(token, refreshToken);
    const {responseCode, shouldUpdateTokens, payload} = response.data;
    console.log('payload', payload)
    if(responseCode === 0) {
        dispatch(isAuthorization(false));
        dispatch(isInitialized(false));
        dispatch(fetchingInitData(false));
        return
    }

    if(shouldUpdateTokens) localStorageManipulator.saveTokens(shouldUpdateTokens)

    const {tasks, biography, settings, personalData} = payload;

    dispatch( initializeTasks(tasks) );
    dispatch( initializeSettings(settings) );
    dispatch( initializeBiography(biography) );
    dispatch( initializePersonalData(personalData) )

    dispatch( isAuthorization(true) );
    dispatch( isInitialized(true) );

    dispatch( fetchingInitData(false) );
}