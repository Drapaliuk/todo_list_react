import {instance} from '../configs/instance';

export const tasksAPI = {
    saveNewTask: (selectedListId, text) => {
        return instance.post('/tasks', {selectedListId, text})
    },

    changeTask: (selectedListId, selectedTaskId, newValue) => {
        return instance.put('/tasks', {selectedListId, selectedTaskId, newValue})
    },

    deleteTask: (selectedListId, selectedTaskId) => {
        return instance.delete('/tasks', {data: {selectedListId, selectedTaskId}})
    },
}