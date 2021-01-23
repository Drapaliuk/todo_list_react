import { createSelector } from "reselect";
import { DEFAULT_TASKS_LIST_TODAY } from "../../../service";
import { appListsData } from "../../../service/app_lists_data/app_lists_data";
import { SortHandler } from "../../../utils";

const isCreatedTasksLists = state => state.organizer.userTasksLists.length > 0;
const isSelectedDefaultAppList = state => state.organizer.isSelectedAppList;
const getCurrentDefaultListId = state => state.organizer.selectedAppListId;
const getSelectedListTasks = state => getSelectedListProperty(state, 'tasks');
const getUserTasksLists = state => state.organizer.userTasksLists;
const getDefaultListTasks = state => state.organizer.defaultTasksLists[DEFAULT_TASKS_LIST_TODAY].tasks;
const getSelectedDefaultListId = state => state.organizer.selectedAppListId
const getSelectedUserListId = state => state.organizer.selectedListId;
const getDefaultTasksLists = state => state.organizer.defaultTasksLists
const throwParams = (state, params) => params

export const getSelectedListSettings = createSelector(
    [isSelectedDefaultAppList, isCreatedTasksLists,
     getDefaultTasksLists,
     getSelectedDefaultListId, getSelectedUserListId,
     getDefaultListTasks, getUserTasksLists, throwParams], 
    (isSelectedDefaultAppList, isCreatedTasksLists,
     defaultTasksLists,
     selectedDefaultListId, selectedUserListId,
     defaultListTasks, userTasksLists, property) => {
    console.log('RECALCULATE GET SETTINGS', property)

    if(isSelectedDefaultAppList) {
        if(!property) return defaultListTasks.settings
        console.log('123', defaultTasksLists)
        return defaultTasksLists[selectedDefaultListId].settings[property]
    }

    if(!isCreatedTasksLists) return;

    const selectedUserList = userTasksLists.find(list => list._id === selectedUserListId);

    if(!selectedUserList) return false
    if(!property) return selectedUserList.settings
    return selectedUserList.settings[property]
})

const getCurrentSortCriteria = state => getSelectedListSettings(state, 'sortBy');




export const getTasksLists = state => state.organizer.userTasksLists;
export const getSelectedTaskId = state => state.organizer.selectedTaskId;


export const getSelectedListId = state => {
    if(state.organizer.isSelectedAppList) return state.organizer.selectedAppListId
    return state.organizer.selectedListId
}

export const getSelectedListsIds = state => {
    return {selectedUserListId: state.organizer.selectedListId, 
            selectedDefaultListId: state.organizer.selectedAppListId}
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
    const currentUserList = state.organizer.userTasksLists.find(list => list._id === selectedListId);

    if(!property) return currentUserList
    return currentUserList[property];  
}

export const getAmountTasksForAppLists = createSelector(
    [getUserTasksLists, getDefaultListTasks],
    (userTasksLists, defaultListTasks) => {
    const userListTasks = userTasksLists.reduce((acc, list) => {
                acc.push(...list.tasks)
                return acc
            }, [])
    const allTasks = [...userListTasks, ...defaultListTasks]
    const taskAmounts = appListsData.reduce((acc, el, idx) => {
        const filteredElements = allTasks.filter(task => {
            return el.filterHandler(task) && !task.hasDone
        })
        acc = {...acc,  [el.id]: filteredElements.length}
        return acc
    }, {})

    return taskAmounts
})

export const getTasks = createSelector(
    [ getUserTasksLists, getDefaultListTasks,
      getCurrentSortCriteria, isSelectedDefaultAppList,
      getCurrentDefaultListId, getSelectedListTasks ], 
    ( userTasksLists, defaultListTasks, currentSortCriteria,
      isSelectedDefaultAppList, currentDefaultListId, selectedListTasks ) => {

    const [sortBy, sortOrder] = currentSortCriteria.split('/');
    const {getSortHandler} = new SortHandler(sortBy);
    
    let separatedTasks;

    if(isSelectedDefaultAppList) {
        const selectedAppListData = appListsData.find(list => list.id === currentDefaultListId)
        const userListTasks = userTasksLists.reduce((acc, taskList) => {
            acc.push(...taskList.tasks)
            return acc
        }, [])

        const addedTodayTasks = [...userListTasks, ...defaultListTasks]
        const filteredTasks = addedTodayTasks.filter(task => selectedAppListData.filterHandler(task))

        separatedTasks = taskSeparator([...filteredTasks])
    }

    if(!isSelectedDefaultAppList) {
        separatedTasks = taskSeparator(selectedListTasks)
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
})


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
