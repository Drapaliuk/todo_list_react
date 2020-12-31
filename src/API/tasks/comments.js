import {instance} from '../configs/instance';

export const commentsAPI = {
    createComment: (listId, taskId, text) => {
        return instance.post('/tasks/subtasks', {listId, taskId, text})
    },

    updateComment: (listId, taskId, commentId, newValue) => {
        return instance.put('/tasks/subtasks', {listId, taskId, commentId, newValue})
    },

    deleteComment: (listId, taskId, commentId) => {
        return instance.delete('/tasks/subtasks', {data: {listId, taskId, commentId}})
    }
}