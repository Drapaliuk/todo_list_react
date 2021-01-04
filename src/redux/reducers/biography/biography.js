import { DEFAULT_BIOGRAPHY, INITIALIZE_BIOGRAPHY, UPDATE_BIOGRAPHY } from "../../actions_types";

const initialState = {
    name: '',
    surname: '',
    country: '',
    birthday: null
}

export const biography = (prevState = initialState, action) => {
    switch(action.type) {
        case INITIALIZE_BIOGRAPHY:
            const {name, surname, birthday} = action.payload
            return {
                ...prevState,
                name,
                surname,
                birthday
            }
        case DEFAULT_BIOGRAPHY: 
            return {
                name: '',
                surname: '',
                country: '',
                birthday: null
            }
        
        case UPDATE_BIOGRAPHY:
            return {
                ...prevState,
                ...action.payload.changedValue
            }

        default: 
            return prevState;
    }
}