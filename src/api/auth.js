import axios from "@/api/axios";

const register = credentials => {
    return axios.post('/users', {user: credentials})
    //credentionals это поля формы
}

export default {
    register
}