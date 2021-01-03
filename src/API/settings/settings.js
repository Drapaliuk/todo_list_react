import { instance } from "../configs/instance";

export const settingsAPI = {
    updateSettings: newValue => instance.put('/settings', {newValue}) 
}