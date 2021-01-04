import { UPDATE_PERSONAL_DATA } from "../../actions_types/personal_data"
const { personalDataAPI } = require("../../../API/personal_data/personal_data")

export const updatePersonalData = newValue => async dispatch => {
    const {data: payload} = await personalDataAPI.update(newValue)
    return dispatch({type: UPDATE_PERSONAL_DATA, payload})
} 