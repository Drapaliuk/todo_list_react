import { UPDATE_PERSONAL_DATA, INITIALIZE_PERSONAL_DATA, CLEAR_PERSONAL_DATA } from "../../actions_types/personal_data";

const initialState = {
    email: '',
    phone: ''
}

export const personalData = (prevState = initialState, action) => {
    switch(action.type) {
        case INITIALIZE_PERSONAL_DATA:
            const {email, phone} = action.payload
            return {
                ...prevState,
                email,
                phone
            }
        case CLEAR_PERSONAL_DATA: 
            return {
                email: '',
                phone: ''
            }
        
        case UPDATE_PERSONAL_DATA:
            return {
                ...prevState,
                ...action.payload.changedValue
            }

        default: 
            return prevState;
    }
}