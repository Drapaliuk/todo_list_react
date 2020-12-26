import { listsAPI } from "../../../API";
import { tasksAPI } from "../../../API/tasks";
import { INITIALIZED_TASKS, SAVE_NEW_LIST, SELECT_TASKS_LIST, DELETE_TASKS_LIST, CLEAR_SELECTED_LIST, SAVE_NEW_TASK, CHANGE_TASK, SELECT_TASK } from "../../actions_types";

export const initializeTasks = payload => ({type: INITIALIZED_TASKS, payload})
export const saveNewList = newListName => async dispatch => {
    const { list } = (await listsAPI.saveNewList(newListName)).data;
    dispatch({type: SAVE_NEW_LIST, payload: list})
}
export const selectTasksList = listId => ({type: SELECT_TASKS_LIST, payload: listId});

export const deleteTasksList = listId => async dispatch => {
    const {deletedListId} = (await listsAPI.deleteList(listId)).data;
    return dispatch({type: DELETE_TASKS_LIST, payload: deletedListId})
}

export const clearSelectedList = () => ({type: CLEAR_SELECTED_LIST})
export const saveNewTask = (selectedListId, text) => async dispatch => {
    const {savedTask, listId} = (await tasksAPI.saveNewTask(selectedListId, text)).data;
    return dispatch({type: SAVE_NEW_TASK, payload: {savedTask, listId}})
};

export const changeTask = (selectedListId, selectedTaskId, newValue) => async dispatch => {
    const data = (await tasksAPI.changeTask(selectedListId, selectedTaskId, newValue)).data
    console.log('data', data)
    dispatch({type: CHANGE_TASK, payload: data})
}

export const selectTask = payload => ({type: SELECT_TASK, payload})