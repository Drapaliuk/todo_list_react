import {instance} from './configs/instance';

export const tasksAPI = {
    saveNewTask: (selectedListId, text) => {
        console.log('------')
        console.log(selectedListId, text)
        return instance.post('/tasks', {selectedListId, text})
    },

    changeTask: (selectedListId, selectedTaskId, newValue) => {
        return instance.put('/tasks', {selectedListId, selectedTaskId, newValue})
    },

    deleteTask: (listId, taskId) => {
        return instance.put('/tasks')
    }
}