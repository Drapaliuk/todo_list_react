import {instance} from '../configs/instance';

export const tasksAPI = {
    saveNewTask: (selectedListId, text, belongToFolder) => {
        return instance.post('/tasks', {selectedListId, text, belongToFolder})
    },

    changeTask: (selectedListId, selectedTaskId, newValue, folderID) => {
        return instance.put('/tasks', {selectedListId, selectedTaskId, newValue, folderID})
    },

    deleteTask: (selectedListId, selectedTaskId, folderID) => {
        return instance.delete('/tasks', {data: {selectedListId, selectedTaskId, folderID}})
    },
}