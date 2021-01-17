import { DEFAULT_TASKS_LIST_TODAY } from "../../../service";
import { changeCommentById, changeListById, changeSubTaskById, changeTaskById } from "../../../utils";
import { CHANGE_TASK, CHANGE_TASKS_LIST_SETTINGS, CLEAR_SELECTED_LIST,
         CLOSE_FULL_INFO, CREATE_SUBTASK, DEFAULT_TASKS, DELETE_SUBTASK,
         DELETE_TASK, DELETE_TASKS_LIST, INITIALIZED_TASKS, CREATE_LIST,
         SAVE_NEW_TASK, SELECT_SUBTASK, SELECT_TASK, SELECT_TASKS_LIST,
         UPDATE_SUBTASK, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT,
         SELECT_APP_LIST, SELECT_TASK_FROM_APP_LIST, UPDATE_TASKS_LIST } from "../../actions_types"

const initialState = {
    todayTasks: [],
    tasksLists: [],
    selectedListId: '',
    selectedAppListId: '',
    selectedTaskId: '',
    selectedSubtaskId: '',
    selectedCommentId: '',
    isSelectedAppList: false
}

export const tasks = (prevState = initialState, action) => {
    const {payload, type} = action;


    switch(type)  {

        

        case INITIALIZED_TASKS:
            const tasksCopy = [...payload]
            if(tasksCopy.length === 0) {
                return {
                    ...prevState,
                    tasksLists: [],
                    selectedAppListId: DEFAULT_TASKS_LIST_TODAY,
                    isSelectedAppList: true
                }
            }
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
            const filteredLists = prevState.tasksLists.filter(({_id}) => _id !== payload.deletedListId )
            const isUserListsEmpty = filteredLists.length === 0;
            if(isUserListsEmpty) {
                return {
                    ...prevState,
                    tasksLists: filteredLists,
                    selectedListId: '',
                    selectedTaskId: '',
                    selectedAppListId: DEFAULT_TASKS_LIST_TODAY,
                    isSelectedAppList: true
                }
            }

            return {
                ...prevState,
                tasksLists: filteredLists,
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
                tasksLists: changeListById(prevState.tasksLists, payload.listId, updateListLogic)

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
                tasksLists: changeListById(prevState.tasksLists, payload.listId, deleteTaskLogic)
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

            return {
                ...prevState,
                tasksLists: changeListById(prevState.tasksLists, payload.listId, changeListSettingsLogic)
            }

        case DEFAULT_TASKS:
            return {
                tasksLists: [],
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
                tasksLists: changeTaskById(prevState.tasksLists, payload.listId, payload.taskId, createSubTaskLogic)
            }
        
        case UPDATE_SUBTASK: 
            const updateSubtaskLogic = selectedSubtask => {
                const [key, value] = Object.entries(payload.changedSubTask)[0]
                return {...selectedSubtask, [key]: value} // це копіювання, обов'язкове?
            }

            return {
                ...prevState,
                tasksLists: changeSubTaskById(prevState.tasksLists, payload.listId, payload.taskId, payload.subtaskId, updateSubtaskLogic)
            }

        case DELETE_SUBTASK: 

            const deleteSubtaskLogic = selectedTask => {
                const filteredSubtasks = selectedTask.subtasks.filter(subtask => subtask._id !== payload.subtaskId)
                selectedTask.subtasks = filteredSubtasks
                return selectedTask 
            }

            return {
                ...prevState,
                tasksLists: changeTaskById(prevState.tasksLists, payload.listId, payload.taskId, deleteSubtaskLogic)
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
                tasksLists: changeTaskById(prevState.tasksLists, payload.listId, payload.taskId, createCommentLogic)
            }
        
        case UPDATE_COMMENT:
            const updateCommentLogic = selectedComment => {
                const [key, value] = Object.entries(payload.changedSubTask)[0]
                return {...selectedComment, [key]: value} // це копіювання, обов'язкове?
            }

            return {
                ...prevState,
                tasksLists: changeCommentById(prevState.tasksLists, payload.listId, payload.taskId, payload.subtaskId, updateCommentLogic)
            }


        case DELETE_COMMENT:
        const deleteCommentLogic = selectedTask => {
            const filteredComments = selectedTask.comments.filter(comment => comment._id !== payload.deletedCommentId)
            selectedTask.comments = filteredComments
            return selectedTask 
        }

        return {
            ...prevState,
            tasksLists: changeTaskById(prevState.tasksLists, payload.listId, payload.taskId, deleteCommentLogic)
        }

        default:
            return prevState
    }
}

