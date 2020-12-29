import {instance} from '../configs/instance';

export const subtasksAPI = {
    saveNewComment: (selectedListId, selectedTaskId, text) => {
        return instance.post('/tasks/subtasks', {selectedListId, selectedTaskId, text})
    },

    changeComment: (selectedListId, selectedTaskId, selectedSubTaskId, text) => {
        return instance.put('/tasks/subtasks', {selectedListId, selectedTaskId, selectedSubTaskId, text})
    },

    deleteComment: (selectedListId, selectedTaskId, selectedSubTaskId) => {
        return instance.delete('/tasks/subtasks', {data: {selectedListId, selectedTaskId, selectedSubTaskId}})
    }
}