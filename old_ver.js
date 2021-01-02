import { listsAPI } from "../../../API";
import { changeListById, changeSubTaskById, changeTaskById } from "../../../utils/selectors_by_id";
import { CHANGE_TASK, CHANGE_TASKS_LIST_SETTINGS, CLEAR_SELECTED_LIST, CLOSE_FULL_INFO, CREATE_SUBTASK, DEFAULT_TASKS, DELETE_SUBTASK, DELETE_TASK, DELETE_TASKS_LIST, INITIALIZED_TASKS, CREATE_LIST, SAVE_NEW_TASK, SELECT_SUBTASK, SELECT_TASK, SELECT_TASKS_LIST, UPDATE_SUBTASK, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from "../../actions_types"

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

        case CREATE_LIST: 
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
            console.log(payload)
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

            const createTaskLogic = selectedList => {
                selectedList.tasks = [...selectedList.tasks, payload.savedTask]
                return selectedList
            }

            return {
                ...prevState,
                // tasksLists: prevState.tasksLists.map(list => {
                //     if(list._id === payload.listId) {
                //         list.tasks = [...list.tasks, payload.savedTask]
                //         return list
                //     }
                    
                //     return list
                // })
                tasksLists: changeListById(prevState.tasksLists, payload.listId, createTaskLogic)

            }


        case CHANGE_TASK:

            const changeTaskLogic = selectedTask => {
                const [key, value] = Object.entries(payload.changedValue)[0]
                selectedTask[key] = value
                return selectedTask
            } 

            return {
                ...prevState,
                // tasksLists: prevState.tasksLists.map(list => {
                //     if(list._id === payload.listId) {
                //         list.tasks.map(task => {
                //             if(task._id === payload.taskId) {
                //                 const [key] = Object.keys(payload.changedValue)
                //                 task[key] = payload.changedValue[key] //!
                //                 return task
                //             }
                //             return task
                //         })
                //     }
                //     return list
                // })
                tasksLists: changeTaskById(prevState.tasksLists, payload.listId, payload.taskId, changeTaskLogic)
            }
        case DELETE_TASK:
            const deleteTaskLogic = selectedList => {
                const filteredTasks = selectedList.tasks.filter(task => task._id !== payload.taskId)
                selectedList.tasks = [...filteredTasks]
                return selectedList
            }

            return {
                ...prevState,
                selectedTaskId: '',
                // tasksLists: [...prevState.tasksLists.map(list => {
                //     if(list._id === payload.listId) {
                //         const filteredTasks = list.tasks.filter(task => task._id !== payload.taskId)
                //         list.tasks = [...filteredTasks]
                //         return list
                //     }
                //     return list
                // })]
                tasksLists: changeListById(prevState.tasksLists, payload.listId, deleteTaskLogic)


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

            const changeListSettingsLogic = selectedList => {
                const [key, value] = Object.entries(payload.changedValue)[0]
                selectedList.settings[key] = value
                return selectedList
            }       

            return {
                ...prevState,
                // tasksLists: prevState.tasksLists.map(list => {
                //     if(list._id === payload.listId) {
                //         const [key] = Object.keys(payload.changedValue)
                //         list.settings[key] = payload.changedValue[key]
                //         return list
                //     }
                //     return list
                // }) 
                tasksLists: changeListById(prevState.tasksLists, payload.listId, changeListSettingsLogic)

            }
        case DEFAULT_TASKS:
            return {
                tasksLists: [],
                selectedListId: '',
                selectedTaskId: ''
            }
        
        case CREATE_SUBTASK://! Зробити абстракцію

            const createSubTaskLogic = selectedTask => {
                const {subtasks} = selectedTask
                const {createdSubtask} = payload
                selectedTask.subtasks = [...subtasks, createdSubtask]
                return selectedTask
            }


            return {
                ...prevState,
                // tasksLists: prevState.tasksLists.map(list => {
                //     if(list._id === payload.listId) {
                //         list.tasks.map(task => {
                //             if(task._id === payload.taskId) {
                //                 task.subtasks.push(payload.createdSubtask)
                //             }
                //             return task
                //         })
                //     }
                //     return list
                // })
                tasksLists: changeTaskById(prevState.tasksLists, payload.listId, payload.taskId, createSubTaskLogic)

                
            }
        
        case UPDATE_SUBTASK: //! Зробити абстракцію
            const updateSubtaskLogic = selectedSubtask => {
                const [key, value] = Object.entries(payload.changedSubTask)[0]
                return {...selectedSubtask, [key]: value} // це копіювання, обов'язкове?
            }




            return {
                ...prevState,
                // tasksLists: prevState.tasksLists.map(list => {
                //     if(list._id === payload.listId) {
                //         list.tasks.map(task => {
                //             if(task._id === payload.taskId) {
                //                 task.subtasks.map(subtask => {
                //                     if(subtask._id === payload.subtaskId) {
                //                         const [key, value] = Object.entries(payload.changedSubTask)[0]
                //                         subtask[key] = value
                //                         return subtask
                //                     }
                //                     return subtask
                //                 })
                //             }
                //             return task
                //         })
                //     }
                //     return list
                // })
                tasksLists: changeSubTaskById(prevState.tasksLists, payload.listId, payload.taskId, payload.subtaskId, updateSubtaskLogic)
            }


        case DELETE_SUBTASK: //! Зробити абстракцію

            const deleteSubtaskLogic = selectedTask => {
                const filteredSubtasks = selectedTask.subtasks.filter(subtask => subtask._id !== payload.subtaskId)
                selectedTask.subtasks = filteredSubtasks
                return selectedTask 
            }

            return {
                ...prevState,
                // tasksLists: prevState.tasksLists.map(list => {
                //     if(list._id === payload.listId) {
                //         list.tasks.map(task => {
                //             if(task._id === payload.taskId) {
                //                 const filteredSubtasks = task.subtasks.filter(subtask => subtask._id !== payload.subtaskId )
                //                 task.subtasks = filteredSubtasks
                //                 return task
                //             }
                //             return task
                //         })
                //     }
                //     return list
                // })

                tasksLists: changeTaskById(prevState.tasksLists, payload.listId, payload.taskId, deleteSubtaskLogic)
            }

        case SELECT_SUBTASK:
            return {
                ...prevState,
                selectedSubtaskId: payload.id              
            }

        case CREATE_COMMENT://! Зробити абстракцію !!!
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        list.tasks.map(task => {
                            if(task._id === payload.taskId) {
                                task.comments.push(payload.createdElement)
                            }
                            return task
                        })
                    }
                    return list
                })
            }
        
        case UPDATE_COMMENT: //! Зробити абстракцію !!!!
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        list.tasks.map(task => {
                            if(task._id === payload.taskId) {
                                task.comments.map(comment => {
                                    if(comment._id === payload.commentId) {
                                        const [key, value] = Object.entries(payload.updates)[0]
                                        comment[key] = value
                                        return comment
                                    }
                                    return comment
                                })
                            }
                            return task
                        })
                    }
                    return list
                })
            }


        case DELETE_COMMENT: //! Зробити абстракцію
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        list.tasks.map(task => {
                            if(task._id === payload.taskId) {
                                const filteredSubtasks = task.comments.filter(comment => comment._id !== payload.deletedCommentId )
                                task.comments = filteredSubtasks
                                return task
                            }
                            return task
                        })
                    }
                    return list
                })
            }
        default:
            return prevState
    }
}