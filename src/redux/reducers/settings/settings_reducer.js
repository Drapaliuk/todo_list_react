import { DEFAULT_SETTINGS, INITIALIZED_SETTINGS } from "../../actions_types"

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
        
        default:
            return prevState
    }
}