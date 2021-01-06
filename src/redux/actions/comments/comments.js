const { commentsAPI } = require("../../../API")
const { CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } = require("../../actions_types")

export const createComment = (listId, taskId, text) => async dispatch => {
    const {data: payload} = await commentsAPI.createComment(listId, taskId, text)
    dispatch({type: CREATE_COMMENT, payload})
}

export const updateComment = (listId, taskId, commentId, newValue) => async dispatch => {
    const {data: payload} = await commentsAPI.createComment(listId, taskId, commentId, newValue)
    dispatch({type: UPDATE_COMMENT, payload})
}

export const deleteComment = (listId, taskId, commentId) => async dispatch => {
    const {data: payload} = await commentsAPI.createComment(listId, taskId, commentId)
    dispatch({type: DELETE_COMMENT, payload})
}


