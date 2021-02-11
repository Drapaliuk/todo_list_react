import produce from "immer";
import { defaultTasksListsIds } from "../../../service";
import { changeListById, changeSubTaskById, changeTaskById, ReducerSelector } from "../../../utils";
import { CHANGE_TASK, CHANGE_TASKS_LIST_SETTINGS,
         CLOSE_FULL_INFO, CREATE_SUBTASK, DEFAULT_TASKS, DELETE_SUBTASK,
         DELETE_TASK, DELETE_TASKS_LIST, INITIALIZED_TASKS, CREATE_LIST,
         CREATE_TASK, SELECT_SUBTASK, SELECT_TASK, SELECT_TASKS_LIST,
         UPDATE_SUBTASK, CREATE_COMMENT, DELETE_COMMENT,
         SELECT_APP_LIST, UPDATE_TASKS_LIST, SEARCH_BY_LETTERS,
         CREATE_FOLDER, CREATE_LIST_IN_FOLDER, SELECT_LIST_FROM_FOLDER } from "../../actions_types"



const initialState = {
    defaultTasksLists: {},
    userTasksLists: [],
    userTasksFolders: [],
    selectedListId: defaultTasksListsIds.DEFAULT_LIST__today,
    selectedAppListId: defaultTasksListsIds.DEFAULT_LIST__today,
    selectedTaskId: '',
    selectedSubtaskId: '',
    selectedCommentId: '',
    selectedFolderID: '',
    isSelectedAppList: true,
    searchByLettersPattern: '',
    isSelectedListFromFolder: false, 
    selectedFolderID: ''

}

export const organizer = (prevState = initialState, action) => {
    const {payload, type} = action;


    switch(type)  {
        case INITIALIZED_TASKS:
            return produce(prevState, draftState => {
                
                const {userTasksLists, defaultTasksLists, userTasksFolders} = payload;
                if(userTasksLists.length === 0) {
                    draftState.userTasksLists = []
                    draftState.defaultTasksLists = {...defaultTasksLists}
                    draftState.selectedAppListId = defaultTasksListsIds.DEFAULT_LIST__today
                    draftState.isSelectedAppList = true
                    draftState.userTasksFolders = userTasksFolders
                    return
                }
                
                draftState.userTasksLists = userTasksLists
                draftState.selectedListId = userTasksLists[0]._id
                draftState.selectedAppListId = ''
                draftState.isSelectedAppList = false
                draftState.defaultTasksLists = {...defaultTasksLists}
                draftState.userTasksFolders = userTasksFolders
            })

        case CREATE_LIST_IN_FOLDER:
            return produce(prevState, draftState => {
                const {createdList, folderID} = payload
                console.log(payload)
                const selectedFolder = draftState.userTasksFolders.find(folder => {
                    console.log(folder)
                    console.log(folderID)
                    return folder._id === folderID
                })
                selectedFolder.tasksLists.push(createdList)

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
                draftState.isSelectedListFromFolder = false
                draftState.selectedFolderID = ''
            })
        
        case SELECT_LIST_FROM_FOLDER:
            return produce(prevState, draftState => {
                draftState.selectedListId = payload.listID
                draftState.selectedAppListId = ''
                draftState.selectedTaskId = ''
                draftState.isSelectedAppList = false
                draftState.isSelectedListFromFolder = true
                draftState.selectedFolderID = payload.folderID
            })

        case CREATE_FOLDER:
            return produce(prevState, draftState  => {
                draftState.userTasksFolders.push(payload.createdFolder)
            })
            

        case SELECT_APP_LIST:
            return produce(prevState, draftState => {
                draftState.isSelectedAppList = true
                draftState.selectedAppListId = payload.listId
                draftState.selectedListId = ''
                draftState.selectedTaskId = ''
                draftState.isSelectedListFromFolder = false
                draftState.selectedFolderID = ''
            })
            
        case DELETE_TASKS_LIST:
            return produce(prevState, draftState => {
                const {deletedListId} = payload;

                const deletedListIndex = draftState.userTasksLists.findIndex(list => list._id === deletedListId)
                if(deletedListIndex !== -1) {
                    draftState.userTasksLists.splice(deletedListIndex, 1)
                }
                const selectedListIndexAfterDeleting = deletedListIndex > 0 ? deletedListIndex - 1 : 0

                const isUserListsEmpty = draftState.userTasksLists.length === 0;
                
                if(isUserListsEmpty) {
                    draftState.selectedListId = ''
                    draftState.selectedTaskId = ''
                    draftState.selectedAppListId = defaultTasksListsIds.DEFAULT_LIST__today
                    draftState.isSelectedAppList = true
                    return
                }

                draftState.selectedListId = draftState.userTasksLists[selectedListIndexAfterDeleting]._id
                draftState.selectedTaskId = ''
            })

        case UPDATE_TASKS_LIST:
            return produce(prevState, draftState => {
                const {listId, changedValue} = payload;
                const [key, value] = Object.entries(changedValue)[0];

                draftState.userTasksLists = changeListById(draftState.userTasksLists, listId, selectedList => {
                    selectedList[key] = value;
                    return selectedList
                })
            })
            
      
        case CREATE_TASK:
            return produce(prevState, draftState => {
                const {listId, savedTask, folderID} = payload;
                ReducerSelector.getList(draftState, folderID, listId).tasks.unshift(savedTask)
            })


        case CHANGE_TASK:
            return produce(prevState, draftState => {
                const {folderID, listId, taskId, updatedValue} = payload;
                const [key, value] = Object.entries(updatedValue)[0]

                ReducerSelector.getTask(draftState, folderID, listId, taskId)[key] = value
            })

        case DELETE_TASK:
            return produce(prevState, draftState => {
                const {listId, taskId, folderID} = payload;
                const {tasks} = ReducerSelector.getList(draftState, folderID, listId)
                const deletedTaskIndex = tasks.findIndex(task => task._id === taskId)
                tasks.splice(deletedTaskIndex, 1)

                draftState.selectedTaskId = '';
            })


 
        
        case CLOSE_FULL_INFO: 
            return {
                ...prevState,
                selectedTaskId: ''
            }

        case SELECT_TASK: 
            const isTheSameList = prevState.selectedTaskId === payload.taskId
            return {
                ...prevState,
                selectedListId: payload.selectedListId,
                selectedTaskId: isTheSameList ? '' : payload.taskId,
            }

        case CHANGE_TASKS_LIST_SETTINGS:
            return produce(prevState, draftState => {
                console.log('payload', payload)
                const [key, value] = Object.entries(payload.changedValue)[0]

                if(defaultTasksListsIds.hasOwnProperty(payload.listId)) {
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
                defaultTasksLists: {},
                userTasksLists: [],
                selectedListId: defaultTasksListsIds.DEFAULT_LIST__today,
                selectedAppListId: defaultTasksListsIds.DEFAULT_LIST__today,
                selectedTaskId: '',
                selectedSubtaskId: '',
                selectedCommentId: '',
                isSelectedAppList: true
            }
        
        case CREATE_SUBTASK:
            return produce(prevState, draftState => {
                const {listId, taskId, createdSubtask, folderID} = payload;
                const selectedTask = ReducerSelector.getTask(draftState, folderID, listId, taskId)
                selectedTask.subtasks.unshift(createdSubtask)
            })
        
        case UPDATE_SUBTASK: 
            return produce(prevState, draftState => {
                const {listId, taskId, subtaskId, changedSubTask, folderID} = payload;
                const [key, value] = Object.entries(changedSubTask)[0];
                
                const updatedSubtask = ReducerSelector.getSubTask(draftState, folderID, listId, taskId, subtaskId)
                updatedSubtask[key] = value

                // if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
                //     const selectedTask = draftState.defaultTasksLists[listId].tasks.find(task => task._id === taskId)
                //     const updatedSubtask = selectedTask.subtasks.find(subtask => subtask._id === subtaskId)
                //     updatedSubtask[key] = value
                //     return
                // }

                // draftState.userTasksLists = changeSubTaskById(draftState.userTasksLists, listId, taskId, subtaskId, selectedSubtask => {
                //     selectedSubtask[key] = value
                //     return selectedSubtask
                // })
            })
           

        case DELETE_SUBTASK: 
            return produce(prevState, draftState => {
                const {listId, taskId, subtaskId, folderID} = payload
                const selectedTask = ReducerSelector.getTask(draftState, folderID, listId, taskId)
                const deletedSubtaskIndex = selectedTask.subtasks.findIndex(subtask => subtask._id === subtaskId)
                selectedTask.subtasks.splice(deletedSubtaskIndex, 1)
            });

            

        case SELECT_SUBTASK:
            return {
                ...prevState,
                selectedSubtaskId: payload.id              
            }

        case CREATE_COMMENT:
            return produce(prevState, draftState => {
                const {listId, taskId, createdElement, folderID} = payload;
                const selectedTask = ReducerSelector.getTask(draftState, folderID, listId, taskId)
                selectedTask.comments.push(createdElement)
            })
        

        case DELETE_COMMENT:
            return produce(prevState, draftState => {
                const {listId, taskId, deletedCommentId, folderID} = payload;
                const selectedTask = ReducerSelector.getTask(draftState, folderID, listId, taskId)
                const deletedCommentIndex = selectedTask.comments.findIndex(subtask => subtask._id === deletedCommentId)
                selectedTask.comments.splice(deletedCommentIndex, 1)
            })

        case SEARCH_BY_LETTERS:
            return {
                ...prevState,
                searchByLettersPattern: payload.pattern
            }

        default:
            return prevState
    }
}

