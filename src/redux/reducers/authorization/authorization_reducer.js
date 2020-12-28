import { IS_AUTHORIZATION } from '../../actions_types';
import { IS_FETCHING_CHECK_AUTH } from '../../actions_types/authorization';

const initialState = {
    isAuthorization: false,
    isFetchingCheckAuth: true,
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
        
        default: return prevState
    }
}