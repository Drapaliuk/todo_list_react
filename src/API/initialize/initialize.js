import {instance} from '../configs/instance'

export const initializeAPI = {
    initialize: () => instance.post('/initialize'),
    checkAccessabilityServer: () => instance.get('/initialize/check-out')
}
