import {instance} from '../configs/instance';

export const tasksAPI = {
    saveNewTask: (selectedListId, text, belongToFolder) => {
        return instance.post('/tasks', {selectedListId, text, belongToFolder})
    },

    changeTask: (selectedListId, selectedTaskId, newValue) => {
        return instance.put('/tasks', {selectedListId, selectedTaskId, newValue})
    },

    deleteTask: (selectedListId, selectedTaskId, belongToFolder) => {
        return instance.delete('/tasks', {data: {selectedListId, selectedTaskId, belongToFolder}})
    },
}