import { defaultAppLists } from "../../service/default_app_tasks_list";
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


export const getUncompletedTasks = (currentSortCriteria, isSelectedDefaultList, defaultAppListId) => state => {
    if(!isCreatedTasksLists(state)) return


    console.log('currentSortCriteria',currentSortCriteria )
    console.log('isSelectedDefaultList',isSelectedDefaultList )
    console.log('defaultAppListId',defaultAppListId )

    if(isSelectedDefaultList) {
        const {filterHandler} = defaultAppLists.find(list => list.id === defaultAppListId)
        const filteredTasks = state.tasks.reduce((acc, list) => {
            acc = [...acc, ...filterHandler(list.tasks)]
            return acc
        }, [])

        const sortedTasks = filteredTasks //!?
        return [...sortedTasks]
    }

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

export const getSelectedTaskProperty = (state, property) => {
    if(!isCreatedTasksLists(state)) return

    const selectedListId = state.tasks.selectedListId;
    const selectedTaskId = state.tasks.selectedTaskId;
    const {tasks} = state.tasks.tasksLists.find(list => list._id === selectedListId)
    const selectedTask = tasks.find(task => task._id === selectedTaskId)
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

