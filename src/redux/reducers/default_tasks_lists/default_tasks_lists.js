const { UPDATE_DEFAULT_LISTS_SETTINGS, INITIALIZE_DEFAULT_TASKS_LISTS } = require("../../actions_types")

const initialState = {
    data: {}
}

export const defaultTasksLists = (prevState = initialState, action) => {
    const { payload } = action;
    switch(action.type) {
        case INITIALIZE_DEFAULT_TASKS_LISTS: {
            return {
                data: {...payload}
            }
        }
        case UPDATE_DEFAULT_LISTS_SETTINGS:
            console.log('aaa', payload.updatedValue)
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