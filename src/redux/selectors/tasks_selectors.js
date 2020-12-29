export const isCreatedTasksLists = state => state.tasks.tasksLists.length > 0
export const getTasksLists = state => state.tasks.tasksLists;
export const getSelectedListId = state => state.tasks.selectedListId
export const getSelectedTaskId = state => {
    if(!isCreatedTasksLists(state)) return
    return state.tasks.selectedTaskId;
}

export const getSelectedListProperty = (state, property) => {
    if(!isCreatedTasksLists(state)) return

    const selectedListId = state.tasks.selectedListId;
    const list = state.tasks.tasksLists.find(list => list._id === selectedListId)
    if(!property) return list
    return list[property];  
}

export const getUncompletedTasks = sortBy => state => {
    if(!isCreatedTasksLists(state)) return
    const sortHandler = (taskA, taskB) => {
        if(taskA[sortBy] < taskB[sortBy]) return -1
        if(taskA[sortBy] > taskB[sortBy]) return 1
        return 0
    }

    const {tasks} = getSelectedListProperty(state)

    const unCompletedTasks = tasks?.filter(task => !task.hasDone)
    const pinnedTasks = unCompletedTasks?.filter(task => task.isPinned).sort(sortHandler)
    const unPinnedTasks = unCompletedTasks?.filter(task => !task.isPinned).sort(sortHandler)

    return [...pinnedTasks, ...unPinnedTasks]
}

export const getCompletedTasks = state => {
    if(!isCreatedTasksLists(state)) return
    const {tasks} = getSelectedListProperty(state)
    return tasks?.filter(task => task.hasDone)
}

export const getSelectedTaskProperty = (state, property) => {
    if(!isCreatedTasksLists(state)) return

    const selectedListId = state.tasks.selectedListId;
    const selectedTaskId = state.tasks.selectedTaskId;
    const {tasks} = state.tasks.tasksLists.find(list => list._id === selectedListId)
    const selectedTask = tasks.find(task => task._id === selectedTaskId)
    if(!property) return selectedTask
    return selectedTask[property]
}

export const getSelectedListSettings = (state, property) => {
    if(!isCreatedTasksLists(state)) return 
    const selectedListId = state.tasks.selectedListId;
    const list = state.tasks.tasksLists.find(list => list._id === selectedListId)
    if(!list) return false
    if(!property) return list.settings
    return list.settings[property]
}

