import { listsAPI } from "../../../API";
import { CHANGE_TASK, CHANGE_TASKS_LIST_SETTINGS, CLEAR_SELECTED_LIST, CLOSE_FULL_INFO, CREATE_SUBTASK, DEFAULT_TASKS, DELETE_SUBTASK, DELETE_TASK, DELETE_TASKS_LIST, INITIALIZED_TASKS, SAVE_NEW_LIST, SAVE_NEW_TASK, SELECT_SUBTASK, SELECT_TASK, SELECT_TASKS_LIST, UPDATE_SUBTASK } from "../../actions_types"

const initialState = {
    tasksLists: [],
    selectedListId: '',
    selectedTaskId: '',
    selectedSubtaskId: '',
    selectedCommentId: ''
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
                                // console.log(key, payload.changedValue[key])
                                // return {...task, [key]: payload.changedValue[key]}
                                return task
                            }
                            return task
                        })
                    }
                    return list
                })
            }
        case DELETE_TASK:
            return {
                ...prevState,
                selectedTaskId: '',
                tasksLists: [...prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        const filteredTasks = list.tasks.filter(task => task._id !== payload.taskId)
                        list.tasks = [...filteredTasks]
                        return list
                    }
                    return list
                })]

            }
        
        case CLOSE_FULL_INFO: 
            return {
                ...prevState,
                selectedTaskId: ''
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
        
        case CREATE_SUBTASK:
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        list.tasks.map(task => {
                            if(task._id === payload.taskId) {
                                task.subtasks.push(payload.createdSubtask)
                            }
                            return task
                        })
                    }
                    return list
                })
            }
        
        case UPDATE_SUBTASK:
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        list.tasks.map(task => {
                            if(task._id === payload.taskId) {
                                task.subtasks.map(subtask => {
                                    if(subtask._id === payload.subtaskId) {
                                        subtask.text = payload.update
                                        return subtask
                                    }
                                    return subtask
                                })
                            }
                            return task
                        })
                    }
                    return list
                })
            }

          

        
        case DELETE_SUBTASK:
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        list.tasks.map(task => {
                            if(task._id === payload.taskId) {
                                const filteredSubtasks = task.subtasks.filter(subtask => subtask._id !== payload._id )
                                task.subtasks = filteredSubtasks
                                return task
                            }
                            return task
                        })
                    }
                    return list
                })
            }

        case SELECT_SUBTASK:
            return {
                ...prevState,
                selectedSubtaskId: payload.id              
            }

        default:
            return prevState
    }
}