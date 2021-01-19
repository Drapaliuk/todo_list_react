import {instance} from '../configs/instance';

export const defaultTasksListsAPI = {
    updateSettings: (selectedListId, newValue) => instance.put('/default-lists/settings', {selectedListId, newValue}),
}