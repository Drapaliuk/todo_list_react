const { IS_INITIALIZED, IS_FETCHING_INIT_DATA } = require("../../actions_types")

const initState = {
    isInitialized: false,
    isFetchingInitData: true
}


export const initialize = (prevState = initState, action) => {
    switch(action.type) {
        case IS_INITIALIZED:
            return {
                ...prevState,
                isInitialized: action.payload
            }
        case IS_FETCHING_INIT_DATA: 
            return {
                ...prevState,
                isFetchingInitData: action.payload
            }
        default:
            return prevState
    }
}