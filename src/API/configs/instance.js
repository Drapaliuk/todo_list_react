import Axios from 'axios';
import {localStorageManipulator} from '../../utils';
const AUTH_TOKEN = localStorageManipulator.getToken()
const REFRESH_TOKEN = localStorageManipulator.getRefreshToken()
export const instance = Axios.create({baseURL: 'http://localhost:4000'});


instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.defaults.headers.common['refresh_token'] = REFRESH_TOKEN;

export const updateDefaultRequestHeaders = (token, refreshToken) => {
    console.log('updated tokens')
    instance.defaults.headers.common['Authorization'] = token;
    instance.defaults.headers.common['refresh_token'] = refreshToken;
}

console.log('instance.defaults.headers.common', instance.defaults.headers.common)

