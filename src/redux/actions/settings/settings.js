import { settingsAPI } from "../../../API/settings/settings";
import { DEFAULT_SETTINGS, INITIALIZED_SETTINGS, UPDATE_SETTINGS } from "../../actions_types";

export const initializeSettings = payload => ({type: INITIALIZED_SETTINGS, payload});
export const defaultSettings = () => ({type: DEFAULT_SETTINGS})
export const updateSettings = newValue => async dispatch => {
    dispatch({type: UPDATE_SETTINGS, payload: newValue})
    settingsAPI.updateSettings(newValue)
}