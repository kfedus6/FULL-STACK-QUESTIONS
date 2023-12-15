import { AppDispatch } from "../store";
import axios from "axios"
import { toast } from "react-toastify"
import { userSlice } from "./UserSlice";
import $host, { API_URL } from "../../http";

export const fetchRegistration = (userObj: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await $host.post('/user/registration', userObj)
        localStorage.setItem('token', response.data.accessToken)
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
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userSlice.actions.login({ user: response.data.user, isAuth: true }))
        toast.success('You logged in!')
    } catch (error: any) {
        dispatch(userSlice.actions.login({ user: [], isAuth: false }))
        toast.error(error.response.data.message)
    }
}

export const fetchLogout = () => async (dispatch: AppDispatch) => {
    try {
        await $host.post('/user/logout')
        localStorage.removeItem('token')
        dispatch(userSlice.actions.logout({ user: [], isAuth: false, }))
        toast.success('You are out!')
    } catch (error: any) {
        dispatch(userSlice.actions.logout({ user: [], isAuth: false }))
        toast.error(error.response.data.message)
    }
}

export const fetchRefresh = () => async (dispatch: AppDispatch) => {
    const response = await axios.get(`${API_URL}/user/refresh`, { withCredentials: true })
    localStorage.setItem('token', response.data.accessToken)
    dispatch(userSlice.actions.refresh({ user: response.data.user, isAuth: true }))
}