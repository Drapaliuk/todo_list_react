import {instance} from '../configs/instance';

export const authAPI = {
    login: authData => {
        return instance.post('/auth/login', authData)
    },
    
    registration: (login, password) => {
        return instance.post('/auth/registration', {login, password})
    },
    
    logout: token => {
        return instance.delete('/auth/logout', {headers: {Authorization: token}})
    },
}
