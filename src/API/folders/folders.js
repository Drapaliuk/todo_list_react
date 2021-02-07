import {instance} from '../configs/instance';

export const folderAPI = {
    create: name => instance.post('/folders', {name}),
    delete: folderID => instance.delete('/folders', {data: {folderID}}),
    update: (selectedFolderID, newValue) => instance.put('/folders', {selectedFolderID, newValue}),
    insertList: (selectedFolderID, insertedListID) => instance.put('/folders/list', {selectedFolderID, insertedListID}),
    createList: (name, selectedFolderID) => instance.post('/folders/list', {name, selectedFolderID})
}