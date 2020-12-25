import {instance} from './configs/instance';

export const listsAPI = {
    saveNewList: name => {
        console.log('SAVE NEW LIST')
        return instance.post('/lists', {name})
    },

    deleteList: listId => {
        return instance.delete('/lists', {data: {listId}})
    },

    renameList: (listId, newName) => {
        return instance.put('/lists', {listId, newName})
    },

    changeSettings: (listId, newValues) => {
        return instance.put('/lists/settings', {listId, ...newValues})
    }
}