import produce from 'immer';
import { reducer } from 'redux-form';

const { UPDATE_DEFAULT_LISTS_SETTINGS, INITIALIZE_DEFAULT_TASKS_LISTS,
        CREATE_TODAY_TASK, UPDATE_TODAY_TASK, DELETE_TODAY_TASK } = require("../../actions_types")

const initialState = {
    data: {}
}

export const defaultTasksLists = (prevState = initialState, action) => {
    const { payload } = action;
    switch(action.type) {
        case INITIALIZE_DEFAULT_TASKS_LISTS: {
            return {
                data: {...payload},
            }
        }

        case CREATE_TODAY_TASK:
            console.log('payload', payload)
            return produce(prevState, draftState => {
                draftState.data[payload.listId].tasks.push(payload.createdTask)
            })

        case UPDATE_TODAY_TASK:
            return produce(prevState, draftState => {
                const [key, value] = Object.entries(payload.updatedValue)[0]
                draftState.data[payload.selectedList].tasks.map(task => {
                    if(task._id === payload.taskId) {
                        task[key] = value
                        return task
                    }
                    return task
                })
            })
        
        case DELETE_TODAY_TASK:
            return produce(prevState, draftState => {
                draftState.data[payload.selectedList].task.filter(task => task._id !== payload.taskId)
            })

        case UPDATE_DEFAULT_LISTS_SETTINGS:
            const updatedSettings = {...prevState.data}
            const [key, value] = Object.entries(payload.updatedValue)[0]
            
            updatedSettings[payload.listId] = {...updatedSettings[payload.listId],
                                                     settings: {...updatedSettings[payload.listId].settings, [key]: value} }

            return {    
                ...prevState,
                data: updatedSettings
            }
        default:
            return prevState
    }
}