import { listsAPI } from "../../../API";
import { INITIALIZED_TASKS, SAVE_NEW_LIST, SELECT_TASKS_LIST, DELETE_TASKS_LIST } from "../../actions_types";

export const initializeTasks = payload => ({type: INITIALIZED_TASKS, payload})
export const saveNewList = newListName => async dispatch => {
    const { list } = (await listsAPI.saveNewList(newListName)).data;
    dispatch({type: SAVE_NEW_LIST, payload: list})
}
export const selectTasksList = listId => ({type: SELECT_TASKS_LIST, payload: listId});
export const deleteTasksList = listId => async dispatch => {
    const { responseCode } = (await listsAPI.deleteList(listId)).data;
    if(responseCode === 1) return dispatch({type: DELETE_TASKS_LIST})
}