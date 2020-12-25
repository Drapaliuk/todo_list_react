export const getTasksLists = state => state.tasks.tasksLists;
export const getSelectedList = state => state.tasks.selectedList
export const getSelectedListName = state => state.tasks.selectedList.name
export const getSelectedListId = state => state.tasks.selectedList._id
export const getSelectedListSettings = state => state.tasks.selectedList.settings
export const getTasks = state => state.tasks.selectedList.tasks
