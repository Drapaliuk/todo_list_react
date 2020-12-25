import { INITIALIZED_TASKS, SAVE_NEW_LIST, SELECT_TASKS_LIST } from "../../actions_types"

const initialState = {
    tasksLists: [],
    selectedList: '',
}

export const tasks = (prevState = initialState, action) => {
    switch(action.type)  {
        case INITIALIZED_TASKS:
            return {
                ...prevState,
                tasksLists: [...action.payload]
            }

        case SAVE_NEW_LIST: 
            console.log(SAVE_NEW_LIST, 'a')
            return {
                ...prevState,
                tasksLists: [...prevState.tasksLists, {...action.payload}]
            }

        case SELECT_TASKS_LIST:
            const listId = action.payload
            return {
                ...prevState,
                selectedList: prevState.tasksLists.find(list => list._id === listId)
            }

        default:
            return prevState
    }
}