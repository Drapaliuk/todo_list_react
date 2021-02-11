const { commentsAPI } = require("../../../API")
const { CREATE_COMMENT, DELETE_COMMENT } = require("../../actions_types")

export const createComment = (listId, taskId, text, folderID) => async dispatch => {
    const {data: payload} = await commentsAPI.createComment(listId, taskId, text, folderID)
    dispatch({type: CREATE_COMMENT, payload})
}

export const deleteComment = (listId, taskId, commentId, folderID) => async dispatch => {
    const {data: payload} = await commentsAPI.deleteComment(listId, taskId, commentId, folderID)
    dispatch({type: DELETE_COMMENT, payload})
}


