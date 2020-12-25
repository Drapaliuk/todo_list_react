import { act } from "react-dom/test-utils"
import { CLEAR_SELECTED_LIST, DELETE_TASKS_LIST, INITIALIZED_TASKS, SAVE_NEW_LIST, SAVE_NEW_TASK, SELECT_TASKS_LIST } from "../../actions_types"

const initialState = {
    tasksLists: [],
    selectedList: false,
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
        case DELETE_TASKS_LIST:
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.filter(({_id}) => _id !== action.payload ),
                selectedList: false

            }
        case CLEAR_SELECTED_LIST:
            return {
                ...prevState,
                selectedList: false
            }
        case SAVE_NEW_TASK: 
            const {payload} = action;
            
            return {
                ...prevState,
                tasksLists: prevState.tasksLists.map(list => {
                    if(list._id === payload.listId) {
                        // list.tasks.push(payload.savedTask)
                        list.tasks = [...list.tasks, payload.savedTask]
                        return list
                    }
                    
                    return list
                })

            }

        default:
            return prevState
    }
}