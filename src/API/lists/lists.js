import {instance} from '../configs/instance';

export const listsAPI = {
    saveNewList: name => instance.post('/lists', {name}),
    deleteList: listId => instance.delete('/lists', {data: {listId}}),
    update: (selectedListId, newValue) => instance.put('/lists', {selectedListId, newValue}),
    changeSettings: (selectedListId, newValue, folderID) => instance.put('/lists/settings', {selectedListId, newValue, folderID})
}