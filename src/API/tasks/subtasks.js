import {instance} from '../configs/instance';

export const subtasksAPI = {
    createSubtask: (listId, taskId, text, folderID) => { 
        return instance.post('/tasks/subtasks', {listId, taskId, text, folderID})
    },

    updateSubtask: (listId, taskId, subtaskId, newValue, folderID) => { //! just update
        return instance.put('/tasks/subtasks', {listId, taskId, subtaskId, newValue, folderID})
    },

    deleteSubTask: (listId, taskId, subtaskId, folderID) => {
        return instance.delete('/tasks/subtasks', {data: {listId, taskId, subtaskId, folderID}})
    }

}