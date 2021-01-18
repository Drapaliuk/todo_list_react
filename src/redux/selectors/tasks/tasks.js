import { DEFAULT_TASKS_LIST_TODAY } from "../../../service";
import { appListsData } from "../../../service/app_lists_data/app_lists_data";
import { SortByDatesCreation, SortHandler } from "../../../utils";


export const isCreatedTasksLists = state => state.organizer.userTasksLists.length > 0
export const getTasksLists = state => state.organizer.userTasksLists;
export const getSelectedListId = state => {
    const isSelectedDefaultAppList = state.organizer.isSelectedAppList
    if(isSelectedDefaultAppList) {
        return state.organizer.selectedAppListId
    }
    return state.organizer.selectedListId
}
export const getSelectedTaskId = state => {
    if(!isCreatedTasksLists(state)) return
    return state.organizer.selectedTaskId;
}

export const getSelectedListProperty = (state, property) => {
    const isSelectedDefaultAppList = state.organizer.isSelectedAppList
    if(isSelectedDefaultAppList) {
        const currentDefaultAppList = appListsData.find(list => list.id === state.organizer.selectedAppListId)
        if(!property) return currentDefaultAppList
        return currentDefaultAppList[property]
    }

    if(!isCreatedTasksLists(state)) return


    const selectedListId = state.organizer.selectedListId;
    const currentUserList = state.organizer.userTasksLists.find(list => list._id === selectedListId)
    if(!property) return currentUserList
    return currentUserList[property];  
}

export const getSelectedAppListData = state => { //!
    const currentAppListId = state.organizer.selectedAppListId
    return appListsData.find(list => list.id === currentAppListId)
} 

export const getAmountTasksForAppLists = state => {
    const taskAmounts = appListsData.reduce((acc, el, idx) => {
        const amount = state.organizer.userTasksLists.reduce((acc, list) => {
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
    const currentAppListId = state.organizer.selectedAppListId
    return appListsData.find(list => list.id === currentAppListId).title
}



export const getTasks = state => {
    if(!isCreatedTasksLists(state)) return
    const isSelectedDefaultAppList = state.organizer.isSelectedAppList
    const currentSortCriteria = getSelectedListSettings(state, 'sortBy')
    const [sortBy, sortOrder] = currentSortCriteria.split('/');
    const {getSortHandler} = new SortHandler(sortBy)
    let separatedTasks;
    
    if(isSelectedDefaultAppList) {
        const currentDefaultListId = state.organizer.selectedAppListId
        const selectedAppListData = appListsData.find(list => list.id === currentDefaultListId)
        // const todayTasks = state.defaultTasksLists.data[DEFAULT_TASKS_LIST_TODAY].tasks
        const todayTasks = state.organizer.defaultTasksLists[DEFAULT_TASKS_LIST_TODAY].tasks

        const userListTasks = state.organizer.userTasksLists.reduce((acc, taskList) => {
            acc.push(...taskList.tasks)
            return acc
        }, [])


        const addedTodayTasks = [...userListTasks, ...todayTasks]
        const filteredTasks = addedTodayTasks.filter(task => selectedAppListData.filterHandler(task))

        separatedTasks = taskSeparator([...filteredTasks])
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
    const selectedListId = state.organizer.selectedListId;
    const selectedTaskId = state.organizer.selectedTaskId;
    const selectedDefaultListId = state.organizer.selectedAppListId;
    
    if(selectedDefaultListId === selectedListId) {
        const foundList = state.organizer.defaultTasksLists[DEFAULT_TASKS_LIST_TODAY]
        if(!foundList) return 
        const selectedTask = foundList.tasks.find(task => task._id === selectedTaskId)
        if(!property) return selectedTask
        return selectedTask[property]
    }

    if(!isCreatedTasksLists(state)) return


    const foundList = state.organizer.userTasksLists.find(list => list._id === selectedListId)
    if(!foundList) return 
    const selectedTask = foundList.tasks.find(task => task._id === selectedTaskId)
    if(!property) return selectedTask
    return selectedTask[property]
}

export const getSelectedListSettings = (state, property) => {
    if(!isCreatedTasksLists(state)) return
    const isSelectedDefaultAppList = state.organizer.isSelectedAppList
    if(isSelectedDefaultAppList) {
        console.log('inside if')
        const selectedDefaultList = state.organizer.selectedAppListId
        const settings = state.organizer.defaultTasksLists[selectedDefaultList].settings
        if(!property) return settings
        return settings[property]
    }
    const selectedListId = state.organizer.selectedListId;
    const list = state.organizer.userTasksLists.find(list => list._id === selectedListId)
    console.log('list', list)
    if(!list) return false
    if(!property) return list.settings
    // console.log('PROPERTY', property)
    return list.settings[property]
}



