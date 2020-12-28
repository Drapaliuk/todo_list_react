import { DEFAULT_SETTINGS, INITIALIZED_SETTINGS } from "../../actions_types";

export const initializeSettings = payload => ({type: INITIALIZED_SETTINGS, payload});
export const defaultSettings = () => ({type: DEFAULT_SETTINGS})