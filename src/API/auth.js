import {instance} from './configs/instance';

export const authAPI = {
    checkAuth: token => {
        return instance.get('/auth/check', {headers: {Authorization: token}})
    },
    
    login: (login, password) => {
        return instance.post('/auth/login', {login, password})
    },
    
    registration: (login, password) => {
        return instance.post('/auth/registration', {login, password})
    },
    
    logout: token => {
        return instance.delete('/auth/logout', {headers: {Authorization: token}})
    },
    
    refreshToken: (token, refreshToken) => {
        return instance.post('/auth/refreshToken', refreshToken,{headers: {Authorization: token}})
    }
}
