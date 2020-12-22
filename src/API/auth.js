import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:4000/auth'})

export const authAPI = {
    checkAuth: token => {
        return instance.get('/check', {headers: {Authorization: token}})
    },
    
    login: (login, password) => {
        return instance.post('/login', {login, password})
    },
    
    registration: (login, password) => {
        return instance.post('/registration', {login, password})
    },
    
    logout: token => {
        return instance.delete('/logout', {headers: {Authorization: token}})
    },
    
    refreshToken: (token, refreshToken) => {
        return instance.post('refreshToken', refreshToken,{headers: {Authorization: token}})
    }
}
