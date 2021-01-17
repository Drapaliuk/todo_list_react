import { appListsData } from "../../../service/app_lists_data/app_lists_data";
import { SortByDatesCreation, SortHandler } from "../../../utils";


export const isCreatedTasksLists = state => state.tasks.tasksLists.length > 0
export const getTasksLists = state => state.tasks.tasksLists;
export const getSelectedListId = state => {
    const isSelectedDefaultAppList = state.tasks.isSelectedAppList
    if(isSelectedDefaultAppList) {
        return state.tasks.selectedAppListId
    }
    return state.tasks.selectedListId
}
export const getSelectedTaskId = state => {
    if(!isCreatedTasksLists(state)) return
    return state.tasks.selectedTaskId;
}

export const getSelectedListProperty = (state, property) => {
    const isSelectedDefaultAppList = state.tasks.isSelectedAppList
    if(isSelectedDefaultAppList) {
        const currentDefaultAppList = appListsData.find(list => list.id === state.tasks.selectedAppListId)
        console.log('currentDefaultAppList', appListsData)
        if(!property) return currentDefaultAppList
        return currentDefaultAppList[property]
    }

    if(!isCreatedTasksLists(state)) return


    const selectedListId = state.tasks.selectedListId;
    const currentUserList = state.tasks.tasksLists.find(list => list._id === selectedListId)
    if(!property) return currentUserList
    return currentUserList[property];  
}

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



export const getTasks = state => {
    if(!isCreatedTasksLists(state)) return
    const isSelectedDefaultAppList = state.tasks.isSelectedAppList
    const currentSortCriteria = getSelectedListSettings(state, 'sortBy')
    const [sortBy, sortOrder] = currentSortCriteria.split('/');
    const {getSortHandler} = new SortHandler(sortBy)
    let separatedTasks;
    
    if(isSelectedDefaultAppList) {
        const currentDefaultListId = state.tasks.selectedAppListId
        const selectedAppListData = appListsData.find(list => list.id === currentDefaultListId)

        const filteredTasks = state.tasks.tasksLists.reduce((acc, list) => {
            const tasks = list.tasks.filter(task => {
                return selectedAppListData.filterHandler(task)
            })
            acc = [...acc, ...tasks]
            return acc
        }, [])
        separatedTasks = taskSeparator(filteredTasks)
    }

    if(!isSelectedDefaultAppList) {
        const {tasks} = getSelectedListProperty(state)
        separatedTasks = taskSeparator(tasks)
    }

    function taskSeparator (tasks) {
        return {
            uncompletedTasks: {
                pinnedTasks: tasks.filter(task => !task.hasDone && task.isPinned),
                unpinnedTasks: tasks.filter(task => !task.hasDone && !task.isPinned)
            },
            completedTasks: {
                pinnedTasks: tasks.filter(task => task.hasDone && task.isPinned),
                unpinnedTasks: tasks.filter(task => task.hasDone && !task.isPinned)
            }
        }
    }

    function taskSorter (separatedTasks, sortHandler) {
        separatedTasks.uncompletedTasks.pinnedTasks.sort(sortHandler);
        separatedTasks.uncompletedTasks.unpinnedTasks.sort(sortHandler);
        separatedTasks.completedTasks.pinnedTasks.sort(sortHandler);
        separatedTasks.completedTasks.unpinnedTasks.sort(sortHandler);
        return separatedTasks
    }

    function resultCreator (sortedTasks) {
        const {completedTasks} = sortedTasks
        const {uncompletedTasks} = sortedTasks
        return {
            completedTasks: [ ...completedTasks.pinnedTasks, ...completedTasks.unpinnedTasks ],
            uncompletedTasks: [ ...uncompletedTasks.pinnedTasks, ...uncompletedTasks.unpinnedTasks ]
        }
    }

    const sortedTasks = taskSorter(separatedTasks, getSortHandler(sortOrder))
    return resultCreator(sortedTasks)
   

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

export const getSelectedListSettings = (state, property) => {
    if(!isCreatedTasksLists(state)) return
    const isSelectedDefaultAppList = state.tasks.isSelectedAppList
    if(isSelectedDefaultAppList) {
        const selectedDefaultList = state.tasks.selectedAppListId
        const settings = state.defaultTasksLists.data[selectedDefaultList].settings
        if(!property) return settings
        return settings[property]
    }
    const selectedListId = state.tasks.selectedListId;
    const list = state.tasks.tasksLists.find(list => list._id === selectedListId)
    if(!list) return false
    if(!property) return list.settings
    return list.settings[property]
}