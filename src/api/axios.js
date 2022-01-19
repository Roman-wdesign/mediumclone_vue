import axios from 'axios';
import {getItem} from "@/helpers/persistanceStorage";

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use(config => {
    const token = getItem('accessToken')
    const authorizationToken = token ? `Token ${token}`:''
    console.log('authorizationToken', authorizationToken)
    config.headers.Authorization = authorizationToken
    return token, config
})

export default axios