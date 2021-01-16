// export const getTasksForDefaultAppList = (state) => {
//     const currentAppListId = state.tasks.selectedAppListId
//     const selectedAppListData = appListsData.find(list => list.id === currentAppListId)
//     const currentSortCriteria = getSelectedListSettings(state, 'sortBy')
//     const [sortBy, sortOrder] = currentSortCriteria.split('/');
//     const {getSortHandler} = new SortHandler(sortBy)

//     const filteredTasks = state.tasks.tasksLists.reduce((acc, list) => {
//         const tasks = list.tasks.filter(task => {
//             return selectedAppListData.filterHandler(task)
//         })
//         acc = [...acc, ...tasks]
//         return acc
//     }, [])

//     const uncompletedTasks = filteredTasks.filter(task => !task.hasDone).sort(getSortHandler(sortOrder))
//     const completedTasks = filteredTasks.filter(task => task.hasDone).sort(getSortHandler(sortOrder))
//     return {uncompletedTasks, completedTasks}
// }
// export const getTasksForUserLists = (state) => {
//     if(!isCreatedTasksLists(state)) return
//     const currentSortCriteria = getSelectedListSettings(state, 'sortBy')

//     const [sortBy, sortOrder] = currentSortCriteria.split('/');
//     const {getSortHandler} = new SortHandler(sortBy)
//     const {tasks} = getSelectedListProperty(state)

//     const unCompletedTasks = tasks?.filter(task => !task.hasDone)
//     const pinnedTasks = unCompletedTasks?.filter(task => task.isPinned).sort(getSortHandler(sortOrder))
//     const unPinnedTasks = unCompletedTasks?.filter(task => !task.isPinned).sort(getSortHandler(sortOrder))

//     return {
//         uncompletedTasks: [...pinnedTasks, ...unPinnedTasks],
//         completedTasks: [...tasks?.filter(task => task.hasDone)]
//     }
// }

// export const getUncompletedTasks = currentSortCriteria => state => {
//     if(!isCreatedTasksLists(state)) return
//     const [sortBy, sortOrder] = currentSortCriteria.split('/');
//     const {getSortHandler} = new SortHandler(sortBy)
//     const {tasks} = getSelectedListProperty(state)

//     const unCompletedTasks = tasks?.filter(task => !task.hasDone)
//     const pinnedTasks = unCompletedTasks?.filter(task => task.isPinned).sort(getSortHandler(sortOrder))
//     const unPinnedTasks = unCompletedTasks?.filter(task => !task.isPinned).sort(getSortHandler(sortOrder))

//     return [...pinnedTasks, ...unPinnedTasks]
// }

// export const getCompletedTasks = state => {
//     if(!isCreatedTasksLists(state)) return
//     const {tasks} = getSelectedListProperty(state)
//     return tasks?.filter(task => task.hasDone)
// }


// export const getImportantTasks = state => {
//     if(!isCreatedTasksLists(state)) return
//     const {tasks} = getSelectedListProperty(state)
//     return tasks?.filter(task => task.isImportant)
// }

// export const getSelectedAppListId = state => state.tasks.selectedAppListId
