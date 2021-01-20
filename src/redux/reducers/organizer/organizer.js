import produce from "immer";
import { DEFAULT_TASKS_LIST_TODAY } from "../../../service";
import { changeCommentById, changeListById, changeSubTaskById, changeTaskById } from "../../../utils";
import { CHANGE_TASK, CHANGE_TASKS_LIST_SETTINGS,
         CLOSE_FULL_INFO, CREATE_SUBTASK, DEFAULT_TASKS, DELETE_SUBTASK,
         DELETE_TASK, DELETE_TASKS_LIST, INITIALIZED_TASKS, CREATE_LIST,
         CREATE_TASK, SELECT_SUBTASK, SELECT_TASK, SELECT_TASKS_LIST,
         UPDATE_SUBTASK, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,
         SELECT_APP_LIST, SELECT_TASK_FROM_APP_LIST, UPDATE_TASKS_LIST } from "../../actions_types"

const initialState = {
    defaultTasksLists: {},
    userTasksLists: [],
    selectedListId: DEFAULT_TASKS_LIST_TODAY,
    selectedAppListId: DEFAULT_TASKS_LIST_TODAY,
    selectedTaskId: '',
    selectedSubtaskId: '',
    selectedCommentId: '',
    isSelectedAppList: true
}

export const organizer = (prevState = initialState, action) => {
    const {payload, type} = action;


    switch(type)  {
        case INITIALIZED_TASKS:
            return produce(prevState, draftState => {
                if(payload.userTasksLists.length === 0) {
                    draftState.userTasksLists = []
                    draftState.defaultTasksLists = {...payload.defaultTasksLists}
                    draftState.selectedAppListId = DEFAULT_TASKS_LIST_TODAY
                    draftState.isSelectedAppList = true
                    return draftState
                }

                
                draftState.userTasksLists = payload.userTasksLists
                // draftState.selectedListId = payload.userTasksLists[0]?._id || ''
                draftState.selectedListId = payload.userTasksLists[0]._id
                draftState.selectedAppListId = ''
                draftState.isSelectedAppList = false
                draftState.defaultTasksLists = {...payload.defaultTasksLists}
                return draftState
            })

        case CREATE_LIST: 
            return produce(prevState, draftState => {
                draftState.userTasksLists.push(payload)
                draftState.selectedListId = payload._id
                draftState.selectedTaskId = ''
                draftState.selectedAppListId = ''
                draftState.isSelectedAppList = false
            })

        case SELECT_TASKS_LIST:
            return produce(prevState, draftState  => {
                draftState.selectedListId = payload.listId

                draftState.selectedAppListId = ''


                draftState.selectedTaskId = ''
                draftState.isSelectedAppList = false
            })

        case SELECT_APP_LIST:
            return produce(prevState, draftState => {
                draftState.isSelectedAppList = true
                draftState.selectedAppListId = payload.listId
                draftState.selectedListId = ''
                draftState.selectedTaskId = ''
            })
            
        case DELETE_TASKS_LIST:
            const filteredLists = prevState.userTasksLists.filter(({_id}) => _id !== payload.deletedListId )
            const isUserListsEmpty = filteredLists.length === 0;
            
            if(isUserListsEmpty) {
                return {
                    ...prevState,
                    userTasksLists: filteredLists,
                    selectedListId: '',
                    selectedTaskId: '',
                    selectedAppListId: DEFAULT_TASKS_LIST_TODAY,
                    isSelectedAppList: true
                }
            }

            return {
                ...prevState,
                userTasksLists: filteredLists,
                selectedListId: filteredLists[0]._id,
                selectedTaskId: ''

            }
            

        case UPDATE_TASKS_LIST:
            const updateListLogic = selectedList => {
                const [key, value] = Object.entries(payload.changedValue)[0];
                selectedList[key] = value;
                return selectedList
            }

            return produce(prevState, draftState => {
                draftState.userTasksLists = changeListById(prevState.userTasksLists, payload.listId, updateListLogic)
            })
      
        case CREATE_TASK:
            return produce(prevState, draftState => {
                const {listId, savedTask} = payload;
                if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
                        draftState.defaultTasksLists[listId].tasks.push(savedTask)
                        return
                }

                draftState.userTasksLists = changeListById(draftState.userTasksLists, listId, selectedList => {
                    selectedList.tasks = [...selectedList.tasks, savedTask]
                    return selectedList
                })
            })


        case CHANGE_TASK:

            return produce(prevState, draftState => {
                console.log('PAYLOAD', payload)
                const {listId, taskId, updatedValue} = payload;
                const [key, value] = Object.entries(updatedValue)[0]
                if(listId === DEFAULT_TASKS_LIST_TODAY) {
                    draftState.defaultTasksLists[listId].tasks.map(task => {
                        if(task._id === taskId) {
                            task[key] = value
                            return task
                        }
                        return task
                    })
                    return
                }
    
                draftState.userTasksLists = changeTaskById(draftState.userTasksLists, listId, taskId, selectedTask => {
                    selectedTask[key] = value
                    return selectedTask
                } )
            })




            // if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
            //     return produce(prevState, draftState => {
            //         const [key, value] = Object.entries(payload.updatedValue)[0]
            //         draftState.defaultTasksLists[payload.listId].tasks.map(task => {
            //             if(task._id === payload.taskId) {
            //                 task[key] = value
            //                 return task
            //             }
            //             return task
            //         })
            //     })
            // }

            // const changeTaskLogic = selectedTask => {
            //     const [key, value] = Object.entries(payload.changedValue)[0]
            //     selectedTask[key] = value
            //     return selectedTask
            // } 

            // return {
            //     ...prevState,
            //     userTasksLists: changeTaskById(prevState.userTasksLists, payload.listId, payload.taskId, changeTaskLogic)
            // }
        case DELETE_TASK:
            if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
                return produce(prevState, draftState => {
                    const tasks = draftState.defaultTasksLists[payload.listId].tasks
                    const deletedTaskIndex = tasks.findIndex(task => payload.taskId === task._id)
                    tasks.splice(deletedTaskIndex, 1)
                    draftState.selectedTaskId =  ''
                })
            }

            const deleteTaskLogic = selectedList => {
                const filteredTasks = selectedList.tasks.filter(task => task._id !== payload.taskId)
                selectedList.tasks = [...filteredTasks]
                return selectedList
            }

            return {
                ...prevState,
                selectedTaskId: '',
                userTasksLists: changeListById(prevState.userTasksLists, payload.listId, deleteTaskLogic)
            }
        
        case CLOSE_FULL_INFO: 
            return {
                ...prevState,
                selectedTaskId: ''
            }

        case SELECT_TASK: 
            return {
                ...prevState,
                selectedListId: payload.selectedListId,
                selectedTaskId: prevState.selectedTaskId === payload.taskId ? '' : payload.taskId,
            }

        case SELECT_TASK_FROM_APP_LIST: 
            return {
                ...prevState,
                selectedListId: payload.listId,
                selectedTaskId: prevState.selectedTaskId === payload.taskId ? '' : payload.taskId
        }

        case CHANGE_TASKS_LIST_SETTINGS:
            return produce(prevState, draftState => {
                const [key, value] = Object.entries(payload.changedValue)[0]
                if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
                    draftState.defaultTasksLists[payload.listId].settings[key] = value
                    return 
                }

                draftState.userTasksLists = changeListById(draftState.userTasksLists, payload.listId, selectedList => {
                    selectedList.settings[key] = value
                    return selectedList
                } )
            })
            

        case DEFAULT_TASKS:
            return {
                userTasksLists: [],
                selectedListId: '',
                selectedTaskId: ''
            }
        
        case CREATE_SUBTASK:
            if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
                return produce(prevState, draftState => {
                    const selectedTask = draftState.defaultTasksLists[payload.listId].tasks.find(task => task._id === payload.taskId)
                    selectedTask.subtasks.push(payload.createdSubtask)
                })
            }

            const createSubTaskLogic = selectedTask => {
                const {subtasks} = selectedTask
                const {createdSubtask} = payload
                selectedTask.subtasks = [...subtasks, createdSubtask]
                return selectedTask
            }

            return {
                ...prevState,
                userTasksLists: changeTaskById(prevState.userTasksLists, payload.listId, payload.taskId, createSubTaskLogic)
            }
        
        case UPDATE_SUBTASK: 
            const [key, value] = Object.entries(payload.changedSubTask)[0]
            if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
                return produce(prevState, draftState => {
                    const selectedTask = draftState.defaultTasksLists[payload.listId].tasks.find(task => task._id === payload.taskId)
                    const updatedSubtask = selectedTask.subtasks.find(subtask => subtask._id === payload.subtaskId)
                    updatedSubtask[key] = value
                })
            }

            const updateSubtaskLogic = subtasks => {
                return {...subtasks, [key]: value} // це копіювання, обов'язкове?
            }

            return {
                ...prevState,
                userTasksLists: changeSubTaskById(prevState.userTasksLists, payload.listId, payload.taskId, payload.subtaskId, updateSubtaskLogic)
            }

        case DELETE_SUBTASK: 
            if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
                return produce(prevState, draftState => {
                    const selectedTask = draftState.defaultTasksLists[payload.listId].tasks.find(task => task._id === payload.taskId)
                    const deletedSubtaskIndex = selectedTask.subtasks.findIndex(subtask => subtask._id === payload.subtaskId)
                    selectedTask.subtasks.splice(deletedSubtaskIndex, 1)
                })
            }
            

            const deleteSubtaskLogic = selectedTask => {
                const filteredSubtasks = selectedTask.subtasks.filter(subtask => subtask._id !== payload.subtaskId)
                selectedTask.subtasks = filteredSubtasks
                return selectedTask 
            }

            return {
                ...prevState,
                userTasksLists: changeTaskById(prevState.userTasksLists, payload.listId, payload.taskId, deleteSubtaskLogic)
            }

        case SELECT_SUBTASK:
            return {
                ...prevState,
                selectedSubtaskId: payload.id              
            }

        case CREATE_COMMENT:
            if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
                return produce(prevState, draftState => {
                    const selectedTask = draftState.defaultTasksLists[payload.listId].tasks.find(task => task._id === payload.taskId)
                    selectedTask.comments.push(payload.createdElement)
                })
            }


            const createCommentLogic = selectedTask => {
                const {comments} = selectedTask
                const {createdElement} = payload
                selectedTask.comments = [...comments, createdElement]
                return selectedTask
            }

            return {
                ...prevState,
                userTasksLists: changeTaskById(prevState.userTasksLists, payload.listId, payload.taskId, createCommentLogic)
            }
        
        case UPDATE_COMMENT:
            if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
                return produce(prevState, draftState => {
                    const selectedTask = draftState.defaultTasksLists[payload.listId].tasks.find(task => task._id === payload.taskId)
                    const updatedComment = selectedTask.comments.find(subtask => subtask._id === payload.commentId)
                    updatedComment[key] = value
                })
            }
            const updateCommentLogic = selectedComment => {
                const [key, value] = Object.entries(payload.changedSubTask)[0]
                return {...selectedComment, [key]: value} // це копіювання, обов'язкове?
            }

            return {
                ...prevState,
                userTasksLists: changeCommentById(prevState.userTasksLists, payload.listId, payload.taskId, payload.deletedCommentId, updateCommentLogic)
            }


        case DELETE_COMMENT:

        if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
            return produce(prevState, draftState => {
                const selectedTask = draftState.defaultTasksLists[payload.listId].tasks.find(task => task._id === payload.taskId)
                const deletedCommentIndex = selectedTask.comments.findIndex(subtask => subtask._id === payload.deletedCommentId)
                selectedTask.comments.splice(deletedCommentIndex, 1)
            })
        }

        const deleteCommentLogic = selectedTask => {
            const filteredComments = selectedTask.comments.filter(comment => comment._id !== payload.deletedCommentId)
            selectedTask.comments = filteredComments
            return selectedTask 
        }

        return {
            ...prevState,
            userTasksLists: changeTaskById(prevState.userTasksLists, payload.listId, payload.taskId, deleteCommentLogic)
        }

        default:
            return prevState
    }
}

