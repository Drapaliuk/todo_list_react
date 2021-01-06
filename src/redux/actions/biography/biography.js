import { biographyAPI } from "../../../API";
const { INITIALIZE_BIOGRAPHY, DEFAULT_BIOGRAPHY, UPDATE_BIOGRAPHY } = require("../../actions_types");

export const initializeBiography = payload => ({type: INITIALIZE_BIOGRAPHY, payload});
export const defaultBiography = () => ({type: DEFAULT_BIOGRAPHY})
export const updateBiography = newValue => async dispatch => {
    const {data: payload} = await biographyAPI.update(newValue)
    return dispatch({type: UPDATE_BIOGRAPHY, payload})
}