import produce from "immer";
import { DEFAULT_TASKS_LIST_TODAY } from "../../../service";
import { changeCommentById, changeListById, changeSubTaskById, changeTaskById } from "../../../utils";
import { CHANGE_TASK, CHANGE_TASKS_LIST_SETTINGS, CLEAR_SELECTED_LIST,
         CLOSE_FULL_INFO, CREATE_SUBTASK, DEFAULT_TASKS, DELETE_SUBTASK,
         DELETE_TASK, DELETE_TASKS_LIST, INITIALIZED_TASKS, CREATE_LIST,
         SAVE_NEW_TASK, SELECT_SUBTASK, SELECT_TASK, SELECT_TASKS_LIST,
         UPDATE_SUBTASK, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,
         SELECT_APP_LIST, SELECT_TASK_FROM_APP_LIST, UPDATE_TASKS_LIST, CREATE_TODAY_TASK, UPDATE_TODAY_TASK, DELETE_TODAY_TASK, UPDATE_DEFAULT_LISTS_SETTINGS } from "../../actions_types"

const initialState = {
    defaultTasksLists: {},
    userTasksLists: [],
    selectedListId: '',
    selectedAppListId: '',
    selectedTaskId: '',
    selectedSubtaskId: '',
    selectedCommentId: '',
    isSelectedAppList: false
}

export const organizer = (prevState = initialState, action) => {
    const {payload, type} = action;


    switch(type)  {
        case INITIALIZED_TASKS:
            console.log('INITIALIZED', payload)
            if(payload.userTasksLists.length === 0) {
                return {
                    ...prevState,
                    userTasksLists: [],
                    defaultTasksLists: {...payload.defaultTasksLists},
                    selectedAppListId: DEFAULT_TASKS_LIST_TODAY,
                    isSelectedAppList: true
                }
            }
            return {
                ...prevState,
                userTasksLists: payload.userTasksLists,
                selectedListId: payload.userTasksLists[0]?._id || '',
                defaultTasksLists: {...payload.defaultTasksLists}

            }

        case CREATE_TODAY_TASK:
            return produce(prevState, draftState => {
                draftState.defaultTasksLists[payload.listId].tasks.push(payload.savedTask)
            })
    
        case UPDATE_TODAY_TASK:
            return produce(prevState, draftState => {
                const [key, value] = Object.entries(payload.updatedValue)[0]
                draftState.defaultTasksLists[payload.listId].tasks.map(task => {
                    if(task._id === payload.taskId) {
                        task[key] = value
                        return task
                    }
                    return task
                })
            })
            
        case DELETE_TODAY_TASK:
            const newState = produce(prevState, draftState => {
                const index = draftState.defaultTasksLists[payload.listId].tasks.findIndex(task => task._id === payload.taskId)
                if(index !== -1) draftState.defaultTasksLists[payload.listId].tasks.splice(index, 1)
                draftState.selectedTaskId = ''
            })
            return newState

        case UPDATE_DEFAULT_LISTS_SETTINGS:
            return produce(prevState, draftState => {
                const [key, value] = Object.entries(payload.updatedValue)[0]
                draftState.defaultTasksLists[payload.listId].settings[key] = value
            })

        case CREATE_LIST: 
            return {
                ...prevState,
                userTasksLists: [...prevState.userTasksLists, {...payload}],
                selectedListId: payload._id,
                selectedTaskId: ''
            }



        case SELECT_TASKS_LIST:

            const selectedListId = prevState.userTasksLists.find(list => list._id === payload.listId);
            const [selectedTaskId = ''] = selectedListId.tasks.filter(task => (!task.hasDone && task.isPinned )|| (!task.hasDone && !task.isPinned))

            return {
                ...prevState,
                selectedListId: payload.listId, 
                // selectedTaskId: selectedTaskId._id,
                selectedTaskId: '',
                isSelectedAppList: false
            }


        case SELECT_APP_LIST:
            return {
                ...prevState,
                isSelectedAppList: true,
                selectedAppListId: payload.listId,
                selectedListId: '',
                selectedTaskId: ''
            }   
        

            
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
                console.log('selectedList', selectedList)
                console.log('payload', payload.changedValue)
                selectedList[key] = value;
                return selectedList
            }
             return {
                ...prevState,
                userTasksLists: changeListById(prevState.userTasksLists, payload.listId, updateListLogic)

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
                userTasksLists: changeListById(prevState.userTasksLists, payload.listId, createTaskLogic)
            }


        case CHANGE_TASK:

            const changeTaskLogic = selectedTask => {
                const [key, value] = Object.entries(payload.changedValue)[0]
                selectedTask[key] = value
                return selectedTask
            } 

            return {
                ...prevState,
                userTasksLists: changeTaskById(prevState.userTasksLists, payload.listId, payload.taskId, changeTaskLogic)
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
                userTasksLists: changeListById(prevState.userTasksLists, payload.listId, deleteTaskLogic)
            }
        
        case CLOSE_FULL_INFO: 
            return {
                ...prevState,
                selectedTaskId: ''
            }

        case SELECT_TASK: 
            console.log('payload', payload)
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
            const changeListSettingsLogic = selectedList => {
                const [key, value] = Object.entries(payload.changedValue)[0]
                selectedList.settings[key] = value
                return selectedList
            } 

            if(payload.listId === DEFAULT_TASKS_LIST_TODAY) {
                return produce(prevState, draftState => {
                    const [key, value] = Object.entries(payload.changedValue)[0]
                    draftState.defaultTasksLists[payload.listId].settings[key] = value
                })
            }

            return {
                ...prevState,
                userTasksLists: changeListById(prevState.userTasksLists, payload.listId, changeListSettingsLogic)
            }

        case DEFAULT_TASKS:
            return {
                userTasksLists: [],
                selectedListId: '',
                selectedTaskId: ''
            }
        
        case CREATE_SUBTASK:

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
            const updateSubtaskLogic = selectedSubtask => {
                const [key, value] = Object.entries(payload.changedSubTask)[0]
                return {...selectedSubtask, [key]: value} // це копіювання, обов'язкове?
            }

            return {
                ...prevState,
                userTasksLists: changeSubTaskById(prevState.userTasksLists, payload.listId, payload.taskId, payload.subtaskId, updateSubtaskLogic)
            }

        case DELETE_SUBTASK: 

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
            const updateCommentLogic = selectedComment => {
                const [key, value] = Object.entries(payload.changedSubTask)[0]
                return {...selectedComment, [key]: value} // це копіювання, обов'язкове?
            }

            return {
                ...prevState,
                userTasksLists: changeCommentById(prevState.userTasksLists, payload.listId, payload.taskId, payload.subtaskId, updateCommentLogic)
            }


        case DELETE_COMMENT:
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

