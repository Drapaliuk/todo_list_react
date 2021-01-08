import { IS_FETCHING_CHECK_AUTH, IS_AUTHORIZATION, SET_AUTH_ERROR, RESET_AUTH } from '../../actions_types';

const initialState = {
    isAuthorization: false,
    isFetchingCheckAuth: true,
    error: ''
}

export const authorization = (prevState = initialState, action) => {
    switch(action.type) {
        case IS_AUTHORIZATION: 
            return {
                ...prevState,
                isAuthorization: action.payload
            }
        case IS_FETCHING_CHECK_AUTH: 
            return {
                ...prevState,
                isFetchingCheckAuth: action.payload
            }
        
        case SET_AUTH_ERROR: 
            return {
                ...prevState,
                error: action.payload,
            }
            
        case RESET_AUTH:
            return {
                isAuthorization: false,
                isFetchingCheckAuth: true,
                error: ''
            }
        
        default: return prevState
    }
}