import produce from "immer";
import {defaultTasksListsIds} from "../../../service";
import { changeListById, changeSubTaskById, changeTaskById } from "../../../utils";
import { CHANGE_TASK, CHANGE_TASKS_LIST_SETTINGS,
         CLOSE_FULL_INFO, CREATE_SUBTASK, DEFAULT_TASKS, DELETE_SUBTASK,
         DELETE_TASK, DELETE_TASKS_LIST, INITIALIZED_TASKS, CREATE_LIST,
         CREATE_TASK, SELECT_SUBTASK, SELECT_TASK, SELECT_TASKS_LIST,
         UPDATE_SUBTASK, CREATE_COMMENT, DELETE_COMMENT,
         SELECT_APP_LIST, UPDATE_TASKS_LIST, SEARCH_BY_LETTERS } from "../../actions_types"

const initialState = {
    defaultTasksLists: {},
    userTasksLists: [],
    selectedListId: defaultTasksListsIds.DEFAULT_LIST__today,
    selectedAppListId: defaultTasksListsIds.DEFAULT_LIST__today,
    selectedTaskId: '',
    selectedSubtaskId: '',
    selectedCommentId: '',
    isSelectedAppList: true,
    searchByLettersPattern: ''
}

export const organizer = (prevState = initialState, action) => {
    const {payload, type} = action;


    switch(type)  {
        case INITIALIZED_TASKS:
            return produce(prevState, draftState => {
                const {userTasksLists, defaultTasksLists} = payload;
                if(userTasksLists.length === 0) {
                    draftState.userTasksLists = []
                    draftState.defaultTasksLists = {...defaultTasksLists}
                    draftState.selectedAppListId = defaultTasksListsIds.DEFAULT_LIST__today
                    draftState.isSelectedAppList = true
                    return
                }
                
                draftState.userTasksLists = userTasksLists
                draftState.selectedListId = userTasksLists[0]._id
                draftState.selectedAppListId = ''
                draftState.isSelectedAppList = false
                draftState.defaultTasksLists = {...defaultTasksLists}
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
                const {listId, savedTask} = payload;
                if(payload.listId === defaultTasksListsIds.DEFAULT_LIST__today) {
                        draftState.defaultTasksLists[listId].tasks.unshift(savedTask)
                        return
                }

                draftState.userTasksLists = changeListById(draftState.userTasksLists, listId, selectedList => {
                    selectedList.tasks.unshift(savedTask)
                    return selectedList
                })
            })


        case CHANGE_TASK:
            return produce(prevState, draftState => {
                const {listId, taskId, updatedValue} = payload;
                const [key, value] = Object.entries(updatedValue)[0]
                if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
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

        case DELETE_TASK:
            return produce(prevState, draftState => {
                const {listId, taskId} = payload;

                if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
                    const tasks = draftState.defaultTasksLists[listId].tasks
                    const deletedTaskIndex = tasks.findIndex(task => taskId === task._id)
                    tasks.splice(deletedTaskIndex, 1)
                    draftState.selectedTaskId = '';
                    return
                }
    
                draftState.userTasksLists = changeListById(draftState.userTasksLists, listId, selectedList => {
                    const deletedTaskIndex = selectedList.tasks.findIndex(task => task._id === taskId)
                    selectedList.tasks.splice(deletedTaskIndex, 1)
                    return selectedList
                })
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
                const {listId, taskId, createdSubtask} = payload;

                if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
                    const selectedTask = draftState.defaultTasksLists[listId].tasks.find(task => task._id === taskId)
                    selectedTask.subtasks.unshift(createdSubtask)
                    return
                }
    
                draftState.userTasksLists = changeTaskById(draftState.userTasksLists, listId, taskId, selectedTask => {
                    selectedTask.subtasks.unshift(createdSubtask)
                    return selectedTask
                })
            })
        
        case UPDATE_SUBTASK: 
            return produce(prevState, draftState => {
                const {listId, taskId, subtaskId, changedSubTask} = payload;
                const [key, value] = Object.entries(changedSubTask)[0];

                if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
                    const selectedTask = draftState.defaultTasksLists[listId].tasks.find(task => task._id === taskId)
                    const updatedSubtask = selectedTask.subtasks.find(subtask => subtask._id === subtaskId)
                    updatedSubtask[key] = value
                    return
                }

                draftState.userTasksLists = changeSubTaskById(draftState.userTasksLists, listId, taskId, subtaskId, selectedSubtask => {
                    selectedSubtask[key] = value
                    return selectedSubtask
                })
            })
           

        case DELETE_SUBTASK: 
            return produce(prevState, draftState => {
                const {listId, taskId, subtaskId} = payload

                if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
                    const selectedTask = draftState.defaultTasksLists[listId].tasks.find(task => task._id === taskId)
                    const deletedSubtaskIndex = selectedTask.subtasks.findIndex(subtask => subtask._id === subtaskId)
                    selectedTask.subtasks.splice(deletedSubtaskIndex, 1)
                    return
                }
                
                draftState.userTasksLists = changeTaskById(draftState.userTasksLists, listId, taskId, selectedTask => {
                    const deletedSubtaskIndex = selectedTask.subtasks.findIndex(subtask => subtask._id === subtaskId)
                    selectedTask.subtasks.splice(deletedSubtaskIndex, 1)
                    return selectedTask 
                })
            });

            

        case SELECT_SUBTASK:
            return {
                ...prevState,
                selectedSubtaskId: payload.id              
            }

        case CREATE_COMMENT:
            return produce(prevState, draftState => {
                const {listId, taskId, createdElement} = payload;
                if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
                    const selectedTask = draftState.defaultTasksLists[listId].tasks.find(task => task._id === taskId)
                    selectedTask.comments.push(createdElement)
                }

                draftState.userTasksLists = changeTaskById(draftState.userTasksLists, listId, taskId, selectedTask => {
                    selectedTask.comments.push(createdElement)
                    return selectedTask
                })
            })
        

        case DELETE_COMMENT:
            return produce(prevState, draftState => {
                const {listId, taskId, deletedCommentId} = payload;

                if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
                    const selectedTask = draftState.defaultTasksLists[listId].tasks.find(task => task._id === taskId)
                    const deletedCommentIndex = selectedTask.comments.findIndex(subtask => subtask._id === deletedCommentId)
                    selectedTask.comments.splice(deletedCommentIndex, 1)
                    return
                }
        
                draftState.userTasksLists = changeTaskById(draftState.userTasksLists, listId, taskId, selectedTask => {
                        const deletedCommentIndex = selectedTask.comments.findIndex(subtask => subtask._id === deletedCommentId)
                        selectedTask.comments.splice(deletedCommentIndex, 1)
                        return selectedTask 
                    })
            })
        case SEARCH_BY_LETTERS:
            console.log('PAYLOAD', payload)
            return {
                ...prevState,
                searchByLettersPattern: payload.pattern
            }

        default:
            return prevState
    }
}

