import Axios from 'axios';
import {localStorageManipulator} from '../../utils';
import {store} from '../../redux/store';
import { networkConnectionStatus } from '../../redux/actions';

const AUTH_TOKEN = localStorageManipulator.getToken()
const REFRESH_TOKEN = localStorageManipulator.getRefreshToken();

const herokuServerURL = 'https://drapaliuk-to-do-list-server.herokuapp.com/'
const localHost = 'http://localhost:4000'

export const instance = Axios.create({baseURL: herokuServerURL});
  

instance.interceptors.request.use(request => {
    const isAccessToNetwork = window.navigator.onLine;

    if(!isAccessToNetwork) {
        const notConnectionError = new Error('there are not network connection')
        notConnectionError.name = 'NO CONNECTION';

        store.dispatch(networkConnectionStatus(false));

        return Promise.reject({
            response: {
                data: notConnectionError 
            }
        })
    }

    return request
})


instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.defaults.headers.common['refresh_token'] = REFRESH_TOKEN;
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const updateDefaultRequestHeaders = (token, refreshToken) => {
    instance.defaults.headers.common['Authorization'] = token;
    instance.defaults.headers.common['refresh_token'] = refreshToken;
}


