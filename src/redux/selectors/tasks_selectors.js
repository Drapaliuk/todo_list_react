export const getTasksLists = state => state.tasks.tasksLists;
export const getSelectedList = state => state.tasks.selectedList
export const getSelectedListName = state => state.tasks.selectedList.name
export const getSelectedListId = state => state.tasks.selectedList._id
export const getSelectedListSettings = state => state.tasks.selectedList.settings
export const getTasks = state => state.tasks.selectedList.tasks;
export const getUncompletedTasks = (sortBy = 'isPinned') => state => {
    const sortHandler = (taskA, taskB) => {
        if(taskA[sortBy] < taskB[sortBy]) return -1
        if(taskA[sortBy] > taskB[sortBy]) return 1
        return 0
    }

    const unCompletedTasks = state.tasks?.selectedList?.tasks?.filter(task => !task.hasDone)
    const pinnedTasks = unCompletedTasks.filter(task => task.isPinned).sort(sortHandler)
    const unPinnedTasks = unCompletedTasks.filter(task => !task.isPinned).sort(sortHandler)

    return [...pinnedTasks, ...unPinnedTasks]
}

export const getCompletedTasks = state => state.tasks?.selectedList?.tasks?.filter(task => task.hasDone)
export const getSelectedTaskId = state => state.tasks.selectedTask._id;
export const getSelectedTask = state => state.tasks.selectedTask;
export const getSortByValue = state => {
    const selectedListId = state.tasks.selectedList._id;
    const list = state.tasks.tasksLists.find(list => list._id === selectedListId)
    return list.settings.sortBy;

}