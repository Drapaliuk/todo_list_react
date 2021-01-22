const { IS_INITIALIZED, IS_FETCHING_INIT_DATA, NETWORK_CONNECTION_STATUS, LOST_CONNECTION } = require("../../actions_types")

const initState = {
    isInitialized: false,
    isFetchingInitData: true,
    isConnectionToNetwork: true,
    wasLostConnection: false
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
        case NETWORK_CONNECTION_STATUS:
            return {
                ...prevState,
                isConnectionToNetwork: action.payload.status
            }
        case LOST_CONNECTION: 
            return {
                ...prevState,
                wasLostConnection: action.payload.wasLostConnection
            }
        
        default:
            return prevState
    }
}