import { defaultTasksListsAPI } from '../../../API';
import { INITIALIZE_DEFAULT_TASKS_LISTS, UPDATE_DEFAULT_LISTS_SETTINGS } from '../../actions_types';



export const updateDefaultListSettings = (selectedListId, newValue) => async dispatch => {
    const {data: payload} = await defaultTasksListsAPI.updateSettings(selectedListId, newValue);
    dispatch({type: UPDATE_DEFAULT_LISTS_SETTINGS, payload})
}

export const initializeDefaultTasksLists = data => {
    return {type: INITIALIZE_DEFAULT_TASKS_LISTS, payload: data}
}