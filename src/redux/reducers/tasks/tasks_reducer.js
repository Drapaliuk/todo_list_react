import { INITIALIZED_TASKS } from "../../actions_types"

const initialState = {
    tasksLists: []
}

export const tasks = (prevState = initialState, action) => {
    switch(action.type)  {
        case INITIALIZED_TASKS :
            console.log(action.payload) 
            return {
                ...prevState,
                tasksLists: [...action.payload]
            }

        default:
            return prevState
    }
}