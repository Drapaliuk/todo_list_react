import { listsAPI } from "../../../API";
import { tasksAPI } from "../../../API/tasks";
import { INITIALIZED_TASKS,
         CREATE_LIST,
         SELECT_TASKS_LIST,
         DELETE_TASKS_LIST,
         CLEAR_SELECTED_LIST,
         SAVE_NEW_TASK,
         CHANGE_TASK,
         SELECT_TASK,
         CHANGE_TASKS_LIST_SETTINGS,
         DEFAULT_TASKS,
         DELETE_TASK,
         CLOSE_FULL_INFO
        } from "../../actions_types";

export const initializeTasks = payload => ({type: INITIALIZED_TASKS, payload})
export const saveNewList = newListName => async dispatch => { 
    const { list } = (await listsAPI.saveNewList(newListName)).data; //!
    dispatch({type: CREATE_LIST, payload: list})
}
export const selectTasksList = listId => ({type: SELECT_TASKS_LIST, payload: {listId}});

export const deleteTasksList = listId => async dispatch => {
    const {data: payload} = (await listsAPI.deleteList(listId));
    return dispatch({type: DELETE_TASKS_LIST, payload})
}

export const clearSelectedList = () => ({type: CLEAR_SELECTED_LIST})
export const saveNewTask = (selectedListId, text) => async dispatch => {
    const {data: payload} = (await tasksAPI.saveNewTask(selectedListId, text));
    return dispatch({type: SAVE_NEW_TASK, payload})
};

export const changeTask = (selectedListId, selectedTaskId, newValue) => async dispatch => {
    const {data: payload} = (await tasksAPI.changeTask(selectedListId, selectedTaskId, newValue))
    dispatch({type: CHANGE_TASK, payload})
}

export const selectTask = taskId => ({type: SELECT_TASK, payload: {taskId}});
export const changeListSettings = (selectedListId, newValue) => async dispatch => {
    const {data: payload} = await listsAPI.changeSettings(selectedListId, newValue)
    dispatch({type: CHANGE_TASKS_LIST_SETTINGS, payload})
}

export const defaultTasks = () => ({type: DEFAULT_TASKS});
export const deleteTask = (selectedListId, selectedTaskId) => async dispatch => {
    const {data: payload} = await tasksAPI.deleteTask(selectedListId, selectedTaskId)
    dispatch({type: DELETE_TASK, payload})
}

export const closeFullInfo = () => ({type: CLOSE_FULL_INFO})

