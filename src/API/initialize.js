import {instance} from './configs/instance'

console.log('!!!', instance.defaults)

export const initializeAPI = {
    initialize: (token, refreshToken) => {
        console.log('!!!!!!!!!!!!!!!!!')
        return instance.post('/initialize', {refreshToken}, {headers: {Authorization: token}})
    },
    
}
