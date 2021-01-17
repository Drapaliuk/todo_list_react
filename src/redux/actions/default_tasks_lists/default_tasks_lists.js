import { defaultTasksListsAPI } from '../../../API';
import { INITIALIZE_DEFAULT_TASKS_LISTS, UPDATE_DEFAULT_LISTS_SETTINGS, 
         CREATE_TODAY_TASK, UPDATE_TODAY_TASK, DELETE_TODAY_TASK } from '../../actions_types';

export const initializeDefaultTasksLists = data => {
    return {type: INITIALIZE_DEFAULT_TASKS_LISTS, payload: data}
}

export const updateDefaultListSettings = (selectedListId, newValue) => async dispatch => {
    const {data: payload} = await defaultTasksListsAPI.updateSettings(selectedListId, newValue);
    dispatch({type: UPDATE_DEFAULT_LISTS_SETTINGS, payload})
}

export const createTodayTask = (selectedListId, text) => async dispatch => {
    const {data: payload} = (await defaultTasksListsAPI.createTodayTask(selectedListId, text));
    return dispatch({type: CREATE_TODAY_TASK, payload})
};

export const updateTodayTask = (selectedListId, selectedTaskId, newValue) => async dispatch => {
    const {data: payload} = (await defaultTasksListsAPI.updateTodayTask(selectedListId, selectedTaskId, newValue))
    dispatch({type: UPDATE_TODAY_TASK, payload})
}

export const deleteTodayTask = (selectedListId, selectedTaskId) => async dispatch => {
    const {data: payload} = await defaultTasksListsAPI.deleteTodayTask(selectedListId, selectedTaskId)
    dispatch({type: DELETE_TODAY_TASK, payload})
}