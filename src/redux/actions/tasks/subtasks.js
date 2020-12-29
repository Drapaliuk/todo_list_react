import { subtasksAPI } from "../../../API/tasks/subtasks"
import { UPDATE_SUBTASK, DELETE_SUBTASK, CREATE_SUBTASK } from "../../actions_types"

export const createSubtask = (listId, taskId, text) => async dispatch => {
    const {data} = await subtasksAPI.createSubtask(listId, taskId, text)
    dispatch({type: CREATE_SUBTASK, payload: data})
}

export const updateSubtask = (listId, taskId, subTaskId, text) => async dispatch => {
    const {data} = await subtasksAPI.changeSubTask(listId, taskId, subTaskId, text)
    dispatch({type: UPDATE_SUBTASK, payload: data})
}

export const deleteSubtask = (listId, taskId, subTaskId, text) => async dispatch => {
    const {data} = await subtasksAPI.changeSubTask(listId, taskId, subTaskId, text)
    dispatch({type: DELETE_SUBTASK, payload: data})
}