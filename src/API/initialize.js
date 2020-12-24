import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:4000'})

export const initializeAPI = {
    initialize: (token, refreshToken) => {
        return instance.post('/initialize', {refreshToken}, {headers: {Authorization: token}})
    },
    
}
