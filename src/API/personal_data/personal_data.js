import { instance } from "../configs/instance";

export const personalDataAPI = {
    update: newValue => instance.put('/personalData', {newValue}) 
}