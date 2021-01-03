import { DEFAULT_SETTINGS, INITIALIZED_SETTINGS, UPDATE_SETTINGS } from "../../actions_types"

const initialState = {
    theme: '',
    language: ''
}

export const settings = (prevState = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SETTINGS: 
            const {theme, language} = action.payload;
            return {
                ...prevState,
                theme,
                language
            }
        case DEFAULT_SETTINGS: 
            return {
                theme: '',
                language: ''
            }
        case UPDATE_SETTINGS:
            console.log(action.payload)

            return {
                ...prevState,
                ...action.payload
            }
        
        default:
            return prevState
    }
}