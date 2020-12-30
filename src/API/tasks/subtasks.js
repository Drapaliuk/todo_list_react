import {instance} from '../configs/instance';

export const subtasksAPI = {
    createSubtask: (listId, taskId, text) => {
        return instance.post('/tasks/subtasks', {listId, taskId, text})
    },

    updateSubtask: (listId, taskId, subtaskId, newValue) => {
        return instance.put('/tasks/subtasks', {listId, taskId, subtaskId, newValue})
    },

    deleteSubTask: (listId, taskId, subtaskId) => {
        return instance.delete('/tasks/subtasks', {data: {listId, taskId, subtaskId}})
    }

}