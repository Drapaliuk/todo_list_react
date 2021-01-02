import { SortHandler } from "../../utils/filters";

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

export const getUncompletedTasks = currentSortCriteria => state => {
    if(!isCreatedTasksLists(state)) return
    
    const [sortBy, sortOrder] = currentSortCriteria.split('/');
    console.log('sortOrder', sortOrder)

    // const sortByHandler = new SortHandler(sortBy)

    const sortHandlers = {
        desc: (valueA, valueB) => {
            const valueType = typeof valueA[sortBy]
            console.log(valueType)
            if(valueType === 'string') {
                if(valueA[sortBy] < valueB[sortBy]) return -1
                if(valueA[sortBy] > valueB[sortBy]) return 1
                return 0
            }

            if(valueType === 'number' || valueType === 'boolean') {
                return (valueA[sortBy] - valueB[sortBy])
            }
    
        },
    
        asc: (valueA, valueB) => {
            const valueType = typeof valueA[sortBy]
            if(valueType === 'string') {
                if(valueA[sortBy] > valueB[sortBy]) return -1
                if(valueA[sortBy] < valueB[sortBy]) return 1
                return 0
            }

            if(valueType === 'number' || valueType === 'boolean') {
                return (valueB[sortBy] - valueA[sortBy])
            }
        }
    }

    const {tasks} = getSelectedListProperty(state)

    const unCompletedTasks = tasks?.filter(task => !task.hasDone)
    const pinnedTasks = unCompletedTasks?.filter(task => task.isPinned).sort(sortHandlers[sortOrder])
    const unPinnedTasks = unCompletedTasks?.filter(task => !task.isPinned).sort(sortHandlers[sortOrder])

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

