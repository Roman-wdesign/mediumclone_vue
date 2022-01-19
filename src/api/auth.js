import axios from "@/api/axios";

const register = credentials => {
    return axios.post('/users', {user: credentials})
    //credentionals это поля формы
}
const login = credentials => {
    return axios.post('/users/login', {user: credentials})
    //credentionals это поля формы
}

const getCurrentUser = () => {
    return axios.get('/user')
}

export default {
    register, login, getCurrentUser
}

