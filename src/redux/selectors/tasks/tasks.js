import { appListsData } from "../../../service/app_lists_data/app_lists_data";
import { SortByDatesCreation, SortHandler } from "../../../utils";

const sortByDateCreation = new SortByDatesCreation('monday')


export const isCreatedTasksLists = state => state.tasks.tasksLists.length > 0
export const getTasksLists = state => state.tasks.tasksLists;
export const getSelectedListId = state => state.tasks.selectedListId
export const getSelectedTaskId = state => {
    if(!isCreatedTasksLists(state)) return
    return state.tasks.selectedTaskId;
}

export const getSelectedListProperty = (state, property) => {
    if(!isCreatedTasksLists(state)) return
    const isSelectedDefaultAppList = state.tasks.isSelectedAppList
    if(isSelectedDefaultAppList) {
        const currentDefaultAppList = appListsData.find(list => list.id === state.tasks.selectedAppListId)
        if(!property) return currentDefaultAppList
        return currentDefaultAppList[property]
    }

    const selectedListId = state.tasks.selectedListId;
    const currentUserlist = state.tasks.tasksLists.find(list => list._id === selectedListId)
    if(!property) return currentUserlist
    return currentUserlist[property];  
}

export const getTasks = state => {
    const filteredTasks = state.tasks.tasksLists.reduce((acc, list) => {
        const uncompletedTasks = list.tasks.filter(task => !task.hasDone)
        const addedBelongToList = uncompletedTasks.map(task => ({...task, belongToList: list._id}))
        acc = [...acc, ...addedBelongToList]
        return acc
    }, [])
    
    return filteredTasks
}

export const getSelectedAppListId = state => state.tasks.selectedAppListId

export const getSelectedAppListData = state => { //!
    const currentAppListId = state.tasks.selectedAppListId
    return appListsData.find(list => list.id === currentAppListId)
} 

export const getAmountTasksForAppLists = state => {
    const taskAmounts = appListsData.reduce((acc, el, idx) => {
        const amount = state.tasks.tasksLists.reduce((acc, list) => {
            const filteredElements = list.tasks.filter(task => {
                return el.filterHandler(task) && !task.hasDone
            })
            acc += filteredElements.length
            return acc
        }, 0)
        acc = {...acc,  [el.id]: amount}
        return acc
    }, {})
    return taskAmounts
}


export const getDefaultAppListTitle = state => {
    const currentAppListId = state.tasks.selectedAppListId
    return appListsData.find(list => list.id === currentAppListId).title
}

export const getTasksForDefaultAppList = state => {
    const currentAppListId = state.tasks.selectedAppListId
    const selectedAppListData = appListsData.find(list => list.id === currentAppListId)

    const filteredTasks = state.tasks.tasksLists.reduce((acc, list) => {
        const tasks = list.tasks.filter(task => {
            return selectedAppListData.filterHandler(task)
        })
        acc = [...acc, ...tasks]
        return acc
    }, [])

    const uncompletedTasks = filteredTasks.filter(task => !task.hasDone)
    const completedTasks = filteredTasks.filter(task => task.hasDone)
    return {uncompletedTasks, completedTasks}
}



export const getUncompletedTasks = currentSortCriteria => state => {
    if(!isCreatedTasksLists(state)) return
    const [sortBy, sortOrder] = currentSortCriteria.split('/');
    const {getSortHandler} = new SortHandler(sortBy)
    const {tasks} = getSelectedListProperty(state)

    const unCompletedTasks = tasks?.filter(task => !task.hasDone)
    const pinnedTasks = unCompletedTasks?.filter(task => task.isPinned).sort(getSortHandler(sortOrder))
    const unPinnedTasks = unCompletedTasks?.filter(task => !task.isPinned).sort(getSortHandler(sortOrder))

    return [...pinnedTasks, ...unPinnedTasks]
}

export const getCompletedTasks = state => {
    if(!isCreatedTasksLists(state)) return
    const {tasks} = getSelectedListProperty(state)
    return tasks?.filter(task => task.hasDone)
}

export const getTasksForUserLists = state => {
    if(!isCreatedTasksLists(state)) return
    const currentSortCriteria = getSelectedListSettings(state, 'sortBy')

    const [sortBy, sortOrder] = currentSortCriteria.split('/');
    const {getSortHandler} = new SortHandler(sortBy)
    const {tasks} = getSelectedListProperty(state)

    const unCompletedTasks = tasks?.filter(task => !task.hasDone)
    const pinnedTasks = unCompletedTasks?.filter(task => task.isPinned).sort(getSortHandler(sortOrder))
    const unPinnedTasks = unCompletedTasks?.filter(task => !task.isPinned).sort(getSortHandler(sortOrder))

    return {
        uncompletedTasks: [...pinnedTasks, ...unPinnedTasks],
        completedTasks: [...tasks?.filter(task => task.hasDone)]
    }

}


export const getSelectedTaskProperty = (state, property) => {
    if(!isCreatedTasksLists(state)) return

    const selectedListId = state.tasks.selectedListId;
    const selectedTaskId = state.tasks.selectedTaskId;
    const foundList = state.tasks.tasksLists.find(list => list._id === selectedListId)
    if(!foundList) return 
    const selectedTask = foundList.tasks.find(task => task._id === selectedTaskId)
    if(!property) return selectedTask
    return selectedTask[property]
}


export const getImportantTasks = state => {
    if(!isCreatedTasksLists(state)) return
    const {tasks} = getSelectedListProperty(state)
    return tasks?.filter(task => task.isImportant)
}


export const getSelectedListSettings = (state, property) => {
    if(!isCreatedTasksLists(state)) return 
    const selectedListId = state.tasks.selectedListId;
    const list = state.tasks.tasksLists.find(list => list._id === selectedListId)
    if(!list) return false
    if(!property) return list.settings
    return list.settings[property]
}

