import {instance} from '../configs/instance';

export const commentsAPI = {
    createComment: (listId, taskId, text) => {
        return instance.post('/tasks/comments', {listId, taskId, text})
    },

    updateComment: (listId, taskId, commentId, newValue) => {
        return instance.put('/tasks/comments', {listId, taskId, commentId, newValue})
    },

    deleteComment: (listId, taskId, commentId) => {
        return instance.delete('/tasks/comments', {data: {listId, taskId, commentId}})
    }
}