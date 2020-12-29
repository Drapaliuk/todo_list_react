import {instance} from '../configs/instance';

export const subtasksAPI = {
    createSubtask: (listId, taskId, text) => {
        return instance.post('/tasks/subtasks', {listId, taskId, text})
    },

    changeSubTask: (listId, taskId, subtaskId, text) => {
        return instance.put('/tasks/subtasks', {listId, taskId, subtaskId, text})
    },

    deleteSubTask: (listId, taskId, subtaskId) => {
        return instance.delete('/tasks/subtasks', {data: {listId, taskId, subtaskId}})
    }

}