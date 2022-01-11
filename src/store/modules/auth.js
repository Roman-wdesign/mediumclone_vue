import authApi from '@/api/auth'
import {setItem} from "@/helpers/persistanceStorage";

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
}
export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure'
}

export const actionTypes = {
    register: '[auth] register'
}

const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.registerSuccess](state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationTypes.registerFailure](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    }
}
const actions = {
    [actionTypes.register](context, credentials) {
        // одна структура для работы с axios API
        // Actions лучше всегда оборачивать в Promise, чтобы
        //подписываться на них в компоненте
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart)
            authApi
                .register(credentials)
                .then(response => {
                    context.commit(mutationTypes.registerSuccess, response.data.user)

                    //получение токена при регистрации
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationTypes.registerFailure, result.response.data.errors)
                })
        })

        // setTimeout(() => {
        //     //вызываем мутацию и задаем ей время 1 секунда
        //     context.commit('registerStart')
        // }, 1000)
    }
}
export default {state, mutations, actions}