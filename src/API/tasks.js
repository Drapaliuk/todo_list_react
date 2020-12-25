import {instance} from './configs/instance';

export const tasksAPI = {
    saveNewTask: (selectedListId, text) => {
        console.log('------')
        console.log(selectedListId, text)
        return instance.post('/tasks', {selectedListId, text})
    },

    changeTask: (listId, taskId, newValue) => {
        return instance.put('/tasks', {listId, taskId, newValue})
    },

    deleteTask: (listId, taskId) => {
        return instance.put('/tasks')
    },
}