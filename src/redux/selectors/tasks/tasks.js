import { DEFAULT_TASKS_LIST_TODAY } from "../../../service";
import { appListsData } from "../../../service/app_lists_data/app_lists_data";
import { SortHandler } from "../../../utils";


const isCreatedTasksLists = state => state.organizer.userTasksLists.length > 0
export const getTasksLists = state => state.organizer.userTasksLists;
export const getSelectedListId = state => {
    const isSelectedDefaultAppList = state.organizer.isSelectedAppList
    if(isSelectedDefaultAppList) {
        return state.organizer.selectedAppListId
    }
    
    return state.organizer.selectedListId
}

export const getSelectedListsIds = state => {
    return {selectedUserListId: state.organizer.selectedListId, 
            selectedDefaultListId: state.organizer.selectedAppListId}
}

export const getSelectedDefaultListId = state => state.organizer.selectedAppListId

export const getSelectedTaskId = state => {
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

export const getSelectedAppListData = state => {
    const currentAppListId = state.organizer.selectedAppListId
    return appListsData.find(list => list.id === currentAppListId)
} 

export const getAmountTasksForAppLists = state => {
    const userListTasks = state.organizer.userTasksLists.reduce((acc, list) => {
        acc.push(...list.tasks)
        return acc
    }, [])

    const defaultListTasks = state.organizer.defaultTasksLists[DEFAULT_TASKS_LIST_TODAY].tasks
    const allTasks = [...userListTasks, ...defaultListTasks]
    const taskAmounts = appListsData.reduce((acc, el, idx) => {
        const filteredElements = allTasks.filter(task => {
            return el.filterHandler(task) && !task.hasDone
        })
        acc = {...acc,  [el.id]: filteredElements.length}
        return acc
    }, {})

    return taskAmounts
}


export const getDefaultAppListTitle = state => {
    const currentAppListId = state.organizer.selectedAppListId
    return appListsData.find(list => list.id === currentAppListId).title
}



export const getTasks = state => {
    // if(!isCreatedTasksLists(state)) return {completedTasks: [], uncompletedTasks: []}
    const isSelectedDefaultAppList = state.organizer.isSelectedAppList
    const currentSortCriteria = getSelectedListSettings(state, 'sortBy')
    const [sortBy, sortOrder] = currentSortCriteria.split('/');
    const {getSortHandler} = new SortHandler(sortBy)
    let separatedTasks;
    
    if(isSelectedDefaultAppList) {
        const currentDefaultListId = state.organizer.selectedAppListId
        const selectedAppListData = appListsData.find(list => list.id === currentDefaultListId)
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
    
    if(DEFAULT_TASKS_LIST_TODAY === selectedListId) {
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
    const isSelectedDefaultAppList = state.organizer.isSelectedAppList
    if(isSelectedDefaultAppList) {
        const selectedDefaultList = state.organizer.selectedAppListId
        const settings = state.organizer.defaultTasksLists[selectedDefaultList].settings
        if(!property) return settings
        return settings[property]
    }

    if(!isCreatedTasksLists(state)) return

    const selectedListId = state.organizer.selectedListId;
    const list = state.organizer.userTasksLists.find(list => list._id === selectedListId)
    if(!list) return false
    if(!property) return list.settings

    return list.settings[property]
}



