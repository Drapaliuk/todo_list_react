import { combineReducers } from "redux";
import { authorization } from "./authorization/authorization_reducer";
import { personalUserData } from "./personal_user_data/personal_user_data_reducer";
import { settings } from "./settings/settings_reducer";
import { tasks } from "./tasks/tasks_reducer";


export const combinedReducers = combineReducers({
    settings,
    tasks,
    authorization,
    personalUserData
}) 