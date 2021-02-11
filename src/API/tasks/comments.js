import {instance} from '../configs/instance';

export const commentsAPI = {
    createComment: (listId, taskId, text, folderID) => {
        return instance.post('/tasks/comments', {listId, taskId, text, folderID})
    },

    deleteComment: (listId, taskId, commentId, folderID) => {
        return instance.delete('/tasks/comments', {data: {listId, taskId, commentId, folderID}})
    }
}