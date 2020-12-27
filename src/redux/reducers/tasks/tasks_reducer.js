import { act } from "react-dom/test-utils"
import { CHANGE_TASK, CHANGE_TASKS_LIST_SETTINGS, CLEAR_SELECTED_LIST, DELETE_TASKS_LIST, INITIALIZED_TASKS, SAVE_NEW_LIST, SAVE_NEW_TASK, SELECT_TASK, SELECT_TASKS_LIST } from "../../actions_types"

const initialState = {
    tasksLists: [],
    selectedList: false,
    selectedTask: false
}

export const tasks = (prevState = initialState, action) => { //один раз потрібно деструктуризувати пейлоад
    const {payload, type} = action;
    switch(type)  {
        case INITIALIZED_TASKS:
            const tasksCopy = [...payload]
            return {
                ...prevState,
                tasksLists: tasksCopy,
                selectedList: tasksCopy[0]
            }

        case SAVE_NEW_LIST: 
            console.log(SAVE_NEW_LIST, 'a')
            return {
                ...prevState,
                tasksLists: [...prevState.tasksLists, {...payload}]
            }

        case SELECT_TASKS_LIST:
            const listId = payload
            const selectedList = prevState.tasksLists.find(list => list._id === listId);
            console.log(selectedList.tasks.find(task => !task.hasDone))
            // const selectedTask = selectedList.tasks.length === 0 ? false : Boolean(selectedList.tasks.find(task => !task.hasDone))
            //Без буліана на працює, вимагає тільк фолс
            const selectedTask = selectedList.tasks[0] || false
            return {
                ...prevState,
                selectedList, 
                selectedTask
            }
        case DELETE_TASKS_LIST:
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.filter(({_id}) => _id !== payload ),
                selectedList: false

            }
        case CLEAR_SELECTED_LIST:
            return {
                ...prevState,
                selectedList: false
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
            return {
                ...prevState,
                selectedTask: prevState.selectedList.tasks.find(task => task._id === payload)
            }

        case CHANGE_TASKS_LIST_SETTINGS:
            console.log('payload', payload)
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
        // case CHANGE_TASKS_LIST_SETTINGS:
        //     console.log('payload', payload)
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