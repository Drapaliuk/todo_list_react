import { listsAPI, tasksAPI, folderAPI } from "../../../API";
import { INITIALIZED_TASKS,
         CREATE_LIST,
         SELECT_TASKS_LIST,
         DELETE_TASKS_LIST,
         CREATE_TASK,
         CHANGE_TASK,
         SELECT_TASK,
         CHANGE_TASKS_LIST_SETTINGS,
         DEFAULT_TASKS,
         DELETE_TASK,
         CLOSE_FULL_INFO,
         SELECT_APP_LIST,
         UPDATE_TASKS_LIST,
         SEARCH_BY_LETTERS,
         CREATE_FOLDER,
         DELETE_FOLDER,
         UPDATE_FOLDER,
         INSERT_LIST_TO_FOLDER,
         CREATE_LIST_IN_FOLDER,
         SELECT_LIST_FROM_FOLDER,
         SELECT_FOLDER
        } from "../../actions_types";

export const initializeTasks = payload => ({type: INITIALIZED_TASKS, payload})
export const saveNewList = (newListName, belongToFolder) => async dispatch => { 
    const { list } = (await listsAPI.saveNewList(newListName, belongToFolder)).data; //!
    dispatch({type: CREATE_LIST, payload: list})
}
export const selectTasksList = (listId, isDefaultAppList) => ({type: SELECT_TASKS_LIST, payload: {listId, isDefaultAppList}});
export const selectAppList = listId => ({type: SELECT_APP_LIST, payload: {listId}})
export const selectListFromFolder = (listID, folderID) => ({type: SELECT_LIST_FROM_FOLDER, payload: {listID, folderID}})

export const deleteTasksList = listId => async dispatch => {
    const {data: payload} = (await listsAPI.deleteList(listId));
    return dispatch({type: DELETE_TASKS_LIST, payload})
}

export const updateTasksList = (listId, newValue) => async dispatch => {
    const {data: payload} = (await listsAPI.update(listId, newValue));
    return dispatch({type: UPDATE_TASKS_LIST, payload})
}

export const saveNewTask = (selectedListId, text, belongToFolder) => async dispatch => {
    const {data: payload} = (await tasksAPI.saveNewTask(selectedListId, text, belongToFolder));
    return dispatch({type: CREATE_TASK, payload})
};

export const searchByLetters = pattern => ({type: SEARCH_BY_LETTERS, payload: {pattern}})


export const changeTask = (selectedListId, selectedTaskId, newValue, folderID) => async dispatch => {
    const {data: payload} = (await tasksAPI.changeTask(selectedListId, selectedTaskId, newValue, folderID))
    return dispatch({type: CHANGE_TASK, payload})
}

export const selectTask = (taskId, selectedListId) => ({type: SELECT_TASK, payload: {taskId, selectedListId}});

export const changeListSettings = (selectedListId, newValue, folderID) => async dispatch => {
    const {data: payload} = await listsAPI.changeSettings(selectedListId, newValue, folderID)
    dispatch({type: CHANGE_TASKS_LIST_SETTINGS, payload})
}

export const searchTaskByLetters = (listId, changedValue, folderID) => async dispatch => {
    dispatch({type: CHANGE_TASKS_LIST_SETTINGS, payload: {listId, changedValue, folderID}})
}

export const defaultTasks = () => ({type: DEFAULT_TASKS});
export const deleteTask = (selectedListId, selectedTaskId, folderID) => async dispatch => {
    const {data: payload} = await tasksAPI.deleteTask(selectedListId, selectedTaskId, folderID)
    dispatch({type: DELETE_TASK, payload})
}

export const closeFullInfo = () => ({type: CLOSE_FULL_INFO})

export const createFolder = name => async dispatch => {
    const {createdFolder} = (await folderAPI.create(name)).data;
    return dispatch({type: CREATE_FOLDER, payload: {createdFolder}})
}

export const updateFolder = (selectedFolderID, newValue) => async dispatch => {
    const {data: payload} = (await folderAPI.update(selectedFolderID, newValue));
    return dispatch({type: UPDATE_FOLDER, payload})
}

export const deleteFolder = folderID => async dispatch => {
    const {data: payload} = (await folderAPI.delete(folderID));
    return dispatch({type: DELETE_FOLDER, payload})
}

export const selectFolder = folderID => ({type: SELECT_FOLDER, payload: {folderID} })

export const insertListToFolder = (selectedFolderID, insertedListID) => async dispatch => {
    const {data: payload} = (await folderAPI.insertList(selectedFolderID, insertedListID));
    return dispatch({type: INSERT_LIST_TO_FOLDER, payload})
}

export const createListInFolder = (name, selectedFolderID) => async dispatch =>  {
    const {folderID, createdList} = (await folderAPI.createList(name, selectedFolderID)).data;
    return dispatch({type: CREATE_LIST_IN_FOLDER, payload: {folderID, createdList}})
}