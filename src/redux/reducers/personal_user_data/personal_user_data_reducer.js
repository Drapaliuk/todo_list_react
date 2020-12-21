const initialState = {
    name: '',
    surename: '',
    birthday: null
}

export const personalUserData = (prevState = initialState, action) => {
    switch(action.type) {
        // case ... :
        //     return {
        //         ...prevState
        //     }
        default: 
            return prevState;
    }
}