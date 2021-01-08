import { initializeBiography, initializePersonalData, initializeSettings, initializeTasks, isAuthorization, isInitialized } from "../../redux/actions";

export const initializeAppParts = (dispatch, user) => {
    const {tasks, settings, biography, personalData} = user;
    console.log('+++++++++++++', user)
    dispatch( initializeTasks(tasks) );
    dispatch( initializeSettings(settings) );
    dispatch( initializeBiography(biography) );
    dispatch( initializePersonalData(personalData));
    dispatch( isAuthorization(true) );
    dispatch( isInitialized(true) );

}
