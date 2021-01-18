import { combineReducers } from "redux";
import { authorization } from "./authorization/authorization_reducer";
import { biography } from "./biography/biography";
import { settings } from "./settings/settings_reducer";
import { organizer } from "./organizer/organizer";
import { reducer as formReducer } from 'redux-form';
import { initialize } from './initialized/initialized_reducer';
import { personalData } from './personal_data/personal_data';

export const combinedReducers = combineReducers({
    initialize,
    settings,
    organizer,
    authorization,
    biography,
    personalData,
    form: formReducer
}) 