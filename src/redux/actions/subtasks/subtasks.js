import { subtasksAPI } from "../../../API"
import { UPDATE_SUBTASK, DELETE_SUBTASK, CREATE_SUBTASK } from "../../actions_types"

export const createSubtask = (listId, taskId, text) => async dispatch => {
    const {data: payload} = await subtasksAPI.createSubtask(listId, taskId, text)
    dispatch({type: CREATE_SUBTASK, payload})
}

export const updateSubtask = (listId, taskId, subTaskId, text) => async dispatch => {
    const {data: payload} = await subtasksAPI.updateSubtask(listId, taskId, subTaskId, text)
    dispatch({type: UPDATE_SUBTASK, payload})
}

export const deleteSubtask = (listId, taskId, subTaskId) => async dispatch => {
    const {data: payload} = await subtasksAPI.deleteSubTask(listId, taskId, subTaskId)
    dispatch({type: DELETE_SUBTASK, payload})
}