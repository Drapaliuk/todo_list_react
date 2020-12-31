const { commentsAPI } = require("../../../API/tasks/comments")
const { CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } = require("../../actions_types")

export const createSubtask = (listId, taskId, text) => async dispatch => {
    const {data: payload} = commentsAPI.createComment(listId, taskId, text)
    dispatch({type: CREATE_COMMENT, payload})
}

export const updateSubtask = (listId, taskId, commentId, newValue) => async dispatch => {
    const {data: payload} = commentsAPI.createComment(listId, taskId, commentId, newValue)
    dispatch({type: UPDATE_COMMENT, payload})
}

export const deleteSubtask = (listId, taskId, commentId) => async dispatch => {
    const {data: payload} = commentsAPI.createComment(listId, taskId, commentId)
    dispatch({type: DELETE_COMMENT, payload})
}


