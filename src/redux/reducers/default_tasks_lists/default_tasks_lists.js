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
        // case INITIALIZE_DEFAULT_TASKS_LISTS: {
        //     return {
        //         data: {...payload},
        //     }
        // }

        // case CREATE_TODAY_TASK:
        //     return produce(prevState, draftState => {
        //         draftState.data[payload.listId].tasks.push(payload.savedTask)
        //     })

        // case UPDATE_TODAY_TASK:
        //     return produce(prevState, draftState => {
        //         const [key, value] = Object.entries(payload.updatedValue)[0]
        //         draftState.data[payload.listId].tasks.map(task => {
        //             if(task._id === payload.taskId) {
        //                 task[key] = value
        //                 return task
        //             }
        //             return task
        //         })
        //     })
        
        // case DELETE_TODAY_TASK:
        //     console.log('payload', payload)
        //     const newState = produce(prevState, draftState => {
        //         const index = draftState.data[payload.listId].tasks.findIndex(task => task._id === payload.taskId)
        //         if(index !== -1) draftState.data[payload.listId].tasks.splice(index, 1)
        //     })
        //     console.log('newState', newState)
        //     return newState

        // case UPDATE_DEFAULT_LISTS_SETTINGS:
        //     const updatedSettings = {...prevState.data}
        //     const [key, value] = Object.entries(payload.updatedValue)[0]
            
        //     updatedSettings[payload.listId] = {...updatedSettings[payload.listId],
        //                                              settings: {...updatedSettings[payload.listId].settings, [key]: value} }

        //     return {    
        //         ...prevState,
        //         data: updatedSettings
        //     }
        default:
            return prevState
    }
}