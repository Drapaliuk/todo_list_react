import {instance} from '../configs/instance';

export const biographyAPI = {
    update: newValue => {
        return instance.put('/biography', {newValue})
    }
}