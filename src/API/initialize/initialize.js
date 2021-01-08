import {instance} from '../configs/instance'

export const initializeAPI = {
    initialize: () => {
        return instance.post('/initialize')

    },
    
}
