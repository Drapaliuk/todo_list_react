import { act } from "react-dom/test-utils";
import { DEFAULT_BIOGRAPHY, INITIALIZE_BIOGRAPHY } from "../../actions_types";

const initialState = {
    name: '',
    surname: '',
    birthDay: null
}

export const biography = (prevState = initialState, action) => {
    switch(action.type) {
        case INITIALIZE_BIOGRAPHY:
            const {name, surname, birthDay} = action.payload
            console.log(action)
            return {
                ...prevState,
                name,
                surname,
                birthDay
            }
        case DEFAULT_BIOGRAPHY: 
            return {
                name: '',
                surname: '',
                birthDay: null
            }
        default: 
            return prevState;
    }
}