export const getTasksLists = state => state.tasks.tasksLists;
export const getSelectedList = state => state.tasks.selectedList
export const getSelectedListName = state => state.tasks.selectedList.name
export const getSelectedListId = state => state.tasks.selectedList._id
export const getSelectedListSettings = state => state.tasks.selectedList.settings
export const getTasks = state => state.tasks.selectedList.tasks
export const getUncompletedTasks = state => state.tasks.selectedList?.tasks.filter(task => !task.hasDone)
export const getCompletedTasks = state => state.tasks.selectedList?.tasks.filter(task => task.hasDone)
export const getSelectedTaskId = state => state.tasks.selectedTask._id;