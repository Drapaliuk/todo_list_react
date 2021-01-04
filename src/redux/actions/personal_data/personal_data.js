import { INITIALIZED_TASKS } from "../../actions_types"
import { CLEAR_PERSONAL_DATA, INITIALIZE_PERSONAL_DATA, UPDATE_PERSONAL_DATA } from "../../actions_types/personal_data"
const { personalDataAPI } = require("../../../API/personal_data/personal_data")

export const initializePersonalData = payload => ({type: INITIALIZE_PERSONAL_DATA, payload})
export const clearPersonalData = () => ({type: CLEAR_PERSONAL_DATA});

export const updatePersonalData = newValue => async dispatch => {
    const {data: payload} = await personalDataAPI.update(newValue)
    return dispatch({type: UPDATE_PERSONAL_DATA, payload})
}