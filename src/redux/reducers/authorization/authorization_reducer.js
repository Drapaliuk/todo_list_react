import { IS_AUTHORIZATION } from '../../acctions_types';

const initialState = {
    isAuthorization: false
}

export const authorization = (prevState = initialState, action) => {
    switch(action.type) {
        case IS_AUTHORIZATION: 
            return {
                ...prevState,
                isAuthorization: action.payload
            }
        default: return prevState
    }
}