const initialState = {
    theme: 'light',
    language: 'eng'
}

export const settings = (prevState = initialState, action) => {
    switch(action.type) {
        // case ...: 
        //     return {
        //         ...prevState
        //     }
        default:
            return prevState
    }
}