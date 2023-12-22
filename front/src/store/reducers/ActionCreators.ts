import { AppDispatch } from "../store";
import axios from "axios"
import { toast } from "react-toastify"
import { userSlice } from "./UserSlice";
import $host, { API_URL } from "../../http";
import { typeSlice } from "./TypeSlice";
import { questionSlice } from "./QuestionSlice";

// Fetch User

export const fetchRegistration = (userObj: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.post('/user/registration', userObj)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        dispatch(userSlice.actions.registration({ user: response.data.user, isAuth: true }))
        toast.success('Account has been created!')
    } catch (error: any) {
        dispatch(userSlice.actions.registration({ user: [], isAuth: false }))
        toast.error(error.response.data.message)
    }
}

export const fetchLogin = (userObj: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.post('/user/login', userObj)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        dispatch(userSlice.actions.login({ user: response.data.user, isAuth: true }))
        toast.success('You logged in!')
    } catch (error: any) {
        dispatch(userSlice.actions.login({ user: [], isAuth: false }))
        toast.error(error.response.data.message)
    }
}

export const fetchLogout = () => async (dispatch: AppDispatch) => {
    try {
        const refreshToken = localStorage.getItem('refreshToken')
        await $host.post('/user/logout', { refreshToken })
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch(userSlice.actions.logout({ user: [], isAuth: false, }))
        toast.success('You are out!')
    } catch (error: any) {
        dispatch(userSlice.actions.logout({ user: [], isAuth: false }))
        toast.error(error.response.data.message)
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
        toast.success('You have created a type!')
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
}

export const fetchGetIdTypes = (userId: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.get(`/type/${userId}`)
        dispatch(typeSlice.actions.getIdTypes({ types: response.data.types }))
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
}

// Fetch Question

export const fetchPostIdQuestion = (typeId: any, data: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.post(`/question/${typeId}`, data)
        dispatch(questionSlice.actions.postIdQuestion({ questions: response.data.newQuestion }))
        toast.success('You have created a question!')
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
}