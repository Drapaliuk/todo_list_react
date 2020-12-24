import { INITIALIZED_SETTINGS } from "../../actions_types"

const initialState = {
    theme: 'light',
    language: 'eng'
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
        default:
            return prevState
    }
}