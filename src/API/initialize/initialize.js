import {instance} from '../configs/instance'

export const initializeAPI = {
    initialize: (token, refreshToken) => {
        return instance.post('/initialize', {refreshToken}, {headers: {Authorization: token}})
    },
    
}
