import { AppDispatch } from "../store";
import axios from "axios"
import { userSlice } from "./UserSlice";
import $host, { API_URL } from "../../http";
import { typeSlice } from "./TypeSlice";
import { questionSlice } from "./QuestionSlice";
import { messageSlice } from "./MessageSlice";

// Fetch User

export const fetchRegistration = (userObj: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.post('/user/registration', userObj)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        dispatch(userSlice.actions.registration({ user: response.data.user, isAuth: true }))
        dispatch(messageSlice.actions.success({ successMessage: 'Account has been created!', errorMessage: null, warningMessage: null }))
    } catch (error: any) {
        dispatch(userSlice.actions.registration({ user: [], isAuth: false }))
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}

export const fetchLogin = (userObj: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.post('/user/login', userObj)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        dispatch(userSlice.actions.login({ user: response.data.user, isAuth: true }))
        dispatch(messageSlice.actions.success({ successMessage: 'You logged in!', errorMessage: null, warningMessage: null }))

    } catch (error: any) {
        dispatch(userSlice.actions.login({ user: [], isAuth: false }))
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}

export const fetchLogout = () => async (dispatch: AppDispatch) => {
    try {
        const refreshToken = localStorage.getItem('refreshToken')
        await $host.post('/user/logout', { refreshToken })
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch(userSlice.actions.logout({ user: [], isAuth: false, }))
        dispatch(messageSlice.actions.success({ successMessage: 'You are out!', errorMessage: null, warningMessage: null }))
    } catch (error: any) {
        dispatch(userSlice.actions.logout({ user: [], isAuth: false }))
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}

export const fetchRefresh = () => async (dispatch: AppDispatch) => {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await axios.get(`${API_URL}/user/refresh/${refreshToken}`, { withCredentials: true })
    localStorage.setItem('accessToken', response.data.accessToken)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    dispatch(userSlice.actions.refresh({ user: response.data.user, isAuth: true }))
}

// Fetch Type

export const fetchPostIdType = (title: string, userId: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.post(`/type/${userId}`, title)
        dispatch(typeSlice.actions.postIdType({ types: response.data.type }))
        dispatch(messageSlice.actions.success({ successMessage: 'You have created a type!', errorMessage: null, warningMessage: null }))
    } catch (error: any) {
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}

export const fetchGetIdTypes = (userId: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.get(`/type/${userId}`)
        dispatch(typeSlice.actions.getIdTypes({ types: response.data.types }))
    } catch (error: any) {
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}

// Fetch Question

export const fetchPostIdQuestion = (typeId: any, data: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.post(`/question/${typeId}`, data)
        dispatch(questionSlice.actions.postIdQuestion({ questions: response.data.newQuestion, gameQuestions: [] }))
        dispatch(messageSlice.actions.success({ successMessage: 'You have created a question!', errorMessage: null, warningMessage: null }))
    } catch (error: any) {
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}

export const fetchGetQuestion = (data = {}) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.get(`/question`, {
            params: {
                ...data
            }
        })
        dispatch(questionSlice.actions.getQuestions({ questions: response.data.questions, gameQuestions: [] }))
    } catch (error: any) {
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}

export const fetchGetIdQuestion = (id: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.get(`/question/${id}`)
        dispatch(questionSlice.actions.getIdQuestions({ gameQuestions: response.data.questions, questions: { count: 0, rows: [] } }))
    } catch (error: any) {
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}

export const fetchPatchIdQuestion = (id: any, data: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.patch(`/question/${id}`, {
            params: {
                ...data
            }
        })
        dispatch(questionSlice.actions.patchIdQuestion({ questions: response.data.questions, gameQuestions: [] }))
        dispatch(messageSlice.actions.success({ successMessage: 'You have updated a question!', errorMessage: null, warningMessage: null }))
    } catch (error: any) {
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}

export const fetchDeleteIdQuestion = (id: any, data: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.delete(`/question/${id}`, {
            params: {
                ...data
            }
        })
        dispatch(questionSlice.actions.deleteIdQuestion({ questions: response.data.questions, gameQuestions: [] }))
        dispatch(messageSlice.actions.success({ successMessage: 'You have deleted a question!', errorMessage: null, warningMessage: null }))
    } catch (error: any) {
        dispatch(messageSlice.actions.error({ successMessage: null, errorMessage: error.response.data.message, warningMessage: null }))
    }
}