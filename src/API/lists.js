import {instance} from './configs/instance';

export const listsAPI = {
    saveNewList: name => {
        return instance.post('/lists', {name})
    },

    deleteList: listId => {
        return instance.delete('/lists', {data: {listId}})
    },

    renameList: (listId, newName) => {
        return instance.put('/lists', {listId, newName})
    },

    changeSettings: (selectedListId, newValue) => {
        return instance.put('/lists/settings', {selectedListId, newValue})
    }
}