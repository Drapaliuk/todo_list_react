import {instance} from '../configs/instance';

export const defaultTasksListsAPI = {
    updateSettings: (selectedListId, newValue) => instance.put('/default-lists/settings', {selectedListId, newValue}),
    createTodayTask: (selectedListId, text) => {
        return instance.post('/default-lists/today-tasks', {selectedListId, text})
    },

    updateTodayTask: (selectedListId, selectedTaskId, newValue) => {
        return instance.put('/default-lists/today-tasks', {selectedListId, selectedTaskId, newValue})
    },

    deleteTodayTask: (selectedListId, selectedTaskId) => {
        return instance.delete('/default-lists/today-tasks', {data: {selectedListId, selectedTaskId}})
    },
}