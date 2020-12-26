export const getTasksLists = state => state.tasks.tasksLists;
export const getSelectedList = state => state.tasks.selectedList
export const getSelectedListName = state => state.tasks.selectedList.name
export const getSelectedListId = state => state.tasks.selectedList._id
export const getSelectedListSettings = state => state.tasks.selectedList.settings
export const getTasks = state => state.tasks.selectedList.tasks
export const getUncompletedTasks = state => {
    const unCompletedTasks = state.tasks?.selectedList?.tasks?.filter(task => !task.hasDone)
    const sortedByPin = unCompletedTasks.sort((taskA, taskB) => {
        if(taskA.isPinned > taskB.isPinned) return -1
        if(taskA.isPinned < taskB.isPinned) return 1
        return 0
    })
    return sortedByPin
}
export const getCompletedTasks = state => state.tasks?.selectedList?.tasks?.filter(task => task.hasDone)
export const getSelectedTaskId = state => state.tasks.selectedTask._id;
export const getSelectedTask = state => state.tasks.selectedTask;