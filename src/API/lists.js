import {instance} from './configs/instance';

export const listsAPI = {
    saveNewList: name => instance.post('/lists', {name}),
    deleteList: listId => instance.delete('/lists', {data: {listId}}),
    renameList: (listId, newName) => instance.put('/lists', {listId, newName}),
    changeSettings: (selectedListId, newValue) => instance.put('/lists/settings', {selectedListId, newValue})
}