import { CHANGE_TASK, CHANGE_TASKS_LIST_SETTINGS, CLEAR_SELECTED_LIST, DEFAULT_TASKS, DELETE_TASKS_LIST, INITIALIZED_TASKS, SAVE_NEW_LIST, SAVE_NEW_TASK, SELECT_TASK, SELECT_TASKS_LIST } from "../../actions_types"

const initialState = {
    tasksLists: [],
    selectedListId: '',
    selectedTaskId: ''
}

export const tasks = (prevState = initialState, action) => {
    const {payload, type} = action;

    switch(type)  {
        case INITIALIZED_TASKS:
            const tasksCopy = [...payload]
            return {
                ...prevState,
                tasksLists: tasksCopy,
                selectedListId: tasksCopy[0]?._id || ''
            }

        case SAVE_NEW_LIST: 
            return {
                ...prevState,
                tasksLists: [...prevState.tasksLists, {...payload}],
                selectedListId: payload._id,
                selectedTaskId: ''
            }

        case SELECT_TASKS_LIST:
            const selectedListId = prevState.tasksLists.find(list => list._id === payload.listId);
            const [selectedTaskId = ''] = selectedListId.tasks.filter(task => (!task.hasDone && task.isPinned )|| (!task.hasDone && !task.isPinned))
            
            return {
                ...prevState,
                selectedListId: payload.listId, 
                // selectedTaskId: selectedListId.tasks[0]?._id || ''
                selectedTaskId: selectedTaskId._id
            }
        case DELETE_TASKS_LIST:
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.filter(({_id}) => _id !== payload ),
                selectedListId: ''

            }
        case CLEAR_SELECTED_LIST:
            return {
                ...prevState,
                selectedListId: ''
            }
        case SAVE_NEW_TASK: 
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        list.tasks = [...list.tasks, payload.savedTask]
                        return list
                    }
                    
                    return list
                })

            }
        case CHANGE_TASK:
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        list.tasks.map(task => {
                            if(task._id === payload.taskId) {
                                const [key] = Object.keys(payload.changedValue)
                                task[key] = payload.changedValue[key] //!
                                return task
                            }
                            return task
                        })
                    }
                    return list
                })
            }

        case SELECT_TASK: 
            const prevSelectedTaskId = prevState.selectedTaskId
            const currentSelectedTaskID = payload.taskId
            const isTheSameIds = prevSelectedTaskId === currentSelectedTaskID

            return {
                ...prevState,
                // selectedTaskId: prevState.selectedTaskId ? '' : payload.taskId
                selectedTaskId: isTheSameIds ? '' : payload.taskId

            }

        case CHANGE_TASKS_LIST_SETTINGS:
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        const [key] = Object.keys(payload.changedValue)
                        list.settings[key] = payload.changedValue[key]
                        return list
                    }
                    return list
                }) 
            }
        case DEFAULT_TASKS:
            return {
                tasksLists: [],
                selectedListId: '',
                selectedTaskId: ''
            }
        // case CHANGE_TASKS_LIST_SETTINGS:
        //     return {
        //         ...prevState,
        //         tasksLists: prevState.tasksLists.map(list => {
        //             if(list._id === payload.listId) {
        //                 const [changedValueKey] = Object.keys(payload.changedValue)
        //                 return {...list, settings: {...list.settings, [changedValueKey]: payload.changedValue[changedValueKey] }}
        //             }
        //             return list
        //         }) 
        //     }

        default:
            return prevState
    }
}