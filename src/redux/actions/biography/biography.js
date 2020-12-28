const { INITIALIZE_BIOGRAPHY, DEFAULT_BIOGRAPHY } = require("../../actions_types");

export const initializeBiography = payload => ({type: INITIALIZE_BIOGRAPHY, payload});
export const defaultBiography = () => ({type: DEFAULT_BIOGRAPHY})